using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class PercentJob
    {
        public int PercentId { get; set; }
        public int JobId { get; set; }
        public int PercentValue { get; set; }
        public string Date { get; set; }

        public virtual Job Job { get; set; }
    }
}
