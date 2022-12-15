using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;
using Rookie.AssetManagement.Contracts.Dtos.ReportDtos;
using Rookie.AssetManagement.DataAccessor.Entities;
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
            var listCategory = await _categoryRepository.Entities.ToListAsync();
            if (listCategory == null)
            {
                throw new Exception("Category Is Null");
            }
            var report = new List<ReportDto>();
            foreach (var category in listCategory)
            {

            }
            return report;
        }
    }
}
