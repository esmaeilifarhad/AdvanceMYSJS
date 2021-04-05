function Dictionary() {
    $("#MasterPage").empty()

    var table = "<div style='text-align:center'><div class='btn-group' >" +
        "<button type='button' onclick='CreateUpdateWord()' class='btn btn-warning' >لغت جدید</button >" +
        "<button type='button'  class='btn btn-info' >...</button >" +
        "<div class='btn-group'>" +
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'> Sony</button>" +
        "<div class='dropdown-menu'>" +
        " <a class='dropdown-item' href='#'>Tablet</a>" +
        " <a class='dropdown-item' href='#'>Smartphone</a>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div ></br>"

    table += "<div class='container-fluid'>" +
        "<div class='row'>" +
        "<div class='col-lg-12'>" +
        "<div class='showLevel' ></div>" +
        " </div > " +
        " </div > " +

        "<div class='row'>" +
        "<div class='col-lg-12'>" +
        "<input onchange='SearchExample(this)' onclick='SearchExample(this)'  type='text' name='searchExample'  placeholder='seach in example' />" +
        "<input onchange='SearchWord(this)' onclick='SearchWord(this)'  type='text' name='searchWord'  placeholder='seach in Word' />" +
        "<div class='showListWordLevel' ></div>" +
        " </div > " +
        " </div > " +

        "<div class='row'>" +
        "<div class='col-lg-12'>" +
        "<div id='DicByDateMonthDateRefresh'></div>" +
        " </div > " +
        " </div > " +

        "</div>"

    $("#MasterPage").append(table)



    showLevel(10)
    ListWordLevel(10)
    ReportDicByDateMonthDateRefresh()
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
    var typeOfTask = localStorage.getItem("ShowTypeOfTask");
    var table = "<div style='text-align:center'><div class='btn-group' >" +
        "<button type='button' onclick='Calender()' class='btn btn-warning' >تقویم</button >" +
        "<button type='button' onclick='UpdateToToday()' class='btn btn-info' >انتقال به امروز</button >" +
        "<div class='btn-group'>" +
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'> Sony</button>" +
        "<div style='padding:5px'>" +
        "<input "+(typeOfTask==1?'checked':'')+" name='rdbTypeShowTask' type='radio' value=1  onclick='ShowTypeOfTask(1)'/>&nbsp<lable>به تفکیک وظایف</lable></br>" +
        "<input "+(typeOfTask == 2 ? 'checked' : '') +" name='rdbTypeShowTask' type='radio' value=2 onclick='ShowTypeOfTask(2)'/>&nbsp<lable >به ترتیب الویت</lable></br>" +
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
    "<div class='ListTaghDetail'></div>" +

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

   ShowListCat(2);
    RefreshTask()
   


  
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

    var table = "<div class='container-fluid'>" +
        "<div class='row'>" +
        "<div class='col-lg-4'>" +
        "<div class='showForm' ></div>" +
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
    listRoutineJob()
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
        " <div class='ListJob'></div>" +
        "</div > " +

        "<div class='col-md-5'>" +

        " <div class='ListAllJob'></div>" +
        "</div > " +

    "</div > " +

    "<div class='row'>" +
    "<div class='col-md-4'>" +
    " <div class='ListSetting'></div>" +
    "</div > " +
    "</div > " +



        "</div > "
    $("#MasterPage").append(table)
    ShowListTaghvim()
    ListCategory()
    ListAllJob()
    ListKarkardNew()
    Setting("ListSetting")
}
function Karkard() {
    $("#MasterPage").empty()
   var table =
       "<div class='container-fluid'>" +

        "<div class='row'>" +
        "<div class='col-md-12'>" +
        " <div class='ListKarkardNew'></div>" +
       "</div > " +
       "</div > " +

       "<div class='row'>" +
       "<div class='col-md-12'>" +
       " <div class='ListKarkard'></div>" +
       "</div > " +
       "</div > " +

        "</div > "
    $("#MasterPage").append(table)

    ListKarkardNew()
    showListKarkard()
}
function Note() {
    $("#MasterPage").empty()
    var table =
        "<div class='container-fluid'>" +

        "<div class='row'>" +
        "<div class='col-md-12'>" +
        " <div class='ListJob'></div>" +
        " <div class='listSubject'></div>" +
        " <div class='listNote'></div>" +
        "</div > " +
        "</div > " +

        "<div class='row'>" +
        "<div class='col-md-12'>" +
        " <div class='ListKarkard'></div>" +
       
        "</div > " +
        "</div > " +

        "</div > "
    $("#MasterPage").append(table)
    ListJobsInNotes()
}
async function CalSpendTimejob() {

    var obj = {}
    obj.url = "/Category/IndexJobAll"
    obj.dataType = "json"
    obj.type = "post"
    //obj.data = {
    //    UpOrDown: objectWord.status,
    //    Id: objectWord.wordId

    //}
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]


    var table = "<table class='table-bordered table' style='text - align: center'>"
    table += "<tr><td></td><td><select id='SelectJob'>"
    for (var i = 0; i < ListObj.length; i++) {
        table += "<option value=" + ListObj[i].jobId + ">" + ListObj[i].name + "</option>"
    }
    table += "</select></td></tr>"

    table += "<tr>" +
        "<td style='color:black'>" +
        "شروع" +
        "</td>" +
        "<td colspan='2' class='T_StartTime'><input onchange='CalMinute(this)' style='color:black;text-align:center' type='text' /></td>" +
        "</tr>" +
        "<tr>" +
        "<td style='color:black'>" +
        "پایان" +
        "</td>" +
        "<td colspan='2' class='T_EndTime'><input onchange='CalMinute(this)' style='color:black;text-align:center' type='text' /></td>" +
        "</tr>" +
        "<tr>" +
        "<td style='color:black'>" +
        "دقیقه" +
        "</td>" +
        "<td colspan='2' class='T_MinTime'><input style='color:black;text-align:center' type='text' /></td>" +
        "</tr>" +
        "<tr>" +
        "</tr>" +
        "</table >"



    var modal_footer = "<table><tr>" +
        "<td><input type='button' class='btn btn-success' value='ثبت' onclick='SaveInKarkard()'/> | " +
        "<input type='button'  class='btn btn-danger' value='بستن' onclick='closeModal()'/></td>" +
        "</tr>"
    modal_footer += '</table>'


    var modal_header = "<span>زمان مطالعه</span>"
    $("#MasterModal .modal-header").empty();
    $("#MasterModal .modal-header").append(modal_header);


    $("#MasterModal .modal-footer").empty();
    $("#MasterModal .modal-footer").append(modal_footer);

    $("#MasterModal .BodyModal").empty();
    $("#MasterModal .BodyModal").append(table);

    $("#MasterModal").modal();

    var currenttime = CurrentTime()
    var fromTime = currenttime.substr(0, 2) + ":" + currenttime.substr(2, 2)


    var obj = {}
    obj.url = "/Karkard/FindEndTimeIsNull"
    obj.dataType = "json"
    obj.type = "post"

    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]
    
    if (ListObj.length > 0) {
        $("#MasterModal .BodyModal select option").each(function () {
            if ($(this).val() == ListObj[0].jobId) {
                
                $(this).attr("selected",true)
            }
        })
        $("#MasterModal .T_StartTime input").val(ListObj[0].startTime.substr(0, 5))
        $("#MasterModal .T_EndTime input").val(fromTime)
        CalMinute()
    }
    else {
        $("#MasterModal .T_StartTime input").val(fromTime)
        $("#MasterModal .T_EndTime input").val()
        CalMinute()
    }
    

}
//نمایش اطلاعات تاریخ در هدر
$(document).ready(function () {

    const m = moment();
    setInterval(function () {
        var table = "<table class='table' style ='font-size:11px;color:white;text-align:center'> " +
            "<tr><th>امروز</th><th>روز</th><th>ساعت</th><th>هفته</th><th>روز</th><th>سال</th><th>روز</th></tr>" +
            "<tr>" +
            "<td>" + formatDate(todayShamsy8char()) + "</td>" +
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
    var newDate = convertDateToslashless(SelectDate(1))

    ListTaskTomarow(newDate)
    ListKarkardNew()
    ListAllJob()
    var today = todayShamsy8char()
    ListTaskSeparate(today)
    RepeatedTaskForCheck()
    CreateChart1()
    CreateChart2()
    CreateChartKarKard()
    ReportLineChartKarKard(-90)
    ReportDicByDateMonthDateRefresh()
}

