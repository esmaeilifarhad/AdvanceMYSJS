using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdvanceMYS.Models.Repositories
{
   public interface IMessageSender
    {
        public void SendEmailAsync(string toEmail, string subject, string message, bool isMessageHtml = false);
    }
}
