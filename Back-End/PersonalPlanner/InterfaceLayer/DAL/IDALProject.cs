using InterfaceLayer.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InterfaceLayer.DAL
{
    public interface IDALProject
    {
        int getAvailableProjectNumber();
        bool createProject(int id, int teamID, int owner, string name, string description);
        ProjectDTO getProjectOnID(int id);
        List<ProjectDTO> getAllProjectsForUser(int userID);
        List<TaskDTO> getAllProjectTasks(int projectID);
        List<BoardDTO> getAllProjectBoards(int projectID);
        List<SprintDTO> getAllProjectSprints(int projectID);
        int getStandardBoardID(int projectID);
        List<BoardTask> getTasksConnectedToBoards(int ProjectID);
    }
}
