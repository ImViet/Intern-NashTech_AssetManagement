using AutoMapper;
using AutoMapper.QueryableExtensions;
using EnsureThat;
//using LinqToTwitter;
using LinqToTwitter.Common;
using Microsoft.EntityFrameworkCore;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Contracts;
using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;
using Rookie.AssetManagement.Contracts.Dtos.AssignmentDtos;
using Rookie.AssetManagement.Contracts.Dtos.StateDtos;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using Rookie.AssetManagement.DataAccessor.Entities;
using Rookie.AssetManagement.DataAccessor.Enum;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Runtime.Intrinsics.X86;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;


namespace Rookie.AssetManagement.Business.Services
{
    public class AssignmentService : IAssignmentService
    {
        private readonly IBaseRepository<User> _userRepository;
        private readonly IBaseRepository<Asset> _assetRepository;
        private readonly IBaseRepository<State> _stateRepository;
        private readonly IBaseRepository<Assignment> _assignmentRepository;
        private readonly IMapper _mapper;

        public AssignmentService(IBaseRepository<Asset> assetRepository
            , IBaseRepository<State> stateRepository
            , IBaseRepository<Assignment> assignmentRepository
            , IBaseRepository<User> userRepository
            , IMapper mapper)
        {
            _assetRepository = assetRepository;
            _userRepository = userRepository;
            _stateRepository = stateRepository;
            _assignmentRepository = assignmentRepository;
            _mapper = mapper;
        }

        public async Task<AssignmentDto> AddAssignmentAsync(AssignmentCreateDto assignmentCreateDto, string AssignedBy)
        {
            Ensure.Any.IsNotNull(assignmentCreateDto);
            var newAssignment = _mapper.Map<Assignment>(assignmentCreateDto);
            var getUser = _userRepository.Entities.Where(x => x.Id.ToString() == assignmentCreateDto.User).FirstOrDefault();
            if (getUser == null)
            {
                throw new NotFoundException("User Not Found!");
            }
            // var getAsset = _assetRepository.Entities.Where(x => x.Id == assignmentCreateDto.Asset).FirstOrDefault();
            var getAsset = _assetRepository.Entities.Where(x => x.Id.ToString() == assignmentCreateDto.Asset).FirstOrDefault();
            if (getAsset == null)
            {
                throw new NotFoundException("Asset Not Found!");
            }

            var getAssignedBy = _userRepository.Entities.Where(x => x.UserName == AssignedBy).FirstOrDefault();

            newAssignment.AssignedTo = getUser;
            newAssignment.Asset = getAsset;
            newAssignment.IsDeleted = false;
            newAssignment.AssignedBy = getAssignedBy;

            var waitAcceptState = await _stateRepository.GetById((int)AssignmentStateEnum.WaitingForAcceptance);
            newAssignment.State = waitAcceptState;

            var createResult = await _assignmentRepository.Add(newAssignment);
            return _mapper.Map<AssignmentDto>(newAssignment);
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

            if (assignmentQueryCriteria.SortOrder == 0)
            {
                var startNo = (assignment.CurrentPage - 1) * assignmentQueryCriteria.Limit + 1;
                foreach (var assign in assignmentDto)
                {
                    assign.No = startNo;
                    startNo++;
                }
            }
            else
            {
                var startNo = assignment.TotalItems - (assignment.CurrentPage - 1) * assignmentQueryCriteria.Limit;
                foreach (var assign in assignmentDto)
                {
                    assign.No = startNo;
                    startNo--;
                }
            }

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


            if (assignmentQueryCriteria.AssignedDate != DateTime.MinValue)
            {
                assignmentQuery = assignmentQuery.Where(b =>
                b.AssignedDate == assignmentQueryCriteria.AssignedDate);
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
                    case "ID":
                        assignmentQuery = assignmentQueryCriteria.SortOrder == 0 ? assignmentQuery.OrderBy(x => x.Id) : assignmentQuery.OrderByDescending(x => x.Id);
                        break;
                    case "ASSETCODE":
                        assignmentQuery = assignmentQueryCriteria.SortOrder == 0 ? assignmentQuery.OrderBy(x => x.Asset.AssetCode) : assignmentQuery.OrderByDescending(x => x.Asset.AssetCode);
                        break;
                    case "ASSETNAME":
                        assignmentQuery = assignmentQueryCriteria.SortOrder == 0 ? assignmentQuery.OrderBy(x => x.Asset.AssetName) : assignmentQuery.OrderByDescending(x => x.Asset.AssetName);
                        break;
                    case "ASSIGNEDTO":
                        assignmentQuery = assignmentQueryCriteria.SortOrder == 0 ? assignmentQuery.OrderBy(x => x.AssignedTo.UserName) : assignmentQuery.OrderByDescending(x => x.AssignedTo.UserName);
                        break;
                    case "ASSIGNEDBY":
                        assignmentQuery = assignmentQueryCriteria.SortOrder == 0 ? assignmentQuery.OrderBy(x => x.AssignedBy.UserName) : assignmentQuery.OrderByDescending(x => x.AssignedBy.UserName);
                        break;
                    case "ASSIGNEDDATE":
                        assignmentQuery = assignmentQueryCriteria.SortOrder == 0 ? assignmentQuery.OrderBy(x => x.AssignedDate) : assignmentQuery.OrderByDescending(x => x.AssignedDate);
                        break;
                    case "STATE":
                        assignmentQuery = assignmentQueryCriteria.SortOrder == 0 ? assignmentQuery.OrderBy(x => x.State) : assignmentQuery.OrderByDescending(x => x.State);
                        break;
                    case "CATEGORY":
                        assignmentQuery = assignmentQueryCriteria.SortOrder == 0 ? assignmentQuery.OrderBy(x => x.Asset.Category.CategoryName) : assignmentQuery.OrderByDescending(x => x.Asset.Category.CategoryName);
                        break;
                    default:
                        assignmentQuery = assignmentQuery.OrderBy(x => x.Id);
                        break;
                }

            }
            return assignmentQuery;
        }

