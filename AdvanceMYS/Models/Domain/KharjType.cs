using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class KharjType
    {
        public KharjType()
        {
            Kharjs = new HashSet<Kharj>();
        }

        public int KharjTypeId { get; set; }
        public string Name { get; set; }
        public int? UserId { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Kharj> Kharjs { get; set; }
    }
}
