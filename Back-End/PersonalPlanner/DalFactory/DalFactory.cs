using InterfaceLayer.DAL;
using InterfaceLayer.DTO;
using MySqlLibrary;
using Test_Data_Layer;

namespace DalFactory
{
    public class DalFactory
    {
        public DalFactory()
        {
            //dataKeywordLayer = new DataKeyword();
        }

        public IDALUser getMysqlUserDal()
        {
            return new MySqlLibrary.DALUser();
        }

        public IDALUser getTestUserDal(List<UserDTO> userList = null)
        {
            return new Test_Data_Layer.DALUser(userList);
        }

        public IDALProject getMysqlProjectDal()
        {
            return new MySqlLibrary.DalProject();
        }

        public IDALProject getTestProjectDal()
        {
            return new Test_Data_Layer.DalProject();
        }

        public IDALBoard getMysqlBoardDal()
        {
            return new MySqlLibrary.DalBoard();
        }

        public IDALBoard getTestBoardDal()
        {
            return new Test_Data_Layer.DalBoard();
        }

        public IDALSprint getMysqlSprintDal()
        {
            return new MySqlLibrary.DalSprint();
        }

        public IDALSprint getTestSprintDal()
        {
            return new Test_Data_Layer.DalSprint();
        }

        public IDALTask getMysqlTaskDal()
        {
            return new MySqlLibrary.DalTask();
        }

        public IDALTask getTestTaskDal()
        {
            return new Test_Data_Layer.DalTask();
        }
    }
}