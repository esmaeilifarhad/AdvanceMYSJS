//************************************Task*****************************************************

async function TabShowListTask() {
    
    ListTask();
}
async function ListTask() {
    
    $.LoadingOverlay("show");
    var obj = {}
    obj.url = "/Task/ListTask"
    obj.dataType = "json"
    obj.type = "post"
    // objListTaskAnjamnashode.data=JSON.stringify({typeTask:typeTask,MyData: MyArray })
   // objEditTask.data = { TaskId: obj.Id }
    //var res=await service(obj);

    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj= results[0]
    
    ShowListTask(ListObj)
    $.LoadingOverlay("hide");

}
function ShowListTask(ListTaskAnjamnashode) {
    
   // console.log(ListTaskAnjamnashode)
    var table = "<input style='cursor:pointer' type='button' value='انجام' onclick='changeToAnjamShode()'/><input style='cursor:pointer' type = 'button' value = 'حذف' onclick = 'RemoveAllTask()' />" +
        " <button type='button' /*class='btn btn-info'*/ onclick='transferDate(1)'>+1</button>" +
        " <button type='button' /*class='btn btn-warning'*/ onclick='transferDate(07)'>جمعه</button>" +
        " <button type='button' /*class='btn btn-danger'*/ onclick='transferDate(00)'>شنبه</button>" +
        " <button type='button' /*class='btn btn-success'*/ onclick='transferDate(0101)'>01/01</button>" +
        " <button type='button' /*class='btn btn-info'*/ onclick='transferDate(30)'>30</button>" +

        "<table id='tblListTaskDateToDate' class='table-bordered table-responsive table-striped' " +
        " style='direction: rtl; text-align: center;font-size:11px'>" +

        "     <tr>" +
        "         <th><input   type='checkbox' onclick='selectAllchk(this)' /></th>" +
        "         <th>اولویت</th>" +
        "         <th>Rate</th>" +
        "         <th>بالا</th>" +
        "         <th>پایین</th>" +
        "         <th>نوع</th>" +
        "         <th>عنوان وظیف</th>" +
        "         <th>تاریخ شروع</th>" +
        "         <th>تاریخ پایان</th>" +
        "         <th>پیشرفت</th>" +
        "         <th>گذشته</th>" +
        "         <th>مانده روز</th>" +
        "         <th>زمان</th>" +
        "         <th>زمان بندی</th>" +
        "         <th>ویرایش</th>" +
        "         <th>حذف</th>" +
        "     </tr>"
    for (let index = 0; index < ListTaskAnjamnashode.length; index++) {

        table += "<tr>" +
            "<td><input Data_id=" + ListTaskAnjamnashode[index].taskId + " class='AnjamShode'  type='checkbox'/></td>" +
            "<td class='Olaviat'>" + ListTaskAnjamnashode[index].olaviat + "</td>" +
            "<td >" + ListTaskAnjamnashode[index].rate + "</td>" +
            "<td><input type='button' style='background-color:green' class='fa fa-sort-up pointer ' onclick='TaskUpLevel(" + ListTaskAnjamnashode[index].taskId + ")' Data_id='@item.TaskId'/></td>" +
            "<td><input type='button' style='background-color:red' class='fa fa-sort-down pointer  ' onclick='TaskDownLevel(" + ListTaskAnjamnashode[index].taskId + ")'  Data_id='@item.TaskId'/></td>" +
            "<td>" + ListTaskAnjamnashode[index].cat.title + "</td>" +
            "<td style='text-align: right!important;'>" + ListTaskAnjamnashode[index].name + "</td>" +
            "<td>" + foramtDate(ListTaskAnjamnashode[index].dateStart) + "<br/>" + calDayOfWeek(ListTaskAnjamnashode[index].dateStart) + "</td>" +
            "<td>" + foramtDate(ListTaskAnjamnashode[index].dateEnd) + "<br/>" + calDayOfWeek(ListTaskAnjamnashode[index].dateEnd) + "</td>" +
            "<td>" + ListTaskAnjamnashode[index].darsadPishraft + "</td>" +
            "<td>" + numberDaysTwoDate(ListTaskAnjamnashode[index].dateStart, todayShamsy())+ "</td>" +
            "<td>" + numberDaysTwoDate(ListTaskAnjamnashode[index].dateEnd, todayShamsy() )+ "</td>" +
            "<td>" + (ListTaskAnjamnashode[index].timings.length>0?ListTaskAnjamnashode[index].timings[0].manageTime.label:'00:00')+ "</td>" +
            "<td><span class='fa fa-calendar pointer calendarTask' onclick='TimingTask(" + ListTaskAnjamnashode[index].taskId + ")' Data_id=" + ListTaskAnjamnashode[index].taskId + "></span>" +
            "</br>" +
            "<span class='fa fa-remove pointer' onclick='removeTimeTask(" + ListTaskAnjamnashode[index].taskId + ")'></span></td>" +
            "<td><span class='fa fa-edit' style='cursor:pointer' onclick='EditTask(" + ListTaskAnjamnashode[index].taskId +")'></span></td>" +
            "<td><span class='fa fa-remove pointer'   Data_id=" + ListTaskAnjamnashode[index].taskId + " onclick=' DeleteTask({Id:" + ListTaskAnjamnashode[index].taskId + "})'></span></td>" +
            "</tr>"
    }
    table += "</table>"

    $(".ListTask").empty();
    $(".ListTask").append(table);
    eachColorTask();
    $.LoadingOverlay("hide");
}

