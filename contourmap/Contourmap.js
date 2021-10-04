//---------------------------------------------------------------字符转数组
function coord2shuzu(id) {
  var text1 = document.getElementById(id).value;
  text1 = text1.trim();//去除字符串最前和最后的空白
  var yyy = text1.split(/[\n]/); //按行分割
  var shuju = [] //行内分割，写入新数组
  for (var i = 0; i < yyy.length; i++) {
    shuju[i] = yyy[i].split(/,|，|\s+/);
  };
  return shuju;
}
/* calc measurements for an array of points */
function calc(latlngs) {
  const last = latlngs[latlngs.length - 1];
  const path = latlngs.map(latlng => [latlng.lat, latlng.lng]);

  const polyline = L.polyline(path),
    polygon = L.polygon(path);
  const meters = turf.length(polyline.toGeoJSON(), { units: 'kilometers' }) * 1000;
  const sqMeters = turf.area(polygon.toGeoJSON());

  return {
    lastCoord: {
      dd: {
        x: last.lng,
        y: last.lat
      }
    },
    length: meters,
    area: sqMeters
  };
}

//-------------------------------------------------------------添加 经纬网格
var Graticulelayer = L.latlngGraticule({
  showLabel: true,
  zoomInterval: [
    { start: 2, end: 3, interval: 30 },
    { start: 4, end: 4, interval: 10 },
    { start: 5, end: 6, interval: 5 },
    { start: 7, end: 8, interval: 2 },
    { start: 9, end: 10, interval: 1 },
    { start: 11, end: 12, interval: 0.2 },
    { start: 13, end: 17, interval: 0.1 },
  ]
})
layerControl.addOverlay(Graticulelayer, '经纬网');

// ------------------------------------------------------------添加 测量工具
var measureControl = new L.Control.Measure({
  position: 'topleft',
  primaryLengthUnit: 'kilometers', secondaryLengthUnit: undefined,
  primaryAreaUnit: 'hectares', secondaryAreaUnit: undefined
});
measureControl.addTo(map);
// ------------------------------------------------------------添加 绘图工具
map.pm.addControls({
  position: 'topleft',
  drawCircle: false,
  drawCircleMarker: false,
  drawLine: false
});

var layerControl2 = L.control.layers().addTo(map);
var basedata = new L.layerGroup();
layerControl2.addOverlay(basedata, "临时绘图");

// map.on(('pm:create'), e => {
//   // ||'pm:update'
//   e.layer.addTo(basedata);
// });

map.on('pm:create', ({ layer }) => {
  console.log("-----------start------------");
  console.log("事件触发：图形创建，对象为", layer);
  layer.addTo(basedata);
  MyPopup(layer,)

  layer.on('pm:edit', e => {
    var feature_edited = e.target;
    console.log("事件触发：图形编辑，对象为", feature_edited);
    MyPopup(feature_edited,)

  });
});

// // Don't add the popup directly to marker, create a popup "layer" and open it, when clicked on the marker:
// // a global variable
// var popup = L.popup({closeOnClick: false, autoClose: false, closeButton: true});

// //your function from above
// const newMarker = new L.marker(e.latlng,{draggable:true}).addTo(lmap);
// newMarker.on('click',(e)=>{
//     popup.options.offset = e.target.options.icon.options.popupAnchor;
//     popup.setContent('TEST').setLatLng(e.target.getLatLng()).addTo(map)
// })

