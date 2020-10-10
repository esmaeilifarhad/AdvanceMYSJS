using Microsoft.EntityFrameworkCore.Migrations;

namespace AdvanceMYS.Migrations
{
    public partial class spfindBookDsc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sp = @"
create procedure [5069_Esmaeili].[findBookDsc]
  @UserId  varchar(200)
as 

--select top 1 * from Book where UserId=@UserId order by  RepeatedNumber

--exec findBookDsc 1
declare @BookId int
declare @RepeatCount int
--select top 1 @BookId=BookId,@RepeatCount=RepeatCount from book where UserId=UserId order by RepeatCount,RepeatedNumber
select top 1 @BookId=BookId,@RepeatCount=RepeatCount from book where UserId=UserId order by RepeatedNumber,RepeatCount
--select @BookId
--select @RepeatCount
select * from Book where bookid=@BookId
if(@RepeatCount is null)
begin
update Book 
set RepeatCount=1
where bookid=@BookId
end
else
begin
set @RepeatCount=@RepeatCount+1
update Book 
set RepeatCount=@RepeatCount
where bookid=@BookId
end
if(@RepeatCount=3)
begin
update Book 
set RepeatCount=1
--where RepeatCount>=3
end

--update book
--set RepeatedNumber=isnull(RepeatedNumber,0)+1
--where  bookid=@BookId


--select * from book


--update book
--set time='140000'
-- where time is null

";

            migrationBuilder.Sql(sp);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
