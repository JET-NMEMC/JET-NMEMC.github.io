//------------------------------------------------------------------------等值线图
// var china = [];
// var chinageo = [];
// $.getJSON("https://geo.datav.aliyun.com/areas_v2/bound/100000.json", function (json) {
//   var value1 = json.features[0].geometry.coordinates;
//   // console.log(value1);
//   for (var i = 0; i < value1.length; i++) { china.push(value1[i][0]) };
//   // for (var i=0;i<value1.length;i++){china.push(value1[i][0])};
//   // layerControl2.addOverlay(velocityLayer, "china");
// });

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
  var lieName = []; for (var key in shuju2[0]) { lieName.push(key) };
  return { tableArr: shuju, objArr: shuju2, lieName: lieName };
}

function readFileAsText(file, onLoadCallback) {
  var reader = new FileReader();
  reader.onload = onLoadCallback;
  reader.readAsText(file, "utf-8");
}

$('#selectdatafile').on('change', function () {
  readFileAsText(this.files[0], function (e) {
    var dataP = tableStringToArr(e.target.result);
    var data = dataP.objArr;
    var xiangmu = dataP.lieName;
    console.log(data);

    draw_menu(xiangmu);

    var finishlist = [];  //已绘制的项目清单;
    var figurectrol = {}; //已绘制的项目存档;
    var legend = L.control({ position: 'bottomright' });
    var countourmap;

    var caldata = predrawclip(data);

    var xrange = caldata.xrange;
    var yrange = caldata.yrange;
    var area_clip_convexH = caldata.area_clip;//凸包裁剪范围;
    var area_clip_range = caldata.data_range; //矩形裁剪范围;
    layerControl2.addOverlay(caldata.sitesLayer, "站位");
    layerControl2.addOverlay(caldata.clipLayer, "边界");
    map.fitBounds(caldata.clipLayer.getBounds());
    msg("点位信息加载完成");
    showHide('showsetting');

    $("#select").change(function () {
      var newxiangmu = this.value;

      if ($.inArray(newxiangmu, finishlist) !== -1) {
        msg(newxiangmu + " 已绘制过,调取显示");
        console.log(newxiangmu + " 已绘制过,调取显示");
      }
      else {
        var beginTime = +new Date();
        console.log("开始绘制---------------" + newxiangmu);
        // let gridArea = area_clip_range;
        let gridArea = area_clip_convexH;
        //设置拟绘制色带个数
        const TargetN = $('#TargetN').val();
        // 透明度
        const opacity = $('#opacity').val();
        // 配色方案
        const colorSet = colordatabase[key = $('#colorpattern option:selected').text()];
        // 绘图模式
        const drawModel = $('#drawModel option:selected').val();

        mapping(figurectrol, newxiangmu, data, xrange, yrange, TargetN, gridArea, drawModel, colorSet, opacity);

        var endTime = +new Date();
        msg(newxiangmu + "绘制完成,用时" + ((endTime - beginTime) / 1000).toFixed(1) + "s");

        finishlist.push(newxiangmu);//加入已绘制清单        
        document.getElementById(newxiangmu).style.background = "green";//绘制过的选项变为绿色
      }

      //---------从等值线图集中调出选项，展示------------
      if (countourmap) { countourmap.remove() };
      if (legend) { legend.remove() };
      //图例，不是合适的位置，可以改进
      var grades = figurectrol[newxiangmu]["breaks"];
      var colors = figurectrol[newxiangmu]["colors"];
      legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'info legend');
        var labels = [];
        for (var i = colors.length; i > 0; i--) {
          var from = grades[i - 1];
          var to = grades[i];
          labels.push(
            '<i style="background:' + colors[i - 1] + '"></i> ' +
            from + (to ? '&ndash;' + to : ''));
        }
        div.innerHTML = '<div style="text-align:center; font-weight:bold;">图例</div>' + labels.join('<br>');
        return div;
      };
      figurectrol[newxiangmu].legend = legend;

      figurectrol[newxiangmu].legend.addTo(map);
      countourmap = figurectrol[newxiangmu]["overlay"].addTo(map);
      map.fitBounds(countourmap.getBounds());
    }
    );

  });
});
//-----------------------------------------------------------生成要素选项下拉菜单-----------------------
function draw_menu(xiangmu) {
  var obj = '';
  $("#select").empty();//清空内容
  for (var i = 3; i < xiangmu.length; i++) {//此处3是指排除site、lng、lat3个
    obj += "<option class=\"opt\" id= '" + xiangmu[i] + "' value='" + xiangmu[i] + "'>" + xiangmu[i] + "</option>";
  }
  $("#select").append(obj);
  $("#select").show();
};
//------------------------------------------------------------------绘图函数---------------------------
function mapping(figurectrol, newxiangmu, data, xrange, yrange, TargetN, gridArea, drawModel, colorSet, opacity) {
  // 定义训练参数
  var model = "exponential";//可选'gaussian','spherical',一般使用 exponential 
  var sigma2 = 0;
  var alpha = 100;
  //对数据集训练
  var x = [], y = [], t = [];
  for (var i = 0; i < data.length; i++) {
    //选出坐标和数据均齐全的进入训练
    if (data[i].lng != undefined && data[i].lat != undefined && data[i][newxiangmu] != undefined) {
      x.push(data[i].lng);
      y.push(data[i].lat);
      t.push(data[i][newxiangmu])
    }
  };
  var variogram = kriging.train(t, x, y, model, sigma2, alpha);
  // console.log(newxiangmu + "训练结果:");
  // console.log(variogram);
  //网格插值模式，对在区域内的格点进行插值，格点精度500个
  var grid = kriging.grid(gridArea, variogram, (xrange[1] - xrange[0]) / 500, (yrange[1] - yrange[0]) / 500);
  console.log(grid);

  var countourSet = autobreak(grid.zlim[0], grid.zlim[1], TargetN);
  var breaks = countourSet.breaks;
  console.log("自动生成的breaks序列", breaks);
  var contourdata = kriging.getVectorContour(grid, breaks);
  console.log("contourdata");
  console.log(contourdata);
  L.geoJSON(contourdata, {}).addTo(map);

  var interpcolor = interp1(colorSet, countourSet);
  //RGB颜色转换为16进制，存入colors
  var colors = [];
  for (var i = 0; i < interpcolor[0].length; i++) { colors.push(colorRGB2Hex(interpcolor[0][i], interpcolor[1][i], interpcolor[2][i])) };
  // console.log("映射颜色序列", colors);
  colors.shift();
  //将得到的格网grid，按颜色带渲染至canvas上
  var mycanvas = document.getElementById("mycanvas"); mycanvas.width = 1000; mycanvas.height = 1000;

  // 网格插值法
  if (drawModel == "netModel") { kriging.plot(mycanvas, grid, [xrange[0], xrange[1]], [yrange[0], yrange[1]], colors, breaks) };
  // 像素插值法
  if (drawModel == "pixModel") { kriging.pixel_Grid_drawImage(gridArea, mycanvas, variogram, xrange, yrange, colors, breaks) };

  var Img = mycanvas.toDataURL("image/png");
  var imageBounds = [[yrange[0], xrange[0]], [yrange[1], xrange[1]]];

  var newmap = L.imageOverlay(Img, imageBounds, { opacity: opacity });//将image映射到leaflet图层

  figurectrol[newxiangmu] = new Object();
  figurectrol[newxiangmu].overlay = newmap;
  figurectrol[newxiangmu].breaks = breaks;
  figurectrol[newxiangmu].colors = colors;
}

