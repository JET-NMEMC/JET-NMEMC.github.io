/**
 * App — main entry point.
 * Initializes all modules, sets up the contour control, KML/JSON import,
 * drawing tools, and export.
 */
(function () {
  'use strict';

  var state = WGIS.state;
  var map, layerControl2;

  // =========================================================================
  // Initialize once map is ready
  // =========================================================================
  function init() {
    map = state.map;
    layerControl2 = state.layerControl2;

    WGIS.contourInit();
    WGIS.uiInit();
    WGIS.exporterInit();

    // Drag support for drawing tools panel
    WGIS.dragFatherBySon('showtools', 'showtoolsTitle');

    // --- Contour control (plugin provides its own panel) ---
    L.control.contour({ position: 'topleft' }).addTo(map);

    // =====================================================================
    // KML import
    // =====================================================================
    var kmlInput = document.getElementById('kmlFileInput');
    if (kmlInput) {
      kmlInput.onchange = function () {
        var file = this.files[0];
        if (!file) { return; }
        var filename = file.name;
        var url = URL.createObjectURL(file);
        fetch(url)
          .then(function (res) { return res.text(); })
          .then(function (kmltext) {
            var kml = new DOMParser().parseFromString(kmltext, 'text/xml');
            var track = new L.KML(kml);
            map.addLayer(track);
            layerControl2.addOverlay(track, filename);
            map.fitBounds(track.getBounds());
          });
        WGIS.msg('导入KML: ' + filename);
      };
    }

    // =====================================================================
    // GeoJSON import
    // =====================================================================
    var jsonInput = document.getElementById('jsonFileInput');
    if (jsonInput) {
      jsonInput.onchange = function () {
        var file = this.files[0];
        if (!file) { return; }
        var filename = file.name;
        var url = URL.createObjectURL(file);
        fetch(url)
          .then(function (res) { return res.json(); })
          .then(function (data) {
            var geojsonLayer = L.geoJson(data).addTo(map);
            layerControl2.addOverlay(geojsonLayer, filename);
            map.fitBounds(geojsonLayer.getBounds());
          });
        WGIS.msg('导入GeoJSON: ' + filename);
      };
    }
  }

  // =========================================================================
  // Bootstrap
  // =========================================================================
  function bootstrap() {
    console.log('[WGIS] bootstrap, map=' + !!WGIS.state.map);
    if (WGIS.state.map) {
      try { init(); console.log('[WGIS] init OK'); }
      catch (e) { console.error('[WGIS] init error:', e.message, e.stack); }
    } else {
      var retries = 0;
      var checkReady = setInterval(function () {
        if (WGIS.state.map) {
          clearInterval(checkReady);
          try { init(); console.log('[WGIS] init OK (delayed)'); }
          catch (e) { console.error('[WGIS] init error (delayed):', e.message, e.stack); }
        }
        if (++retries > 50) { clearInterval(checkReady); console.error('[WGIS] Map timeout'); }
      }, 100);
    }
  }

  // =========================================================================
  // Global handlers (onclick in HTML)
  // =========================================================================
  window.exportShp = function (mapObj, fileType) { WGIS.exportFeatures(mapObj, fileType); };
  window.changemap = function () { console.log('[WGIS] changemap clicked'); };
  window.draw_CircleMarker = function () { WGIS.drawCircleMarker(); };
  window.draw_Site = function () { WGIS.drawSite(); };
  window.draw_Site_Text = function () { WGIS.drawSiteText(); };
  window.draw_Polyline_in_Map = function () { WGIS.drawPolyline(); };
  window.draw_Polygon_in_Map = function () { WGIS.drawPolygon(); };
  window.draw_Site_in_Canvas = function () { console.log('[WGIS] draw_Site_in_Canvas (not implemented)'); };
  window.showHide = function (id) { WGIS.showHide(id); };

  console.log('[WGIS] app.js loaded, showHide=' + typeof window.showHide);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
