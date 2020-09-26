using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class Kharj
    {
        public int KharjId { get; set; }
        public string Name { get; set; }
        public int? Rial { get; set; }
        public string Description { get; set; }
        public string DateKharj { get; set; }
        public int? KharjTypeId { get; set; }

        public virtual KharjType KharjType { get; set; }
    }
}
