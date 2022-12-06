using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Contracts.Dtos.UserDtos
{
    public class LookUpAssetDto
    {
        public int Id { get; set; }
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public string Category{ get; set; }
    }
}

