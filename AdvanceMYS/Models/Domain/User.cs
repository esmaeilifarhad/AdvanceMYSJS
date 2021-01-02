using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class User
    {
        public User()
        {
            Books = new HashSet<Book>();
            Categories = new HashSet<Category>();
            DicTbls = new HashSet<DicTbl>();
           
            PlayerScores = new HashSet<PlayerScore>();
            RoutineJobs = new HashSet<RoutineJob>();
            Tasks = new HashSet<Task>();
            UserRoles = new HashSet<UserRole>();
        }

        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }

        public virtual ICollection<Book> Books { get; set; }
        public virtual ICollection<Category> Categories { get; set; }
        public virtual ICollection<DicTbl> DicTbls { get; set; }
       
        public virtual ICollection<PlayerScore> PlayerScores { get; set; }
        public virtual ICollection<RoutineJob> RoutineJobs { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
