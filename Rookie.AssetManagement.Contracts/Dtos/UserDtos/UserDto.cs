﻿using Rookie.AssetManagement.Contracts.Dtos.EnumDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Contracts.Dtos.UserDtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string StaffCode { get; set; }
        public string FullName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public DateTime JoinedDate { get; set; }
        public string Type { get; set; }
        public string Location { get; set; }
    }
}
