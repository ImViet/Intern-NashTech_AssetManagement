using Microsoft.AspNetCore.Mvc;
using Rookie.AssetManagement.Contracts.Dtos.AuthDtos;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Business.Interfaces
{
    public interface IAuthService
    {
        Task<bool> IsUserDeleted(string UserName);
        Task<AccountDto> GetAccountByUserName(string UserName);
        Task<AccountDto> LoginAsync(LoginDto request);
        Task<AccountDto> ChangePasswordAsync(string username, ChangePasswordDto passwordRequest);
        Task<AccountDto> ChangePasswordFirstLoginAsync(string username, ChangePasswordFirstLoginDto passwordRequest);
    }
}
