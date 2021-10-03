// ------------------------------------------------------------------------生成 map
var mapStuff = initDemoMap();
var map = mapStuff.map;
var layerControl = mapStuff.layerControl;
// L.marker([39.905530, 116.391305]).addTo(map).bindPopup('<p>WGS84坐标下，天安门广场国旗</p>').openPopup();

// ----------------map初始化---------------------
function initDemoMap() {
    //Esri影像
    var Esri_WorldImagery = L.tileLayer(
        "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        maxZoom: 18,
        attribution: "&copy; Esri"
    });
    //Esri海洋
    var Esri_OceanBasemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
        attribution: "&copy; Esri"
    });

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
    var Jawg_Streets = L.tileLayer('https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
        attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 22,
        subdomains: 'abcd',
        accessToken: 'DGEPTrYpfvrfrjgNGAF1tziKZBqDBXP1ukNpvd7PEQ8tf6cvdMBI4Md4JetBfC7B'
    });

    // 天地图影像
    var tianditu_img = L.tileLayer("http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a5d3fb2ad894a60ff2d3abccc7a7c51", {
        attribution: "&copy; 天地图"
    });
    // 天地图地形
    var tianditu_ter = L.tileLayer("http://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a5d3fb2ad894a60ff2d3abccc7a7c51", {
        attribution: "&copy; 天地图"
    });

    // Google影像
    var GoogleImage = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: "&copy; Google"
    });
    // Google地图
    var GoogleMap = L.tileLayer("http://{s}.google.cn/vt/lyrs=m@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga", {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: "&copy; Google"
    });
    // 高德影像
    var gaode = L.tileLayer("https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}", {
        maxZoom: 18,
        corrdType: "gcj02",
        subdomains: ["1", "2", "3", "4"],
        attribution: "&copy; 高德地图"
    });
    // 船讯网谷歌影像
    var GoogleImage2 = L.tileLayer("http://gwxc.shipxy.com/tile.g?z={z}&x={x}&y={y}", {
        corrdType: "gcj02",
        attribution: "&copy; 船讯网",
    });
    // 船讯网谷歌地图
    var GoogleMap2 = L.tileLayer("http://gdtc.shipxy.com/tile.g?z={z}&x={x}&y={y}", {
        corrdType: "gcj02",
        attribution: "&copy; 船讯网",
    });

    // 船讯网海图
    var haitu = L.tileLayer("http://m12.shipxy.com/tile.c?l=Na&m=o&x={x}&y={y}&z={z}", {
        attribution: "&copy; 船讯网",
        corrdType: "gcj02",
    });
    // 中国港海图
    var haitu2 = L.tileLayer("http://gis.chinaports.com:5010/map/getMap/{x}/{y}/{z}", {
        attribution: "&copy; 中国港口网",
    });
    //--------------------------设置主图层--------------------------------
    var baseLayers = {
        "Esri影像": Esri_WorldImagery,
        "天地图影像": tianditu_img,
        "谷歌影像": GoogleImage,
        "OpenStreet": OpenStreetMap_Mapnik,
        "JawgStreet": Jawg_Streets,
        // "谷歌地图": GoogleMap,
        // "海图船讯": haitu,
        "海图在线": haitu2,
        "谷歌影像 火星": GoogleImage2,
        "高德影像 火星": gaode,
        "谷歌地图 火星": GoogleMap2,
        "Geoq暖色 火星": warm,
        "Geoq水系 火星": HydroMap,
    };
    //------------------------------定义复选图层-----------------------------
    var tianditu_矢量注记 = L.tileLayer("http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a5d3fb2ad894a60ff2d3abccc7a7c51", {
    });
    var tianditu_地形注记 = L.tileLayer("http://t0.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a5d3fb2ad894a60ff2d3abccc7a7c51", {
    });
    var gaodeAnnotion = L.tileLayer('https://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}', {
        corrdType: "gcj02",
        subdomains: ["1", "2", "3", "4"]
    });
    var tianditu_全球境界 = L.tileLayer("http://t0.tianditu.gov.cn/ibo_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ibo&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a5d3fb2ad894a60ff2d3abccc7a7c51", {
    });

    var overlayLayers = {
        "天地图矢量注记": tianditu_矢量注记,
        "天地图道路注记": tianditu_地形注记,
        "高德影像注记火星": gaodeAnnotion,
        // "天地图全球境界": tianditu_全球境界,
    }
    //--------------------------------------------------------------------------地图设置
    var map = L.map("map", {
        layers: [Esri_WorldImagery],
        zoomControl: false,
        attributionControl: false
    });

    var layerControl = L.control.layers(baseLayers, overlayLayers).addTo(map);
    map.setView([37, 117], 4);
    // var layerControl2 = L.control.layers(baseLayers);
    // layerControl2.addTo(map);
    return {
        map: map,
        layerControl: layerControl,
        // layerControl2: layerControl2
    };
};

// var layerControl2 = mapStuff.layerControl2;

// var command = L.control({position: 'topleft'}); 
// command.onAdd = function (map) {
//     var div = L.DomUtil.create('div','command'); 
//     div.innerHTML = '<form><input id="command" type="checkBox"/>command</form>'; 
//     return div;
// }; 
// command.addTo(map);