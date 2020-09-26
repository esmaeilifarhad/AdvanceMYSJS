using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class TypeHazineh
    {
        public TypeHazineh()
        {
            Daramads = new HashSet<Daramad>();
        }

        public int TypeHazinehId { get; set; }
        public string Name { get; set; }
        public bool DaramadOrKharj { get; set; }
        public int? UserId { get; set; }

        public virtual ICollection<Daramad> Daramads { get; set; }
    }
}
