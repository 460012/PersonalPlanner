using InterfaceLayer.Logic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InterfaceLayer.DTO
{
    public class TaskDTO
    {
        public int id { get; set; }
        public int mainTask { get; set; }
        public string name { get; set; }
        public string code { get; set; }
        public string description { get; set; }
        public int projectID { get; set; }
        public int worker { get; set; }
        public int reporter { get; set; }
        public int storyPointEstimate { get; set; }
    }
}
