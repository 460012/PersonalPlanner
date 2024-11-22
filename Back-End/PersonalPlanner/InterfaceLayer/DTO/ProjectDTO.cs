using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InterfaceLayer.DTO
{
    public class ProjectDTO
    {
        public int id { get; set; }
        public string name { get; set; }
        public int teamID { get; set; }
        public int ownerID { get; set; }
        public string description { get; set; }
        //List<BoardDTO> boards;
        //List<SprintDTO> sprints;
        //List<TaskDTO> backlog;
    }
}
