using InterfaceLayer.DAL;
using InterfaceLayer.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InterfaceLayer.Logic
{
    public interface IBoard
    {
        IDALBoard _boardDAL { get; }
        int getAvailableBoardNumber();
        bool createBoard(int id, string name, int projectID, int number, bool standard = false);
        bool changeBoardNumber(int id, int newNumber);
        bool addTaskToBoard(int boardID, int taskID);
        bool removeBoard(int id);
        List<int> getTasksConnectedToBoard(int boardID);
        BoardDTO getBoardOnID(int id);
        bool changeBoardName(int id, string newName);
    }
}
