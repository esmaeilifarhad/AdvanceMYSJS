using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AdvanceMYS.Models.JobScedular
{
    //public class PrinterHostedService : BackgroundService
    //{
    //    private readonly ILogger<SampleHostedService> _logger;

    //    public PrinterHostedService(ILogger<SampleHostedService> logger)
    //    {
    //        _logger = logger;
    //    }

    //    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    //    {
    //        _logger.LogInformation("Starting Hosted service");

    //        while (!stoppingToken.IsCancellationRequested)
    //        {
    //            _logger.LogInformation("Hosted service executing - {0}", DateTime.Now);
    //            await Task.Delay(TimeSpan.FromSeconds(2), stoppingToken);
    //        }
    //    }
    //}
}
