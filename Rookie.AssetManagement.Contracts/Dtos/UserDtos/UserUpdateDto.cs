using Rookie.AssetManagement.Contracts.Dtos.EnumDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Contracts.Dtos.UserDtos
{
    public class UserUpdateDto
    {
        public DateTime DateOfBirth { get; set; }
        public UserGenderEnumDto Gender { get; set; }
        public DateTime JoinedDate { get; set; }
        public string Type { get; set; }
    }
}
