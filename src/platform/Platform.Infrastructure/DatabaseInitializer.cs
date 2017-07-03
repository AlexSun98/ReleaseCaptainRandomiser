using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Platform.Models;
using System;
using System.Threading.Tasks;

namespace Platform.Infrastructure
{
    public interface IDatabaseInitializer
    {
        Task SeedAsync();
    }


    public class DatabaseInitializer : IDatabaseInitializer
    {
        private readonly PlatformDbContext _context;
        private readonly ILogger _logger;

        public DatabaseInitializer(PlatformDbContext context, ILogger<DatabaseInitializer> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task SeedAsync()
        {
            //await _context.Database.MigrateAsync().ConfigureAwait(false);

            if (!await _context.ReleaseCaptains.AnyAsync())
            {
                ReleaseCaptain rc_1 = new ReleaseCaptain
                {
                    Name = "Test User",
                    LastCaptaincyDate = DateTime.UtcNow,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow
                };

                _context.ReleaseCaptains.Add(rc_1);

                await _context.SaveChangesAsync();
            }
        }
    }
}
