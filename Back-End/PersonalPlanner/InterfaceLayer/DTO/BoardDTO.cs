using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InterfaceLayer.DTO
{
    public class BoardDTO
    {
        public int id { get; set; }
        public string name { get; set; }
        public int number { get; set; }
        public int projectID { get; set; }
        public bool standard { get; set; }
        //public List<TaskDTO> tasks;
    }
}
