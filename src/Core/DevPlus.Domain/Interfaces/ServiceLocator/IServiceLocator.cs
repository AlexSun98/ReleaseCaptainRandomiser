using Autofac;
using System;
using System.Collections.Generic;
using System.Text;

namespace DevPlus.Domain.Interfaces
{
    public interface IServiceLocator : IServiceProvider
    {
        T GetInstance<T>();
        T GetInstance<T>(string name);
        object GetInstance(Type type);
        IContainer GetIocContainer();
    }
}
