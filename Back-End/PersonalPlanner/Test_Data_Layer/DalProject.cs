using InterfaceLayer.DAL;
using InterfaceLayer.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test_Data_Layer
{
    public class DalProject : IDALProject
    {
        private Dictionary<int, ProjectDTO> _projects;
        private Dictionary<int, List<BoardDTO>> _projectBoards;
        private Dictionary<int, List<SprintDTO>> _projectSprints;
        private Dictionary<int, List<TaskDTO>> _projectTasks;
        private Dictionary<int, List<BoardTask>> _boardTasks;

        public DalProject()
        {
            _projects = new Dictionary<int, ProjectDTO>();
            _projectBoards = new Dictionary<int, List<BoardDTO>>();
            _projectSprints = new Dictionary<int, List<SprintDTO>>();
            _projectTasks = new Dictionary<int, List<TaskDTO>>();
            _boardTasks = new Dictionary<int, List<BoardTask>>();
        }

        public bool createProject(int id, int teamID, int owner, string name, string description)
        {
            if (!_projects.ContainsKey(id))
            {
                _projects[id] = new ProjectDTO
                {
                    id = id,
                    teamID = teamID,
                    ownerID = owner,
                    name = name,
                    description = description
                };
                return true;
            }
            return false; // Project with the same ID already exists
        }

        public List<BoardDTO> getAllProjectBoards(int projectID)
        {
            if (_projectBoards.ContainsKey(projectID))
            {
                return new List<BoardDTO>(_projectBoards[projectID]);
            }
            return new List<BoardDTO>(); // No boards found
        }

        public List<ProjectDTO> getAllProjectsForUser(int userID)
        {
            return _projects.Values
                .Where(p => p.ownerID == userID || _projectBoards.Values.Any(boards => boards.Any(b => b.projectID == p.id)))
                .ToList();
        }

        public List<SprintDTO> getAllProjectSprints(int projectID)
        {
            if (_projectSprints.ContainsKey(projectID))
            {
                return new List<SprintDTO>(_projectSprints[projectID]);
            }
            return new List<SprintDTO>(); // No sprints found
        }

        public List<TaskDTO> getAllProjectTasks(int projectID)
        {
            if (_projectTasks.ContainsKey(projectID))
            {
                return new List<TaskDTO>(_projectTasks[projectID]);
            }
            return new List<TaskDTO>(); // No tasks found
        }

        public int getAvailableProjectNumber()
        {
            if (_projects.Any())
            {
                return _projects.Keys.Max() + 1;
            }
            return 1;
        }

        public ProjectDTO getProjectOnID(int id)
        {
            if (_projects.ContainsKey(id))
            {
                return _projects[id];
            }
            return null; // Project not found
        }

        public int getStandardBoardID(int projectID)
        {
            if (_projectBoards.ContainsKey(projectID))
            {
                var standardBoard = _projectBoards[projectID].FirstOrDefault(b => b.standard);
                if (standardBoard != null)
                {
                    return standardBoard.id;
                }
            }
            return 0; // No standard board found
        }

        public List<BoardTask> getTasksConnectedToBoards(int ProjectID)
        {
            var tasks = new List<BoardTask>();
            if (_projectBoards.ContainsKey(ProjectID))
            {
                var boards = _projectBoards[ProjectID];
                foreach (var board in boards)
                {
                    if (_boardTasks.ContainsKey(board.id))
                    {
                        tasks.AddRange(_boardTasks[board.id]);
                    }
                }
            }
            return tasks;
        }
    }
}
