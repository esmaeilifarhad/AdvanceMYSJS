using AdvanceMYS.Models.Domain;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AdvanceMYS.Models.JobScedular
{
    public class JobDictionary : CronJobService
    {
        private readonly ILogger<JobDictionary> _logger;
        private readonly IServiceScopeFactory scopeFactory;

        public JobDictionary(IScheduleConfig<JobDictionary> config, ILogger<JobDictionary> logger, IServiceScopeFactory scopeFactory)
            : base(config.CronExpression, config.TimeZoneInfo)
        {
            _logger = logger;
            this.scopeFactory = scopeFactory;
        }

        public override System.Threading.Tasks.Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("CronJob 1 starts.");
            return base.StartAsync(cancellationToken);
        }

        public override  System.Threading.Tasks.Task DoWork(CancellationToken cancellationToken)
        {
            using (var scope = scopeFactory.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<_Context>();
                Models.Services.Service s = new Services.Service(dbContext);
                s.SendDictonaryEmail();
            }

            _logger.LogInformation($"{DateTime.Now:hh:mm:ss} CronJob 1 is working.");
            return System.Threading.Tasks.Task.CompletedTask;
        }

        public override System.Threading.Tasks.Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("CronJob 1 is stopping.");
            return base.StopAsync(cancellationToken);
        }
    }
}

