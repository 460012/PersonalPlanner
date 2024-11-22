using InterfaceLayer.DAL;
using InterfaceLayer.DTO;
using System.Xml.Linq;

namespace Test_Data_Layer
{
    public class DALUser : IDALUser
    {
        public Dictionary<int, UserDTO> userDictionary { get; private set; } = new Dictionary<int, UserDTO>();

        /// <summary>
        /// Given list is optional
        /// </summary>
        /// <param name="userList"></param>
        public DALUser(List<UserDTO> userList = null)
        {
            if (userList != null)
            {
                this.userDictionary = new Dictionary<int, UserDTO>(userDictionary);
            }
        }

        public int checkAndActEmail(string email)
        {
            // Check if the email already exists in the dictionary
            var existingUser = userDictionary.Values.FirstOrDefault(dto => dto.email == email);
            if (existingUser != null)
            {
                // Return the existing user's ID
                return existingUser.id;
            }
            else
            {
                // Add a new user with the given email
                var newUser = addLoggedInUserEmail(email);
                return newUser.id;
            }
        }

        public UserDTO addLoggedInUserEmail(string email)
        {
            // Find the first missing ID
            int id = 1;
            while (userDictionary.ContainsKey(id))
            {
                id++;
            }

            UserDTO user = new UserDTO(id, email);
            userDictionary.Add(id, user);

            return user;
        }

        public UserDTO getUserIDOnEmail(string email)
        {
            return userDictionary.Values.FirstOrDefault(dto => dto.email == email);
        }
    }
}