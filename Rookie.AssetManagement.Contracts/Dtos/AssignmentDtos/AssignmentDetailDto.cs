﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Contracts.Dtos.AssignmentDtos
{
    public class AssignmentDetailDto
    {
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public string Specification { get; set; }
        public string AssignedTo { get; set; }
        public string AssignedBy { get; set; }
        public DateTime AssignedDate { get; set; }
        public string State { get; set; }
        public string Note { get; set; }

    }
}
