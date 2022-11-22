using AutoMapper;
using EnsureThat;
using Microsoft.EntityFrameworkCore;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Contracts;
using Rookie.AssetManagement.Contracts.Dtos.EnumDtos;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using Rookie.AssetManagement.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Business.Services
{
    public class UserService : IUserService
    {
        private readonly IBaseRepository<User> _userRepository;
        private readonly IMapper _mapper;

        public UserService(IBaseRepository<User> userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }



        public async Task<UserDto> AddAsync(UserCreateDto userRequest)
        {
            Ensure.Any.IsNotNull(userRequest);
            var newBrand = _mapper.Map<User>(userRequest);
            var brand = await _userRepository.Add(newBrand);
            return _mapper.Map<UserDto>(brand);
        }







    }
}
