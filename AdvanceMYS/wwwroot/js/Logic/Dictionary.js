


async function ListLevel() {
    $.LoadingOverlay("show");
    var obj = {}
    obj.url = "/Dictionary/ListLevel"
    obj.dataType = "json"
    obj.type = "post"
    //obj.data = {
    //    TaskId: TaskId,
    //    IsCheck: IsCheck,
    //    DateEnd: DateEnd

    //}
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]

    $.LoadingOverlay("hide");
    return ListObj
}
async function showLevel(level) {

    var ListObj = await ListLevel()


    //check mobile or web
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

        var table = "<table style='background-image: linear-gradient(to bottom, #5c9fe8, transparent);' class='table table-responsive'>"
        // alert("mobile")
    }
    else {
        var table = "<table  class='table' style='background-image: linear-gradient(to bottom, #5c9fe8, transparent);'>"
        // alert("web")
    }

    table += "<tr style='white-space: pre-wrap;'>"
    for (var i = 1; i <= 10; i++) {
        var res = ListObj.find(x =>
            x.nameLevel == i.toString())

        table += "<td><input " + (level == i ? 'checked' : '') + " onclick='ListWordLevel(" + i + ")' name='rdbLevel' type='radio' value='" + i + "' />  سطح : " + (res == undefined ? i : res.nameLevel) + " تعداد : " + (res == undefined ? 0 : res.countLevel) + "</td>"
    }
    table += "</tr>"

    table += "<tr style='white-space: pre-wrap;'>"
    table += "<td><input  onclick='ListWordLevel(" + 80 + ")' name='rdbLevel' type='radio' value='" + 80 + "' /> اشتباه تا 4  <span style='color:red' class='countRamindForRevise'></span></td>"
    table += "<td><input  onclick='ListWordLevel(" + 90 + ")' name='rdbLevel' type='radio' value='" + 90 + "' /> آخرین مرور  <span style='color:red' ></span></td>"

    table += "</tr>"


    var CurrentValue = ""
    $("input[name='rdbLevel']").each(function () {
        var result = $(this).is(":checked")
        if (result == true) {
            CurrentValue = $(this).val()


        }
    })

    $(".showLevel").empty()
    $(".showLevel").append(table)

    $("input[name='rdbLevel']").each(function () {
        if (CurrentValue == $(this).val()) {
            $(this).attr("checked", true)

        }
    })



}
async function ListWordLevel(level) {

    var obj = {}
    obj.url = "/Dictionary/ListWordLevel"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = {
        level: level,
    }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]
    // return ListObj
    showListWordLevel(ListObj)
    if (level == 80) {
        $(".countRamindForRevise").empty()
        $(".countRamindForRevise").append(" - " + ListObj.length)
    }
}
async function showListWordLevel(ListObj) {

    //  var ListObj = await ListWordLevel(level)

    var styleWord = ""
    var table = "<input onclick='CreateUpdateWord()'  type='button' class='btn btn-warning' value='جدید' />"
    table += "<input onkeyup='SearchExample(this)'  type='text' class='btn btn-info' placeholder='seach in example' />"
    //check mobile or web
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        table += "<table style='/*display: inline-table;*/' class='table table-striped table-responsive'>"
        // alert("mobile")
    }
    else {
        table += "<table  class='table table-striped'>"
        // alert("web")
    }
    // header th table
    table += "<tr  ><th>english</th><th>Persian</th><th>up</th><th>down</th><th>مثال</th><th>ویرایش</th><th>تعداد بار</th><th>نرخ</th><th>تعداد روز</th><th>DateRefresh</th><th>روز هفته</th><th>زمان</th><th>English</th><th>ترجمه</th><th>مثال جدید</th><th>حذف</th></tr>"
    for (var i = 0; i < ListObj.length; i++) {
        if (i % 2 == 0)
            styleWord = 'color:red;background-image: linear-gradient(45deg, black, transparent);'
        table += "<tr class='englishword_" + ListObj[i].id + "' style='" + styleWord + "'>"
        table += "<td onclick='makeSound(\"" + ListObj[i].eng + "\")'>" + ListObj[i].eng + "</td>" +
            "<td onclick='ShowAndHiddenPersian(" + ListObj[i].id + ",\"" + ListObj[i].eng + "\")'><span hidden class='per_" + ListObj[i].id + "' style='white-space: nowrap;'>" + ListObj[i].per + "</span></td>" +



            "<td><input type='button' style='background-color:red' value='غلط' onclick='levelUpDown({status:false,wordId:" + ListObj[i].id + "})'/></td>" +
            "<td><input type='button' style='background-color:green' value='درست' onclick='levelUpDown({status:true,wordId:" + ListObj[i].id + "})'/></td>"


        if (ListObj[i].exampleTbls.length > 0) {
            table += "<td><input type='button' value='نمایش " + ListObj[i].exampleTbls.length + "' onclick='showHiddenExample(" + ListObj[i].id + ",\"" + ListObj[i].eng + "\")'/></td>"
        }
        else {
            //table += "<td><input onclick='CreateUpdateExample(0,\"" + ListObj[i].eng + "\"," + ListObj[i].id + ")' type='button' value='مثال جدید'/></td>"
            table += "<td><input type='button' value='بدون مثال " + ListObj[i].exampleTbls.length + "' onclick='showHiddenExample(" + ListObj[i].id + ",\"" + ListObj[i].eng + "\")'/></td>"

        }

        table += "<td><input type='button'  value='ویرایش' onclick='CreateUpdateWord(" + ListObj[i].id + ")'/></td>"


        table += "<td><span style='color:blue'>" + ListObj[i].level + "</span>/" + (ListObj[i].successCount + ListObj[i].unSuccessCount) + "</td>" +

            "<td>" + (ListObj[i].successCount - ListObj[i].unSuccessCount) + "</td>" +
            "<td>" + numberDaysTwoDate(todayShamsy8char(), ListObj[i].dateRefresh) + "</td>" +
            "<td>" + formatDate(ListObj[i].dateRefresh) + "</td>" +
            "<td>" + calDayOfWeek(ListObj[i].dateRefresh) + "</td>" +
            "<td>" + ListObj[i].time + "</td>" +
            "<td>" +
            "<a target='_blank' href='https://www.oxfordlearnersdictionaries.com/definition/english/" + ListObj[i].eng + "'>Oxford</a> | " +
            "<a target='_blank' href='https://www.ldoceonline.com/dictionary/" + ListObj[i].eng + "'>Longman</a>" +
            "</td > " +
            "<td>" +
            "<a target='_blank' href='https://translate.google.com/?hl=en&tab=wT#view=home&op=translate&sl=en&tl=fa&text=" + ListObj[i].eng + "'>google</a> | " +
            "<a target='_blank' href='https://abadis.ir/?lntype=entofa,entoen,abbr&word=" + ListObj[i].eng + "&from=ac'>abadis</a>" +
            "</td > " +
            "<td><input onclick='CreateUpdateExample(0,\"" + ListObj[i].eng + "\"," + ListObj[i].id + ")' type='button' value='مثال جدید'/></td>" +
            "<td><input type='button'  value='حذف' onclick='DeleteWord(" + ListObj[i].id + ")'/></td>"

        table += "</tr>"
        // example
        for (var j = 0; j < ListObj[i].exampleTbls.length; j++) {
            // ColorForWordInExampl(ListObj[i].exampleTbls[j].id)

            var exampleForTranslate = ListObj[i].exampleTbls[j].example
            exampleForTranslate = exampleForTranslate.replace(/'/g, ',')

            table += "<tr hidden class='examples_" + ListObj[i].exampleTbls[j].idDicTbl + "'>"
            table += "<td colspan='16' style='text-align: left; direction: ltr;white-space: pre;'><div class='example_" + ListObj[i].exampleTbls[j].id + "'>" +
                ListObj[i].exampleTbls[j].example +
                "</div>" +
                //"<div class='AddExamples_" + ListObj[i].exampleTbls[j].id + "'></div>" +
                "<div class='TranslateWordByWord_" + ListObj[i].exampleTbls[j].id + "'></div>" +
                "</br > <input onclick='makeSoundExample(" + ListObj[i].exampleTbls[j].id + ")' type='button' value='تلفظ' /> | " +
                "<input onclick='CreateUpdateExample(" + ListObj[i].exampleTbls[j].id + ")' type='button' value='ویرایش' /> | " +
                "<input onclick='DeleteExample(" + ListObj[i].exampleTbls[j].id + ")' type='button' value='حذف' /> | " +
                "<a target='_blank' href='https://translate.google.com/?hl=en&tab=wT#view=home&op=translate&sl=en&tl=fa&text=" + exampleForTranslate + "'>ترجمه</a> | " +
                "<input class='btn btn-info' onclick='TranslateWordByWord(" + ListObj[i].exampleTbls[j].id + ")' type='button' value='ترجمه لغات' />  " +
                "</td>"
            table += "</tr>"
        }
    }
    table += "</table>"



    $(".showListWordLevel").empty()
    $(".showListWordLevel").append(table)



}
async function showHiddenExample(id, eng) {

    makeSound(eng)

    await AddExamples(eng, id);
    //-----------
    var res = $(".examples_" + id).attr("hidden");
    if (res == "hidden") {
        $(".examples_" + id).attr("hidden", false);
    }
    else {
        $(".examples_" + id).attr("hidden", true);
    }


    var eng = eng.toLowerCase();
    $(".examples_" + id + " div").each(function () {

        $(this).html($(this).html().replace(
            new RegExp(eng, 'g'), '<span style="color:red">' + eng + '</span>'
        ));
    });


    var eng = $("input[name='searchExample']").val()
    eng = eng.toLowerCase();
    if (eng.length < 1) return
    $(".examples_" + id + " div").each(function () {

        $(this).html($(this).html().replace(
            new RegExp(eng, 'g'), '<span style="color:blue">' + eng + '</span>'
        ));
    });


}

