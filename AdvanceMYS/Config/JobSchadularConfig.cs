using AdvanceMYS.Models.JobScedular;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdvanceMYS.Config
{
    public static class JobSchadularConfig
    {
        //public  IConfiguration Configuration { get; }

        //public JobSchadularConfig(IConfiguration configuration)
        //{
        //    Configuration = configuration;
        //}
        public static IServiceCollection AddJJobSchadularConfig(this IServiceCollection services)
        {
            //https://www.hostinger.com/tutorials/cron-job
            //https://en.wikipedia.org/wiki/Cron#CRON_expression

            services.AddScoped<IMyScopedService, MyScopedService>();

            services.AddCronJob<JobDictionary>(c =>
            {
                c.TimeZoneInfo = TimeZoneInfo.Local;
                c.CronExpression = @"0 8,12,14,18,20,21 * * *";
            });
            // 0 6,18 * * * /bin/sh backup.sh	To perform a database backup twice a day at 6 AM and 6 PM.
            services.AddCronJob<JobTask>(c =>
            {
                c.TimeZoneInfo = TimeZoneInfo.Local;
               // c.CronExpression = @"44 9 * * *";
                 c.CronExpression = @"0 8,11,14,17,20,22 * * *";
            });
            //services.AddCronJob<MyCronJob3>(c =>
            //{
            //    c.TimeZoneInfo = TimeZoneInfo.Local;
            //    c.CronExpression = @"50 12 * * *";
            //});

            return services;
        }
        public static IServiceCollection AddDbContextConfig(this IServiceCollection services, IConfiguration Configuration)
        {
            string IpAddress = Models.Utility.Utility.GetIPAddress();
            //192.168.1.105    home
            if (IpAddress == "172.31.195.125")
            {
                services.AddDbContext<Models.Domain._Context>(options =>
        options.UseSqlServer(
            Configuration.GetConnectionString("MYS_ConnectionJob")));
                Models.Connection.Connection._ConnectionString = Configuration.GetConnectionString("MYS_ConnectionJob");
            }
            else
            {
                services.AddDbContext<Models.Domain._Context>(options =>
            options.UseSqlServer(
                Configuration.GetConnectionString("MYS_Connection")));
                Models.Connection.Connection._ConnectionString = Configuration.GetConnectionString("MYS_Connection");
            }
            return services;
        }
    }
}
