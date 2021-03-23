async function ListCategory() {
    var obj = {}
    obj.url = "/Category/Index"
    obj.dataType = "json"
    obj.type = "POST"

  
    
    var results = await Promise.all([
        service(obj),
       
    ]);
    var ListtObj = results[0]

    ShowListCategory(ListtObj)

}
async function ShowListCategory(lstData) {
   // var lstData = await ListCategory()


    var table = "<input type='button' class='btn btn-info' value='جدید' onclick='CreateUpdateCategory()'/>" +
        "<table class='table table-responsive' style='position:relative;z-index: 15;font-size:9px;text-align: center;background-image: linear-gradient(45deg, #94dac7, rgba(0, 0, 0, .075));'>" +
        "<tr>" +
        "<th>انتخاب</th>" +
        "<th>عنوان</th>" +
        "<th>ویرایش</th>" +
        "<th>حذف</th>" +
        "</tr>"


    for (var i = 0; i < lstData.length; i++) {

        table += "<tr>"
        table += "<td><input type='radio' name='rdbCategory' onclick='ListJobs(" + lstData[i].categoryId+")' value='" + lstData[i].categoryId +"' /></td>"
        table += "<td>" + lstData[i].categoryName + "</td>"
        table += "<td><input type='button'  value='ویرایش'  onclick='CreateUpdateCategory(" + lstData[i].categoryId + ")'/></td>"
        table += "<td><input type='button'  value='حذف' onclick='DeleteCategory(" + lstData[i].categoryId + ")'/></td>"
        table += "<td><input type='button'  value='جدید' onclick='CreateUpdateJob()'/></td>"
        table += "</tr>"

    }
    table += "</table>"


    $(".ListCategory").empty()
    $(".ListCategory").append(table)



}
async function CreateUpdateCategory(categoryId) {

    if (categoryId > 0) {
        var obj = {}
        obj.url = "/Category/Find"
        obj.dataType = "json"
        obj.type = "POST"
        obj.data = { Id: categoryId }

        var results = await Promise.all([
            service(obj)
        ]);
        var ListtObj = results[0]

        var table = "<table>" +

            "<tr><td>عنوان</td><td><input type='text' placeholde='عنوان' name='Dsc'  autocomplete='off' value=" + ListtObj.categoryName + "  /></td></tr>" +

            "</table > "
    }
    else {
        var table = "<table>" +

            "<tr><td>توضیحات</td><td><input type='text' placeholde='توضیحات' name='Dsc'  autocomplete='off'  /></td></tr>" +
            "</table > "
    }


    var modal_footer = "<table><tr>" +
        "<td><input type='button' class='btn btn-success' value=" + (categoryId > 0 ? 'ویرایش' : 'ایجاد') + " onclick='CreaetUpdateCategoryPost(" + categoryId + ")'/> | " +
        "<input type='button'  class='btn btn-danger' value='بستن' onclick='closeModal()'/></td>" +
        "</tr>"
    modal_footer += "</table>"


    var modal_header = "<span> ایجاد عنوان فهرست </span>"
    $("#MasterModal .modal-header").empty();
    $("#MasterModal .modal-header").append(modal_header);


    $("#MasterModal .modal-footer").empty();
    $("#MasterModal .modal-footer").append(modal_footer);

    $("#MasterModal .BodyModal").empty();
    $("#MasterModal .BodyModal").append(table);

    $("#MasterModal").modal();

    // $.LoadingOverlay("hide");


    $("input[name='Date']").persianDatepicker({
        formatDate: "YYYY/0M/0D"
    });


}
async function CreaetUpdateCategoryPost(categoryId) {
    

    var Dsc = $("#MasterModal input[name='Dsc']").val()



   



    var obj = {}
    obj.url = "/Category/CreateUpdatePost"
    obj.dataType = "json"
    obj.type = "POST"
    obj.data = { CAtegoryName: Dsc, categoryId: categoryId }

    var results = await Promise.all([
        service(obj)
    ]);
    var ListtObj = results[0]
    $("#MasterModal").modal("toggle")
    showAlert(ListtObj, 2000);

    ListCategory()

}
async function DeleteCategory(categoryId) {

    var obj = {}
    obj.url = "/Category/Delete"
    obj.dataType = "json"
    obj.type = "POST"
    obj.data = { Id: categoryId }

    var results = await Promise.all([
        service(obj)
    ]);
    var ListtObj = results[0]

    showAlert(ListtObj, 2000);

    ListCategory()
    ListJobs(_CategoryId)
    ListAllJob()
}


