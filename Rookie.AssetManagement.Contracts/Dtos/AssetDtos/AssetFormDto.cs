using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Contracts.Dtos.AssetDtos
{
    public class AssetFormDto
    {
        public int Id { get; set; }
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public int Category { get; set; }
        public string Specification { get; set; }
        public DateTime InstalledDate { get; set; }
        public int State { get; set; }
        public string Location { get; set; }
        public bool IsEditable { get; set; } = true;
    }
}