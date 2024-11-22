using InterfaceLayer.DTO;
using InterfaceLayer.Logic;
using Logic_Layer;
using Microsoft.AspNetCore.Mvc;

namespace PersonalPlanner.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : Controller
    {
        private readonly ITask task;
        private readonly IBoard board;
        private readonly IProject project;

        public TaskController(ITask task, IBoard board, IProject project)
        {
            this.task = task;
            this.board = board;
            this.project = project;
        }

        public class TaskBasic
        {
            public int id { get; set; }
            public string name { get; set; }
            public int projectID { get; set; }
            public int reporterID { get; set; }
            public int mainTask { get; set; } = -1;
        }

        [HttpGet("getAvailableTaskNumber")]
        public IActionResult getAvailableTaskNumber()
        {
            int result = task.getAvailableTaskNumber();
            return Ok(result);
        }

        [HttpPost("CreateTask")]
        public IActionResult CreateTask([FromBody] TaskBasic data)
        {
            //When creating task add task to standard Unchangable board true board_task
            bool taskCreated = task.createTask(data.id, data.name, data.projectID, data.reporterID, data.mainTask);

            int standardBoardIDFromProject = project.getStandardBoardID(data.projectID);
            bool taskAddedToBoard = board.addTaskToBoard(standardBoardIDFromProject, data.id);

            bool result = taskCreated && taskAddedToBoard;
            return Ok(result);
        }

        [HttpGet("GetTaskOnID")]
        public IActionResult GetTaskOnID(string TaskID)
        {
            TaskDTO result = task.getTaskOnID(Convert.ToInt32(TaskID));
            return Ok(result);
        }

        [HttpGet("ChangeDescription")]
        public IActionResult ChangeDescription(string taskID, string newDescription)
        {
            bool result = task.updateDescription(Convert.ToInt32(taskID), newDescription);
            return Ok(result);
        }

        [HttpGet("ChangeWorker")]
        public IActionResult ChangeWorker(string taskID, string newWorkerID)
        {
            bool result = task.updateWorkerID(Convert.ToInt32(taskID), Convert.ToInt32(newWorkerID));
            return Ok(result);
        }

        [HttpGet("ChangeMainTask")]
        public IActionResult ChangeMainTask(string taskID, string newMainTaskID)
        {
            bool result = task.updateMainTaskID(Convert.ToInt32(taskID), Convert.ToInt32(newMainTaskID));
            return Ok(result);
        }

        [HttpGet("ChangeName")]
        public IActionResult ChangeName(string taskID, string newName)
        {
            bool result = task.updateName(Convert.ToInt32(taskID), newName);
            return Ok(result);
        }

        [HttpGet("ChangeStoryPoint")]
        public IActionResult ChangeStoryPoint(string taskID, string newStoryPoint)
        {
            bool result = task.updateStoryPoint(Convert.ToInt32(taskID), Convert.ToInt32(newStoryPoint));
            return Ok(result);
        }

        [HttpGet("ChangeCode")]
        public IActionResult ChangeCode(string taskID, string newCode)
        {
            bool result = task.updateName(Convert.ToInt32(taskID), newCode);
            return Ok(result);
        }
    }
}
