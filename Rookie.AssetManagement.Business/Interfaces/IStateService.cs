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
using Rookie.AssetManagement.Contracts.Dtos.StateDtos;
using Rookie.AssetManagement.Contracts.Dtos.CategoryDtos;

namespace Rookie.AssetManagement.Business.Interfaces
{
    public interface IStateService
    {
        Task<IEnumerable<StateDto>> GetAssetStateAsync();
        Task<IEnumerable<StateDto>> GetReturningStateAsync();
        Task<IEnumerable<StateDto>> GetAssignmentStateAsync();
    }
}
