using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdvanceMYS.Config;
using AdvanceMYS.Models.JobScedular;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace AdvanceMYS
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddAuthentication("CookieAuth").
            //    AddCookie("CookieAuth",confg=> 
            //    {
            //        confg.Cookie.Name = "MYS.Cookie";
            //        confg.LoginPath = "/Account/Authenticate";
            //        confg.AccessDeniedPath = "/Account/AccessDeny";
            //    });
            services.AddControllersWithViews();
            services.AddDbContextConfig(Configuration);
            /*
            string IpAddress= Models.Utility.Utility.GetIPAddress();
            //192.168.1.105    home
            if (IpAddress == "172.31.195.125" )
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
            */
            services.AddRazorPages().AddRazorRuntimeCompilation();
           
            //for return json
            services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

            //services.AddHostedService<MyHostedService>();
            services.AddJJobSchadularConfig();




        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            //it must before UseRouting

            //who are u?
            app.UseAuthentication();

            //are u allowed?
            app.UseAuthorization();

        

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=manageyourself}/{action=Index}/{id?}");
            });
        }
    }
}
