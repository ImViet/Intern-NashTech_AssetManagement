using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.DataAccessor.Entities
{
    public class ReturnRequest
    {
        public int Id { get; set; }
        public Assignment Assignment { get; set; }
        public User AcceptedBy { get; set; }
        public DateTime ReturnedDate { get; set; }
        public State State { get; set; }
    }
}
