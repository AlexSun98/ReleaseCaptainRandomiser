using DevPlus.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace DevPlus.Domain
{
    public static class CoreAutoMapper
    {
        private static IAutoMapper _current;

        public static IAutoMapper Current
        {
            get
            {
                return _current;
            }
        }

        public static void SetMapper(Func<IAutoMapper> create)
        {
            if (create == null) throw new ArgumentNullException("create");
            _current = create();
        }
    }
}