        public async Task<AssignmentDto> GetByIdAsync(int id)
        {
            var assignment = await _assignmentRepository.Entities
                .Where(a => a.Id == id)
                .ProjectTo<AssignmentDto>(_mapper.ConfigurationProvider)
                .FirstAsync();
            return assignment;
        }

        public async Task<AssignmentFormDto> GetFormDataById(int id)
        {
            var assignment = await _assignmentRepository.Entities
                .Where(a => a.Id == id)
                .ProjectTo<AssignmentFormDto>(_mapper.ConfigurationProvider)
                .FirstAsync();
            return assignment;
        }

        public async Task<AssignmentDto> UpdateAssignmentAsync(AssignmentUpdateDto assignmentUpdateDto, string AssignedBy)
        {
            var assignment = await _assignmentRepository.Entities.Include(x => x.AssignedTo).Include(x => x.Asset).Include(x => x.State).FirstOrDefaultAsync(a => a.Id == assignmentUpdateDto.Id);
            if (assignment == null)
            {
                throw new NotFoundException("Assignment Not Found!");
            }
            if (assignment.State.Id == (int)AssignmentStateEnum.Accepted)
            {
                throw new NotFoundException("Accepted Assignment Can Not Be Edit");
            }
            var getUserTo = _userRepository.Entities.Where(x => x.Id == assignmentUpdateDto.User).FirstOrDefault();
            if (getUserTo == null)
            {
                throw new NotFoundException("User Not Found!");
            }
            var getAsset = _assetRepository.Entities.Where(x => x.Id == assignmentUpdateDto.Asset).FirstOrDefault();
            if (getAsset == null)
            {
                throw new NotFoundException("Asset Not Found!");
            }
            var getAssignedBy = _userRepository.Entities.Where(x => x.UserName == AssignedBy).FirstOrDefault();
            _mapper.Map(assignmentUpdateDto, assignment);
            assignment.AssignedTo = getUserTo;
            assignment.Asset = getAsset;
            assignment.AssignedBy = getAssignedBy;

            var assignmentUpdated = await _assignmentRepository.Update(assignment);
            var assignmentUpdatedDto = _mapper.Map<AssignmentDto>(assignmentUpdated);
            return assignmentUpdatedDto;
        }

