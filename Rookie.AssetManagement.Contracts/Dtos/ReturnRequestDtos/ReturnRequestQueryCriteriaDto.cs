using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Contracts.Dtos.ReturnRequestDtos
{
    public class ReturnRequestQueryCriteriaDto : BaseQueryCriteria
    {
        public DateTime ReturnedDate { get; set; }
        public string[] States { get; set; }
        public int Id { get; set; }
    }
}
