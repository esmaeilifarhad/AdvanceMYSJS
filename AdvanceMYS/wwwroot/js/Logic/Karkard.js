//*********************Karkard********************************************************

async function ListKarkard() {

    //$.LoadingOverlay("show");
    var obj = {}
    obj.url = "/Karkard/AllKarkardAtMounth"
    obj.dataType = "json"
    obj.type = "post"
    //obj.data = { stringSerach: stringSerach }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]

    return ListObj

    //$.LoadingOverlay("hide");

}
async function showListKarkard() {
    var ListObj = await ListKarkard();

    //check mobile or web
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

        var table = "<table style='background-image: linear-gradient(to bottom, #5c9fe8, transparent);' class='table table-responsive table-striped'>"
        // alert("mobile")
    }
    else {
        var table = "<table  class='table table-striped' style='background-image: linear-gradient(to bottom, #5c9fe8, transparent);'>"
        // alert("web")
    }
    
    for (var i = 0; i < ListObj.length; i++) {
        if (ListObj[i].job == null) continue
        table += "<tr>"
        table += "<td>" + ListObj[i].job.name + "</td>"
        table += "<td>" + formatDate(ListObj[i].dayDate) + "</td>"
        table += "<td>" + calDayOfWeek(ListObj[i].dayDate) + "</td>"
        table += "<td>" + calDayOfWeek(ListObj[i].dayDate) + "</td>"
        table += "<td>" + ListObj[i].startTime + "</td>"
        table += "<td>" + ListObj[i].endTime + "</td>"
        table += "<td>" + (((ListObj[i].spendTimeMinute) / 60).toFixed(0)) + "</td>"
        table += "<td><input type='button' value='ویرایش' onclick='editKarkard(" + ListObj[i].karkardId+")' /></td>"
        table += "<td><input type='button' value='حذف'  onclick='DeleteKarkard(" + ListObj[i].karkardId+")' /></td>"
        table += "</tr>"
    }
    table += "</table>"
    $(".ListKarkard").empty()
    $(".ListKarkard").append(table)
    
}

async function DeleteKarkard(KarkardId) {
    
    $.LoadingOverlay("show");
    var obj = {}
    obj.url = "/Karkard/DeleteKarkard"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = { id: KarkardId }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]

    showAlert(ListObj,4000)


    $.LoadingOverlay("hide");
    ListKarkardNew()
    showListKarkard()
  
}

//////////////////////----------------موارد زیر باید توی سیستم اضافه شود

