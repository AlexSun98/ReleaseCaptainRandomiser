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

namespace DevPlus.Domain.Services.ReleaseCaptains
{
    //private IReleaseCaptainRepository _repository = CoreServiceLocator.Current.GetInstance<IReleaseCaptainRepository>();

    public class ReleaseService : IReleaseService
    {
        public List<ReleaseNoteModel> GetTodayReleaseNote()
        {
            var result = new List<ReleaseNoteModel>();
            //1. Try to get data from database
            using (var repo = CoreServiceLocator.Current.GetInstance<IReleaseNoteRepository>())
            {
                var releaseNotes = repo.GetTodayReleaseNote().ToList();
                var releaseNotesModels = CoreAutoMapper.Current.Map<List<ReleaseNote>, List<ReleaseNoteModel>>(releaseNotes);
                result = releaseNotesModels;
            }

            //2. fetch data from JIRA if data doesn't exsits at database
            if(result == null || result.Count() == 0)
            {
                DateTime today = DateTime.Today;
                string theDate = today.ToString("yyyyMMdd");

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
            }

            return result;
        }
    }
}
