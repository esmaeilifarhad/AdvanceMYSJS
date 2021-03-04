using DomainClass.DomainClass;
using Microsoft.EntityFrameworkCore;


namespace DataAccess.Context
{
    public  class dbContext:DbContext
    {
        public dbContext(DbContextOptions<dbContext> options) : base(options)
        {

        }

        #region DbSet
        public virtual DbSet<Book> Books { get; set; }
        public virtual DbSet<Cat> Cats { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<ContentTbl> ContentTbls { get; set; }
        public virtual DbSet<DaysExercise> DaysExercises { get; set; }
        public virtual DbSet<DicTbl> DicTbls { get; set; }

        public virtual DbSet<ExampleTbl> ExampleTbls { get; set; }

        public virtual DbSet<Iodayly> Iodaylies { get; set; }
        public virtual DbSet<Job> Jobs { get; set; }
        public virtual DbSet<Note> Note { get; set; }

        public virtual DbSet<Subject> Subject { get; set; }
        public virtual DbSet<KarKard> KarKards { get; set; }

        public virtual DbSet<LogTbl> LogTbls { get; set; }
        public virtual DbSet<ManageTime> ManageTimes { get; set; }
        public virtual DbSet<MasterDatum> MasterData { get; set; }

        public virtual DbSet<Menu> Menus { get; set; }
        public virtual DbSet<Menuha> Menuhas { get; set; }
        public virtual DbSet<MvchomeHeaderThree> MvchomeHeaderThrees { get; set; }
        public virtual DbSet<Namad> Namads { get; set; }
        public virtual DbSet<NamadDetail> NamadDetails { get; set; }
        public virtual DbSet<PercentJob> PercentJobs { get; set; }
        public virtual DbSet<Player> Players { get; set; }
        public virtual DbSet<PlayerScore> PlayerScores { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<RoutineJob> RoutineJobs { get; set; }
        public virtual DbSet<RoutineJobHa> RoutineJobHas { get; set; }
        public virtual DbSet<Setting> Settings { get; set; }
        public virtual DbSet<Taghvim> Taghvim { get; set; }

        public virtual DbSet<ShowLastPercantageJob> ShowLastPercantageJobs { get; set; }
        public virtual DbSet<ShowSumLastPercantage> ShowSumLastPercantages { get; set; }
        public virtual DbSet<SliderPhoto> SliderPhotos { get; set; }
        public virtual DbSet<Sport> Sports { get; set; }

        public virtual DbSet<Task> Tasks { get; set; }
        public virtual DbSet<TaskImage> TaskImages { get; set; }
        public virtual DbSet<Timing> Timings { get; set; }
        public virtual DbSet<TitleTbl> TitleTbls { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserRole> UserRoles { get; set; }
        #endregion

        //        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //        {
        //            if (!optionsBuilder.IsConfigured)
        //            {
        //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        //                optionsBuilder.UseSqlServer("Server=.;Database=5069_ManageYourSelf;Trusted_Connection=True;");
        //            }
        //        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {



            #region FluentAPI
            modelBuilder.Entity<Book>(entity =>
            {
                entity.ToTable("Book", "5069_Esmaeili");

                entity.Property(e => e.Date)
                    .HasMaxLength(250)
                    .HasColumnName("date");

                entity.Property(e => e.Dsc).HasColumnName("dsc");

                entity.Property(e => e.Order)
                    .HasMaxLength(10)
                    .IsFixedLength(true);

                entity.Property(e => e.Time)
                    .HasMaxLength(250)
                    .HasColumnName("time");

                entity.Property(e => e.Title).HasMaxLength(250);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Books)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Book_Users");
            });

            modelBuilder.Entity<Cat>(entity =>
            {
                entity.ToTable("Cat", "5069_Esmaeili");

                entity.Property(e => e.Dsc).HasMaxLength(250);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(250);

            });

            modelBuilder.Entity<Taghvim>(entity =>
            {
                entity.ToTable("Taghvim", "5069_Esmaeili");


            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category", "5069_Esmaeili");

                entity.Property(e => e.CategoryName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Categories)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Category_Users");
            });

            modelBuilder.Entity<ContentTbl>(entity =>
            {
                entity.HasKey(e => e.ContentId);

                entity.ToTable("ContentTbl", "5069_Esmaeili");

                entity.Property(e => e.Order)
                    .HasMaxLength(10)
                    .HasColumnName("order")
                    .IsFixedLength(true);

                entity.HasOne(d => d.Title)
                    .WithMany(p => p.ContentTbls)
                    .HasForeignKey(d => d.TitleId)
                    .HasConstraintName("FK_ContentTbl_TitleTbl");
            });





            modelBuilder.Entity<DaysExercise>(entity =>
            {
                entity.ToTable("DaysExercise", "5069_Esmaeili");

                entity.Property(e => e.DateExercise).HasMaxLength(10);

                entity.Property(e => e.SuccOrUnSucc).HasColumnName("Succ_OR_UnSucc");

                entity.HasOne(d => d.Word)
                    .WithMany(p => p.DaysExercises)
                    .HasForeignKey(d => d.WordId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_DaysExercise_dic_tbl");
            });

            modelBuilder.Entity<DicTbl>(entity =>
            {
                entity.ToTable("dic_tbl", "5069_Esmaeili");

                entity.HasIndex(e => new { e.Eng, e.UserId }, "IX_dic_tbl")
                    .IsUnique();

                entity.HasIndex(e => e.Level, "IX_dic_tbl_1");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreateDateM)
                    .HasColumnType("date")
                    .HasAnnotation("Relational:ColumnType", "date");

                entity.Property(e => e.DateRefresh)
                    .HasMaxLength(50)
                    .HasColumnName("date_refresh");

                entity.Property(e => e.DateRefreshM)
                    .HasColumnType("date")
                    .HasAnnotation("Relational:ColumnType", "date");

                entity.Property(e => e.DateS)
                    .HasMaxLength(50)
                    .HasColumnName("date_s");

                entity.Property(e => e.Eng)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("eng");

                entity.Property(e => e.IdMonth).HasColumnName("id_month");

                entity.Property(e => e.IsArchieve).HasDefaultValueSql("((0))");

                entity.Property(e => e.Level).HasColumnName("level");

                entity.Property(e => e.Per)
                    .HasMaxLength(255)
                    .HasColumnName("per");

                entity.Property(e => e.Phonetic).HasMaxLength(70);

                entity.Property(e => e.Time)
                    .HasMaxLength(50)
                    .HasColumnName("time");

                entity.Property(e => e.Timeword)
                    .HasColumnName("timeword")
                    .HasDefaultValueSql("((0))");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.DicTbls)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_dic_tbl_Users");
            });



            modelBuilder.Entity<ExampleTbl>(entity =>
            {
                entity.ToTable("example_tbl", "5069_Esmaeili");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Example)
                    .IsRequired()
                    .HasColumnName("example");

                entity.Property(e => e.IdDicTbl).HasColumnName("id_dic_tbl");

                //entity.HasOne(d => d.IdDicTblNavigation)
                //    .WithMany(p => p.ExampleTbls)
                //    .HasForeignKey(d => d.IdDicTbl)
                //    .HasConstraintName("FK_example_tbl_dic_tbl");
            });




