using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace AdvanceMYS.Controllers
{
    public class QueryController : Controller
    {
        public List<object>  Select(string query)
        {
            List<object> lst = new List<object>();
          
            using (IDbConnection DB = new SqlConnection(Models.Connection.Connection._ConnectionString))
            {

                lst = DB.Query<object>(query).ToList();
            }

            return lst;
        }
    }
}
