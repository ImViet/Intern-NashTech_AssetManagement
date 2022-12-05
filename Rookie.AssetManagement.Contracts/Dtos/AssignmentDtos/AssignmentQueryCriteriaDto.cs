using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Contracts.Dtos.AssetDtos
{
    public class AssignmentQueryCriteriaDto : BaseQueryCriteria
    {
        public DateTime AssignmentDate { get; set; }
        public string[] States { get; set; }
        public int Id { get; set; }
    }
}
