using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AdvanceMYS.Models.CRUDRepo
{
    public interface IBaseRepository<T> where T : class
    {
        void Add(T obj);
        void Update(T obj);
        IEnumerable<T> Find(Expression<Func<T, bool>> predicate);
        IEnumerable<T> Find();
    }
}
