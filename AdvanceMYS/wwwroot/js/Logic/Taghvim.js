async function ListTaghvim() {
    var obj = {}
    obj.url = "/Taghvim/Index"
    obj.dataType = "json"
    obj.type = "POST"
    //obj.data = { Code: Code }

    var results = await Promise.all([
        service(obj)
    ]);
    var ListtObj = results[0]

    return ListtObj;
}

async function ShowListTaghvim() {
    var lstData = await ListTaghvim()

    
    var table = "<input type='button' class='btn btn-info' value='جدید' onclick='CreateUpdateTaghvim()'/><table class='table table-responsive' style='position:relative;z-index: 15;font-size:9px;text-align: center;background-image: linear-gradient(45deg, #007bff, rgba(0, 0, 0, .075));'>" +
        "<tr>" +
        "<th>تاریخ</th>" +
        "<th>روز هفته</th>" +
        "<th>تعطیل؟</th>" +
        "<th>توضیحات</th>" +
        "<th>ویرایش</th>" +
        "<th>حذف</th>" +
        "</tr>"

   
    for (var i = 0; i < lstData.length; i++) {

        table += "<tr>"
        table += "<td>" + formatDate(lstData[i].date) + "</td>"
        table += "<td>" + calDayOfWeek(lstData[i].date) + "</td>"
        table += "<td><input type='checkbox' disabled name='isHolyDay' " + (lstData[i].isHolyDay == true ? 'checked' : '' ) + "/></td>"
        table += "<td>" + lstData[i].dsc + "</td>"
        table += "<td><input type='button'  value='ویرایش'  onclick='CreateUpdateTaghvim(" + lstData[i].taghvimId+")'/></td>"
        table += "<td><input type='button'  value='حذف' onclick='DeleteTaghvim(" + lstData[i].taghvimId +")'/></td>"
        table += "</tr>"
      
    }
    table += "</table>"


    $(".ListTaghvim").empty()
    $(".ListTaghvim").append(table)



}

async function CreateUpdateTaghvim(TaghvimId) {
    debugger
    if (TaghvimId > 0) {
        var obj = {}
        obj.url = "/Taghvim/Find"
        obj.dataType = "json"
        obj.type = "POST"
        obj.data = { Id: TaghvimId }

        var results = await Promise.all([
            service(obj)
        ]);
        var ListtObj = results[0]
      
        var table = "<table>" +
            "<tr><td>تاریخ</td><td><input type='text' placeholde='تاریخ ' name='Date'  autocomplete='off' value=" + formatDate(ListtObj.date)+"  /></td></tr>" +
            "<tr><td>توضیحات</td><td><input type='text' placeholde='توضیحات' name='Dsc'  autocomplete='off' value=\"" + ListtObj.dsc + "\"  /></td></tr>" +
            "<tr><td>تعطیل</td><td><input type='checkbox'  name='IsHolyDay'  " + (ListtObj.isHolyDay == true?'checked':'') + "  /></td></tr>" +
            "</table > "
    }
    else {
        var table = "<table>" +
            "<tr><td>تاریخ</td><td><input type='text' placeholde='تاریخ ' name='Date'  autocomplete='off'  /></td></tr>" +
            "<tr><td>توضیحات</td><td><input type='text' placeholde='توضیحات' name='Dsc'  autocomplete='off'  /></td></tr>" +
            "<tr><td>تعطیل</td><td><input type='checkbox'  name='IsHolyDay'  checked  /></td></tr>" +
            "</table > "
    }


    var modal_footer = "<table><tr>" +
        "<td><input type='button' class='btn btn-success' value=" + (TaghvimId>0?'ویرایش':'ایجاد')+" onclick='CreaetUpdateTaghvimPost(" + TaghvimId+")'/> | " +
        "<input type='button'  class='btn btn-danger' value='بستن' onclick='closeModal()'/></td>" +
        "</tr>"
    modal_footer += "</table>"


    var modal_header = "<span>ثبت تاریخ</span>"
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
async function CreaetUpdateTaghvimPost(TaghvimId) {
    var Date = $("#MasterModal input[name='Date']").val()
    
    var Dsc = $("#MasterModal input[name='Dsc']").val()

    var IsHolyDay = $("input[name='IsHolyDay']").prop('checked')

    Date = convertDateToslashless(Date)



    var obj = {}
    obj.url = "/Taghvim/CreateUpdateTaghvimPost"
    obj.dataType = "json"
    obj.type = "POST"
    obj.data = { Date: Date, IsHolyDay: IsHolyDay, Dsc: Dsc, TaghvimId: TaghvimId}

    var results = await Promise.all([
        service(obj)
    ]);
    var ListtObj = results[0]
    $("#MasterModal").modal("toggle")
    showAlert(ListtObj, 2000);

    ShowListTaghvim()

}
async function DeleteTaghvim(TaghvimId) {

    var obj = {}
    obj.url = "/Taghvim/Delete"
    obj.dataType = "json"
    obj.type = "POST"
    obj.data = {  Id: TaghvimId }

    var results = await Promise.all([
        service(obj)
    ]);
    var ListtObj = results[0]
   
    showAlert(ListtObj, 2000);

    ShowListTaghvim()

}