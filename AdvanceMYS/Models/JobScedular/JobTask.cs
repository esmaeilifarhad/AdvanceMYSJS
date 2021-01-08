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
    public class JobTask : CronJobService
    {
        private readonly ILogger<JobTask> _logger;
        private readonly IServiceProvider _serviceProvider;
        private readonly IServiceScopeFactory scopeFactory;

        public JobTask(IScheduleConfig<JobTask> config, ILogger<JobTask> logger, IServiceProvider serviceProvider, IServiceScopeFactory scopeFactory)
            : base(config.CronExpression, config.TimeZoneInfo)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
            this.scopeFactory = scopeFactory;
        }

        public override System.Threading.Tasks.Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("CronJob 2 starts.");
            return base.StartAsync(cancellationToken);
        }

        public override async System.Threading.Tasks.Task DoWork(CancellationToken cancellationToken)
        {
            using (var scope2 = scopeFactory.CreateScope())
            {
                var dbContext = scope2.ServiceProvider.GetRequiredService<_Context>();
                Models.Services.Service s = new Services.Service(dbContext);
                s.SendTaskEmail();
            }

            _logger.LogInformation($"{DateTime.Now:hh:mm:ss} CronJob 2 is working.");
            using var scope = _serviceProvider.CreateScope();
            var svc = scope.ServiceProvider.GetRequiredService<IMyScopedService>();
            await svc.DoWork(cancellationToken);
        }

        public override System.Threading.Tasks.Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("CronJob 2 is stopping.");
            return base.StopAsync(cancellationToken);
        }
    }
}
