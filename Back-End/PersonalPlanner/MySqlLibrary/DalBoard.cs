using InterfaceLayer.DAL;
using InterfaceLayer.DTO;
using MySql.Data.MySqlClient;
using MySqlLibrary.General;
using Mysqlx.Crud;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace MySqlLibrary
{
    public class DalBoard : IDALBoard
    {
        public bool addTaskToBoard(int boardID, int taskID)
        {
            bool success = false;
            using (MySqlConnection connection = new Connection().getConnection())
            {
                connection.Open();

                // Check if the task ID is already associated with a board
                string checkQuery = "SELECT COUNT(*) FROM board_task WHERE Task_ID = @TaskID";
                using (MySqlCommand checkCommand = new MySqlCommand(checkQuery, connection))
                {
                    checkCommand.Parameters.AddWithValue("@TaskID", taskID);
                    int count = Convert.ToInt32(checkCommand.ExecuteScalar());

                    if (count > 0)
                    {
                        // Task ID already exists, update the sprint ID
                        string updateQuery = "UPDATE board_task SET Board_ID = @BoardID WHERE Task_ID = @TaskID";
                        using (MySqlCommand updateCommand = new MySqlCommand(updateQuery, connection))
                        {
                            updateCommand.Parameters.AddWithValue("@BoardID", boardID);
                            updateCommand.Parameters.AddWithValue("@TaskID", taskID);
                            int rowsAffected = updateCommand.ExecuteNonQuery();
                            success = rowsAffected > 0;
                        }
                    }
                    else
                    {
                        // Task ID doesn't exist, insert it
                        int newID = getAvailableBoardTaskNumber();

                        string insertQuery = "INSERT INTO board_task (ID, Board_ID, Task_ID) VALUES (@ID, @BoardID, @TaskID)";
                        using (MySqlCommand insertCommand = new MySqlCommand(insertQuery, connection))
                        {
                            insertCommand.Parameters.AddWithValue("@ID", newID);
                            insertCommand.Parameters.AddWithValue("@BoardID", boardID);
                            insertCommand.Parameters.AddWithValue("@TaskID", taskID);
                            int rowsAffected = insertCommand.ExecuteNonQuery();
                            success = rowsAffected > 0;
                        }
                    }
                }
            }

            return success;
        }

        private int getAvailableBoardTaskNumber()
        {
            int availableNumber = DalHelper.getAvailableNumberFromTable("board_task");
            return availableNumber;
        }

        public bool changeBoardNumber(int id, int newNumber)
        {
            bool success = false;
            using (MySqlConnection connection = new Connection().getConnection())
            {
                connection.Open();

                string updateQuery = "UPDATE board SET number = @NewNumber WHERE ID = @BoardID";
                using (MySqlCommand updateCommand = new MySqlCommand(updateQuery, connection))
                {
                    updateCommand.Parameters.AddWithValue("@BoardID", id);
                    updateCommand.Parameters.AddWithValue("@NewNumber", newNumber);
                    int rowsAffected = updateCommand.ExecuteNonQuery();
                    success = rowsAffected > 0;
                }
            }

            return success;
        }

        public bool createBoard(int id, string name, int projectID, int number, bool standard = false)
        {
            using (var connection = new Connection().getConnection())
            {
                connection.Open();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "INSERT INTO board (ID, Name, ProjectID, number, Standard) VALUES (@id, @name, @projectID, @number, @standard)";
                    command.Parameters.AddWithValue("@id", id);
                    command.Parameters.AddWithValue("@name", name);
                    command.Parameters.AddWithValue("@projectID", projectID);
                    command.Parameters.AddWithValue("@number", number);
                    command.Parameters.AddWithValue("@standard", standard);

                    int rowsAffected = command.ExecuteNonQuery();
                    return rowsAffected > 0;
                }
            }
        }

        public int getAvailableBoardNumber()
        {
            int availableNumber = DalHelper.getAvailableNumberFromTable("board");

            return availableNumber;
        }

        public BoardDTO getBoardOnID(int id)
        {
            throw new NotImplementedException();
        }

        public bool removeBoard(int id)
        {
            throw new NotImplementedException();
        }

        public List<int> getTasksConnectedToBoard(int boardID)
        {
            List<int> taskIDs = new List<int>();

            using (MySqlConnection connection = new Connection().getConnection())
            {
                connection.Open();

                string query = @"SELECT Task_ID FROM board_task WHERE Board_ID = @boardID";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@boardID", boardID);

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

        public bool changeBoardName(int id, string newName)
        {
            bool success = false;
            using (MySqlConnection connection = new Connection().getConnection())
            {
                connection.Open();

                string updateQuery = "UPDATE board SET Name = @NewName WHERE ID = @BoardID";
                using (MySqlCommand updateCommand = new MySqlCommand(updateQuery, connection))
                {
                    updateCommand.Parameters.AddWithValue("@BoardID", id);
                    updateCommand.Parameters.AddWithValue("@NewName", newName);
                    int rowsAffected = updateCommand.ExecuteNonQuery();
                    success = rowsAffected > 0;
                }
            }

            return success;
        }
    }
}
