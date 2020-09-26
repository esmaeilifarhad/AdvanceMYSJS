//************************************Task*****************************************************

//--Execute All List when click Tab
$("ul li a[href='#menuTiming']").on("click", function () {

    // var s = $('input[name="chkTomarrow"]:checked');
    //ListTiming(0);

    if ($("input[name='chkTomarrow']").prop('checked') == true) {
        ListTiming(1);
    }
    else {
        ListTiming(0);
    }

});
//--------------------
$("ul li a[href='#menuTaskGeneral']").on("click", function () {
    ListTaskGeneral();
});
$("ul li a[href='#menuTaskFuture']").on("click", function () {
    ListTaskFuture();
    ListTaskFutureChk();
});
function ListTaskFutureChkPost(MyArray) {

    $.ajax(
        {
            type: 'Post',
            data: JSON.stringify({ MyData: MyArray }),
            contentType: "application/json;charset=utf-8",
            dataType: "html",
            url: "/Task/ListTaskFutureChkPost",
            success: function (result) {

                if (result.result == false) {
                    alert(result.message)
                }
                else {
                    $(".ListTaskFuture").html(result);
                }

            },
            error: function (error) {
                $(".ListTaskFuture").html("<p>موردی برای مشاهده وجود ندارد</p>")
            }
        });
}
function ListTaskFuture() {
    var urll = "/Task/ListTaskFuture";
    $.ajax({
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "html",
        url: urll,
        success: function (result) {

            if (result.result == false) {
                alert(result.message)
            }
            else {
                $(".ListTaskFuture").html(result);
            }

        },
        error: function (error) {

            console.log(error);
        }
    })

}
function ListTaskFutureChk() {
    var urll = "/Task/ListTaskFutureChk";
    $.ajax({
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "html",
        url: urll,
        success: function (result) {

            if (result.result == false) {
                alert(result.message)
            }
            else {
                $(".ListTaskFutureChk").html(result);
            }

        },
        error: function (error) {

            console.log(error);
        }
    })

}
//----------------------
$("#menuTiming").on("click", "input[name='chkTomarrow']", function () {

    if ($("input[name='chkTomarrow']").prop('checked') == true) {
        ListTiming(1);
    }
    else {
        ListTiming(0);
    }

});
//-----Edit Task Event
$(".ListTask").on("click", ".TblTask .fa-edit", function () {
    var TaskId = $(this).attr("Data_id");
    // alert(TaskId)
    EditTask(TaskId);
});

$(".ListTiming").on("click", "div table tbody tr td  .Ti", function () {
    var TaskId = $(this).attr("Data_id");
    TimingTask(TaskId);
})
$("Body").on("click", ".calendarTask", function () {
    var TaskId = $(this).attr("Data_id");
    TimingTask(TaskId);
});