            modelBuilder.Entity<Iodayly>(entity =>
            {
                entity.HasKey(e => e.Ioid);

                entity.ToTable("IODayly", "5069_Esmaeili");

                entity.HasIndex(e => new { e.DayDate, e.Iotype }, "IX_IODayly")
                    .IsUnique();

                entity.Property(e => e.Ioid).HasColumnName("IOId");

                entity.Property(e => e.DayDate)
                    .IsRequired()
                    .HasMaxLength(6);

                entity.Property(e => e.Etime).HasColumnName("ETime");

                entity.Property(e => e.Iotype).HasColumnName("IOType");

                entity.Property(e => e.Stime).HasColumnName("STime");
            });

            modelBuilder.Entity<Job>(entity =>
            {
                entity.ToTable("Job", "5069_Esmaeili");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Jobs)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Job_Category");
            });
            modelBuilder.Entity<Note>(entity =>
            {
                entity.ToTable("Note", "5069_Esmaeili");
                entity.Property(e => e.Description).IsRequired();
                entity.Property(e => e.DateRefresh).HasMaxLength(8).IsRequired();
                entity.Property(e => e.DateCreated).HasMaxLength(8).IsRequired();
                // entity.HasOne(x => x.Job).WithMany(x => x.Notes).HasForeignKey(x => x.JobId);
                entity.HasOne(e => e.Subject).WithMany(e => e.Note).HasForeignKey(e => e.SubjectId);
            }
            );
            modelBuilder.Entity<Subject>(e => {
                e.ToTable("Subject", "5069_Esmaeili");
                e.Property(e => e.Title).IsRequired();
                e.HasOne(e => e.Job).WithMany(e => e.Subjects).HasForeignKey(e => e.JobId);
            });
            modelBuilder.Entity<KarKard>(entity =>
            {
                entity.ToTable("KarKard", "5069_Esmaeili");

                entity.Property(e => e.DayDate)
                    .IsRequired()
                    .HasMaxLength(8);

                entity.Property(e => e.MiladyDate)
                    .HasColumnType("datetime")
                    .HasAnnotation("Relational:ColumnType", "datetime");

                entity.HasOne(d => d.Job)
                    .WithMany(p => p.KarKards)
                    .HasForeignKey(d => d.JobId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_KarKard_Job");
            });



            modelBuilder.Entity<LogTbl>(entity =>
            {
                entity.HasKey(e => e.LogId);

                entity.ToTable("LogTBL", "5069_Esmaeili");

                entity.Property(e => e.Date)
                    .HasMaxLength(8)
                    .HasColumnName("date");

                entity.Property(e => e.Dsc)
                    .HasMaxLength(250)
                    .HasColumnName("dsc");

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.Time).HasMaxLength(50);
            });

