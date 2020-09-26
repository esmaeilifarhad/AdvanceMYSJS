using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class ContentTbl
    {
        public int ContentId { get; set; }
        public int? TitleId { get; set; }
        public string Content { get; set; }
        public string Order { get; set; }

        public virtual TitleTbl Title { get; set; }
    }
}
