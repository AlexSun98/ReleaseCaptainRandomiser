using Platform.Models;
using Platform.Repositories.Interfaces;
using Platform.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Platform.Repositories
{
    public class ReleaseCaptainRepository : BaseRepository<ReleaseCaptain>, IReleaseCaptainRepository
    {
        public ReleaseCaptainRepository(PlatformDbContext context) : base(context)
        { }


        public IEnumerable<ReleaseCaptain> GetTopActiveCaptain()
        {
            throw new NotImplementedException();
        }


        public ReleaseCaptain GetLatestCaptain()
        {
            return appContext.ReleaseCaptains
                .OrderByDescending(c => c.LastCaptaincyDate)
                .First();
        }

        private PlatformDbContext appContext
        {
            get { return (PlatformDbContext)_context; }
        }
    }
}
