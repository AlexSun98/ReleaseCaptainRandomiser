using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;
using Hangfire;
using System.Threading.Tasks;

namespace DevPlus.Infrastructure.Hangfire
{
    public interface IHangfireInitializer
    {
        Task SeedAsync();
    }

    public class HangfireInitializer
    {
        private const int dbIndex = 0;
        public IConfigurationRoot Configuration { get; }
     
        public static bool Initalised { get; private set; }

        //public HangfireInitializer GetInstance()
        //{
        //    string redisConnection = Configuration["Data:DefaultConnection:redisConnection"];

        //    if (!Initalised)
        //    {
        //        throw new Exception("Hangfire has not been Initalised! Call Initalise");
        //    }
        //    return _instance;
        //}


        //.net core hsa its own middleware bridge. might give it a try later on
        //public static void Initalise(IAppBuilder app, string deliverySystemName, DashboardOptions dashboardOptions = null, BackgroundJobServerOptions backgroundJobServerOptions = null)
        //{
        //    if (!Initalised)
        //    {
        //        _instance = new HangfireRedis();
        //        int poolSize = 50;
        //        var poolConfig = ConfigurationManager.AppSettings["redisConnectionPoolSize"];
        //        if (poolConfig != null)
        //        {
        //            int result;
        //            var success = int.TryParse(poolConfig, out result);
        //            if (success)
        //            {
        //                poolSize = result;
        //            }
        //        }
        //        var options = new RedisStorageOptions
        //        {
        //            Prefix = deliverySystemName,
        //            ConnectionPoolSize = poolSize
        //        };

        //        //replace with load balancer url
        //        GlobalConfiguration.Configuration.UseRedisStorage(redisConnection, dbIndex, options);

        //        if (dashboardOptions != null)
        //        {
        //            app.UseHangfireDashboard("/hfqueues", dashboardOptions);
        //        }
        //        else
        //        {
        //            app.UseHangfireDashboard("/hfqueues");
        //        }

        //        if (backgroundJobServerOptions != null)
        //        {
        //            app.UseHangfireServer(backgroundJobServerOptions);
        //        }
        //        else
        //        {
        //            app.UseHangfireServer();
        //        }

        //        Initalised = true;
        //    }
        //}
    }
}
