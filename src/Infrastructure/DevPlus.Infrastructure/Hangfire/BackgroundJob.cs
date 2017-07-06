using System;
using System.Collections.Generic;
using System.Text;

namespace DevPlus.Infrastructure.Hangfire
{
    public abstract class BackgroundJob<TArgs> : IBackgroundJob<TArgs>
    {
        public abstract void Execute(TArgs args);
    }
}
