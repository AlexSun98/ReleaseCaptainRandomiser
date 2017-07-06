using System;


namespace DevPlus.Repositories.Entities
{
    public class ReleaseCaptain
    {
        public int ReleaseCaptainId { get; set; }
        public string Name { get; set; }
        public DateTime? LastCaptaincyDate { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
