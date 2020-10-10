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

}


//--------------------------Job
var _CategoryId;
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
        "</tr>"


    for (var i = 0; i < lstData.length; i++) {

        table += "<tr>"
        table += "<td>" + lstData[i].name + "</td>"
        table += "<td>" + lstData[i].category.categoryName + "</td>"
        table += "<td><input type='button'  value='ویرایش'  onclick='CreateUpdateJob(" + lstData[i].jobId + ")'/></td>"
        table += "<td><input type='button'  value='حذف' onclick='DeleteJob(" + lstData[i].jobId + ")'/></td>"
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

}
