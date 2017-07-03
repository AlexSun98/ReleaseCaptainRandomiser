using System;

namespace Micromata.Jira.Test
{
    public abstract class BaseTest
    {
        protected Uri uri = new Uri("https://infotrack.atlassian.net");

        protected const string username = "alex.sun@infotrack.com.au";

        protected const string password = "z3263667";

        protected const string project_key = "DEMO";

        protected const string issuekey_to_search = "DEMO-1";

        protected JiraRestClient restClient;

        public BaseTest(){
            restClient =  new JiraRestClient(uri, username, password);
        }
    }
}