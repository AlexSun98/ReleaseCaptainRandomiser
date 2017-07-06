using System;
using System.Collections.Generic;
using System.Text;

namespace DevPlus.Infrastructure.Hangfire
{
    public interface IBackgroundJob<in TArgs>
    {
        void Execute(TArgs args);
    }
}
