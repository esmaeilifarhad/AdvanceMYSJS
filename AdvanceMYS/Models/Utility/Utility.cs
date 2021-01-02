using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace AdvanceMYS.Models.Utility
{
    public static class Utility
    {
       // string IPAddress = GetIPAddress();

        public static string GetIPAddress()
        {
            string IPAddress = "";
            IPHostEntry Host = default(IPHostEntry);
            string Hostname = null;
            Hostname = System.Environment.MachineName;
            Host = Dns.GetHostEntry(Hostname);
            foreach (IPAddress IP in Host.AddressList)
            {
                if (IP.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
                {
                    IPAddress = Convert.ToString(IP);
                }
            }
            return IPAddress;
        }
        public static string shamsi_date()
        {
            System.Globalization.PersianCalendar g;
            g = new System.Globalization.PersianCalendar();
            Int32 y, m, d;
            string yy, mm, dd;
            string rd;
            d = g.GetDayOfMonth(DateTime.Now);
            m = g.GetMonth(DateTime.Now);
            y = g.GetYear(DateTime.Now);
            yy = y.ToString();
            if (d < 10)
            {
                dd = "0" + d.ToString();
            }
            else
            {
                dd = d.ToString();
            }
            if (m < 10)
            {
                mm = "0" + m.ToString();
            }
            else
            {
                mm = m.ToString();
            }
            rd = yy + "/" + mm + "/" + dd;
            return rd;
            // return rd.Remove(0, 2);
        }
        public static string shamsi_dateTomarrow()
        {
            var today = DateTime.Now;
            var tomorrow = today.AddDays(1);
            var yesterday = today.AddDays(-1);

            System.Globalization.PersianCalendar g;
            g = new System.Globalization.PersianCalendar();
            Int32 y, m, d;
            string yy, mm, dd;
            string rd;
            d = g.GetDayOfMonth(tomorrow);
            m = g.GetMonth(tomorrow);
            y = g.GetYear(tomorrow);
            yy = y.ToString();
            if (d < 10)
            {
                dd = "0" + d.ToString();
            }
            else
            {
                dd = d.ToString();
            }
            if (m < 10)
            {
                mm = "0" + m.ToString();
            }
            else
            {
                mm = m.ToString();
            }
            rd = yy + "/" + mm + "/" + dd;
            return rd.Remove(0, 2);
        }
        public static string ConvertDateToSqlFormat(this string DateSlash)
        {
            string strNew = DateSlash;
            if (DateSlash.Length == 8)
            {
                strNew = DateSlash.Replace("/", string.Empty);
            }
            if (DateSlash.Length == 10)
            {
                strNew = DateSlash.Replace("/", string.Empty);
                /*string Year = strNew.Substring(2, 2);
                string Month = strNew.Substring(4, 2);
                string Day = strNew.Substring(6, 2);
                strNew= Year+ Month+ Day;*/
            }
            return strNew;
        }
        public static string ConvertDateToDateFormat(this string DateSlash)
        {
            string strNew = string.Empty;
            if (DateSlash.Length == 8)
            {
                string Year = DateSlash.Substring(0, 2);
                string Month = DateSlash.Substring(2, 2);
                string Day = DateSlash.Substring(04, 2);
                strNew = Year + '/' + Month + '/' + Day;

            }
            if (DateSlash.Length == 10)
            {
                string Year = DateSlash.Substring(0, 4);
                string Month = DateSlash.Substring(4, 2);
                string Day = DateSlash.Substring(6, 2);
                strNew = Year + '/' + Month + '/' + Day;
            }
            return strNew;


        }
        public static string ConvertDateToSlash(this string str)
        {
            string Result = str;
            if (str.Length == 6)
            {
                string Yaer = str.Substring(0, 2);
                string Moth = str.Substring(2, 2);
                string Dayy = str.Substring(4, 2);
                Result = (string.Format("{0}/{1}/{2}", Yaer, Moth, Dayy));
            }
            if (str.Length == 8)
            {
                string Yaer = str.Substring(0, 4);
                string Moth = str.Substring(4, 2);
                string Dayy = str.Substring(6, 2);
                Result = (string.Format("{0}/{1}/{2}", Yaer, Moth, Dayy));
            }
            return Result;
        }
    }
}
