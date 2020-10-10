using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AdvanceMYS.Models.Domain
{
    public class Taghvim
    {
        [Key]
        public int TaghvimId { get; set; }
        public bool IsHolyDay { get; set; }
        public string Date { get; set; }
        public string Dsc { get; set; }

    }
}
