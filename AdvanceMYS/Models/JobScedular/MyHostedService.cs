using AdvanceMYS.Models.Domain;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AdvanceMYS.Models.JobScedular
{
    public class MyHostedService : IHostedService
    {
        private readonly IServiceScopeFactory scopeFactory;

        public MyHostedService(IServiceScopeFactory scopeFactory)
        {
            this.scopeFactory = scopeFactory;
        }

        public void DoWork()
        {
            using (var scope = scopeFactory.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<_Context>();
                Models.Services.Service s = new Services.Service(dbContext);
                s.SendDictonaryEmail();
            }
        }

        public async System.Threading.Tasks.Task StartAsync(CancellationToken cancellationToken)
        {


            while (!cancellationToken.IsCancellationRequested)
            {
                //DoWork();
                await System.Threading.Tasks.Task.Delay(new TimeSpan(14,30,0), cancellationToken);
               
            }
        }



        public System.Threading.Tasks.Task StopAsync(CancellationToken cancellationToken)
        {

            return System.Threading.Tasks.Task.CompletedTask;
        }
    }
}



