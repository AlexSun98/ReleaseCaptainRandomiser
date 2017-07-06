using Hangfire;
using System;
using System.Collections.Generic;
using System.Text;

namespace DevPlus.Infrastructure.Hangfire.Configuration
{
    public interface IHangfireConfiguration
    {
        BackgroundJobServer Server { get; set; }

        IGlobalConfiguration GlobalConfiguration { get; }
    }
}
