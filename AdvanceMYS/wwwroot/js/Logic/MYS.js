function Dictionary() {
    $("#MasterPage").empty()
}
function Sport() {
    $("#MasterPage").empty()
    var table = "<div class='container-fluid'>" +
        "<div class='row'>" +
        "<div class='col-lg-4'>" +
        "<div id='ListCat' ></div>" +
        " </div > " +
        "<div class='col-lg-4'>" +
        "<div class='ListSportChk' ></div>" +
        " </div > " +
        "<div class='col-lg-4'>" +
        "<div class='ListSportCatId' ></div>" +
        " </div > " +
        " </div > " +
        "</div>"



    $("#MasterPage").append(table)
    ShowListCat(1);

}
async function Task() {
    $("#MasterPage").empty()
    var table = "<div style='text-align:center'><div class='btn-group' >" +
        "<button type='button' onclick='Calender()' class='btn btn-warning' >تقویم</button >" +
        "<button type='button' onclick='UpdateToToday()' class='btn btn-info' >انتقال به امروز</button >" +
        "<div class='btn-group'>" +
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'> Sony</button>" +
        "<div class='dropdown-menu'>" +
        " <a class='dropdown-item' href='#'>Tablet</a>" +
        " <a class='dropdown-item' href='#'>Smartphone</a>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div ></br>"

    table +=
        "<div class='container'>" +
        "<div class='row'>" +
        "<div class='col-md-6'>" +

        "<div class='row'>" +
        "<div class='col-md-12'>" +

        " <div id='ListCat'></div>" +

        "</div > " +
        "</div > " +


        "<div class='row'>" +
        "<div class='col-md-12'>" +

        "<div class='ListTagh'></div>" +

        "</div > " +
        "</div > " +



        "</div > " +
        "<div class='col-md-6'>" +
        "<div class='row'>" +
        "<div class='col-md-12'>" +
        "<div class='ListTaskAnjamShode'></div>" +
        "<div id='ListTaskTiming'></div>" +
        "</div></div ></div > " +
        " </div > " +


        "<div class='row'>" +
        "<div class='col-md-12'>" +
        " <input type='text' placeholder='جستجو' onKeyup='ListTask(this)'/>" +
        "<div class='ListTask'></div></div > " +
        " </div> " +
        " </div> </div>"


    // var table = "<div class='ListTask' ></div>"


    //  $("#MasterPage").empty()
    $("#MasterPage").append(table)





    Refresh()
}
async function Book() {
    $("#MasterPage").empty()

    var table = "<div class='container-fluid'>" +
        "<div class='row'>" +
        "<div class='col-lg-12'>" +
        "<div class='ListBook' ></div>" +
        "<div style = 'font-family: BNazanin;font-size:10px;text-align:center;position: fixed;bottom: 0; background: #1159a7; z-index: 20;left:0;right: 0;padding: 4px 70px 0px 70px;' class='smokyText'>*****</div>" +

        " </div > " +
        " </div > " +
        "</div>"




    $("#MasterPage").append(table)

    GetBook()
    GetBooks()

}
function RepeatedTask() {
    $("#MasterPage").empty()
}
function BaseData() {
    $("#MasterPage").empty()
    var table = "<div style='text-align:center'><div class='btn-group' >" +
        "<button type='button' onclick='Calender()' class='btn btn-warning' >تقویم</button >" +
        "<button type='button' onclick='UpdateToToday()' class='btn btn-info' >انتقال به امروز</button >" +
        "<div class='btn-group'>" +
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'> Sony</button>" +
        "<div class='dropdown-menu'>" +
        " <a class='dropdown-item' href='#'>Tablet</a>" +
        " <a class='dropdown-item' href='#'>Smartphone</a>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div ></br>"

    table +=
        "<div class='container-fluid'>" +
        "<div class='row'>" +
        "<div class='col-md-4'>" +
        " <div class='ListTaghvim'></div>" +
        "</div > " +

        "<div class='col-md-3'>" +
        " <div class='ListCategory'></div>" +
        "</div > " +
        "<div class='col-md-5'>" +

        " <div class='ListJob'></div>" +
        "</div > " +

        "</div > "
    $("#MasterPage").append(table)
    ShowListTaghvim()
    ListCategory()

}
//نمایش اطلاعات تاریخ در هدر
$(document).ready(function () {

    const m = moment();
    setInterval(function () {
        var table = "<table class='table' style ='font-size:11px;color:white;text-align:center'> " +
            "<tr><th>امروز</th><th>روز</th><th>ساعت</th><th>هفته</th><th>روز</th><th>سال</th><th>روز</th></tr>" +
            "<tr>" +
            "<td>" + foramtDate(todayShamsy8char()) + "</td>" +
            "<td>" + calDayOfWeek(todayShamsy8char()) + "</td>" +
            "<td>" + foramtTime(CurrentTime()) + "</td>" +
            "<td>" + m.jWeek() + "</td>" +
            "<td>" + m.jDayOfYear() + "</td>" +
            "<td>" + baghyMandeYaer(todayShamsy8char()).toFixed(3) + "</td>" +
            "<td>" + baghyMandeDay() + "</td>" +
            "</tr></table>"
        $("#DateDetail").empty()
        $("#DateDetail").append(table)
    }, 1000);
    // -------------firstLoad

    CallAll();

});

async function CallAll() {
    CalenderListTagh()
    //
    //var results = await Promise.all([
    //    CalenderListTagh(),
    //]);
    //var lstCalenderListTagh = results[0]
    //$(".ListTagh").empty()
    //$(".ListTagh").append(lstCalenderListTagh)



}

