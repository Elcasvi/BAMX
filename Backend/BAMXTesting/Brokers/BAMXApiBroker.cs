using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.Testing;
using RESTFulSense.Clients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
 
namespace BAMXTesting.Brokers
{
    public partial class BAMXApiBroker
    {
        private readonly WebApplicationFactory<Program> webApplication;
        private readonly HttpClient httpClient;
        private readonly IRESTFulApiFactoryClient apiFactoryClient;
        public BAMXApiBroker()
        {
            this.webApplication = new WebApplicationFactory<Program>();
            this.httpClient = new HttpClient();
            this.apiFactoryClient=new RESTFulApiFactoryClient(this.httpClient);
        }
    }
}
