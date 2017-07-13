using System;

namespace DevPlus.Domain.Models
{
    public class ReleaseNoteModel
    {
        public ReleaseNoteModel(int releaseNoteId, string noteSummary, string assignee, string summary, string status, string issueKey, string issueType,
            string project, string priority, string labels, string epicLinks, string component, string category, string sprint, string description, DateTime noteDateCreated,
            DateTime noteDateModified)
        {
            ReleaseNoteId = releaseNoteId;
            NoteSummary = noteSummary;
            Assignee = assignee;
            Summary = summary;
            Status = status;
            IssueKey = issueKey;
            IssueType = issueType;
            Project = project;
            Priority = priority;
            Labels = labels;
            EpicLinks = epicLinks;
            Component = component;
            Category = category;
            Sprint = sprint;
            Description = description;
            NoteDateCreated = noteDateCreated;
            NoteDateModified = noteDateModified;
        }
      
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
