using System;
using System.Collections.Generic;

#nullable disable

namespace DomainClass.DomainClass
{
    public partial class SliderPhoto
    {
        public int SliderPhotoId { get; set; }
        public byte[] PhotoImg { get; set; }
        public string Header { get; set; }
        public string Matn { get; set; }
        public string Url { get; set; }
    }
}
