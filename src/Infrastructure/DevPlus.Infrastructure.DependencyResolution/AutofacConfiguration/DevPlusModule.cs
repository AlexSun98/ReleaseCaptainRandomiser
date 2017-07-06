using Autofac;
using DevPlus.Infrastructure.Hangfire;
using DevPlus.Repositories.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Text;

namespace DevPlus.Infrastructure.DependencyResolution.AutofacConfiguration
{
    public class DevPlusModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().InstancePerLifetimeScope();

            builder.RegisterType<DatabaseInitializer>().As<IDatabaseInitializer>().InstancePerDependency();

            builder.RegisterType<HangfireJobManager>().As<IHangfireJobManager>().SingleInstance();
        }
    }
}
