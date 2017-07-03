using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Platform.Modules.Jira
{
    /// <summary>
    /// Represents the operations on the issue resolutions of jira.
    /// </summary>
    public interface IIssueResolutionService
    {
        /// <summary>
        /// Returns all the issue resolutions within JIRA.
        /// </summary>
        /// <param name="token">Cancellation token for this operation.</param>
        Task<IEnumerable<IssueResolution>> GetResolutionsAsync(CancellationToken token = default(CancellationToken));
    }
}