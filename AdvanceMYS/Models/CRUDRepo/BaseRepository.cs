using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AdvanceMYS.Models.CRUDRepo
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        IUnitOfWork _unitOfWork;
        public BaseRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public void Add(T obj)
        {
            _unitOfWork.Context.Set<T>().Add(obj);
        }

        public IEnumerable<T> Find(Expression<Func<T, bool>> predicate)
        {
            return _unitOfWork.Context.Set<T>().Where(predicate).AsEnumerable();
        }

        public IEnumerable<T> Find()
        {
            return _unitOfWork.Context.Set<T>().AsEnumerable();
        }

        public void Update(T obj)
        {
            _unitOfWork.Context.Entry(obj).State = EntityState.Modified;
            _unitOfWork.Context.Set<T>().Attach(obj);
        }
        public bool Save()
        {
            _unitOfWork.Context.SaveChanges();
            return true;
        }
    }
}
