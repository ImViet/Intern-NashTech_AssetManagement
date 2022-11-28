using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.DataAccessor.Enum
{
    public enum AssetStateEnum
    {
        Assigned = 0,
        Available = 1,
        NotAvailable = 2,
        WaitingForRecycling = 3,
        Recycled = 4,
    }
}
