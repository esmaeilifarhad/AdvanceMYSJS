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


    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]

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
            "<td>" + numberDaysTwoDate(ListTaskAnjamnashode[index].dateStart, todayShamsy()) + "</td>" +
            "<td>" + numberDaysTwoDate(ListTaskAnjamnashode[index].dateEnd, todayShamsy()) + "</td>" +
            "<td>" + (ListTaskAnjamnashode[index].timings.length > 0 ? ListTaskAnjamnashode[index].timings[0].manageTime.label : '00:00') + "</td>" +
            "<td><span class='fa fa-calendar pointer calendarTask' onclick='TimingTask(" + ListTaskAnjamnashode[index].taskId + ")' Data_id=" + ListTaskAnjamnashode[index].taskId + "></span>" +
            "</br>" +
            "<span class='fa fa-remove pointer' onclick='removeTimeTask(" + ListTaskAnjamnashode[index].taskId + ")'></span></td>" +
            "<td><span class='fa fa-edit' style='cursor:pointer' onclick='EditTask(" + ListTaskAnjamnashode[index].taskId + ")'></span></td>" +
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
    showAlert("تعداد تسک هایی که به امروز انتقال یافت" + ListObj,2000)
   // alert(ListObj)
    $.LoadingOverlay("hide");
    Refresh()
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


    var table = "<div class='form-group'>" +
        "تاریخ شروع<input type='text' placeholde='تاریخ شروع' name='DateStart' class='PersianDatePickerDateStart' value=" + foramtDate(oldTask.task.dateStart) + " autocomplete='off'  >" +
        "تاریخ پایان<input type='text' placeholde='تاریخ پایان' name='DateEnd' class='PersianDatePickerDateEnd' value=" + foramtDate(oldTask.task.dateEnd) + " autocomplete='off'  >" +
        "</br><textarea placehoder='توضیحات' name='Name' class='form-control'  rows='6'>" + oldTask.task.name + "</textarea>" +
        " <br/> نوع <select class='MYSelect'>"

    for (let index = 0; index < oldTask.lstCat.length; index++) {
        if (oldTask.lstCat[index].catId == oldTask.task.catId) {
            table += " <option Selected  value=" + oldTask.lstCat[index].catId + ">" + oldTask.lstCat[index].title + "</option>"
        }
        else {
            table += " <option value=" + oldTask.lstCat[index].catId + ">" + oldTask.lstCat[index].title + "</option>"
        }
    }
    table += "</select><span> زمان انجام </span><select  class='MYSelectTiming'>"
    for (var i = 0; i < oldTask.lstManageTime.length; i++) {
        if (oldTask.hour == oldTask.lstManageTime[i].value) {
            table += "<option selected style='color:red' value=" + oldTask.lstManageTime[i].manageTimeId + ">" + oldTask.lstManageTime[i].label + "</option>"
        }
        else if (oldTask.hour > oldTask.lstManageTime[i].value) {
            table += "<option style='color:gray'  value=" + oldTask.lstManageTime[i].manageTimeId + ">" + oldTask.lstManageTime[i].label + "</option>"
        }
        else {
            table += "<option  value=" + oldTask.lstManageTime[i].manageTimeId + ">" + oldTask.lstManageTime[i].label + "</option>"
        }

    }
    table += "</select><input type='checkbox' name='IsTime'/>"


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


    var modal_footer = "<table><tr>" +
        "<td><input type='button' class='btn btn-success' value='ویرایش' onclick='UpdateTask(" + oldTask.task.taskId + ")'/> | " +
        "<input type='button'  class='btn btn-danger' value='بستن' onclick='closeModal()'/></td>" +
        "</tr>"
    modal_footer += "</table>"


    var modal_header = "<span>ویرایش تسک</span>"
    $("#MasterModal .modal-header").empty();
    $("#MasterModal .modal-header").append(modal_header);


    $("#MasterModal .modal-footer").empty();
    $("#MasterModal .modal-footer").append(modal_footer);

    $("#MasterModal .BodyModal").empty();
    $("#MasterModal .BodyModal").append(table);

    $("#MasterModal").modal();

    $.LoadingOverlay("hide");

    //Date Picker


    $("input[name='DateStart']").persianDatepicker({
        formatDate: "YYYY/0M/0D"
    });

    $("input[name='DateEnd']").persianDatepicker({
        formatDate: "YYYY/0M/0D"
    });

}
async function CreateTask() {
    $.LoadingOverlay("show");
    
    var obj = {}
    obj.url = "/Task/CreateTask"
    obj.dataType = "json"
    obj.type = "post"
   // objEditTask.data = { TaskId: TaskId }

    var results = await Promise.all([
        service(obj)
    ]);
    var res = results[0]
    
    $.LoadingOverlay("hide");
    return res
}
async function CreateTaskPost() {
    
    var CatId = $("#MasterModal  .MYSelect option:selected").val();
    var ManageTimeId = $("#MasterModal  .MYSelectTiming option:selected").val();
    var IsTime = $("input[name='IsTime']").prop('checked')

    var Name = $("#MasterModal  textarea[name='Name']").val()
    var Olaviat = $("#MasterModal table input[name='Olaviat']").val()
    var Rate = $("#MasterModal table input[name='Rate']").val()
    var DarsadPishraft = $("#MasterModal table input[name='DarsadPishraft']").val()
    var DateEnd = $("#MasterModal  input[name='DateEnd']").val()
    var DateStart = $("#MasterModal  input[name='DateStart']").val()
    var IsActive = $("input[name='TaskIsActive']").prop('checked')
    var IsCheck = $("input[name='TaskIsCheck']").prop('checked')



    var array = DateEnd.split("/")
    var day_old = parseInt(array[2])
    var month_old = parseInt(array[1])
    var year_old = parseInt(array[0])

    if (month_old >= 7 && month_old <= 11 && day_old > 30) {
        alert("خطا در تاریخ : " + year_old + "/" + month_old + "/" + day_old)
        return
    }

    if (month_old == 12 && (year_old % 4 != 3) && day_old > 29) {
        alert("خطا در تاریخ : " + year_old + "/" + month_old + "/" + day_old)
        return
    }
    //کبیسه
    if (month_old == 12 && (year_old % 4 == 3) && day_old > 30) {
        alert("خطا در تاریخ : " + year_old + "/" + month_old + "/" + day_old)
        return
    }


    var obj = {}
    obj.url = "/Task/CreateTaskPost"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = {
      
        DateStart: DateStart,
        DateEnd: DateEnd,
        IsActive: IsActive,
        IsCheck: IsCheck,
        DarsadPishraft: DarsadPishraft,
        Name: Name,
        Olaviat: Olaviat,
        CatId: CatId,
        Rate: Rate,
        ManageTimeId: ManageTimeId,
        IsTime: IsTime
    }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]
    $("#MasterModal").modal("toggle")
    Refresh()
}
async function CreateTaskShow(CatId) {
    var oldTask = await CreateTask()
    


    var table = "<div class='form-group'>" +
        "تاریخ شروع<input type='text' placeholde='تاریخ شروع' name='DateStart' class='PersianDatePickerDateStart' value=" + todayShamsy()+"  autocomplete='off'  >" +
        "تاریخ پایان<input type='text' placeholde='تاریخ پایان' name='DateEnd' class='PersianDatePickerDateEnd' value=" + todayShamsy() +" autocomplete='off'  >" +
        "</br><textarea placehoder='توضیحات' name='Name' class='form-control'  rows='6'></textarea>" +
        " <br/> نوع <select class='MYSelect'>"

    for (let index = 0; index < oldTask.lstCat.length; index++) {
        if (oldTask.lstCat[index].catId == CatId) {
            table += " <option Selected  value=" + oldTask.lstCat[index].catId + ">" + oldTask.lstCat[index].title + "</option>"
        }
        else {
            table += " <option value=" + oldTask.lstCat[index].catId + ">" + oldTask.lstCat[index].title + "</option>"
        }
    }
    table += "</select><span> زمان انجام </span><select  class='MYSelectTiming'>"
    for (var i = 0; i < oldTask.lstManageTime.length; i++) {
        if (oldTask.hour == oldTask.lstManageTime[i].value) {
            table += "<option selected style='color:red' value=" + oldTask.lstManageTime[i].manageTimeId + ">" + oldTask.lstManageTime[i].label + "</option>"
        }
        else if (oldTask.hour > oldTask.lstManageTime[i].value) {
            table += "<option style='color:gray'  value=" + oldTask.lstManageTime[i].manageTimeId + ">" + oldTask.lstManageTime[i].label + "</option>"
        }
        else {
            table += "<option  value=" + oldTask.lstManageTime[i].manageTimeId + ">" + oldTask.lstManageTime[i].label + "</option>"
        }

    }
    table += "</select><input type='checkbox' name='IsTime'/>"


    table += "<table>" +
        "<tr><td>درصد پیشرفت</td><td><input type='number' name='DarsadPishraft'  value=" +0 + " min='0' max='100' autocomplete='off'  ></td></tr>" +
        "<tr><td>اولویت</td><td><input type='number' name='Olaviat'   value=" + 1 + " min='0' max='5' autocomplete='off'  ></td></tr>" +
        "<tr><td>Rate</td><td><input type='number' name='Rate'   value=" + 1 + "  min='0' max='5' autocomplete='off'  ></td></tr>"





  
        table += "<tr><td>فعال</td><td><input name='TaskIsActive' type='checkbox' /></td></tr>"

        table += "<tr><td>انجام</td><td><input name='TaskIsCheck' type='checkbox' /></td></tr>"
    


    table += "</table></div >"

    //----------------


    var modal_footer = "<table><tr>" +
        "<td><input type='button' class='btn btn-success' value='ایجاد' onclick='CreateTaskPost()'/> | " +
        "<input type='button'  class='btn btn-danger' value='بستن' onclick='closeModal()'/></td>" +
        "</tr>"
    modal_footer += "</table>"


    var modal_header = "<span>ایجاد تسک</span>"
    $("#MasterModal .modal-header").empty();
    $("#MasterModal .modal-header").append(modal_header);


    $("#MasterModal .modal-footer").empty();
    $("#MasterModal .modal-footer").append(modal_footer);

    $("#MasterModal .BodyModal").empty();
    $("#MasterModal .BodyModal").append(table);

    $("#MasterModal").modal();

    $.LoadingOverlay("hide");

    //Date Picker


    $("input[name='DateStart']").persianDatepicker({
        formatDate: "YYYY/0M/0D"
    });

    $("input[name='DateEnd']").persianDatepicker({
        formatDate: "YYYY/0M/0D"
    });
}
async function UpdateTask(TaskId) {
    var CatId = $("#MasterModal  .MYSelect option:selected").val();
    var ManageTimeId = $("#MasterModal  .MYSelectTiming option:selected").val();
    var IsTime = $("input[name='IsTime']").prop('checked')

    var Name = $("#MasterModal  textarea[name='Name']").val()
    var Olaviat = $("#MasterModal table input[name='Olaviat']").val()
    var Rate = $("#MasterModal table input[name='Rate']").val()
    var DarsadPishraft = $("#MasterModal table input[name='DarsadPishraft']").val()
    var DateEnd = $("#MasterModal  input[name='DateEnd']").val()
    var DateStart = $("#MasterModal  input[name='DateStart']").val()
    var IsActive = $("input[name='TaskIsActive']").prop('checked')
    var IsCheck = $("input[name='TaskIsCheck']").prop('checked')



    var array = DateEnd.split("/")
    var day_old = parseInt(array[2])
    var month_old = parseInt(array[1])
    var year_old = parseInt(array[0])

    if (month_old >= 7 && month_old <= 11 && day_old > 30) {
        alert("خطا در تاریخ : " + year_old + "/" + month_old + "/" + day_old)
        return
    }

    if (month_old == 12 && (year_old % 4 != 3) && day_old > 29) {
        alert("خطا در تاریخ : " + year_old + "/" + month_old + "/" + day_old)
        return
    }
    //کبیسه
    if (month_old == 12 && (year_old % 4 == 3) && day_old > 30) {
        alert("خطا در تاریخ : " + year_old + "/" + month_old + "/" + day_old)
        return
    }


    var obj = {}
    obj.url = "/Task/UpdateTask"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = {
        TaskId: TaskId,
        DateStart: DateStart,
        DateEnd: DateEnd,
        IsActive: IsActive,
        IsCheck: IsCheck,
        DarsadPishraft: DarsadPishraft,
        Name: Name,
        Olaviat: Olaviat,
        CatId: CatId,
        Rate: Rate,
        ManageTimeId: ManageTimeId,
        IsTime: IsTime
    }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]
    $("#MasterModal").modal("toggle")
    Refresh()

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

            table += "<td onclick='GetDateEvent(" + dateSelect + ")'>"
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

