using Autofac;
using DevPlus.Domain.Interfaces.DomainServices;
using DevPlus.Domain.Services.ReleaseManagement;
using DevPlus.Infrastructure.Hangfire;
using DevPlus.Repositories;
using DevPlus.Repositories.Interfaces;
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
            //Unit of work
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().InstancePerLifetimeScope(); //InstancePerLifetimeScope is the default one

            //Database 
            builder.RegisterType<DatabaseInitializer>().As<IDatabaseInitializer>().InstancePerDependency();
            builder.RegisterType<DevPlusDbContext>().As<DevPlusDbContext>().InstancePerDependency();

            builder.RegisterType<HangfireJobManager>().As<IHangfireJobManager>().SingleInstance();

            //Services
            builder.RegisterType<ReleaseService>().As<IReleaseService>().InstancePerLifetimeScope();

            //Repositories
            builder.RegisterType<ReleaseNoteRepository>().As<IReleaseNoteRepository>();
            builder.RegisterType<ReleaseCaptainRepository>().As<IReleaseCaptainRepository>();
        }
    }
}
