using System;
using DevPlus.Domain.Interfaces;
using Autofac;

namespace Maple.Infrastructure.DependencyResolution.AutofacServiceLocator
{
    public class AutofacServiceLocator : IServiceLocator
    {
        private readonly IContainer _container;

        public AutofacServiceLocator(IContainer container)
        {
            _container = container;
        }

        public T GetInstance<T>()
        {
            return _container.Resolve<T>();
        }

        public T GetInstance<T>(string name)
        {
            return _container.ResolveNamed<T>(name);
        }


        public object GetInstance(Type type)
        {
            return _container.Resolve(type);
        }

        public object GetService(Type serviceType)
        {
            return _container.Resolve(serviceType);
        }

        public IContainer GetIocContainer()
        {
            return _container;
        }
    }
}
