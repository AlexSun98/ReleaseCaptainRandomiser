using DevPlus.Repositories;
using DevPlus.Repositories.Interfaces;
using System;
using DevPlus.Repositories.Entities;

namespace DevPlus.Repositories.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        readonly DevPlusDbContext _context;

        IReleaseCaptainRepository _releaseCaptains;

        public UnitOfWork(DevPlusDbContext context)
        {
            _context = context;
        }


        public IReleaseCaptainRepository ReleaseCaptain
        {
            get
            {
                if (_releaseCaptains == null)
                    _releaseCaptains = new ReleaseCaptainRepository(_context);

                return _releaseCaptains; 
            }
        }

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }
    }
}
