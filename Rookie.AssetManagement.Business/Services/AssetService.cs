using AutoMapper;
using EnsureThat;
using Microsoft.EntityFrameworkCore;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Contracts;
using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using Rookie.AssetManagement.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;
using Rookie.AssetManagement.DataAccessor.Enum;

namespace Rookie.AssetManagement.Business.Services
{
    public class AssetService : IAssetService
    {
        private readonly IBaseRepository<Asset> _assetRepository;
        private readonly IBaseRepository<Assignment> _assignmentRepository;
        private readonly IBaseRepository<Category> _categoryRepository;
        private readonly IBaseRepository<State> _stateRepository;
        private readonly IMapper _mapper;

        public AssetService(IBaseRepository<Asset> assetRepository, IBaseRepository<Assignment> assignmentRepository, IBaseRepository<Category> categoryRepository,
            IBaseRepository<State> stateRepository, IMapper mapper)
        {
            _assetRepository = assetRepository;
            _assignmentRepository = assignmentRepository;
            _categoryRepository = categoryRepository;
            _stateRepository = stateRepository;
            _mapper = mapper;
        }
        public async Task<AssetFormDto> GetAssetFormDataById(int id, string location)
        {
            var assetForm = await _assetRepository.Entities
                .Where(a => a.Id == id && a.Location == location)
                .ProjectTo<AssetFormDto>(_mapper.ConfigurationProvider)
                .FirstAsync();

            var isValidAsssignment = await _assignmentRepository.Entities
                .AnyAsync(a =>
                    a.Asset.Id == assetForm.Id &&
                    a.Asset.Location == location &&
                    a.State.Id == (int)AssignmentStateEnum.WaitingForAcceptance);
            if (!isValidAsssignment || assetForm.State == (int)AssetStateEnum.Assigned)
            {
                assetForm.IsEditable = false;
            }

            return assetForm;
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
              _assetRepository.Entities
              .Include(a => a.Category)
              .Include(a => a.State)
              .Where(x => !x.IsDeleted && x.Location == location).AsQueryable(),
              assetQueryCriteria);

            var asset = await assetQuery
               .AsNoTracking()
               .PaginateAsync<Asset>(
                   assetQueryCriteria.Page,
                   assetQueryCriteria.Limit,
                   cancellationToken);

            var assetDtos = _mapper.Map<IEnumerable<AssetDto>>(asset.Items);

            foreach (var assetDto in assetDtos)
            {
                var isValidAsssignment = await _assignmentRepository.Entities
                    .AnyAsync(a =>
                        a.Asset.Id == assetDto.Id &&
                        a.Asset.Location == location &&
                        a.State.Id == (int)AssignmentStateEnum.WaitingForAcceptance);
                if (!isValidAsssignment || assetDto.State == AssetStateEnum.Assigned.ToString())
                {
                    assetDto.IsEditable = false;
                }
            }

