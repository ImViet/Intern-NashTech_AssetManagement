using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Constants;
using Rookie.AssetManagement.Contracts.Dtos.AuthDtos;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public async Task<ActionResult<string>> LoginUser([FromBody] LoginDto userRequest)
        {
            var user = await _authService.LoginAsync(userRequest);
            if(user == "")
            {
                return BadRequest("account or password is incorrect!");
            }
            return Ok(user);
        }
    }
}
