using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Platform.Modules.Jira
{
    /// <summary>
    /// Default workflow actions for a standard JIRA install.
    /// </summary>
    public static class WorkflowActions
    {
        public const string Resolve = "Resolve Issue";
        public const string Close = "Close Issue";
        public const string StartProgress = "Start Progress";
    }
}
