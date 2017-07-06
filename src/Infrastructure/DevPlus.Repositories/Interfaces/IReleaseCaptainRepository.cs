using DevPlus.Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace DevPlus.Repositories.Interfaces
{
    public interface IReleaseCaptainRepository : IRepository<ReleaseCaptain>
    {
        IEnumerable<ReleaseCaptain> GetTopActiveCaptain();
        ReleaseCaptain GetLatestCaptain();
    }
}
