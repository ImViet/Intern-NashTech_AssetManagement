using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;
using Rookie.AssetManagement.Contracts.Dtos.AssignmentDtos;
using Rookie.AssetManagement.Contracts.Dtos.StateDtos;
using Rookie.AssetManagement.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
    }
}
