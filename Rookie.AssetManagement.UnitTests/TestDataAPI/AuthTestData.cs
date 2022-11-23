using Rookie.AssetManagement.Contracts.Dtos.AuthDtos;
using Rookie.AssetManagement.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.UnitTests.TestDataAPI
{
    public static class AuthTestData
    {
        public static AccountDto FakeAccount()
        {
            return new AccountDto
            {
                Id = "1",
                Token = "abcxyz123456789",
                UserName = "binhnv",
                Type = "STAFF",
                FullName = "Binh Nguyen Van",
                StaffCode = "SD0001",
                Location = "HCM",
                IsNewUser = "True",
            };
        }
        public static LoginDto FakeLogin()
        {
            return new LoginDto
            {
                UserName = "binhnv",
                Password = "123456"
            };
        }
        public static User FakeUser()
        {
            return new User
            {
                StaffCode = "SD0001",
                FirstName = "Binh",
                LastName = "Nguyen Van",
                UserName = "binhnv",
                Type = "STAFF",
                IsDeleted = false,
                IsNewUser = true,
                Location = "HCM"
            };
        }
        public static ChangePasswordFirstLoginDto FakeChangePasswordFirstLogin()
        {
            return new ChangePasswordFirstLoginDto
            {
                PasswordNew = "123456",
            };
        }
        public static ChangePasswordDto FakeChangePassword()
        {
            return new ChangePasswordDto
            {
                PasswordNew = "123456",
                PasswordOld = "binhnv@22112001"
            };
        }
    }
}