$("body").on("click", ".Ta", function () {
    var TaskId = $(this).attr("Data_id");
    // alert(TaskId)
    EditTask(TaskId);
})
//------ListTaskAnjamNashode
$("#menu4 input[name='task']").on("click", function () {


    //console.log($("input[type='radio'][name='task']:checked").val())
    var ValOfRadio = $("input[type='radio'][name='task']:checked").val();
    var typeTask;
    switch (ValOfRadio) {
        case "anjamshode":
            typeTask = "anjamshode"; return
            break;
        case "anjamnashode":
            typeTask = "anjamnashode";
            break;
        case "gheirefal":
            typeTask = "gheirefal";
            break;
        default:
            typeTask = "";
            break;
    }
    ListTask(typeTask)

});
//ShowCreateTask
$("Body").on("click", ".CreateNewTask", function () {
    var CatId = $(this).attr("CatId");
    CreateTaskView(CatId);
});
function CreateTaskView(CatId) {


    var urll = "/Task/CreateTaskView?CatId=" + CatId;
    $.ajax({
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "html",
        url: urll,
        success: function (result) {

            var tablebutt = "<table class='table' style='font-size: 9px;'>"
            tablebutt += "<tr>" +
                "<td><input type='button' style='background-color:green' value='ذخیره' onclick='CreateTask()'/> | " +
                "<input type='button' value='بستن' onclick='closeModal()'/></td>" +
                "</tr>"
            tablebutt += "</table>"

            $(".modal-footer").empty();

            $(".modal-footer").append(tablebutt);

            $(".BodyModal").html(result);
            $("#MasterModal").modal();


            $(".BodyModal").html(result);
            $("#MasterModal").modal();
        }
    })
}
//-----------------------------
//Delete Timing
$("Body").on("click", ".DeleteTiming", function () {
    DeleteTiming();
});
function DeleteTiming() {
    $.ajax(
        {
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            url: "/Task/DeleteTiming",
            // data: JSON.stringify({ DateEnd: DateEnd, CatId: CatId }),
            success: function (result) {
                ListTaskGeneral();
                if (result.result == false) {
                    alert(result.message)
                }
            },
            error: function (error) {
                // alert(result.message);
                // alert(result.result)
                console.log(error.responseText);
            }
        });
}
//Delete Timeing Task
$("Body").on("click", ".removeTimeTask", function () {
    var TaskId = $(this).attr("Data_id");
    removeTimeTask(TaskId);
});
//Level Up Down
$("Body").on("click", ".TaskUpLevel", function () {
    var TaskId = $(this).attr("Data_id");
    TaskUpLevel(TaskId);
});
function TaskUpLevel(TaskId) {

    $.LoadingOverlay("show");
    $.ajax(
        {
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            url: "/Task/TaskUpLevel",
            data: JSON.stringify({ TaskId: TaskId }),
            success: function (result) {
                if (result == true) {
                    //  $("#ShowMessage").text('ثبت شد');
                    ListTask("anjamnashode");
                    RefreshTask();
                    if ($("input[name='chkTomarrow']").prop('checked') == true) {
                        ListTiming(1);
                    }
                    else {
                        ListTiming(0);
                    }
                }
                else {
                    $("#ShowMessage").text('خطا در ثبت');
                }
                $.LoadingOverlay("hide");
            },
            error: function (error) {
                console.log(error);
            }
        });
}
function ListTaslLevelHigh() {
    var urll = "/Task/ListTaslLevelHigh";
    $.ajax({
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "html",
        url: urll,
        success: function (result) {
            $(".footer-contact").html(result);
            //--------
        },
        error: function (error) {
            console.log("******start******")
            console.log("ListTaslLevelHigh : ");
            console.log(error)
            console.log("******end******")

        }
    })
}
$("Body").on("click", ".TaskDownLevel", function () {
    var TaskId = $(this).attr("Data_id");
    TaskDownLevel(TaskId);
});
function TaskDownLevel(TaskId) {
    $.LoadingOverlay("show");
    $.ajax(
        {
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            url: "/Task/TaskDownLevel",
            data: JSON.stringify({ TaskId: TaskId }),
            success: function (result) {
                if (result == true) {
                    //  $("#ShowMessage").text('ثبت شد');
                    ListTask("anjamnashode");
                    RefreshTask();
                    if ($("input[name='chkTomarrow']").prop('checked') == true) {
                        ListTiming(1);
                    }
                    else {
                        ListTiming(0);
                    }
                }
                else {
                    $("#ShowMessage").text('خطا در ثبت');
                }
                $.LoadingOverlay("hide");
            },
            error: function (error) {
                console.log("******start******")
                console.log("TaskDownLevel : ");
                console.log(error)
                console.log("******end******")

            }
        });
}
function removeTimeTask(TaskId) {
    $.ajax(
        {

            type: 'POST',
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            url: "/Task/removeTimeTask?TaskId=" + TaskId,
            // data: JSON.stringify({ DateEnd: DateEnd, CatId: CatId }),
            success: function (result) {
                ListTask("anjamnashode");
                if ($("input[name='chkTomarrow']").prop('checked') == true) {
                    ListTiming(1);
                }
                else {
                    ListTiming(0);
                }

                if (result.result == false) {
                    alert(result.message)
                }
            },
            error: function (error) {
                console.log("******start******")
                console.log("removeTimeTask : ");
                console.log(error.responseText)
                console.log("******end******")
            }
        });
}
function SearchTask(thiss) {
    //  console.log(thiss)
    var Name = $(thiss).val()
    if (Name.length <= 2) return

    // $.LoadingOverlay("show");
    $.ajax(
        {
            type: 'Post',
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            url: "/Task/SearchTask",

            data: JSON.stringify({ Name: Name }),
            success: function (result) {

                if (result.lstListTaskFuture.length == 0) {
                    $(".ListTaskAnjamShode").empty()

                    $(".ListTaskAnjamShode").append("<p>موردی پیدا نشد.</p>")


                    $.LoadingOverlay("hide");
                    return
                }
                var table = "<span>" + calDayOfWeek(result.lstListTaskFuture[0].DateEnd) + "</span>" + "<table class='table' style='font-size: 9px;'>"
                table += "<tr>" +
                    "<th>ردیف</th>" +
                    "<th>گروه</th>" +
                    "<th>عنوان</th>" +
                    "<th>امتیاز</th>" +
                    "<th>ویرایش</th>" +
                    "<th>حذف</th>" +
                    "</tr>"
                var sum = 0;
                for (let index = 0; index < result.lstListTaskFuture.length; index++) {
                    sum += result.lstListTaskFuture[index].Rate
                    table += "<tr>" +
                        "<td>" + (index + 1) + "</td>" +
                        "<td>" + result.lstListTaskFuture[index].Title + "</td>" +
                        "<td>" + result.lstListTaskFuture[index].Name + "</td>" +
                        "<td>" + result.lstListTaskFuture[index].Rate + "</td>" +
                        "<td><input value='ویرایش' type='button' onclick=' EditTask(" + result.lstListTaskFuture[index].TaskId + ")'/></td>" +
                        "<td><input value='حذف' type='button' onclick=' DeleteTask({Id:" + result.lstListTaskFuture[index].TaskId + "})'/></td>" +

                        "</tr>"
                }
                table += "<tr style='color:red;font-size:14px;'><td colspan=3>مجموع</td><td>" + sum + "</td></tr>"
                table += "</table>"


                //  $(".ListTaskAnjamShode table").remove()
                //  $(".ListTaskAnjamShode span").remove()
                $(".ListTaskAnjamShode").empty()


                $(".ListTaskAnjamShode").append(table)


                // $.LoadingOverlay("hide");
            }
        });

}
function ListTaskAnjamShode(date) {

    $.LoadingOverlay("show");

    var today = $("#menu4 .PersianDatePickerEditTaskS").val()// todayShamsy8char()

    today = convertDateToslashless(today)
    if (today == undefined) {
        today = todayShamsy8char()
    }
    if (date == undefined) {
        today = today
    }
    if (date != undefined) {
        today = date
        $(".PersianDatePickerEditTaskS").val(foramtDate(date))
    }
    $.ajax(
        {
            type: 'Post',
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            url: "/Task/ListTaskAnjamShode",

            data: JSON.stringify({ today: today }),
            success: function (result) {


                if (result.lstListTaskFuture.length > 0) {
                    var table = "<span>" + calDayOfWeek(result.lstListTaskFuture[0].DateEnd) + "    </span>" +
                        "<span>" + foramtDate(result.lstListTaskFuture[0].DateEnd) + "</span>" +
                        "<table class='table-bordered' style='position: relative;z-index: 15;font-size: 9px;text-align: center;color:white;background-image: linear-gradient(to left, #405dc5, #010b17);'>"
                    table += "<tr>" +
                        "<th>ردیف</th>" +
                        "<th>گروه</th>" +
                        "<th>عنوان</th>" +
                        "<th>امتیاز</th>" +
                        "<th>ویرایش</th>" +
                        "<th>حذف</th>" +
                        "</tr>"
                    var sum = 0;
                    for (let index = 0; index < result.lstListTaskFuture.length; index++) {
                        sum += result.lstListTaskFuture[index].Rate
                        table += "<tr>" +
                            "<td>" + (index + 1) + "</td>" +
                            "<td>" + result.lstListTaskFuture[index].Title + "</td>" +
                            "<td style='text-align: justify;padding: 5px;'>" + result.lstListTaskFuture[index].Name + "</td>" +
                            "<td>" + result.lstListTaskFuture[index].Rate + "</td>" +
                            "<td><input value='ویرایش' type='button' onclick=' EditTask(" + result.lstListTaskFuture[index].TaskId + ")'/></td>" +
                            "<td><input value='حذف' type='button' onclick='DeleteTask({Id:" + result.lstListTaskFuture[index].TaskId + "})'/></td>" +

                            "</tr>"
                    }
                    table += "<tr style='color:red;font-size:14px;'><td colspan=3>مجموع</td><td>" + sum + "</td></tr>"
                    table += "</table>"

                    $(".ShowSumRate").empty()
                    $(".ShowSumRate").append("<button type='button' class='btn' style='background-color: #4430c5;color:white'>" + sum + "</button>")

                }
                var showRateTaskDays = "<div style='font-size:11px'><table  style='position: relative;z-index: 15;background-image: linear-gradient(to left, rgba(0, 0, 0, 0), #fea);' class='table-bordered'>"
                for (let index = 0; index < result.lstRateTaskDays.length; index++) {

                    if (index % 5 == 0) {
                        showRateTaskDays += "<tr><td><span style='cursor:pointer' onclick='ListTaskAnjamShode(" + result.lstRateTaskDays[index].DateEnd + ")'>" + foramtDate(result.lstRateTaskDays[index].DateEnd) + " : </span><span>" + result.lstRateTaskDays[index].Rate + "</span></td>"
                    }
                    else {

                        showRateTaskDays += "<td><span style='cursor:pointer' onclick='ListTaskAnjamShode(" + result.lstRateTaskDays[index].DateEnd + ")'>" + foramtDate(result.lstRateTaskDays[index].DateEnd) + " : </span><span>" + result.lstRateTaskDays[index].Rate + "</span></td>"
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
        });
}
async function DeleteTask(obj) {

    $.LoadingOverlay("show");
    var objEditTask = {}
    objEditTask.url = "/Task/EditTask"
    objEditTask.dataType = "json"
    objEditTask.type = "post"
    // objListTaskAnjamnashode.data=JSON.stringify({typeTask:typeTask,MyData: MyArray })
    objEditTask.data = { TaskId: obj.Id }
    //var res=await service(obj);

    var results = await Promise.all([
        service(objEditTask)
    ]);
    var ListtObjEditTask = results[0]

    $.LoadingOverlay("hide");
    var res2 = await customConfirm({ title: "<p style='font-size:12px;font-weight:100'>" + ListtObjEditTask.Task.Name + "</p>", text: "آیا حذف انجام شود ؟", cancelButtonText: "خیر", confirmButtonText: "بلی" })

    // var result = confirm("آیا حذف انجام شود");
    if (res2.value == true) {


        $.ajax(
            {
                type: 'POST',
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                url: "/Task/DeleteTask",

                data: JSON.stringify({ Id: obj.Id }),
                success: function (result) {

                    if (result == true) {

                        showAlert("حذف با موفقیت انجام شد")
                        ListTask("anjamnashode");
                        RefreshTask();
                    }
                    else {
                        $("#ShowMessage").text('خطا در حذف');
                    }
                },
                error: function (error) {

                    $("body div").remove()
                    $("body").append(error.responseText)
                    alert(error)
                }
            });
    }
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
    var ListtObjEditTask = results[0]
    //console.log(ListtObjEditTask)

    var table = "<div class='form-group'>" +
        "تاریخ شروع<input type='text' placeholde='تاریخ شروع' name='DateStart' class='PersianDatePickerDateStart' value=" + foramtDate(ListtObjEditTask.Task.DateStart) + " autocomplete='off'  >" +
        "تاریخ پایان<input type='text' placeholde='تاریخ پایان' name='DateEnd' class='PersianDatePickerDateEnd' value=" + foramtDate(ListtObjEditTask.Task.DateEnd) + " autocomplete='off'  >" +
        "توضیحات<textarea  name='Name' class='form-control'  rows='6'>" + ListtObjEditTask.Task.Name + "</textarea>" +
        "نوع <br/><select class='MYSelect'>"
    
    for (let index = 0; index < ListtObjEditTask.ListCat.length; index++) {
        if (ListtObjEditTask.ListCat[index].CatId == ListtObjEditTask.Task.CatId) {
            table += " <option Selected  value=" + ListtObjEditTask.ListCat[index].CatId + ">" + ListtObjEditTask.ListCat[index].Title + "</option>"
        }
        else {
            table += " <option value=" + ListtObjEditTask.ListCat[index].CatId + ">" + ListtObjEditTask.ListCat[index].Title + "</option>"
        }
    }
    table += "</select>"

    table += "<table>" +
        "<tr><td>درصد پیشرفت</td><td><input type='number' name='DarsadPishraft'  value=" + ListtObjEditTask.Task.DarsadPishraft + " min='0' max='100' autocomplete='off'  ></td></tr>" +
        "<tr><td>اولویت</td><td><input type='number' name='Olaviat'   value=" + ListtObjEditTask.Task.Olaviat + " min='0' max='5' autocomplete='off'  ></td></tr>" +
        "<tr><td>Rate</td><td><input type='number' name='Rate'   value=" + ListtObjEditTask.Task.Rate + "  min='0' max='5' autocomplete='off'  ></td></tr>"


    if (ListtObjEditTask.Task.IsActive == true) {
        table += "<tr><td>فعال</td><td><input name='TaskIsActive' type='checkbox' checked/></td></tr>"
    }
    else {
        table += "<tr><td>فعال</td><td><input name='TaskIsActive' type='checkbox' /></td></tr>"
    }
    if (ListtObjEditTask.Task.IsCheck == true) {
        table += "<tr><td>انجام</td><td><input name='TaskIsCheck' type='checkbox' checked/></td></tr>"
    }
    else {
        table += "<tr><td>انجام</td><td><input name='TaskIsCheck' type='checkbox' /></td></tr>"
    }


    table += "</table></div >"

    //----------------


    var tablebutt = "<table><tr>" +
        "<td><input type='button' class='btn btn-success' value='ویرایش' onclick='UpdateTask(" + ListtObjEditTask.Task.TaskId + ")'/> | " +
        "<input type='button'  class='btn btn-danger' value='بستن' onclick='closeModal()'/></td>" +
        "</tr>"
    tablebutt += "</table>"



    $("#MasterModal .BodyModal").empty();
    $("#MasterModal .modal-footer").empty();

    $("#MasterModal .BodyModal").append(table);
    $("#MasterModal .modal-footer").append(tablebutt);
    $("#MasterModal").modal();


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
$("Body").on("click", ".ChangeTodayTask", function () {
    var CatId = $(this).attr("CatId");
    ChangeTodayTask(CatId);
});
function ChangeTodayTask(CatId) {
    var urll = "/Task/ChangeTodayTask?CatId=" + CatId;
    $.ajax({
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "html",
        url: urll,
        success: function (result) {

            var tablebutt = "<table class='table' style='font-size: 9px;'>"
            tablebutt += "<tr>" +
                "<td><input type='button' style='background-color:green' value='ذخیره' onclick='ChangeTodayTaskPost(" + CatId + ")'/> | " +
                "<input type='button' value='بستن' onclick='closeModal()'/></td>" +
                "</tr>"
            tablebutt += "</table>"



            $(".modal-footer").empty();
            $(".modal-footer").append(tablebutt);

            $(".BodyModal").html(result);
            $("#MasterModal").modal();

            //--------
        },
        error: function (error) {
            console.log(error);
        }
    })
}
function ChangeTodayTaskPost(CatId) {
    var DateEnd = $("#MasterModal table input[name='DateEnd']").val()
    //var CatId = $("#MasterModal div[name='ChangeTodayTask'] table").attr("CatId");
    var chkIsTransfer = $("#MasterModal div[name='ChangeTodayTask'] table input[name='chkIsTransfer']").prop('checked');
    $.ajax(
        {

            type: 'POST',
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            url: "/Task/ChangeTodayTask?CatId=" + CatId + "&&DateEnd=" + DateEnd + "&&chkIsTransfer=" + chkIsTransfer,
            // data: JSON.stringify({ DateEnd: DateEnd, CatId: CatId }),
            success: function (result) {
                $("#MasterModal").modal("toggle");
                ListTaskGeneral();
                ListTask("anjamnashode");

                RefreshTask();
                if (result.result == false) {
                    alert("ChangeTodayTaskPost() : " + result.message)
                }
            },
            error: function (error) {
                // alert(result.message);
                // alert(result.result)
                alert("ChangeTodayTaskPost() : " + error.responseText);
            }
        });
}
function CreateTask() {
    // 
    var _CatId = $("#MasterModal table .MYSelect option:selected").val();
    var _Name = $("#MasterModal table textarea[name='Name']").val()
    //var _Name = $("#MasterModal table input[name='Name']").val()
    var _Olaviat = $("#MasterModal table input[name='Olaviat']").val()
    var Rate = $("#MasterModal table input[name='Rate']").val()
    var _DateEnd = $("#MasterModal table input[name='DateEnd']").val()

    
    var array = _DateEnd.split("/")
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

    $.ajax(
        {
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            url: "/Task/CreateTask",

            data: JSON.stringify({ Name: _Name, DateEnd: _DateEnd, Olaviat: _Olaviat, CatId: _CatId, Rate: Rate }),
            success: function (result) {
                if (result == true) {
                    $("#ShowMessage").text('ثبت شد');
                    ListTask("anjamnashode");
                    $("#MasterModal").modal("toggle");
                    RefreshTask();
                }
                else {
                    $("#ShowMessage").text('خطا در ثبت');
                }
            }
        });
}
function UpdateTask(TaskId) {

    var CatId = $("#MasterModal  .MYSelect option:selected").val();
    var Name = $("#MasterModal  textarea[name='Name']").val()
    var Olaviat = $("#MasterModal table input[name='Olaviat']").val()
    var Rate = $("#MasterModal table input[name='Rate']").val()
    var DarsadPishraft = $("#MasterModal table input[name='DarsadPishraft']").val()
    var DateEnd = $("#MasterModal  input[name='DateEnd']").val()
    var DateStart = $("#MasterModal  input[name='DateStart']").val()
    var IsActive = $("input[name='TaskIsActive']").prop('checked')
    var IsCheck = $("input[name='TaskIsCheck']").prop('checked')
    // var TaskId = $("#MasterModal table").attr("TaskId")

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
        alert("خطا در تاریخ : "+year_old + "/" + month_old + "/" + day_old)
        return
    }


    $.ajax(
        {
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            url: "/Task/UpdateTask",
            data: JSON.stringify({ TaskId: TaskId, DateStart: DateStart, DateEnd: DateEnd, IsActive: IsActive, IsCheck: IsCheck, DarsadPishraft: DarsadPishraft, Name: Name, Olaviat: Olaviat, CatId: CatId, Rate: Rate }),
            success: function (result) {
                $("#MasterModal").modal("toggle");
                if (result == true) {

                    ListTask("anjamnashode");
                    RefreshTask()

                    if ($("input[name='chkTomarrow']").prop('checked') == true) {
                        ListTiming(1);
                    }
                    else {
                        ListTiming(0);
                    }
                }
                else {
                    $("#ShowMessage").text('خطا در ثبت');
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
}
//نمایش لیست وظایف
async function ListTask(typeTask) {


    ListTimingForListTask(0)
    ListTaskAnjamShode();

    var MyArray = [];
    var lvl = '';
    $(".ListTaskFutureChk .Categories  input:checked").each(function () {

        lvl += $(this).val() + ",";

    });
    MyArray.push(lvl);

    $.LoadingOverlay("show");
    var s = typeTask
    // anjamnashode
    var objListTaskAnjamnashode = {}
    objListTaskAnjamnashode.url = "/Task/ListTaskAnjamnashode"
    objListTaskAnjamnashode.dataType = "json"
    objListTaskAnjamnashode.type = "post"
    // objListTaskAnjamnashode.data=JSON.stringify({typeTask:typeTask,MyData: MyArray })
    objListTaskAnjamnashode.data = { typeTask: typeTask, MyData: MyArray }
    //var res=await service(obj);

    var results = await Promise.all([
        service(objListTaskAnjamnashode)
    ]);
    var ListTaskAnjamnashode = results[0]




    var table = "<input style='cursor:pointer' type='button' value='انجام' onclick='changeToAnjamShode()'/><input style='cursor:pointer' type = 'button' value = 'حذف' onclick = 'RemoveAllTask()' />" +
        " <button type='button' /*class='btn btn-info'*/ onclick='transferDate(1)'>+1</button>" +
        " <button type='button' /*class='btn btn-warning'*/ onclick='transferDate(07)'>جمعه</button>" +
        " <button type='button' /*class='btn btn-danger'*/ onclick='transferDate(00)'>شنبه</button>" +
        " <button type='button' /*class='btn btn-success'*/ onclick='transferDate(0101)'>01/01</button>" +
        " <button type='button' /*class='btn btn-info'*/ onclick='transferDate(30)'>30</button>" +
           
        "<table id='tblListTaskDateToDate' class='table-bordered table-responsive table-striped TblTask' " +
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
            "<td><input Data_id=" + ListTaskAnjamnashode[index].TaskId + " class='AnjamShode'  type='checkbox'/></td>" +
            "<td class='Olaviat'>" + ListTaskAnjamnashode[index].Olaviat + "</td>" +
            "<td >" + ListTaskAnjamnashode[index].Rate + "</td>" +
            "<td><input type='button' style='background-color:green' class='fa fa-sort-up pointer ' onclick='TaskUpLevel(" + ListTaskAnjamnashode[index].TaskId + ")' Data_id='@item.TaskId'/></td>" +
            "<td><input type='button' style='background-color:red' class='fa fa-sort-down pointer  ' onclick='TaskDownLevel(" + ListTaskAnjamnashode[index].TaskId + ")'  Data_id='@item.TaskId'/></td>" +
            "<td>" + ListTaskAnjamnashode[index].Title + "</td>" +
            "<td style='text-align: right!important;'>" + ListTaskAnjamnashode[index].Name + "</td>" +
            "<td>" + foramtDate(ListTaskAnjamnashode[index].DateStart) + "<br/>" + calDayOfWeek(ListTaskAnjamnashode[index].DateStart) + "</td>" +
            "<td>" + foramtDate(ListTaskAnjamnashode[index].DateEnd) + "<br/>" + calDayOfWeek(ListTaskAnjamnashode[index].DateEnd) + "</td>" +
            "<td>" + ListTaskAnjamnashode[index].DarsadPishraft + "</td>" +
            "<td>" + ListTaskAnjamnashode[index].Gozashteh + "</td>" +
            "<td>" + ListTaskAnjamnashode[index].MandehRooz + "</td>" +
            "<td>" + ListTaskAnjamnashode[index].Label + "</td>" +
            "<td><span class='fa fa-calendar pointer calendarTask' onclick='TimingTask(" + ListTaskAnjamnashode[index].TaskId + ")' Data_id=" + ListTaskAnjamnashode[index].TaskId + "></span>" +
            "</br>" +
            "<span class='fa fa-remove pointer' onclick='removeTimeTask(" + ListTaskAnjamnashode[index].TaskId + ")'></span></td>" +
            "<td><span class='fa fa-edit pointer'     Data_id=" + ListTaskAnjamnashode[index].TaskId + "></span></td>" +
            "<td><span class='fa fa-remove pointer'   Data_id=" + ListTaskAnjamnashode[index].TaskId + " onclick=' DeleteTask({Id:" + ListTaskAnjamnashode[index].TaskId + "})'></span></td>" +
            "</tr>"
    }
    table += "</table>"

    $(".ListTask").empty();
    $(".ListTask").append(table);
    eachColorTask();
    $.LoadingOverlay("hide");


}
function TimingTask(TaskId) {
    var urll = "/Task/TimingTask?TaskId=" + TaskId;
    $.ajax({
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "html",
        url: urll,
        success: function (result) {
            var tablebutt = "<table class='table' style='font-size: 9px;'>"
            tablebutt += "<tr>" +
                "<td><input type='button' style='background-color:green' value='ذخیره' onclick='TimingPost()'/> | " +
                "<input type='button' value='بستن' onclick='closeModal()'/></td>" +
                "</tr>"
            tablebutt += "</table>"

            $(".modal-footer").empty();

            $(".modal-footer").append(tablebutt);

            $(".BodyModal").html(result);
            $("#MasterModal").modal();

            //--------
        },
        error: function (error) {
            console.log(error);
        }
    })
}
function ListTiming(x) {

    if (x == 0) {
        var urll = "/Task/ListTiming?x=" + x;
        $.ajax({
            type: "Get",
            contentType: "application/json;charset=utf-8",
            dataType: "html",
            url: urll,
            success: function (result) {
                if (result.result == false) {
                    alert(result.message)
                    console.log(result.message)
                }
                else {
                    $(".ListTiming").html(result);
                    timeOff();
                    ListTaskGeneral();
                }
                //--------
            },
            error: function (error) {
                console.log("ListTiming : " + error.message);
            }
        })
    }
    if (x == 1) {
        var urll = "/Task/ListTiming?x=" + x;
        $.ajax({
            type: "Get",
            contentType: "application/json;charset=utf-8",
            dataType: "html",
            url: urll,
            success: function (result) {
                // var obj = data;
                //var obj = JSON.parse(data);
                $(".ListTiming").html(result);
                timeOff();

                //--------
            },
            error: function (error) {
                console.log(error);
            }
        })
    }
}
async function ListTimingForListTask(x) {
    var d = new Date();
    var currentHour = d.getHours();

    $.LoadingOverlay("show");

    var objListTaskAnjamnashode = {}
    objListTaskAnjamnashode.url = "/Task/ListTimingForListTask";
    objListTaskAnjamnashode.dataType = "json"
    objListTaskAnjamnashode.type = "post"

    objListTaskAnjamnashode.data = { x: 0 }


    var results = await Promise.all([
        service(objListTaskAnjamnashode)
    ]);
    var ListTaskAnjamnashode = results[0]
    var table = "<table class='table table-responsive' style='position: relative;z-index: 15;font-size:9px;text-align: center;background-image: linear-gradient(to left, #ded4ab, #dae6f3);'>" +
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


        table += "<td><input type='button' style='background-color:green' class='fa fa-sort-up pointer' onclick='TaskUpLevel(" + ListTaskAnjamnashode[i].TaskId + ")'/><input type='button' style='background-color:red' class='fa fa-sort-down pointer' onclick='TaskDownLevel(" + ListTaskAnjamnashode[i].TaskId + ")'/></td>" +
            "<td style='white-space: nowrap;'>" + ListTaskAnjamnashode[i].Olaviat + "</td>" +
            "<td style='text-align:right'>" + ListTaskAnjamnashode[i].Name.substring(0, 40) + " ... </td>" +
            "<td>" + ListTaskAnjamnashode[i].Rate + "</td>" +
            "<td>" + foramtDate(ListTaskAnjamnashode[i].DateEnd) + "<br/>" + calDayOfWeek(ListTaskAnjamnashode[i].DateEnd) + "</td>" +
            "<td style='white-space: nowrap;'>" + ListTaskAnjamnashode[i].Label + "</td>" +
            "<td><span class='fa fa-calendar pointer' onclick='TimingTask(" + ListTaskAnjamnashode[i].TaskId + ")'></span></td>" +
            "<td><span class='fa fa-remove pointer' onclick='removeTimeTask(" + ListTaskAnjamnashode[i].TaskId + ")'></span></td>" +


            "<td><span class='fa fa-edit pointer' onclick='EditTask(" + ListTaskAnjamnashode[i].TaskId + ")' style='display: inline;'></span></td>" +
            "<td><input type='checkbox' class='pointer' onclick='UpdateTask2({TaskId:" + ListTaskAnjamnashode[i].TaskId + ",IsCheck:true})'/></td>" +
            "</tr>"
    }
    table += "</table>"
    $(".ListTaskTiming").empty();
    $(".ListTaskTiming").append(table);

    $.LoadingOverlay("hide");
}
function ListTaskGeneral() {
    var urll = "/Task/ListTaskGeneral";
    $.ajax({
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "html",
        url: urll,
        success: function (result) {
            if (result.result == false) {
                alert(result.message)
            }
            else {
                $(".ListTaskGeneral").html(result);
            }

        },
        error: function (error) {
            console.log(error);
        }
    })

}
$("body").on("click", ".AllCatChecked", function () {
    $(".ListTaskFutureChk").each(function () {
        $("input").attr("checked", true);
    });
});
$(".ListTaskFutureChk").on("click", "input", function () {

    var MyArray = [];
    var lvl = '';
    $(".ListTaskFutureChk .Categories  input:checked").each(function () {

        lvl += $(this).val() + ",";

    });
    MyArray.push(lvl);

    if ($(this).parent().parent().parent().parent().parent().parent().parent().attr("type") == "ListTask") {
        ListTask("anjamnashode")
    }
    else {

        ListTaskFutureChkPost(MyArray);
    }
});
function RefreshChk() {

    var MyArray = [];
    var lvl = '';
    $(".ListTaskFutureChk .Categories input:checked").each(function () {
        //  console.log($(this).val())
        lvl += $(this).val() + ",";

    });
    MyArray.push(lvl);
    ListTaskFutureChkPost(MyArray);
}
function TimingPost() {

    var ManageTimeId = $("#MasterModal .MYSelect option:selected").val();
    var TaskId = $("#MasterModal div[name='UpdateTiming'] table").attr("TaskId");

    $.ajax(
        {
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            url: "/Task/CreateTiming",
            data: JSON.stringify({ ManageTimeId: ManageTimeId, TaskId: TaskId }),
            success: function (result) {

                if (result == true) {
                    if ($("input[name='chkTomarrow']").prop('checked') == true) {
                        ListTiming(1);
                    }
                    else {
                        ListTiming(0);
                    }
                    ListTaskGeneral();
                    ListTask("anjamnashode");
                    $("#MasterModal").modal("toggle");
                    timeOff();
                    RefreshTask();
                }
                else {
                    alert("خطا در ثبت");
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
}
function eachColorTask() {
    $(".TblTask tr td:nth-child(2)").each(function () {
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
function timeOff() {
    $("#menuTiming .ListTiming  table tr td:nth-child(1)").each(function () {
        var valuee = ($(this).text());
        var d = new Date();
        var n = d.getHours();
        // var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        var TMinut = d.getMinutes();
        var TSec = d.getSeconds();
        //alert(TMinut);
        //alert(TSec);

        if (TMinut < 2 && valuee == n) {
            //alert("okk");
            // alert($(this).next().next().text());
        }

        if (valuee < n) {
            $(this).parent().css({ "color": "red" });
        }
        if (valuee == n) {
            $(this).parent().css({ "color": "green" });
        }
    });
}
async function changeToAnjamShode() {

    $.LoadingOverlay("show");
    var obj = {}
    var count = $(".TblTask tr td .AnjamShode").length
    var i = 0;
    $(".TblTask tr td .AnjamShode").each(async function () {
        i += 1;
        if ($(this).is(':checked')) {
            // checked
            obj.IsCheck = true
            obj.TaskId = $(this).attr("Data_id")

            var x = await UpdateTask2(obj)

        }
        else {
            // unchecked

        }

        if (count == i) {

            ListTask("anjamnashode");



            $.LoadingOverlay("hide");
            // resolve("finish")
        }

    })

}
//نمایش از تاریخ تا تاریخ برای حذف
async function ShowStDateEndDate() {

    var obj = {}
    obj.url = "/Task/FirstDateTask"
    obj.dataType = "json"
    obj.type = "post"
    //obj.data={TedadRooz:TedadRooz}
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]
    var Yesterday = foramtDate(convertDateToslashless(SelectDate(-1)))


    table = "<table class='table'>" +
        "<tr>" +
        "<th>از تاریخ</th>" +
        "<th>تا تاریخ</th>" +
        "<th></th>" +
        "</tr > " +
        "<tr > " +
        "<td><input type='text' name='DateS'  autocomplete='off' value='" + foramtDate(ListObj.DateEnd) + "' placeholder=''></td>" +
        "<td><input type='text' name='DateE'  autocomplete='off' value='" + Yesterday + "' placeholder=''></td>" +
        "<td><input type='button'  value='جستجو' class='btn btn-danger' onclick='ListTaskDateToDate({Date1:\"" + Yesterday + "\",Date2:\"" + foramtDate(ListObj.DateEnd) + "\"})'><input type='button' value='اکسل' onclick='CreateExcel()'/></td>" +
        "</tr > " +
        "</table > "
    $(".ShowStDateEndDate").empty()
    $(".ShowStDateEndDate").append(table)

}
async function ListTaskDateToDate(objDate) {
    var DateS = $("input[name='DateS']").val()
    var DateE = $("input[name='DateE']").val()

    $.LoadingOverlay("show");
    var obj = {}
    obj.url = "/Task/ListTaskDateToDate"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = { Date1: convertDateToslashless(DateS), Date2: convertDateToslashless(DateE) }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]

    var table = "<table><tr><td><input type='button' value='حذف' onclick='RemoveAllTask()'/></td></tr></table>"
    table += "<table id='tblListTaskDateToDate' class='table-bordered table-responsive table-striped' " +
        " style='direction: rtl; text-align: center;font-size:11px'>" +

        "     <tr>" +
        "         <th><input   type='checkbox' onclick='selectAllchk(this)' /></th>" +
        "         <th>اولویت</th>" +
        "         <th>Rate</th>" +
        "         <th>بالا</th>" +
        "         <th>پایین</th>" +

        "         <th>عنوان وظیف</th>" +
        "         <th>تاریخ شروع</th>" +
        "         <th>تاریخ پایان</th>" +

        "         <th>زمان بندی</th>" +
        "         <th>ویرایش</th>" +
        "         <th>حذف</th>" +
        "     </tr>"
    for (let index = 0; index < ListObj.length; index++) {

        table += "<tr>" +
            "<td><input Data_id=" + ListObj[index].TaskId + " class='AnjamShode'  type='checkbox'/></td>" +
            "<td class='Olaviat'>" + ListObj[index].Olaviat + "</td>" +
            "<td >" + ListObj[index].Rate + "</td>" +
            "<td><input type='button' style='background-color:green' class='fa fa-sort-up pointer ' onclick='TaskUpLevel(" + ListObj[index].TaskId + ")' Data_id='@item.TaskId'/></td>" +
            "<td><input type='button' style='background-color:red' class='fa fa-sort-down pointer  ' onclick='TaskDownLevel(" + ListObj[index].TaskId + ")'  Data_id='@item.TaskId'/></td>" +

            "<td style='text-align: right!important;'>" + ListObj[index].Name + "</td>" +
            "<td>" + foramtDate(ListObj[index].DateStart) + "<br/>" + calDayOfWeek(ListObj[index].DateStart) + "</td>" +
            "<td>" + foramtDate(ListObj[index].DateEnd) + "<br/>" + calDayOfWeek(ListObj[index].DateEnd) + "</td>" +

            "<td><span class='fa fa-calendar pointer calendarTask' onclick='TimingTask(" + ListObj[index].TaskId + ")' Data_id=" + ListObj[index].TaskId + "></span>" +
            "</br>" +
            "<span class='fa fa-remove pointer' onclick='removeTimeTask(" + ListObj[index].TaskId + ")'></span></td>" +
            "<td><span class='fa fa-edit pointer'     onclick='EditTask(" + ListObj[index].TaskId + ")'></span></td>" +
            "<td><span class='fa fa-remove pointer'   Data_id=" + ListObj[index].TaskId + " onclick=' DeleteTask({Id:" + ListObj[index].TaskId + "})'></span></td>" +
            "</tr>"
    }
    table += "</table>"


    $(".ListTask").empty();
    $(".ListTask").append(table);

    $.LoadingOverlay("hide");

}
async function RemoveAllTask() {

    var arrayTaskId = []

    var objData = {}
    var count = $("#tblListTaskDateToDate tr td .AnjamShode").length
    var countChecked = $("#tblListTaskDateToDate tr td .AnjamShode").filter(':checked').length
    if (countChecked == 0) {
        alert("لطفا یک مورد را انتخاب نمایید")
        return
    }
    var i = 0;
    $("#tblListTaskDateToDate tr td .AnjamShode").each(async function () {
        i += 1;
        if ($(this).is(':checked')) {
            // checked
            //  obj.IsCheck = true
            objData.TaskId = $(this).attr("Data_id")
            arrayTaskId.push(objData.TaskId)

            // var x = await UpdateTask2(obj)

        }
        else {
            // unchecked

        }

        if (count == i) {
            $.LoadingOverlay("show");

            var obj = {}
            obj.url = "/Task/RemoveAllTask"
            obj.dataType = "json"
            obj.type = "post"
            obj.data = { TasKIds: arrayTaskId }
            var results = await Promise.all([
                service(obj)
            ]);
            var ListObj = results[0]
            alert("تعداد " + ListObj + " رکورد حذف گردید")

            // ListTaskDateToDate()
            ShowStDateEndDate()
            ListTask("anjamnashode");
            $.LoadingOverlay("hide");
            // resolve("finish")
        }

    })

}
async function selectAllchk(s) {

    var res = $(s)[0].checked;
    // var count=0
    if (res == true) {
        $("#tblListTaskDateToDate  tr td .AnjamShode").each(function () {

            this.checked = true
        })

    }
    else {
        $("#tblListTaskDateToDate  tr td .AnjamShode").each(function () {
            this.checked = false
        })
    }

}
async function CreateExcel() {
    
    return
    var obj = {}
    obj.url = "/Task/ReportExcel"
    obj.dataType = "json"
    obj.type = "post"
    obj.data={firstDate:"13990202"}
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]
}
//انتقال به فردا
async function transferDate(str) {

    $.LoadingOverlay("show");
    var obj = {}
    var count = $(".TblTask tr td .AnjamShode").length
    var i = 0;
    $(".TblTask tr td .AnjamShode").each(async function () {
        i += 1;
        if ($(this).is(':checked')) {

            obj.DateEnd = NewOldDate(str)
            obj.TaskId = $(this).attr("Data_id")

            var x = await UpdateTask2(obj)

        }
        else {
            // unchecked

        }

        if (count == i) {
            ListTask("anjamnashode");

            $.LoadingOverlay("hide");
            // resolve("finish")
        }

    })

}

function UpdateTask2(obj) {

    return new Promise(resolve => {
        $.ajax(
            {
                type: 'POST',
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                url: "/Task/UpdateTask",
                data: JSON.stringify({ TaskId: obj.TaskId, DateEnd: obj.DateEnd, IsCheck: obj.IsCheck }),
                success: function (result) {
                    ListTask("anjamnashode")
                    resolve(result)

                },
                error: function (error) {

                    console.log(error.responseText)
                }
            });
    })
}

function Uploader() {

    // Checking whether FormData is available in browser  
    if (window.FormData !== undefined) {

        var fileUpload = $("#fileInput").get(0);
        var files = fileUpload.files;

        // Create FormData object  
        var fileData = new FormData();

        // Looping over all files and add it to FormData object  
        for (var i = 0; i < files.length; i++) {
            fileData.append(files[i].name, files[i]);
        }

        // Adding one more key to FormData object  
        //  fileData.append('username','Manas');  

        $.ajax({
            url: '/Task/UploadFiles',
            type: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            success: function (result) {
                alert(result);
            },
            error: function (err) {
                console.log(err.statusText)
                alert(err.statusText);
            }
        });
    } else {
        alert("FormData is not supported.");
    }

}
//نمایش تقویم
async function Calender(status) {
    var today = todayShamsy()
    var splitdate = today.split('/');
    var year = ""
    var month=""
    if (status == true) {
        year = parseInt($("#year option:selected").val());
        month = parseInt($("#month option:selected").val());
    }
    else {
        

        

        var year = parseInt(splitdate[0])
        var month = parseInt(splitdate[1])
    }
    
    // $.LoadingOverlay("show");
    
    var obj = {}
    obj.url = "/Task/ListTaskMonth"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = { date: year + "" + (month < 10 ? "0" + month : month) }

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

            table += "<td onclick='showDayTask(" + dateSelect+")'>"
            if (calDayOfWeeknumber(dateSelect) == i) {

                //  var res = ListtObj.find(x => x.DateEnd == year + "" + (month < 10 ? "0" + month : month) + (k < 10 ? "0" + k : k));

                var res = ListtObj.filter(function (x) {

                    return x.DateEnd == dateSelect;
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
            tableHeader += "<option selected value="+i+"  >" + i + "</option>"
        }
        else {
            tableHeader += "<option value=" + i +" >" + i + "</option>"
        }
        
    }
    tableHeader += "</select></td><td>"
    tableHeader += "<select onchange='Calender(true)' id='year'>"
    for (var i = 1250; i <= 1500; i++) {
        if (i == year) {
            tableHeader += "<option selected value=" + i +"  >" + i + "</option>"
        }
        else {
            tableHeader += "<option value=" + i +" >" + i + "</option>"
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
async function showDayTask(date) {

    var obj = {}
    obj.url = "/Task/showDayTask"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = { date: date}

    var results = await Promise.all([
        service(obj)
    ]);
    var ListtObj = results[0]
    
    //var table = "<table>"
    //for (var i = 0; i < ListtObj.length; i++) {
    //    table += "<tr>"
    //    table += "<td>"
    //    table += ListtObj[i].Name
    //    table += "</td>"
    //    table += "</tr>"
    //}
    //table += "</table>"


    var table = "<div>"+
        "<table class='table table-responsive'>"+
        "<tr><td>"+
        "<input style = 'cursor:pointer' type ='button' value ='انجام' onclick = 'changeToAnjamShode()' /> " +
        "<input style='cursor:pointer' type='button' value='حذف' onclick='RemoveAllTask()' />" +
       "</td><tr><tr><td>"+
        " <button type='button' /*class='btn btn-info'*/ onclick='transferDate(1)'>+1</button>" +
        " <button type='button' /*class='btn btn-warning'*/ onclick='transferDate(07)'>جمعه</button>" +
        " <button type='button' /*class='btn btn-danger'*/ onclick='transferDate(00)'>شنبه</button>" +
        " <button type='button' /*class='btn btn-success'*/ onclick='transferDate(0101)'>01/01</button>" +
        " <button type='button' /*class='btn btn-info'*/ onclick='transferDate(30)'>30</button>" +

        "</td></tr></table>"+
        "</div>"+
        "<table id='tblListTaskDateToDate' class='table-bordered table-responsive table-striped TblTask'  style='direction: rtl; text-align: center;font-size:11px'>" +
        "     <tr>" +
        "         <th>انتخاب</th>" +
        "         <th>اولویت</th>" +
        "         <th>Rate</th>" +
        "         <th>بالا</th>" +
        "         <th>پایین</th>" +
        "         <th>نوع</th>" +
        "         <th>عنوان وظیف</th>" +
        "         <th>تاریخ شروع</th>" +
        "         <th>تاریخ پایان</th>" +

        "         <th>زمان بندی</th>" +
        "         <th>ویرایش</th>" +
        "         <th>حذف</th>" +
        "     </tr>"
    for (let index = 0; index < ListtObj.length; index++) {

        table += "<tr>" +
            "<td><input Data_id=" + ListtObj[index].TaskId + " class='AnjamShode'  type='checkbox'/></td>" +
            "<td class='Olaviat'>" + ListtObj[index].Olaviat + "</td>" +
            "<td >" + ListtObj[index].Rate + "</td>" +
            "<td><input type='button' style='background-color:green' class='fa fa-sort-up pointer ' onclick='TaskUpLevel(" + ListtObj[index].TaskId + ")' Data_id='@item.TaskId'/></td>" +
            "<td><input type='button' style='background-color:red' class='fa fa-sort-down pointer  ' onclick='TaskDownLevel(" + ListtObj[index].TaskId + ")'  Data_id='@item.TaskId'/></td>" +
            "<td>" + ListtObj[index].Title + "</td>" +
            "<td style='text-align: right!important;'>" + ListtObj[index].Name + "</td>" +
            "<td>" + foramtDate(ListtObj[index].DateStart) + "<br/>" + calDayOfWeek(ListtObj[index].DateStart) + "</td>" +
            "<td>" + foramtDate(ListtObj[index].DateEnd) + "<br/>" + calDayOfWeek(ListtObj[index].DateEnd) + "</td>" +

            "<td><span class='fa fa-calendar pointer calendarTask' onclick='TimingTask(" + ListtObj[index].TaskId + ")' Data_id=" + ListtObj[index].TaskId + "></span>" +
            "</br>" +
            "<span class='fa fa-remove pointer'       onclick='removeTimeTask(" + ListtObj[index].TaskId + ")'></span></td>" +
            "<td><span class='fa fa-edit pointer'     onclick='EditTask(" + ListtObj[index].TaskId + ")'></span></td>" +
            "<td><span class='fa fa-remove pointer'   Data_id=" + ListtObj[index].TaskId + " onclick=' DeleteTask({Id:" + ListtObj[index].TaskId + "})'></span></td>" +
            "</tr>"
    }
    table += "</table>"



    var tablebutt = "<table><tr>" +
        "<td><input type='button'  class='btn btn-danger' value='بستن' onclick='closeCalendar2()'/></td>" +
        "</tr>"
    tablebutt += "</table>"


    $("#Calendar2 .modal-header").empty();
    $("#Calendar2 .modal-header").append();

    $("#Calendar2 .BodyModal").empty();
    $("#Calendar2 .modal-footer").empty();

    $("#Calendar2 .BodyModal").append(table);
    $("#Calendar2 .modal-footer").append(tablebutt);
    $("#Calendar2").modal();
    
}
function uploadImage() {
    // var file = $("#fileInput").get(0);  
    var fileUpload = $("#fileInput").get(0);
    var files = fileUpload.files;

    var data = new FormData;
    data.append("ImageFile", files[0]);
    data.append("TaskId", 10);
    data.append("ImageName", "farhad");
    $.ajax({
        url: '/Task/ImageUpload',
        type: "POST",
        contentType: false, // Not to set any content header  
        processData: false, // Not to process data  
        data: data,
        success: function (TaskImageId) {

            $("body").append('<img src="/Task/ImageRetrieve?imgID=' + TaskImageId + '" class="img-responsive thumbnail" />')
        },
        error: function (err) {
            console.log(err.statusText)
            alert(err.statusText);
        }
    });

}
function ShowImg(TaskImageId) {

    $("body").append('<img src="/Task/ImageRetrieve?imgID=' + TaskImageId + '" with=50 height=100 class="img-responsive thumbnail" />')
}
function Documentt(id) {

    $.ajax({
        url: '/Task/RenderImageBytes',
        type: "POST",
        //contentType: false, // Not to set any content header  
        processData: false, // Not to process data 
        contentType: "application/json;charset=utf-8",
        dataType: "html",
        data: JSON.stringify({ id: id }),
        success: function (response) {
            //$("body").append(response)

            var img = "<img src='data:image/png;base64,' alt='Red dot' />"
            $("body").append(response)
        },
        error: function (err) {
            console.log(err.statusText)
            alert(err.statusText);
        }
    });
}
function RefreshTask() {
    RefreshChk();
    ListTaskGeneral();
    ListTaslLevelHigh();
    ListTiming(0);

}


function closeCalendar1() {
    $("#Calendar1").modal("toggle");
}

function closeCalendar2() {
    $("#Calendar2").modal("toggle");
}
