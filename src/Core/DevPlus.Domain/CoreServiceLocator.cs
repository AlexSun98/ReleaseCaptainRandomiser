using DevPlus.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace DevPlus.Domain
{
    public static class CoreServiceLocator
    {
        private static IServiceLocator _current;

        public static IServiceLocator Current
        {
            get
            {
                return _current;
            }
        }

        public static void SetServiceLocator(Func<IServiceLocator> create)
        {
            if (create == null) throw new ArgumentNullException("create");
            _current = create();
        }
    }
}
