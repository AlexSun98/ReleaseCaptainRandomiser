namespace DevPlus.Domain.Interfaces
{
    public interface IAutoMapper
    {
        TDestination Map<TSource, TDestination>(TSource source);

        object Map<TSource, TDestination>(TSource source, TDestination destination);
    }
}