function MyPopup(layer, featuretype, layername) {
  if (layer.styleEditor.type) {
    featuretype = layer.styleEditor.type;
    console.log("输入图层具有自带类型，默认更改");
  }
  if (layername) { var nametext = '<h3>名称： ' + layername + '</h3>'; } else { var nametext = '' };
  switch (featuretype) {
    case 'Polygon':
    case 'Rectangle':
    case 'Polyline':
      {
        // console.log("坐标");
        // console.log(layer.getLatLngs());
        // console.log("范围");
        // console.log(layer.getBounds());

        var SW = layer._bounds._southWest.lat.toFixed(9) + "&emsp;" + layer._bounds._southWest.lng.toFixed(9);
        var NE = layer._bounds._northEast.lat.toFixed(9) + "&emsp;" + layer._bounds._northEast.lng.toFixed(9);
        var typetext = '<h4>类型： ' + featuretype + '</h4>';
        var rangetext = '<h4 style="padding:10px 0 0 0; border-top:0.5px solid #000;">范围：<h4/>纬度&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;经度<br>' + SW + '<br>' + NE + '<br>';

        if (featuretype == 'Polyline') {
          var coord = layer.getLatLngs();
          var Lengthtext = '<h4 style="padding:10px 0 0 0; border-top:0.5px solid #000;">长度： ' + (calc(coord).length / 1000).toFixed(3) + ' km<h4/>';
          var Areatext = '';
        } else {
          var coord = layer.getLatLngs()[0];
          var Lengthtext = '';
          var Areatext = '<h4 style="padding:10px 0 0 0; border-top:0.5px solid #000;">面积： ' + (calc(coord).area / 10000).toFixed(4) + ' 公顷<h4/>';
        }
        var coordtext = '<h4 style="padding:10px 0 0 0; border-top:0.5px solid #000;">坐标:<h4/><p>' +
          '纬度&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;经度<br>';
        for (i = 0; i < coord.length; i++) { coordtext = coordtext + coord[i].lat.toFixed(9) + "&emsp;" + coord[i].lng.toFixed(9) + "<br>" };
        if (coord.length > 10) { console.log(coord); coordtext = '数据量超过20个，已打印至控制台，按F12'; }
        var popHtml = nametext + typetext + Lengthtext + Areatext + rangetext + coordtext + '</p>'
        layer.bindPopup(popHtml, { maxWidth: 500, minWidth: 100, maxHeight: 600 })
        // .openPopup();
      }
      break;
    case 'Marker':
      var coord = layer.getLatLng();
      var coordtext = coord.lat.toFixed(9) + "  " + coord.lng.toFixed(8);
      var popHtml = '<h3>类型: ' + featuretype + '</h3> <h4>坐标:<h4/><p>' + coordtext + '</p>'
      layer.bindPopup(popHtml).openPopup();
      break;
    default:
      console.log("wrong featuretype");
  }
}


// ------------------------------------------------------------添加 编辑工具
var styleEditor = L.control.styleEditor({
  position: "topleft",
  colorRamp: ['#007FFF', '#7400A1', '#3CB371', '#7B68EE', '#0000CD', '#C71585', '#4169E1', '#22C32E', '#FFFF00', '#E60000'],
  showTooltip: false,
  useGrouping: true,
  defaultMarkerIcon: 'circle',
  // ignoreLayerTypes :["Marker"],
});
map.addControl(styleEditor);
// ------------------------------------------------------------添加 定位工具
if (/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)) {
  var lc = L.control.locate({
    position: 'topleft',
    locateOptions: {
      maxZoom: 17,
      enableHighAccuracy: true,
    },
    follow: true,
    icon: 'fa fa-location-arrow',
    cacheLocation: true,
    onLocationError: function (err) { alert(err.message) },
    onLocationFound: function (e) { console.log('定位成功=====>', e) },
  }).addTo(map);
};


//------------------------------------------------------------------------等值线图
//----------------配色方案，可自定义添加新行----------------
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

//凸包检测输出点转为json字符串
function point2str(po) {
  var arr = new Array();
  for (var i = 0; i < po.length; i++) { arr[i] = '[' + po[i].x + "," + po[i].y + ']' };
  arr[po.length] = '[' + po[0].x + "," + po[0].y + ']'
  var arr2 = "[[" + arr.join() + "]]";
  return arr2;
}

//---------------------------------------------------------------------------div可拖动
function dragFunc(id) {
  var Drag = document.getElementById(id);
  Drag.onmousedown = function (event) {
    var ev = event || window.event;
    event.stopPropagation();
    var disX = ev.clientX - Drag.offsetLeft;
    var disY = ev.clientY - Drag.offsetTop;
    document.onmousemove = function (event) {
      var ev = event || window.event;
      Drag.style.left = ev.clientX - disX + "px";
      Drag.style.top = ev.clientY - disY + "px";
      Drag.style.cursor = "move";
    };
  };
  Drag.onmouseup = function () {
    document.onmousemove = null;
    this.style.cursor = "default";
  };
};
dragFunc("showsetting");
dragFunc("showtools");
dragFunc("select");





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

