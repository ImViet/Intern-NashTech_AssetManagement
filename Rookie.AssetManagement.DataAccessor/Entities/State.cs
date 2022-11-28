using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.DataAccessor.Entities
{
    public class State
    {
        public int Id { get; set; }
        public string StateName { get; set; }
        public string IsDelete { get; set; }
        public virtual ICollection<Asset> Assets { get; set; }
    }
}
