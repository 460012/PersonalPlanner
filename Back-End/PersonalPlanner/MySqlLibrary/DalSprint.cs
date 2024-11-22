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
    public class DalSprint : IDALSprint
    {
        private int getAvailableSprintTaskNumber()
        {
            int availableNumber = DalHelper.getAvailableNumberFromTable("sprint_task");

            return availableNumber;
        }

        public bool addTaskToGivenSprint(int sprintID, int taskID)
        {
            bool success = false;
            using (MySqlConnection connection = new Connection().getConnection())
            {
                connection.Open();

                // Check if the task ID is already associated with a sprint
                string checkQuery = "SELECT COUNT(*) FROM sprint_task WHERE Task_ID = @TaskID";
                using (MySqlCommand checkCommand = new MySqlCommand(checkQuery, connection))
                {
                    checkCommand.Parameters.AddWithValue("@TaskID", taskID);
                    int count = Convert.ToInt32(checkCommand.ExecuteScalar());

                    if (count > 0)
                    {
                        // Task ID already exists, update the sprint ID
                        string updateQuery = "UPDATE sprint_task SET Sprint_ID = @SprintID WHERE Task_ID = @TaskID";
                        using (MySqlCommand updateCommand = new MySqlCommand(updateQuery, connection))
                        {
                            updateCommand.Parameters.AddWithValue("@SprintID", sprintID);
                            updateCommand.Parameters.AddWithValue("@TaskID", taskID);
                            int rowsAffected = updateCommand.ExecuteNonQuery();
                            success = rowsAffected > 0;
                        }
                    }
                    else
                    {
                        // Task ID doesn't exist, insert it
                        int newID = getAvailableSprintTaskNumber();

                        string insertQuery = "INSERT INTO sprint_task (ID, Sprint_ID, Task_ID) VALUES (@ID, @SprintID, @TaskID)";
                        using (MySqlCommand insertCommand = new MySqlCommand(insertQuery, connection))
                        {
                            insertCommand.Parameters.AddWithValue("@ID", newID);
                            insertCommand.Parameters.AddWithValue("@SprintID", sprintID);
                            insertCommand.Parameters.AddWithValue("@TaskID", taskID);
                            int rowsAffected = insertCommand.ExecuteNonQuery();
                            success = rowsAffected > 0;
                        }
                    }
                }
            }

            return success;
        }

        public bool createSprint(int id, string name, int projectID)
        {
            using (var connection = new Connection().getConnection())
            {
                connection.Open();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "INSERT INTO sprint (ID, Name, ProjectID) VALUES (@id, @name, @projectID)";
                    command.Parameters.AddWithValue("@id", id);
                    command.Parameters.AddWithValue("@name", name);
                    command.Parameters.AddWithValue("@projectID", projectID);

                    int rowsAffected = command.ExecuteNonQuery();
                    return rowsAffected > 0;
                }
            }
        }

        public int getAvailableSprintNumber()
        {
            int availableNumber = DalHelper.getAvailableNumberFromTable("sprint");

            return availableNumber;
        }

        public SprintDTO getSprintOnID(int id)
        {
            throw new NotImplementedException();
        }

        public List<int> getTasksConnectedToSprint(int sprintID)
        {
            List<int> taskIDs = new List<int>();

            using (MySqlConnection connection = new Connection().getConnection())
            {
                connection.Open();

                string query = @"SELECT Task_ID FROM sprint_task WHERE Sprint_ID = @sprintID";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@sprintID", sprintID);

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            taskIDs.Add(reader.GetInt32("Task_ID"));
                        }
                    }
                }
            }

            return taskIDs;
        }

        public bool removeTaskFromGivenSprint(int sprintID, int taskID)
        {
            bool success = false;
            using (MySqlConnection connection = new Connection().getConnection())
            {
                connection.Open();

                // Delete the task from the given sprint
                string deleteQuery = "DELETE FROM sprint_task WHERE Sprint_ID = @SprintID AND Task_ID = @TaskID";
                using (MySqlCommand deleteCommand = new MySqlCommand(deleteQuery, connection))
                {
                    deleteCommand.Parameters.AddWithValue("@SprintID", sprintID);
                    deleteCommand.Parameters.AddWithValue("@TaskID", taskID);
                    int rowsAffected = deleteCommand.ExecuteNonQuery();
                    success = rowsAffected > 0;
                }
            }

            return success;
        }
    }
}
