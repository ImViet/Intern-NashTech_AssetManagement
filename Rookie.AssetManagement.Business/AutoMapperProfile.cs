using Rookie.AssetManagement.Contracts.Dtos.AuthDtos;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using Rookie.AssetManagement.DataAccessor.Entities;

namespace Rookie.AssetManagement.Business
{
    public class AutoMapperProfile : AutoMapper.Profile
    {
        public AutoMapperProfile()
        {
            FromDataAccessorLayer();
            FromPresentationLayer();
        }

        private void FromPresentationLayer()
        {
            CreateMap<UserCreateDto, User>()
                .ForMember(d => d.IsDeleted, t => t.Ignore())
                .ForMember(d => d.StaffCode, t => t.Ignore());
            CreateMap<UserUpdateDto, User>();
        }

        private void FromDataAccessorLayer()
        {
            CreateMap<User, UserDto>()
                .ForMember(d => d.FullName, t => t.MapFrom(src => src.FirstName + " " + src.LastName));
            CreateMap<User, AccountDto>()
                .ForMember(d => d.FullName, t => t.MapFrom(src => src.FirstName + " " + src.LastName));
        }
    }
}
