using InterfaceLayer.DAL;
using InterfaceLayer.Logic;
using Microsoft.AspNetCore.Mvc;
using PersonalPlanner.Models;

namespace PersonalPlanner.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUser user;

        public UserController(IUser user)
        {
            this.user = user;
        }

        [HttpPost("checkAndActEmail")]
        public IActionResult CheckAndActEmail([FromBody] EmailModel email)
        {
            int number = user.checkAndActEmail(email.Email);
            return Ok(number);
        }
    }
}
