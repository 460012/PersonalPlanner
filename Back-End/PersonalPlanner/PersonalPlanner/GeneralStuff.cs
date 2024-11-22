using InterfaceLayer.Logic;
using LogicFactory;

namespace PersonalPlanner
{
    public class GeneralStuff
    {
        public static IUser user = new LogicFactory.LogicFactory().getUser(new DalFactory.DalFactory().getMysqlUserDal());
        public static IProject project = new LogicFactory.LogicFactory().getProject(new DalFactory.DalFactory().getMysqlProjectDal());
        public static IBoard board = new LogicFactory.LogicFactory().getBoard(new DalFactory.DalFactory().getMysqlBoardDal());
        public static ISprint sprint = new LogicFactory.LogicFactory().getSprint(new DalFactory.DalFactory().getMysqlSprintDal());
        public static ITask task = new LogicFactory.LogicFactory().getTask(new DalFactory.DalFactory().getMysqlTaskDal());
    }
}
