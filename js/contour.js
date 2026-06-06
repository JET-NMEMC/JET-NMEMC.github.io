/**
 * Contour helpers — site markers and convex hull visualization.
 * Core contour logic has moved to js/Leaflet.Contour.js (L.ContourLayer plugin).
 */
(function () {
  'use strict';

  var map = null;
  var layerControl2 = null;

  // =========================================================================
  // Graham scan convex hull (kept here for map polygon display)
  // =========================================================================
  function cross(o, a, b) {
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  }

  function convexHull(points) {
    var n = points.length;
    if (n < 3) { return points.slice(); }
    var i, k = 0, tmp;
    for (i = 1; i < n; i++) {
      if (points[i].y < points[k].y || (points[i].y === points[k].y && points[i].x < points[k].x)) { k = i; }
    }
    tmp = points[0]; points[0] = points[k]; points[k] = tmp;
    var p0 = points[0];
    points = [p0].concat(points.slice(1).sort(function (a, b) {
      var c = cross(p0, a, b);
      return c === 0 ? ((a.x - p0.x) * (a.x - p0.x) + (a.y - p0.y) * (a.y - p0.y)) -
        ((b.x - p0.x) * (b.x - p0.x) + (b.y - p0.y) * (b.y - p0.y)) : -c;
    }));
    var hull = [points[0], points[1]];
    for (i = 2; i < n; i++) {
      while (hull.length >= 2 && cross(hull[hull.length - 2], hull[hull.length - 1], points[i]) <= 0) {
        hull.pop();
      }
      hull.push(points[i]);
    }
    return hull;
  }

  // =========================================================================
  // Draw site markers + convex hull polygon on the map
  // =========================================================================
  function drawSitesAndHull(data) {
    var lngs = [], lats = [];
    for (var i = 0; i < data.length; i++) {
      lngs.push(data[i].lng);
      lats.push(data[i].lat);
    }

    var xrange = [WGIS.arrMin(lngs), WGIS.arrMax(lngs)];
    var yrange = [WGIS.arrMin(lats), WGIS.arrMax(lats)];

    // Site markers
    var sites = L.featureGroup();
    for (var i = 0; i < lats.length; i++) {
      var marker0 = L.circleMarker([lats[i], lngs[i]], {
        featureType: 'CircleMarker',
        name: data[i].site,
        radius: 8,
        color: '#FFFFFF',
        fillColor: '#F44334',
        weight: 1.5,
        fillOpacity: 1
      }).addTo(sites);
      marker0.on('click', function (e) { WGIS.popupA(e); });
    }
    sites.addTo(map);

    // Convex hull polygon
    var p = [];
    for (var i = 0; i < lngs.length; i++) {
      p[i] = { x: lngs[i], y: lats[i] };
    }
    var hull = convexHull(p);
    var latlngs = hull.map(function (item) { return [item.y, item.x]; });
    var polygon = L.polygon(latlngs, { color: 'red', weight: 2, fillOpacity: 0 });

    // Clip area for kriging
    var lnglats_clip = hull.map(function (item) { return [item.x, item.y]; });
    var area_clip = [lnglats_clip];

    return {
      xrange: xrange,
      yrange: yrange,
      area_clip: area_clip,
      sitesLayer: sites,
      clipLayer: polygon
    };
  }

  // =========================================================================
  // Init
  // =========================================================================
  function init() {
    map = WGIS.state.map;
    layerControl2 = WGIS.state.layerControl2;
  }

  WGIS.drawSitesAndHull = drawSitesAndHull;
  WGIS.contourInit = init;
})();
