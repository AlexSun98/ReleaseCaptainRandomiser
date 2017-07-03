using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Platform.Modules.Jira
{
    /// <summary>
    /// The worklog time remaining strategy 
    /// </summary>
    public enum WorklogStrategy
    {
        AutoAdjustRemainingEstimate,
        RetainRemainingEstimate,
        NewRemainingEstimate
    }
}
