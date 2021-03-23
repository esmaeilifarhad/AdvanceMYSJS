using System;
using System.Collections.Generic;

#nullable disable

namespace DomainClass.DomainClass
{
    public partial class Job
    {
        public Job()
        {
            KarKards = new HashSet<KarKard>();
            PercentJobs = new HashSet<PercentJob>();
        }

        public int JobId { get; set; }
        public string Name { get; set; }
        public int? CategoryId { get; set; }
        public bool? GridShow { get; set; }
        public bool Mohasebe { get; set; }

        public virtual Category Category { get; set; }
        public virtual ICollection<KarKard> KarKards { get; set; }
        public virtual ICollection<PercentJob> PercentJobs { get; set; }
        public virtual  ICollection<Subject> Subjects { get; set; }
        public virtual ICollection<Planing> Planing { get; set; }
    }
}
