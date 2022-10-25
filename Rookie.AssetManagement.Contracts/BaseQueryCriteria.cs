using System.Collections.Generic;

namespace Rookie.AssetManagement.Contracts
{
    public class BaseQueryCriteria
    {
        public int Limit { get; set; } = 10;
        public int Page { get; set; } = 1;
    }
}