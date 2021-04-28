function initDemoMap() {
  var Esri_WorldImagery = L.tileLayer(
    "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "&copy; Esri"
      // attribution:
      //   "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, " +
      //   "AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
    }
  );
  var Esri_OceanBasemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
  });
  var HydroMap = L.tileLayer("https://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}", {
    attribution: '&copy; <a class="ol-attribution-geoqmap" ' + 'href="http://www.geoq.net/basemap.html">' + '智图地图</a>'
  });
  var warm = L.tileLayer("https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}", {
    attribution: '&copy; <a class="ol-attribution-geoqmap" ' + 'href="http://www.geoq.net/basemap.html">' + '智图地图</a>'
  });
  var tianditu_img = L.tileLayer("http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a5d3fb2ad894a60ff2d3abccc7a7c51", {
  });
  var tianditu_ter = L.tileLayer("http://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a5d3fb2ad894a60ff2d3abccc7a7c51", {
  });
  //--------------------------------------------------------------------------------------------------主程序
  var baseLayers = {
    "Esri影像": Esri_WorldImagery,
    "天地图影像": tianditu_img,
    "天地图地形": tianditu_ter,
    "Geoq暖色": warm,
    "Geoq水系": HydroMap,
    // "Jawg地形": Jawg_Terrain,
  };

  var tianditu_label1 = L.tileLayer("http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a5d3fb2ad894a60ff2d3abccc7a7c51", {
  });
  var tianditu_label2 = L.tileLayer("http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a5d3fb2ad894a60ff2d3abccc7a7c51", {
  });
  var tianditu_label3 = L.tileLayer("http://t0.tianditu.gov.cn/eva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=eva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a5d3fb2ad894a60ff2d3abccc7a7c51", {
  });
  // console.log("1");
  var overlayLayers = {
    "天地图注记": tianditu_label1,
    // "天地图注记2": {
    //   category: "group",
    //   layers: {
    //     "purpleLayer": tianditu_label2,
    //     "purpleairmarker": tianditu_label3,
    //   }
    // }
  }
  // console.log(overlayLayers);

  var baseLayers2 = {
    // "海洋地理":Esri_OceanBasemap,
  };

  var map = L.map("map", {
    layers: [Esri_WorldImagery],
    zoomControl: false
  });

  var layerControl = L.control.layers(baseLayers, overlayLayers).addTo(map);
  map.setView([37, 117], 4);
  // var layerControl2 = L.control.layers(baseLayers2);
  // layerControl2.addTo(map);
  return {
    map: map,
    layerControl: layerControl,
    // layerControl2: layerControl2
  };
};

// demo map
var mapStuff = initDemoMap();
var map = mapStuff.map;
var layerControl = mapStuff.layerControl;
// var layerControl2 = mapStuff.layerControl2;

// var command = L.control({position: 'topleft'}); 
// command.onAdd = function (map) {
//     var div = L.DomUtil.create('div','command'); 
//     div.innerHTML = '<form><input id="command" type="checkBox"/>command</form>'; 
//     return div;
// }; 
// command.addTo(map);

// 添加绘图按钮
map.pm.setLang('zh');
var drawct = map.pm.addControls({
  position: 'bottomleft',
  drawCircle: false,
  drawCircleMarker: false,
});
map.pm.Toolbar.changeControlOrder(['drawMarker', 'drawPolygon', 'drawPolyline', 'drawRectangle']);

map.on('pm:globaldragmodetoggled', e => {
  console.log(e);
});

// 添加测量按钮
var measureControl = new L.Control.Measure({
  position: 'bottomleft',
  primaryLengthUnit: 'kilometers', secondaryLengthUnit: undefined,
  primaryAreaUnit: 'hectares', secondaryAreaUnit: undefined
});
measureControl.addTo(map);

//移动端定位位置
if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
  map.locate({
    setView: true,
    maxZoom: 5
  });
  map.on('locationfound', function (e) {
    var radius = e.accuracy / 2;
    L.marker(e.latlng).addTo(map).bindPopup("你在这里");
    L.circle(e.latlng, radius).addTo(map);
    console.log('定位成功=====>', e);
  });
  map.on('locationerror', function (e) {
    console.log('定位出错=====>', e);
  });
};

// $.getJSON("https://danwild.github.io/leaflet-velocity/wind-gbr.json", function (data) {
//   var velocityLayer = L.velocityLayer({
//     displayValues: true,
//     displayOptions: {
//       velocityType: "GBR Wind",
//       position: "bottomleft",
//       emptyString: "No wind data",
//       showCardinal: true
//     },
//     data: data,
//     maxVelocity: 10
//   });
//   layerControl.addOverlay(velocityLayer, "Wind - Great Barrier Reef");
// });

