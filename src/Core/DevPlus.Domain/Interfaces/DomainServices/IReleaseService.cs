using DevPlus.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DevPlus.Domain.Interfaces.DomainServices
{
    public interface IReleaseService
    {
        List<ReleaseNoteModel> GetTodayReleaseNoteFromDb();

        List<ReleaseNoteModel> GetTodayReleaseNoteFromJira();

        List<ReleaseNoteModel> GetTodayReleaseNote();
    }
}
