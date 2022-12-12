using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Contracts.Dtos.StateDtos;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReturningController : ControllerBase
    {
        private readonly IStateService _stateService;
        public ReturningController(IStateService stateService)
        {
            _stateService = stateService;
        }

        [HttpGet]
        [Route("ReturningState")]
        public async Task<ActionResult<StateDto>> GetReturningState()
        {
            return Ok(await _stateService.GetReturningStateAsync());
        }
    }

}
