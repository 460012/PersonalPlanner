using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MySqlLibrary
{
    public class Connection
    {
        //private string connectionString = "server=127.0.0.1;port=3306;uid=user;pwd=user_password;database=personalplanner"; //localhost of machine
        private string connectionString = "server=host.docker.internal;port=3306;uid=user;pwd=user_password;database=personalplanner"; //docker'container's host machine internal ip
        private MySqlConnection connection;

        public Connection()
        {
            connection = new MySqlConnection(connectionString);
        }

        public MySqlConnection getConnection()
        {
            return connection;
        }

    }
}
