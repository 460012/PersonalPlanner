using InterfaceLayer.DAL;
using InterfaceLayer.DTO;
using InterfaceLayer.Logic;

namespace Logic_Layer
{
    public class User : IUser
    {
        public IDALUser _userDAL { get; }
        //public List<ILogicKeyword> keywords { get; private set; } //For collection

        public User(IDALUser _dal)
        {
            this._userDAL = _dal;
        }

        public int checkAndActEmail(string email)
        {
            return _userDAL.checkAndActEmail(email);
        }

        public UserDTO getUserIDOnEmail(string email)
        {
           return  _userDAL.getUserIDOnEmail(email);
        }

        public UserDTO addLoggedInUserEmail(string email)
        {
            return _userDAL.addLoggedInUserEmail(email);
        }
    }
}