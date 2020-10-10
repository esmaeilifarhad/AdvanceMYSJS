async function ListCat(Code) {
    var obj = {}
    obj.url = "/Cat/ListCat"
    obj.dataType = "json"
    obj.type = "POST"
    obj.data = {Code:Code }

    var results = await Promise.all([
        service(obj)
    ]);
    var ListtObj = results[0]
    
    return ListtObj;
}

async function ShowListCat(Code) {
    var catData = await ListCat(Code)
    

    var countCol = 3
   
    var showRateTaskDays = "<div style='font-size:11px'>" +
        "<input type='button' value='جدید' onclick='CreateCat()'/>" +
        "<table class='table-responsive table-bordered'>"
    for (let index = 0; index < catData.length; index++) {

        if (index % countCol == 0) {
            showRateTaskDays += "<tr><td><input onclick='ListSportFilter(" + catData[index].catId + ")' type='radio' value=" + catData[index].catId + " name='rdbSport'></td><td>" + catData[index].title + "</td><td><input style='background-color:lightcoral;color:black' type='button' value='ویرایش' onclick='ShowEditCat(" + catData[index].catId + ")'></td>"
        }
        else {
            showRateTaskDays += "<td><input  onclick='ListSportFilter(" + catData[index].catId + ")' type='radio' value=" + catData[index].catId + " name='rdbSport'></td><td>" + catData[index].title + "</td><td><input style='background-color:lightcoral;color:black' type='button' value='ویرایش' onclick='ShowEditCat(" + catData[index].catId + ")'></td>"
        }
        if (Code == 2) {
            
            showRateTaskDays += "<td><input type='button' style='background-color:lightBlue;color:black' value='جدید' onclick='CreateTaskShow(" + catData[index].catId + ")'/></td>"
        }
        if (index % countCol == (countCol - 1)) {
            showRateTaskDays += "</tr>"
        }
    }
    showRateTaskDays += "</table></div>"
    
    $("#ListCat").empty()
    $("#ListCat").append(showRateTaskDays)
   


}

async function EditCat(CatId) {
    
    $.LoadingOverlay("show"); 
    var obj = {}
    obj.url = "/Cat/EditCat"
    obj.dataType = "json"
    obj.type = "POST"
    obj.data = { CatId: CatId }

    var results = await Promise.all([
        service(obj)
    ]);
    var ListtObj = results[0]
    $.LoadingOverlay("hide"); 
    return ListtObj;

}

async function CreateCat() {

    var modal_header = "<span>ایجاد فهرست</span>"


    var BodyModal = "<table class='table table-boredered table-responsive'>"
    BodyModal += "<tr><td>عنوان</td><td><input type='text' name='Title' autoComplete='off' /></td></tr>"
    BodyModal += "<tr><td>ترتیب</td><td><input type='number' name='Order' autoComplete='off' /></td></tr>"
    BodyModal += "<tr><td>کد</td><td><input type='number' name='Code' autoComplete='off' />Sport:1 , Task:2</td></tr>"
    BodyModal += "<tr><td>توضیحات</td><td><input type='text' name='Dsc' autoComplete='off'/></td></tr>"
    BodyModal += "</table>"

    var tablebutt = "<table  style='font-size: 9px;'>"
    tablebutt += "<tr>" +
        "<td><input type='button' class='btn btn-success' value='ذخیره' onclick='CreateUpdateCat()'/> | " +
        "<input type='button' class='btn btn-danger' value='بستن' onclick='closeModal()'/></td>" +
        "</tr>"
    tablebutt += "</table>"

    $(".modal-header").empty();
    $(".modal-header").append(modal_header);

    $(".modal-footer").empty();
    $(".modal-footer").append(tablebutt);


    $(".BodyModal").html(BodyModal);
    $("#MasterModal").modal();

    $.LoadingOverlay("hide");

}

async function ShowEditCat(CatId) {
    var OldCat = await EditCat(CatId)

    var modal_header="<span>ویرایش فهرست</span>"
   
    
    var BodyModal = "<table class='table table-boredered table-responsive'>"
    BodyModal += "<tr><td>عنوان</td><td><input type='text' value='" + OldCat.title +"' name='Title' autoComplete='off'/></td></tr>"
    BodyModal += "<tr><td>ترتیب</td><td><input type='number' value='" + OldCat.order +"' name='Order' autoComplete='off'/></td></tr>"
    BodyModal += "<tr><td>کد</td><td><input type='number' value='" + OldCat.code + "'  name='Code' autoComplete='off'/></td></tr>"
    BodyModal += "<tr><td>توضیحات</td><td><input type='text' value='" + OldCat.dsc+"' name='Dsc' autoComplete='off'/></td></tr>"
    BodyModal += "</table>"

    var tablebutt = "<table  style='font-size: 9px;'>"
    tablebutt += "<tr>" +
        "<td><input type='button' class='btn btn-success' value='ذخیره' onclick='CreateUpdateCat(" + CatId + ")'/> | " +
        "<input type='button' class='btn btn-danger' value='بستن' onclick='closeModal()'/></td>" +
        "</tr>"
    tablebutt += "</table>"

    $(".modal-header").empty();
    $(".modal-header").append(modal_header);

    $(".modal-footer").empty();
    $(".modal-footer").append(tablebutt);


    $(".BodyModal").html(BodyModal);
    $("#MasterModal").modal();

    $.LoadingOverlay("hide");
}

async function CreateUpdateCat(CatId) {
    
    var Title = $("#MasterModal input[name='Title']").val()
    var Code = $("#MasterModal input[name='Code']").val()
    var Order = $("#MasterModal input[name='Order']").val()
    var Dsc = $("#MasterModal input[name='Dsc']").val()


    var obj = {}
    obj.url = "/Cat/CreateUpdateCat"
    obj.dataType = "json"
    obj.type = "POST"
    obj.data = { Code: Code, Title: Title, Order: Order, Dsc: Dsc, CatId: CatId}

    var results = await Promise.all([
        service(obj)
    ]);
    var ListtObj = results[0]
    $("#MasterModal").modal("toggle")
    showAlert(ListtObj, 2000);
    
    ShowListCat(Code)

    // return ListtObj;

    
}

