using InterfaceLayer.DAL;
using InterfaceLayer.DTO;
using InterfaceLayer.Logic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic_Layer
{
    public class Board : IBoard
    {
        public IDALBoard _boardDAL { get; }

        public Board(IDALBoard _dal)
        {
            this._boardDAL = _dal;
        }

        public bool changeBoardNumber(int id, int newNumber)
        {
            return _boardDAL.changeBoardNumber(id, newNumber);
        }

        public bool createBoard(int id, string name, int projectID, int number, bool standard = false)
        {
            return _boardDAL.createBoard(id, name, projectID, number, standard);
        }

        public int getAvailableBoardNumber()
        {
            return _boardDAL.getAvailableBoardNumber();
        }

        public BoardDTO getBoardOnID(int id)
        {
            throw new NotImplementedException();
        }

        public bool addTaskToBoard(int boardID, int taskID)
        {
            return _boardDAL.addTaskToBoard(boardID, taskID);
        }

        public bool removeBoard(int id)
        {
            throw new NotImplementedException();
        }

        public List<int> getTasksConnectedToBoard(int boardID)
        {
            return _boardDAL.getTasksConnectedToBoard(boardID);
        }

        public bool changeBoardName(int id, string newName)
        {
            return _boardDAL.changeBoardName(id, newName);
        }
    }
}
