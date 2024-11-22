using InterfaceLayer.DAL;
using InterfaceLayer.DTO;
using MySql.Data.MySqlClient;
using MySqlLibrary.General;
using Mysqlx.Crud;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MySqlLibrary
{
    public class DalTask : IDALTask
    {
        public bool createTask(int id, string name, int projectID, int reporterID, int mainTask = -1)
        {
            using (var connection = new Connection().getConnection())
            {
                connection.Open();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "INSERT INTO task (ID, Name, ProjectID, reporterID, MainTask) VALUES (@id, @name, @project, @reporter, @mainTask)";
                    command.Parameters.AddWithValue("@id", id);
                    command.Parameters.AddWithValue("@name", name);
                    command.Parameters.AddWithValue("@project", projectID);
                    command.Parameters.AddWithValue("@reporter", reporterID);
                    command.Parameters.AddWithValue("@mainTask", mainTask);

                    int rowsAffected = command.ExecuteNonQuery();
                    return rowsAffected > 0;
                }
            }
        }

        public int getAvailableTaskNumber()
        {
            int availableNumber = DalHelper.getAvailableNumberFromTable("task");

            return availableNumber;
        }

        public TaskDTO getTaskOnID(int id)
        {
            TaskDTO task = new TaskDTO();

            using (MySqlConnection connection = new Connection().getConnection())
            {
                connection.Open();

                string query = @"SELECT * FROM task WHERE ID = @taskID";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@taskID", id);

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            task.id = reader.GetInt32("ID");
                            task.mainTask = reader.GetInt32("MainTask");
                            task.name = reader.GetString("Name");
                            task.code = reader.GetString("Code");
                            task.description = reader.GetString("Description");
                            task.projectID = reader.GetInt32("ProjectID");
                            task.worker = reader.GetInt32("WorkerID");
                            task.reporter = reader.GetInt32("ReporterID");
                            task.storyPointEstimate = reader.GetInt32("StoryPointEstimate");
                        }
                    }
                }
            }

            return task;
        }

        public bool removeTask(int id)
        {
            throw new NotImplementedException();
        }

        public bool updateCode(int taskID, string newCode)
        {
            bool success = false;
            using (MySqlConnection connection = new Connection().getConnection())
            {
                connection.Open();

                string updateQuery = "UPDATE task SET Code = @NewCode WHERE ID = @TaskID";
                using (MySqlCommand updateCommand = new MySqlCommand(updateQuery, connection))
                {
                    updateCommand.Parameters.AddWithValue("@TaskID", taskID);
                    updateCommand.Parameters.AddWithValue("@NewCode", newCode);
                    int rowsAffected = updateCommand.ExecuteNonQuery();
                    success = rowsAffected > 0;
                }
            }

            return success;
        }

        public bool updateDescription(int taskID, string newDescription)
        {
            bool success = false;
            using (MySqlConnection connection = new Connection().getConnection())
            {
                connection.Open();

                string updateQuery = "UPDATE task SET Description = @NewDescription WHERE ID = @TaskID";
                using (MySqlCommand updateCommand = new MySqlCommand(updateQuery, connection))
                {
                    updateCommand.Parameters.AddWithValue("@TaskID", taskID);
                    updateCommand.Parameters.AddWithValue("@NewDescription", newDescription);
                    int rowsAffected = updateCommand.ExecuteNonQuery();
                    success = rowsAffected > 0;
                }
            }

            return success;
        }

        public bool updateMainTaskID(int taskID, int mainTaskID = -1)
        {
            bool success = false;
            using (MySqlConnection connection = new Connection().getConnection())
            {
                connection.Open();

                string updateQuery = "UPDATE task SET MainTask = @MainTask WHERE ID = @TaskID";
                using (MySqlCommand updateCommand = new MySqlCommand(updateQuery, connection))
                {
                    updateCommand.Parameters.AddWithValue("@TaskID", taskID);
                    updateCommand.Parameters.AddWithValue("@MainTask", mainTaskID);
                    int rowsAffected = updateCommand.ExecuteNonQuery();
                    success = rowsAffected > 0;
                }
            }

            return success;
        }

        public bool updateName(int taskID, string newName)
        {
            bool success = false;
            using (MySqlConnection connection = new Connection().getConnection())
            {
                connection.Open();

                string updateQuery = "UPDATE task SET Name = @NewName WHERE ID = @TaskID";
                using (MySqlCommand updateCommand = new MySqlCommand(updateQuery, connection))
                {
                    updateCommand.Parameters.AddWithValue("@TaskID", taskID);
                    updateCommand.Parameters.AddWithValue("@NewName", newName);
                    int rowsAffected = updateCommand.ExecuteNonQuery();
                    success = rowsAffected > 0;
                }
            }

            return success;
        }

        public bool updateStoryPoint(int taskID, int storyPoint)
        {
            bool success = false;
            using (MySqlConnection connection = new Connection().getConnection())
            {
                connection.Open();

                string updateQuery = "UPDATE task SET StoryPointEstimate = @StoryPointEstimate WHERE ID = @TaskID";
                using (MySqlCommand updateCommand = new MySqlCommand(updateQuery, connection))
                {
                    updateCommand.Parameters.AddWithValue("@TaskID", taskID);
                    updateCommand.Parameters.AddWithValue("@StoryPointEstimate", storyPoint);
                    int rowsAffected = updateCommand.ExecuteNonQuery();
                    success = rowsAffected > 0;
                }
            }

            return success;
        }

        public bool updateWorkerID(int taskID, int workerID = -1)
        {
            bool success = false;
            using (MySqlConnection connection = new Connection().getConnection())
            {
                connection.Open();

                string updateQuery = "UPDATE task SET WorkerID = @WorkerID WHERE ID = @TaskID";
                using (MySqlCommand updateCommand = new MySqlCommand(updateQuery, connection))
                {
                    updateCommand.Parameters.AddWithValue("@TaskID", taskID);
                    updateCommand.Parameters.AddWithValue("@WorkerID", workerID);
                    int rowsAffected = updateCommand.ExecuteNonQuery();
                    success = rowsAffected > 0;
                }
            }

            return success;
        }
    }
}
