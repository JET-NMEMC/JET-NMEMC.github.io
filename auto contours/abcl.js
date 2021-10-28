//--------------------------------------------------------------------------------------------主程序结束-------------

function interp1(colorSet, countourSet) { //x是样库x，y是样品库y,xi是待插值点
    var rgblist = ["r", "g", "b"];
    var newcolor = new Array();

    var xi = countourSet.breaks;
    console.log("预测序列:", xi);

    var x = [];
    for (var i = 0; i < colorSet.length; i++) {
        x.push(countourSet.levelMin + (countourSet.levelMax - countourSet.levelMin) * colorSet[i].weight / 100);
    };
    // console.log("配色的映射值", x);

    for (k = 0; k < rgblist.length; k++) {
        var y = [];
        for (var i = 0; i < colorSet.length; i++) {
            y.push(colorSet[i][key = rgblist[k]]);
        };
        // console.log("配色的" + rgblist[k], y);
        var yi = [];
        var col_xi = xi.length;
        var col_x = x.length;
        for (var i = 0; i < xi.length; i++) {
            for (var j = 0; j < x.length - 1; j++) {
                if (xi[i] >= x[j] && xi[i] <= x[j + 1]) {
                    yi[i] = y[j] + (y[j + 1] - y[j]) / (x[j + 1] - x[j]) * (xi[i] - x[j]);
                    yi[i] = Number(yi[i].toFixed(0));
                    break;
                }
            }
        }
        newcolor.push(yi);
    }
    return newcolor;
}

