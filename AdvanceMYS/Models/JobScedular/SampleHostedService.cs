using AdvanceMYS.Models.Domain;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AdvanceMYS.Models.JobScedular
{
    public class SampleHostedService : IHostedService
    {
        private readonly ILogger<SampleHostedService> _logger;
        private readonly _Context db;

        public SampleHostedService(ILogger<SampleHostedService> logger, _Context db)
        {
            _logger = logger;
            this.db = db;
        }

        public async System.Threading.Tasks.Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Starting Hosted service");

            while (!cancellationToken.IsCancellationRequested)
            {
                _logger.LogInformation("Hosted service executing - {0}", DateTime.Now);
                await System.Threading.Tasks.Task.Delay(TimeSpan.FromSeconds(2), cancellationToken);
            }
        }

     

        public System.Threading.Tasks.Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Stopping Hosted service");
            return System.Threading.Tasks.Task.CompletedTask;
        }

    
    }
}
