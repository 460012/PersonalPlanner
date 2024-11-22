using InterfaceLayer.DAL;
using InterfaceLayer.DTO;
using InterfaceLayer.Logic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Logic_Layer
{
    public class Project : IProject
    {
        public IDALProject _projectDAL { get; }

        public Project(IDALProject _dal)
        {
            this._projectDAL = _dal;
        }

        public int getAvailableProjectNumber()
        {
            return this._projectDAL.getAvailableProjectNumber();
        }

        public bool createProject(int id, int teamID, int owner, string name, string description)
        {
            //check data etc?

            return this._projectDAL.createProject(id, teamID, owner, name, description);
        }

        public ProjectDTO getProjectOnID(int id)
        {
            throw new NotImplementedException();
        }

        public List<ProjectDTO> getAllProjectsForUser(int userID)
        {
            //check data etc?

            return this._projectDAL.getAllProjectsForUser(userID);
        }

        public List<TaskDTO> getAllProjectTasks(int projectID)
        {
            return this._projectDAL.getAllProjectTasks(projectID);
        }

        public List<BoardDTO> getAllProjectBoards(int projectID)
        {
            return this._projectDAL.getAllProjectBoards(projectID);
        }

        public List<SprintDTO> getAllProjectSprints(int projectID)
        {
            return this._projectDAL.getAllProjectSprints(projectID);
        }

        public int getStandardBoardID(int projectID)
        {
            return this._projectDAL.getStandardBoardID(projectID);
        }

        public List<BoardTask> getTasksConnectedToBoards(int ProjectID)
        {
            return this._projectDAL.getTasksConnectedToBoards(ProjectID);
        }
    }
}
