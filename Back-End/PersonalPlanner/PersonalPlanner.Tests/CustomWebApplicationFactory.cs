using InterfaceLayer.Logic;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalPlanner.Tests
{
    public class CustomWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                // Replace the original services with test services
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
            });
        }
    }
}
