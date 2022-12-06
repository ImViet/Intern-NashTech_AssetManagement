using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Contracts.Dtos.UserDtos
{
    public class LookUpUserDto
    {
        public int Id { get; set; }
        public string StaffCode { get; set; }
        public string FullName { get; set; }
        public string Type { get; set; }
    }
}

