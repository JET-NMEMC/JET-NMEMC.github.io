var consituate = {};
// var cstlist = ["k1_j", "o1_j", "m2_j", "s2_j", "2n2_j", "j1_j", "k2_j", "l2_j", "m1_j", "mu2_j", "n2_j", "nu2_j", "oo1_j", "p1_j", "q1_j", "t2_j"];
var cstlist = ["O1", "K1", "M2", "S2", "2N2", "J1", "K2", "L2", "M1", "MU2", "N2", "NU2", "OO1", "P1", "Q1", "T2"];
var cstlist2 = ["MF", "MM", "MSF", "MSM", "MTM", "SA", "SSA"];
var textstr
for (var i = 0; i < cstlist.length; i++) {
    document.write('<script src="TidePredict/omap/' + cstlist[i] + '.js" type="text/javascript"></script>');
}
// for (var i = 0; i < cstlist2.length; i++) {
// document.write('<script src="TidePredict/omap2/'+cstlist2[i]+'.js" type="text/javascript"></script>');
// }

//-------------------------设置地图
var map = L.map('map', { zoomControl: false, }).setView([31.59, 120.29], 7);
L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 12,
    minZoom: 4,
    pane: 'overlayPane'
}).addTo(map);

//-------------------------设置时间
var now = new Date();
document.getElementById('t1').value = format(now, "yyyy-MM-dd");
document.getElementById('t2').value = format(new Date(now.getTime() + 1000 * 60 * 60 * 24), "yyyy-MM-dd");

//-----------------------调和曲线并出图
function run() {
    // var time_0 = new Date("2021-12-12 00:00");
    // var time_1 = new Date("2021-12-14 00:00");
    var time_0 = new Date(document.getElementById('t1').value + ' 00:00');
    var time_1 = new Date(document.getElementById('t2').value + ' 00:00');
    // var time_0 = new Date("2021-12-12 00:00 GMT+0800");
    // var time_1 = new Date("2021-12-14 00:00 GMT+0800");
    var time_step = Number(document.getElementById('s0').value);
    var phaseKey = 'phase';
    // var phaseKey = 'phase_GMT';
    console.log("time start:", time_0);
    console.log("time  end :", time_1);

    var text0 = [];
    textstr = '';
    var constituents = tableStringToArr('name amplitude	phase\n' + document.getElementById('canshu').value).objArr;

    var time_j = time_0;

    while (time_j <= time_1) {
        var waterLevel = tidePredictor(constituents, { phaseKey: phaseKey }).getWaterLevelAtTime({
            time: time_j,
        });
        text0.push(formatDateTime(waterLevel.time) + ',' + waterLevel.level.toFixed(3));
        // textstr = textstr + formatDateTime(waterLevel.time) + '\t' + waterLevel.level.toFixed(4) + '\n';
        time_j.setMinutes(time_j.getMinutes() + time_step)
    };
    textstr = text0.join('\n');

    textstr = "DateTime,WaterLevel(m)\n" + textstr;
    document.getElementById('text').innerHTML = textstr;

    var g = new Dygraph(
        document.getElementById("graphdiv"),  // containing div
        textstr,
        {
            // legend: 'always',
            title: document.getElementById('site').value + '潮位预报曲线 |' + ' 时区:-0800 (东8区) | 潮高基准面:平均海平面',
            // showRoller: true,
            // rollPeriod: 14,
            // customBars: true,
            ylabel: '潮汐高度 (m)',
            xlabel: '时刻 (t)',
        }
    );
}

var poline = L.polyline([[20, 110], [20, 165], [65, 165], [65, 110], [20, 110]]).addTo(map);
var marker = L.marker([document.getElementById('lat').value, document.getElementById('lng').value]).addTo(map)

//----------------------点击事件
map.on('click', function (e) {
    lat = e.latlng.lat
    lng = e.latlng.lng
    marker._latlng.lat = lat
    marker._latlng.lng = lng
    map.removeLayer(marker);
    map.addLayer(marker);

    document.getElementById('lat').value = lat.toFixed(6)
    document.getElementById('lng').value = lng.toFixed(5)
    document.getElementById('site').value = '标记位置'

    // console.log(consituate);
    var seek = seeknear(lng, lat, consituate, cstlist);
    // console.log(seek);

    var res = [];
    for (var i = 0; i < seek.length; i++) {
        res[i] = seek[i].join("\t")
    }

    // var yesno = true;
    var yesno = false;
    if (yesno == true) {
        var seek2 = seeknear2(lng + 180, lat, consituate, cstlist2);
        console.log(seek2);
        var res2 = [];
        for (var i = 0; i < seek2.length; i++) {
            res2[i] = seek2[i].join("\t")
        }
        document.getElementById("canshu").value = res.join('\n') + '\n' + res2.join('\n');

    } else {
        document.getElementById("canshu").value = res.join('\n');

    }
    run();
});
//------------寻找最近的可用的数据位置，并返回该位置的调和常数
function seeknear(lng, lat, obj, list) {
    var xmin = 110;
    var xmax = 165; //55 经度
    var ymin = 20;
    var ymax = 65; //45 纬度
    var dx = 1 / 12;
    var dy = 1 / 12;
    var mmax = 541; //纬度
    var nmax = 661; //经度

    var a = (ymax - lat) / dy;
    var b = (lng - xmin) / dx;
    Ia = Math.round(a);
    Ib = Math.round(b);
    var nearA = Ia;
    var nearB = Ib;

    ds = 25;
    for (var i = -3; i < 4; i++) {
        for (var j = -3; j < 4; j++) {
            dd = Math.abs((a - Ia + i) * (b - Ib + j));
            if (Ia + i >= 0 && Ib + j >= 0 && dd < ds && obj[list[1]].amplitude[Ia + i][Ib + j] != undefined) {
                ds = dd;
                nearA = Ia + i;
                nearB = Ib + j
            }
        }
    }
    // console.log(a, Ia, b, Ib);
    // console.log(nearA, nearB);
    // console.log(mn2latlng(nearA, nearB))

    var outarr = [];
    for (var i = 0; i < list.length; i++) {
        var am0 = obj[list[i]].amplitude[nearA][nearB] / 1000;
        var ph0 = obj[list[i]].Phase[nearA][nearB] / 10;
        if (list[i].indexOf("2") != -1) {
            if (ph0 - 120 < 0) {
                ph0 = Number((ph0 - 120 + 360).toFixed(1))
            } else {
                ph0 = Number((ph0 - 120).toFixed(1))
            }
        }
        if (list[i].indexOf("1") != -1) {
            if (ph0 + 120 > 360) {
                ph0 = Number((ph0 + 120 - 360).toFixed(1))
            } else {
                ph0 = Number((ph0 + 120).toFixed(1))
            }
        }

        outarr[i] = [list[i], am0, ph0];
    }

    return outarr
}

