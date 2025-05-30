// ---------------------------------------------------------------初始化 map
// ---------------------------------------------------------------初始化 map
var mapStuff = initDemoMap();
var map = mapStuff.map;
var layerControl = mapStuff.layerControl;
var layerControl2 = mapStuff.layerControl2;
var templayer = mapStuff.templayer;
// templayer.options.name = "templayer";

// --------------------------------------map初始化程序--------------------------------
// --------------------------------------map初始化程序--------------------------------
function initDemoMap() {

    //MapBox影像
    var MapBoxImagery = L.tileLayer(
        // "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamhlbWJkIiwiYSI6ImNqcHpueHpyZjBlMjAzeG9kNG9oNzI2NTYifQ.K7fqhk2Z2YZ8NIV94M-5nA", {
        "https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png256?access_token=pk.eyJ1IjoiamV0emhhbmc2NjYiLCJhIjoiY2wybHR4aG1oMGF3dzNqbzMzNHB0MnFlaSJ9.XX7c6An8IZPI0muNhrTf9w", {
        // maxZoom: 18,
        attribution: "&copy; MapBox"
    });

    //Esri影像
    var Esri_WorldImagery = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        // maxZoom: 18,
        attribution: "&copy; Esri"
    });

    // var Esri_worldTerrain = L.tileLayer(
    //     "https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}", {
    //     // maxZoom: 18,
    //     attribution: "&copy; Esri"
    // });

    // 天地图影像
    var tianditu_img = L.tileLayer("http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a5d3fb2ad894a60ff2d3abccc7a7c51", {
        attribution: "&copy; 天地图"
    });
    // // 天地图地形
    // var tianditu_ter = L.tileLayer("http://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a5d3fb2ad894a60ff2d3abccc7a7c51", {
    //     attribution: "&copy; 天地图"
    // });

    //星图地球
    var xingtu_img = L.tileLayer('https://tiles2.geovisearth.com/base/v1/img/{z}/{x}/{y}?format=webp&tmsIds=w&token=170dbb165d761caf143c176ff1f51d59000a37051c6d86d4a05c5e7ceeb81504', {
        // maxZoom: 19,
        // attribution: '&copy; <a href="https://datacloud.geovisearth.com/">星图地球</a>'
    });
