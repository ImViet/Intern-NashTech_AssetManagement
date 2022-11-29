using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Contracts.Dtos.AssetDtos
{
    public class AssetCreateDto
    {
        public string AssetName { get; set; }
        public int Category { get; set; }
        public string Specification { get; set; }
        public DateTime InstalledDate { get; set; }
        public int State { get; set; }
    }
}
