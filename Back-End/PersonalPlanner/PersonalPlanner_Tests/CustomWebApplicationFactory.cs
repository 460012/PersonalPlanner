//using Microsoft.AspNetCore.Hosting;
using DalFactory;
using InterfaceLayer.Logic;
using LogicFactory;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalPlanner_Tests
{
    public class CustomWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                // Remove existing DAL implementations
                var projectDescriptor = services.SingleOrDefault(d => d.ServiceType == typeof(IProject));
                if (projectDescriptor != null)
                {
                    services.Remove(projectDescriptor);
                }

                var boardDescriptor = services.SingleOrDefault(d => d.ServiceType == typeof(IBoard));
                if (boardDescriptor != null)
                {
                    services.Remove(boardDescriptor);
                }

                var taskDescriptor = services.SingleOrDefault(d => d.ServiceType == typeof(ITask));
                if (taskDescriptor != null)
                {
                    services.Remove(taskDescriptor);
                }

                // Register mock/test implementations
                services.AddScoped<IProject>(provider => new LogicFactory.LogicFactory().getProject(new DalFactory.DalFactory().getTestProjectDal()));
                services.AddScoped<IBoard>(provider => new LogicFactory.LogicFactory().getBoard(new DalFactory.DalFactory().getTestBoardDal()));
                services.AddScoped<ITask>(provider => new LogicFactory.LogicFactory().getTask(new DalFactory.DalFactory().getTestTaskDal()));
                services.AddScoped<ISprint>(provider => new LogicFactory.LogicFactory().getSprint(new DalFactory.DalFactory().getTestSprintDal()));
                services.AddScoped<IUser>(provider => new LogicFactory.LogicFactory().getUser(new DalFactory.DalFactory().getTestUserDal()));
            });
        }
    }
}
