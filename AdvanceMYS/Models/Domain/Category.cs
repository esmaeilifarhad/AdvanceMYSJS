using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class Category
    {
        public Category()
        {
            Jobs = new HashSet<Job>();
        }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int? UserId { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Job> Jobs { get; set; }
    }
}
