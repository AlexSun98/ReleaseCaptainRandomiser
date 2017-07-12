using Autofac;
using AutoMapper;
using DevPlus.Domain;
using DevPlus.Infrastructure.DependencyResolution.AutofacConfiguration;
using DevPlus.Infrastructure.DependencyResolution.Mapping.Profiles;
using Maple.Infrastructure.DependencyResolution.AutofacServiceLocator;
using Maple.Infrastructure.DependencyResolution.Mapping;

namespace DevPlus.Infrastructure.DependencyResolution
{
    public class DependencyBootstrapper
    {
        private static bool _dependenciesRegistered;
        private static readonly object sync = new object();

        internal void RegisterAllDependenciesOnStartup()
        {      
            ConfigureAutofac();
            ConfigureAutoMapper();
        }

        /// <summary>
        /// Perform registrations and build the container - http://docs.autofac.org/en/latest/integration/csl.html
        /// </summary>
        private void ConfigureAutofac()
        {
            var builder = new ContainerBuilder();
            builder.RegisterModule(new DevPlusModule());
            var container = builder.Build();
     
            CoreServiceLocator.SetServiceLocator(() => new AutofacServiceLocator(container));
        }

        internal void ConfigureAutoMapper()
        {
            MapperConfiguration config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new WebMappingProfile());  //mapping between Web and Business layer objects
                cfg.AddProfile(new BlMappingProfile());  // mapping between Business and DB layer objects
            });

            CoreAutoMapper.SetMapper(() => new AutoMapperWrapper());
        }

        public static void EnsureDependenciesRegistered()
        {
            if (!_dependenciesRegistered)
            {
                lock (sync)
                {
                    if (!_dependenciesRegistered)
                    {
                        new DependencyBootstrapper().RegisterAllDependenciesOnStartup();
                        _dependenciesRegistered = true;
                    }
                }
            }
        }
    }
}
