using AutoMapper;
using DevPlus.Domain.Interfaces;

namespace Maple.Infrastructure.DependencyResolution.Mapping
{
    public class AutoMapperWrapper : IAutoMapper
    {
        public TDestination Map<TSource, TDestination>(TSource source)
        {
            return Mapper.Map<TSource, TDestination>(source);
        }

        public object Map<TSource, TDestination>(TSource source, TDestination destination)
        {
            return Mapper.Map<TSource, TDestination>(source, destination);
        }
    }
}
