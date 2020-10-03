function Dictionary() {
    $("#MasterPage").empty()
}
function Sport() {
    $("#MasterPage").empty()
    var table = "<div id='ListCat' ></div>"
    $("#MasterPage").append(table)
    ShowListCat(1);
}

async function Task() {
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
        "</div >" +
        "</br><div  id='task'><input type='button' onclick='Calender()' value='تقویم' class='btn btn-warning'/></div><div id='ListCat'></div><div class='ListTask'></div>"
    $("#MasterPage").empty()
    $("#MasterPage").append(table)
    
    ShowListCat(2);
    ListTask()
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
           // -------------execute when load client listnav
           

    });

