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
        Task<MyAssignmentDto> AcceptAssignmentAsync(string username, int id);
        Task<MyAssignmentDto> DeclineAssignmentAsync(string username, int id);
        Task<IEnumerable<AssignmentDto>> GetAllAsync();
        Task<PagedResponseModel<MyAssignmentDto>> GetAssignmentByUserNameAsync(AssignmentQueryCriteriaDto assignmentQueryCriteria, CancellationToken cancellationToken, string userName);
        Task<AssignmentDto> GetByIdAsync(int id);
        Task<AssignmentFormDto> GetFormDataById(int id);
        Task<AssignmentDto> AddAssignmentAsync(AssignmentCreateDto assignmentCreateDto, string AssignedBy);
        Task<PagedResponseModel<AssignmentDto>> GetByPageAsync(AssignmentQueryCriteriaDto assignmentQueryCriteria, CancellationToken cancellationToken);
        Task<AssignmentDto> UpdateAssignmentAsync(AssignmentUpdateDto assignmentUpdateDto, string AssignedBy);
        Task<bool> DisableAssignmentAsync(int id);
    }
}
