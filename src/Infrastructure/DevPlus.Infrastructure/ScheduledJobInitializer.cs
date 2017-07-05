using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using DevPlus.Models;
using DevPlus.Repositories;
using System;
using System.Threading.Tasks;
using Hangfire;

namespace DevPlus.Infrastructure
{
    public interface IScheduledJobInitializer
    {
        Task CreateScheduledJobAsync();
    }


    public class ScheduledJobInitializer : IScheduledJobInitializer
    {
        private readonly ILogger _logger;

        public ScheduledJobInitializer(ILogger<DatabaseInitializer> logger)
        {
            _logger = logger;
        }

        public async Task CreateScheduledJobAsync()
        {
            await Task.FromResult(0);
        }
        public async Task CreateRecurringJobAsync()
        {
            RecurringJob.AddOrUpdate(() => Console.WriteLine("Recurring!"), Cron.Daily);
        }

    }
}
