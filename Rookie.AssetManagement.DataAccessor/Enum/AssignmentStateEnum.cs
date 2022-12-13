using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.DataAccessor.Enum
{
    public enum AssignmentStateEnum
    {
        Accepted = 6,
        WaitingForAcceptance,
        Declined,
        Returned,
        WaitingForReturning = 12
    }
}
