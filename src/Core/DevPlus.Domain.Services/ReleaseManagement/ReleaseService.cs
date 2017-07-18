using DevPlus.Domain.Interfaces.DomainServices;
using DevPlus.Repositories.Entities;
using DevPlus.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using DevPlus.Domain.Models;
using DevPlus.Infrastructure.RestfulAPI.Jira;
using DevPlus.Infrastructure.RestfulAPI.Jira.Jql;
using DevPlus.Infrastructure.Helpers;

namespace DevPlus.Domain.Services.ReleaseManagement
{
    public class ReleaseService : IReleaseService
    {
        private IReleaseNoteRepository _releaseRepository = CoreServiceLocator.Current.GetInstance<IReleaseNoteRepository>();
        //private ITestService _testService = CoreServiceLocator.Current.GetInstance<ITestService>();

        /// <summary>
        /// Try to get data from database
        /// </summary>
        /// <returns></returns>
        public List<ReleaseNoteModel> GetTodayReleaseNoteFromDb()
        {   
            var releaseNotes = _releaseRepository.GetTodayReleaseNote().ToList();
            var releaseNotesModels = CoreAutoMapper.Current.Map<List<ReleaseNote>, List<ReleaseNoteModel>>(releaseNotes);
            return releaseNotesModels;
        }

        /// <summary>
        /// Fetch data from JIRA if data doesn't exsits at database
        /// </summary>
        /// <returns></returns>
        public List<ReleaseNoteModel> GetTodayReleaseNoteFromJira()
        {
            var result = new List<ReleaseNoteModel>();
            var theDate = Utilities.GetFormatedDateForToday();

            var jiraClient = new JiraRestClient();
            var jsb = new JqlSearchBean();
            JqlBuilder builder = new JqlBuilder();
            string jql = builder.AddCondition(EField.LABELS, EOperator.EQUALS, theDate)
                    .OrderBy(SortOrder.ASC, EField.CREATED);
            jsb.jql = jql;
            jsb.AddField(EField.ASSIGNEE, EField.LABELS, EField.STATUS, EField.DUE, EField.SUMMARY, EField.ISSUE_TYPE, EField.PRIORITY, EField.UPDATED, EField.TRANSITIONS);
            jsb.AddExpand(EField.TRANSITIONS);
            var task = jiraClient.SearchClient.SearchIssues(jsb);
            var tickets = task.GetAwaiter().GetResult() as JqlSearchResult;
            var a = tickets.issues[0].fields;

            return result;
        }

        public List<ReleaseNoteModel> GetTodayReleaseNote()
        {
            //var test = _testService.Echo("Hello");

            var result = new List<ReleaseNoteModel>();
            result = GetTodayReleaseNoteFromDb();
            if (result == null || result.Count() == 0)
            {
                result = GetTodayReleaseNoteFromJira();
            }
            return result;
        }

    }
}
