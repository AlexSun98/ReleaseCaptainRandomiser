using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using DevPlus.Repositories.Entities;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;


namespace DevPlus.Repositories
{
    public class DevPlusDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public DbSet<ReleaseCaptain> ReleaseCaptains { get; set; }
        public DbSet<ReleaseNote> ReleaseNotes { get; set; }
        
        public DevPlusDbContext() { }

        public DevPlusDbContext(DbContextOptions<DevPlusDbContext> options) : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var dbConnection = @"Server=10.200.21.125\sql2012dev_ent;Database=DevPlus;user id=sa;password=Hotbean9378@123;";
            optionsBuilder.UseSqlServer(dbConnection);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ReleaseCaptain>().Property(c => c.Name).IsRequired().HasMaxLength(100);
            builder.Entity<ReleaseCaptain>().ToTable("ReleaseCaptains");

            builder.Entity<ReleaseNote>().ToTable("ReleaseNotes");
        }
    }

    //public class DevPlusDbContextFactory : IDbContextFactory<DevPlusDbContext>
    //{
    //    private IConfigurationRoot configuration;

    //    public DevPlusDbContextFactory()
    //    {
    //        var builder = new ConfigurationBuilder()
    //       .SetBasePath(System.AppContext.BaseDirectory)
    //       .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

    //        configuration = builder.Build();
    //    }

    //    public DevPlusDbContext Create(DbContextFactoryOptions options)
    //    {
    //        var optionsBuilder = new DbContextOptionsBuilder<DevPlusDbContext>();
    //        optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"), m => { m.EnableRetryOnFailure(); });

    //        return new DevPlusDbContext(optionsBuilder.Options);
    //    }
    //}
}