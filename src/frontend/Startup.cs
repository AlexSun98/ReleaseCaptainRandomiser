using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using DevPlus.Website.ViewModels;
using DevPlus.Repositories.UnitOfWork;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using Newtonsoft.Json;
using DevPlus.Infrastructure;
using System;
using DevPlus.Infrastructure.Helpers;
using DevPlus.Repositories;
using DevPlus.Infrastructure.RestfulAPI.Jira;
using DevPlus.Infrastructure.RestfulAPI.Jira.Jql;
using Hangfire;


namespace DevPlus.Website
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
            services.AddDbContext<DevPlusDbContext>(options =>
            {
                //var dbConnection = Configuration["Data:DefaultConnection:ConnectionString"];
                var dbConnection = @"Server=10.200.21.125\sql2012dev_ent;Database=DevPlus;user id=sa;password=Hotbean9378@123;";
                options.UseSqlServer(dbConnection);
                //options.UseOpenIddict();
            });

            //var hangfireConnection = Configuration["Data:DefaultConnection:HangfireConnection"];
            var hangfireConnection = @"Server=10.200.21.125\sql2012dev_ent;Database=Hangfire;user id=sa;password=Hotbean9378@123;";
            services.AddHangfire(config =>
                config.UseSqlServerStorage(hangfireConnection));

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
            Uri uri = new Uri("https://infotrack.atlassian.net");
            var password = "z3263667";
            var username = "alex.sun@infotrack.com.au";

            loggerFactory.AddConsole();
            loggerFactory.AddDebug(LogLevel.Warning);
            loggerFactory.AddFile(Configuration.GetSection("Logging")); //let's use Serilog :)

            app.UseHangfireServer();
            app.UseHangfireDashboard();

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

            //***********************************************************************************************
            //Needs to refactor below code. Needs to implement scheduling framework (Hangfire Redis) to fetch tickets from Jira and post message to Slack. 
            //Data process/calculation needs to be move to service layer. This is just for demo...
            var jiraClient = new JiraRestClient(uri, username, password);

            var jsb = new JqlSearchBean();
            JqlBuilder builder2 = new JqlBuilder();
            string jql = builder2.AddCondition(EField.LABELS, EOperator.EQUALS, "20170629")
                    .OrderBy(SortOrder.ASC, EField.CREATED);
            jsb.jql = jql;
            jsb.AddField(EField.ASSIGNEE ,EField.LABELS, EField.STATUS, EField.DUE, EField.SUMMARY, EField.ISSUE_TYPE, EField.PRIORITY, EField.UPDATED, EField.TRANSITIONS);
            jsb.AddExpand(EField.TRANSITIONS);
            var task = jiraClient.SearchClient.SearchIssues(jsb);
            //var result = task.GetAwaiter().GetResult() as JqlSearchResult;

            //SlackClient.PostToSlack(result.issues[0].fields.assignee.name).Wait();
            //************************************************************************************************
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
