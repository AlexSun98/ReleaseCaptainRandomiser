using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Platform.Modules.Jira
{
    [Flags]
    public enum JiraUserStatus
    {
        Active = 1,
        Inactive = 2
    }
}
