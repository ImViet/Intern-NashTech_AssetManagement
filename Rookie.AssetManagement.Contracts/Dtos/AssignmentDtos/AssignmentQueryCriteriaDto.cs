﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Contracts.Dtos.AssignmentDtos
{
    public class AssignmentQueryCriteriaDto : BaseQueryCriteria
    {
        public DateTime AssignedDate { get; set; }
        public string[] States { get; set; }
        public int Id { get; set; }
    }
}
