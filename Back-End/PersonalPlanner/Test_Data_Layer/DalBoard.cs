using InterfaceLayer.DAL;
using InterfaceLayer.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Test_Data_Layer
{
    public class DalBoard : IDALBoard
    {
        private Dictionary<int, BoardDTO> _boards;
        private Dictionary<int, List<int>> _boardTasks;

        public DalBoard()
        {
            _boards = new Dictionary<int, BoardDTO>();
            _boardTasks = new Dictionary<int, List<int>>();
        }

        public bool addTaskToBoard(int boardID, int taskID)
        {
            if (!_boards.ContainsKey(boardID))
            {
                return false; // Board does not exist
            }

            if (!_boardTasks.ContainsKey(boardID))
            {
                _boardTasks[boardID] = new List<int>();
            }

            if (_boardTasks[boardID].Contains(taskID))
            {
                return false; // Task already added to the board
            }

            _boardTasks[boardID].Add(taskID);
            return true;
        }

        private int getAvailableBoardTaskNumber()
        {
            if (_boardTasks.Values.SelectMany(x => x).Any())
            {
                return _boardTasks.Values.SelectMany(x => x).Max() + 1;
            }
            return 1;
        }

        public bool changeBoardNumber(int id, int newNumber)
        {
            if (_boards.ContainsKey(id))
            {
                _boards[id].number = newNumber;
                return true;
            }
            return false; // Board not found
        }

        public bool createBoard(int id, string name, int projectID, int number, bool standard = false)
        {
            if (!_boards.ContainsKey(id))
            {
                _boards[id] = new BoardDTO
                {
                    id = id,
                    name = name,
                    projectID = projectID,
                    number = number,
                    standard = standard
                };
                return true;
            }
            return false; // Board with the same ID already exists
        }

        public int getAvailableBoardNumber()
        {
            if (_boards.Any())
            {
                return _boards.Keys.Max() + 1;
            }
            return 1;
        }

        public BoardDTO getBoardOnID(int id)
        {
            if (_boards.ContainsKey(id))
            {
                return _boards[id];
            }
            return null; // Board not found
        }

        public bool removeBoard(int id)
        {
            if (_boards.ContainsKey(id))
            {
                _boards.Remove(id);
                _boardTasks.Remove(id); // Remove associated tasks
                return true;
            }
            return false; // Board not found
        }

        public List<int> getTasksConnectedToBoard(int boardID)
        {
            if (_boardTasks.ContainsKey(boardID))
            {
                return new List<int>(_boardTasks[boardID]);
            }
            return new List<int>(); // No tasks found
        }

        public bool changeBoardName(int id, string newName)
        {
            if (_boards.ContainsKey(id))
            {
                _boards[id].name = newName;
                return true;
            }
            return false; // Board not found
        }
    }
}
