﻿//------------------chart
async function ChartDicLevel() {
    var obj = {}
    obj.url = "/Report/ChartDicLevel"
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

    return ListObj
}

async function ChartDicLevelPie() {
    var obj = {}
    obj.url = "/Report/ChartDicLevelPie"
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

    return ListObj
}




async function CreateChart1() {

    var data2 = await ChartDicLevelPie()
    var chart2 = new CanvasJS.Chart("chartContainer2",
        {
            theme: "light2",
            title: {
                text: "Dictionaty By Level"
            },
            data: [
                {
                    type: "pie",
                    showInLegend: true,
                    toolTipContent: "{y} - #percent %",
                    yValueFormatString: "#,##0,,.## Million",
                    legendText: "{indexLabel}",
                    dataPoints: data2
                    //dataPoints: [
                    //    { y: 4181563, indexLabel: "PlayStation 3" },
                    //    { y: 2175498, indexLabel: "Wii" },
                    //    { y: 3125844, indexLabel: "Xbox 360" },
                    //    { y: 1176121, indexLabel: "Nintendo DS" },
                    //    { y: 1727161, indexLabel: "PSP" },
                    //    { y: 4303364, indexLabel: "Nintendo 3DS" },
                    //    { y: 1717786, indexLabel: "PS Vita" }
                    //]
                }
            ]
        });
    chart2.render();
}
async function CreateChart2() {
    var dataCreateChart2 = await ChartDicLevel()

    var chart = new CanvasJS.Chart("chartContainer1", {
        title: {
            text: "Dictionary By Level"
        },
        // data: dataCreateChart2
        data: [
            {
                // Change type to "doughnut", "line", "splineArea", etc.
                type: "column",
                dataPoints: dataCreateChart2
            }
        ]
    });
    chart.render();
}


async function ChartKarKard(date) {
    var obj = {}
    obj.url = "/Report/ChartKarKard"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = {
        Date: date

    }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]

    return ListObj
}
async function CreateChartKarKard(thiss) {
    var today = todayShamsy()

    if (thiss == undefined)
        var month = convertDateToslashless(today).substr(0, 6)
    else
        var month = thiss.value

    var data = await ChartKarKard(month)

    var chart = new CanvasJS.Chart("CreateChartKarKard",
        {
            theme: "light2",
            title: {
                text: "Dictionaty By Level"
            },
            data: [
                {
                    type: "pie",
                    showInLegend: true,
                    toolTipContent: "{y} - #percent %",
                    yValueFormatString: "{label} - minute",
                    legendText: "{indexLabel}",
                    dataPoints: data

                }
            ]
        });
    chart.render();
}

//LineChartKarKard
async function DataLineChartKarKard(ndays) {
    var date = addDayReturnDate(ndays)

    var obj = {}
    obj.url = "/Report/LineChartKarKard"
    obj.dataType = "json"
    obj.type = "post"
    obj.data = {
        date: date,
    }
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]

    return ListObj
}
async function ReportLineChartKarKard(ndays) {

    var data = await DataLineChartKarKard(ndays)


    var chart = new CanvasJS.Chart("ReportLineChartKarKard",
        {

            title: {
                text: "Earthquakes - per month"
            },
            data: [
                {
                    type: "line",
                    dataPoints: data
                    //dataPoints: [
                    //    { x: new Date(2012, 00, 1), y: 450 },
                    //    { x: new Date(2012, 01, 1), y: 414 },
                    //    { x: new Date(2012, 02, 1), y: 520 },
                    //    { x: new Date(2012, 03, 1), y: 460 },
                    //    { x: new Date(2012, 04, 1), y: 450 },
                    //    { x: new Date(2012, 05, 1), y: 500 },
                    //    { x: new Date(2012, 06, 1), y: 480 },
                    //    { x: new Date(2012, 07, 1), y: 480 },
                    //    { x: new Date(2012, 08, 1), y: 410 },
                    //    { x: new Date(2012, 09, 1), y: 500 },
                    //    { x: new Date(2012, 10, 1), y: 480 },
                    //    { x: new Date(2012, 11, 1), y: 510 }
                    //]
                }
            ]
        }
    );

    chart.render();


}

//----------DicByDateMonthDateRefresh
async function DataDicByDateMonthDateRefresh() {
    var obj = {}
    obj.url = "/Report/DicByDateMonthDateRefresh"
    obj.dataType = "json"
    obj.type = "post"
    //obj.data = {
    //    date: date,
    //}
    var results = await Promise.all([
        service(obj)
    ]);
    var ListObj = results[0]

    return ListObj
}
async function ReportDicByDateMonthDateRefresh() {

    var data = await DataDicByDateMonthDateRefresh()


    var chart = new CanvasJS.Chart("DicByDateMonthDateRefresh",
        {

            title: {
                text: "DicByDateMonthDateRefresh"
            },
            data: [
                {
                    type: "line",
                    dataPoints: data
                }
            ]
        }
    );

    chart.render();


}




