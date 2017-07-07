using AutoMapper;
using DevPlus.Domain.Models;
using DevPlus.Infrastructure.RestfulAPI.Jira.Domain;
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
            CreateMap<ReleaseNote, ReleaseNoteModel> ();
            CreateMap<ReleaseCaptain, ReleaseCaptainModel> ();

            //CreateMap<IssueFields, ReleaseNoteModel>()
            //  .ForMember(d => d., o => o.MapFrom(x => x.ChargeId))
            //  .ForMember(d => d.Invoices_InvoiceId, o => o.MapFrom(x => x.InvoiceId))
            //  //ignores
            //  .ForMember(d => d.Charge, o => o.Ignore())
            //  .ForMember(d => d.Invoice, o => o.Ignore())
            //  ;
        }
    }
}