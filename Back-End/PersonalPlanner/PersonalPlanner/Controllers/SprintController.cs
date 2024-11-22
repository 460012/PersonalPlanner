using InterfaceLayer.Logic;
using Microsoft.AspNetCore.Mvc;

namespace PersonalPlanner.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SprintController : Controller
    {
        private readonly ISprint sprint;

        public SprintController(ISprint sprint)
        {
            this.sprint = sprint;
        }

        [HttpGet("getAvailableSprintNumber")]
        public IActionResult getAvailableSprintNumber()
        {
            int result = sprint.getAvailableSprintNumber();
            return Ok(result);
        }

        [HttpGet("addTaskToGivenSprint")]
        public IActionResult addTaskToGivenSprint(int sprintID, int taskID)
        {
            bool result = sprint.addTaskToGivenSprint(sprintID, taskID);
            return Ok(result);
        }

        [HttpGet("removeTaskFromGivenSprint")]
        public IActionResult removeTaskFromGivenSprint(int sprintID, int taskID)
        {
            bool result = sprint.removeTaskFromGivenSprint(sprintID, taskID);
            return Ok(result);
        }

        public class SprintData
        {
            public int sprintID { get; set; }
            public string name { get; set; }
            public int projectID { get; set; }
        }

        [HttpPost("CreateSprint")]
        public IActionResult CreateSprint([FromBody] SprintData data)
        {
            bool result = sprint.createSprint(data.sprintID, data.name, data.projectID);
            return Ok(result);
        }

        [HttpGet("getTasksConnectedToSprint")]
        public IActionResult getTasksConnectedToSprint(int sprintID)
        {
            List<int> result = sprint.getTasksConnectedToSprint(sprintID);
            return Ok(result);
        }
    }
}
