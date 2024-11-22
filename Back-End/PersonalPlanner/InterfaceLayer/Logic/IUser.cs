using InterfaceLayer.DAL;
using InterfaceLayer.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InterfaceLayer.Logic
{
    public interface IUser
    {
        IDALUser _userDAL { get; }
        int checkAndActEmail(string email);
        UserDTO getUserIDOnEmail(string email);
        UserDTO addLoggedInUserEmail(string email);
    }
}
