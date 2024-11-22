using InterfaceLayer.DAL;
using InterfaceLayer.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InterfaceLayer.Logic
{
    public interface ITask
    {
        IDALTask _taskDAL { get; }
        int getAvailableTaskNumber();
        bool createTask(int id, string name, int projectID, int reporterID, int mainTask = -1);
        bool removeTask(int id);
        TaskDTO getTaskOnID(int id);
        bool updateDescription(int taskID, string newDescription);
        bool updateCode(int taskID, string newCode);
        bool updateWorkerID(int taskID, int workerID = -1);
        bool updateMainTaskID(int taskID, int mainTaskID = -1);
        bool updateName(int taskID, string newName);
        bool updateStoryPoint(int taskID, int storyPoint);
    }
}
