using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InterfaceLayer.DTO
{
    public class SprintDTO
    {
        public int id { get; set; }
        public string name { get; set; }
        public int projectID { get; set; }
        public DateTime start { get; set; }
        public DateTime end { get; set; }
        //List<TaskDTO> plannedTasks;
    }
}
