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
                console.log("Start Service.js Service Error ...................");
                console.log(a);
                console.log("End Service.js Service Error ......................");
                alert("خطا در اجرای سرویس باید مشخص شود که از قطعی اینترنت یا نه");
                $.LoadingOverlay("hide");
            }
        });
    })
}