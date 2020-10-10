function LoginForm() {
    $.LoadingOverlay("show");

    //var objEditTask = {}
    //objEditTask.url = "/Task/EditTask"
    //objEditTask.dataType = "json"
    //objEditTask.type = "post"
    //objEditTask.data = { TaskId: TaskId }

    //var results = await Promise.all([
    //    service(objEditTask)
    //]);
    //var oldTask = results[0]


    //var OldCat = await EditCat(CatId)

    var modal_header = "<span>فرم اهراز هویت</span>"
    var tablebutt = "<table class='table' style='font-size: 9px;'>"

    var BodyModal = "<table class='table table-boredered table-responsive'>"
    BodyModal += "<tr><td>نام کاربری</td><td><input autocomplete='off' type='text' name='username'/></td></tr>"
    BodyModal += "<tr><td>پسورد</td><td><input autocomplete='off' type='password' name='password'/></td></tr>"
    BodyModal += "</table>"

    tablebutt += "<tr>" +
        "<td><input type='button' class='btn btn-success' value='ذخیره' onclick='login()'/> | " +
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

async function login() {
    
    var username = $("#MasterModal input[name='username']").val()
    var password = $("#MasterModal input[name='password']").val()

     var obj = {}
    obj.url = "/Account/Authenticate"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = { UserName: username, Password: password}

    var results = await Promise.all([
        service(obj)
    ]);
    var result = results[0]

    if (result == true)
        location.reload();
    else {
        alert(result)
    }

}

async function Logout() {
    
    var obj = {}
    obj.url = "/Account/Logout"
    obj.dataType = "json"
    obj.type = "post"
    //obj.data = { UserName: username, Password: password }

    var results = await Promise.all([
        service(obj)
    ]);
    var result = results[0]
    if (result == true)
        location.reload();
}

