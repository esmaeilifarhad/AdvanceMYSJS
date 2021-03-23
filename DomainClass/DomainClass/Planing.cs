using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DomainClass.DomainClass
{
   public class Planing
    {
        public int PlaningId { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public int Order { get; set; }
        public int JobId { get; set; }
        public virtual Job Job { get; set; }
    }
}