//نمایش تقویم تسک ها 
async function CalenderListTagh(status) {
    
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

    //-------------
    var obj = {}
    obj.url = "/Taghvim/Index"
    obj.dataType = "json"
    obj.type = "post"
   
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]
    
    //-------------

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

   
   var table = "<table><tr><th>ماه</th><th>سال</th><th></th></tr><tr><td><select onchange='CalenderListTagh(true)' id='month'>"
    for (var i = 1; i <= 12; i++) {
        if (i == month) {
            table += "<option selected value=" + i + "  >" + i + "</option>"
        }
        else {
            table += "<option value=" + i + " >" + i + "</option>"
        }

    }
    table += "</select></td><td>"
    table += "<select onchange='CalenderListTagh(true)' id='year'>"
    for (var i = 1250; i <= 1500; i++) {
        if (i == year) {
            table += "<option selected value=" + i + "  >" + i + "</option>"
        }
        else {
            table += "<option value=" + i + " >" + i + "</option>"
        }

    }
    table += "</select></td><td><span style = 'cursor:pointer;background-color: green;border-radius: 10px;padding: 5px;color: black;' onclick = 'CalenderListTagh(false)' > امروز</span ></td></tr></table>"
    //---------------------

     table += "<table class='table table-responsive' style='text-align: center;'>"
    table += "<tr><th>شنبه</th><th>یکشنبه</th><th>دوشنبه</th><th>سه شنبه</th><th>چهارشنبه</th><th>پنجشنبه</th><th>جمعه</th></tr>"



    for (var k = 1; k <= lastMonth;) {
        table += "<tr>"
        for (var i = 0; i < 7; i++) {
            var dateSelect = year + "" + (month < 10 ? "0" + month : month) + (k < 10 ? "0" + k : k)

           var IsInTaghvim= ListObj.filter(function (x) {
                return x.date==dateSelect
           })
            var style=""
            if (IsInTaghvim.length > 0) {
                
                if (IsInTaghvim[0].isHolyDay == true) {
                    style = "color:red";
                }
                else {
                    style = "color:blue";
                }

            }
            table += "<td onclick='GetDateEvent(" + dateSelect + ")'>"
            if (calDayOfWeeknumber(dateSelect) == i) {
               
                //امروز را سبز رنگ نمایش دهد
                if (k == parseInt(splitdate[2]) && month == parseInt(splitdate[1]) && year == parseInt(splitdate[0])) {
                    table += "<span style='color: white;background-color: green;padding: 3px;border-radius: 10px;;cursor:pointer" + style+"'>" + k + "</span>"
                }
                else {
                    //جمعه قرمز
                    if (i == 6) {
                        table += "<span style='color:red;cursor:pointer'> " + k + "</span>" 
                    }
                    else {
                        table += "<span style='" + style +";cursor:pointer'>" + k + "</span>" 
                    }
                  
                }

                k += 1
            }
            table += "</td>"
        }
        table += "</tr>"
    }
    table += "</table>"

   




    $(".ListTagh").empty();
    $(".ListTagh").append(table);





}

