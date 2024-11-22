using InterfaceLayer.DAL;
using InterfaceLayer.DTO;
using InterfaceLayer.Logic;
using Logic_Layer;
using Task = Logic_Layer.Task;

namespace LogicFactory
{
    public class LogicFactory
    {
        public LogicFactory()
        {
            //this class only contains the collections
            //i have 4 other classes:
            //1. Programmer
            //2. Project
            //3. ProjectFile
            //4. Keywords

            //in my code a programmer(1) manages the project(2)
            //the project(2) manages the projectfile(s)(3)
            //keyword is a standalone class just like programmer

            //so because these classes are based on having data in them
            //they can't really be constructed in here because then the 
            //logic implementation can't reach this factory because of circular dependency

            //So those classes will be given the enum type FactoryType with them,
            //in my SubFactory the dal layer constructors will be given these types, and since
            //these types are stored in each class it can be passed along in the constuctors
        }

        public IUser getUser(IDALUser _dal)
        {
            //IDALkeyword dal = new DalFactory().getKeywordDal(type);
            return new User(_dal);
        }

        public IProject getProject(IDALProject _dal)
        {
            return new Project(_dal);
        }

        public IBoard getBoard(IDALBoard _dal)
        {
            return new Board(_dal);
        }

        public ISprint getSprint(IDALSprint _dal)
        {
            return new Sprint(_dal);
        }

        public ITask getTask(IDALTask _dal)
        {
            return new Task(_dal);
        }
    }
}