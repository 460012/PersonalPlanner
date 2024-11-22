using InterfaceLayer.DAL;
using InterfaceLayer.DTO;
using MySql.Data.MySqlClient;
using MySqlLibrary.General;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace MySqlLibrary
{
    public class DALUser : IDALUser
    {
        private int getAvailableUserID()
        {
            int availableUserID = DalHelper.getAvailableNumberFromTable("user");

            return availableUserID;
        }

        public int checkAndActEmail(string email)
        {
            int id = -1;

            using (MySqlConnection connection = new Connection().getConnection())
            using (MySqlCommand command = connection.CreateCommand())
            {
                connection.Open();

                // Check if email exists
                command.CommandText = "SELECT ID FROM user WHERE Email = @Email";
                command.Parameters.AddWithValue("@Email", email);
                object result = command.ExecuteScalar();

                if (result != null)
                {
                    // Email exists, return its associated ID
                    id = Convert.ToInt32(result);
                }
                else
                {
                    // Get available user ID
                    int userId = getAvailableUserID();

                    // Insert email with the available user ID
                    command.CommandText = "INSERT INTO user (ID, Email) VALUES (@Id, @Email2)";
                    command.Parameters.AddWithValue("@Id", userId);
                    command.Parameters.AddWithValue("@Email2", email);
                    command.ExecuteNonQuery();

                    id = userId;
                }
            }

            return id;
        }

        public UserDTO addLoggedInUserEmail(string email)
        {
            MySqlConnection connection = new Connection().getConnection();
            connection.Open();

            //tries finding the missing numbers
            int number = -1;

            //search numbers
            string query = "SELECT (k1.Number + 1) as MissingID FROM keywords k1 WHERE NOT EXISTS (SELECT k2.Number FROM keywords k2 WHERE k2.Number = k1.Number + 1) LIMIT 1;";
            MySqlCommand cmd = new MySqlCommand(query, connection);
            MySqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                number = reader.GetInt32("MissingID");
            }

            reader.Close();

            //if there was a missing number
            if (number != -1)
            {
                //find missing id's 
                var query2 = "INSERT INTO `keywords` (`Number`, `Name`) VALUES (@Number, @Name)";
                cmd.CommandText = query2;
                cmd.Parameters.Add("@Number", MySqlDbType.Int32).Value = number;
                cmd.Parameters.Add("@Name", MySqlDbType.VarChar).Value = email;

                cmd.ExecuteNonQuery();
                connection.Close();

                return new UserDTO(number, email);
            }
            else
            {
                string query3 = "INSERT INTO `keywords` (`Number`, `Name`) VALUES (NULL, @Name)";
                cmd.CommandText = query3;
                //cmd.Parameters.Add("@Number", MySqlDbType.Int32).Value = number;
                cmd.Parameters.Add("@Name", MySqlDbType.VarChar).Value = email;
                cmd.ExecuteNonQuery();

                number = Convert.ToInt32(cmd.LastInsertedId);
                connection.Close();

                return new UserDTO(number, email);
            }
        }

        public UserDTO getUserIDOnEmail(string email)
        {
            throw new NotImplementedException();
        }
    }
}
