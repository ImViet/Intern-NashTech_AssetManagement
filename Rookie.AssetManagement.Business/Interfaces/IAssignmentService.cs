using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using Rookie.AssetManagement.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Rookie.AssetManagement.Contracts.Dtos.AssignmentDtos;
using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;

namespace Rookie.AssetManagement.Business.Interfaces
{
    public interface IAssignmentService
    {
        Task<IEnumerable<AssignmentDto>> GetAllAsync();

        //Task<AssignmentDto> GetByIdAsync(int id);

        //Task<AssignmentDto> AddAsync(UserCreateDto assetRequest, string location);

        //Task<AssignmentDto> UpdateAsnyc(UserUpdateDto userUpdateDto, string location);

        //Task<bool> DisableAsync(int id, string location);

        Task<PagedResponseModel<AssignmentDto>> GetByPageAsync(AssignmentQueryCriteriaDto assignmentQueryCriteria, CancellationToken cancellationToken);
     
    }
}
