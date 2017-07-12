using DevPlus.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using DevPlus.Repositories.Entities;

namespace DevPlus.UnitTests.Common.Fakes.Defaults
{
    class DefaultReleaseNoteRepositoryFake : IReleaseNoteRepository
    {
        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ReleaseNote> GetTodayReleaseNote()
        {
            throw new NotImplementedException();
        }
    }
}
