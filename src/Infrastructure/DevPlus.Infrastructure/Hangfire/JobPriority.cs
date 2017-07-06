using System;
using System.Collections.Generic;
using System.Text;

namespace DevPlus.Infrastructure.Hangfire
{
    public enum JobPriority : byte
    {
        Low = 5,

        BelowNormal = 10,

        Normal = 15,

        AboveNormal = 20,

        High = 25
    }
}
