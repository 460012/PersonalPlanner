using InterfaceLayer.DTO;
using InterfaceLayer.Logic;

namespace LogicLayer_Tests
{
    [TestClass]
    public class UnitTest1
    {
        static UserDTO dto = new UserDTO(0, "Test@Test.com");
        IUser user = new LogicFactory.LogicFactory().getUser(new DalFactory.DalFactory().getTestUserDal(new List<UserDTO>() { dto }));

        [TestMethod()]
        [DataRow("Test@Test.com", false)]
        [DataRow("Test@Test.co", true)]
        [DataRow("Test@A.co", true)]
        [DataRow("Test@.co", true)]
        [DataRow("Test.co", true)]
        [DataRow("Test", true)]
        public void TestgetUserIDOnEmail(string email, bool willFail)
        {
            bool loggedStatus = false;

            UserDTO result = user.getUserIDOnEmail(email);
            if (result != null)
            {
                loggedStatus = true;
            }

            Assert.IsTrue((!willFail && loggedStatus) || (willFail && !loggedStatus));
        }

        [TestMethod()]
        [DataRow("Test@Test.com", false)]
        [DataRow("Test@Test", true)]
        [DataRow("Test.com", true)]
        [DataRow("Test", true)]
        [DataRow("", true)]
        public void TestaddLoggedInUserEmail(string email, bool willFail)
        {
            bool loggedStatus = false;

            UserDTO result = user.addLoggedInUserEmail(email);
            if (result != null)
            {
                loggedStatus = true;
            }

            Assert.IsTrue((!willFail && loggedStatus) || (willFail && !loggedStatus));
        }
    }
}