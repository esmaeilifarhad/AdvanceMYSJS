using System;
using System.Collections.Generic;

#nullable disable

namespace DomainClass.DomainClass
{
    public partial class Menu
    {
        public int MenuId { get; set; }
        public string MenuName { get; set; }
        public int? Order { get; set; }
        public bool? IsCascade { get; set; }
        public string Url { get; set; }
        public string Controller { get; set; }
        public string Action { get; set; }
    }
}
