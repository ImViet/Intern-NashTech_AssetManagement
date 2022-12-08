using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.DataAccessor.Enum
{
    public enum AssetStateEnum
    {
        Assigned = 1,
        Available,
        NotAvailable,
        WaitingForRecycling,
        Recycled
    }
}
