using System;
using System.Threading.Tasks;

namespace DevPlus.Infrastructure.Hangfire
{
    public interface IHangfireJobManager
    {
        Task EnqueueBackgroundJobAsync<TJob, TArgs>(TArgs args, JobPriority priority = JobPriority.Normal,
           TimeSpan? delay = null) where TJob : IBackgroundJob<TArgs>;

        Task EnqueueRecurringJobAsync<TJob, TArgs>(string jobId, TArgs args, string cronExp, JobPriority priority = JobPriority.Normal) where TJob : IBackgroundJob<TArgs>;
    }
}