//--------------------16进制颜色编码与rgb颜色编码的转换------------------------
function rgb2hex(rgb) {
    var ds = rgb.split(/\D+/);
    var decimal = Number(ds[1]) * 65536 + Number(ds[2]) * 256 + Number(ds[3]);
    return "#" + zero_fill_hex(decimal, 6);
}
function colorRGB2Hex(r, g, b) {

    let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
}
//--------------------确定小数有效数字位数，避免过多的零--------------------
function getvaluenumber(x) {
    for (var i = 0; i < 10; i++) {
        while (Math.abs(Number(x.toFixed(i)) - x)/x < 0.0001) {                
            return i;
        };
    };
}
//---------------根据最大值、最小值、拟形成色带数量，生成序列-----------------
function autobreak(Tvaluemin, Tvaluemax, TargetN) {
    // if (Tvaluemin > Tvaluemax) { alert("wrong position") };
    var DX;
    var a = [];
    var j = -8;
    var i = 0;
    while (j < 9) {
        a[4 * i + 0] = 1 * Math.pow(10, j);
        a[4 * i + 1] = 2 * Math.pow(10, j);
        a[4 * i + 2] = 3 * Math.pow(10, j);
        a[4 * i + 3] = 5 * Math.pow(10, j);
        // a[3 * i + 0] = 1 * Math.pow(10, j);
        // a[3 * i + 1] = 2 * Math.pow(10, j);
        // a[3 * i + 2] = 5 * Math.pow(10, j);
        i = i + 1;
        j = j + 1;
    }

    var TDelta = Tvaluemax - Tvaluemin;
    var Length = TDelta / TargetN;

    for (var kk = 0; kk < a.length; kk++) {
        var c = a[kk];
        if (Length <= a[kk]) {
            if (Math.abs(TDelta / a[kk] - TargetN) < Math.abs(TDelta / a[kk - 1] - TargetN)) {
                DX = a[kk];
            }
            else {
                DX = a[kk - 1];
            }
            break
        }
    }

    var tttmax = Math.floor(Tvaluemax / DX);
    var tttmin = Math.floor(Tvaluemin / DX);

    nnn=getvaluenumber(DX);

    console.log("DX=", DX);
    console.log("nnn=", nnn);

    var levelMax = tttmax * DX + DX;
    levelMax = Number(levelMax.toFixed(nnn));

    var levelMin = tttmin * DX;
    levelMin = Number(levelMin.toFixed(nnn));

    var levelnum = (levelMax - levelMin) / DX;
    levelnum = Math.round(levelnum);

    var percentage = (100 * (Tvaluemax - Tvaluemin) / (levelMax - levelMin)).toFixed(1);

    var breaks = [];
    for (var jj = 0; jj < levelnum + 1; jj++) {
        breaks.push(Number(levelMin + jj * DX).toFixed(nnn));
    }

    return {
        // "Tvaluemin":Tvaluemin,
        // "Tvaluemax":Tvaluemax,
        "levelMin": levelMin,
        "levelMax": levelMax,
        "step": DX,
        "levelnum": levelnum,
        "percentage": percentage + "%",
        "breaks": breaks,
    }
}
const colordatabase = new Object();//配色方案，全局变量,可自定义添加新方案
colordatabase.bluegreenred = [
    { r: 0, g: 0, b: 255, weight: 0 },
    { r: 0, g: 255, b: 0, weight: 50 },
    { r: 255, g: 0, b: 0, weight: 100 }
];
colordatabase.bgyr = [
    { r: 0, g: 0, b: 255, weight: 0 },
    { r: 30, g: 30, b: 255, weight: 10 },
    { r: 0, g: 255, b: 0, weight: 40 },
    { r: 255, g: 255, b: 0, weight: 60 },
    { r: 255, g: 30, b: 0, weight: 90 },
    { r: 255, g: 0, b: 0, weight: 100 },
];
colordatabase.rainbow = [
    { r: 120, g: 0, b: 255, weight: 0 },
    { r: 0, g: 175, b: 235, weight: 25 },
    { r: 135, g: 255, b: 175, weight: 50 },
    { r: 255, g: 180, b: 100, weight: 75 },
    { r: 255, g: 0, b: 0, weight: 100 }
];
colordatabase.rainbow_gist = [
    { r: 255, g: 0, b: 255, weight: 0 },
    { r: 0, g: 0, b: 255, weight: 20 },
    { r: 0, g: 255, b: 255, weight: 40 },
    { r: 0, g: 255, b: 0, weight: 60 },
    { r: 255, g: 255, b: 0, weight: 80 },
    { r: 255, g: 0, b: 0, weight: 100 }
];
colordatabase.jet = [
    { r: 0, g: 0, b: 130, weight: 0 },
    { r: 0, g: 0, b: 255, weight: 10 },
    { r: 0, g: 215, b: 255, weight: 30 },
    { r: 35, g: 255, b: 210, weight: 40 },
    { r: 255, g: 255, b: 0, weight: 60 },
    { r: 255, g: 30, b: 0, weight: 80 },
    { r: 140, g: 0, b: 0, weight: 100 }
];
colordatabase.cool = [
    { r: 0, g: 255, b: 255, weight: 0 },
    { r: 255, g: 0, b: 255, weight: 100 }
];
colordatabase.div_greenred = [
    { r: 0, g: 120, b: 60, weight: 0 },
    { r: 255, g: 255, b: 180, weight: 50 },
    { r: 165, g: 0, b: 40, weight: 100 }
];
colordatabase.terr = [
    { r: 155, g: 0, b: 255, weight: 0 },
    { r: 71, g: 82, b: 255, weight: 1 },
    { r: 0, g: 150, b: 255, weight: 1 },
    { r: 137, g: 209, b: 255, weight: 1 },
    { r: 255, g: 255, b: 255, weight: 1 },//0
    { r: 40, g: 93, b: 12, weight: 1 },//0.1
    { r: 230, g: 187, b: 95, weight: 1 },
    { r: 165, g: 150, b: 26, weight: 1 },
    { r: 150, g: 100, b: 0, weight: 1 },
    { r: 175, g: 110, b: 110, weight: 1 },
    { r: 210, g: 210, b: 210, weight: 1 },
    { r: 255, g: 255, b: 255, weight: 100 }
];