async function GetTimingTask(TaskId) {

    var objEditTask = {}
    objEditTask.url = "/Task/TimingTask"
    objEditTask.dataType = "json"
    objEditTask.type = "post"
    objEditTask.data = { TaskId: TaskId }

    var results = await Promise.all([
        service(objEditTask)
    ]);
    var res = results[0]
    return res
}
async function TimingTask(TaskId) {
    var res = await GetTimingTask(TaskId)
    
    var table = "<div class='form-group'>" +
        "توضیحات<textarea disabled name='Name' class='form-control'  rows='6'>" + res.task.name + "</textarea>" +
        "</br><select class='MYSelectTiming'>"
    for (var i = 0; i < res.lstManageTime.length; i++) {
        if (res.hour == res.lstManageTime[i].value) {
            table += "<option selected style='color:red' value=" + res.lstManageTime[i].manageTimeId + ">" + res.lstManageTime[i].label + "</option>"
        }
        else if (res.hour > res.lstManageTime[i].value) {
            table += "<option style='color:gray' value=" + res.lstManageTime[i].manageTimeId + ">" + res.lstManageTime[i].label + "</option>"
        }
        else {
            table += "<option value=" + res.lstManageTime[i].manageTimeId + ">" + res.lstManageTime[i].label + "</option>"
        }

    }
    table += "</select></div>"

    var modal_header = "<span>زمان انجام</span>"
    $("#MasterModal .modal-header").empty();
    $("#MasterModal .modal-header").append(modal_header);


    var modal_footer = "<table><tr>" +
        "<td><input type='button' class='btn btn-success' value='ویرایش' onclick='UpdateTiming(" + res.task.taskId + ")'/> | " +
        "<input type='button'  class='btn btn-danger' value='بستن' onclick='closeModal()'/></td>" +
        "</tr>"
    modal_footer += "</table>"

    $("#MasterModal .modal-footer").empty();
    $("#MasterModal .modal-footer").append(modal_footer);

    $("#MasterModal .BodyModal").empty();
    $("#MasterModal .BodyModal").append(table);

    $("#MasterModal").modal();

}

