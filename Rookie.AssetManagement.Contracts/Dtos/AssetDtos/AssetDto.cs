using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Contracts.Dtos.AssetDtos
{
    public class AssetDto
    {
        public int Id { get; set; }
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public string Category { get; set; }
        public string Specification { get; set; }
        public DateTime InstalledDate { get; set; }
        public string State { get; set; }
        public string Location { get; set; }
        public bool IsEditable { get; set; } = true;
        public bool IsHaveAsssignment { get; set; } = false;
    }
}
