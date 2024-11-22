using InterfaceLayer.DAL;
using InterfaceLayer.Logic;

namespace InterfaceLayer.DTO
{
    public class UserDTO
    {
        public int id { get; set; }
        public string email { get; set; }

        public UserDTO(int id, string email)
        {
            this.id = id;
            this.email = email;
        }
    }
}