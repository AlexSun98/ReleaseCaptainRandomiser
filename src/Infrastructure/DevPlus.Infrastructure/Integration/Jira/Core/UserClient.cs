using System.Runtime.Serialization.Json;
using System.Threading.Tasks;
using DevPlus.Infrastructure.RestfulAPI.Jira.Domain;
using DevPlus.Infrastructure.RestfulAPI.Jira.Util;

namespace DevPlus.Infrastructure.RestfulAPI.Jira.Core
{
    public class UserClient : BaseClient
    {
        public UserClient(JiraRestClient jiraRestClient) : base(jiraRestClient)
        {
        }

        public async Task<User> GetLoggedInUser()
        {        
            var restUriBuilder = UriHelper.BuildPath(baseUri, RestPathConstants.USER);
            restUriBuilder.Query = "username=" + username;
            var completeURI = restUriBuilder.ToString();
            var stream = client.GetStreamAsync(completeURI);
            var serializer = new DataContractJsonSerializer(typeof(User));
            return serializer.ReadObject(await stream) as User;
        }

        public async Task<User> GetUserByUsername(string username){
             var restUriBuilder = UriHelper.BuildPath(baseUri, RestPathConstants.USER);
            restUriBuilder.Query = "username=" + username;
            var completeURI = restUriBuilder.ToString();
            var stream = client.GetStreamAsync(completeURI);
            var serializer = new DataContractJsonSerializer(typeof(User));
            return serializer.ReadObject(await stream) as User;
        }
    }
}