using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Business.Services;
using Rookie.AssetManagement.Constants;
using Rookie.AssetManagement.Contracts;
using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;
using Rookie.AssetManagement.Contracts.Dtos.CategoryDtos;
using Rookie.AssetManagement.Contracts.Dtos.StateDtos;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer", Policy = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AssetController : ControllerBase
    {
        private readonly IAssetService _assetService;
        private readonly IStateService _stateService;
        private readonly ICategoryService _categoryService;

        public AssetController(IAssetService assetService, IStateService stateService, ICategoryService categoryService)
        {
            _assetService = assetService;
            _stateService = stateService;
            _categoryService = categoryService;
        }

        [HttpGet]
        [Route("GetAllAsset")]
        public async Task<ActionResult<AssetDto>> GetAllAsset()
        {
            return Ok(await _assetService.GetAllAsync());
        }

        [HttpGet]
        [Route("GetAllState")]
        public async Task<ActionResult<StateDto>> GetAllState()
        {
            return Ok(await _stateService.GetAllAsync());
        }

        [HttpGet]
        [Route("GetAllCategory")]
        public async Task<ActionResult<CategoryDto>> GetAllCategory()
        {
            return Ok(await _categoryService.GetAllAsync());
        }

        [HttpGet]
        [Route("GetAsset/{id}")]
        public async Task<ActionResult<AssetFormDto>> GetAssetById(int id)
        {
            var location = User.Claims.FirstOrDefault(x => x.Type.Equals("Location", StringComparison.OrdinalIgnoreCase))?.Value;

            var assetResponses = await _assetService.GetAssetFormDataById(id, location);
            return Ok(assetResponses);
        }

        [HttpGet]
        [Route("GetAsset")]
        public async Task<ActionResult<PagedResponseModel<AssetDto>>> GetAsset(
        [FromQuery] AssetQueryCriteriaDto assetCriteriaDto,
        CancellationToken cancellationToken)
        {
            var location = User.Claims.FirstOrDefault(x => x.Type.Equals("Location", StringComparison.OrdinalIgnoreCase))?.Value;

            var assetResponses = await _assetService.GetByPageAsync(
                                            assetCriteriaDto,
                                            cancellationToken,
                                            location);
            return Ok(assetResponses);
        }

        [HttpPost]
        public async Task<ActionResult<AssetDto>> AddAssetAsync([FromBody] AssetCreateDto assetCreate)
        {
            var location = User.Claims.FirstOrDefault(x => x.Type.Equals("Location", StringComparison.OrdinalIgnoreCase))?.Value;
            var asset = await _assetService.AddAssetAsync(assetCreate, location);
            return Created(Endpoints.User, asset);
        }

        [HttpPut]
        public async Task<ActionResult<AssetDto>> UpdateAssetAsync([FromBody] AssetUpdateDto assetUpdateDto)
        {
            var location = User.Claims.FirstOrDefault(x => x.Type.Equals("Location", StringComparison.OrdinalIgnoreCase))?.Value;

            AssetDto asset;
            try
            {
                asset = await _assetService.UpdateAssetAsync(assetUpdateDto, location);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            return Created(Endpoints.User, asset);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DisableAssetAsync([FromRoute] int id)
        {
            var location = User.Claims.FirstOrDefault(x => x.Type.Equals("Location", StringComparison.OrdinalIgnoreCase))?.Value;

            var disableResult = await _assetService.DisableAssetAsync(id, location);

            return Ok(disableResult);
        }

        [HttpGet]
        [Route("GetLookUpAsset")]
        public async Task<ActionResult<PagedResponseModel<LookUpAssetDto>>> GetLookUpAsset(
            [FromQuery] AssetQueryCriteriaDto assetQueryCriteriaDto,
            CancellationToken cancellationToken)
        {


            var assetResponses = await _assetService.GetLookUpAsset(
                                            assetQueryCriteriaDto,
                                            cancellationToken
                                            );
            return Ok(assetResponses);
        }
    }
}
