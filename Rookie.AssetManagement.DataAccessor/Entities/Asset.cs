using Rookie.AssetManagement.DataAccessor.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.DataAccessor.Entities
{
    public class Asset
    {
        public int Id { get; set; }
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public Category Category { get; set; }
        public string Specification { get; set; }
        public DateTime InstalledDate { get; set; }
        public State State { get; set; }
        public bool IsDeleted { get; set; }
        public string Location { get; set; }
        public virtual ICollection<Assignemnt> Assignemnts { get; set; }

    }
}
