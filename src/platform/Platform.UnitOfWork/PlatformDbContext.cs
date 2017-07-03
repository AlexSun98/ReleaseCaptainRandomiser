using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Platform.Models;

namespace Platform.UnitOfWork
{
    public class PlatformDbContext : IdentityDbContext
    {
        public DbSet<ReleaseCaptain> ReleaseCaptains { get; set; }


        public PlatformDbContext(DbContextOptions options) : base(options)
        { }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ReleaseCaptain>().Property(c => c.Name).IsRequired().HasMaxLength(100);
            builder.Entity<ReleaseCaptain>().ToTable($"App{nameof(this.ReleaseCaptains)}");
        }
    }
}