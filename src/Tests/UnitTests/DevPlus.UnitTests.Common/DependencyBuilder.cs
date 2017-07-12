using Autofac;
using DevPlus.Domain;
using Maple.Infrastructure.DependencyResolution.AutofacServiceLocator;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Reflection;

namespace DevPlus.UnitTests.Common
{
    public class DependencyBuilder
    {
        private static Dictionary<Type, object> _defaults;

        public static DependencyBuilder Factory()
        {
            return new DependencyBuilder();
        }

        public static void Reset()
        {
            var builder = new ContainerBuilder();
            var container = builder.Build();

            CoreServiceLocator.SetServiceLocator(() => new AutofacServiceLocator(container));
        }

        private static void SetupDefaults()
        {
            var assembly = typeof(DependencyBuilder).GetTypeInfo().Assembly;

            var containerBuilder = new ContainerBuilder();

            containerBuilder.RegisterAssemblyTypes(assembly)
                   .Where(t => t.Name.EndsWith("Fake"))
                   .AsImplementedInterfaces();

            var container = containerBuilder.Build();

            CoreServiceLocator.SetServiceLocator(() => new AutofacServiceLocator(container));
        }

        public DependencyBuilder With<TInt>(TInt implementation)
        {
            var currentContainer = CoreServiceLocator.Current.GetIocContainer();

            var builder = new ContainerBuilder();
            var components = currentContainer.ComponentRegistry.Registrations
                                .Where(cr => cr.Activator.LimitType != typeof(TInt));

            var sources = currentContainer.ComponentRegistry.Sources
                              .Where(cr => cr.GetType() != typeof(TInt));

            foreach (var component in components)
            {
                builder.RegisterComponent(component);
            }

            foreach (var source in sources)
            {
                builder.RegisterSource(source);
            }

            builder.RegisterType<TInt>().As<TInt>().InstancePerDependency();

            var newContainer = builder.Build();
            CoreServiceLocator.SetServiceLocator(() => new AutofacServiceLocator(newContainer));
            return this;
        }

    }
}
