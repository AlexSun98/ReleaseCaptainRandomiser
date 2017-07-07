using DevPlus.Repositories.Entities;
using DevPlus.Repositories.Interfaces;
using DevPlus.Repositories.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DevPlus.Repositories
{
    public class ReleaseNoteRepository : BaseRepository<ReleaseNote>, IReleaseNoteRepository
    {
        public ReleaseNoteRepository(DevPlusDbContext context) : base(context)
        { }

        public IEnumerable<ReleaseNote> GetTodayReleaseNote()
        {
            DateTime startDateTime = DateTime.Today; //Today at 00:00:00
            DateTime endDateTime = DateTime.Today.AddDays(1).AddTicks(-1);

            return appContext.ReleaseNotes
                .Where(c => c.NoteDateCreated >= startDateTime && c.NoteDateCreated <= endDateTime)
                .OrderByDescending(c => c.NoteDateModified);
        }

        private DevPlusDbContext appContext
        {
            get { return (DevPlusDbContext)_context; }
        }
    }
}
