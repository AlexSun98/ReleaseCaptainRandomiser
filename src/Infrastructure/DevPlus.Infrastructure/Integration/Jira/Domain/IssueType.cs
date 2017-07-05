namespace DevPlus.Infrastructure.RestfulAPI.Jira.Domain
{
    public class IssueType : Base
    {
        public string description { get; set; }
        public string iconUrl { get; set; }
        public bool subtask { get; set; }
    }
}