//--------------------------Job
var _CategoryId;
async function ListAllJob() {
    var obj = {}
    obj.url = "/Category/IndexJobAll"
    obj.dataType = "json"
    obj.type = "post"


    var obj2 = {}
    obj2.url = "/Karkard/AllKarkardAtMounth"
    obj2.dataType = "json"
    obj2.type = "post"

    
    var results = await Promise.all([
        service(obj),
        service(obj2)
    ]);
    var ListObj = results[0]
    var ListObj2 = results[1]
    
    var sumAll=0
    for (var i = 0; i < ListObj2.length; i++) {
        sumAll += ListObj2[i].spendTimeMinute
    }
    
    var table = 
        "<table class='table table-responsive' style='position:relative;z-index: 15;text-align: center;background-image: linear-gradient(45deg, #94dac7, rgba(0, 0, 0, .075));'>" +
        "<tr>" +
        "<th>وظیفه</th>" +
        "<th>فهرست</th>" +
        "<th>درصد</th>" +
        "<th>زمان مطالعه</th>" +
        "<th>درصد مطالعه</th>" +
        "<th>ویرایش</th>" +
        "<th>حذف</th>" +
        "<th>درصد</th>" +
        "<th>plan</th>" +
        "</tr>"
    
    var sum=0
    for (var i = 0; i < ListObj.length; i++) {
        //--------------
        var lstPercentJob = ListObj2.filter(x => x.jobId == ListObj[i].jobId)
        var sumJob=0
        for (var j = 0; j < lstPercentJob.length; j++) {
            sumJob += lstPercentJob[j].spendTimeMinute
        }
        //-------------------
        if (ListObj[i].percentJobs.length > 0) {
            var currentMonth = todayShamsy8char().substr(0, 4) + todayShamsy8char().substr(4, 2)
            var res = ListObj[i].percentJobs.filter(x => x.date == currentMonth)
            sum += (res.length == 0 ? 0 : res[0].percentValue)
        }

       // sum += (ListObj[i].percentJobs.length > 0 ? ListObj[i].percentJobs[0].percentValue : 0)
        table += "<tr>"
        table += "<td>" + ListObj[i].name + "</td>"
        table += "<td>" + ListObj[i].category.categoryName + "</td>"
        
        if (ListObj[i].percentJobs.length > 0) {
           var currentMonth= todayShamsy8char().substr(0, 4) + todayShamsy8char().substr(4, 2)
            var res = ListObj[i].percentJobs.filter(x => x.date == currentMonth)
            table += "<td>" + (res.length == 0 ? 0 : res[0].percentValue ) + "</td>"
        }
        else {
            table += "<td>0</td>"
        }
       
        table += "<td>" + minuteToTime(Math.floor(sumJob / 60)) + "</td>"

        if (((100 * sumJob) / sumAll).toFixed(1) > (ListObj[i].percentJobs.length > 0 ? ListObj[i].percentJobs[0].percentValue : 0)) {
            table += "<td style='color:green'>" + ((100 * sumJob) / sumAll).toFixed(1) + "</td>"
        }
        else  {
            table += "<td  style='color:red'>" + ((100 * sumJob) / sumAll).toFixed(1) + "</td>"
        }

        table += "<td><input type='button'  value='ویرایش'  onclick='CreateUpdateJob(" + ListObj[i].jobId + ")'/></td>"
        table += "<td><input type='button'  value='حذف' onclick='DeleteJob(" + ListObj[i].jobId + ")'/></td>"
        table += "<td><input type='button'  value='درصد' onclick='percentJob(" + ListObj[i].jobId + ")'/></td>"
        table += "<td><input type='button'  value='Plan' onclick='CreatePlanModal(" + ListObj[i].jobId + ")'/></td>"

        table += "</tr>"

       
    }
    table += "<tr style='font-size:15px'><td  colspan=2>مجموع</td><td>" + sum + "</td><td>" + minuteToTime(Math.floor(sumAll / 60)) + "</td></tr>"

   


    table += "</table>"


    $(".ListAllJob").empty()
    $(".ListAllJob").append(table)

}
async function ListJobs(categoryId) {
    _CategoryId = categoryId
    var obj = {}
    obj.url = "/Category/IndexJob"
    obj.dataType = "json"
    obj.type = "POST"
    obj.data = { categoryId: categoryId }

    var results = await Promise.all([
        service(obj),

    ]);
    var ListtObj = results[0]

    ShowListJobs(ListtObj)
}

