using System;
using System.Collections.Generic;

#nullable disable

namespace DomainClass.DomainClass
{
    public partial class Cat
    {
        public Cat()
        {
            Sports = new HashSet<Sport>();
            Tasks = new HashSet<Task>();
        }

        public int CatId { get; set; }
        public string Title { get; set; }
        public int Code { get; set; }
        public string Dsc { get; set; }
        public int? UserId { get; set; }
        public int? Order { get; set; }

        public virtual ICollection<Sport> Sports { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }
    }
}