async function UpdateToToday() {
    debugger
    $.LoadingOverlay("show");
    var obj = {}
    obj.url = "/Task/UpdateToToday"
    obj.dataType = "json"
    obj.type = "post"
    // objEditTask.data = { TaskId: obj.Id }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]
    alert(ListObj)
    $.LoadingOverlay("hide");
}
function eachColorTask() {
    $(".ListTask table tr td:nth-child(2)").each(function () {
        
        //اگر مانده روز بیشتر از صفر بود
        var mandeRooz = $(this).parent().find("td").eq(11).text()
        if (mandeRooz == 0) {

            var valuee = ($(this).text());
            if (valuee < 0) {
                $(this).parent().css({ "color": "gray" });
            }
            if (valuee == 0) {
                $(this).parent().css({ "color": "gray" });
            }
            if (valuee == 1) {
                $(this).parent().css({ "color": "red" });
            }
            if (valuee == 2) {
                $(this).parent().css({ "color": "orange" });
            }
            if (valuee == 3) {
                $(this).parent().css({ "color": "#5a49e0" });
            }
            if (valuee == 4) {
                $(this).parent().css({ "color": "#26d826" });
            }
            if (valuee == 5) {
                $(this).parent().css({ "color": "darkgreen" });
            }
        }
        else {
            if (mandeRooz % 2 == 0)
                $(this).parent().css({ "color": "#b5b7b9" });
            else
                $(this).parent().css({ "color": "black" });
        }


    });
}

