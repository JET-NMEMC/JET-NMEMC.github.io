/**
 * Map initialization — base layers, overlay layers, controls.
 * Attaches map instances to WGIS.state.
 */
(function () {
  'use strict';

  // =========================================================================
  // Coordinate correction for Leaflet tile layers
  // =========================================================================
  L.CoordConver = function () {
    var pi = 3.1415926535897932384626;
    var a = 6378245.0;
    var ee = 0.00669342162296594323;
    var x_pi = pi * 3000.0 / 180.0;
    var R = 6378137;

    function transformLat(x, y) {
      var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
      ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
      ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
      ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
      return ret;
    }
    function transformLng(x, y) {
      var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
      ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
      ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
      ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
      return ret;
    }
    function transform(lng, lat) {
      var dLat = transformLat(lng - 105.0, lat - 35.0);
      var dLng = transformLng(lng - 105.0, lat - 35.0);
      var radLat = lat / 180.0 * pi;
      var magic = Math.sin(radLat);
      magic = 1 - ee * magic * magic;
      var sqrtMagic = Math.sqrt(magic);
      dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
      dLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
      return { lng: lng + dLng, lat: lat + dLat };
    }

    this.bd09_To_gps84 = function (lng, lat) {
      var gcj02 = this.bd09_To_gcj02(lng, lat);
      return this.gcj02_To_gps84(gcj02.lng, gcj02.lat);
    };
    this.gps84_To_bd09 = function (lng, lat) {
      var gcj02 = this.gps84_To_gcj02(lng, lat);
      return this.gcj02_To_bd09(gcj02.lng, gcj02.lat);
    };
    this.gps84_To_gcj02 = function (lng, lat) {
      return transform(lng, lat);
    };
    this.gcj02_To_gps84 = function (lng, lat) {
      var coord = transform(lng, lat);
      return { lng: lng * 2 - coord.lng, lat: lat * 2 - coord.lat };
    };
    this.gcj02_To_bd09 = function (x, y) {
      var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
      var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
      return { lng: z * Math.cos(theta) + 0.0065, lat: z * Math.sin(theta) + 0.006 };
    };
    this.bd09_To_gcj02 = function (bd_lng, bd_lat) {
      var x = bd_lng - 0.0065;
      var y = bd_lat - 0.006;
      var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
      var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
      return { lng: z * Math.cos(theta), lat: z * Math.sin(theta) };
    };
  };

  L.coordConver = function () {
    return new L.CoordConver();
  };

  // Inject coordinate correction into Leaflet's GridLayer
  L.GridLayer.include({
    _setZoomTransform: function (level, _center, zoom) {
      var center = _center;
      if (center !== undefined && this.options) {
        if (this.options.corrdType === 'gcj02') {
          center = L.coordConver().gps84_To_gcj02(_center.lng, _center.lat);
        } else if (this.options.corrdType === 'bd09') {
          center = L.coordConver().gps84_To_bd09(_center.lng, _center.lat);
        }
      }
      var scale = this._map.getZoomScale(zoom, level.zoom),
        translate = level.origin.multiplyBy(scale)
          .subtract(this._map._getNewPixelOrigin(center, zoom)).round();
      if (L.Browser.any3d) {
        L.DomUtil.setTransform(level.el, translate, scale);
      } else {
        L.DomUtil.setPosition(level.el, translate);
      }
    },
    _getTiledPixelBounds: function (_center) {
      var center = _center;
      if (center !== undefined && this.options) {
        if (this.options.corrdType === 'gcj02') {
          center = L.coordConver().gps84_To_gcj02(_center.lng, _center.lat);
        } else if (this.options.corrdType === 'bd09') {
          center = L.coordConver().gps84_To_bd09(_center.lng, _center.lat);
        }
      }
      var map = this._map,
        mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(),
        scale = map.getZoomScale(mapZoom, this._tileZoom),
        pixelCenter = map.project(center, this._tileZoom).floor(),
        halfSize = map.getSize().divideBy(scale * 2);
      return new L.Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
    }
  });

  // =========================================================================
  // Base map initialization
  // =========================================================================
  function initDemoMap() {
    var cfg = WGIS.config;

    // --- Base tile layers ---
    var MapBoxImagery = L.tileLayer(
      'https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png256?access_token=' + cfg.mapboxToken, {
        attribution: '&copy; MapBox'
      });

    var Esri_WorldImagery = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri'
      });

    var tianditu_img = L.tileLayer(
      'http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + cfg.tiandituToken, {
        attribution: '&copy; 天地图'
      });

    var xingtu_img = L.tileLayer(
      'https://tiles2.geovisearth.com/base/v1/img/{z}/{x}/{y}?format=webp&tmsIds=w&token=170dbb165d761caf143c176ff1f51d59000a37051c6d86d4a05c5e7ceeb81504', {
        attribution: '&copy; 星图地球'
      });

    var GoogleImage = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; Google'
    });

    var GoogleImage_chuanxun = L.tileLayer('https://gwxc.shipxy.com/tile.g?z={z}&x={x}&y={y}', {
      corrdType: 'gcj02',
      attribution: '&copy; 船讯网'
    });

    var gaode = L.tileLayer('https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
      corrdType: 'gcj02',
      subdomains: ['1', '2', '3', '4'],
      attribution: '&copy; 高德地图'
    });

    var GoogleMap2 = L.tileLayer('http://gdtc.shipxy.com/tile.g?z={z}&x={x}&y={y}', {
      attribution: '&copy; 船讯网 Google'
    });

    // --- Sea charts ---
    var haitu_chuanxun = L.tileLayer('http://m12.shipxy.com/tile.c?l=Na&m=o&x={x}&y={y}&z={z}', {
      attribution: '&copy; 船讯网'
    });

    var haitu_chinaport = L.tileLayer('https://map.chinaports.com/map/getWorldSeaMap/{x}/{y}/{z}', {
      attribution: '&copy; 中国港口网'
    });

    var haitu_haishi = L.tileLayer(
      'https://ais.msa.gov.cn/chartService/service/rest/services/cf8cb8de21ad4acbad82699732eae3fc/wmts/tile/1.0.0/default/default028mm/{z}/{y}/{x}.png?token=62be2fb973554df7bd7648614a937bf2', {
        attribution: '&copy; 海事导助航综合服务系统'
      });

    var haitu_ehanghai = L.tileLayer(
      'https://enavapp.nhhb.org.cn/arcgis/services/SouthChinaENCWater?layer=SouthChinaENCWater&style=default&tilematrixset=default028mm&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={x}&TileRow={y}', {
        attribution: '&copy; E航海综合服务系统'
      });

    // --- GeoQ thematic ---
    var HydroMap = L.tileLayer(
      'https://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}', {
        corrdType: 'gcj02',
        attribution: '&copy; 智图地图'
      });

    var warm = L.tileLayer(
      'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}', {
        corrdType: 'gcj02',
        attribution: '&copy; 智图地图'
      });

    // --- OpenStreet / Jawg ---
    var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    });

    var Jawg_Streets = L.tileLayer(
      'https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=' + cfg.jawgToken, {
        attribution: '&copy; JawgMaps &copy; OpenStreetMap contributors',
        maxZoom: 22,
        subdomains: 'abcd'
      });

    // --- Base layer collection ---
    var baseLayers = {
      '影像 Esri': Esri_WorldImagery,
      '影像 Mapbox': MapBoxImagery,
      '影像 天地图': tianditu_img,
      '影像 星图': xingtu_img,
      '影像 谷歌': GoogleImage,
      '影像 船讯谷歌火星': GoogleImage_chuanxun,
      '影像 高德地球火星': gaode,
      '船讯海图': haitu_chuanxun,
      '港口海图': haitu_chinaport,
      '谷歌地图 火星': GoogleMap2,
      '智图暖色 火星': warm,
      '智图水系 火星': HydroMap,
      'Open Street': OpenStreetMap_Mapnik,
      'Jawg Street': Jawg_Streets
    };

    // --- Overlay layers ---
    var tianditu_cva = L.tileLayer(
      'http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + cfg.tiandituToken, {
        corrdType: 'wgs84'
      });
    var tianditu_cta = L.tileLayer(
      'http://t0.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + cfg.tiandituToken, {
        corrdType: 'wgs84'
      });
    var gaodeAnnotion = L.tileLayer(
      'https://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}', {
        corrdType: 'gcj02',
        subdomains: ['1', '2', '3', '4']
      });
    var esriAnnotion = L.tileLayer(
      'https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}', {
        corrdType: 'wgs84'
      });

    var overlayLayers = {
      '天地图矢量注记': tianditu_cva,
      '天地图道路注记': tianditu_cta,
      'esri海洋注记': esriAnnotion,
      '高德影像注记火星': gaodeAnnotion
    };

    // --- Create map ---
    var map = L.map('map', {
      layers: [Esri_WorldImagery],
      zoomControl: false,
      attributionControl: false
    });

    var layerControl = L.control.layers(baseLayers, overlayLayers).addTo(map);
    var templayer = new L.layerGroup();
    var layerControl2 = L.control.layers().addTo(map);
    layerControl2.addOverlay(templayer, '临时绘图');
    map.setView([39, 120], 8);

    // --- CartoGraticule ---
    L.control.cartoGraticule({
      position: 'topleft',
      fontSize: 14,
      tickDirection: 'out',
      showZoomControl: false,
      targetN: { lng: 2.8, lat: 1.8 },
      mapStyle: {
        top: '40px', bottom: '40px', left: '200px', right: '100px'
      }
    }).addTo(map);

    // --- LatLng Graticule ---
    var Graticulelayer = L.latlngGraticule({
      showLabel: true,
      zoomInterval: [
        { start: 2, end: 3, interval: 30 },
        { start: 4, end: 4, interval: 10 },
        { start: 5, end: 6, interval: 5 },
        { start: 7, end: 8, interval: 2 },
        { start: 9, end: 10, interval: 1 },
        { start: 11, end: 12, interval: 0.2 },
        { start: 13, end: 17, interval: 0.1 }
      ]
    });
    layerControl.addOverlay(Graticulelayer, '经纬网');

    // --- Geoman drawing tools ---
    map.pm.addControls({
      position: 'topleft'
    });
    map.pm.setLang('zh');

    // --- Locate control (mobile only) ---
    if (/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)) {
      L.control.locate({
        position: 'topleft',
        locateOptions: { maxZoom: 17, enableHighAccuracy: true },
        follow: true,
        icon: 'fa fa-location-arrow',
        cacheLocation: true,
        onLocationError: function (err) { alert(err.message); },
        onLocationFound: function (e) { console.log('定位成功', e); }
      }).addTo(map);
    }

    return {
      map: map,
      layerControl: layerControl,
      layerControl2: layerControl2,
      templayer: templayer
    };
  }

  // =========================================================================
  // Initialize and expose to WGIS
  // =========================================================================
  var mapStuff = initDemoMap();
  WGIS.state.map = mapStuff.map;
  WGIS.state.layerControl = mapStuff.layerControl;
  WGIS.state.layerControl2 = mapStuff.layerControl2;
  WGIS.state.templayer = mapStuff.templayer;
})();
