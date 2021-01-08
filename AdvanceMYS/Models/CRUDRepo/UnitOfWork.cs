using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdvanceMYS.Models.CRUDRepo
{
    public class UnitOfWork : IUnitOfWork
    {
        public Models.Domain._Context Context { get; }
        public UnitOfWork(Models.Domain._Context gDSContext)
        {
            Context = gDSContext;
        }
        public void Commit()
        {
            Context.SaveChanges();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}
