// //-----------------------------------------------------------------------------------------------生成坐标边框
// //-----------------------------------------------------------------------------------------------生成坐标边框

//创建坐标存放div
var coordmap0 = document.createElement("div"); coordmap0.id = "coordmap";
document.body.appendChild(coordmap0);
//-------------------------------主程序-------------------------------
function changemap() {
    var mapdiv = document.getElementById("map");

    if (mapdiv.style.left == "200px") {
        console.log("开启转关闭");
        //注销事件:地图改变时,绘制坐标框
        map.off("zoomend", drawcoordrange);
        map.off("moveend", drawcoordrange);
        //清空坐标div
        document.getElementById("coordmap").innerHTML = "";
        //地图恢复为全屏样式，刷新地图
        mapdiv.style.left = "0px"; mapdiv.style.top = "0px"; mapdiv.style.width = "100%"; mapdiv.style.height = "100%";
        mapdiv.style.border = "#000";
        //恢复工具栏
        document.getElementsByClassName("leaflet-top leaflet-left")[0].style.visibility = "visible";
        document.getElementsByClassName("leaflet-top leaflet-right")[0].style.visibility = "visible";
    } else {
        console.log("关闭转开启");
        map.options.drawRB = confirm("要绘制右侧和下侧坐标吗？");
        map.options.coordHeight = prompt("默认字体高度为", "18");
        //激活事件:地图改变时,绘制坐标框
        map.on("zoomend", drawcoordrange);
        map.on("moveend", drawcoordrange);
        //地图更改为小图样式，刷新地图
        mapdiv.style.left = "200px"; mapdiv.style.top = "40px"; mapdiv.style.width = "calc(100% - 400px)"; mapdiv.style.height = "calc(100% - 80px)";
        mapdiv.style.border = "0.5px solid #000";
        //隐藏工具栏
        document.getElementsByClassName("leaflet-top leaflet-left")[0].style.visibility = "hidden";
        document.getElementsByClassName("leaflet-top leaflet-right")[0].style.visibility = "hidden";
    };
    map.invalidateSize(true);
};
//--------------------------------------------------------------------------------------------绘制坐标
var drawcoordrange = function () {
    var mapdiv = document.getElementById("map");
    var coordmap = document.getElementById("coordmap");
    coordmap.innerHTML = "";
    // 设置初始开关、是否绘制N E
    var drawNE = true;
    // 设置初始开关、是否绘制右侧和下侧坐标
    var drawRB = this.options.drawRB;
    var coordHeight = Number(this.options.coordHeight);
    console.log("更新坐标图");

    var lngmin, lngmax, latmin, latmax;
    lngmin = map.getBounds().getWest();
    latmin = map.getBounds().getSouth();
    lngmax = map.getBounds().getEast();
    latmax = map.getBounds().getNorth();
    //调用子程序计算坐标刻度
    var lngbreak = getCoordBreaks(lngmin, lngmax, 2.2, "lng").breaks;
    var lngstep = getCoordBreaks(lngmin, lngmax, 2.2, "lng").step;

    var latbreak = getCoordBreaks(latmin, latmax, 1.8, "lat").breaks;
    var latstep = getCoordBreaks(latmin, latmax, 1.8, "lat").step;

    //读取mapdiv的像素坐标
    var divrange = mapdiv.getBoundingClientRect();
    divbottom = divrange.bottom; divtop = divrange.top; divleft = divrange.left; divright = divrange.right;
    // console.log(divrange)
    // console.log(divtop, divbottom, divleft, divright);

    //--------------------------循环叠加，形成经度标签div--------------------------

    for (var i = 0; i < lngbreak.length; i++) {
        var Xpix = divleft + (lngbreak[i] - lngmin) * (divright - divleft) / (lngmax - lngmin);
        var divtext0 = coordmap.innerHTML;
        var divtextA0;
        if (drawNE == true) {
            if (Number(lngbreak[i]) > 0) { divtextA0 = ' E' }; if (Number(lngbreak[i]) < 0) { divtextA0 = ' W' }; if (Number(lngbreak[i]) == 0) { divtextA0 = '' };
        } else {
            divtextA0 = '';
        }
        var divtextA, divtextAT;
        if (lngstep >= 1) {
            divtextA = '<div><font style="position:absolute; left:' + (Xpix - coordHeight) + 'px; top:' + (divtop - coordHeight - 5) + 'px; font-size: ' + coordHeight + 'px;font-family: sans-serif;" color="#000000">' + Math.abs(lngbreak[i]) + '°' + divtextA0 + '</font></div>'
        };
        if (lngstep < 1 && lngstep >= 0.016666667) {
            divtextA = '<div><font style="position:absolute; left:' + (Xpix - 1.7 * coordHeight) + 'px; top:' + (divtop - coordHeight - 5) + 'px; font-size: ' + coordHeight + 'px;font-family: sans-serif;" color="#000000">' + du2dufen(lngbreak[i], 0) + divtextA0 + '</font></div>'
        };
        if (lngstep < 0.016666667) {
            divtextA = '<div><font style="position:absolute; left:' + (Xpix - 2.7 * coordHeight) + 'px; top:' + (divtop - coordHeight - 5) + 'px; font-size: ' + coordHeight + 'px;font-family: sans-serif;" color="#000000">' + du2dufenmiao(lngbreak[i], 0) + divtextA0 + '</font></div>'
        };
        divtextAT = '<div><font style="position:absolute; left:' + (Xpix + 7) + 'px; top:' + (divtop - 3) + 'px; font-size: 10px;font-family: sans-serif; transform: rotate(270deg); transform-origin:left bottom"; color="#000000">—</font></div>';

        var divtextB = '', divtextBT = '';
        if (drawRB == true) {
            if (lngstep >= 1) {
                divtextB = '<div><font style="position:absolute; left:' + (Xpix - coordHeight) + 'px; top:' + (divbottom) + 'px; font-size: ' + coordHeight + 'px;font-family: sans-serif;" color="#000000">' + Math.abs(lngbreak[i]) + '°' + divtextA0 + '</font></div>'
            };
            if (lngstep < 1 && lngstep >= 0.016666667) {
                divtextB = '<div><font style="position:absolute; left:' + (Xpix - 1.7 * coordHeight) + 'px; top:' + (divbottom) + 'px; font-size: ' + coordHeight + 'px;font-family: sans-serif;" color="#000000">' + du2dufen(lngbreak[i], 0) + divtextA0 + '</font></div>'
            };
            if (lngstep < 0.016666667) {
                divtextB = '<div><font style="position:absolute; left:' + (Xpix - 2.7 * coordHeight) + 'px; top:' + (divbottom) + 'px; font-size: ' + coordHeight + 'px;font-family: sans-serif;" color="#000000">' + du2dufenmiao(lngbreak[i], 0) + divtextA0 + '</font></div>'
            };
            divtextBT = '<div><font style="position:absolute; left:' + (Xpix + 7) + 'px; top:' + (divbottom - 16) + 'px; font-size: 10px;font-family: sans-serif; transform: rotate(270deg); transform-origin:left bottom"; color="#000000">—</font></div>';
        }

        coordmap.innerHTML = divtext0 + divtextA + divtextAT + divtextB + divtextBT;
    }
    //--------------------------循环叠加，形成纬度标签div--------------------------
    for (var i = 0; i < latbreak.length; i++) {
        var Ypix = divtop + map.latLngToContainerPoint(L.latLng([latbreak[i], lngmin])).y;
        var divtext0 = coordmap.innerHTML;
        var divtextA0;
        if (drawNE == true) {
            if (Number(latbreak[i]) > 0) { divtextA0 = ' N' }; if (Number(latbreak[i]) < 0) { divtextA0 = ' S' }; if (Number(latbreak[i]) == 0) { divtextA0 = '' };
        } else {
            divtextA0 = '';
        }
        var divtextA, divtextAT;
        if (latstep >= 1) {
            divtextA = '<div><font style="position:fixed; left:' + divleft + 'px; top:' + (Ypix - 5) + 'px; font-size: ' + coordHeight + 'px;font-family: sans-serif;transform: rotate(270deg);transform-origin:left bottom" color="#000000">' + Math.abs(latbreak[i]) + '°' + divtextA0 + '</font></div>'
        };
        if (latstep < 1 && latstep >= 0.016666667) {
            divtextA = '<div><font style="position:fixed; left:' + divleft + 'px; top:' + (Ypix + 5) + 'px; font-size: ' + coordHeight + 'px;font-family: sans-serif;transform: rotate(270deg);transform-origin:left bottom" color="#000000">' + du2dufen(latbreak[i], 0) + divtextA0 + '</font></div>'
        };
        if (latstep < 0.016666667) {
            divtextA = '<div><font style="position:fixed; left:' + divleft + 'px; top:' + (Ypix + 15) + 'px; font-size: ' + coordHeight + 'px;font-family: sans-serif;transform: rotate(270deg);transform-origin:left bottom" color="#000000">' + du2dufenmiao(latbreak[i], 0) + divtextA0 + '</font></div>'
        };
        divtextAT = '<div><font style="position:fixed; left:' + divleft + 'px; top:' + (Ypix - 5) + 'px; font-size: 10px;font-family: sans-serif;" color="#000000">—</font></div>'

        var divtextB = '', divtextBT = '';
        if (drawRB == true) {
            if (latstep >= 1) {
                divtextB = '<div><font style="position:fixed; left:' + (divright + coordHeight + 5) + 'px; top:' + (Ypix - 5) + 'px; font-size: ' + coordHeight + 'px;font-family: sans-serif;transform: rotate(270deg);transform-origin:left bottom" color="#000000">' + Math.abs(latbreak[i]) + '°' + divtextA0 + '</font></div>'
            };
            if (latstep < 1 && latstep >= 0.016666667) {
                divtextB = '<div><font style="position:fixed; left:' + (divright + coordHeight + 5) + 'px; top:' + (Ypix + 5) + 'px; font-size: ' + coordHeight + 'px;font-family: sans-serif;transform: rotate(270deg);transform-origin:left bottom" color="#000000">' + du2dufen(latbreak[i], 0) + divtextA0 + '</font></div>'
            };
            if (latstep < 0.016666667) {
                divtextB = '<div><font style="position:fixed; left:' + (divright + coordHeight + 5) + 'px; top:' + (Ypix + 15) + 'px; font-size: ' + coordHeight + 'px;font-family: sans-serif;transform: rotate(270deg);transform-origin:left bottom" color="#000000">' + du2dufenmiao(latbreak[i], 0) + divtextA0 + '</font></div>'
            };
            divtextBT = '<div><font style="position:fixed; left:' + (divright - 12) + 'px; top:' + (Ypix - 5) + 'px; font-size: 10px;font-family: sans-serif;" color="#000000">—</font></div>'
        }

        coordmap.innerHTML = divtext0 + divtextA + divtextAT + divtextB + divtextBT;
    };
}

