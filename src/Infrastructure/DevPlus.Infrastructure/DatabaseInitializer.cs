using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using DevPlus.Models;
using DevPlus.Repositories;
using System;
using System.Threading.Tasks;

namespace DevPlus.Infrastructure
{
    public interface IDatabaseInitializer
    {
        Task SeedAsync();
    }


    public class DatabaseInitializer : IDatabaseInitializer
    {
        private readonly DevPlusDbContext _context;
        private readonly ILogger _logger;

        public DatabaseInitializer(DevPlusDbContext context, ILogger<DatabaseInitializer> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task SeedAsync()
        {
            //await _context.Database.MigrateAsync().ConfigureAwait(false);

            if (!await _context.ReleaseCaptains.AnyAsync())
            {
                ReleaseCaptain releaseCaptain = new ReleaseCaptain
                {
                    Name = "Test User",
                    LastCaptaincyDate = DateTime.UtcNow,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow
                };

                _context.ReleaseCaptains.Add(releaseCaptain);

                await _context.SaveChangesAsync();
            }
        }
    }
}
