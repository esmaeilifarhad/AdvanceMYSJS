function createForm() {
    var table = tableReturn()
    table += "<tr>"
    table += "<td>Title :  <input type='text' placeholder='عنوان' name='Job'/></td>"
    table += "</tr>"
    table += "<tr>"
    table += "<td>Rate  :  <input type='number' placeholder='Rate' name='Rate' value='1'/></td>"
    table += "</tr>"
    table += "<tr>"
    table += "<td>Order :  <input type='number' placeholder='Order' name='Order' value='1'/></td>"
    table += "</tr>"
    table += "<tr>"
    table += "<td>" +
        "<input type='checkbox' name='RoozDaily' value='1' checked/>شنبه" +
        "<input type='checkbox'  name='RoozDaily' value='2' checked/>یکشنبه" +
        "<input type='checkbox' name='RoozDaily' value='3' checked/>دوشنبه" +
        "<input type='checkbox'  name='RoozDaily' value='4' checked/>سه شنبه" +
        "<input type='checkbox' name='RoozDaily' value='5' checked/>چهارشنبه" +
        "<input type='checkbox'  name='RoozDaily' value='6' checked/>پنجشنبه" +
        "<input type='checkbox' name='RoozDaily' value='7' checked/>جمعه" +

        "</td > "
    table += "</tr>"
    table += "</table>"
    return table
}
async function listRoutineJob() {
    $("#MasterPage").empty()

    var listObj = await GetDataRoutineJob()
    var dailyDay = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه']

    var table = "<input type='button' class='btn btn-info' value='جدید' onclick='showForm()'/>"
    table += tableReturn()
    table += "<tr><th>عنوان</th><th>روز هفته</th><th>Rate</th><th>Order</th><th>ویرایش</th><th>حذف</th></tr>"
    for (var i = 0; i < listObj.length; i++) {
       var resArray= listObj[i].roozDaily.split(',')
        table += "<tr>"
        table += "<td>" + listObj[i].job + "</td><td>"
        for (var j = 0; j < 7; j++) {
          var result=  resArray.find(x =>
              x == (j + 1))

            if (result != undefined) {
                table += "<input type='checkbox' name='RoozDaily' value=" + resArray[j]+" checked/>" + dailyDay[j]
            }
            else {
                table += "<input type='checkbox' name='RoozDaily' value=" + resArray[j] +" />" + dailyDay[j]
            }
        }
        table += "</td><td>" + listObj[i].rate + "</td>"
        table += "<td>" + listObj[i].order + "</td>"
        table += "<td><span class='fa fa-edit' style='cursor:pointer' onclick='showForm(" + listObj[i].routineJobId+")'></span></td>"
        table += "<td><span class='fa fa-remove' style='cursor:pointer' onclick='RemoveRoutineJob(" + listObj[i].routineJobId +")'></span></td>"
        table +="</tr>"
    }
    table+="</table>"


    $("#MasterPage").append(table)


}
 function showForm(id) {
    var table = createForm()
  

    var modal_footer = "<table><tr>" +
        "<td><input type='button' class='btn btn-success' value=" + (id > 0 ? 'ویرایش' : 'ایجاد') + " onclick='CreaetUpdateRoutinejobPost(" + id + ")'/> | " +
        "<input type='button'  class='btn btn-danger' value='بستن' onclick='closeModal()'/></td>" +
        "</tr>"
    modal_footer += "</table>"


    var modal_header = "<span> ایجاد عنوان تکراری </span>"
    $("#MasterModal .modal-header").empty();
    $("#MasterModal .modal-header").append(modal_header);


    $("#MasterModal .modal-footer").empty();
    $("#MasterModal .modal-footer").append(modal_footer);

    $("#MasterModal .BodyModal").empty();
    $("#MasterModal .BodyModal").append(table);

    $("#MasterModal").modal();


}
async function CreaetUpdateRoutinejobPost(id) {
    
    var Job = $("#MasterModal input[name='Job']").val()
    var Order = $("#MasterModal input[name='Order']").val()
    var Rate = $("#MasterModal input[name='Rate']").val()
    var RoozDailyArr = []
    var RoozDaily=""
    $("#MasterModal input[name='RoozDaily']:checked").each(function () {
        RoozDailyArr.push($(this).val())
        RoozDaily += $(this).val()+","
    })
    RoozDaily = removeLastChar(RoozDaily)
 



    var obj = {}
    obj.url = "/RoutineJob/CreateUpdatePost"
    obj.dataType = "json"
    obj.type = "POST"
    obj.data = { Job: Job, Rate: Rate, Order: Order, RoozDaily: RoozDaily ,RoutineJobId:id}

    var results = await Promise.all([
        service(obj)
    ]);
    
    var ListtObj = results[0]
    $("#MasterModal").modal("toggle")
    showAlert(ListtObj, 2000);

    listRoutineJob()
}
async function GetDataRoutineJob() {
    var obj = {}
    obj.url = "/RoutineJob/Index"
    obj.dataType = "json"
    obj.type = "POST"
   // obj.data = { Job: Job, Rate: Rate, Order: Order, RoozDaily: RoozDaily, RoutineJobId: id }

    var results = await Promise.all([
        service(obj)
    ]);

    var ListtObj = results[0]
    return ListtObj

}
async function RemoveRoutineJob(routineJobId) {
    var obj = {}
    obj.url = "/RoutineJob/Delete"
    obj.dataType = "json"
    obj.type = "POST"
    obj.data = { Id: routineJobId }

    var results = await Promise.all([
        service(obj)
    ]);
    listRoutineJob()
}
/*نمایش کارهای تکراری برای زدن تیک*/
async function RepeatedTaskForCheck() {
    var listObj = await GetDataRoutineJob()
 
    var table =await showRepeatedTask(listObj)
    
    $(".RepeatedTaskForCheck").empty()
    $(".RepeatedTaskForCheck").append(table)
}
async function listRoutineJobhaByDate() {
    var today = todayShamsy8char()
    var obj = {}
    obj.url = "/RoutineJob/listRoutineJobhaByDate"
    obj.dataType = "json"
    obj.type = "POST"
    obj.data = { date: today}

    var results = await Promise.all([
        service(obj)
    ]);

    var ListtObj = results[0]
    return ListtObj
}
async function showRepeatedTask(listObj) {
    var listobj2 = await listRoutineJobhaByDate()
    
    var table = tableReturn()
    var today = todayShamsy8char()
  var nDayWeek= calDayOfWeeknumber(today)
    for (var i = 0; i < listObj.length; i++) {
        var roozDaily = listObj[0].roozDaily.split(',')
       var isExeist= roozDaily.find(x =>
           x == (nDayWeek + 1))
        if (isExeist != undefined) {
            
            table += "<tr>"
           var IsExistInRoutineJobha= listobj2.find(x =>
               x.routineJobId == listObj[i].routineJobId)
            if (IsExistInRoutineJobha == undefined) {
                table += "<td><input type='checkbox' name='repeatedTask' onclick='DocheckRepeateTask(this," + listObj[i].routineJobId + ")' /> " + listObj[i].job + "</td>"
            }
            else {
                
                table += "<td><input type='checkbox' name='repeatedTask' checked onclick='DocheckRepeateTask(this," + listObj[i].routineJobId + ")' /> " + listObj[i].job + "</td>"
            }
            table += "</tr>"
        }


    }
    table += "</table>"
    return table
}
async function DocheckRepeateTask(thiss,routineJobId) {
    var today = todayShamsy8char()
    var isCheck = false

    if (thiss.checked) {
        isCheck = true
    }
    else {
        isCheck = false;
    }
    
    var obj = {}
    obj.url = "/RoutineJob/checkInRoutineJobha"
    obj.dataType = "json"
    obj.type = "POST"
    obj.data = { Date: today, RoutineJobId: routineJobId, IsCheck: isCheck  }

    var results = await Promise.all([
        service(obj)
    ]);

    var ListtObj = results[0]
    RepeatedTaskForCheck()
    
}