async function AddExamples(eng, idWord) {
    $(".AddExample").empty()
    var obj = {}
    obj.url = "/Dictionary/AddExamples"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = {
        eng: eng,
    }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]


    var newContent = ""
    for (var i = 0; i < ListObj.length; i++) {

        var exampleForTranslate = ListObj[i].example
        exampleForTranslate = exampleForTranslate.replace(/'/g, ',')

        newContent += "<tr hidden class='examples_" + idWord + "' style='text-align: left; direction: ltr; white-space: pre;'>" +
            "<td colspan='16' style='text-align: left; direction: ltr;white-space: pre;'><div class='example_" + ListObj[i].id + "'>" + ListObj[i].eng + " : <br>" +
            ListObj[i].example +
            "</div>" +
            "<div class='AddExamples_" + ListObj[i].id + "'></div>" +
            "<div class='TranslateWordByWord_" + ListObj[i].id + "'></div>" +
            "</br > <input onclick='makeSoundExample(" + ListObj[i].id + ")' type='button' value='تلفظ' /> | " +
            "<input onclick='CreateUpdateExample(" + ListObj[i].id + ")' type='button' value='ویرایش' /> | " +
            "<input onclick='DeleteExample(" + ListObj[i].id + ")' type='button' value='حذف' /> | " +
            "<a target='_blank' href='https://translate.google.com/?hl=en&tab=wT#view=home&op=translate&sl=en&tl=fa&text=" + exampleForTranslate + "'>ترجمه</a> | " +
            "<input class='btn btn-info' onclick='TranslateWordByWord(" + ListObj[i].id + ")' type='button' value='ترجمه لغات' />  " +
            "</td>" +
            "</tr > "
    }

    //$(".examples_" + idExample).empty()
    $(".englishword_" + idWord).after(newContent)


    //------------------------------



    return ListObj


}
function ShowAndHiddenPersian(id, eng) {
    makeSound(eng)
    //var eng = $(".per_" + id).parent().prev().text()
    //TestSound(eng)
    var res = $(".per_" + id).attr("hidden");
    if (res == "hidden") {
        $(".per_" + id).attr("hidden", false);
    }
    else {
        $(".per_" + id).attr("hidden", true);
    }


}

