using Autofac;
using DevPlus.Domain;
using Maple.Infrastructure.DependencyResolution.AutofacServiceLocator;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Reflection;
using DevPlus.Domain.Interfaces.DomainServices;
using Moq;
using DevPlus.Domain.Models;
using Autofac.Core.Lifetime;

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

        public DependencyBuilder SetupDefaults()
        {
            var assembly = typeof(DependencyBuilder).GetTypeInfo().Assembly;

            var containerBuilder = new ContainerBuilder();

            containerBuilder.RegisterAssemblyTypes(assembly)
                   .Where(t => t.Name.EndsWith("Fake"))
                   .AsImplementedInterfaces();

            var container = containerBuilder.Build();

            CoreServiceLocator.SetServiceLocator(() => new AutofacServiceLocator(container));
            return this;
        }


        public DependencyBuilder With<TInt, T>(TInt implementation)
        {
            //clone current registrations and filter out exsiting ones.
            var currentContainer = CoreServiceLocator.Current.GetIocContainer();

            var builder = new ContainerBuilder();

            var components = currentContainer.ComponentRegistry.Registrations
                                .Where(cr => cr.Activator.LimitType != typeof(LifetimeScope))
                                .Where(cr => cr.Activator.LimitType != typeof(T))
                                .Where(cr => cr.Activator.LimitType.Name.Replace("Default", "").Replace("Fake", "") != typeof(T).Name);

            var test = components.FirstOrDefault().Services.FirstOrDefault().Description;
            var test1 = typeof(T).Name;
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

            //How to use it
            //var sutMock = new Mock<IReleaseService>();
            //sutMock.Setup(x => x.GetTodayReleaseNote()).Returns(new List<ReleaseNoteModel>());
            //builder.RegisterInstance(sutMock.Object).As<IReleaseService>();
            //builder.RegisterGeneric(typeof(TInt)).As<TInt>();
            builder.RegisterType<T>().As<TInt>().InstancePerDependency();

            //reset service locator
            var newContainer = builder.Build();
            CoreServiceLocator.SetServiceLocator(() => new AutofacServiceLocator(newContainer));
            return this;
        }

    }
}
