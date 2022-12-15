using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;
using Rookie.AssetManagement.Contracts.Dtos.ReportDtos;
using Rookie.AssetManagement.DataAccessor.Entities;
using Rookie.AssetManagement.DataAccessor.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Business.Services
{
    public class ReportService : IReport
    {
        private readonly IBaseRepository<Asset> _assetRepository;
        private readonly IBaseRepository<Assignment> _assignmentRepository;
        private readonly IBaseRepository<Category> _categoryRepository;
        private readonly IBaseRepository<State> _stateRepository;
        private readonly IMapper _mapper;

        public ReportService(IBaseRepository<Asset> assetRepository, IBaseRepository<Assignment> assignmentRepository, IBaseRepository<Category> categoryRepository,
            IBaseRepository<State> stateRepository, IMapper mapper)
        {
            _assetRepository = assetRepository;
            _assignmentRepository = assignmentRepository;
            _categoryRepository = categoryRepository;
            _stateRepository = stateRepository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ReportDto>> GetReportAsync()
        {
            var result = await _categoryRepository.Entities
                .Include(c => c.Assets)
                .ThenInclude(a => a.State)
                .Select(c => new ReportDto()
                {
                    Category = c.CategoryName,
                    Total = c.Assets.Count(),
                    Assigned = c.Assets.Where(a => a.State.Id == (int)AssetStateEnum.Assigned).Count(),
                    Available = c.Assets.Where(a => a.State.Id == (int)AssetStateEnum.Available).Count(),
                    NotAvailable = c.Assets.Where(a => a.State.Id == (int)AssetStateEnum.NotAvailable).Count(),
                    WaitingForRecycling = c.Assets.Where(a => a.State.Id == (int)AssetStateEnum.WaitingForRecycling).Count(),
                    Recycled = c.Assets.Where(a => a.State.Id == (int)AssetStateEnum.Recycled).Count(),
                })
                .OrderBy(r => r.Category)
                .ToListAsync();

            return result;
        }
    }
}
