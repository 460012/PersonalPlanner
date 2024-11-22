using InterfaceLayer.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InterfaceLayer.DAL
{
    public interface IDALSprint
    {
        int getAvailableSprintNumber();
        bool createSprint(int id, string name, int projectID);
        bool addTaskToGivenSprint(int sprintID, int taskID);
        bool removeTaskFromGivenSprint(int sprintID, int taskID);
        List<int> getTasksConnectedToSprint(int sprintID);
        SprintDTO getSprintOnID(int id);
    }
}
