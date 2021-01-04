using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace AdvanceMYS.Models.Repositories
{
    public class MessageSender //: IMessageSender
    {
        public Task SendEmailAsync(string toEmail, string subject, string message, bool isMessageHtml = false)
        {
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

                //نام فرستنده
                mail.From = new MailAddress("farhadsender1367@gmail.com");
                //آدرس گیرنده یا گیرندگان
                mail.To.Add(toEmail);
                //عنوان ایمیل
                mail.Subject = subject;
                //بدنه ایمیل
                mail.Body = message;
                mail.IsBodyHtml = isMessageHtml;
                //مشخص کرن پورت 
                SmtpServer.Port = 587;
                //SmtpServer.UseDefaultCredentials = true;
                SmtpServer.EnableSsl = true;
                //username : به جای این کلمه نام کاربری ایمیل خود را قرار دهید
                //password : به جای این کلمه رمز عبور ایمیل خود را قرار دهید
                SmtpServer.Credentials = new System.Net.NetworkCredential("farhadsender1367", "Fe23565!@#");

              return  Task.Run(() =>
                {
                    SmtpServer.Send(mail);
                });
               
                //MessageBox.Show("mail Send");
            }
            catch (Exception ex)
            {
                
                ex.ToString();
               return Task.CompletedTask;
            }

          
          // return
        }
    }
}
