using Platform.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Platform.UnitOfWork
{
    public interface IUnitOfWork
    {
        IReleaseCaptainRepository ReleaseCaptain { get; }

        int SaveChanges();
    }
}
