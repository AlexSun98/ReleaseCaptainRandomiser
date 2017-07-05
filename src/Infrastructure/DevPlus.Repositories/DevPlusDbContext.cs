using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using DevPlus.Models;

namespace DevPlus.Repositories
{
    public class DevPlusDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public DbSet<ReleaseCaptain> ReleaseCaptains { get; set; }


        public DevPlusDbContext(DbContextOptions options) : base(options)
        { }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ReleaseCaptain>().Property(c => c.Name).IsRequired().HasMaxLength(100);
            builder.Entity<ReleaseCaptain>().ToTable("ReleaseCaptains");
        }
    }
}