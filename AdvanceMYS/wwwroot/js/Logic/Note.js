async function ListJobsInNotes() {
    var list = await GetJobData()
    var res = showJobs(list)
    $(".ListJob").empty()
    $(".ListJob").append(res)

}
async function GetJobData() {
    var obj = {}
    obj.url = "/Category/IndexJobAll"
    obj.dataType = "json"
    obj.type = "post"


    var results = await Promise.all([
        service(obj),
    ]);
    var ListObj = results[0]
    return ListObj
}
function showJobs(list) {

    var table = tableReturn()
    table += "<tr>"
    for (var i = 0; i < list.length; i++) {

        table += "<td><input name='rdbJobs' type='radio' value=" + list[i].jobId + " onclick='getSubject()' /><span>" + list[i].name + "</span></td>"


    }
    table += "</tr>"
    table += "</table>"
    return table
}
//---------------------------Subject
async function getSubject() {

    var listObj = await getSubjectData()
    var table = ShowSubjects(listObj)
    $(".listSubject").empty()
    $(".listSubject").append(table)
}
async function getSubjectData() {
    var jobId = $("input[name='rdbJobs']:checked").val();
    var obj = {}
    obj.url = "/Note/ListSubjectByJobId"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = { jobId: jobId }

    var results = await Promise.all([
        service(obj),
    ]);
    var ListObj = results[0]
    return ListObj
}
function ShowSubjects(listObj) {
    var table = "<input name='createSubject' onclick='CreateNewSubject()' type='button' value='جدید'/>" 
    table += tableReturn()//  "<table class='table table-bordered'    style='background-image: linear-gradient(to bottom, #5d92cc, transparent);'>"
    var countCol = 4

    for (var i = 0; i < listObj.length; i++) {
        if (i % countCol == 0) {
            table += "<tr>"
            table += "<td>"
            table +=
                "<span>" + "<input type='radio' onclick='showNotes(" + listObj[i].subjectId + ")' name='rdbSubject' value='" + listObj[i].subjectId + "'/> </span> " +
                "<span>" + listObj[i].title + "</span> | " +
                "<span class='fa fa-sticky-note-o pointer' onclick='CreateNote(" + listObj[i].subjectId + ")'></span> | " +
                "<span class='fa fa-edit pointer' onclick='CreateNewSubject(" + listObj[i].subjectId + ")'></span> | " +
                "<span class='fa fa-remove pointer' onclick='DeleteSubjectConfirm(" + listObj[i].subjectId + ")'></span>"
            table += "</td>"
        }
        else {
            table += "<td>"
            table +=
                "<span>" + "<input type='radio' onclick='showNotes(" + listObj[i].subjectId + ")' name='rdbSubject' value='" + listObj[i].subjectId + "'/> </span> " +
                "<span>" + listObj[i].title + "</span> | " +
                "<span class='fa fa-sticky-note-o pointer' onclick='CreateNote(" + listObj[i].subjectId + ")'></span> | " +
                "<span class='fa fa-edit pointer' onclick='CreateNewSubject(" + listObj[i].subjectId + ")'></span> | " +
                "<span class='fa fa-remove pointer' onclick='DeleteSubjectConfirm(" + listObj[i].subjectId + ")'></span>"
            table += "</td>"
        }
        if (i % countCol == (countCol - 1)) {
            table += "</tr>"
        }
       
    }
   // table += "</tr>"
    table += "</table>"
    return table
}
async function CreateNewSubject(subjectId) {

    if (subjectId != undefined) {
        var res = await FindSubject(subjectId)

        var header = "ویرایش موضوع"
        var footer = "<input type='button' class='btn btn-success' value='ویرایش' onclick='CreateUpdateSubject(" + subjectId + ")'/> | "

        var body = "<table>"
        body += "<tr>"
        body += "<td><input type='text' name='txtSubject' placeholder='عنوان' value='" + res.title + "'/></td>"
        body += "</tr>"
        body += "</table>"

    }
    else {
        var header = "ایجاد موضوع جدید"
        var body = "<table>"
        body += "<tr>"
        body += "<td><input type='text' name='txtSubject' placeholder='عنوان'/></td>"
        body += "</tr>"
        body += "</table>"
        var footer = "<input type='button' class='btn btn-success' value='ایجاد' onclick='CreateUpdateSubject()'/> | "
    }

    CreateModal(header, body, footer)
}
async function CreateUpdateSubject(SubjectId) {
    var jobId = $("input[name='rdbJobs']:checked").val();
    var title = $("input[name='txtSubject']").val();

    var obj = {}
    obj.url = "/Note/CreateUpdateSubject"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = { JobId: jobId, Title: title, SubjectId: SubjectId }

    var results = await Promise.all([
        service(obj),
    ]);
    var ListObj = results[0]

    $("#MasterModal").modal("toggle")
    showAlert(ListObj, 2000)
    getSubject()
}
function DeleteSubjectConfirm(subjectId) {
    var header = "حذف موضوع"
    var body = "آیا حذف انجام شود"
    var footer = "<input type='button' class='btn btn-success' value='حذف' onclick='DeleteSubject(" + subjectId + ")'/> | "


    CreateModal(header, body, footer)
}
async function DeleteSubject(subjectId) {
    var obj = {}
    obj.url = "/Note/DeleteSubject"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = { id: subjectId }

    var results = await Promise.all([
        service(obj),
    ]);
    var ListObj = results[0]
    $("#MasterModal").modal("toggle")
    showAlert(ListObj, 2000)
    getSubject()
}
async function FindSubject(subjectId) {
    var obj = {}
    obj.url = "/Note/FindSubject"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = { id: subjectId }

    var results = await Promise.all([
        service(obj),
    ]);
    var ListObj = results[0]
    return ListObj
}