//---------------------------------------------------------------------------------自动生成坐标刻度
function getCoordBreaks(Tvaluemin, Tvaluemax, TargetN, latlngsy) {
    // var TargetN = 2;//设置坐标轴显示坐标的个数
    if (Tvaluemin > Tvaluemax) { alert("wrong position for Tvaluemin, Tvaluemax") };
    var DX;
    var a;
    if (latlngsy == "lng") {
        a = [30, 20, 10, 5, 3, 2, 1, 0.5, 0.33333333, 0.16666667, 0.08333333, 0.03333333, 0.01666667, 0.00833333, 0.00555556, 0.00277778, 0.00138889, 0.00055556, 0.00027778];
    }
    if (latlngsy == "lat") {
        a = [30, 20, 10, 5, 2, 1, 0.5, 0.33333333, 0.16666667, 0.08333333, 0.03333333, 0.01666667, 0.00833333, 0.00555556, 0.00277778, 0.00138889, 0.00055556, 0.00027778];
    }

    var TDelta = Tvaluemax - Tvaluemin;
    for (var kk = 0; kk < a.length; kk++) {
        if ((TDelta / a[kk]) >= TargetN) {
            DX = a[kk];
            break
        }
    }
    var tttmax = Math.floor(Tvaluemax / DX);
    var tttmin = Math.floor(Tvaluemin / DX);
    // console.log("step=:"+DX);
    var nnn = getvaluenumber(DX);
    var levelMax = tttmax * DX;
    levelMax = Number(levelMax.toFixed(nnn));
    var levelMin = tttmin * DX + DX;
    levelMin = Number(levelMin.toFixed(nnn));
    var levelnum = (levelMax - levelMin) / DX + 1;
    levelnum = Math.round(levelnum);
    var breaks = [];
    for (var jj = 0; jj < levelnum; jj++) {
        breaks.push(Number(levelMin + jj * DX).toFixed(nnn));
    }
    return {
        // "Tvaluemin":Tvaluemin,
        // "Tvaluemax":Tvaluemax,
        "levelMin": levelMin,
        "levelMax": levelMax,
        "step": DX,
        "levelnum": levelnum,
        "breaks": breaks,
    }
}
function getvaluenumber(x) {
    for (var i = 0; i < 10; i++) {
        while (Math.abs(Number(x.toFixed(i)) - x) / x < 0.00000001) {
            return i;
        };
    };
}
//------------------------------------------------------------------------------------------度分秒转换
//度 转换 度分秒
du2dufenmiao = function (value, n) {
    var value2 = Math.abs(value);
    var v1 = Math.floor(value2);//度
    var v2 = Math.floor((value2 - v1) * 60);//分  
    var v3 = ((value2 - v1) * 3600 % 60).toFixed(n);//秒
    if (v3 == 60) { v3 = 0; v2 = v2 + 1 };//若秒为60，分补1
    if (v2 == 60) { v2 = 0; v1 = v1 + 1 };//若分为60，度补1
    var v31 = v3 < 10 ? "0" + String(v3) : v3;//小于10，前面补零
    var v21 = v2 < 10 ? "0" + String(v2) : v2;//小于10，前面补零
    return v1 + '°' + v21 + '\′' + v31 + '″';
};

//度 转换 度分
du2dufen = function (value, n) {
    var value2 = Math.abs(value);
    var v1 = Math.floor(value2);//度
    var v2 = ((value2 - v1) * 60).toFixed(n);//分
    if (v2 == 60) { v2 = 0; v1 = v1 + 1 };//若分为60，度补1
    var v21 = v2 < 10 ? "0" + String(v2) : v2;//小于10，前面补零
    return v1 + '°' + v21 + '\′';
};