            modelBuilder.Entity<ManageTime>(entity =>
            {
                entity.ToTable("ManageTime", "5069_Esmaeili");

                entity.Property(e => e.Label)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<MasterDatum>(entity =>
            {
                entity.ToTable("MasterDatum", "5069_Esmaeili");
                entity.HasKey(e => e.MasterDataId)
                    .HasName("PK_Weight");

                entity.Property(e => e.PersonelName).HasMaxLength(250);

                entity.Property(e => e.WeightDate).HasMaxLength(6);
            });



            modelBuilder.Entity<Menu>(entity =>
            {
                entity.ToTable("Menu", "5069_Esmaeili");

                entity.Property(e => e.Action).HasMaxLength(50);

                entity.Property(e => e.Controller).HasMaxLength(50);

                entity.Property(e => e.MenuName)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.Url).HasMaxLength(50);
            });

            modelBuilder.Entity<Menuha>(entity =>
            {
                entity.ToTable("Menuha", "5069_Esmaeili");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(250);
            });



            modelBuilder.Entity<MvchomeHeaderThree>(entity =>
            {
                entity.ToTable("MVCHomeHeaderThree", "5069_Esmaeili");

                entity.Property(e => e.MvchomeHeaderThreeId).HasColumnName("MVCHomeHeaderThreeId");

                entity.Property(e => e.Header).IsRequired();

                entity.Property(e => e.Matn).IsRequired();
            });

            modelBuilder.Entity<Namad>(entity =>
            {
                entity.ToTable("Namad", "5069_Esmaeili");

                entity.Property(e => e.CodeSherkat)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.Namad1)
                    .IsRequired()
                    .HasMaxLength(250)
                    .HasColumnName("Namad");

                entity.Property(e => e.NamadSahih).HasMaxLength(250);

                entity.Property(e => e.TseAdrs)
                    .HasMaxLength(500)
                    .HasColumnName("tseAdrs");

                entity.Property(e => e.TseId)
                    .HasMaxLength(250)
                    .HasColumnName("tseId");
            });