async function ListTimingForListTask() {
    var d = new Date();
    var currentHour = d.getHours();

    $.LoadingOverlay("show");

    var objListTaskAnjamnashode = {}
    objListTaskAnjamnashode.url = "/Task/ListTimingForListTask";
    objListTaskAnjamnashode.dataType = "json"
    objListTaskAnjamnashode.type = "post"

    // objListTaskAnjamnashode.data = { x: 0 }


    var results = await Promise.all([
        service(objListTaskAnjamnashode)
    ]);
    var ListTaskAnjamnashode = results[0]

    var table = "<table class='table table-responsive' style='position:relative;z-index: 15;font-size:9px;text-align: center;background-image: linear-gradient(to left, #ded4ab, #dae6f3);'>" +
        "<tr>" +
        "<th>تغییر اولیت</th>" +
        "<th>اولویت</th>" +
        "<th>عنوان</th>" +
        "<th>Rate</th>" +
        "<th>تاریخ</th>" +
        "<th>ساعت</th>" +
        "<th>زمان</th>" +
        "<th>حذف</th>" +
        "<th>ویرایش</th>" +
        "<th>انجام</th>" +
        "</tr>"
    for (var i = 0; i < ListTaskAnjamnashode.length; i++) {

        if (currentHour == ListTaskAnjamnashode[i].Value && todayShamsy8char() == ListTaskAnjamnashode[i].DateEnd) {
            table += "<tr style='color: white; background-color: #981313;'>"

        }
        else {
            if (todayShamsy8char() != ListTaskAnjamnashode[i].DateEnd)
                table += "<tr style='color: #4873d4;'>"
            else
                table += "<tr>"

        }


        table += "<td><input type='button' style='background-color:green' class='fa fa-sort-up pointer' onclick='TaskUpLevel(" + ListTaskAnjamnashode[i].taskId + ")'/><input type='button' style='background-color:red' class='fa fa-sort-down pointer' onclick='TaskDownLevel(" + ListTaskAnjamnashode[i].taskId + ")'/></td>" +
            "<td style='white-space: nowrap;'>" + ListTaskAnjamnashode[i].olaviat + "</td>" +
            "<td style='text-align:right'>" + ListTaskAnjamnashode[i].name.substring(0, 40) + " ... </td>" +
            "<td>" + ListTaskAnjamnashode[i].rate + "</td>" +
            "<td>" + foramtDate(ListTaskAnjamnashode[i].dateEnd) + "<br/>" + calDayOfWeek(ListTaskAnjamnashode[i].dateEnd) + "</td>" +
            "<td style='white-space: nowrap;'>" + ListTaskAnjamnashode[i].label + "</td>" +
            "<td><span class='fa fa-calendar pointer' onclick='TimingTask(" + ListTaskAnjamnashode[i].taskId + ")'></span></td>" +
            "<td><span class='fa fa-remove pointer' onclick='removeTimeTask(" + ListTaskAnjamnashode[i].taskId + ")'></span></td>" +


            "<td><span class='fa fa-edit pointer' onclick='EditTask(" + ListTaskAnjamnashode[i].taskId + ")' style='display: inline;'></span></td>" +
            "<td><input type='checkbox' class='pointer' onclick='UpdateTask2({TaskId:" + ListTaskAnjamnashode[i].taskId + ",IsCheck:true})'/></td>" +
            "</tr>"
    }
    table += "</table>"

    $("#ListTaskTiming").empty();
    $("#ListTaskTiming").append(table);

    $.LoadingOverlay("hide");
}

