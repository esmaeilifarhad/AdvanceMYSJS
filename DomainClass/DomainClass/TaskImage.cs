using System;
using System.Collections.Generic;

#nullable disable

namespace DomainClass.DomainClass
{
    public partial class TaskImage
    {
        public int TaskImageId { get; set; }
        public string Name { get; set; }
        public byte[] Img { get; set; }
        public int? TaskId { get; set; }

        public virtual Task Task { get; set; }
    }
}
