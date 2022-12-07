using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Contracts.Dtos.AssignmentDtos
{
    public class AssignmentUpdateDto
    {
        public int Id { get; set; }
        public int AssignedTo { get; set; }
        public int Asset { get; set; }
        public DateTime AssignedDate { get; set; }
        public string Note { get; set; }
    }
}