// 
    // Google影像
    var GoogleImage = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: "&copy; Google"
    });
    // Google影像开源
    var GoogleImagekaiyuan = L.tileLayer('https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}', {
        // subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: "&copy; Google"
    });

    // 高德影像 火星
    var gaode = L.tileLayer("https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}", {
        // maxZoom: 18,
        corrdType: "gcj02",
        subdomains: ["1", "2", "3", "4"],
        attribution: "&copy; 高德地图"
    });

    // 船讯网谷歌影像 火星
    //https://gwxc.shipxy.com/tile.g?z=12&x=3397&y=1585
    var GoogleImage_chuanxun = L.tileLayer("https://gwxc.shipxy.com/tile.g?z={z}&x={x}&y={y}", {
        corrdType: "gcj02",//https://m12.shipxy.com/tile.c?l=Na&m=o&x={x}&y={y}&z={z}
        attribution: "&copy; 船讯网",
    });

    // 滕恒谷歌影像 火星
    var TenghengImage = L.tileLayer("http://1.tengheng123.top/maps/vt/lyrs=s,h&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=%7B$Galileo%7D&scale=1", {
        corrdType: "gcj02",
        attribution: "&copy; Google",
    });

    // 船讯网谷歌地图 火星
    var GoogleMap2 = L.tileLayer("http://gdtc.shipxy.com/tile.g?z={z}&x={x}&y={y}", {
        // corrdType: "gcj02",
        attribution: "&copy; 船讯网 Google",
    });
    //----------------------------------------------------------------------------------------------------海图
    // 船讯网海图 未名坐标
    var haitu_chuanxun = L.tileLayer("http://m12.shipxy.com/tile.c?l=Na&m=o&x={x}&y={y}&z={z}", {
        attribution: "&copy; 船讯网",
        // corrdType: "gcj02",
    });

    // 中国港海图 wgs84
    var haitu_chinaport = L.tileLayer("https://map.chinaports.com/map/getWorldSeaMap/{x}/{y}/{z}", {
        attribution: "&copy; 中国港口网", //https://map.chinaports.com/map/getWorldSeaMap/1715/784/11
        // corrdType: "gcj02",
    });
    // 海事海图 wgs84
    var haitu_haishi = L.tileLayer("https://ais.msa.gov.cn/chartService/service/rest/services/cf8cb8de21ad4acbad82699732eae3fc/wmts/tile/1.0.0/default/default028mm/{z}/{y}/{x}.png?token=62be2fb973554df7bd7648614a937bf2", {
        attribution: "&copy; 海事导助航综合服务系统",
        // corrdType: "gcj02",
    });
    // E航海综合服务系统海图 wgs84 
    var haitu_ehanghai = L.tileLayer("https://enavapp.nhhb.org.cn/arcgis/services/SouthChinaENCWater?layer=SouthChinaENCWater&style=default&tilematrixset=default028mm&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={x}&TileRow={y}", {
        attribution: "&copy; E航海综合服务系统",
        // corrdType: "gcj02",
    });

    // // YE海图 wgs84
    // var haitu_YE = L.tileLayer("https://118.25.187.132:8071/{z}/{y}/{x}.png", {
    //     attribution: "&copy; YE海图",
    // });

    //geoq水系
    var HydroMap = L.tileLayer("https://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}", {
        corrdType: "gcj02",
        attribution: '&copy; <a class="ol-attribution-geoqmap" ' + 'href="http://www.geoq.net/basemap.html">' + '智图地图</a>'
    });

    //geoq暖色
    var warm = L.tileLayer("https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}", {
        corrdType: "gcj02",
        attribution: '&copy; <a class="ol-attribution-geoqmap" ' + 'href="http://www.geoq.net/basemap.html">' + '智图地图</a>'
    });

    //OpenStreet街道
    var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    //Jawg街道
    var Jawg_Streets = L.tileLayer('https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
        attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 22,
        subdomains: 'abcd',
        accessToken: 'DGEPTrYpfvrfrjgNGAF1tziKZBqDBXP1ukNpvd7PEQ8tf6cvdMBI4Md4JetBfC7B'
    });
    //--------------------------设置主图层--------------------------------
    var baseLayers = {
        "影像 Esri": Esri_WorldImagery,
        "影像 Mapbox": MapBoxImagery,
        "影像 天地图": tianditu_img,
        "影像 星图": xingtu_img,
        "影像 谷歌": GoogleImage,
        // "影像 谷歌开源": GoogleImagekaiyuan,
        // "影像 滕恒谷歌火星": TenghengImage,

        "影像 船讯谷歌火星": GoogleImage_chuanxun,      
        "影像 高德地球火星": gaode,

        "船讯海图": haitu_chuanxun,
        "港口海图": haitu_chinaport,
        // "海事海图": haitu_haishi,
        // "航保海图": haitu_ehanghai,
        // "海图 YE": haitu_YE,

        "谷歌地图 火星": GoogleMap2,
        "智图暖色 火星": warm,
        "智图水系 火星": HydroMap,

        "Open Street": OpenStreetMap_Mapnik,
        "Jawg Street": Jawg_Streets,
    };
    //------------------------------定义复选图层-----------------------------
    var tianditu_矢量注记 = L.tileLayer("http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a5d3fb2ad894a60ff2d3abccc7a7c51", {
        corrdType: "wgs84",
    });
    var tianditu_地形注记 = L.tileLayer("http://t0.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a5d3fb2ad894a60ff2d3abccc7a7c51", {
        corrdType: "wgs84",
    });
    var gaodeAnnotion = L.tileLayer('https://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}', {
        corrdType: "gcj02",
        subdomains: ["1", "2", "3", "4"]
    });
    var esriAnnotion = L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}', {
        corrdType: "wgs84",
    });
    // var tianditu_全球境界 = L.tileLayer("http://t0.tianditu.gov.cn/ibo_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ibo&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a5d3fb2ad894a60ff2d3abccc7a7c51", {
    // });

    var overlayLayers = {
        "天地图矢量注记": tianditu_矢量注记,
        "天地图道路注记": tianditu_地形注记,
        "esri海洋注记": esriAnnotion,
        "高德影像注记火星": gaodeAnnotion,
        // "天地图全球境界": tianditu_全球境界,
    }
    //----------------------------------------------------------------------地图设置
    var map = L.map("map", {
        layers: [Esri_WorldImagery],
        zoomControl: false,
        attributionControl: false,
    });

    var layerControl = L.control.layers(baseLayers, overlayLayers).addTo(map);
    var templayer = new L.layerGroup();
    var layerControl2 = L.control.layers().addTo(map);
    layerControl2.addOverlay(templayer, "临时绘图");
    map.setView([39, 120], 8);
    return {
        map: map,
        layerControl: layerControl,
        layerControl2: layerControl2,
        templayer: templayer
    };
};

//-----------------------------------------------------------添加 经纬网格
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
// ------------------------------------------------------------添加 绘图工具
map.pm.addControls({
    position: 'topleft',
    drawCircle: false,
    drawCircleMarker: false,
    // drawLine: false,
    cutPolygon: false,
});
var styleEditor = L.control.styleEditor({
    position: "topleft",
    // colorRamp: ['#007FFF', '#7400A1', '#3CB371', '#7B68EE', '#0000CD', '#C71585', '#4169E1', '#22C32E', '#FFFF00', '#E60000'],
    colorRamp: ['#E60000', '#FFFF00', '#00FF00', '#0000CD', '#8000FF', '#C71585', '#FF8000', '#22C32E', '#007FFF', '#7B68EE'],
    showTooltip: false,
    useGrouping: true,
    defaultMarkerIcon: 'circle',
    // ignoreLayerTypes :["Marker"],
});
map.addControl(styleEditor);

// ----------------------------------------------------------添加 定位工具
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
// ----------------------------------------------------------添加 测量工具
// var measureControl = new L.Control.Measure({
//     position: 'topleft',
//     primaryLengthUnit: 'kilometers', secondaryLengthUnit: undefined,
//     primaryAreaUnit: 'hectares', secondaryAreaUnit: undefined
// }).addTo(map);

// var layerControl2 = mapStuff.layerControl2;

// var command = L.control({position: 'topleft'});
// command.onAdd = function (map) {
//     var div = L.DomUtil.create('div','command');
//     div.innerHTML = '<form><input id="command" type="checkBox"/>command</form>';
//     return div;
// };
// command.addTo(map);


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