function makeSound(str) {

    var x = 10;// varx = $("Body input[name='SpeedSpeach']").val();
    var y = 10;// varx = $("Body input[name='SoundSpeach']").val();

    text = str;
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    // msg.voice = voices[$('#voices').val()];
    msg.rate = x / 10;// $('#rate').val() / 10;
    msg.pitch = y / 10;//$('#pitch').val();
    msg.text = text;

    msg.onend = function (e) {
        console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };

    speechSynthesis.speak(msg);

}
function makeSoundExample(exampleId) {

    var text = $(".example_" + exampleId).text();
    makeSound(text)
}
async function FindExample(exampleId) {

    var obj = {}
    obj.url = "/Dictionary/FindExample"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = {
        exampleId: exampleId,
    }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]
    return ListObj

}
async function TranslateWordByWord(exampleId) {
    $.LoadingOverlay("show");
    var obj = {}
    obj.url = "/Dictionary/TranslateWordByWord"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = {
        exampleId: exampleId,
    }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]

    // return ListObj
    var table = "<hr><br>"
    table += "<input onclick='CreateUpdateWord()' type='button' class='btn btn-warning' value='جدید'>"
    table += "<table>"

    for (var i = 0; i < ListObj.length; i++) {
        table += "<tr>"
        table += "<td onclick='makeSound(\"" + ListObj[i].eng + "\")'>" + ListObj[i].eng + "</td> <td>" + ListObj[i].per + "</td>" +
            "<td>" + ListObj[i].level + "</td>" +
            "<td><input type='button' style='background-color:green' value='True' onclick='levelUpDown2({status:true,wordId:" + ListObj[i].id + ",exampleId:" + exampleId + "})'></td>" +
            "<td><input type='button' style='background-color:red' value='False' onclick='levelUpDown2({status:false,wordId:" + ListObj[i].id + ",exampleId:" + exampleId + "})'></td> " +
            "<td><input type='button' style='background-color:blue' value='Edit' onclick='CreateUpdateWord(" + ListObj[i].id + ")'></td>" +
            "<td><input type='button' style='background-color:gray' value='Sound'  onclick='makeSound(\"" + ListObj[i].eng + "\")'></td>" +
            "<td><input type='button' style='background-color:#f3c333' value='Delete'  onclick='DeleteWord(\"" + ListObj[i].id + "\")'></td>" +
            "<td><a target='_blank' href='https://translate.google.com/?hl=en&tab=wT#view=home&op=translate&sl=en&tl=fa&text=" + ListObj[i].eng + "'>google</a> | " +
            "<a target='_blank' href='https://abadis.ir/?lntype=entofa,entoen,abbr&word=" + ListObj[i].eng + "&from=ac'>abadis</a>" +
            "</td >"
        table += "</tr>"
    }
    table += "</table>"
    $(".TranslateWordByWord_" + exampleId).empty()
    $(".TranslateWordByWord_" + exampleId).append(table)
    $.LoadingOverlay("hide");





    for (var i = 0; i < ListObj.length; i++) {
        $(".example_" + exampleId).html($(".example_" + exampleId).html().toLowerCase().replace(new RegExp(ListObj[i].eng.toLowerCase(), 'g'), "<span style='border-bottom: 1px solid red;'>" + ListObj[i].eng + "</span>"))
    }



}

