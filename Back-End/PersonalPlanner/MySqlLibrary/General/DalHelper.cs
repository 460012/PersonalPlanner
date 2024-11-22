using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MySqlLibrary.General
{
    public class DalHelper
    {
        public static int getAvailableNumberFromTable(string table)
        {
            int availableNumber = 0;

            using (MySqlConnection connection = new Connection().getConnection())
            {
                connection.Open();

                string query = "SELECT MIN(table1.ID + 1) AS first_missing_id FROM (SELECT 0 AS ID UNION SELECT ID FROM " + table + ") table1 LEFT JOIN " + table + " table2 ON table1.ID + 1 = table2.ID WHERE table2.ID IS NULL AND table1.ID + 1 <> 0;";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            object result = reader["first_missing_id"];
                            if (result != DBNull.Value)
                            {
                                availableNumber = Convert.ToInt32(result);
                            }
                        }
                    }
                }
            }

            return availableNumber;
        }
    }
}
