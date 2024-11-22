using InterfaceLayer.DAL;
using InterfaceLayer.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test_Data_Layer
{
    public class DalSprint : IDALSprint
    {
        private Dictionary<int, SprintDTO> _sprints;
        private Dictionary<int, List<int>> _sprintTasks;

        public DalSprint()
        {
            _sprints = new Dictionary<int, SprintDTO>();
            _sprintTasks = new Dictionary<int, List<int>>();
        }

        private int getAvailableSprintTaskNumber()
        {
            int maxId = _sprintTasks.Values.SelectMany(taskIds => taskIds).DefaultIfEmpty(0).Max();
            return maxId + 1;
        }

        public bool addTaskToGivenSprint(int sprintID, int taskID)
        {
            if (!_sprintTasks.ContainsKey(sprintID))
            {
                _sprintTasks[sprintID] = new List<int>();
            }

            if (_sprintTasks[sprintID].Contains(taskID))
            {
                return false; // Task already exists in the sprint
            }

            _sprintTasks[sprintID].Add(taskID);
            return true;
        }

        public bool createSprint(int id, string name, int projectID)
        {
            if (!_sprints.ContainsKey(id))
            {
                _sprints[id] = new SprintDTO
                {
                    id = id,
                    name = name,
                    projectID = projectID
                };
                return true;
            }
            return false; // Sprint with the same ID already exists
        }

        public int getAvailableSprintNumber()
        {
            if (_sprints.Any())
            {
                return _sprints.Keys.Max() + 1;
            }
            return 1;
        }

        public SprintDTO getSprintOnID(int id)
        {
            if (_sprints.ContainsKey(id))
            {
                return _sprints[id];
            }
            return null; // Sprint not found
        }

        public List<int> getTasksConnectedToSprint(int sprintID)
        {
            if (_sprintTasks.ContainsKey(sprintID))
            {
                return new List<int>(_sprintTasks[sprintID]);
            }
            return new List<int>(); // No tasks found
        }

        public bool removeTaskFromGivenSprint(int sprintID, int taskID)
        {
            if (_sprintTasks.ContainsKey(sprintID))
            {
                return _sprintTasks[sprintID].Remove(taskID);
            }
            return false; // Sprint or Task not found
        }
    }
}
