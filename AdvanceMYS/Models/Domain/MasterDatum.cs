using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class MasterDatum
    {
        public int MasterDataId { get; set; }
        public double? Weight { get; set; }
        public string WeightDate { get; set; }
        public int? Personelid { get; set; }
        public string PersonelName { get; set; }
        public int? Status { get; set; }
    }
}
