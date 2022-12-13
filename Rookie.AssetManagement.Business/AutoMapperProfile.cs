using Rookie.AssetManagement.Contracts.Dtos.AuthDtos;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;
using Rookie.AssetManagement.Contracts.Dtos.CategoryDtos;
using Rookie.AssetManagement.Contracts.Dtos.StateDtos;
using Rookie.AssetManagement.DataAccessor.Entities;
using Rookie.AssetManagement.Contracts.Dtos.AssignmentDtos;
using Rookie.AssetManagement.Contracts.Dtos.ReturnRequestDtos;

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
                .ForMember(d => d.StaffCode, t => t.Ignore())
                .ForMember(d => d.Location, t => t.Ignore())
                .ForMember(d => d.IsNewUser, t => t.Ignore())
                .ForMember(d => d.Id, t => t.Ignore())
                .ForMember(d => d.UserName, t => t.Ignore())
                .ForMember(d => d.NormalizedUserName, t => t.Ignore())
                .ForMember(d => d.Email, t => t.Ignore())
                .ForMember(d => d.NormalizedEmail, t => t.Ignore())
                .ForMember(d => d.EmailConfirmed, t => t.Ignore())
                .ForMember(d => d.PasswordHash, t => t.Ignore())
                .ForMember(d => d.PhoneNumber, t => t.Ignore())
                .ForMember(d => d.PhoneNumberConfirmed, t => t.Ignore())
                .ForMember(d => d.TwoFactorEnabled, t => t.Ignore())
                .ForMember(d => d.LockoutEnd, t => t.Ignore())
                .ForMember(d => d.LockoutEnabled, t => t.Ignore())
                .ForMember(d => d.AccessFailedCount, t => t.Ignore())
                .ForMember(d => d.SecurityStamp, t => t.Ignore())
                .ForMember(d => d.ConcurrencyStamp, t => t.Ignore())
                .ForMember(d => d.Assignments, t => t.Ignore());
            CreateMap<UserUpdateDto, User>()
                .ForMember(d => d.FirstName, t => t.Ignore())
                .ForMember(d => d.LastName, t => t.Ignore())
                .ForMember(d => d.IsDeleted, t => t.Ignore())
                .ForMember(d => d.StaffCode, t => t.Ignore())
                .ForMember(d => d.Location, t => t.Ignore())
                .ForMember(d => d.IsNewUser, t => t.Ignore())
                .ForMember(d => d.Id, t => t.Ignore())
                .ForMember(d => d.UserName, t => t.Ignore())
                .ForMember(d => d.NormalizedUserName, t => t.Ignore())
                .ForMember(d => d.Email, t => t.Ignore())
                .ForMember(d => d.NormalizedEmail, t => t.Ignore())
                .ForMember(d => d.EmailConfirmed, t => t.Ignore())
                .ForMember(d => d.PasswordHash, t => t.Ignore())
                .ForMember(d => d.PhoneNumber, t => t.Ignore())
                .ForMember(d => d.PhoneNumberConfirmed, t => t.Ignore())
                .ForMember(d => d.TwoFactorEnabled, t => t.Ignore())
                .ForMember(d => d.LockoutEnd, t => t.Ignore())
                .ForMember(d => d.LockoutEnabled, t => t.Ignore())
                .ForMember(d => d.AccessFailedCount, t => t.Ignore())
                .ForMember(d => d.SecurityStamp, t => t.Ignore())
                .ForMember(d => d.ConcurrencyStamp, t => t.Ignore())
                .ForMember(d => d.Assignments, t => t.Ignore());
            CreateMap<AssetCreateDto, Asset>()
                .ForMember(d => d.Id, t => t.Ignore())
                .ForMember(d => d.AssetCode, t => t.Ignore())
                .ForMember(d => d.IsDeleted, t => t.Ignore())
                .ForMember(d => d.Location, t => t.Ignore())
                .ForMember(d => d.Category, t => t.Ignore())
                .ForMember(d => d.State, t => t.Ignore())
                .ForMember(d => d.Assignments, t => t.Ignore());
            CreateMap<AssetUpdateDto, Asset>()
                .ForMember(d => d.Id, t => t.Ignore())
                .ForMember(d => d.AssetCode, t => t.Ignore())
                .ForMember(d => d.IsDeleted, t => t.Ignore())
                .ForMember(d => d.Location, t => t.Ignore())
                .ForMember(d => d.Category, t => t.Ignore())
                .ForMember(d => d.State, t => t.Ignore())
                .ForMember(d => d.Assignments, t => t.Ignore());

            CreateMap<AssignmentCreateDto, Assignment>()
                .ForMember(d => d.AssignedTo, t => t.Ignore())
                .ForMember(d => d.AssignedBy, t => t.Ignore())
                .ForMember(d => d.IsDeleted, t => t.Ignore())
                .ForMember(d => d.State, t => t.Ignore())
                .ForMember(d => d.Id, t => t.Ignore())
                .ForMember(d => d.Asset, t => t.Ignore());
            CreateMap<AssignmentUpdateDto, Assignment>()
                .ForMember(d => d.AssignedTo, t => t.Ignore())
                .ForMember(d => d.AssignedBy, t => t.Ignore())
                .ForMember(d => d.IsDeleted, t => t.Ignore())
                .ForMember(d => d.State, t => t.Ignore())
                .ForMember(d => d.Asset, t => t.Ignore())
                .ForMember(d => d.Id, t => t.Ignore());
            CreateMap<ReturnRequestCreateDto, ReturnRequest>()
                .ForMember(d => d.Id, t => t.Ignore())
                .ForMember(d => d.Assignment, t => t.Ignore())
                .ForMember(d => d.State, t => t.Ignore())
                .ForMember(d => d.ReturnedDate, t => t.Ignore())
                .ForMember(d => d.AcceptedBy, t => t.Ignore());

        }

        private void FromDataAccessorLayer()
        {
            CreateMap<User, UserDto>()
                .ForMember(d => d.FullName, t => t.MapFrom(src => src.FirstName + " " + src.LastName));
            CreateMap<User, AccountDto>()
                .ForMember(d => d.FullName, t => t.MapFrom(src => src.FirstName + " " + src.LastName))
                .ForMember(d => d.Token, t => t.Ignore());
            CreateMap<User, LookUpUserDto>()
                .ForMember(d => d.FullName, t => t.MapFrom(src => src.FirstName + " " + src.LastName));

            CreateMap<Category, CategoryDto>();
            CreateMap<State, StateDto>();

            CreateMap<Asset, AssetDto>()
                .ForMember(d => d.Category, t => t.MapFrom(c => c.Category.CategoryName))
                .ForMember(d => d.State, t => t.MapFrom(c => c.State.StateName));
            CreateMap<Asset, AssetFormDto>()
                .ForMember(d => d.Category, t => t.MapFrom(c => c.Category.Id))
                .ForMember(d => d.State, t => t.MapFrom(c => c.State.Id));
            CreateMap<Asset, LookUpAssetDto>()
                .ForMember(d => d.Category, t => t.MapFrom(src => src.Category.CategoryName));

            CreateMap<Assignment, AssignmentDto>()
                .ForMember(d => d.No, t => t.Ignore())
                .ForMember(d => d.AssetCode, t => t.MapFrom(c => c.Asset.AssetCode))
                .ForMember(d => d.AssetName, t => t.MapFrom(c => c.Asset.AssetName))
                .ForMember(d => d.State, t => t.MapFrom(c => c.State.StateName))
                .ForMember(d => d.AssignedTo, t => t.MapFrom(c => c.AssignedTo.UserName))
                .ForMember(d => d.AssignedBy, t => t.MapFrom(c => c.AssignedBy.UserName))
                .ForMember(d => d.Specification, t => t.MapFrom(c => c.Asset.Specification));
            CreateMap<Assignment, MyAssignmentDto>()
                .ForMember(d => d.AssetCode, t => t.MapFrom(c => c.Asset.AssetCode))
                .ForMember(d => d.AssetName, t => t.MapFrom(c => c.Asset.AssetName))
                .ForMember(d => d.State, t => t.MapFrom(c => c.State.StateName))
                .ForMember(d => d.AssignedTo, t => t.MapFrom(c => c.AssignedTo.UserName))
                .ForMember(d => d.AssignedBy, t => t.MapFrom(c => c.AssignedBy.UserName))
                .ForMember(d => d.Specification, t => t.MapFrom(c => c.Asset.Specification))
                .ForMember(d => d.Category, t => t.MapFrom(c => c.Asset.Category.CategoryName));

            CreateMap<Assignment, AssignmentFormDto>()
                .ForMember(d => d.User, t => t.MapFrom(c => c.AssignedTo.Id))
                .ForMember(d => d.Asset, t => t.MapFrom(c => c.Asset.Id))
                .ForMember(d => d.AssetName, t => t.MapFrom(c => c.Asset.AssetName))
                .ForMember(d => d.UserName, t => t.MapFrom(src => src.AssignedTo.FirstName + " " + src.AssignedTo.LastName));

            CreateMap<ReturnRequest, ReturnRequestDto>()
                .ForMember(d => d.No, t => t.Ignore())
                .ForMember(d => d.AssetCode, t => t.MapFrom(c => c.Assignment.Asset.AssetCode))
                .ForMember(d => d.AssetName, t => t.MapFrom(c => c.Assignment.Asset.AssetName))
                .ForMember(d => d.RequestedBy, t => t.MapFrom(c => c.Assignment.AssignedTo.UserName))
                .ForMember(d => d.AssignedDate, t => t.MapFrom(c => c.Assignment.AssignedDate))
                .ForMember(d => d.AcceptedBy, t => t.MapFrom(c => c.AcceptedBy.UserName))
                .ForMember(d => d.ReturnedDate, t => t.MapFrom(c => c.ReturnedDate))
                .ForMember(d => d.State, t => t.MapFrom(c => c.State.StateName));
        }

    }
}