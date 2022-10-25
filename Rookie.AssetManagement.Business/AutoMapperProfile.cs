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
 
        }

        private void FromDataAccessorLayer()
        {

        }
    }
}
