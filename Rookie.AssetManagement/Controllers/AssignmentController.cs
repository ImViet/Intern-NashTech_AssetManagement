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
using Rookie.AssetManagement.Contracts.Dtos.StateDtos;

namespace Rookie.AssetManagement.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer", Policy = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentController : ControllerBase
    {
        private readonly IAssignmentService _assignmentService;
        private readonly IStateService _stateService;
        public AssignmentController(IAssignmentService assignmentService, IStateService stateService)
        {
            _stateService = stateService;
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

        [HttpGet]
        [Route("GetAssignment/{id}")]
        public async Task<ActionResult<AssignmentDto>> GetAssginmentById(int id)
        {
            var assignmentResponses = await _assignmentService.GetByIdAsync(id);
            return Ok(assignmentResponses);
        }

        [HttpGet]
        [Route("GetAssignmentDataForm/{id}")]
        public async Task<ActionResult<AssignmentFormDto>> GetAssginmentDataById(int id)
        {
            var assignmentResponses = await _assignmentService.GetFormDataById(id);
            return Ok(assignmentResponses);
        }

        [HttpGet]
        [Route("GetAssignmentState")]
        public async Task<ActionResult<StateDto>> GetAssignmentState()
        {
            return Ok(await _stateService.GetAssignmentStateAsync());
        }
        [HttpGet]
        [Route("my")]
        public async Task<ActionResult<PagedResponseModel<MyAssignmentDto>>> GetAssignmentByUserName(
        [FromQuery] AssignmentQueryCriteriaDto assignmentCriteriaDto,
        CancellationToken cancellationToken)
        {
            var userName = User.Claims.FirstOrDefault(x => x.Type.Equals("UserName", StringComparison.OrdinalIgnoreCase))?.Value;
            var assetResponses = await _assignmentService.GetAssignmentByUserNameAsync(
                                            assignmentCriteriaDto,
                                            cancellationToken,
                                            userName
                                            );
            return Ok(assetResponses);
        }

        [HttpPost]
        public async Task<ActionResult<AssignmentDto>> AddAssignmentAsync([FromBody] AssignmentCreateDto assignmentCreate)
        {
            var userName = User.Claims.FirstOrDefault(x => x.Type.Equals("UserName", StringComparison.OrdinalIgnoreCase))?.Value;
            var assigment = await _assignmentService.AddAssignmentAsync(assignmentCreate, userName);
            return Created(Endpoints.User, assigment);
        }
        [HttpPut]
        public async Task<ActionResult<AssignmentDto>> UpdateAssignmentAsync([FromBody] AssignmentUpdateDto assignmentUpdateDto)
        {
            var userName = User.Claims.FirstOrDefault(x => x.Type.Equals("UserName", StringComparison.OrdinalIgnoreCase))?.Value;
            AssignmentDto assignment = await _assignmentService.UpdateAssignmentAsync(assignmentUpdateDto, userName);
            return Created(Endpoints.User, assignment);
        }

        [HttpPatch("accept/{id}")]
        public async Task<ActionResult> AcceptAssignmentAsync([FromRoute] int id)
        {
            var userName = User.Claims.FirstOrDefault(x => x.Type.Equals("UserName", StringComparison.OrdinalIgnoreCase))?.Value;

            var disableResult = await _assignmentService.AcceptAssignmentAsync(userName, id);

            return Ok(disableResult);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DisableAssignmentAsync([FromRoute] int id)
        {
            var disableResult = await _assignmentService.DisableAssignmentAsync(id);

            return Ok(disableResult);
        }
    }
}
