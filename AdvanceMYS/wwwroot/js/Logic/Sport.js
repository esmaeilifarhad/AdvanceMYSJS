async function ListSportFilter(CatId) {

    var obj = {}
    obj.url = "/Sport/ListSportFilter"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = { _CatId: CatId }
    //var res=await service(obj);
    var results = await Promise.all([
        service(obj)
    ]);

    var resListSportFilter = results[0]
    showListSportFilter(resListSportFilter, CatId)


}
//$("body").on("click", ".SaveNewSport", function () {
//    SaveNewSport();
//});
async function SaveNewSport(CatId) {

    $.LoadingOverlay("show");
    var Date = $("input[name='DateEnd']").val();
    Date = convertDateToslashless(Date)
    var Tedad = $("input[name='Tedad']").val();

    var obj = {}
    obj.url = "/Sport/CreateNewSport"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = {
        Date: Date,
        Tedad: Tedad,
        CatId: CatId
    }
    var results = await Promise.all([
        service(obj)
    ]);

    var res = results[0]
    ListSportFilter(CatId)

    $.LoadingOverlay("hide");

}


function showListSportFilter(resListSportFilter, CatId) {
    
    $.LoadingOverlay("show");
    var showRateTaskDays = "<div style='font-size:14px;    background-image: linear-gradient(45deg, #98c6f5, transparent);'><table class='table-bordered table-responsive table-striped'>"
    var oldDate = ""
    for (let index = 0; index < resListSportFilter.length; index++) {
        //فقط بار اول اجرا میشود
        if (oldDate == "") {
            showRateTaskDays += "<tr>"
            showRateTaskDays += "<td>" + resListSportFilter[index].title + "</td>" +
                "<td>" + formatDate(resListSportFilter[index].date) + "   " + calDayOfWeek(resListSportFilter[index].date) + "</td>" +

                "<td class='tedad' onclick='DeleteSport({Date:" + resListSportFilter[index].date + ",Title:\"" + resListSportFilter[index].title + "\",SportId:" + resListSportFilter[index].sportId + ",CatId:" + resListSportFilter[index].catId + ",Tedad:" + resListSportFilter[index].tedad + "})'>" + resListSportFilter[index].tedad + "</td>"

        }
        if (resListSportFilter[index].date != oldDate && oldDate != "") {
            showRateTaskDays += "</tr><tr>"
            showRateTaskDays += "<td>" + resListSportFilter[index].title + "</td>" +
                "<td>" + formatDate(resListSportFilter[index].date) + "   " + calDayOfWeek(resListSportFilter[index].date) + "</td>" +
                "<td class='tedad' onclick='DeleteSport({Date:" + resListSportFilter[index].date + ",Title:\"" + resListSportFilter[index].title + "\",SportId:" + resListSportFilter[index].sportId + ",CatId:" + resListSportFilter[index].catId + ",Tedad:" + resListSportFilter[index].tedad + "})'>" + resListSportFilter[index].tedad + "</td>"
        }
        if (resListSportFilter[index].date == oldDate && oldDate != "") {
            showRateTaskDays += "<td class='tedad' onclick='DeleteSport({Date:" + resListSportFilter[index].date + ",Title:\"" + resListSportFilter[index].title + "\",SportId:" + resListSportFilter[index].sportId + ",CatId:" + resListSportFilter[index].catId + ",Tedad:" + resListSportFilter[index].tedad + "})'>" + resListSportFilter[index].tedad + "</td>"
        }
        if (index == resListSportFilter.length - 1) {
            showRateTaskDays += "</tr>"
        }
        oldDate = resListSportFilter[index].date
    }
    showRateTaskDays += "</table></div>"

    $(".ListSportCatId").empty()
    $(".ListSportCatId").append(showRateTaskDays)

    $.LoadingOverlay("hide");

    ColorAvgMax(CatId)
    colorSum()
    findRotbeh()
}
function ListSport() {

    var urll = "/Sport/List";
    $.ajax({
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "html",
        url: urll,
        success: function (data) {
            $(".ListSport").html(data);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function CreateSportPost() {
    var Date = $("#bd-root-PersianDatePicker input[type=text]").val();
    var Tedad = $("#MasterModal input[name='Tedad']").val();
    var CatId = $("#MasterModal Select option:selected").val();
    var Set = $("#MasterModal input[name='Set']").val();

    var StrTedad = Tedad;
    $.ajax(
        {
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            url: "/Sport/Create?StrTedad=" + StrTedad,
            data: JSON.stringify({
                Date: Date,
                Tedad: Tedad,
                CatId: CatId,
                Set: Set
            }),
            success: function (result) {
                if (result != "")
                    alert(result);
                RefreshSport();
            },
            error: function (error) {
                console.log(error);
            }
        });
}
function CreateSportGet() {

    $.ajax(
        {
            type: 'get',
            contentType: "application/json;charset=utf-8",
            dataType: "html",
            url: "/Sport/Create",
            success: function (result) {
                $(".BodyModal").html(result);
                $("#MasterModal").modal();
            },
            error: function (error) {
                console.log(error);
            }
        }
    );
}
function EditSport(Id) {
    $.ajax(
        {
            type: 'get',
            contentType: "application/json;charset=utf-8",
            dataType: "html",
            url: "/Sport/Edit?Id=" + Id,
            success: function (result) {
                $(".BodyModal").html(result);
                $("#MasterModal").modal();
            },
            error: function (error) {
                console.log(error);
            }
        });
}
function UpdateSportPost() {
    var CatId = $("#MasterModal div[name='UpdateMaterData'] table").attr("CatId");
    var Code = $("#MasterModal input[name='Code']").val();
    var Dsc = $("#MasterModal input[name='Dsc']").val();
    $.ajax(
        {
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            url: "/Sport/Update",
            data: JSON.stringify({
                Title: Title,
                Code: Code,
                Dsc: Dsc,
                CatId: CatId
            }),
            success: function (result) {
                RefreshSport();
            }
        });
}
function DeleteSport(objData) {



    var modal_header = "<span>آیا حذف انجام شود ؟ </span>"

    var table = "<table class='table-bordered table-striped'>" +
        "<tr><td>عنوان</td><td>" + objData.Title + "</td></tr>" +
        "<tr><td>تاریخ</td><td>" + formatDate(objData.Date) + "</td></tr>" +
        "<tr><td>تعداد</td><td>" + objData.Tedad + "</td></tr>" +
        "</table > "
    var modal_footer = "<table><tr>" +
        "<td><input type='button' class='btn btn-success' value='حذف' onclick='DeleteSportPost({SportId:" + objData.SportId + ",CatId:" + objData.CatId + "})'/> | " +
        "<input type='button'  class='btn btn-danger' value='بستن' onclick='closeModal()'/></td>" +
        "</tr>"
    modal_footer += "</table>"


    $("#MasterModal .modal-header").empty();
    $("#MasterModal .modal-header").append(modal_header);


    $("#MasterModal .modal-footer").empty();
    $("#MasterModal .modal-footer").append(modal_footer);



    $("#MasterModal .BodyModal").empty();
    $("#MasterModal .BodyModal").append(table);

    $("#MasterModal").modal();
}
async function DeleteSportPost(objData) {

    //var res = confirm("آیا حذف انجام شود؟" + "\n" + objData.Title + "\n تاریخ : " + formatDate(objData.Date) + "\n تعداد : " + objData.Tedad);

    //if (res == true) {
    $.LoadingOverlay("show");

    var SportId = objData.SportId
    var obj = {}
    obj.url = "/Sport/Delete",
        obj.dataType = "json"
    obj.type = "post"
    obj.data = { Id: SportId }

    var results = await Promise.all([
        service(obj)
    ]);

    var resListSportFilter = results[0]
    showAlert("حذف انجام شد", 2000)
    var CatId = objData.CatId
    $("#MasterModal").modal("toggle");
    ListSportFilter(CatId)
    $.LoadingOverlay("hide");

}
function RefreshSport() {
    ListSport();
    //ShowPivotSport();
    //ShowPivotSportOrder();
    //ShowPivotGroupingSets();
}
//----------
function ColorAvgMax(CatId) {

    var MaxNum = 0;
    var MinNum = 1000000;
    var AvgNum = 0;
    var CountNum = 0;
    $(".ListSportCatId table tr .tedad").each(function () {
        var y = parseInt($(this).text());
        AvgNum = AvgNum + y
        CountNum = CountNum + 1
        if (y > MaxNum) {
            MaxNum = y;
            //this.setAttribute("style","color:blue")
        }
        if (y < MinNum) {
            MinNum = y;
            //this.setAttribute("style","color:blue")
        }

    })
    $(".ListSportCatId table tr .tedad").each(function () {

        var y = parseInt($(this).text());
        if (y > (AvgNum / CountNum)) {
            this.setAttribute("style", "color:green")
        }
        if (y < (AvgNum / CountNum)) {
            this.setAttribute("style", "color:red")
        }
        if (y == MaxNum) {
            //MaxNum=y;
            this.setAttribute("style", "color:blue")
        }
        if (y == MinNum) {
            //MaxNum=y;
            this.setAttribute("style", "color:gray")
        }

    })
    var sum = 0
    $(".ListSportCatId table tr").each(function () {
        sum = 0
        $(this).find(".tedad").each(function () {

            sum += parseInt($(this).text());
        })

        $(this).append("<td class='sum' style='font-size:13px;background-color:yellow'>" + sum + "</td>")
    })

    $(".ListSportChk").empty();

    var table = "<table class='table table-responsive table-bordered' style='font-size:12px;background-image: linear-gradient(to top, #17a2b8, transparent);'>" +
        "<tr style='text-align:center'><td style='color:blue'>بهترین</td><td>میانگین</td><td>بدترین</td></tr>" +
        "<tr style='text-align:center'><td>" + MaxNum + "</td><td>" + (AvgNum / CountNum).toFixed(1) + "</td><td>" + MinNum + "</td></tr>" +

        "<tr><td> <input type='number' value=" + (AvgNum / CountNum).toFixed(0) + " placeholder='تعداد' name='Tedad'></td>" +
        "<td><input type='text' name='DateEnd'  value=" + todayShamsy() + " autocomplete='off'  ></td>" +
        "<td><input type='button' class='btn btn-danger' value='Save' style='color:forestgreen' onclick='SaveNewSport(" + CatId + ")'></td></tr>" +

        "<table>"
    $(".ListSportChk").append(table);
    $(".saveData input[name='Tedad']").focus()

    $("input[name='DateEnd']").persianDatepicker({
        formatDate: "YYYY/0M/0D"
    });

}
function colorSum() {
    var MaxNum = 0;
    var MinNum = 1000000;
    var AvgNum = 0;
    var CountNum = 0;
    $(".ListSportCatId table tr .sum").each(function () {
        var y = parseInt($(this).text());
        AvgNum = AvgNum + y
        CountNum = CountNum + 1
        if (y > MaxNum) {
            MaxNum = y;
            //this.setAttribute("style","color:blue")
        }
        if (y < MinNum) {
            MinNum = y;
            //this.setAttribute("style","color:blue")
        }

    })
    $(".ListSportCatId table tr .sum").each(function () {

        var y = parseInt($(this).text());
        if (y > (AvgNum / CountNum)) {
            this.setAttribute("style", "background-color:green;color:white")
        }
        if (y < (AvgNum / CountNum)) {
            this.setAttribute("style", "background-color:red;color:white")
        }
        if (y == MaxNum) {
            //MaxNum=y;
            this.setAttribute("style", "background-color:blue;color:white")
        }
        if (y == MinNum) {
            //MaxNum=y;
            this.setAttribute("style", "background-color:gray;color:white")
        }

    })
}
function findRotbeh() {

    var i = 0
    //var arraySport = new Array();
    //arraySport
    arraySport = [];
    $(".tedad").each(function () {
        arraySport.push(parseInt($(this)[0].textContent));
        //console.log($(this)[0].textContent);
        //i = i + 1
    })
    //---------find rotbe
    // arraySport.sort();
    // arraySport.reverse();

    arraySport.sort(function (a, b) {
        return parseInt(b) - parseInt(a);
    });

    // console.log(arraySport);
    $(".tedad").each(function () {
        for (i = 0; i < arraySport.length; ++i) {
            //console.log(arraySport[i]);
            if (arraySport[i] == $(this)[0].textContent) {
                $(this).append(" - <span style='color:black'>" + (i + 1) + "/" + arraySport.length + "</span>")
                // console.log(arraySport[i] + " - " + (i + 1) + "/" + arraySport.length)
                break;
            }
        }
    });



}

