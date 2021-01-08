using AdvanceMYS.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdvanceMYS.Models.CRUDRepo
{
    public interface IUnitOfWork : IDisposable
    {
        _Context Context { get; }
        void Commit();
    }
}
