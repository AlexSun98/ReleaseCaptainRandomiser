using AutoMapper;
using DevPlus.Domain.Models;
using DevPlus.Repositories.Entities;

namespace DevPlus.Infrastructure.DependencyResolution.Mapping.Profiles
{
    /// <summary>
    /// mapping between Business and DB layer objects
    /// </summary>
    public class BlMappingProfile : Profile
    {

        public BlMappingProfile()
        {
            MappingProfile();
        }

        private void MappingProfile()
        {
            CreateMap<ReleaseNoteModel, ReleaseNote>();
            CreateMap<ReleaseCaptainModel, ReleaseCaptain>();
        }
    }
}