async function EditTask(TaskId) {
    $.LoadingOverlay("show");

    var objEditTask = {}
    objEditTask.url = "/Task/EditTask"
    objEditTask.dataType = "json"
    objEditTask.type = "post"
    objEditTask.data = { TaskId: TaskId }

    var results = await Promise.all([
        service(objEditTask)
    ]);
    var oldTask = results[0]
    //console.log(ListtObjEditTask)
    debugger
    var table = "<div class='form-group'>" +
        "تاریخ شروع<input type='text' placeholde='تاریخ شروع' name='DateStart' class='PersianDatePickerDateStart' value=" + foramtDate(oldTask.task.dateStart) + " autocomplete='off'  >" +
        "تاریخ پایان<input type='text' placeholde='تاریخ پایان' name='DateEnd' class='PersianDatePickerDateEnd' value=" + foramtDate(oldTask.task.dateEnd) + " autocomplete='off'  >" +
        "توضیحات<textarea  name='Name' class='form-control'  rows='6'>" + oldTask.task.name + "</textarea>" +
        "نوع <br/><select class='MYSelect'>"

    for (let index = 0; index < oldTask.lstCat.length; index++) {
        if (oldTask.lstCat[index].catId == oldTask.task.catId) {
            table += " <option Selected  value=" + oldTask.lstCat[index].catId + ">" + oldTask.lstCat[index].title + "</option>"
        }
        else {
            table += " <option value=" + oldTask.lstCat[index].catId + ">" + oldTask.lstCat[index].title + "</option>"
        }
    }
    table += "</select>"

    table += "<table>" +
        "<tr><td>درصد پیشرفت</td><td><input type='number' name='DarsadPishraft'  value=" + oldTask.task.darsadPishraft + " min='0' max='100' autocomplete='off'  ></td></tr>" +
        "<tr><td>اولویت</td><td><input type='number' name='Olaviat'   value=" + oldTask.task.olaviat + " min='0' max='5' autocomplete='off'  ></td></tr>" +
        "<tr><td>Rate</td><td><input type='number' name='Rate'   value=" + oldTask.task.rate + "  min='0' max='5' autocomplete='off'  ></td></tr>"


    if (oldTask.task.isActive == true) {
        table += "<tr><td>فعال</td><td><input name='TaskIsActive' type='checkbox' checked/></td></tr>"
    }
    else {
        table += "<tr><td>فعال</td><td><input name='TaskIsActive' type='checkbox' /></td></tr>"
    }
    if (oldTask.task.isCheck == true) {
        table += "<tr><td>انجام</td><td><input name='TaskIsCheck' type='checkbox' checked/></td></tr>"
    }
    else {
        table += "<tr><td>انجام</td><td><input name='TaskIsCheck' type='checkbox' /></td></tr>"
    }


    table += "</table></div >"

    //----------------


    var tablebutt = "<table><tr>" +
        "<td><input type='button' class='btn btn-success' value='ویرایش' onclick='UpdateTask(" + oldTask.task.taskId + ")'/> | " +
        "<input type='button'  class='btn btn-danger' value='بستن' onclick='closeModal()'/></td>" +
        "</tr>"
    tablebutt += "</table>"



    $("#MasterModal .BodyModal").empty();
    $("#MasterModal .modal-footer").empty();

    $("#MasterModal .BodyModal").append(table);
    $("#MasterModal .modal-footer").append(tablebutt);
    $("#MasterModal").modal();

    $.LoadingOverlay("hide");
    kamaDatepicker('PersianDatePickerDateStart', {
        nextButtonIcon: "../Scripts/Persian-Jalali-Calendar-Data-Picker-Plugin-With-jQuery-kamaDatepicker/demo/timeir_next.png"
        , previousButtonIcon: "../Scripts/Persian-Jalali-Calendar-Data-Picker-Plugin-With-jQuery-kamaDatepicker/demo/timeir_prev.png"
        , forceFarsiDigits: true
        , markToday: true
        , markHolidays: true
        , highlightSelectedDay: true
        , sync: true
    });
    kamaDatepicker('PersianDatePickerDateEnd', {
        nextButtonIcon: "../Scripts/Persian-Jalali-Calendar-Data-Picker-Plugin-With-jQuery-kamaDatepicker/demo/timeir_next.png"
        , previousButtonIcon: "../Scripts/Persian-Jalali-Calendar-Data-Picker-Plugin-With-jQuery-kamaDatepicker/demo/timeir_prev.png"
        , forceFarsiDigits: true
        , markToday: true
        , markHolidays: true
        , highlightSelectedDay: true
        , sync: true
    });



    $.LoadingOverlay("hide");
    //--------

}

