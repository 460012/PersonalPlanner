using InterfaceLayer.DTO;
using InterfaceLayer.Logic;
using Logic_Layer;
using Microsoft.AspNetCore.Mvc;

namespace PersonalPlanner.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectController : Controller
    {
        private readonly IProject project;
        private readonly IBoard board;

        public ProjectController(IProject project, IBoard board)
        {
            this.project = project;
            this.board = board;
        }

        [HttpGet("GetAvailableProjectID")]
        public IActionResult GetAvailableProjectID()
        {
            int number = project.getAvailableProjectNumber();
            return Ok(number);
        }

        [HttpPost("CreateProject")]
        public IActionResult CreateProject([FromBody] ProjectDTO projectData)
        {
            //TODO: Standard add board with unchangable true for this project
            //Call BoardController.CreateBoard([FromBody] BoardDTO boardData) here with standard data and call BoardController.GetAvailableBoardNumber()
            bool projectCreated = project.createProject(projectData.id, projectData.teamID, projectData.ownerID, projectData.name, projectData.description);
            if (!projectCreated)
            {
                return StatusCode(500, "Error creating project.");
            }

            //creating board
            int boardID = board.getAvailableBoardNumber();  
            bool boardCreated = board.createBoard(boardID, "To Do", projectData.id, 0, true);
            if (!boardCreated)
            {
                return StatusCode(500, "Error creating standard board for project.");
            }

            bool result = projectCreated && boardCreated;
            return Ok(result);
        }

        [HttpGet("GetAllYourRelatedProjects")]
        public IActionResult GetAllYourRelatedProjects(string UserID)
        {
            //get project where you are in the team or where you're owner id is that of the projects
            List<ProjectDTO> projects = project.getAllProjectsForUser(Convert.ToInt32(UserID));
            return Ok(projects);
        }

        [HttpGet("GetAllProjectSprints")]
        public IActionResult GetAllProjectSprints(string ProjectID)
        {
            //get project where you are in the team or where you're owner id is that of the projects
            List<SprintDTO> projects = project.getAllProjectSprints(Convert.ToInt32(ProjectID));
            return Ok(projects);
        }

        [HttpGet("GetAllProjectTasks")]
        public IActionResult GetAllProjectTasks(string ProjectID)
        {
            //get project where you are in the team or where you're owner id is that of the projects
            List<TaskDTO> projects = project.getAllProjectTasks(Convert.ToInt32(ProjectID));
            return Ok(projects);
        }

        [HttpGet("GetAllProjectBoards")]
        public IActionResult GetAllProjectBoards(string ProjectID)
        {
            //get project where you are in the team or where you're owner id is that of the projects
            List<BoardDTO> projects = project.getAllProjectBoards(Convert.ToInt32(ProjectID));
            return Ok(projects);
        }

        [HttpGet("getBoardTasks")]
        public IActionResult getBoardTasks(string ProjectID)
        {
            List<BoardTask> result = project.getTasksConnectedToBoards(Convert.ToInt32(ProjectID));
            return Ok(result);
        }
    }
}
