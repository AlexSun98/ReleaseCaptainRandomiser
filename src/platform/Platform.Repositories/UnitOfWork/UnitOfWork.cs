using Platform.Repositories;
using Platform.Repositories.Interfaces;
using System;

namespace Platform.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        readonly PlatformDbContext _context;

        IReleaseCaptainRepository _releaseCaptains;

        public UnitOfWork(PlatformDbContext context)
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
