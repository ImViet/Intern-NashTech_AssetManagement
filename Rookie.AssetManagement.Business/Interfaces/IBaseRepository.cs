using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Business.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        IQueryable<T> Entities { get; }

        Task<T> GetById(int id);

        Task<T> GetByAsync(Expression<Func<T, bool>> filter = null, string includeProperties = "");

        Task<IEnumerable<T>> GetAll();

        Task<T> Add(T entity);

        Task<T> Update(T entity);

        Task<T> Delete(T entity);
    }
}