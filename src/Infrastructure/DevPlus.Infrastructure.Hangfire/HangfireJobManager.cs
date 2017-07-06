
using System;
using System.Threading.Tasks;
using HangfireBackgroundJob = Hangfire.BackgroundJob;
using HangfireRecurringJob = Hangfire.RecurringJob;

namespace DevPlus.Infrastructure.Hangfire
{
    public class HangfireJobManager : IHangfireJobManager
    {
        /// <summary>
        /// Split processing across multiple queues and we can prioritize jobs.
        /// </summary>
        public Task EnqueueBackgroundJobAsync<TJob, TArgs>(TArgs args, JobPriority priority = JobPriority.Normal,
            TimeSpan? delay = null) where TJob : IBackgroundJob<TArgs>
        {
            if (!delay.HasValue)
                HangfireBackgroundJob.Enqueue<TJob>(job => job.Execute(args));
            else
                HangfireBackgroundJob.Schedule<TJob>(job => job.Execute(args), delay.Value);
            return Task.FromResult(0);
        }

        public Task EnqueueRecurringJobAsync<TJob, TArgs>(string jobId, TArgs args, string cronExp, JobPriority priority = JobPriority.Normal) where TJob : IBackgroundJob<TArgs>
        {

            HangfireRecurringJob.AddOrUpdate<TJob>(jobId, job => job.Execute(args), cronExp);

            return Task.FromResult(0);
        }
    }
}
