using DevPlus.Domain.Models;
using System;
using System.Collections.Generic;

namespace DevPlus.Tests.Common
{
    public class ReleaseNoteModelBuilder
    {
        private ReleaseNoteModel _releaseNote = null;
        private int _releaseNoteId = new Random().Next(int.MinValue, int.MaxValue);
        private string _noteSummary = string.Empty;
        private string _assignee = string.Empty;
        private string _summary = string.Empty;
        private string _status = string.Empty;
        private string _issueKey = string.Empty;
        private string _issueType = string.Empty;
        private string _project = string.Empty;
        private string _priority = string.Empty;
        private string _labels = string.Empty;
        private string _epicLinks = string.Empty;
        private string _component = string.Empty;
        private string _category = string.Empty;
        private string _sprint = string.Empty;
        private string _description = string.Empty;
        private DateTime _noteDateCreated = new DateTime(2017, 7, 12);
        private DateTime _noteDateModified = new DateTime(2017, 7, 12);

        public static ReleaseNoteModelBuilder Factory()
        {
            return new ReleaseNoteModelBuilder();
        }

        public ReleaseNoteModel Build()
        {
            _releaseNote = new ReleaseNoteModel(
                _releaseNoteId, 
                _noteSummary,
                _assignee,
                _summary,
                _status,
                _issueKey,
                _issueType,
                _project,
                _priority,
                _labels,
                _epicLinks,
                _component,
                _category,
                _sprint,
                _description,
                _noteDateCreated,
                _noteDateModified
                );
            return _releaseNote;
        }

        public ReleaseNoteModelBuilder WithAssignee(string assignee)
        {
            _assignee = assignee;
            return this;
        }

        public ReleaseNoteModelBuilder WithPriority(string priority)
        {
            _priority = priority;
            return this;
        }

        public ReleaseNoteModelBuilder WithLabel(string label)
        {
            _labels = label;
            return this;
        }
    }
}
