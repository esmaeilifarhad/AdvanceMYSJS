 function service(obj) {

     return new Promise(resolve => {

        $.ajax({
            type:obj.type,
            url: obj.url,
            //contentType: "application/json; charset=utf-8",
            contentType: 'application/x-www-form-urlencoded',
            //xhrFields: {
            //    'withCredentials': true
            //},
          
            dataType: obj.dataType,
            

            data: obj.data,
            //data: JsonSerializer.Serialize(obj.data),
            //data: jQuery.param(bj.data) ,
            //processData: false,
            success: function (data) {
                
                resolve(data)
            },
            error: function (a) {
                if (a.status == 401) {
                   // alert("شما هنوز اهراز هویت نشده اید")
                    LoginForm()
                }
                else if (a.status == 403) {
                    alert("شما دسترسی لازم برای این عمل را ندارید")
                    console.log(a);
                }
                else {
                    console.log("Start Service.js Service Error ...................");
                    console.log(a);
                    console.log("End Service.js Service Error ......................");
                    showAlert("خطا در اجرای سرویس باید مشخص شود که از قطعی اینترنت یا نه",5000);
                }
                $.LoadingOverlay("hide");
            }
        });
    })
}