//---------------------------------------数据预处理------------------------------------------------
function predrawclip(datainput) {
  //读取散点
  var lngs = [], lats = [];
  for (var i = 0; i < datainput.length; i++) { lngs.push(datainput[i].lng); lats.push(datainput[i].lat) };
  //计算数据范围
  var xrange = [], yrange = [], data_range = [];
  xrange[0] = Math.min.apply(null, lngs); xrange[1] = Math.max.apply(null, lngs);
  yrange[0] = Math.min.apply(null, lats); yrange[1] = Math.max.apply(null, lats);
  data_range = [[[xrange[0], yrange[0]], [xrange[0], yrange[1]], [xrange[1], yrange[1]], [xrange[1], yrange[0]]]];
  // 绘制散点
  var sites = L.featureGroup();
  for (var i = 0; i < lats.length; i++) {
    var marker0 = L.circleMarker([lats[i], lngs[i]], { featureType: "CircleMarker", name: datainput[i].site, radius: 8, color: "#FFFFFF", fillColor: "#F44334", weight: 1.5, fillOpacity: 1 }) //#F44334#27ae60
      .addTo(sites);
    marker0.on('click', (e) => { popupA(e) });
  };
  sites.addTo(map);

  // 调用凸包检测
  var p = new Array(); var res = new Array();
  for (var i = 0; i < lngs.length; i++) { p[i] = new Object(); p[i].x = lngs[i]; p[i].y = lats[i]; p[i].tj = false; }
  Graham_scan(p, res);
  //绘制凸包边界线,先将凸边角点转为leaflet多段线坐标，纬度在前
  let latlngs = res.map((item) => { return [item.y, item.x] });
  var polygon = L.polygon(latlngs, { color: 'red', weight: 2, fillOpacity: 0 });
  //生成canvas插值多边形，leaf调换x,y
  let lnglats_clip = res.map((item) => { return [item.x, item.y] })
  let area_clip = [lnglats_clip];
  return {
    xrange: xrange,
    yrange: yrange,
    data_range: data_range,
    area_clip: area_clip,
    sitesLayer: sites,
    clipLayer: polygon
  }
}