async function ColorForWordInExampl(exampleId) {
    var obj = {}
    obj.url = "/Dictionary/TranslateWordByWord"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = {
        exampleId: exampleId,
    }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]



    for (var i = 0; i < ListObj.length; i++) {
        $(".example_" + exampleId).html($(".example_" + exampleId).html().toLowerCase().replace(new RegExp(ListObj[i].eng.toLowerCase(), 'g'), "<span style='border-bottom: 1px solid red;'>" + ListObj[i].eng + "</span>"))
    }



}
async function FindWord(wordId) {

    var obj = {}
    obj.url = "/Dictionary/FindWord"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = {
        wordId: wordId,
    }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]
    return ListObj

}
async function CreateUpdateExample(exampleId, eng, wordId) {



    if (exampleId > 0) {

        var ListObj = await FindExample(exampleId)

        var table = "<div class='form-group'>" +
            "<textarea style='direction: ltr;'  name='example' class='form-control'   rows='9'>" + ListObj.example + "</textarea>" +
            "</div >"
    }
    else {
        var table = "<div class='form-group'>" +
            "<textarea style='direction: ltr;'  name='example' class='form-control'  rows='3'></textarea>" +
            "</div >"
    }


    var modal_footer = "<table><tr>" +
        "<td><input type='button' class='btn btn-success' value=" + (exampleId > 0 ? 'ویرایش' : 'ایجاد') + " onclick='CreaetUpdateExamplePost(" + exampleId + "," + (ListObj == undefined ? wordId : ListObj.idDicTbl) + ")'/> | " +
        "<input type='button'  class='btn btn-danger' value='بستن' onclick='closeModal()'/></td>" +
        "</tr>"
    modal_footer += "</table>"


    var modal_header = "<span>" + (eng == undefined ? 'ویرایش مثال' : eng) + "</span>"
    $("#MasterModal .modal-header").empty();
    $("#MasterModal .modal-header").append(modal_header);


    $("#MasterModal .modal-footer").empty();
    $("#MasterModal .modal-footer").append(modal_footer);

    $("#MasterModal .BodyModal").empty();
    $("#MasterModal .BodyModal").append(table);

    $("#MasterModal").modal();

}
async function CreaetUpdateExamplePost(exampleId, wordId) {


    var example = $("#MasterModal textarea[name='example']").val()


    var obj = {}
    obj.url = "/Dictionary/CreateUpdateExample"
    obj.dataType = "json"
    obj.type = "POST"
    obj.data = { Id: exampleId, IdDicTbl: wordId, example: example }

    var results = await Promise.all([
        service(obj)
    ]);
    var ListtObj = results[0]


    showAlert(ListtObj, 2000);

    var level = $("input[name='rdbLevel']:checked").val()
    showLevel(level)
    ListWordLevel(level)
    $("#MasterModal").modal("toggle")


}
async function levelUpDown(objectWord) {


    var obj = {}
    obj.url = "/Dictionary/UpdateDicWord"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = {
        UpOrDown: objectWord.status,
        Id: objectWord.wordId

    }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]
    var level = $("input[name='rdbLevel']:checked").val()

    showLevel(level)
    //showAlert(ListObj, 2000)
    ListWordLevel(level)
    ReportDicByDateMonthDateRefresh()

}
async function levelUpDown2(objectWord) {


    var obj = {}
    obj.url = "/Dictionary/UpdateDicWord"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = {
        UpOrDown: objectWord.status,
        Id: objectWord.wordId

    }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]
    //var level = $("input[name='rdbLevel']:checked").val()

    TranslateWordByWord(objectWord.exampleId)

}
async function SearchOldWord(thiss) {

    if (thiss.value.length < 3) return
    var word = (thiss.value).trim()
    var obj = {}
    obj.url = "/Dictionary/SearchOldWord"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = {
        str: word
    }
    var results = await Promise.all([
        service(obj)

    ]);
    var ListObj = results[0]

    $("#SearchOldWord").empty()
    var table = ""
    for (var i = 0; i < ListObj.length; i++) {
        table += "<p>" + ListObj[i].eng + ' ' + ListObj[i].per + "</p>"
    }
    $("#SearchOldWord").append(table)
}
async function CreateUpdateWord(wordId) {



    if (wordId > 0) {
        var ListtObj = await FindWord(wordId)


        var table = "<table class='table table-responsive'>" +

            "<tr><td>انگلیسی</td><td><input type='text'  name='eng'  autocomplete='off' value=\"" + ListtObj.eng + "\"  /><span id='SearchOldWord'></span></td></tr>" +
            "<tr><td>فارسی</td><td><textarea placehoder='توضیحات' name='per' class='form-control' rows='3'>" + ListtObj.per + "</textarea></td></tr>" +




            "<tr><td>سطح</td><td><input disabled type='number'  name='level'  autocomplete='off' value=" + ListtObj.level + "  /></td></tr>" +
            "<tr><td>زمان ایجاد</td><td>" + ListtObj.time + " </td></tr>" +
            "<tr><td>تاریخ ایجاد</td><td>" + formatDate(ListtObj.dateS) + " </td></tr>" +
            "<tr><td>آخرین مرور</td><td>" + formatDate(ListtObj.dateRefresh) + " </td></tr>" +

            "</table > "
    }
    else {
        var table = "<table class='table table-responsive'>" +

            "<tr><td>انگلیسی</td><td><input type='text'  name='eng' onKeyup='SearchOldWord(this)'  autocomplete='off'   /><span id='SearchOldWord'></span></td></tr>" +
            "<tr><td>فارسی</td><td><textarea placehoder='توضیحات' name='per' class='form-control' rows='3'></textarea></td></tr>" +




            "<tr><td>سطح</td><td><input disabled type='number'  name='level'  autocomplete='off' value=" + 10 + "  /></td></tr>" +
            "<tr><td>تاریخ ایجاد</td><td>" + todayShamsy() + " </td></tr>" +
            "<tr><td>آخرین مرور</td><td>" + todayShamsy() + " </td></tr>" +

            "</table > "
    }


    var modal_footer = "<table><tr>" +
        "<td><input type='button' class='btn btn-success' value=" + (wordId > 0 ? 'ویرایش' : 'ایجاد') + " onclick='CreaetUpdateWordPost(" + wordId + ")'/> | " +
        "<input type='button'  class='btn btn-danger' value='بستن' onclick='closeModal()'/></td>" +
        "</tr>"
    modal_footer += "</table>"


    var modal_header = "<span>" + (wordId > 0 ? 'ویرایش لغت' : 'ایجاد لغت جدید') + "</span>"
    $("#MasterModal .modal-header").empty();
    $("#MasterModal .modal-header").append(modal_header);


    $("#MasterModal .modal-footer").empty();
    $("#MasterModal .modal-footer").append(modal_footer);

    $("#MasterModal .BodyModal").empty();
    $("#MasterModal .BodyModal").append(table);

    $("#MasterModal").modal();
}
async function CreaetUpdateWordPost(wordId) {




    var eng = $("#MasterModal input[name='eng']").val()
    var per = $("#MasterModal textarea[name='per']").val()
    //  var level = $("#MasterModal input[name='level']").val()

    var obj = {}
    obj.url = "/Dictionary/UpdateDicWord"
    obj.dataType = "json"
    obj.type = "POST"
    obj.data = { Eng: eng, Per: per, Id: wordId }

    var results = await Promise.all([
        service(obj)
    ]);
    var ListtObj = results[0]



    $("#MasterModal").modal("toggle")
    var level = $("input[name='rdbLevel']:checked").val()
    showLevel(level)
    ListWordLevel(level)
    showAlert(ListtObj, 2000);




}
async function SearchExample(thiss) {
    if (thiss.value.length > 2) {
        var obj = {}
        obj.url = "/Dictionary/SearchExample"
        obj.dataType = "json"
        obj.type = "post"
        obj.data = {
            str: thiss.value,
        }
        var results = await Promise.all([
            service(obj)
        ]);
        var ListObj = results[0]


        showListWordLevel(ListObj)
    }

}
async function SearchWord(thiss) {
    if (thiss.value.length > 2) {
        var obj = {}
        obj.url = "/Dictionary/SearchWord"
        obj.dataType = "json"
        obj.type = "post"
        obj.data = {
            str: thiss.value,
        }
        var results = await Promise.all([
            service(obj)
        ]);
        var ListObj = results[0]


        showListWordLevel(ListObj)
    }

}
async function DeleteExample(Id) {
    var obj = {}
    obj.url = "/Dictionary/DeleteExample"
    obj.dataType = "json"
    obj.type = "POST"
    obj.data = { Id: Id }

    var results = await Promise.all([
        service(obj)
    ]);
    var ListtObj = results[0]


    showAlert(ListtObj, 2000);

    var level = $("input[name='rdbLevel']:checked").val()
    showLevel(level)
    ListWordLevel(level)
    // $("#MasterModal").modal("toggle")
}
async function DeleteWord(Id) {
    var obj = {}
    obj.url = "/Dictionary/DeleteWord"
    obj.dataType = "json"
    obj.type = "POST"
    obj.data = { Id: Id }

    var results = await Promise.all([
        service(obj)
    ]);
    var ListtObj = results[0]


    showAlert(ListtObj, 2000);

    var level = $("input[name='rdbLevel']:checked").val()
    showLevel(level)
    ListWordLevel(level)
    // $("#MasterModal").modal("toggle")
}




