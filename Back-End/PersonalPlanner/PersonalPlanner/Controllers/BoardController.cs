using InterfaceLayer.DTO;
using InterfaceLayer.Logic;
using Logic_Layer;
using Microsoft.AspNetCore.Mvc;

namespace PersonalPlanner.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BoardController : Controller
    {
        private readonly IBoard board;

        public BoardController(IBoard board)
        {
            this.board = board;
        }

        [HttpGet("GetAvailableBoardNumber")]
        public IActionResult GetAvailableBoardNumber()
        {
            int result = board.getAvailableBoardNumber();
            return Ok(result);
        }

        [HttpPost("CreateBoard")]
        public IActionResult CreateBoard([FromBody] BoardDTO boardData)
        {
            bool result = board.createBoard(boardData.id, boardData.name, boardData.projectID, boardData.number, false);
            return Ok(result);
        }

        [HttpGet("AddTaskToBoard")]
        public IActionResult AddTaskToBoard(string taskID, string boardID)
        {
            bool result = board.addTaskToBoard(Convert.ToInt32(boardID), Convert.ToInt32(taskID));
            return Ok(result);
        }

        [HttpGet("ChangeBoardNumber")]
        public IActionResult ChangeBoardNumber(string boardID, string newNumber)
        {
            bool result = board.changeBoardNumber(Convert.ToInt32(boardID), Convert.ToInt32(newNumber));
            return Ok(result);
        }

        [HttpGet("ChangeBoardName")]
        public IActionResult ChangeBoardName(string boardID, string newName)
        {
            bool result = board.changeBoardName(Convert.ToInt32(boardID), newName);
            return Ok(result);
        }
    }
}
