using AutoMapper;
using Backend.Models.Dtos;
using Backend.Models.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace BAMXTesting.Brokers
{
    public partial class BAMXApiBroker
    {
        private const string UserRelativeUrl = "https://bamx.azurewebsites.net/User";

        public async ValueTask<User> GetUserById(int userId)
        {
            string apiUrl = $"{UserRelativeUrl}/{userId}";

            HttpResponseMessage response = await this.httpClient.GetAsync(apiUrl);

            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                var user = System.Text.Json.JsonSerializer.Deserialize<User>(responseContent);
                return user;
            }
            else
            {
                Console.WriteLine("HTTP Request Failed: " + response.StatusCode);
                return null;
            }
        }

        public async ValueTask<User> PostUser(UserDto userDto)
        {
            string jsonData = System.Text.Json.JsonSerializer.Serialize(userDto);

            var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

            HttpResponseMessage response = await this.httpClient.PostAsync(UserRelativeUrl, content);
            

            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                User user = JsonConvert.DeserializeObject<User>(responseContent);
                return user;
            }
            else
            {
                Console.WriteLine("HTTP Request Failed: " + response.StatusCode);
                return null;
            }
        }

        public async ValueTask<User> DeletetUserById(int userId)
        {
            string apiUrl = $"https://bamx.azurewebsites.net/delete/{userId}";

            HttpResponseMessage response = await this.httpClient.DeleteAsync(apiUrl);

            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                User user = JsonConvert.DeserializeObject<User>(responseContent);
                return user;
            }
            else
            {
                Console.WriteLine("HTTP Request Failed: " + response.StatusCode);
                return null; 
            }
        }

    }
}