//------------------------------------------------------------------------------------------凸包检测
function Graham_scan(pointSet, ch) {
  // 这里会修改pointSet
  // var ch=new Array();
  var n = pointSet.length;
  var i, j, k = 0, top = 2;
  var tmp = new Object();
  // 找到一个基点，基本是最下面最左面的点
  for (i = 1; i < n; i++) {
    if ((pointSet[i].y < pointSet[k].y) ||
      ((pointSet[i].y == pointSet[k].y) && (pointSet[i].x < pointSet[k].x))
    ) {
      k = i;
    }
  }
  tmp = pointSet[0];
  pointSet[0] = pointSet[k];
  pointSet[k] = tmp;
  use = n;
  for (i = 1; i < use - 1; i++) {
    k = i;
    for (j = i + 1; j < use; j++) {
      var direct = multiply(pointSet[0], pointSet[k], pointSet[j]);
      if (direct > 0) {
        k = j;
      } else if (direct == 0) {
        var dis = distance_no_sqrt(pointSet[0], pointSet[j]) - distance_no_sqrt(pointSet[0], pointSet[k]);
        use--;
        if (dis > 0) {
          pointSet[k] = pointSet[j];
          pointSet[j] = pointSet[use];
          j--;
        } else {
          tmp = pointSet[use];
          pointSet[use] = pointSet[j];
          pointSet[j] = tmp;
        }
      }
    }
    tmp = pointSet[i];
    pointSet[i] = pointSet[k];
    pointSet[k] = tmp;
  }

  ch.push(pointSet[0]);
  ch.push(pointSet[1]);
  ch.push(pointSet[2]);
  for (i = 3; i < use; i++) {
    while (!(multiply(pointSet[i], ch[top - 1], ch[top]) < 0)) {
      top--;
      ch.pop();
    }
    top++;
    ch.push(pointSet[i]);
  }
}
function multiply(p0, p1, p2) {
  return ((p1.x - p0.x) * (p2.y - p0.y) - (p2.x - p0.x) * (p1.y - p0.y));
}
function distance_no_sqrt(p1, p2) {
  return ((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}
//凸包检测输出点转为json字符串
function point2str(po) {
  var arr = new Array();
  for (var i = 0; i < po.length; i++) { arr[i] = '[' + po[i].x + "," + po[i].y + ']' };
  arr[po.length] = '[' + po[0].x + "," + po[0].y + ']'
  var arr2 = "[[" + arr.join() + "]]";
  return arr2;
}
//-----------------------凸包监测---end-------------------------

//---------------根据最大值、最小值，生成等差序列-----------------
function autobreak(Tvaluemin, Tvaluemax, TargetN) {
  var DX;
  var a = [];
  var j = -8;
  var i = 0;
  while (j < 9) {
    a[4 * i + 0] = 1 * Math.pow(10, j);
    a[4 * i + 1] = 2 * Math.pow(10, j);
    a[4 * i + 2] = 3 * Math.pow(10, j);
    a[4 * i + 3] = 5 * Math.pow(10, j);
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
  // console.log("step=:"+DX);
  nnn = getvaluenumber(DX);
  var levelMax = tttmax * DX + DX;
  levelMax = Number(levelMax.toFixed(nnn));
  var levelMin = tttmin * DX;
  levelMin = Number(levelMin.toFixed(nnn));
  var levelnum = (levelMax - levelMin) / DX;
  levelnum = Math.round(levelnum);
  var percentage = (100 * (Tvaluemax - Tvaluemin) / (levelMax - levelMin)).toFixed(1);
  var breaks = [];
  for (var jj = 0; jj < levelnum + 1; jj++) {
    breaks.push(Number((levelMin + jj * DX).toFixed(nnn)));
    // breaks[jj] = Number((levelMin + jj * DX).toFixed(nnn));
  }
  return {
    "levelMin": levelMin,
    "levelMax": levelMax,
    "step": DX,
    "levelnum": levelnum,
    "percentage": percentage + "%",
    "breaks": breaks,
  }
}
function getvaluenumber(x) {
  for (var i = 0; i < 10; i++) {
    while (Math.abs(Number(x.toFixed(i)) - x) / x < 0.0001) {
      return i;
    };
  };
}
//------------------将等差序列breaks,按配色方案colorSet，映射到颜色序列--------------------------
function interp1(colorSet, countourSet) {
  var rgblist = ["r", "g", "b"];
  var newcolor = new Array();

  var xi = countourSet.breaks;
  // console.log("预测序列:", xi);
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
    var yi = [];
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
//----------16进制颜色编码与rgb颜色编码的转换---------------
function rgb2hex(rgb) {
  var ds = rgb.split(/\D+/);
  var decimal = Number(ds[1]) * 65536 + Number(ds[2]) * 256 + Number(ds[3]);
  return "#" + zero_fill_hex(decimal, 6);
}
function colorRGB2Hex(r, g, b) {
  let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return hex;
}
//--------------配色方案，可自定义添加新行------------------
const colordatabase = new Object();
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