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
        Task<AccountDto> GetAccountByUserName(string UserName);
        Task<AccountDto> LoginAsync(LoginDto request);
        Task<bool> ChangePasswordAsync(int id, ChangePasswordDto assetUpdateDto);
    }
}
