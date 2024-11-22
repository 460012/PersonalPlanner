using InterfaceLayer.Logic;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalPlanner.Tests
{
    public class TestStartup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IProject>(provider =>
                new LogicFactory.LogicFactory().getProject(new DalFactory.DalFactory().getTestProjectDal()));
            services.AddScoped<IBoard>(provider =>
                new LogicFactory.LogicFactory().getBoard(new DalFactory.DalFactory().getTestBoardDal()));
            services.AddScoped<ITask>(provider =>
                new LogicFactory.LogicFactory().getTask(new DalFactory.DalFactory().getTestTaskDal()));
            services.AddScoped<ISprint>(provider =>
                new LogicFactory.LogicFactory().getSprint(new DalFactory.DalFactory().getTestSprintDal()));
            services.AddScoped<IUser>(provider =>
                new LogicFactory.LogicFactory().getUser(new DalFactory.DalFactory().getTestUserDal()));
        }
    }
}
