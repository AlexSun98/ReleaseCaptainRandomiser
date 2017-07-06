using Hangfire;
using HangfireGlobalConfiguration = Hangfire.GlobalConfiguration;

namespace DevPlus.Infrastructure.Hangfire.Configuration
{
    public class HangfireConfiguration
    {
        public BackgroundJobServer Server { get; set; }

        public IGlobalConfiguration GlobalConfiguration
        {
            get { return HangfireGlobalConfiguration.Configuration; }
        }
    }
}
