using Microsoft.AspNetCore.Mvc;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Rookie.AssetManagement.Contracts.Dtos.AssignmentDtos;
using Rookie.AssetManagement.Business.Services;
using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;
using Rookie.AssetManagement.Contracts;
using System.Linq;
using System.Threading;
using Rookie.AssetManagement.Constants;
using System;

namespace Rookie.AssetManagement.Controllers
{
    //[Authorize(AuthenticationSchemes = "Bearer", Policy = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentController : ControllerBase
    {
        private readonly IAssignmentService _assignmentService;
        public AssignmentController(IAssignmentService assignmentService)
        {
            _assignmentService = assignmentService;
        }
        [HttpGet]
        public async Task<ActionResult<AssignmentDto>> GetAllAssignment()
        {
            return Ok(await _assignmentService.GetAllAsync());
        }

        [HttpGet]
        [Route("Assignment")]
        public async Task<ActionResult<PagedResponseModel<AssignmentDto>>> GetAssignment(
        [FromQuery] AssignmentQueryCriteriaDto assignmentCriteriaDto,
        CancellationToken cancellationToken)
        {
          
          

            var assetResponses = await _assignmentService.GetByPageAsync(
                                            assignmentCriteriaDto,
                                            cancellationToken
                                            );
            return Ok(assetResponses);
        }

        [HttpPost]
        public async Task<ActionResult<AssetDto>> AddAssetAsync([FromBody] AssignmentCreateDto assignmentCreate)
        {
            var AssignedBy = User.Claims.FirstOrDefault(x => x.Type.Equals("UserName", StringComparison.OrdinalIgnoreCase))?.Value;
            var asset = await _assignmentService.AddAssetAsync(assignmentCreate, AssignedBy);
            return Created(Endpoints.User, asset);
        }
    }
}
