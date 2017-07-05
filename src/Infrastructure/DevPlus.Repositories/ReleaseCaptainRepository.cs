using DevPlus.Models;
using DevPlus.Repositories.Interfaces;
using DevPlus.Repositories.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DevPlus.Repositories
{
    public class ReleaseCaptainRepository : BaseRepository<ReleaseCaptain>, IReleaseCaptainRepository
    {
        public ReleaseCaptainRepository(DevPlusDbContext context) : base(context)
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

        private DevPlusDbContext appContext
        {
            get { return (DevPlusDbContext)_context; }
        }
    }
}
