/**
 * UI module — popup handling and drawing tools (point/line/polygon).
 */
(function () {
  'use strict';

  var map = null;
  var layerControl2 = null;
  var templayer = null;
  var popup = L.popup({ autoClose: true, offset: [0, -25], maxWidth: 600, minWidth: 190 });

  // =========================================================================
  // Geometry calculation helpers
  // =========================================================================
  function calc(latlngs) {
    var path = latlngs.map(function (ll) { return [ll.lat, ll.lng]; });
    var polyline = L.polyline(path);
    var polygon = L.polygon(path);
    var meters = turf.length(polyline.toGeoJSON(), { units: 'kilometers' }) * 1000;
    var sqMeters = turf.area(polygon.toGeoJSON());
    return { length: meters, area: sqMeters };
  }

  function getType(layer) {
    if (layer instanceof L.Rectangle) { return 'Rectangle'; }
    if (layer instanceof L.Polygon) { return 'Polygon'; }
    if (layer instanceof L.Polyline) { return 'Polyline'; }
    if (layer instanceof L.Marker) { return 'Marker'; }
    if (layer instanceof L.divIcon) { return 'divIcon'; }
    if (layer instanceof L.layerGroup) { return 'layerGroup'; }
    if (layer instanceof L.featureGroup) { return 'featureGroup'; }
    return 'unknown';
  }

  // =========================================================================
  // Popup content builder
  // =========================================================================
  function buildPopup(layer, featureType) {
    var nametext;
    if (layer.options.name !== undefined) {
      nametext = '<h3>名称： ' + layer.options.name + '</h3>';
    } else if (layer.options.icon !== undefined) {
      nametext = '<h3>名称： ' + layer.options.icon.options.name + '</h3>';
    } else {
      nametext = '<h3>名称： Undefined</h3>';
    }

    featureType = layer.pm._shape;

    var typetext = '<h4 id="typetext" style="padding:10px 0 0 0; border-top:0.5px solid #000;">类型： ' +
      featureType + '</h4>';

    var descriptext = '';
    if (layer.options.description) {
      descriptext = '<div id="descriptext">' +
        '<h4 style="padding:10px 0 0 0; border-top:0.5px solid #000;">描述:</h4><div>' +
        layer.options.description + '</div></div>';
    }

    var coord, Lengthtext, Areatext, rangetext, coordtext, coordoutput;

    switch (featureType) {
      case 'Polygon':
      case 'Rectangle':
      case 'Polyline':
      case 'Line':
        var SW = layer._bounds._southWest.lng.toFixed(9) + '&emsp;' + layer._bounds._southWest.lat.toFixed(9);
        var NE = layer._bounds._northEast.lng.toFixed(9) + '&emsp;' + layer._bounds._northEast.lat.toFixed(9);
        rangetext = '<div id="rangetext"><h4 style="padding:10px 0 0 0; border-top:0.5px solid #000;">范围：</h4>' +
          '经度&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;纬度<br>' + SW + '<br>' + NE + '</div>';

        if (featureType === 'Polyline' || featureType === 'Line') {
          coord = layer.getLatLngs();
          Lengthtext = '<h4 id="lengthtext" style="padding:10px 0 0 0; border-top:0.5px solid #000;">长度： ' +
            (calc(coord).length / 1000).toFixed(3) + ' km</h4>';
          Areatext = '';
        } else {
          coord = layer.getLatLngs()[0];
          Lengthtext = '';
          Areatext = '<h4 id="areatext" style="padding:10px 0 0 0; border-top:0.5px solid #000;">面积： ' +
            (calc(coord).area / 10000).toFixed(4) + ' 公顷</h4>';
        }

        var coordtext0 = '<div id="coordtext"><h4 style="padding:10px 0 0 0; border-top:0.5px solid #000;">坐标:</h4>';
        var coordtext1 = '<p>经度&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;纬度<br>';
        var coordtext2 = [];
        coordoutput = [];
        for (var i = 0; i < coord.length; i++) {
          coordtext2.push(coord[i].lng.toFixed(9) + '&emsp;' + coord[i].lat.toFixed(9));
          coordoutput.push([coord[i].lng.toFixed(9) + ' ' + coord[i].lat.toFixed(9)]);
        }
        if (coord.length <= 30) {
          coordtext = coordtext0 + coordtext1 + coordtext2.join('<br>') + '</div>';
        } else {
          coordtext = coordtext0 + '数据量超过30个，不显示</div><br>' +
            '<div style="text-align: center;"><button id="pop_printcoord">打印到控制台</button></div><br>';
        }
        break;

      case 'Marker':
      case 'CircleMarker':
      case 'Text':
      case 'Circle':
        coord = layer.getLatLng();
        Lengthtext = '';
        Areatext = '';
        rangetext = '';
        coordtext = '<div id="coordtext"><h4 style="padding:10px 0 0 0; border-top:0.5px solid #000;">位置:</h4>' +
          '<p>经度&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;纬度<br>' +
          coord.lng.toFixed(9) + '&emsp;' + coord.lat.toFixed(8) + '</p></div>';
        break;

      default:
        alert('Unknown feature type');
        return;
    }

    var endtext = '<div><form action="">' +
      '<label id="popup-shuxing" class="popup-open"><input type="radio" name="方法" id="属性" style="display:none" checked="checked">属性</label>' +
      '<label id="popup-xiangqing" class="popup-close"><input type="radio" name="方法" id="详情" style="display:none">详情</label>' +
      '</form></div>';

    var pop_mid1 = typetext + Lengthtext + Areatext + descriptext;
    var pop_mid2 = rangetext + coordtext;

    return {
      pop_mid1: pop_mid1,
      pop_mid2: pop_mid2,
      popHtml: nametext + '<div id="pop_mid">' + pop_mid1 + '</div>' + endtext,
      coordoutput: coordoutput
    };
  }

  // =========================================================================
  // Main popup handler (called on feature click)
  // =========================================================================
  function popupA(e) {
    var layer = e.target;
    var popContent = buildPopup(layer);

    popup.setContent(popContent.popHtml).setLatLng(e.latlng).addTo(map);
    document.getElementById('pop_mid').innerHTML = popContent.pop_mid1;
    document.getElementById('popup-shuxing').className = 'popup-open';
    document.getElementById('popup-xiangqing').className = 'popup-close';

    var radios = document.querySelectorAll('input[type=radio][name=方法]');
    for (var i = 0; i < radios.length; i++) {
      radios[i].onchange = function () {
        var popMid = document.getElementById('pop_mid');
        if (this.id === '属性') {
          popMid.innerHTML = popContent.pop_mid1;
          document.getElementById('popup-shuxing').className = 'popup-open';
          document.getElementById('popup-xiangqing').className = 'popup-close';
        } else {
          popMid.innerHTML = popContent.pop_mid2;
          document.getElementById('popup-shuxing').className = 'popup-close';
          document.getElementById('popup-xiangqing').className = 'popup-open';
          var printBtn = document.getElementById('pop_printcoord');
          if (printBtn) {
            printBtn.onclick = function () {
              console.log('坐标串：', popContent.coordoutput);
            };
          }
        }
      };
    }
  }

  // =========================================================================
  // Drawing tools
  // =========================================================================
  function getIconHtml(name, textheight, textcolor) {
    var w = textheight * name.length;
    return '<div class="stroke" style="width:' + w + 'px; font-size:' + textheight + 'px;">' + name + '</div>' +
      '<div class="stroke-front" style="width:' + w + 'px; font-size:' + textheight + 'px; color:' + textcolor + ';">' + name + '</div>';
  }

  function drawCircleMarker() {
    var siteData = WGIS.parseCoordText('textarea');
    var layername = document.getElementById('NewlayerName').value;
    var textheight = document.getElementById('textheight').value;

    var sites = L.featureGroup();
    for (var i = 1; i < siteData.length; i++) {
      var attribute = {};
      for (var j = 0; j < siteData[i].length; j++) {
        attribute[siteData[0][j]] = siteData[i][j];
      }
      var marker0 = L.circleMarker([siteData[i][2], siteData[i][1]], {
        featureType: 'CircleMarker',
        name: siteData[i][0],
        attribute: attribute,
        radius: textheight,
        color: '#FFFFFF',
        fillColor: '#F44334',
        weight: 1,
        fillOpacity: 1
      }).addTo(sites);
      marker0.on('click', function (e) { popupA(e); });
    }
    sites.addTo(map);
    sites.options.name = layername + '-点';
    sites.options.type = 'featureGroupOverlay';
    layerControl2.addOverlay(sites, layername + '-点');
    map.fitBounds(sites.getBounds());
  }

  function drawSite() {
    var siteData = WGIS.parseCoordText('textarea');
    var sitename = document.getElementById('NewlayerName').value;
    var icon = L.icon({
      iconUrl: 'contourmap/icon2/pin-m+7e7e7e@2x.png',
      iconSize: [30],
      iconAnchor: [15, 35],
      popupAnchor: [0, -50]
    });

    var sites = L.featureGroup();
    for (var i = 1; i < siteData.length; i++) {
      var attribute = {};
      for (var j = 0; j < siteData[i].length; j++) {
        attribute[siteData[0][j]] = siteData[i][j];
      }
      var marker0 = L.marker([siteData[i][2], siteData[i][1]], {
        icon: icon,
        name: siteData[i][0],
        attribute: attribute
      }).addTo(sites);
      marker0.on('click', function (e) { popupA(e); });
    }
    sites.addTo(map);
    sites.options.name = sitename + '-点';
    sites.options.type = 'featureGroupOverlay';
    layerControl2.addOverlay(sites, sitename + '-点');
    map.fitBounds(sites.getBounds());
  }

  function drawSiteText() {
    var siteData = WGIS.parseCoordText('textarea');
    var sitename = document.getElementById('NewlayerName').value;
    var textcolor = document.getElementById('textcolor').value;
    var textheight = document.getElementById('textheight').value;
    var sitesLabel = L.featureGroup();

    for (var i = 1; i < siteData.length; i++) {
      var name = siteData[i][0];
      var markerIcon = L.divIcon({
        html: getIconHtml(name, textheight, textcolor),
        name: name,
        textheight: textheight,
        textcolor: textcolor,
        className: 'icondiv',
        iconSize: [textheight * name.length, textheight],
        iconAnchor: [0, 0]
      });

      var markers = L.marker([siteData[i][2], siteData[i][1]], {
        icon: markerIcon,
        type: 'markerdivIcon',
        attribute: { name: siteData[i][0] }
      }).addTo(sitesLabel);

      markers.on('click', function (e) {
        var iconOptions = e.target.options.icon.options;
        var popupHtml = '<h3>名称: <input id="iconname" type="text" value="' + iconOptions.name + '" style="height:30px;" /></h3>' +
          '<h3>颜色: <input id="iconcolor" type="color" value="' + iconOptions.textcolor + '" style="width:170px;" /></h3>' +
          '<h3>字号: <input id="iconheight" type="text" value="' + iconOptions.textheight + '" style="height:20px;" /></h3>';
        popup.setContent(popupHtml).setLatLng(e.latlng).addTo(map);

        var nameInput = document.getElementById('iconname');
        var colorInput = document.getElementById('iconcolor');
        var heightInput = document.getElementById('iconheight');
        var handler = function () {
          iconOptions.name = nameInput.value;
          e.target.options.attribute.name = nameInput.value;
          iconOptions.textcolor = colorInput.value;
          iconOptions.textheight = heightInput.value;
          iconOptions.iconSize = [iconOptions.textheight * iconOptions.name.length, iconOptions.textheight];
          iconOptions.html = getIconHtml(iconOptions.name, iconOptions.textheight, iconOptions.textcolor);
          map.removeLayer(e.target);
          map.addLayer(e.target);
        };
        nameInput.onchange = handler;
        colorInput.onchange = handler;
        heightInput.onchange = handler;
      });
    }
    sitesLabel.addTo(map);
    layerControl2.addOverlay(sitesLabel, sitename + '-文字标注');
    sitesLabel.options.name = sitename + '-点';
    map.fitBounds(sitesLabel.getBounds());
  }

  function drawPolyline() {
    var siteData = WGIS.parseCoordText('textarea');
    var sitename = document.getElementById('NewlayerName').value;

    var latlngs = [];
    for (var i = 1; i < siteData.length; i++) {
      latlngs.push([siteData[i][2], siteData[i][1]]);
    }
    var polyline = L.polyline(latlngs, {
      color: '#FF1493',
      weight: 3,
      name: sitename,
      type: 'polyline'
    }).addTo(map);
    polyline.on('click', function (e) { popupA(e); });
    layerControl2.addOverlay(polyline, sitename + '-线');
    map.fitBounds(polyline.getBounds());
  }

  function drawPolygon() {
    var siteData = WGIS.parseCoordText('textarea');
    var sitename = document.getElementById('NewlayerName').value;
    var edgecolor = document.getElementById('edgecolor').value;

    var latlngs = [];
    for (var i = 1; i < siteData.length; i++) {
      latlngs.push([siteData[i][2], siteData[i][1]]);
    }
    var polygon = L.polygon(latlngs, {
      color: edgecolor,
      weight: 1,
      fillOpacity: 0.2,
      name: sitename,
      type: 'polygon'
    }).addTo(map);
    polygon.on('click', function (e) { popupA(e); });
    layerControl2.addOverlay(polygon, sitename + '-面');
    map.fitBounds(polygon.getBounds());
  }

  // =========================================================================
  // Init — wire map references after map is ready
  // =========================================================================
  function init() {
    map = WGIS.state.map;
    layerControl2 = WGIS.state.layerControl2;
    templayer = WGIS.state.templayer;

    // Geoman create hook → add popup handler
    map.on('pm:create', function (e) {
      e.layer.addTo(templayer);
      e.layer.on('click', function (ev) { popupA(ev); });
    });
  }

  // =========================================================================
  // Export to WGIS namespace
  // =========================================================================
  WGIS.popupA = popupA;
  WGIS.calc = calc;
  WGIS.getType = getType;
  WGIS.drawCircleMarker = drawCircleMarker;
  WGIS.drawSite = drawSite;
  WGIS.drawSiteText = drawSiteText;
  WGIS.drawPolyline = drawPolyline;
  WGIS.drawPolygon = drawPolygon;
  WGIS.getIconHtml = getIconHtml;
  WGIS.uiInit = init;
})();
