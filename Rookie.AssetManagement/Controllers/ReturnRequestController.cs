using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Business.Services;
using Rookie.AssetManagement.Constants;
using Rookie.AssetManagement.Contracts;
using Rookie.AssetManagement.Contracts.Dtos.AssignmentDtos;
using Rookie.AssetManagement.Contracts.Dtos.ReturnRequestDtos;
using Rookie.AssetManagement.Contracts.Dtos.StateDtos;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReturnRequestController : ControllerBase
    {
        private readonly IStateService _stateService;
        private readonly IReturnRequestService _returnRequestService;
        //private readonly IStateService _stateService;
        public ReturnRequestController(IStateService stateService
            , IReturnRequestService returnRequestService)
        {
            _stateService = stateService;
            _returnRequestService = returnRequestService;
        }
        
        [HttpGet]
        public async Task<ActionResult<ReturnRequestDto>> GetAllReturnRequest()
        {
            return Ok(await _returnRequestService.GetAllAsync());
        }

        [HttpGet]
        [Route("ReturnRequest")]
        public async Task<ActionResult<PagedResponseModel<ReturnRequestDto>>> GetReturnRequest(
        [FromQuery] ReturnRequestQueryCriteriaDto returnRequestCriteriaDto,
        CancellationToken cancellationToken)
        {
            var assetResponses = await _returnRequestService.GetByPageAsync(
                                            returnRequestCriteriaDto,
                                            cancellationToken
                                            );
            return Ok(assetResponses);
        }

        [HttpGet]
        [Route("ReturningState")]
        public async Task<ActionResult<StateDto>> GetReturningState()
        {
            return Ok(await _stateService.GetReturningStateAsync());
        }

        [HttpPost]
        public async Task<ActionResult<ReturnRequestDto>> AddAssignmentAsync([FromBody] ReturnRequestCreateDto returnRequestCreate)
        {
            var userName = User.Claims.FirstOrDefault(x => x.Type.Equals("UserName", StringComparison.OrdinalIgnoreCase))?.Value;
            var assigment = await _returnRequestService.AddReturnRequestAsync(returnRequestCreate, userName);
            return Created(Endpoints.User, assigment);
        }
    }

}
