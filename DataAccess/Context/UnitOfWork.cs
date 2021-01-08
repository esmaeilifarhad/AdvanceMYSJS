using DataAccess.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Context
{
    public class UnitOfWork<TEntity> where TEntity : class/*, IDisposable*/
    {
        dbContext db = new dbContext();
        private GenericRepository<TEntity> repository;
        public GenericRepository<TEntity> Repository
        {
            get
            {
                if (repository == null)
                {
                    repository = new GenericRepository<TEntity>(db);
                }
                return repository;
            }
        }
        public void Dispose()
        {
            db.Dispose();
        }
    }
}