            modelBuilder.Entity<NamadDetail>(entity =>
            {
                entity.ToTable("NamadDetail", "5069_Esmaeili");

                entity.Property(e => e.ShamsyDate).HasMaxLength(16);

                entity.HasOne(d => d.Namad)
                    .WithMany(p => p.NamadDetails)
                    .HasForeignKey(d => d.NamadId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_NamadDetail_Namad");
            });

            modelBuilder.Entity<PercentJob>(entity =>
            {
                entity.HasKey(e => e.PercentId);

                entity.ToTable("PercentJob", "5069_Esmaeili");

                entity.Property(e => e.Date)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.HasOne(d => d.Job)
                    .WithMany(p => p.PercentJobs)
                    .HasForeignKey(d => d.JobId)
                    .HasConstraintName("FK_PercentJob_Job");
            });

            modelBuilder.Entity<Player>(entity =>
            {
                entity.ToTable("Player", "5069_Esmaeili");
                entity.HasKey(e => e.PlayersId);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<PlayerScore>(entity =>
            {
                entity.ToTable("PlayerScore", "5069_Esmaeili");

                entity.HasOne(d => d.Player)
                    .WithMany(p => p.PlayerScores)
                    .HasForeignKey(d => d.PlayerId)
                    .HasConstraintName("FK_PlayerScore_Players");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.PlayerScores)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_PlayerScore_Users");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role", "5069_Esmaeili");

                entity.Property(e => e.RoleName)
                    .IsRequired()
                    .HasMaxLength(150);
            });

            modelBuilder.Entity<RoutineJob>(entity =>
            {
                entity.ToTable("RoutineJob", "5069_Esmaeili");

                entity.Property(e => e.Job)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.RoozDaily).HasMaxLength(250);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.RoutineJobs)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_RoutineJob_Users");
            });

            modelBuilder.Entity<RoutineJobHa>(entity =>
            {
                entity.HasKey(e => e.RoutineJobHa1);

                entity.ToTable("RoutineJobHa", "5069_Esmaeili");

                entity.HasIndex(e => new { e.Date, e.RoutineJobId }, "IX_RoutineJobHa")
                    .IsUnique();

                entity.Property(e => e.RoutineJobHa1).HasColumnName("RoutineJobHa");

                entity.Property(e => e.Date)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.HasOne(d => d.RoutineJob)
                    .WithMany(p => p.RoutineJobHas)
                    .HasForeignKey(d => d.RoutineJobId)
                    .HasConstraintName("FK_RoutineJobHa_RoutineJob");
            });

            modelBuilder.Entity<Setting>(entity =>
            {
                entity.ToTable("Setting", "5069_Esmaeili");

                entity.Property(e => e.Description).HasMaxLength(250);

                entity.Property(e => e.Key).HasMaxLength(50);

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("name");

                entity.Property(e => e.RowVersion)
                    .IsRowVersion()
                    .IsConcurrencyToken();

                entity.Property(e => e.Value).HasMaxLength(250);
            });



            modelBuilder.Entity<ShowLastPercantageJob>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("ShowLastPercantageJob");

                entity.Property(e => e.Jobid).HasColumnName("jobid");

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.Percentvalue).HasColumnName("percentvalue");
            });

            modelBuilder.Entity<ShowSumLastPercantage>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("ShowSumLastPercantage");
            });

            modelBuilder.Entity<SliderPhoto>(entity =>
            {
                entity.ToTable("SliderPhoto", "5069_Esmaeili");

                entity.Property(e => e.Header).HasMaxLength(250);

                entity.Property(e => e.PhotoImg)
                    .IsRequired()
                    .HasColumnType("image")
                    .HasAnnotation("Relational:ColumnType", "image");

                entity.Property(e => e.Url).HasColumnName("URL");
            });

            modelBuilder.Entity<Sport>(entity =>
            {
                entity.ToTable("Sport", "5069_Esmaeili");

                entity.Property(e => e.Date)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.HasOne(d => d.Cat)
                    .WithMany(p => p.Sports)
                    .HasForeignKey(d => d.CatId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Sport_Cat");
            });





            modelBuilder.Entity<Task>(entity =>
            {
                entity.ToTable("Task", "5069_Esmaeili");

                entity.Property(e => e.DateEnd)
                    .IsRequired()
                    .HasMaxLength(8);

                entity.Property(e => e.DateStart)
                    .IsRequired()
                    .HasMaxLength(8);

                entity.Property(e => e.Name).IsRequired();

                entity.HasOne(d => d.Cat)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.CatId)
                    .HasConstraintName("FK_Task_Cat");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Task_Users");
            });

            modelBuilder.Entity<TaskImage>(entity =>
            {
                entity.ToTable("TaskImage", "5069_Esmaeili");

                entity.Property(e => e.Img)
                    .HasColumnType("image")
                    .HasColumnName("img")
                    .HasAnnotation("Relational:ColumnType", "image");

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.HasOne(d => d.Task)
                    .WithMany(p => p.TaskImages)
                    .HasForeignKey(d => d.TaskId)
                    .HasConstraintName("FK_TaskImage_Task");
            });

            modelBuilder.Entity<Timing>(entity =>
            {
                entity.ToTable("Timing", "5069_Esmaeili");

                entity.HasOne(d => d.ManageTime)
                    .WithMany(p => p.Timings)
                    .HasForeignKey(d => d.ManageTimeId)
                    .HasConstraintName("FK_Timing_ManageTime");

                entity.HasOne(d => d.Task)
                    .WithMany(p => p.Timings)
                    .HasForeignKey(d => d.TaskId)
                    .HasConstraintName("FK_Timing_Task");
            });

            modelBuilder.Entity<TitleTbl>(entity =>
            {
                entity.HasKey(e => e.TitleId);

                entity.ToTable("TitleTbl", "5069_Esmaeili");

                entity.Property(e => e.Order)
                    .HasMaxLength(10)
                    .HasColumnName("order")
                    .IsFixedLength(true);

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.TitleTbls)
                    .HasForeignKey(d => d.BookId)
                    .HasConstraintName("FK_TitleTbl_Book");
            });



            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User", "5069_Esmaeili");

                entity.HasIndex(e => e.UserName, "IX_Users")
                    .IsUnique();

                entity.HasIndex(e => e.PhoneNumber, "IX_Users_1")
                    .IsUnique();

                entity.Property(e => e.Email).HasMaxLength(250);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.ToTable("UserRole", "5069_Esmaeili");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.UserRoles)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK_UserRole_Role");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserRoles)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_UserRole_Users");
            });
            #endregion
            //OnModelCreatingPartial(modelBuilder);
        }

        //void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }

}
