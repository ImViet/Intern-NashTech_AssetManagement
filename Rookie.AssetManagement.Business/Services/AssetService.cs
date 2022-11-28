﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Contracts;
using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;
using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using Rookie.AssetManagement.DataAccessor.Data;
using Rookie.AssetManagement.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Business.Services
{
    public class AssetService : IAssetService 
    {
        private readonly IBaseRepository<Asset> _assetRepository;
        private readonly IMapper _mapper;

        public AssetService(IBaseRepository<Asset> assetRepository, IMapper mapper)
        {
            _assetRepository = assetRepository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<AssetDto>> GetAllAsync()
        {
            var listAsset = _mapper.Map<IEnumerable<AssetDto>>(await _assetRepository.Entities.ToListAsync());
            return (List<AssetDto>)listAsset;
        }

        public async Task<PagedResponseModel<AssetDto>> GetByPageAsync(
            AssetQueryCriteriaDto assetQueryCriteria,
            CancellationToken cancellationToken, string location)
        {
            var assetQuery = AssetFilter(
              _assetRepository.Entities.Where(x => !x.IsDeleted).AsQueryable(),
              assetQueryCriteria);

            var asset = await assetQuery
               .AsNoTracking()
               .PaginateAsync<Asset>(
                   assetQueryCriteria.Page,
                   assetQueryCriteria.Limit,
                   cancellationToken);

            var assetDto = _mapper.Map<IEnumerable<AssetDto>>(asset.Items);

            return new PagedResponseModel<AssetDto>
            {
                CurrentPage = asset.CurrentPage,
                TotalPages = asset.TotalPages,
                TotalItems = asset.TotalItems,
                Items = assetDto
            };
        }
        private IQueryable<Asset> AssetFilter(
           IQueryable<Asset> assetQuery,
           AssetQueryCriteriaDto assetQueryCriteria)
        {
            if (!String.IsNullOrEmpty(assetQueryCriteria.Search))
            {
                assetQuery = assetQuery.Where(b =>
                  (b.AssetName.ToLower()).Contains(assetQueryCriteria.Search.ToLower())
                    || b.AssetCode.ToLower().Contains(assetQueryCriteria.Search.ToLower()));
            }

            if (assetQueryCriteria.Categories != null && !assetQueryCriteria.Categories.Any(e => e == "ALL"))
            {
                assetQuery = assetQuery.Where(x => assetQueryCriteria.Categories.Any(e => e == x.Category));
            }
            if (assetQueryCriteria.States != null && !assetQueryCriteria.States.Any(e => e == "ALL"))
            {
                assetQuery = assetQuery.Where(x => assetQueryCriteria.States.Any(e => e == x.State));
            }
            return assetQuery;
        }
    }
}
