﻿using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;
using Rookie.AssetManagement.Contracts;
using Rookie.AssetManagement.Contracts.Dtos.AssignmentDtos;
using Rookie.AssetManagement.Contracts.Dtos.ReturnRequestDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Business.Interfaces
{
    public interface IReturnRequestService
    {
        Task<IEnumerable<ReturnRequestDto>> GetAllAsync();
        Task<PagedResponseModel<ReturnRequestDto>> GetByPageAsync(ReturnRequestQueryCriteriaDto returnRequestQueryCriteria, CancellationToken cancellationToken);
    }
}
