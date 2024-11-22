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
    public class Task : ITask
    {
        public IDALTask _taskDAL { get; }

        public Task(IDALTask _dal)
        {
            this._taskDAL = _dal;
        }

        public bool createTask(int id, string name, int projectID, int reporterID, int mainTask = -1)
        {
            return _taskDAL.createTask(id, name, projectID, reporterID, mainTask);
        }

        public int getAvailableTaskNumber()
        {
            return _taskDAL.getAvailableTaskNumber();
        }

        public TaskDTO getTaskOnID(int id)
        {
            return _taskDAL.getTaskOnID(id);
        }

        public bool removeTask(int id)
        {
            throw new NotImplementedException();
        }

        public bool updateDescription(int taskID, string newDescription)
        {
            return _taskDAL.updateDescription(taskID, newDescription);
        }

        public bool updateWorkerID(int taskID, int workerID = -1)
        {
            return _taskDAL.updateWorkerID(taskID, workerID);
        }

        public bool updateMainTaskID(int taskID, int mainTaskID = -1)
        {
            return _taskDAL.updateMainTaskID(taskID, mainTaskID);
        }

        public bool updateName(int taskID, string newName)
        {
            return _taskDAL.updateName(taskID, newName);
        }

        public bool updateStoryPoint(int taskID, int storyPoint)
        {
            return _taskDAL.updateStoryPoint(taskID, storyPoint);
        }

        public bool updateCode(int taskID, string newCode)
        {
            return _taskDAL.updateCode(taskID, newCode);
        }
    }
}
