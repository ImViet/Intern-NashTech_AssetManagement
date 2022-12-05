using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.DataAccessor.Entities
{
    public class Assignemnt
    {
        public int Id { get; set; }
        public Asset Asset { get; set; }
        public User AssignedTo { get; set; }
        public User AssignedBy { get; set; }
        public DateTime AssignedDate { get; set; }
        public State State { get; set; }
        public bool IsDeleted { get; set; }
        public string Note { get; set; }
    }
}
