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
        Task<bool> IsUserDeleted(string userName);

        Task<AccountDto> GetAccountByUserName(string userName);

        Task<AccountDto> LoginAsync(LoginDto login);

        Task<AccountDto> ChangePasswordAsync(string userName, ChangePasswordDto passwordRequest);

        Task<AccountDto> ChangePasswordFirstLoginAsync(string userName, ChangePasswordFirstLoginDto passwordRequest);
        Task<bool> IsMatchPassword(string userName, string password);
    }
}
