﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using EnsureThat;
using Microsoft.EntityFrameworkCore;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Contracts;
using Rookie.AssetManagement.Contracts.Dtos.AssignmentDtos;
using Rookie.AssetManagement.Contracts.Dtos.ReturnRequestDtos;
using Rookie.AssetManagement.DataAccessor.Entities;
using Rookie.AssetManagement.DataAccessor.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Business.Services
{
    public class ReturnRequestService : IReturnRequestService
    {
        private readonly IBaseRepository<State> _stateRepository;
        private readonly IBaseRepository<Assignment> _assignmentRepository;
        private readonly IBaseRepository<Asset> _assetRepository;
        private readonly IBaseRepository<User> _userRepository;
        private readonly IBaseRepository<ReturnRequest> _returnrequesRepository;
        private readonly IMapper _mapper;


        public ReturnRequestService(
             IBaseRepository<State> stateRepository
            , IBaseRepository<Assignment> assignmentRepository
            , IBaseRepository<Asset> assetRepository
            , IBaseRepository<User> userRepository
            , IBaseRepository<ReturnRequest> returnrequesRepository
            , IMapper mapper)
        {

            _stateRepository = stateRepository;
            _assignmentRepository = assignmentRepository;
            _assetRepository = assetRepository;
            _userRepository = userRepository;
            _returnrequesRepository = returnrequesRepository;
            _mapper = mapper;
        }

        public async Task<ReturnRequestDto> AddReturnRequestAsync(ReturnRequestCreateDto returnRequestCreateDto, string AssignedBy)
        {
            Ensure.Any.IsNotNull(returnRequestCreateDto);

            var assignment = _assignmentRepository.Entities.Where(x => x.Id == returnRequestCreateDto.AssignmentId).FirstOrDefault();
            if (assignment == null)
            {
                throw new NotFoundException("Assignment Not Found!");
            }
            var state = await _stateRepository.GetById((int)AssignmentStateEnum.WaitingForReturning);
            assignment.State = state;
            await _assignmentRepository.Update(assignment);

            var newReturnRequest = _mapper.Map<ReturnRequest>(returnRequestCreateDto);
            newReturnRequest.Assignment = assignment;

            state = await _stateRepository.GetById((int)ReturnRequestStateEnum.WaitingForReturning);
            newReturnRequest.State = state;

            await _returnrequesRepository.Add(newReturnRequest);

            var result = await _returnrequesRepository.Entities
                .Where(r => r.Id == newReturnRequest.Id)
                .Include(a => a.State)
                .Include(a => a.Assignment)
                .Include(a => a.AcceptedBy)
                .Include(a => a.Assignment.Asset)
                .Include(a => a.Assignment.AssignedTo)
                .Include(a => a.Assignment.AssignedBy)
                .FirstOrDefaultAsync();
            return _mapper.Map<ReturnRequestDto>(result);
        }

        public async Task<ReturnRequestDto> CompleteReturnRequest(string acceptUsername, int requestId)
        {
            var returnRequest = await _returnrequesRepository.Entities
                .Where(r => r.Id == requestId)
                .Include(a => a.State)
                .Include(a => a.Assignment)
                .Include(a => a.AcceptedBy)
                .Include(a => a.Assignment.Asset)
                .Include(a => a.Assignment.AssignedTo)
                .Include(a => a.Assignment.AssignedBy)
                .FirstOrDefaultAsync();
            if (returnRequest == null)
            {
                throw new NotFoundException("Request Not Found!");
            }
            var acceptUser = await _userRepository.Entities.Where(u => u.UserName == acceptUsername).FirstOrDefaultAsync();
            if (acceptUser == null)
            {
                throw new NotFoundException("User Not Found!");
            }

            returnRequest.State = await _stateRepository.GetById((int)ReturnRequestStateEnum.Completed);
            returnRequest.AcceptedBy = acceptUser;
            returnRequest.ReturnedDate = DateTime.Today;

            await _returnrequesRepository.Update(returnRequest);

            returnRequest.Assignment.State = await _stateRepository.GetById((int)AssignmentStateEnum.Returned);
            await _assignmentRepository.Update(returnRequest.Assignment);

            returnRequest.Assignment.Asset.State = await _stateRepository.GetById((int)AssetStateEnum.Available);
            await _assetRepository.Update(returnRequest.Assignment.Asset);

            return _mapper.Map<ReturnRequestDto>(returnRequest);
        }

        public async Task<bool> CancelReturnRequestAsync(int returnRequestId)
        {
            var returnRequest = _returnrequesRepository.Entities
                .Where(x => x.Id == returnRequestId)
                .Include(a => a.State)
                .Include(a => a.AcceptedBy)
                .Include(a => a.Assignment)
                .ThenInclude(a => a.AssignedTo)
                .FirstOrDefault();
            if (returnRequest == null)
            {
                throw new NotFoundException("Request For Returning Not Found!");
            }
            if (returnRequest.State != await _stateRepository.GetById((int)ReturnRequestStateEnum.WaitingForReturning))
            {
                throw new NotFoundException("Completed Request For Returning Can Not Be Edit!");
            }
            var assignment = _assignmentRepository.Entities.Where(x => x.Id == returnRequest.Assignment.Id).FirstOrDefault();
            var state = await _stateRepository.GetById((int)AssignmentStateEnum.Accepted);
            assignment.State = state;

            await _assignmentRepository.Update(assignment);

            await _returnrequesRepository.Delete(returnRequest);

            return await Task.FromResult(true);
        }

        public async Task<IEnumerable<ReturnRequestDto>> GetAllAsync()
        {
            var listReturnRequest = await _returnrequesRepository.Entities.ProjectTo<ReturnRequestDto>(_mapper.ConfigurationProvider).ToListAsync();
            return (List<ReturnRequestDto>)listReturnRequest;
        }

        public async Task<PagedResponseModel<ReturnRequestDto>> GetByPageAsync(ReturnRequestQueryCriteriaDto returnRequestQueryCriteria, CancellationToken cancellationToken)
        {
            var returnRequestQuery = ReturnRequestFilter(
              _returnrequesRepository.Entities
              .Include(a => a.State)
              .Where(a => a.State.Id == (int)ReturnRequestStateEnum.WaitingForReturning || a.State.Id == (int)ReturnRequestStateEnum.Completed)
              .Include(a => a.Assignment)
              .Include(a => a.AcceptedBy)
              .Include(a => a.Assignment.Asset)
              .Include(a => a.Assignment.AssignedTo)
              .Include(a => a.Assignment.AssignedBy)
              .AsQueryable(),
              returnRequestQueryCriteria);

            var ReturnRequest = await returnRequestQuery
               .AsNoTracking()
               .PaginateAsync<ReturnRequest>(
                   returnRequestQueryCriteria.Page,
                   returnRequestQueryCriteria.Limit,
                   cancellationToken);

            var returnRequestDto = _mapper.Map<IEnumerable<ReturnRequestDto>>(ReturnRequest.Items);

            if (returnRequestQueryCriteria.SortOrder == 0)
            {
                var startNo = (ReturnRequest.CurrentPage - 1) * returnRequestQueryCriteria.Limit + 1;
                foreach (var assign in returnRequestDto)
                {
                    assign.No = startNo;
                    startNo++;
                }
            }
            else
            {
                var startNo = ReturnRequest.TotalItems - (ReturnRequest.CurrentPage - 1) * returnRequestQueryCriteria.Limit;
                foreach (var assign in returnRequestDto)
                {
                    assign.No = startNo;
                    startNo--;
                }
            }

            return new PagedResponseModel<ReturnRequestDto>
            {
                CurrentPage = ReturnRequest.CurrentPage,
                TotalPages = ReturnRequest.TotalPages,
                TotalItems = ReturnRequest.TotalItems,
                Items = returnRequestDto
            };
        }

        private IQueryable<ReturnRequest> ReturnRequestFilter(
         IQueryable<ReturnRequest> returnRequestQuery,
         ReturnRequestQueryCriteriaDto returnRequestQueryCriteria)
        {
            if (!String.IsNullOrEmpty(returnRequestQueryCriteria.Search))
            {
                returnRequestQuery = returnRequestQuery.Where(b =>
                  b.Assignment.Asset.AssetName.ToLower().Contains(returnRequestQueryCriteria.Search.ToLower())
                  || b.Assignment.Asset.AssetCode.ToLower().Contains(returnRequestQueryCriteria.Search.ToLower())
                  || b.Assignment.AssignedTo.UserName.ToLower().Contains(returnRequestQueryCriteria.Search.ToLower()));
            }


            if (returnRequestQueryCriteria.ReturnedDate != DateTime.MinValue)
            {
                returnRequestQuery = returnRequestQuery.Where(b =>
                b.ReturnedDate == returnRequestQueryCriteria.ReturnedDate);
            }

            if (returnRequestQueryCriteria.States != null && !returnRequestQueryCriteria.States.Any(e => e == "ALL"))
            {
                returnRequestQuery = returnRequestQuery.Where(x => returnRequestQueryCriteria.States.Any(e => e == x.State.Id.ToString()));
            }
            if (returnRequestQueryCriteria.SortColumn != null)
            {
                var sortColumn = returnRequestQueryCriteria.SortColumn.ToUpper();
                switch (sortColumn)
                {
                    case "ID":
                        returnRequestQuery = returnRequestQueryCriteria.SortOrder == 0 ? returnRequestQuery.OrderBy(x => x.Id) : returnRequestQuery.OrderByDescending(x => x.Id);
                        break;
                    case "ASSETCODE":
                        returnRequestQuery = returnRequestQueryCriteria.SortOrder == 0 ? returnRequestQuery.OrderBy(x => x.Assignment.Asset.AssetCode) : returnRequestQuery.OrderByDescending(x => x.Assignment.Asset.AssetCode);
                        break;
                    case "ASSETNAME":
                        returnRequestQuery = returnRequestQueryCriteria.SortOrder == 0 ? returnRequestQuery.OrderBy(x => x.Assignment.Asset.AssetName) : returnRequestQuery.OrderByDescending(x => x.Assignment.Asset.AssetName);
                        break;
                    case "REQUESTEDBY":
                        returnRequestQuery = returnRequestQueryCriteria.SortOrder == 0 ? returnRequestQuery.OrderBy(x => x.Assignment.AssignedTo) : returnRequestQuery.OrderByDescending(x => x.Assignment.AssignedTo);
                        break;
                    case "ASSIGNEDDATE":
                        returnRequestQuery = returnRequestQueryCriteria.SortOrder == 0 ? returnRequestQuery.OrderBy(x => x.Assignment.AssignedDate) : returnRequestQuery.OrderByDescending(x => x.Assignment.AssignedDate);
                        break;
                    case "ACCEPTEDBY":
                        returnRequestQuery = returnRequestQueryCriteria.SortOrder == 0 ? returnRequestQuery.OrderBy(x => x.AcceptedBy) : returnRequestQuery.OrderByDescending(x => x.AcceptedBy);
                        break;
                    case "RETURNEDDATE":
                        returnRequestQuery = returnRequestQueryCriteria.SortOrder == 0 ? returnRequestQuery.OrderBy(x => x.ReturnedDate) : returnRequestQuery.OrderByDescending(x => x.ReturnedDate);
                        break;
                    case "STATE":
                        returnRequestQuery = returnRequestQueryCriteria.SortOrder == 0 ? returnRequestQuery.OrderBy(x => x.State) : returnRequestQuery.OrderByDescending(x => x.State);
                        break;
                    default:
                        returnRequestQuery = returnRequestQuery.OrderBy(x => x.Id);
                        break;
                }

            }
            return returnRequestQuery;
        }
    }
}
