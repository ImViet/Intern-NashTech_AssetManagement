using Rookie.AssetManagement.Contracts.Dtos.ReportDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Business.Interfaces
{
    public interface IReport
    {
        Task<IEnumerable<ReportDto>> GetReportAsync();
    }
}
