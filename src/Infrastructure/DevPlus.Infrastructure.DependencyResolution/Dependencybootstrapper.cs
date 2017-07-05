using Autofac;
using Autofac.Core;
//using DevPlus.Domain;
using DevPlus.Infrastructure.DependencyResolution.AutofacConfiguration;
using System;
using System.Collections.Generic;
using System.Text;


namespace DevPlus.Infrastructure.DependencyResolution
{
    public class DependencyBootstrapper
    {

        internal void RegisterAllDependenciesOnStartup()
        {      
            ConfigureAutofac();
        }
        private void ConfigureAutofac()
        {
            // Perform registrations and build the container.
            var builder = new ContainerBuilder();
            builder.RegisterModule(new DevPlusModule());
            var container = builder.Build();

            //var csl = new AutofacServiceLocator(container);
            //ServiceLocator.SetLocatorProvider(() => csl);

            //CoreServiceLocator.SetServiceLocator(() => new AutofacServiceLocator(container));
        }

    }
}
