using InterfaceLayer.DAL;
using InterfaceLayer.DTO;
using MySql.Data.MySqlClient;
using MySqlLibrary.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MySqlLibrary
{
    public class DalProject : IDALProject
    {
        public bool createProject(int id, int teamID, int owner, string name, string description)
        {
            using (var connection = new Connection().getConnection())
            {
                connection.Open();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "INSERT INTO project (ID, TeamID, OwnerID, Name, Description) VALUES (@id, @teamID, @owner, @name, @description)";
                    command.Parameters.AddWithValue("@id", id);
                    command.Parameters.AddWithValue("@teamID", teamID);
                    command.Parameters.AddWithValue("@owner", owner);
                    command.Parameters.AddWithValue("@name", name);
                    command.Parameters.AddWithValue("@description", description);

                    int rowsAffected = command.ExecuteNonQuery();
                    return rowsAffected > 0;
                }
            }
        }

        public List<BoardDTO> getAllProjectBoards(int projectID)
        {
            List<BoardDTO> boards = new List<BoardDTO>();

            using (MySqlConnection connection = new Connection().getConnection())
            {
                connection.Open();

                string query = @"SELECT * FROM board WHERE ProjectID = @projectID";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@projectID", projectID);

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            BoardDTO board = new BoardDTO();
                            board.id = reader.GetInt32("ID");
                            board.name = reader.GetString("Name");
                            board.projectID = reader.GetInt32("ProjectID");
                            board.number = reader.GetInt32("number");
                            board.standard = reader.GetBoolean("Standard");

                            boards.Add(board);
                        }
                    }
                }
            }

            return boards;
        }

        public List<ProjectDTO> getAllProjectsForUser(int userID)
        {
            List<ProjectDTO> projects = new List<ProjectDTO>();

            using (MySqlConnection connection = new Connection().getConnection())
            {
                connection.Open();

                string query = @"
                                SELECT p.ID, p.Name 
                                FROM project p
                                LEFT JOIN team t ON p.TeamID = t.ID
                                LEFT JOIN team_user tu ON t.ID = tu.Team_ID
                                WHERE p.OwnerID = @userID 
                                OR tu.User_ID = @userID";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@userID", userID);

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            ProjectDTO project = new ProjectDTO();
                            project.id = reader.GetInt32("ID");
                            project.name = reader.GetString("Name");

                            projects.Add(project);
                        }
                    }
                }
            }

            return projects;
        }

        public List<SprintDTO> getAllProjectSprints(int projectID)
        {
            List<SprintDTO> sprints = new List<SprintDTO>();

            using (MySqlConnection connection = new Connection().getConnection())
            {
                connection.Open();

                string query = @"SELECT * FROM sprint WHERE ProjectID = @projectID";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@projectID", projectID);

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            SprintDTO sprint = new SprintDTO();
                            sprint.id = reader.GetInt32("ID");
                            sprint.name = reader.GetString("Name");
                            //sprint.start = reader.GetDateTime("Startdate");
                            //sprint.end = reader.GetDateTime("Enddate");

                            sprints.Add(sprint);
                        }
                    }
                }
            }

            return sprints;
        }

        public List<TaskDTO> getAllProjectTasks(int projectID)
        {
            List<TaskDTO> tasks = new List<TaskDTO>();

            using (MySqlConnection connection = new Connection().getConnection())
            {
                connection.Open();

                string query = @"SELECT * FROM task WHERE ProjectID = @projectID";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@projectID", projectID);

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            TaskDTO task = new TaskDTO();
                            task.id = reader.GetInt32("ID");
                            task.name = reader.GetString("Name");
                            task.code = reader.GetString("Code");
                            task.projectID = reader.GetInt32("projectID");
                            task.mainTask = reader.GetInt32("MainTask");
                            task.description = reader.GetString("Description");
                            task.worker = reader.GetInt32("WorkerID");
                            task.reporter = reader.GetInt32("ReporterID");
                            task.storyPointEstimate = reader.GetInt32("StoryPointEstimate");

                            tasks.Add(task);
                        }
                    }
                }
            }

            return tasks;
        }

        public int getAvailableProjectNumber()
        {
            int availableProjectNumber = DalHelper.getAvailableNumberFromTable("project");

            return availableProjectNumber;
        }

        public ProjectDTO getProjectOnID(int id)
        {
            throw new NotImplementedException();
        }

        public int getStandardBoardID(int projectID)
        {
            int boardID = 0;

            using (MySqlConnection connection = new Connection().getConnection())
            {
                connection.Open();

                // Define the query with parameters
                string query = "SELECT ID FROM board WHERE projectID = @projectID AND Standard = 1";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    // Add parameters to the query
                    command.Parameters.AddWithValue("@projectID", projectID);

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            object result = reader["ID"];
                            if (result != DBNull.Value)
                            {
                                boardID = Convert.ToInt32(result);
                            }
                        }
                    }
                }
            }

            return boardID;
        }

        public List<BoardTask> getTasksConnectedToBoards(int ProjectID)
        {
            List<BoardTask> tasks = new List<BoardTask>();

            using (MySqlConnection connection = new Connection().getConnection())
            {
                connection.Open();

                string query = @"SELECT task.ID, task.Name, board.ID as BoardID
                                FROM board_task
                                JOIN board ON board_task.Board_ID = board.ID
                                JOIN task ON board_task.Task_ID = task.ID
                                WHERE board.ProjectID = @projectID";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@projectID", ProjectID);

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            BoardTask task = new BoardTask();
                            task.id = reader.GetInt32("ID");
                            task.name = reader.GetString("Name");
                            task.boardID = reader.GetInt32("BoardID");

                            tasks.Add(task);
                        }
                    }
                }
            }

            return tasks;
        }
    }
}
