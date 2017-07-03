using Platform.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Platform.Repositories.Interfaces
{
    public interface IReleaseCaptainRepository : IRepository<ReleaseCaptain>
    {
        IEnumerable<ReleaseCaptain> GetTopActiveCaptain();
        ReleaseCaptain GetLatestCaptain();
    }
}
