using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using ReleaseCaptainRandomiser.ViewModels;
using Platform.UnitOfWork;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using Newtonsoft.Json;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Platform.Infrastructure;
using System;
using Platform.Infrastructure.Helpers;
using Platform.Repositories;
using Platform.Infrastructure.RestfulAPI.Jira;
using Platform.Infrastructure.RestfulAPI.Jira.Jql;
//using Platform.Infrastructure.RestfulAPI.Jira;
//using Platform.Infrastructure.RestfulAPI.Jira.Jql;

namespace ReleaseCaptainRandomiser
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; }
        private IHostingEnvironment _hostingEnvironment;

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
            _hostingEnvironment = env;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<PlatformDbContext>(options =>
            {
                var connectionString = Configuration["Data:DefaultConnection:ConnectionString"];
                var test = @"Server=.\sql2012dev_ent;Database=Platform;Trusted_Connection=True;";
                options.UseSqlServer(test);
                //options.UseOpenIddict();
            });

            // add identity
            //services.AddIdentity()
            //    .AddEntityFrameworkStores<PlatformDbContext>()
            //    .AddDefaultTokenProviders();

            // Add framework services.
            services.AddMvc();

            //auto mapper
            Mapper.Initialize(cfg =>
            {
                cfg.AddProfile<AutoMapperProfile>();
            });

            // Repositories
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            // DB Creation and Seeding
            services.AddTransient<IDatabaseInitializer, DatabaseInitializer>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IDatabaseInitializer databaseInitializer, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();
            loggerFactory.AddDebug(LogLevel.Warning);
            loggerFactory.AddFile(Configuration.GetSection("Logging")); //let's use Serilog :)

            Utilities.ConfigureLogger(loggerFactory);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
         
                //app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                //{
                //    HotModuleReplacement = true
                //});
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            //app.Run(async (context) =>
            //{
            //    await context.Response.WriteAsync("Hello World!");
            //});

            app.UseExceptionHandler(builder =>
            {
                builder.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";

                    var error = context.Features.Get<IExceptionHandlerFeature>();

                    if (error != null)
                    {
                        string errorMsg = JsonConvert.SerializeObject(new { error = error.Error.Message });
                        await context.Response.WriteAsync(errorMsg).ConfigureAwait(false);
                    }
                });
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });

            //needs to refactor below code
            Uri uri = new Uri("https://infotrack.atlassian.net");

            var password = "z3263667";

            var username = "alex.sun@infotrack.com.au";
            var jiraClient = new JiraRestClient(uri, username, password);

            var jsb = new JqlSearchBean();
            JqlBuilder builder2 = new JqlBuilder();
            string jql = builder2.AddCondition(EField.LABELS, EOperator.EQUALS, "20170629")
                    .OrderBy(SortOrder.ASC, EField.CREATED);
            jsb.jql = jql;
            jsb.AddField(EField.ASSIGNEE ,EField.LABELS, EField.STATUS, EField.DUE, EField.SUMMARY, EField.ISSUE_TYPE, EField.PRIORITY, EField.UPDATED, EField.TRANSITIONS);
            jsb.AddExpand(EField.TRANSITIONS);
            var task = jiraClient.SearchClient.SearchIssues(jsb);
            var result = task.GetAwaiter().GetResult() as JqlSearchResult;



            try
            {
                databaseInitializer.SeedAsync().Wait();
            }
            catch (Exception ex)
            {
                Utilities.CreateLogger<Startup>().LogCritical(LoggingEvents.INIT_DATABASE, ex, LoggingEvents.INIT_DATABASE.Name);
                throw;
            }
        }
    }
}