async function ShowListJobs(lstData) {
    // var lstData = await ListCategory()


    var table = "<input type='button' class='btn btn-info' value='جدید' onclick='CreateUpdateJob()'/>" +
        "<table class='table table-responsive' style='position:relative;z-index: 15;font-size:9px;text-align: center;background-image: linear-gradient(45deg, #94dac7, rgba(0, 0, 0, .075));'>" +
        "<tr>" +
        "<th>وظیفه</th>" +
        "<th>فهرست</th>" +
        "<th>ویرایش</th>" +
        "<th>حذف</th>" +
        "<th>درصد</th>" +
        "</tr>"


    for (var i = 0; i < lstData.length; i++) {

        table += "<tr>"
        table += "<td>" + lstData[i].name + "</td>"
        table += "<td>" + lstData[i].category.categoryName + "</td>"
        table += "<td><input type='button'  value='ویرایش'  onclick='CreateUpdateJob(" + lstData[i].jobId + ")'/></td>"
        table += "<td><input type='button'  value='حذف' onclick='DeleteJob(" + lstData[i].jobId + ")'/></td>"
        table += "<td><input type='button'  value='درصد' onclick='percentJob(" + lstData[i].jobId + ")'/></td>"
        table += "</tr>"

    }
    table += "</table>"


    $(".ListJob").empty()
    $(".ListJob").append(table)



}

async function CreateUpdateJob(JobId) {

    if (JobId > 0) {
        var obj = {}
        obj.url = "/Category/FindJob"
        obj.dataType = "json"
        obj.type = "POST"
        obj.data = { Id: JobId }
        //---
        var obj2 = {}
        obj2.url = "/Category/Index"
        obj2.dataType = "json"
        obj2.type = "POST"



        var results = await Promise.all([
            service(obj),
            service(obj2)
        ]);
        var ListtObj = results[0]
        var ListtObj2 = results[1]
        
        var table = "<table>" +

            "<tr><td>عنوان</td><td><input type='text' placeholde='عنوان' name='Dsc'  autocomplete='off' value=" + ListtObj.name + "  /></td></tr>" 
        
        table += "<tr><td>فهرست</td><td><select> "
        for (var i = 0; i < ListtObj2.length; i++) {
            if (ListtObj.categoryId == ListtObj2[i].categoryId) {
                table += "<option value=" + ListtObj2[i].categoryId+" selected>" + ListtObj2[i].categoryName + "</option > "
            }
            else {
                table += "<option value=" + ListtObj2[i].categoryId +">" + ListtObj2[i].categoryName + "</option > "
            }
           
        }
        table += "</select ></td></tr> "

        table += "</table > "
    }
    else {
        


        var obj = {}
        obj.url = "/Category/Index"
        obj.dataType = "json"
        obj.type = "POST"



        var results = await Promise.all([
            service(obj)
        ]);
        var ListtObj = results[0]

        

        var table = "<table>" +

            "<tr><td>عنوان</td><td><input type='text' placeholde='عنوان' name='Dsc'  autocomplete='off'   /></td></tr>"

        table += "<tr><td>فهرست</td><td><select> "
        for (var i = 0; i < ListtObj.length; i++) {
            if (ListtObj[i].categoryId == _CategoryId) {
                table += "<option value=" + ListtObj[i].categoryId + " selected>" + ListtObj[i].categoryName + "</option > "
            }
            else {
                table += "<option value=" + ListtObj[i].categoryId + ">" + ListtObj[i].categoryName + "</option > "
            }

        }
        table += "</select ></td></tr> "

        table += "</table > "
    }


    var modal_footer = "<table><tr>" +
        "<td><input type='button' class='btn btn-success' value=" + (JobId > 0 ? 'ویرایش' : 'ایجاد') + " onclick='CreaetUpdateJobPost(" + JobId + ")'/> | " +
        "<input type='button'  class='btn btn-danger' value='بستن' onclick='closeModal()'/></td>" +
        "</tr>"
    modal_footer += "</table>"


    var modal_header = "<span> ایجاد عنوان وظیفه </span>"
    $("#MasterModal .modal-header").empty();
    $("#MasterModal .modal-header").append(modal_header);


    $("#MasterModal .modal-footer").empty();
    $("#MasterModal .modal-footer").append(modal_footer);

    $("#MasterModal .BodyModal").empty();
    $("#MasterModal .BodyModal").append(table);

    $("#MasterModal").modal();

    // $.LoadingOverlay("hide");


    $("input[name='Date']").persianDatepicker({
        formatDate: "YYYY/0M/0D"
    });


}


