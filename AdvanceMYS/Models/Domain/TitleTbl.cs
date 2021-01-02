using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class TitleTbl
    {
        public TitleTbl()
        {
            ContentTbls = new HashSet<ContentTbl>();
        }

        public int? BookId { get; set; }
        public string Title { get; set; }
        public int TitleId { get; set; }
        public string Order { get; set; }

        public virtual Book Book { get; set; }
        public virtual ICollection<ContentTbl> ContentTbls { get; set; }
    }
}
