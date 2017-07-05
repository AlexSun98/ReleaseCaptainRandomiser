using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace DevPlus.Infrastructure.RestfulAPI.Slack
{
    public class SlackClient
    {
        private readonly Uri _webhookUrl;
        private readonly HttpClient _httpClient = new HttpClient();

        public SlackClient(Uri webhookUrl)
        {
            _webhookUrl = webhookUrl;
        }

        public static async Task PostToSlack(string message)
        {
            //Set the valid URL of the Slack's Webhook.
            var webhookUrl = new Uri("https://hooks.slack.com/services/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");
            var slackClient = new SlackClient(webhookUrl);

            var response = await slackClient.SendMessageAsync(message, "#release-mgmt", "Test");
            var isValid = response.IsSuccessStatusCode ? "valid" : "invalid";
        }

        private async Task<HttpResponseMessage> SendMessageAsync(string message,
            string channel = null, string username = null)
        {
            var payload = new
            {
                text = message,
                channel,
                username,
            };
            var serializedPayload = JsonConvert.SerializeObject(payload);
            var response = await _httpClient.PostAsync(_webhookUrl,
                new StringContent(serializedPayload, Encoding.UTF8, "application/json"));

            return response;
        }
    }
}