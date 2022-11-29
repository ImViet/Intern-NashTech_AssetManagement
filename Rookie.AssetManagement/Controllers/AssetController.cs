using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Business.Services;
using Rookie.AssetManagement.Constants;
using Rookie.AssetManagement.Contracts;
using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetController : ControllerBase
    {
        private readonly IAssetService _assetService;
        public AssetController(IAssetService assetService)
        {
            _assetService = assetService;
        }

        [HttpGet]
        public async Task<ActionResult<AssetDto>> GetAllUser()
        {
            return Ok(await _assetService.GetAllAsync());
        }

        [HttpGet]
        [Route("GetAsset")]
        public async Task<ActionResult<PagedResponseModel<AssetDto>>> GetUser(
        [FromQuery] AssetQueryCriteriaDto assetCriteriaDto,
        CancellationToken cancellationToken)
        {
            var location = User.Claims.FirstOrDefault(x => x.Type.Equals("Location", StringComparison.OrdinalIgnoreCase))?.Value;

            var userResponses = await _assetService.GetByPageAsync(
                                            assetCriteriaDto,
                                            cancellationToken,
                                            location);
            return Ok(userResponses);
        }

        [HttpPost]
        public async Task<ActionResult<AssetDto>> AddAssetAsync([FromForm] AssetCreateDto assetCreate)
        {
            var location = User.Claims.FirstOrDefault(x => x.Type.Equals("Location", StringComparison.OrdinalIgnoreCase))?.Value;
            var user = await _assetService.AddAssetAsync(assetCreate, location);
            return Created(Endpoints.User, user);
        }
    }
}