//----------------------CreateUpdateNote
function CreateNote(subjectId) {
    var header = "ایجاد نکته جدید"

    var body = "<div class='form-group'>" +
        "<textarea  name='txtNote' class='form-control'  rows='7'></textarea>" +
        "</div >"
    var footer = "<input type='button' class='btn btn-success' value='ایجاد' onclick='CreateUpdateNote(" + subjectId + ")'/> | "


    CreateModal(header, body, footer)
}
async function CreateUpdateNote(subjectId, noteId) {
    
    $.LoadingOverlay("show");
    if (subjectId == 0) {
        var txtNote = $("textarea[name='dscNote_" + noteId+"']").val()
    }
    else {
       
        var txtNote = $("textarea[name='txtNote']").val()
    }
   

    var obj = {}
    obj.url = "/Note/CreateUpdateNote"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = { Description: txtNote, SubjectId: subjectId, NoteId: noteId }

    var results = await Promise.all([
        service(obj),
    ]);
    var ListObj = results[0]
    $.LoadingOverlay("hide");
    if (subjectId != 0) {
        $("#MasterModal").modal("toggle")
    }
    showAlert(ListObj, 2000)

}
async function showNotes(subjectId) {
    var listObj = await getDataNote(subjectId)
    var table = NoteGrid(listObj);
    $(".listNote").empty();
    $(".listNote").append(table);
}
async function getDataNote(subjectId) {

    var obj = {}
    obj.url = "/Note/ListNotes"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = { subjectId: subjectId }

    var results = await Promise.all([
        service(obj),
    ]);
    var ListObj = results[0]
    return ListObj
}
function NoteGrid(listObj) {
    //check mobile or web
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        var table = "<table class='table table-responsive table-bordered table-striped'>"
    }
    else {
        var table = "<table class='table table-bordered table-striped'>"
    }

   // var table = tableReturn()

    for (var i = 0; i < listObj.length; i++) {
        table += "<tr>"
        table += "<td>" + listObj[i].time + "</td>"
        table += "<td>" + formatDate(listObj[i].dateRefresh) + "</td>"
        table += "<td>" + formatDate(listObj[i].dateCreated) + "</td>"
        table += "<td>" + listObj[i].level + "</td>"
        table += "<td style='cursor:pointer'><span onclick='UpdateNote(" + listObj[i].noteId + "," + 1 + "," + listObj[i].subjectId+")'       class='fa fa-thumbs-o-up'></span></td>"
        table += "<td style='cursor:pointer'><span onclick='UpdateNote(" + listObj[i].noteId + "," + (-1) + "," + listObj[i].subjectId +")' class='fa fa-thumbs-o-down'></span></td>"
        table += "<td style='cursor:pointer'><span onclick='CreateUpdateNote(0," + listObj[i].noteId+")'>ویرایش</span></td>"
        table += "<td onclick='DeleteNote(" + listObj[i].noteId +")' style='cursor:pointer'><span>حذف</span></td>"
        table += "</tr>"
        table += "<tr>"
        table += "<td colspan=8 style='white-space: pre;'>" +
            "<div class='form-group shadow-textarea' >" +
            "<textarea onchange='CreateUpdateNote(0," + listObj[i].noteId +")' class='form-control z-depth-1' name='dscNote_" + listObj[i].noteId+"' rows='20' placeholder='Write something here...'>" + listObj[i].description + "</textarea>" +
            "</div ></td>"
        table += "</tr>"



    }
    table += "</table>"
    return table
}
async function UpdateNote(noteId, status, subjectId) {
    $.LoadingOverlay("show");
    var obj = {}
    obj.url = "/Note/CreateUpdateNote"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = { level:status, NoteId: noteId }

    var results = await Promise.all([
        service(obj),
    ]);
    var ListObj = results[0]
    showAlert(ListObj, 2000)
    showNotes(subjectId)
    $.LoadingOverlay("hide");
}
async function DeleteNote(noteId) {
    
    var subjectId=  $("input[name='rdbSubject']:checked").val()
    $.LoadingOverlay("show");
    var obj = {}
    obj.url = "/Note/DeleteNote"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = {  id: noteId }

    var results = await Promise.all([
        service(obj),
    ]);
    var ListObj = results[0]
    showAlert(ListObj, 2000)
    showNotes(subjectId)
    $.LoadingOverlay("hide");
}