
// //-----------------------------------------------------------------------------------------------生成坐标边框
// //-----------------------------------------------------------------------------------------------生成坐标边框
// 调整窗口
var switchmode = false;
var drawNE = true;
// var coordmap = document.createElement("div");coordmap.id = "coordmap";
var coordmap = document.createElement("div"); coordmap.id = "coordmap";
document.body.appendChild(coordmap);
function changemap() {
    var mapdiv = document.getElementById("map");
    if (switchmode == true) {
        //关闭绘图模式开关，清空已绘坐标字体
        switchmode = false;
        document.getElementById("coordmap").innerHTML = "";
        //恢复全屏样式，刷新地图
        mapdiv.style.width = "100%"; mapdiv.style.height = "100%"; mapdiv.style.left = "0%"; mapdiv.style.top = "0%";
        mapdiv.style.border = "#000";
        map.invalidateSize(true);
        //恢复工具栏
        document.getElementsByClassName("leaflet-top leaflet-left")[0].style.visibility = "visible";
        document.getElementsByClassName("leaflet-top leaflet-right")[0].style.visibility = "visible";
        var coordmap = document.getElementById("coordmap");
        // console.log(coordmap.parentNode);
        // coordmap.parentNode.removeChild();
        coordmap.removeChild();
    }
    if (switchmode == false) {
        switchmode = true;

        //更改小图样式，刷新地图
        mapdiv.style.width = "65%"; mapdiv.style.height = "90%"; mapdiv.style.left = "17.5%"; mapdiv.style.top = "5%";
        mapdiv.style.border = "0.5px solid #000";
        map.invalidateSize(true);
        //隐藏工具栏
        document.getElementsByClassName("leaflet-top leaflet-left")[0].style.visibility = "hidden";
        document.getElementsByClassName("leaflet-top leaflet-right")[0].style.visibility = "hidden";
    }
}

// -------------------------------------------------地图级别改变、拖动地图时，重绘。若模式已关闭，注销事件
map.on("zoomend", function (e) {
    console.log("switchmode", switchmode);
    if (switchmode == true) {
        drawcoordrange();;
    }
});

