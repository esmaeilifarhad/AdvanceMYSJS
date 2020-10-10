async function ListCategory() {
    var obj = {}
    obj.url = "/Category/Index"
    obj.dataType = "json"
    obj.type = "POST"
    //obj.data = { Code: Code }

    var results = await Promise.all([
        service(obj)
    ]);
    var ListtObj = results[0]

    return ListtObj;
}

async function ShowListCategory() {
    var lstData = await ListCategory()


    var table = "<input type='button' class='btn btn-info' value='جدید' onclick='CreateUpdateCategory()'/><table class='table table-responsive' style='position:relative;z-index: 15;font-size:9px;text-align: center;background-image: linear-gradient(45deg, #007bff, rgba(0, 0, 0, .075));'>" +
        "<tr>" +
        "<th>عنوان</th>" +
        "<th>ویرایش</th>" +
        "<th>حذف</th>" +
        "</tr>"


    for (var i = 0; i < lstData.length; i++) {

        table += "<tr>"
        table += "<td>" + lstData[i].categoryName + "</td>"
        table += "<td><input type='button'  value='ویرایش'  onclick='CreateUpdateCategory(" + lstData[i].categoryId + ")'/></td>"
        table += "<td><input type='button'  value='حذف' onclick='DeleteCategory(" + lstData[i].categoryId + ")'/></td>"
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

    ShowListCategory()

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

    ShowListCategory()

}