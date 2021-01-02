using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdvanceMYS.Models.CRUDRepo
{
    public interface IUnitOfWork : IDisposable
    {
        Models.Domain._5069_ManageYourSelfContext Context { get; }
        void Commit();
    }
}
