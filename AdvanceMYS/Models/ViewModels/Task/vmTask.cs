using AdvanceMYS.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdvanceMYS.Models.ViewModels.Task
{
    public class vmTask:DomainClass.DomainClass.Task
    {
        public List<DomainClass.DomainClass.Cat> lstCat { get; set; }
        public DomainClass.DomainClass.Task Task { get; set; }
        public List<DomainClass.DomainClass.ManageTime> lstManageTime { get; set; }
        public int Minute { get; set; }
        public int Hour { get; set; }
        public DomainClass.DomainClass.Timing Timing { get; set; }

        public int TimingId { get; set; }
        public int ManageTimeId { get; set; }
        public string Label { get; set; }
        public int Value { get; set; }
        public bool IsTime { get; set; }
        public string Title { get; set; }
    }
    public class vmTaskList {
        public List<vmTask> lstvmTask { get; set; }
        public List<vmTask> lstvmTask2 { get; set; }
   
    }
}
