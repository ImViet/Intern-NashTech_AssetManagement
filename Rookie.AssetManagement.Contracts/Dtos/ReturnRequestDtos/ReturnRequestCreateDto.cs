using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Contracts.Dtos.ReturnRequestDtos
{
    public class ReturnRequestCreateDto
    {
        public int AssignmentId { get; set; }
        public int AcceptedBy { get; set; }
        public DateTime ReturnedDate { get; set; }
        public int State { get; set; }
    }
}
