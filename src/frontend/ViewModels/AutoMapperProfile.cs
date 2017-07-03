
using AutoMapper;
using Platform.Models;

namespace ReleaseCaptainRandomiser.ViewModels
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
