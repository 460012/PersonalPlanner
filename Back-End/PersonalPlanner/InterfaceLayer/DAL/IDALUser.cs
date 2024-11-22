using InterfaceLayer.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InterfaceLayer.DAL
{
    public interface IDALUser
    {
        int checkAndActEmail(string email);
        public UserDTO getUserIDOnEmail(string email);
        public UserDTO addLoggedInUserEmail(string email);
    }
}
