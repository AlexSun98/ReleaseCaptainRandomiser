using DevPlus.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using DevPlus.Domain.Interfaces.DomainServices;
using DevPlus.Domain.Models;

namespace DevPlus.UnitTests.Common.Fakes.Defaults
{
    class DefaultReleaseServiceFake : IReleaseService
    {
        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public List<ReleaseNoteModel> GetTodayReleaseNoteFromDb()
        {
            throw new NotImplementedException();
        }

        public List<ReleaseNoteModel> GetTodayReleaseNoteFromJira()
        {
            throw new NotImplementedException();
        }

        List<ReleaseNoteModel> IReleaseService.GetTodayReleaseNote()
        {
            throw new NotImplementedException();
        }
    }
}