async function UpdateTiming(taskId) {

    var ManageTimeId = $("#MasterModal  .MYSelectTiming option:selected").val();

    $.LoadingOverlay("show");
    var obj = {}
    obj.url = "/Task/UpdateTiming"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = { TaskId: taskId, ManageTimeId: ManageTimeId }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]
    $.LoadingOverlay("hide");
    $("#MasterModal").modal("toggle");
    Refresh()

}

async function removeTimeTask(taskId) {

    $.LoadingOverlay("show");
    var obj = {}
    obj.url = "/Task/removeTimeTask"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = { TaskId: taskId }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]
    showAlert("حذف شد" , 1000)
    $.LoadingOverlay("hide");
    Refresh()

}


async function UpdateTask2(obj) {
    
    var TaskId = obj.TaskId
    var IsCheck=obj.IsCheck
    $.LoadingOverlay("show");
    var obj = {}
    obj.url = "/Task/UpdateTask"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = {
        TaskId: TaskId,
        IsCheck: IsCheck,
       
    }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]
    $.LoadingOverlay("hide");
    Refresh()
}


async function ListTaskAnjamShode(date) {
    
    var SeletedDate = date
    $.LoadingOverlay("show");

    //var today = $("#menu4 .PersianDatePickerEditTaskS").val()// todayShamsy8char()

    //today = convertDateToslashless(today)
    if (date == undefined) {
        SeletedDate = todayShamsy8char()
    }
    //if (date != undefined) {
    //    today = date
    //    $(".PersianDatePickerEditTaskS").val(foramtDate(date))
    //}


    var obj = {}
    obj.url = "/Task/ListTaskAnjamShode"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = { date: SeletedDate }
    var results = await Promise.all([
        service(obj)
    ]);
    var result = results[0]

    



    if (result.lstvmTask.length > 0) {
        var table = "<span class='smoke'  style='color:black'>" + calDayOfWeek(result.lstvmTask[0].dateEnd) + "    </span>" +
            "<span class='smoke' style='color:black'>" + foramtDate(result.lstvmTask[0].dateEnd) + "</span>" +
            "<table class='table table-bordered' style='position: relative;z-index: 15;font-size: 9px;text-align: center;color:white;background-image: linear-gradient(to left, #405dc5, #010b17);'>"
        table += "<tr>" +
            "<th>ردیف</th>" +
            "<th>گروه</th>" +
            "<th>عنوان</th>" +
            "<th>امتیاز</th>" +
            "<th>ویرایش</th>" +
            "<th>حذف</th>" +
            "</tr>"
        var sum = 0;
        for (let index = 0; index < result.lstvmTask.length; index++) {
            sum += result.lstvmTask[index].rate
            table += "<tr>" +
                "<td>" + (index + 1) + "</td>" +
                "<td>" + result.lstvmTask[index].title + "</td>" +
                "<td style='text-align: justify;padding: 5px;'>" + result.lstvmTask[index].name + "</td>" +
                "<td>" + result.lstvmTask[index].rate + "</td>" +
                "<td><input value='ویرایش' type='button' onclick=' EditTask(" + result.lstvmTask[index].taskId + ")'/></td>" +
                "<td><input value='حذف' type='button' onclick='DeleteTask({Id:" + result.lstvmTask[index].taskId + "})'/></td>" +

                "</tr>"
        }
        table += "<tr style='color:red;font-size:14px;'><td colspan=3>مجموع</td><td>" + sum + "</td></tr>"
        table += "</table>"

        $(".ShowSumRate").empty()
        $(".ShowSumRate").append("<button type='button' class='btn' style='background-color: #4430c5;color:white'>" + sum + "</button>")

    }
    var showRateTaskDays = "<div style='font-size:11px'><table  style='position: relative;z-index: 15;background-image: linear-gradient(to left, rgba(0, 0, 0, 0), #fea);' class='table table-bordered'>"
    for (let index = 0; index < result.lstvmTask2.length; index++) {

        if (index % 5 == 0) {
            showRateTaskDays += "<tr><td><span style='cursor:pointer' onclick='ListTaskAnjamShode(" + result.lstvmTask2[index].dateEnd + ")'>" + foramtDate(result.lstvmTask2[index].dateEnd) + " : </span><span>" + result.lstvmTask2[index].rate + "</span></td>"
        }
        else {

            showRateTaskDays += "<td><span style='cursor:pointer' onclick='ListTaskAnjamShode(" + result.lstvmTask2[index].dateEnd + ")'>" + foramtDate(result.lstvmTask2[index].dateEnd) + " : </span><span>" + result.lstvmTask2[index].rate + "</span></td>"
        }
        if (index % 5 == 4) {
            showRateTaskDays += "</tr>"
        }
    }
    showRateTaskDays += "</table></div>"
    $(".ListTaskAnjamShode").empty()
    // $(".ListTaskAnjamShode span").remove()

    $(".ListTaskAnjamShode").append(table)
    $(".ListTaskAnjamShode").append(showRateTaskDays)

    $.LoadingOverlay("hide");
}