//نمایش تقویم
async function Calender(status) {
    var today = todayShamsy()
    var splitdate = today.split('/');
    var year = ""
    var month = ""
    if (status == true) {
        year = parseInt($("#year option:selected").val());
        month = parseInt($("#month option:selected").val());
    }
    else {




        var year = parseInt(splitdate[0])
        var month = parseInt(splitdate[1])
    }
    


    var obj = {}
    obj.url = "/Task/ListTaskMonth"
    obj.dataType = "json"
    obj.type = "POST"
    obj.data = { xxx: year + "" + (month < 10 ? "0" + month : month) }
    
    var results = await Promise.all([
        service(obj)
    ]);
        var ListtObj = results[0]
    

    



    var lastMonth = 0
    if (month <= 6) {
        lastMonth = 31
    }
    if (month >= 7 && month <= 11) {
        lastMonth = 30
    }
    if (month == 12) {
        lastMonth = 29
    }
    //کبیسه
    if (year % 4 == 3) {
        lastMonth = 30
    }

    var dayWeek = ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهار شنبه", "پنج شنبه", "جمعه"]



    var table = "<table class='table table-responsive' style='text-align: center;'>"
    table += "<tr><th>شنبه</th><th>یکشنبه</th><th>دوشنبه</th><th>سه شنبه</th><th>چهارشنبه</th><th>پنجشنبه</th><th>جمعه</th></tr>"



    for (var k = 1; k <= lastMonth;) {
        table += "<tr>"
        for (var i = 0; i < 7; i++) {


            var dateSelect = year + "" + (month < 10 ? "0" + month : month) + (k < 10 ? "0" + k : k)

            table += "<td onclick='showDayTask(" + dateSelect + ")'>"
            if (calDayOfWeeknumber(dateSelect) == i) {

                //  var res = ListtObj.find(x => x.DateEnd == year + "" + (month < 10 ? "0" + month : month) + (k < 10 ? "0" + k : k));

                var res = ListtObj.filter(function (x) {

                    return x.dateEnd == dateSelect;
                });

                //امروز را سبز رنگ نمایش دهد
                if (k == parseInt(splitdate[2]) && month == parseInt(splitdate[1]) && year == parseInt(splitdate[0])) {
                    table += "<span style='color: white;background-color: green;padding: 3px;border-radius: 10px;'>" + k + "</span>" + (res.length > 0 ? "<span style='color:red'>" + res.length + "</span>" : "<span></span>")
                }
                else {
                    table += "<span>" + k + "</span>" + (res.length > 0 ? "<span style='color:red'>" + res.length + "</span>" : "<span></span>")
                }


                k += 1
            }
            table += "</td>"







            // k += 1
        }
        table += "</tr>"
    }
    table += "</table>"

    tableHeader = "<table><tr><th>ماه</th><th>سال</th></tr><tr><td><select onchange='Calender(true)' id='month'>"
    for (var i = 1; i <= 12; i++) {
        if (i == month) {
            tableHeader += "<option selected value=" + i + "  >" + i + "</option>"
        }
        else {
            tableHeader += "<option value=" + i + " >" + i + "</option>"
        }

    }
    tableHeader += "</select></td><td>"
    tableHeader += "<select onchange='Calender(true)' id='year'>"
    for (var i = 1250; i <= 1500; i++) {
        if (i == year) {
            tableHeader += "<option selected value=" + i + "  >" + i + "</option>"
        }
        else {
            tableHeader += "<option value=" + i + " >" + i + "</option>"
        }

    }
    tableHeader += "</select></td></tr></table>"
    tableHeader += "<span style='cursor:pointer;background-color: green;border-radius: 10px;padding: 5px;color: black;' onclick='Calender(false)'>امروز</span>"


    var tablebutt = "<table><tr>" +
        "<td><input type='button'  class='btn btn-danger' value='بستن' onclick='closeCalendar1()'/></td>" +
        "</tr>"
    tablebutt += "</table>"


    $("#Calendar1 .modal-header").empty();
    $("#Calendar1 .modal-header").append(tableHeader);

    $("#Calendar1 .BodyModal").empty();
    $("#Calendar1 .modal-footer").empty();

    $("#Calendar1 .BodyModal").append(table);
    $("#Calendar1 .modal-footer").append(tablebutt);
    $("#Calendar1 ").modal();


}