async function CreaetUpdateJobPost(JobId) {

    
    var name = $("#MasterModal input[name='Dsc']").val()



    var categoryName = $("#MasterModal option:selected").text();
    var categoryId = $("#MasterModal option:selected").val();



    var obj = {}
    obj.url = "/Category/CreateUpdateJobPost"
    obj.dataType = "json"
    obj.type = "POST"
    obj.data = { Name: name, CategoryId: categoryId, JobId: JobId}

    var results = await Promise.all([
        service(obj)
    ]);
    var ListtObj = results[0]
    $("#MasterModal").modal("toggle")
    showAlert(ListtObj, 2000);

    ListJobs(_CategoryId)

}

async function DeleteJob(JobId) {

    var obj = {}
    obj.url = "/Category/DeleteJob"
    obj.dataType = "json"
    obj.type = "POST"
    obj.data = { Id: JobId }

    var results = await Promise.all([
        service(obj)
    ]);
    var ListtObj = results[0]

    showAlert(ListtObj, 2000);

    ListJobs(_CategoryId)
    ListAllJob()

}

//----------------------
async function percentJob(jobId) {

    var obj = {}
    obj.url = "/Category/PercentJob"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = {
        jobId: jobId,
    }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]


    
    var table = "<table>" +
        "<tr><td><input type='number' name='percentVal' value=" + (ListObj == null?0:ListObj.percentValue) + " /></td></tr>" +
    "</table>"
    var modal_header = "<span> درصد هر فعالیت </span>"
    $("#MasterModal .modal-header").empty();
    $("#MasterModal .modal-header").append(modal_header);

    var modal_footer = "<table><tr>" +
        "<td><input type='button' class='btn btn-success' value='ثبت درصد' onclick='CreaetUpdatePercentJobPost(" + jobId + ")'/> | " +
        "<input type='button'  class='btn btn-danger' value='بستن' onclick='closeModal()'/></td>" +
        "</tr>"
    modal_footer += "</table>"


    $("#MasterModal .modal-footer").empty();
    $("#MasterModal .modal-footer").append(modal_footer);

    $("#MasterModal .BodyModal").empty();
    $("#MasterModal .BodyModal").append(table);

    $("#MasterModal").modal();
}
async function CreatePlanModal(jobId) {

    var table = "<table>" +
        "<tr><td><span>   تعداد روز  </span><input type='number' name='nDays' /></td></tr>" +
        "</table>"
    var modal_header = "<span>  برنامه ریزی  </span>"
    $("#MasterModal .modal-header").empty();
    $("#MasterModal .modal-header").append(modal_header);

    //var modal_footer = "<table><tr>" +
    //    "<td><input type='button' class='btn btn-success' value='ثبت درصد' onclick='CreaetUpdatePercentJobPost(" + jobId + ")'/> | " +
    //    "<input type='button'  class='btn btn-danger' value='بستن' onclick='closeModal()'/></td>" +
    //    "</tr>"
    //modal_footer += "</table>"


    //$("#MasterModal .modal-footer").empty();
    //$("#MasterModal .modal-footer").append(modal_footer);

    $("#MasterModal .BodyModal").empty();
    $("#MasterModal .BodyModal").append(table);

    $("#MasterModal").modal();
}

async function CreaetUpdatePercentJobPost(jobId) {
    var percentValue = $("#MasterModal input[name='percentVal']").val()
    
    var obj = {}
    obj.url = "/Category/PercentJobPost"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = {
        JobId: jobId,
        PercentValue: percentValue
    }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]
    $("#MasterModal").modal("toggle");
    ListAllJob()

}
//----------------******sadfs*adf*as*df*asd*fas*dfas*df*asdf*sadf*sad*f*s*d
async function ListPercentJobThisMounth() {
    const m = moment();
    var month = m.jMonth() + 1
    var day = m.jDate()
    var year = m.jYear()

    var today = (year) + "" + ((month) < 10 ? "0" + month : month) //+ "01"
    var obj = {}
    obj.url = "/Category/ListPercentJob"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = { Date: today }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]
    return ListObj
}