//[nearA][nearB]--[540][660]--[lat][lng]--[行号][列号]--[0][0]代表65N,110E
function mn2latlng(m, n) {
    var xmin = 110;
    var xmax = 165; //55 经度
    var ymin = 20;
    var ymax = 65; //45 纬度
    var dx = 1 / 12;
    var dy = 1 / 12;
    var mmax = 541; //纬度
    var nmax = 661; //经度
    return ((ymax - m * dy) + ',' + (n * dx + xmin))
}

//------------寻找最近的可用的数据位置，并返回该位置的调和常数
function seeknear2(lng, lat, obj, list) {
    var xmin = 0.25;
    var xmax = 359.75; //55 经度
    var ymin = -89.75;
    var ymax = 89.75; //45 纬度
    var dx = 0.5;
    var dy = 0.5;
    var mmax = 360; //纬度
    var nmax = 720; //经度

    var a = (ymax - lat) / dy;
    var b = (lng - xmin) / dx;
    Ia = parseInt(a);
    Ib = parseInt(b);
    console.log(Ia, Ib);
    var nearA = Ia;
    var nearB = Ib;
    ds = 8;
    for (var i = -2; i < 3; i++) {
        for (var j = -2; j < 3; j++) {
            dd = Math.abs((a - Ia + i) * (b - Ib + j));
            if (dd < ds && obj[list[1]].amplitude[Ia + i][Ib + j] != undefined) {
                ds = dd;
                nearA = Ia + i;
                nearB = Ib + j
            }
        }
    }
    // console.log(nearA, nearB);

    var outarr = [];
    for (var i = 0; i < list.length; i++) {
        var am0 = obj[list[i]].amplitude[nearA][nearB] / 1000;
        var ph0 = obj[list[i]].Phase[nearA][nearB] / 10;
        // if (ph0 - 120 < 0) {
        //     ph0 = Number((ph0 - 120 + 360).toFixed(1))
        // } else {
        //     ph0 = Number((ph0 - 120).toFixed(1))
        // }
        outarr[i] = [list[i], am0, ph0];
    }

    return outarr
}

//------------------------------------------格式化时间
var formatDateTime = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};


//-------------------------将标准时间转换成字符串格式2015-03-12 12:00:00
console.log('当前时间:', format(new Date(), "yyyy-MM-dd hh:mm:ss"));

function format(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
                (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

//-------------------------将2015-03-12 12:00 转换成标准时间
console.log(parserDate("2015-03-19 12:00:00"));

function parserDate(date) {
    var t = Date.parse(date);
    if (!isNaN(t)) {
        return new Date(Date.parse(date.replace(/-/g, "/")));
    } else {
        return new Date();
    }
};

//---------------------------------字符串转json数组、json对象
function tableStringToArr(text) {
    text = text.trim();//去除首尾空白
    var yyy = text.split(/[\n]/); //按行分割
    var shuju = [];
    for (var i = 0; i < yyy.length; i++) {
        shuju[i] = yyy[i].trim().split(/,|，|\s+/);//去除首尾空白后，行内逗号、空格分割
    };
    var shuju2 = []; var shuliang = 0;
    for (var i = 1; i < shuju.length; i++) {
        var Obj = {};
        for (var j = 0; j < shuju[0].length; j++) {
            Obj[shuju[0][j]] = Number(shuju[i][j]) + '' !== NaN + '' ? Number(shuju[i][j]) : shuju[i][j];
        }
        shuju2.push(Obj); shuliang += shuju[i].length;
    };
    if (shuliang !== (shuju.length - 1) * shuju[0].length) { alert("监测到非法字符，可能是空格或者逗号，请检查数据后再试") };
    var lieName = [];
    for (var key in shuju2[0]) { lieName.push(key) };
    return {
        tableArr: shuju,
        objArr: shuju2,
        lieName: lieName
    };
}


function export_csv(data, name) {
    // “\ufeff” BOM头
    var uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(data);
    var downloadLink = document.createElement("a");
    downloadLink.href = uri;
    downloadLink.download = (name + ".csv") || "temp.csv";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

