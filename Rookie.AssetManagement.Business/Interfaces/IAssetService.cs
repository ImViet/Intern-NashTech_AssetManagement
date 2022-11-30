using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using Rookie.AssetManagement.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Rookie.AssetManagement.DataAccessor.Data;
using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;

namespace Rookie.AssetManagement.Business.Interfaces
{
    public interface IAssetService
    {
        Task<IEnumerable<AssetDto>> GetAllAsync();
        Task<PagedResponseModel<AssetDto>> GetByPageAsync(AssetQueryCriteriaDto assetQueryCriteria, CancellationToken cancellationToken, string location);
        Task<AssetDto> AddAssetAsync(AssetCreateDto assetCreate, string location);
        Task<AssetDto> UpdateAssetAsync(AssetUpdateDto assetUpdateDto);
    }
}
