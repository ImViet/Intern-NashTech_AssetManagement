using AutoMapper;
using AutoMapper.QueryableExtensions;
using LinqToTwitter.Common;
using Microsoft.EntityFrameworkCore;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Contracts;
using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;
using Rookie.AssetManagement.Contracts.Dtos.AssignmentDtos;
using Rookie.AssetManagement.Contracts.Dtos.StateDtos;
using Rookie.AssetManagement.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Business.Services
{
    public class AssignmentService : IAssignmentService
    {
        private readonly IBaseRepository<Asset> _assetRepository;
        private readonly IBaseRepository<State> _stateRepository;
        private readonly IBaseRepository<Assignment> _assignmentRepository;
        private readonly IMapper _mapper;

        public AssignmentService(IBaseRepository<Asset> assetRepository
            , IBaseRepository<State> stateRepository
            , IBaseRepository<Assignment> assignmentRepository
            , IMapper mapper)
        {
            _assetRepository = assetRepository;
            _stateRepository = stateRepository;
            _assignmentRepository = assignmentRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AssignmentDto>> GetAllAsync()
        {
            var listAssignment = await _assignmentRepository.Entities.ProjectTo<AssignmentDto>(_mapper.ConfigurationProvider).ToListAsync();
            return (List<AssignmentDto>)listAssignment;

        }

        public async Task<PagedResponseModel<AssignmentDto>> GetByPageAsync(AssignmentQueryCriteriaDto assignmentQueryCriteria, CancellationToken cancellationToken)
        {
            var assignmentQuery = AssignmentFilter(
             _assignmentRepository.Entities
            
             .Include(a => a.State)
             .Include(b => b.AssignedBy)
             .Include(b => b.AssignedTo)
             .Include(b => b.Asset)
             .AsQueryable(),
             assignmentQueryCriteria);

            var assignment = await assignmentQuery
               .AsNoTracking()
               .PaginateAsync<Assignment>(
                   assignmentQueryCriteria.Page,
                   assignmentQueryCriteria.Limit,
                   cancellationToken);

            var assignmentDto = _mapper.Map<IEnumerable<AssignmentDto>>(assignment.Items);

            return new PagedResponseModel<AssignmentDto>
            {
                CurrentPage = assignment.CurrentPage,
                TotalPages = assignment.TotalPages,
                TotalItems = assignment.TotalItems,
                Items = assignmentDto
            }; 
        }

        private IQueryable<Assignment> AssignmentFilter(
          IQueryable<Assignment> assignmentQuery,
          AssignmentQueryCriteriaDto assignmentQueryCriteria)
        {
            if (!String.IsNullOrEmpty(assignmentQueryCriteria.Search))
            {
                assignmentQuery = assignmentQuery.Where(b =>
                  b.Asset.AssetName.ToLower().Contains(assignmentQueryCriteria.Search.ToLower())
                  || b.Asset.AssetCode.ToLower().Contains(assignmentQueryCriteria.Search.ToLower())
                  || b.AssignedTo.UserName.ToLower().Contains(assignmentQueryCriteria.Search.ToLower()));
            }

        
            if (assignmentQueryCriteria.AssignmentDate != DateTime.MinValue)
            {
                assignmentQuery = assignmentQuery.Where(b =>
                b.AssignedDate == assignmentQueryCriteria.AssignmentDate);
            }

            if (assignmentQueryCriteria.States != null && !assignmentQueryCriteria.States.Any(e => e == "ALL"))
            {
                assignmentQuery = assignmentQuery.Where(x => assignmentQueryCriteria.States.Any(e => e == x.State.Id.ToString()));
            }
            if (assignmentQueryCriteria.SortColumn != null)
            {
                var sortColumn = assignmentQueryCriteria.SortColumn.ToUpper();
                switch (sortColumn)
                {
                    case "ASSETCODE":
                        assignmentQuery = assignmentQueryCriteria.SortOrder == 0 ? assignmentQuery.OrderBy(x => x.Asset.AssetCode) : assignmentQuery.OrderByDescending(x => x.Asset.AssetCode);
                        break;
                    case "ASSETNAME":
                        assignmentQuery = assignmentQueryCriteria.SortOrder == 0 ? assignmentQuery.OrderBy(x => x.Asset.AssetName) : assignmentQuery.OrderByDescending(x => x.Asset.AssetName);
                        break;
                    case "ASSIGNEDTO":
                        assignmentQuery = assignmentQueryCriteria.SortOrder == 0 ? assignmentQuery.OrderBy(x => x.AssignedTo) : assignmentQuery.OrderByDescending(x => x.AssignedTo);
                        break;
                    case "ASSIGNEDBY":
                        assignmentQuery = assignmentQueryCriteria.SortOrder == 0 ? assignmentQuery.OrderBy(x => x.AssignedBy) : assignmentQuery.OrderByDescending(x => x.AssignedBy);
                        break;
                    case "ASSIGNEDDATE":
                        assignmentQuery = assignmentQueryCriteria.SortOrder == 0 ? assignmentQuery.OrderBy(x => x.AssignedDate) : assignmentQuery.OrderByDescending(x => x.AssignedDate);
                        break;
                    case "STATE":
                        assignmentQuery = assignmentQueryCriteria.SortOrder == 0 ? assignmentQuery.OrderBy(x => x.State) : assignmentQuery.OrderByDescending(x => x.State);
                        break;
                    default:
                        assignmentQuery = assignmentQuery.OrderBy(x => x.Id);
                        break;
                }

            }
            return assignmentQuery;
        }
    }
}
