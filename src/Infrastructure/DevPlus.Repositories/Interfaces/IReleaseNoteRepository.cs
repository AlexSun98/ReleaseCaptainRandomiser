using DevPlus.Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace DevPlus.Repositories.Interfaces
{
    public interface IReleaseNoteRepository : IRepository<ReleaseNote>, IDisposable
    {
        IEnumerable<ReleaseNote> GetTodayReleaseNote();
    }
}