async function ListKarkardNew() {
    
    var arrayPercentJob = await ListPercentJobThisMounth()


    const m = moment();
    var month = m.jMonth() + 1
    var day = m.jDate()
    var year = m.jYear()

    var today = (year) + "" + ((month) < 10 ? "0" + month : month) + "01"
    var obj = {}
    obj.url = "/Karkard/ListKarkard"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = { dateParam: today }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]

    var header = []
    var body = []
    var date = []

    
    for (var i = 0; i < ListObj.length; i++) {

        var res = header.find(x => x.Name == ListObj[i].name);
        if (res == undefined) {

            header.push({ Name: ListObj[i].name, JobId: ListObj[i].jobId })
        }

        var res = date.find(x => x.DayDate == ListObj[i].dayDate);
        if (res == undefined) {
            date.push({ DayDate: ListObj[i].dayDate })
        }
        
        if (!body[ListObj[i].dayDate]) {
            body[ListObj[i].dayDate] = [];
        }
        var KarkardObj = {}
        KarkardObj.DayDate = ListObj[i].dayDate
        KarkardObj.Name = ListObj[i].name
        KarkardObj.JobId = ListObj[i].jobId
        KarkardObj.SpendTimeMinute = ListObj[i].spendTimeMinute


        body[ListObj[i].dayDate].push({ KarkardObj })

    }

    //check mobile or web
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

        var table = "<table class='table table-bordered table-striped table-responsive' id='SumKarkard'>"
        // alert("mobile")
    }
    else {
        var table = "<table class='table table-bordered table-striped' id='SumKarkard'>"
        // alert("web")
    }
    

  
    table += "<tr>"
    table += "<th><p>تاریخ</p></th>"
    for (var k = 0; k < header.length; k++) {
        var res = arrayPercentJob.find(x => x.jobId == header[k].JobId)
        
        table += "<th><p JobId=" + header[k].JobId + ">" + header[k].Name + "</p><p> لازم : % " + res.percentValue + "</p></th>"
    }
    table += "<th><p>مجموع</p></th>"
    table += "</tr>"
    var sumAllDay = 0
    for (var i = 0; i < date.length; i++) {

        table += "<tr>"
        table += "<td>" + formatDate(date[i].DayDate) + " - " + calDayOfWeek(date[i].DayDate) + "</td>"
        for (var k = 0; k < header.length; k++) {
            table += "<td>"
            var sumDay = 0
            var minute = 0

            for (j = 0; j < body[date[i].DayDate].length; j++) {
                sumDay += parseInt(body[date[i].DayDate][j].KarkardObj.SpendTimeMinute)

                if (header[k].Name == body[date[i].DayDate][j].KarkardObj.Name) {
                    minute += parseInt(body[date[i].DayDate][j].KarkardObj.SpendTimeMinute / 60)
                    sumAllDay += parseInt(body[date[i].DayDate][j].KarkardObj.SpendTimeMinute)
                }
                else {

                }

            }
            table += minute
            table += "</td>"
        }
        table += "<td>" + (sumDay / 60).toFixed(0)+" _ "+ minuteToTime((sumDay / 60).toFixed(0)) + "</td>"
        table += "</tr>"

    }
    table += "</table>"
    $(".ListKarkardNew").empty();
    $(".ListKarkardNew").append(table);

    var count = $('#SumKarkard th').length + 1
    for (var i = 2; i < count; i++) {
        var sum = 0
        $("#SumKarkard tr").not(':first').each(function () {
            
            sum += parseInt($(this).find('td:nth-child(' + i + ')').text())
        })
        $("#SumKarkard").find('th:nth-child(' + i + ')').append("<p style='color:red'>درصد : " + " % " + ((sum * 100) / (sumAllDay / 60)).toFixed(1) + "</p>")
        $("#SumKarkard").find('th:nth-child(' + i + ')').append("<p style='color:blue'>زمان : " + minuteToTime(sum) + "</p>")
        $("#SumKarkard").find('th:nth-child(' + i + ')').append("<p style='color:green'>دقیقه : " + (sum) + "</p>")
        // $("#SumKarkard").find('th:nth-child(' + i + ')').append("<p style='color:red'>P : " +" % "+ ((sum * 100) / (sumAllDay / 60)).toFixed(1)  + "</p>")
    }



}