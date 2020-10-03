using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdvanceMYS.Models.ViewModels.Task
{
    public class vmTask
    {
        public List<Models.Domain.Cat> lstCat { get; set; }
        public Models.Domain.Task Task { get; set; }
    }
}
