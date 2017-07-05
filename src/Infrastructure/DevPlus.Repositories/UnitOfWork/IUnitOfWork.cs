using DevPlus.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace DevPlus.Repositories.UnitOfWork
{
    public interface IUnitOfWork
    {
        IReleaseCaptainRepository ReleaseCaptain { get; }

        int SaveChanges();
    }
}
