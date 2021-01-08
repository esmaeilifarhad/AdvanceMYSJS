using DomainClass.DomainClass;
using System;
using System.Collections.Generic;

#nullable disable

namespace DomainClass.DomainClass
{
    public partial class TitleTbl
    {
  
        public int? BookId { get; set; }
        public string Title { get; set; }
        public int TitleId { get; set; }
        public string Order { get; set; }

        public virtual Book Book { get; set; }
        public virtual ICollection<ContentTbl> ContentTbls { get; set; }
    }
}
