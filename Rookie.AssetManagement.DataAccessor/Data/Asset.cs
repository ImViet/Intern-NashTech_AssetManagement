using Rookie.AssetManagement.DataAccessor.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.DataAccessor.Data
{
    public class Asset
    {
        public int Id { get; set; }
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public string Category { get; set; }
        public string Specification { get; set; }
        public DateTime InstalledDate { get; set; }
        public string State { get; set; }
        public bool IsDeleted { get; set; }
        public string Location { get; set; }
    }
}
