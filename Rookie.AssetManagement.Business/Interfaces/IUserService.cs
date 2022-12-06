using Rookie.AssetManagement.Contracts.Dtos.AuthDtos;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using Rookie.AssetManagement.Contracts;
using System.Threading;

namespace Rookie.AssetManagement.Business.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllAsync();

        Task<UserDto> GetByIdAsync(int id);

        Task<UserDto> AddAsync(UserCreateDto assetRequest, string location);

        Task<UserDto> UpdateAsnyc(UserUpdateDto userUpdateDto, string location);

        Task<bool> DisableAsync(int id, string location);

        Task<PagedResponseModel<UserDto>> GetByPageAsync(UserQueryCriteriaDto assetQueryCriteria, CancellationToken cancellationToken, string location);
        
        Task<PagedResponseModel<LookUpUserDto>> GetLookUpUser(UserQueryCriteriaDto assetQueryCriteria, CancellationToken cancellationToken);

     



    }
}
