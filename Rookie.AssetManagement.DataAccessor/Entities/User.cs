using Microsoft.AspNetCore.Identity;
using Rookie.AssetManagement.DataAccessor.Enum;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Rookie.AssetManagement.DataAccessor.Entities
{
    public class User : IdentityUser<int>
    {
        public string StaffCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public UserGenderEnum Gender { get; set; }
        public DateTime JoinedDate { get; set; }
        public string Type { get; set; }
        public bool IsDeleted { get; set; }
        public string Location { get; set; }
        public bool IsNewUser { get; set; }
    }
}
