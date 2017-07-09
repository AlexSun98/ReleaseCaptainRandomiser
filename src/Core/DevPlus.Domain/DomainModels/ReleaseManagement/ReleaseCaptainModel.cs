using System;

namespace DevPlus.Domain.Models
{
    public class ReleaseCaptainModel
    {
        public int ReleaseNoteId { get; set; }
        public string NoteSummary { get; set; }
        public string Assignee { get; set; }
        public string Summary { get; set; }
        public string Status { get; set; }
        public string IssueKey { get; set; }
        public string IssueType { get; set; }
        public string Project { get; set; }
        public string Priority { get; set; }
        public string Labels { get; set; }
        public string EpicLinks { get; set; }
        public string Component { get; set; }
        public string Category { get; set; }
        public string Sprint { get; set; }
        public string Description { get; set; }
        public DateTime NoteDateCreated { get; set; }
        public DateTime NoteDateModified { get; set; }
    }
}
