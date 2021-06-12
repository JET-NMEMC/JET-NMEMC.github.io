function initDemoMap() {
  var Esri_WorldImagery = L.tileLayer(
    "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 17,
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
  var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  var Jawg_Streets = L.tileLayer('https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
    attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 0,
    maxZoom: 22,
    subdomains: 'abcd',
    accessToken: 'DGEPTrYpfvrfrjgNGAF1tziKZBqDBXP1ukNpvd7PEQ8tf6cvdMBI4Md4JetBfC7B'
  });
  var tianditu_img = L.tileLayer("http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a5d3fb2ad894a60ff2d3abccc7a7c51", {
  });
  var tianditu_ter = L.tileLayer("http://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a5d3fb2ad894a60ff2d3abccc7a7c51", {
  });
  var gugedianzi = L.tileLayer("http://mt0.google.cn/vt/lyrs=m@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga", {
  });
  var GoogleImage = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  });
  //--------------------------------------------------------------------------------------------------主程序
  var baseLayers = {
    "Esri影像": Esri_WorldImagery,
    "天地图影像": tianditu_img,
    //   "谷歌影像":GoogleImage,
    "OpenStreet": OpenStreetMap_Mapnik,
    "JawgStreet": Jawg_Streets,
  };

  var tianditu_矢量注记 = L.tileLayer("http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a5d3fb2ad894a60ff2d3abccc7a7c51", {
  });
  var tianditu_地形注记 = L.tileLayer("http://t0.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a5d3fb2ad894a60ff2d3abccc7a7c51", {
  });
  var overlayLayers = {
    "天地图矢量注记": tianditu_矢量注记,
    "天地图道路注记": tianditu_地形注记,
    // "天地图全球境界": tianditu_全球境界,
  }

  var map = L.map("map", {
    layers: [Esri_WorldImagery],
    zoomControl: false
  });

  var layerControl = L.control.layers(baseLayers, overlayLayers).addTo(map);
  map.setView([37, 117], 4);
  return {
    map: map,
    layerControl: layerControl,

  };
};

// demo map
var mapStuff = initDemoMap();
var map = mapStuff.map;
var layerControl = mapStuff.layerControl;