        public async Task<MyAssignmentDto> AcceptAssignmentAsync(string username, int id)
        {
            var assignment = await _assignmentRepository.Entities
                .Include(x => x.AssignedTo)
                .Include(x => x.State)
                .Include(x => x.Asset)
                .ThenInclude(x => x.Category)
                .FirstOrDefaultAsync(a => a.Id == id);
            if (assignment == null)
            {
                throw new NotFoundException("Assignment Not Found!");
            }
            if (assignment.AssignedTo.UserName != username)
            {
                throw new NotFoundException("It not your assignment!");
            }
            if (assignment.State.Id == (int)AssignmentStateEnum.Accepted)
            {
                throw new NotFoundException("Assignment already Accepted!");
            }

            var acceptedState = await _stateRepository.GetById((int)AssignmentStateEnum.Accepted);
            var assignedState = await _stateRepository.GetById((int)AssetStateEnum.Assigned);

            assignment.State = acceptedState;
            assignment.Asset.State = assignedState;

            await _assignmentRepository.Update(assignment);

            return _mapper.Map<MyAssignmentDto>(assignment);
        }

        public async Task<MyAssignmentDto> DeclineAssignmentAsync(string username, int id)
        {
            var assignment = await _assignmentRepository.Entities
                .Include(x => x.AssignedTo)
                .Include(x => x.State)
                .Include(x => x.Asset)
                .ThenInclude(x => x.Category)
                .FirstOrDefaultAsync(a => a.Id == id);
            if (assignment == null)
            {
                throw new NotFoundException("Assignment Not Found!");
            }
            if (assignment.AssignedTo.UserName != username)
            {
                throw new NotFoundException("It not your assignment!");
            }
            if (assignment.State.Id == (int)AssignmentStateEnum.Declined)
            {
                throw new NotFoundException("Assignment already Accepted!");
            }

            var declinedState = await _stateRepository.GetById((int)AssignmentStateEnum.Declined);
            var availableState = await _stateRepository.GetById((int)AssetStateEnum.Available);

            assignment.State = declinedState;
            assignment.Asset.State = availableState;

            await _assignmentRepository.Update(assignment);

            return _mapper.Map<MyAssignmentDto>(assignment);
        }

        public async Task<bool> DisableAssignmentAsync(int id)
        {
            var assignment = await _assignmentRepository.Entities.Include(a => a.State).SingleOrDefaultAsync(a => a.Id.Equals(id));
            if (assignment == null)
            {
                throw new NotFoundException("Assignment Not Found!");
            }
            if (assignment.State.Id == (int)AssignmentStateEnum.Accepted)
            {
                throw new NotFoundException("Assignment is accepted can not be delete");
            }


            await _assignmentRepository.Delete(assignment);

            return await Task.FromResult(true);
        }

        public async Task<PagedResponseModel<MyAssignmentDto>> GetAssignmentByUserNameAsync(AssignmentQueryCriteriaDto assignmentQueryCriteria, CancellationToken cancellationToken, string userName)
        {
            var assignmentQuery = AssignmentFilter(
             _assignmentRepository.Entities
             .Include(a => a.State)
             .Include(b => b.AssignedBy)
             .Include(b => b.AssignedTo)
             .Include(b => b.Asset)
             .ThenInclude(a => a.Category)
             .Where(b => b.AssignedTo.UserName == userName && b.State.Id != (int)AssignmentStateEnum.Declined
                && b.AssignedDate <= DateTime.Today)
             .AsQueryable(),
             assignmentQueryCriteria);

            var assignment = await assignmentQuery
               .AsNoTracking()
               .PaginateAsync<Assignment>(
                   assignmentQueryCriteria.Page,
                   assignmentQueryCriteria.Limit,
                   cancellationToken);
            var assignmentDto = _mapper.Map<IEnumerable<MyAssignmentDto>>(assignment.Items);

            return new PagedResponseModel<MyAssignmentDto>
            {
                CurrentPage = assignment.CurrentPage,
                TotalPages = assignment.TotalPages,
                TotalItems = assignment.TotalItems,
                Items = assignmentDto
            };
        }
    }
}
