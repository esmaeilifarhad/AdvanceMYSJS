using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class Setting
    {
        public int SettingId { get; set; }
        public string Name { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public string Description { get; set; }
        public int? UserId { get; set; }
        public byte[] RowVersion { get; set; }
    }
}
