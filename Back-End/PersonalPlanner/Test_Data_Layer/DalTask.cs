using InterfaceLayer.DAL;
using InterfaceLayer.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test_Data_Layer
{
    public class DalTask : IDALTask
    {
        private Dictionary<int, TaskDTO> _tasks; // Simulating an in-memory database

        public DalTask()
        {
            _tasks = new Dictionary<int, TaskDTO>();
        }

        public bool createTask(int id, string name, int projectID, int reporterID, int mainTask = -1)
        {
            if (!_tasks.ContainsKey(id))
            {
                _tasks[id] = new TaskDTO
                {
                    id = id,
                    name = name,
                    projectID = projectID,
                    reporter = reporterID,
                    mainTask = mainTask
                    // You may initialize other properties here as needed
                };
                return true;
            }
            return false; // Task with same ID already exists
        }

        public int getAvailableTaskNumber()
        {
            return _tasks.Count; // Return the count of tasks
        }

        public TaskDTO getTaskOnID(int id)
        {
            if (_tasks.ContainsKey(id))
            {
                return _tasks[id];
            }
            return null; // Task not found
        }

        public bool removeTask(int id)
        {
            if (_tasks.ContainsKey(id))
            {
                _tasks.Remove(id);
                return true;
            }
            return false; // Task not found
        }

        public bool updateCode(int taskID, string newCode)
        {
            if (_tasks.ContainsKey(taskID))
            {
                _tasks[taskID].code = newCode;
                return true;
            }
            return false; // Task not found
        }

        public bool updateDescription(int taskID, string newDescription)
        {
            if (_tasks.ContainsKey(taskID))
            {
                _tasks[taskID].description = newDescription;
                return true;
            }
            return false; // Task not found
        }

        public bool updateMainTaskID(int taskID, int mainTaskID = -1)
        {
            if (_tasks.ContainsKey(taskID))
            {
                _tasks[taskID].mainTask = mainTaskID;
                return true;
            }
            return false; // Task not found
        }

        public bool updateName(int taskID, string newName)
        {
            if (_tasks.ContainsKey(taskID))
            {
                _tasks[taskID].name = newName;
                return true;
            }
            return false; // Task not found
        }

        public bool updateStoryPoint(int taskID, int storyPoint)
        {
            if (_tasks.ContainsKey(taskID))
            {
                _tasks[taskID].storyPointEstimate = storyPoint;
                return true;
            }
            return false; // Task not found
        }

        public bool updateWorkerID(int taskID, int workerID = -1)
        {
            if (_tasks.ContainsKey(taskID))
            {
                _tasks[taskID].worker = workerID;
                return true;
            }
            return false; // Task not found
        }
    }
}
