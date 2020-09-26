using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class MojoodyBank
    {
        public MojoodyBank()
        {
            Daramads = new HashSet<Daramad>();
        }

        public int MojoodyBankId { get; set; }
        public string MojoodyName { get; set; }
        public int? UserId { get; set; }
        public int? Rial { get; set; }

        public virtual ICollection<Daramad> Daramads { get; set; }
    }
}
