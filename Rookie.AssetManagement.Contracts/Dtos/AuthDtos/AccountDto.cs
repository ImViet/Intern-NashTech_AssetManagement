using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Contracts.Dtos.AuthDtos
{
    public class AccountDto
    {
        public string Id { get; set; }
        public string Token { get; set; }
        public string UserName { get; set; }
        public string Type { get; set; }
        public string FullName { get; set; }
        public string StaffCode { get; set; }
        public string Location { get; set; }
        public string IsNewUser { get; set; }
    }
}