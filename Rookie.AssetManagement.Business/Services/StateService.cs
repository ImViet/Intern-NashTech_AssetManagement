using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Contracts;
using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;
using Rookie.AssetManagement.Contracts.Dtos.CategoryDtos;
using Rookie.AssetManagement.Contracts.Dtos.StateDtos;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using Rookie.AssetManagement.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Business.Services
{
    public class StateService : IStateService
    {
        private readonly IBaseRepository<State> _stateRepository;
        private readonly IMapper _mapper;

        public StateService(IBaseRepository<State> stateRepository, IMapper mapper)
        {
            _stateRepository = stateRepository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<StateDto>> GetAssetStateAsync()
        {
            var listState = _mapper.Map<IEnumerable<StateDto>>(await _stateRepository.Entities.Where(s => s.Entity == "ASSET").ToListAsync());
            return (List<StateDto>)listState;
        }
        public async Task<IEnumerable<StateDto>> GetAssignmentStateAsync()
        {
            var listState = _mapper.Map<IEnumerable<StateDto>>(await _stateRepository.Entities.Where(s => s.Entity == "ASSIGNMENT").ToListAsync());
            return (List<StateDto>)listState;
        }
        public async Task<IEnumerable<StateDto>> GetReturningStateAsync()
        {
            var listState = _mapper.Map<IEnumerable<StateDto>>(await _stateRepository.Entities.Where(s => s.Entity == "RETURN_REQUEST").ToListAsync());
            return (List<StateDto>)listState;
        }
    }
}
