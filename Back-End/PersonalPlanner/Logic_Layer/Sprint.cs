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
    public class Sprint : ISprint
    {
        public IDALSprint _sprintDAL { get; }

        public Sprint(IDALSprint _dal)
        {
            this._sprintDAL = _dal;
        }

        public bool addTaskToGivenSprint(int sprintID, int taskID)
        {
            return _sprintDAL.addTaskToGivenSprint(sprintID, taskID);
        }

        public bool createSprint(int id, string name, int projectID)
        {
            return _sprintDAL.createSprint(id, name, projectID);
        }

        public int getAvailableSprintNumber()
        {
            return _sprintDAL.getAvailableSprintNumber();
        }

        public SprintDTO getSprintOnID(int id)
        {
            throw new NotImplementedException();
        }

        public bool removeTaskFromGivenSprint(int sprintID, int taskID)
        {
            return _sprintDAL.removeTaskFromGivenSprint(sprintID, taskID);
        }

        public List<int> getTasksConnectedToSprint(int sprintID)
        {
            return _sprintDAL.getTasksConnectedToSprint(sprintID);
        }
    }
}
