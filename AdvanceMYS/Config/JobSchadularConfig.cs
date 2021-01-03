using AdvanceMYS.Models.JobScedular;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdvanceMYS.Config
{
    public static class JobSchadularConfig
    {
        public static IServiceCollection AddJJobSchadularConfig(this IServiceCollection services)
        {
            //https://www.hostinger.com/tutorials/cron-job
            //https://en.wikipedia.org/wiki/Cron#CRON_expression

            services.AddScoped<IMyScopedService, MyScopedService>();

            services.AddCronJob<JobDictionary>(c =>
            {
                c.TimeZoneInfo = TimeZoneInfo.Local;
                c.CronExpression = @"* 8,12,14,18,20,21 * * *";
            });
            // 0 6,18 * * * /bin/sh backup.sh	To perform a database backup twice a day at 6 AM and 6 PM.
            services.AddCronJob<JobTask>(c =>
            {
                c.TimeZoneInfo = TimeZoneInfo.Local;
               // c.CronExpression = @"44 9 * * *";
                 c.CronExpression = @"* 8,11,14,17,20,22 * * *";
            });
            //services.AddCronJob<MyCronJob3>(c =>
            //{
            //    c.TimeZoneInfo = TimeZoneInfo.Local;
            //    c.CronExpression = @"50 12 * * *";
            //});

            return services;
        }
    }
}
