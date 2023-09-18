using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("/")]
    public class HomeController
    {

        [HttpGet]
        public string Home()
        {
            return "Welcome to BAMX Backend";
        }
    }
}
