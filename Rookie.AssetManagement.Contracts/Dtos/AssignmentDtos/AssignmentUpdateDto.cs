using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Contracts.Dtos.AssignmentDtos
{
    public class AssignmentUpdateDto
    {
        public string User { get; set; }
        public string Asset { get; set; }
        public DateTime AssignedDate { get; set; }
        public string Note { get; set; }
    }
}
