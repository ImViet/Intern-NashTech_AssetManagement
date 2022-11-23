using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Contracts.Dtos.UserDtos
{
    public class UserQueryCriteriaDto : BaseQueryCriteria
    {
        public string Types { get; set; }
        public int Id { get; set; }
    }
}
