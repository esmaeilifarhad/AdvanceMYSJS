using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace AdvanceMYS.Models.JobScedular
{
    public class BackgroundJob:IHostedService,IDisposable
    {
        private readonly ILogger<BackgroundJob> logger;
        private int number = 0;
        private Timer timer;
        public BackgroundJob(ILogger<BackgroundJob> logger)
        {
            this.logger = logger;
        }

        public void Dispose()
        {
            timer?.Dispose();
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            timer = new Timer(o=>
            {
                Interlocked.Increment(ref number);
                logger.LogInformation($"printing from worker number: {number}");
            },
                null,
                TimeSpan.Zero,
                TimeSpan.FromSeconds(5));

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            logger.LogInformation("printing from worker stopping");
            return Task.CompletedTask;
        }
    }
}
