
using AutoMapper;
using DevPlus.Repositories.Entities;

namespace DevPlus.Website.ViewModels
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ReleaseCaptain, ReleaseCaptainViewModel>()
                .ReverseMap();
        }
    }
}