async function GetDateEvent(date) {

    var obj = {}
    obj.url = "/Taghvim/GetDateEvent"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = { date: date }

    var obj2 = {}
    obj2.url = "/Task/GetDateEvent"
    obj2.dataType = "json"
    obj2.type = "post"
    obj2.data = { date: date }

    var results = await Promise.all([
        service(obj),
        service(obj2)
    ]);
    var result = results[0]
    var result2 = results[1]
    

    var table = ""

    
    if (result != null) {
        table += "<p  style='color:white;background-image: linear-gradient(45deg, #6be8a9, rgba(0,0,0,.9));text-align: center;font-weight: bold;font-size: 20px;'>تقویم</p>"
        table += "<p>" + result.dsc + "</p>"
    }
    if (result2.length > 0) {
        table += "<p  style='color:white;background-image: linear-gradient(45deg, #6be8a9, rgba(0,0,0,.9));text-align: center;font-weight: bold;font-size: 20px;'>وظایف</p>"

        table += "<table class='table table-responsive'>"
        for (var i = 0; i < result2.length; i++) {
            if (i % 2 == 0)
                var style = ""
            else
                var style = "'background-color:#2b91ce42;'"

            table += "<tr style=" + style + ">"
            table += "<td>" + result2[i].cat.title + "</td><td>" + result2[i].name + "</td><td><span class='fa fa-edit pointer' onclick='EditTask(" + result2[i].taskId+")' style='display: inline;'></span></td>"
            table += "</tr>"
        }
        table += "</table>"
    }
    $(".ListTaghDetail").empty();
    $(".ListTaghDetail").append(table);
}
function Refresh() {
    ListTask();
    ListTimingForListTask();
    ListTaskAnjamShode()
    ShowListCat(2);
    CalenderListTagh()
}








