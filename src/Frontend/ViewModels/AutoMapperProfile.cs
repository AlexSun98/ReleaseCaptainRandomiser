
using AutoMapper;
using DevPlus.Models;

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
