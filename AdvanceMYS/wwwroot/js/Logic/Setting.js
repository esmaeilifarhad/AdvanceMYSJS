async function getDataSetting() {
   
        var obj = {}
        obj.url = "/Setting/Index"
        obj.dataType = "json"
        obj.type = "POST"
        //obj.data = { Code: Code }

        var results = await Promise.all([
            service(obj)
        ]);
        var ListtObj = results[0]

        return ListtObj;
   
}
async function Setting(className) {
    var listObj = await getDataSetting()
    
    var grid = gridSetting(listObj)
    $("." + className).empty()
    $("." + className).append(grid)
}
function gridSetting(listObj) {
    var table = tableReturn();
    
    for (var i = 0; i < listObj.length; i++) {
        
        table += "<tr>"
        table += "<td>" + listObj[i].name + "</td><td>" + listObj[i].value + "</td>"
        table += "</tr>"
    }
    table += "</table>"
    return table
}