map.on("moveend", function (e) {
    console.log("switchmode", switchmode);
    if (switchmode == true) {
        drawcoordrange();;
    }
});
//--------------------------------------------------------------------------------------------绘制坐标
function drawcoordrange() {
    var mapdiv = document.getElementById("map");
    var lngmin, lngmax, latmin, latmax, zoomlevel;
    lngmin = map.getBounds().getSouthWest().lng;
    latmin = map.getBounds().getSouthWest().lat;
    lngmax = map.getBounds().getNorthEast().lng;
    latmax = map.getBounds().getNorthEast().lat;
    // zoomlevel = map.getZoom()
    console.log("经度:", lngmin.toFixed(3), lngmax.toFixed(3), "纬度:", latmin.toFixed(3), latmax.toFixed(3));
    // console.log("缩放级别：", zoomlevel);
    // L.CRS.project.EPSG3857(L.latLng(39,120));
    var lngbreak = getCoordBreaks(lngmin, lngmax, 2).breaks;
    var latbreak = getCoordBreaks(latmin, latmax, 2).breaks;
    var lngstep = getCoordBreaks(lngmin, lngmax, 2).step;
    var latstep = getCoordBreaks(latmin, latmax, 2).step;
    console.log("lngbreak", lngbreak); console.log("lngstep", lngstep);
    console.log("latbreak", latbreak); console.log("latsetp", latstep);
    //读取map的像素坐标
    divbottom = mapdiv.getBoundingClientRect().bottom;
    divtop = mapdiv.getBoundingClientRect().top;
    divleft = mapdiv.getBoundingClientRect().left;
    divright = mapdiv.getBoundingClientRect().right;
    // console.log(divtop, divbottom, divleft, divright);

    //循环叠加，形成经度的图形
    var coordmap = document.getElementById("coordmap");
    coordmap.innerHTML = "";

    for (var i = 0; i < lngbreak.length; i++) {
        var Xpix = divleft + (lngbreak[i] - lngmin) * (divright - divleft) / (lngmax - lngmin)
        // console.log("Xpix:", Xpix);
        var divtext0 = coordmap.innerHTML;
        var divtextA0;
        if (drawNE == true) {
            if (Number(lngbreak[i]) > 0) { divtextA0 = ' E' }; if (Number(lngbreak[i]) < 0) { divtextA0 = ' W' }; if (Number(lngbreak[i]) == 0) { divtextA0 = '' };
        } else {
            divtextA0 = ''
        }
        var divtextA;
        if (lngstep >= 1) {
            divtextA = '<div><font style="position:absolute; left:' + (Xpix - 13) + 'px; top:' + (divtop - 20) + 'px; font-size: 15px;font-family: sans-serif;" color="#000000">' + Math.abs(lngbreak[i]) + '°' + divtextA0 + '</font></div>'
        };
        if (lngstep < 1 && lngstep >= 0.016666667) {
            divtextA = '<div><font style="position:absolute; left:' + (Xpix - 26) + 'px; top:' + (divtop - 20) + 'px; font-size: 15px;font-family: sans-serif;" color="#000000">' + du2dufen(lngbreak[i], 0) + divtextA0 + '</font></div>'
        };
        if (lngstep < 0.016666667) {
            divtextA = '<div><font style="position:absolute; left:' + (Xpix - 39) + 'px; top:' + (divtop - 20) + 'px; font-size: 15px;font-family: sans-serif;" color="#000000">' + du2dufenmiao(lngbreak[i], 0) + divtextA0 + '</font></div>'
        };
        var divtextB = '<div><font style="position:absolute; left:' + Xpix + 'px; top:' + (divtop - 2) + 'px; font-size: 10px;font-family: sans-serif;" color="#000000">|</font></div>';
        coordmap.innerHTML = divtext0 + divtextA + divtextB;
    }
    //循环叠加，形成纬度的图形
    for (var i = 0; i < latbreak.length; i++) {
        var Ypix = divbottom - ((latbreak[i] - latmin) * (divbottom - divtop) / (latmax - latmin));
        // console.log("Ypix:", Ypix);
        var divtext0 = coordmap.innerHTML;
        var divtextA0;
        if (drawNE == true) {
            if (Number(latbreak[i]) > 0) { divtextA0 = ' N' }; if (Number(latbreak[i]) < 0) { divtextA0 = ' S' }; if (Number(latbreak[i]) == 0) { divtextA0 = '' };
        } else {
            divtextA0 = ''
        }
        var divtextA;
        if (latstep >= 1) {
            divtextA = '<div><font style="position:fixed; left:' + divleft + 'px; top:' + (Ypix - 5) + 'px; font-size: 15px;font-family: sans-serif;transform: rotate(270deg);transform-origin:left bottom" color="#000000">' + Math.abs(latbreak[i]) + '°' + divtextA0 + '</font></div>'
        };
        if (latstep < 1 && latstep >= 0.016666667) {
            divtextA = '<div><font style="position:fixed; left:' + divleft + 'px; top:' + (Ypix + 5) + 'px; font-size: 15px;font-family: sans-serif;transform: rotate(270deg);transform-origin:left bottom" color="#000000">' + du2dufen(latbreak[i], 0) + divtextA0 + '</font></div>'
        };
        if (latstep < 0.016666667) {
            divtextA = '<div><font style="position:fixed; left:' + divleft + 'px; top:' + (Ypix + 15) + 'px; font-size: 15px;font-family: sans-serif;transform: rotate(270deg);transform-origin:left bottom" color="#000000">' + du2dufenmiao(latbreak[i], 0) + divtextA0 + '</font></div>'
        };
        var divtextB = '<div><font style="position:fixed; left:' + divleft + 'px; top:' + (Ypix - 5) + 'px; font-size: 10px;font-family: sans-serif;" color="#000000">—</font></div>'
        coordmap.innerHTML = divtext0 + divtextA + divtextB;
    };
    console.log("-----------draw end------------")
}

//---------------------------------------------------------------------------------自动生成坐标刻度
function getCoordBreaks(Tvaluemin, Tvaluemax, TargetN) {
    // var TargetN = 2;//设置坐标轴显示坐标的个数
    if (Tvaluemin > Tvaluemax) { alert("wrong position for Tvaluemin, Tvaluemax") };
    var DX;
    var a = [30, 20, 10, 5, 3, 2, 1, 0.5, 0.33333333, 0.16666667, 0.08333333, 0.03333333, 0.01666667, 0.00833333, 0.00555556, 0.00277778, 0.00138889, 0.00055556, 0.00027778];

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