            return new PagedResponseModel<AssetDto>
            {
                CurrentPage = asset.CurrentPage,
                TotalPages = asset.TotalPages,
                TotalItems = asset.TotalItems,
                Items = assetDtos
            };
        }
        public async Task<AssetDto> AddAssetAsync(AssetCreateDto asset, string location)
        {
            Ensure.Any.IsNotNull(asset);
            var newAsset = _mapper.Map<Asset>(asset);
            var getCategory = _categoryRepository.Entities.Where(x => x.Id == asset.Category).FirstOrDefault();
            if (getCategory == null)
            {
                throw new NotFoundException("Category Not Found!");
            }
            var getState = _stateRepository.Entities.Where(x => x.Id == asset.State && x.Entity == "ASSET").FirstOrDefault();
            if (getState == null)
            {
                throw new NotFoundException("State Not Found!");
            }
            newAsset.Category = getCategory;
            newAsset.State = getState;
            newAsset.Location = location;
            newAsset.IsDeleted = false;
            newAsset.AssetCode = GenerateAssetCode(newAsset);
            var createResult = await _assetRepository.Add(newAsset);
            return _mapper.Map<AssetDto>(newAsset);
        }
        private string GenerateAssetCode(Asset asset)
        {
            var assetCode = "";
            var code = "";
            var category = asset.Category.CategoryName.ToUpper();
            var lastAsset = _assetRepository.Entities.Where(x => x.Category == asset.Category)
                                .OrderByDescending(x => x.AssetCode).FirstOrDefault();
            if (lastAsset != null)
            {
                code = lastAsset.AssetCode.Substring(2);
            }
            switch (category)
            {
                case "LAPTOP":
                    assetCode = lastAsset == null ? "LA000001" : ("LA" + (Convert.ToInt32(code) + 1).ToString("D6"));
                    break;
                case "MONITOR":
                    assetCode = lastAsset == null ? "MO000001" : ("MO" + (Convert.ToInt32(code) + 1).ToString("D6"));
                    break;
                case "PERSONAL COMPUTER":
                    assetCode = lastAsset == null ? "PC000001" : ("PC" + (Convert.ToInt32(code) + 1).ToString("D6"));
                    break;
            }
            return assetCode;

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
                assetQuery = assetQuery.Where(c => assetQueryCriteria.Categories.Any(e => e == c.Category.Id.ToString()));
            }
            if (assetQueryCriteria.States != null && !assetQueryCriteria.States.Any(e => e == "ALL"))
            {
                assetQuery = assetQuery.Where(x => assetQueryCriteria.States.Any(e => e == x.State.Id.ToString()));
            }
            if (assetQueryCriteria.SortColumn != null)
            {
                var sortColumn = assetQueryCriteria.SortColumn.ToUpper();
                switch (sortColumn)
                {
                    case "ASSETCODE":
                        assetQuery = assetQueryCriteria.SortOrder == 0 ? assetQuery.OrderBy(x => x.AssetCode) : assetQuery.OrderByDescending(x => x.AssetCode);
                        break;
                    case "ASSETNAME":
                        assetQuery = assetQueryCriteria.SortOrder == 0 ? assetQuery.OrderBy(x => x.AssetName) : assetQuery.OrderByDescending(x => x.AssetName);
                        break;
                    case "CATEGORY":
                        assetQuery = assetQueryCriteria.SortOrder == 0 ? assetQuery.OrderBy(x => x.Category) : assetQuery.OrderByDescending(x => x.Category);
                        break;
                    case "STATE":
                        assetQuery = assetQueryCriteria.SortOrder == 0 ? assetQuery.OrderBy(x => x.State) : assetQuery.OrderByDescending(x => x.State);
                        break;
                    default:
                        assetQuery = assetQuery.OrderBy(x => x.AssetCode);
                        break;
                }

            }
            return assetQuery;
        }
        public async Task<AssetDto> UpdateAssetAsync(AssetUpdateDto assetUpdateDto, string location)
        {
            var asset = await _assetRepository.Entities
                .Include(x => x.State)
                .Include(x => x.Category)
                .FirstOrDefaultAsync(a => a.Id == assetUpdateDto.Id && a.Location == location);
            if (asset == null)
            {
                throw new NotFoundException("Asset Not Found!");
            }
            if (asset.State.Id == (int)AssetStateEnum.Assigned)
            {
                throw new NotFoundException("Assigned Asset can not be edit");
            }
            var getState = _stateRepository.Entities.Where(x => x.Id == assetUpdateDto.State && x.Entity == "ASSET").FirstOrDefault();
            if (getState == null)
            {
                throw new NotFoundException("State Not Found!");
            }

            var isValidAsssignment = await _assignmentRepository.Entities
                .AnyAsync(a => a.Asset.Id == assetUpdateDto.Id && a.Asset.Location == location && a.State.Id == (int)AssignmentStateEnum.WaitingForAcceptance);
            if (isValidAsssignment)
            {
                throw new NotFoundException("Can't edit assets which have assignment with state Waiting for acceptance or Assigned!");
            }

            _mapper.Map(assetUpdateDto, asset);
            asset.State = getState;

            var assetUpdated = await _assetRepository.Update(asset);
            var assetUpdatedDto = _mapper.Map<AssetDto>(assetUpdated);
            return assetUpdatedDto;
        }

        public async Task<bool> DisableAssetAsync(int id, string location)
        {
            var asset = await _assetRepository.Entities.Include(a => a.State).SingleOrDefaultAsync(a => a.Id.Equals(id) && a.Location.Equals(location));
            if (asset == null)
            {
                throw new NotFoundException("Asset Not Found!");
            }
            if (asset.State.Id == (int)AssetStateEnum.Assigned)
            {
                throw new NotFoundException("Asset is assigned can not be delete");
            }
            // asset.IsDeleted = true;

            await _assetRepository.Delete(asset);

            return await Task.FromResult(true);
        }

        public async Task<PagedResponseModel<LookUpAssetDto>> GetLookUpAsset(AssetQueryCriteriaDto assetQueryCriteria, CancellationToken cancellationToken)
        {
            var assetQuery = AssetSortLookUp(
            _assetRepository.Entities.Include(a => a.Category)
                .Where(x => !x.IsDeleted).Where(x => x.State.Id == (int)AssetStateEnum.Available).AsQueryable(),
            assetQueryCriteria);

            var asset = await assetQuery
               .AsNoTracking()
               .PaginateAsync<Asset>(
                   assetQueryCriteria.Page,
                   assetQueryCriteria.Limit,
                   cancellationToken);

            var assetDto = _mapper.Map<IEnumerable<LookUpAssetDto>>(asset.Items);

            return new PagedResponseModel<LookUpAssetDto>
            {
                CurrentPage = asset.CurrentPage,
                TotalPages = asset.TotalPages,
                TotalItems = asset.TotalItems,
                Items = assetDto
            };
        }

        private IQueryable<Asset> AssetSortLookUp(
          IQueryable<Asset> assetQuery,
          AssetQueryCriteriaDto assetQueryCriteria)
        {
            if (!String.IsNullOrEmpty(assetQueryCriteria.Search))
            {
                assetQuery = assetQuery.Where(b =>
                  (b.AssetName.ToLower()).Contains(assetQueryCriteria.Search.ToLower())
                    || b.AssetCode.ToLower().Contains(assetQueryCriteria.Search.ToLower()));
            }

            if (assetQueryCriteria.SortColumn != null)
            {
                var sortColumn = assetQueryCriteria.SortColumn.ToUpper();
                assetQuery = sortColumn switch
                {
                    "ASSETCODE" => assetQueryCriteria.SortOrder == 0 ? assetQuery.OrderBy(x => x.AssetCode) : assetQuery.OrderByDescending(x => x.AssetCode),
                    "ASSETNAME" => assetQueryCriteria.SortOrder == 0 ? assetQuery.OrderBy(x => x.AssetName) : assetQuery.OrderByDescending(x => x.AssetName),
                    "CATEGORY" => assetQueryCriteria.SortOrder == 0 ? assetQuery.OrderBy(x => x.Category) : assetQuery.OrderByDescending(x => x.Category),
                    _ => assetQuery.OrderBy(x => x.AssetCode),
                };
            }
            return assetQuery;
        }
    }
}