// $.getJSON("https://danwild.github.io/leaflet-velocity/water-gbr.json", function (data) {
//   var velocityLayer = L.velocityLayer({
//     displayValues: true,
//     displayOptions: {
//       velocityType: "GBR Water",
//       position: "bottomleft",
//       emptyString: "No water data"
//     },
//     data: data,
//     maxVelocity: 0.6,
//     velocityScale: 0.1 // arbitrary default 0.005
//   });
//   layerControl.addOverlay(velocityLayer, "Ocean Current - Great Barrier Reef");
// });

// $.getJSON("https://danwild.github.io/leaflet-velocity/wind-global.json", function (data) {
//   var velocityLayer = L.velocityLayer({
//     displayValues: true,
//     displayOptions: {
//       velocityType: "Global Wind",
//       position: "bottomleft",
//       emptyString: "No wind data"
//     },
//     data: data,
//     maxVelocity: 15
//   });
//   layerControl.addOverlay(velocityLayer, "Wind - Global");
// });

// var china = [];
// var chinageo = [];
// $.getJSON("https://geo.datav.aliyun.com/areas_v2/bound/100000.json", function (json) {
//   var value1 = json.features[0].geometry.coordinates;
//   // console.log(value1);
//   for (var i = 0; i < value1.length; i++) { china.push(value1[i][0]) };
//   // for (var i=0;i<value1.length;i++){china.push(value1[i][0])};
//   // layerControl2.addOverlay(velocityLayer, "china");
// });

function msg(text) {
  $("#ShowDiv").show();
  $("#ShowDiv").html(text);
  $('#ShowDiv').delay(1000).slideUp();
};
//---------------------------------------------------------------------经纬网
var Graticulelayer = L.latlngGraticule({
  showLabel: true,
  zoomInterval: [
    { start: 2, end: 3, interval: 30 },
    { start: 4, end: 4, interval: 10 },
    { start: 5, end: 7, interval: 5 },
    { start: 8, end: 10, interval: 1 }
  ]
})
layerControl.addOverlay(Graticulelayer, "经纬网");

//-------------------------------------------配色方案，可自定义添加新行
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

function coord2shuzu(id) {
  var text1 = document.getElementById(id).value;
  text1 = text1.trim();
  var yyy = text1.split(/[\n]/); //按行分割
  // console.log("yyy类型:"+typeof yyy);
  // console.log(yyy);
  var shuju = [] //行内分割，写入新数组
  for (var i = 0; i < yyy.length; i++) {
    // shuju[i] = yyy[i].split(",");
    shuju[i] = yyy[i].split(/,|，|\s+/);
  };
  return shuju;
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

  function getvaluenumber(x) {
    for (var i = 0; i < 10; i++) {
      while (Math.abs(Number(x.toFixed(i)) - x) / x < 0.0001) {
        return i;
      };
    };
  }
  var tttmax = Math.floor(Tvaluemax / DX);
  var tttmin = Math.floor(Tvaluemin / DX);
  console.log(DX);
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

//------------------------------------------------------------------------------将breaks映射到颜色---------
function interp1(colorSet, countourSet) { //x是样库x，y是样品库y,xi是待插值点
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

// //-----------------------------------------------------------------------------------------------------获取map范围
// //地图级别改变时发生
// map.on("zoomend", function (e) {
//   var zoom_val = e.target.getZoom();
//   map_drag();;
// });
// //拖动地图时发生
// map.on("moveend", function (e) {
//   map_drag();;
// });
// function map_drag() {
//   //左下角坐标（西南方）
//   var leftdown = map.getBounds().getSouthWest().lng + "," + map.getBounds().getSouthWest().lat; 
//   //右上角坐标（东北方向）
//   var rightup = map.getBounds().getNorthEast().lng + "," + map.getBounds().getNorthEast().lat;  
//   //左上角：西北方
//   var leftup = map.getBounds().getNorthWest().lng + "," + map.getBounds().getNorthWest().lat; 
//   //右下角：东南方
//   var rightdown = map.getBounds().getSouthEast().lng + "," + map.getBounds().getSouthEast().lat; 
//   // console.log(leftdown,rightup);
// }
//----------------------------------------------------------------------------------------------------凸包检测
function Graham_scan(pointSet, ch) {
  // 这里会修改pointSet
  // var ch=new Array();
  var n = pointSet.length;
  var i, j, k = 0, top = 2;
  var tmp = new Object();
  // 找到一个基点，基本就是保证最下面最左面的点
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
        // k j 同方向
        var dis = distance_no_sqrt(pointSet[0], pointSet[j]) - distance_no_sqrt(pointSet[0], pointSet[k]);
        use--; // 也就是不要了
        if (dis > 0) {
          // 保留j
          // 把 k 就不要了
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



