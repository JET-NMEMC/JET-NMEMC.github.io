/**
 * Leaflet.Contour — Kriging contour plugin with built-in control panel.
 *
 * Usage:
 *   // Full control panel
 *   var ctrl = L.control.contour().addTo(map);
 *
 *   // Programmatic layer (no UI)
 *   var layer = L.contourLayer(data, { valueField: 'temp' }).addTo(map);
 *
 * Dependencies: Leaflet 1.x, WGIS.kriging (js/kriging.js)
 */
(function () {
  'use strict';

  var kriging = WGIS.kriging;
  var arrMin = WGIS.arrMin;
  var arrMax = WGIS.arrMax;

  // =========================================================================
  // Color schemes
  // =========================================================================
  var COLOR_SCHEMES = {
    bgyr: [
      { r: 0, g: 0, b: 255, weight: 0 },
      { r: 30, g: 30, b: 255, weight: 10 },
      { r: 0, g: 255, b: 0, weight: 40 },
      { r: 255, g: 255, b: 0, weight: 60 },
      { r: 255, g: 30, b: 0, weight: 90 },
      { r: 255, g: 0, b: 0, weight: 100 }
    ],
    rainbow: [
      { r: 120, g: 0, b: 255, weight: 0 },
      { r: 0, g: 175, b: 235, weight: 25 },
      { r: 135, g: 255, b: 175, weight: 50 },
      { r: 255, g: 180, b: 100, weight: 75 },
      { r: 255, g: 0, b: 0, weight: 100 }
    ],
    jet: [
      { r: 0, g: 0, b: 130, weight: 0 },
      { r: 0, g: 0, b: 255, weight: 10 },
      { r: 0, g: 215, b: 255, weight: 30 },
      { r: 35, g: 255, b: 210, weight: 40 },
      { r: 255, g: 255, b: 0, weight: 60 },
      { r: 255, g: 30, b: 0, weight: 80 },
      { r: 140, g: 0, b: 0, weight: 100 }
    ],
    cool: [
      { r: 0, g: 255, b: 255, weight: 0 },
      { r: 255, g: 0, b: 255, weight: 100 }
    ],
    div_greenred: [
      { r: 0, g: 120, b: 60, weight: 0 },
      { r: 255, g: 255, b: 180, weight: 50 },
      { r: 165, g: 0, b: 40, weight: 100 }
    ]
  };

  // =========================================================================
  // Internal utilities
  // =========================================================================
  function colorRGB2Hex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function getValueNumber(x) {
    for (var i = 0; i < 10; i++) {
      while (Math.abs(Number(x.toFixed(i)) - x) / x < 0.0001) { return i; }
    }
    return 0;
  }

  function autoBreak(min, max, targetN) {
    var a = [];
    var j = -8, i = 0;
    while (j < 9) {
      a[4 * i] = 1 * Math.pow(10, j);
      a[4 * i + 1] = 2 * Math.pow(10, j);
      a[4 * i + 2] = 3 * Math.pow(10, j);
      a[4 * i + 3] = 5 * Math.pow(10, j);
      i++; j++;
    }

    var delta = max - min;
    var length = delta / targetN;
    var DX;
    for (var kk = 0; kk < a.length; kk++) {
      if (length <= a[kk]) {
        DX = (Math.abs(delta / a[kk] - targetN) < Math.abs(delta / (a[kk - 1] || a[0]) - targetN)) ? a[kk] : (a[kk - 1] || a[0]);
        break;
      }
    }
    if (!DX) { DX = a[a.length - 1]; }

    var tttmax = Math.floor(max / DX);
    var tttmin = Math.floor(min / DX);
    var nnn = getValueNumber(DX);
    var levelMax = Number((tttmax * DX + DX).toFixed(nnn));
    var levelMin = Number((tttmin * DX).toFixed(nnn));
    var levelnum = Math.round((levelMax - levelMin) / DX);

    var breaks = [];
    for (var jj = 0; jj < levelnum + 1; jj++) {
      breaks.push(Number((levelMin + jj * DX).toFixed(nnn)));
    }
    return { levelMin: levelMin, levelMax: levelMax, step: DX, levelnum: levelnum, breaks: breaks };
  }

  function interp1(colorSet, contourSet) {
    var xi = contourSet.breaks;
    var x = [];
    for (var i = 0; i < colorSet.length; i++) {
      x.push(contourSet.levelMin + (contourSet.levelMax - contourSet.levelMin) * colorSet[i].weight / 100);
    }
    var newcolor = [];
    var channels = ['r', 'g', 'b'];
    for (var k = 0; k < channels.length; k++) {
      var y = colorSet.map(function (c) { return c[channels[k]]; });
      var yi = [];
      for (var i = 0; i < xi.length; i++) {
        for (var j = 0; j < x.length - 1; j++) {
          if (xi[i] >= x[j] && xi[i] <= x[j + 1]) {
            yi[i] = Number((y[j] + (y[j + 1] - y[j]) / (x[j + 1] - x[j]) * (xi[i] - x[j])).toFixed(0));
            break;
          }
        }
      }
      newcolor.push(yi);
    }
    return newcolor;
  }

  // Graham scan convex hull
  function cross(o, a, b) {
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  }

  function convexHull(points) {
    var n = points.length;
    if (n < 3) { return points.slice(); }
    var i, j, k = 0, tmp;
    // Find lowest-leftmost point
    for (i = 1; i < n; i++) {
      if (points[i].y < points[k].y || (points[i].y === points[k].y && points[i].x < points[k].x)) { k = i; }
    }
    tmp = points[0]; points[0] = points[k]; points[k] = tmp;
    // Sort by polar angle
    var p0 = points[0];
    points = [p0].concat(points.slice(1).sort(function (a, b) {
      var c = cross(p0, a, b);
      return c === 0 ? ((a.x - p0.x) * (a.x - p0.x) + (a.y - p0.y) * (a.y - p0.y)) -
        ((b.x - p0.x) * (b.x - p0.x) + (b.y - p0.y) * (b.y - p0.y)) : -c;
    }));
    // Build hull
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
  // CSS injection (injected once)
  // =========================================================================
  var cssInjected = false;
  function injectCSS() {
    if (cssInjected) { return; }
    cssInjected = true;
    var css =
      '.leaflet-contour-panel{pointer-events:auto;font:12px/1.5 "Helvetica Neue",Arial,sans-serif;background:#fff;' +
      'box-shadow:0 2px 8px rgba(0,0,0,.25);border-radius:4px;min-width:220px;}' +
      '.leaflet-contour-panel .lc-header{background:#2f9de2;color:#fff;padding:6px 10px;' +
      'border-radius:4px 4px 0 0;font-weight:bold;font-size:13px;display:flex;justify-content:space-between;align-items:center;}' +
      '.leaflet-contour-panel .lc-header .lc-close{border:none;background:none;color:#fff;font-size:16px;cursor:pointer;padding:0 4px;}' +
      '.leaflet-contour-panel .lc-body{padding:8px 10px;max-height:400px;overflow-y:auto;}' +
      '.leaflet-contour-panel .lc-section{margin-bottom:6px;}' +
      '.leaflet-contour-panel .lc-section label{display:block;font-weight:bold;margin-bottom:2px;color:#333;}' +
      '.leaflet-contour-panel .lc-section select,.leaflet-contour-panel .lc-section input[type=text]{' +
      'width:100%;padding:3px 4px;border:1px solid #ccc;border-radius:3px;font-size:12px;box-sizing:border-box;}' +
      '.leaflet-contour-panel .lc-section input[type=file]{position:absolute;width:1px;height:1px;opacity:0;overflow:hidden;}' +
      '.leaflet-contour-panel .lc-btn{display:block;width:100%;padding:6px;margin:4px 0;' +
      'background:#2f9de2;color:#fff;border:none;border-radius:3px;font-size:13px;cursor:pointer;text-align:center;}' +
      '.leaflet-contour-panel .lc-btn:hover{background:#2580bb;}' +
      '.leaflet-contour-panel .lc-btn-file{background:#888;}' +
      '.leaflet-contour-panel .lc-btn-file:hover{background:#666;}' +
      '.leaflet-contour-panel .lc-filename{display:block;font-size:11px;color:#888;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}' +
      '.leaflet-contour-panel .lc-legend{margin-top:6px;padding:4px 6px;background:#f5f5f5;border-radius:3px;font-size:11px;line-height:20px;}' +
      '.leaflet-contour-panel .lc-legend i{display:inline-block;width:16px;height:16px;margin-right:4px;vertical-align:middle;border-radius:2px;}' +
      '.leaflet-contour-panel .lc-legend-title{font-weight:bold;text-align:center;margin-bottom:2px;}' +
      '.leaflet-contour-panel .lc-status{padding:4px 0;font-size:11px;color:#666;text-align:center;}' +
      'a.leaflet-contour-button{background:#fff;width:30px;height:30px;display:block;text-align:center;' +
      'line-height:30px;font-size:18px;font-weight:bold;color:#333;border-radius:4px;box-shadow:0 1px 5px rgba(0,0,0,.4);cursor:pointer;}' +
      'a.leaflet-contour-button:hover{background:#f4f4f4;}';
    var style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  // =========================================================================
  // L.ContourLayer — the rendering layer (internal, managed by control)
  // =========================================================================
  L.ContourLayer = L.Layer.extend({
    options: {
      valueField: null,
      breaks: 10,
      colors: 'bgyr',
      model: 'exponential',
      sigma2: 0,
      alpha: 100,
      opacity: 0.8,
      resolution: 500,
      pixelMode: false,
      clipPolygon: null     // optional: [[lng,lat], ...] clip polygon; null = convex hull
    },

    initialize: function (data, options) {
      L.setOptions(this, options);
      this._data = data;
      this._overlay = null;
      this._xrange = null;
      this._yrange = null;
      this._breaks = null;
      this._colors = null;
    },

    _prepareData: function () {
      var valueField = this.options.valueField;
      var x = [], y = [], t = [];
      for (var i = 0; i < this._data.length; i++) {
        var d = this._data[i];
        if (d.lng != null && d.lat != null && d[valueField] != null) {
          x.push(d.lng);
          y.push(d.lat);
          t.push(d[valueField]);
        }
      }
      this._xrange = [arrMin(x), arrMax(x)];
      this._yrange = [arrMin(y), arrMax(y)];
      return { x: x, y: y, t: t };
    },

    _getClipPolygon: function () {
      if (this.options.clipPolygon) {
        return [this.options.clipPolygon];
      }
      // Compute convex hull of data points as clip area
      var points = [];
      for (var i = 0; i < this._data.length; i++) {
        var d = this._data[i];
        if (d.lng != null && d.lat != null) {
          points.push({ x: d.lng, y: d.lat });
        }
      }
      var hull = convexHull(points);
      return [hull.map(function (p) { return [p.x, p.y]; })];
    },

    render: function () {
      var prepared = this._prepareData();
      var t = prepared.t, x = prepared.x, y = prepared.y;
      if (t.length < 3) {
        console.warn('L.ContourLayer: need at least 3 data points, got ' + t.length);
        return this;
      }

      var opts = this.options;
      var gridArea = this._getClipPolygon();
      var variogram = kriging.train(t, x, y, opts.model, opts.sigma2, opts.alpha);
      var grid = kriging.grid(gridArea, variogram,
        (this._xrange[1] - this._xrange[0]) / opts.resolution,
        (this._yrange[1] - this._yrange[0]) / opts.resolution);

      var contourSet = autoBreak(grid.zlim[0], grid.zlim[1],
        Array.isArray(opts.breaks) ? opts.breaks.length : opts.breaks);

      if (Array.isArray(opts.breaks)) {
        contourSet.breaks = opts.breaks;
      }
      this._breaks = contourSet.breaks;

      // Resolve color scheme
      var colorSet;
      if (typeof opts.colors === 'string') {
        colorSet = COLOR_SCHEMES[opts.colors] || COLOR_SCHEMES.bgyr;
      } else {
        // Assume array of hex strings, convert to internal format
        colorSet = opts.colors.map(function (hex, i) {
          var r = parseInt(hex.slice(1, 3), 16);
          var g = parseInt(hex.slice(3, 5), 16);
          var b = parseInt(hex.slice(5, 7), 16);
          return { r: r, g: g, b: b, weight: (i / (opts.colors.length - 1)) * 100 };
        });
      }

      var interpColor = interp1(colorSet, contourSet);
      var colors = [];
      for (var i = 0; i < interpColor[0].length; i++) {
        colors.push(colorRGB2Hex(interpColor[0][i], interpColor[1][i], interpColor[2][i]));
      }
      colors.shift();
      this._colors = colors;

      // Render to off-screen canvas
      var canvas = document.createElement('canvas');
      canvas.width = 1000;
      canvas.height = 1000;

      if (opts.pixelMode) {
        kriging.pixel_Grid_drawImage(gridArea, canvas, variogram, this._xrange, this._yrange, colors, this._breaks);
      } else {
        kriging.plot(canvas, grid, [this._xrange[0], this._xrange[1]], [this._yrange[0], this._yrange[1]], colors, this._breaks);
      }

      var imgUrl = canvas.toDataURL('image/png');
      var imageBounds = [[this._yrange[0], this._xrange[0]], [this._yrange[1], this._xrange[1]]];

      // Clean up previous overlay
      if (this._overlay && this._map) {
        this._map.removeLayer(this._overlay);
      }

      this._overlay = L.imageOverlay(imgUrl, imageBounds, { opacity: opts.opacity });
      if (this._map) {
        this._overlay.addTo(this._map);
      }

      this.fire('render', { breaks: this._breaks, colors: this._colors });
      return this;
    },

    onAdd: function (map) {
      this._map = map;
      if (this._overlay) { this._overlay.addTo(map); }
      if (!this._overlay && this._data) { this.render(); }
    },

    onRemove: function (map) {
      if (this._overlay) { map.removeLayer(this._overlay); }
      this._map = null;
    },

    // Public API
    getExtent: function () {
      if (!this._xrange) { this._prepareData(); }
      return {
        xrange: this._xrange,
        yrange: this._yrange,
        bounds: this._xrange && this._yrange ? [[this._yrange[0], this._xrange[0]], [this._yrange[1], this._xrange[1]]] : null
      };
    },

    getLegend: function () {
      return { breaks: this._breaks, colors: this._colors };
    },

    setData: function (data) {
      this._data = data;
      this._xrange = null;
      this._yrange = null;
      return this;
    },

    setOptions: function (opts) {
      L.setOptions(this, opts);
      return this;
    }
  });

  L.contourLayer = function (data, options) {
    return new L.ContourLayer(data, options);
  };

  // =========================================================================
  // L.Control.Contour — full control panel
  // =========================================================================
  L.Control.Contour = L.Control.extend({
    options: {
      position: 'topleft',
      title: '等值线图',
      breaks: 8,
      opacity: 0.8,
      colors: 'bgyr',
      pixelMode: false
    },

    initialize: function (options) {
      L.setOptions(this, options);
      this._layer = null;
      this._data = null;
      this._columns = [];
      injectCSS();
    },

    onAdd: function (map) {
      this._map = map;
      injectCSS();

      // Control button
      var btn = L.DomUtil.create('a', 'leaflet-contour-button');
      btn.href = '#';
      btn.title = this.options.title;
      btn.innerHTML = '&#x25D0;'; // ◐ circle with half fill
      L.DomEvent.on(btn, 'click', this._togglePanel, this);
      this._btn = btn;

      // Panel
      this._panel = this._buildPanel();
      this._panelCollapsed = true;
      L.DomEvent.disableClickPropagation(this._panel);

      return btn;
    },

    _buildPanel: function () {
      var self = this;
      var p = L.DomUtil.create('div', 'leaflet-contour-panel');
      p.style.display = 'none';

      // Header
      var hdr = L.DomUtil.create('div', 'lc-header', p);
      hdr.appendChild(document.createTextNode(this.options.title));
      var close = L.DomUtil.create('button', 'lc-close', hdr);
      close.innerHTML = '&times;';
      L.DomEvent.on(close, 'click', function (e) { L.DomEvent.stopPropagation(e); self._hidePanel(); });

      // Body
      var body = L.DomUtil.create('div', 'lc-body', p);

      // --- Data section ---
      var sec1 = L.DomUtil.create('div', 'lc-section', body);
      L.DomUtil.create('label', '', sec1).textContent = '散点数据 (.csv)';
      var fileInput = L.DomUtil.create('input', '', sec1);
      fileInput.type = 'file';
      fileInput.accept = '.csv';
      L.DomEvent.on(fileInput, 'change', function (e) { self._onFileLoad(e); });
      var fileBtn = L.DomUtil.create('button', 'lc-btn lc-btn-file', sec1);
      fileBtn.textContent = '选择 CSV 文件';
      L.DomEvent.on(fileBtn, 'click', function () { fileInput.click(); });
      this._fileNameEl = L.DomUtil.create('span', 'lc-filename', sec1);

      // --- Column selector ---
      var sec2 = L.DomUtil.create('div', 'lc-section', body);
      L.DomUtil.create('label', '', sec2).textContent = '数据字段';
      this._columnSelect = L.DomUtil.create('select', '', sec2);
      this._columnSelect.disabled = true;
      var emptyOpt = L.DomUtil.create('option', '', this._columnSelect);
      emptyOpt.value = '';
      emptyOpt.textContent = '— 请先加载数据 —';

      // --- Break count ---
      var sec3 = L.DomUtil.create('div', 'lc-section', body);
      L.DomUtil.create('label', '', sec3).textContent = '等值带数';
      this._breaksInput = L.DomUtil.create('input', '', sec3);
      this._breaksInput.type = 'text';
      this._breaksInput.value = this.options.breaks;

      // --- Opacity ---
      var sec4 = L.DomUtil.create('div', 'lc-section', body);
      L.DomUtil.create('label', '', sec4).textContent = '透明度 (0–1)';
      this._opacityInput = L.DomUtil.create('input', '', sec4);
      this._opacityInput.type = 'text';
      this._opacityInput.value = this.options.opacity;

      // --- Color scheme ---
      var sec5 = L.DomUtil.create('div', 'lc-section', body);
      L.DomUtil.create('label', '', sec5).textContent = '配色方案';
      this._colorSelect = L.DomUtil.create('select', '', sec5);
      var schemeNames = Object.keys(COLOR_SCHEMES);
      for (var i = 0; i < schemeNames.length; i++) {
        var opt = L.DomUtil.create('option', '', this._colorSelect);
        opt.value = schemeNames[i];
        opt.textContent = schemeNames[i];
        if (schemeNames[i] === this.options.colors) { opt.selected = true; }
      }

      // --- Draw mode ---
      var sec6 = L.DomUtil.create('div', 'lc-section', body);
      L.DomUtil.create('label', '', sec6).textContent = '绘图模式';
      this._modeSelect = L.DomUtil.create('select', '', sec6);
      var modeGrid = L.DomUtil.create('option', '', this._modeSelect);
      modeGrid.value = 'grid';
      modeGrid.textContent = '网格插值（快）';
      var modePixel = L.DomUtil.create('option', '', this._modeSelect);
      modePixel.value = 'pixel';
      modePixel.textContent = '像素插值（慢/精细）';
      if (this.options.pixelMode) { modePixel.selected = true; }

      // --- Render button ---
      this._renderBtn = L.DomUtil.create('button', 'lc-btn', body);
      this._renderBtn.textContent = '生成等值线';
      this._renderBtn.disabled = true;
      L.DomEvent.on(this._renderBtn, 'click', function () { self._doRender(); });

      // --- Status ---
      this._statusEl = L.DomUtil.create('div', 'lc-status', body);

      // --- Legend ---
      this._legendEl = L.DomUtil.create('div', 'lc-legend', body);
      this._legendEl.style.display = 'none';

      return p;
    },

    _togglePanel: function (e) {
      L.DomEvent.stopPropagation(e);
      if (this._panelCollapsed) { this._showPanel(); } else { this._hidePanel(); }
    },

    _showPanel: function () {
      if (!this._panel.parentNode) {
        // Insert after the control button in the DOM
        this._btn.parentNode.insertBefore(this._panel, this._btn.nextSibling);
      }
      this._panel.style.display = 'block';
      this._panelCollapsed = false;
    },

    _hidePanel: function () {
      this._panel.style.display = 'none';
      this._panelCollapsed = true;
    },

    _onFileLoad: function (e) {
      var self = this;
      var file = e.target.files[0];
      if (!file) { return; }
      this._fileNameEl.textContent = file.name;

      WGIS.readFileAsText(file, function (ev) {
        var parsed = WGIS.tableStringToArr(ev.target.result);
        self._data = parsed.objArr;
        self._columns = parsed.lieName;
        self._populateColumns(parsed.lieName);
        self._renderBtn.disabled = false;
        self._statusEl.textContent = '已加载 ' + self._data.length + ' 条数据，' +
          (parsed.lieName.length - 3) + ' 个数值字段';
      });
    },

    _populateColumns: function (columns) {
      var sel = this._columnSelect;
      sel.innerHTML = '';
      // Skip columns 0 (site), 1 (lng), 2 (lat) — they coordinate fields
      for (var i = 0; i < columns.length; i++) {
        if (columns[i] === 'site' || columns[i] === 'lng' || columns[i] === 'lat') { continue; }
        var opt = L.DomUtil.create('option', '', sel);
        opt.value = columns[i];
        opt.textContent = columns[i];
      }
      sel.disabled = false;
      if (sel.options.length === 0) {
        sel.disabled = true;
        var noOpt = L.DomUtil.create('option', '', sel);
        noOpt.value = '';
        noOpt.textContent = '无可用字段';
      }
    },

    _doRender: function () {
      var self = this;
      var valueField = this._columnSelect.value;
      if (!valueField || !this._data) {
        this._statusEl.textContent = '请先加载数据并选择字段';
        return;
      }

      var beginTime = +new Date();
      this._statusEl.textContent = '正在生成...';

      // Remove previous layer
      if (this._layer && this._map) {
        this._map.removeLayer(this._layer);
      }

      // Create and render
      this._layer = new L.ContourLayer(this._data, {
        valueField: valueField,
        breaks: parseInt(this._breaksInput.value, 10) || 8,
        opacity: parseFloat(this._opacityInput.value) || 0.8,
        colors: this._colorSelect.value,
        pixelMode: this._modeSelect.value === 'pixel'
      }).addTo(this._map);

      var self2 = this;
      this._layer.on('render', function () { self2._showLegend(); });

      this._layer.render();

      var endTime = +new Date();
      this._statusEl.textContent = '渲染完成，用时 ' + ((endTime - beginTime) / 1000).toFixed(1) + ' s';

      // Fit map to contour extent
      var extent = this._layer.getExtent();
      if (extent.bounds) {
        this._map.fitBounds(extent.bounds);
      }
    },

    _showLegend: function () {
      var legend = this._layer.getLegend();
      if (!legend || !legend.breaks) { return; }

      var grades = legend.breaks;
      var colors = legend.colors;
      var html = '<div class="lc-legend-title">图例</div>';
      for (var i = 0; i < colors.length; i++) {
        var from = grades[i] != null ? Number(grades[i]).toFixed(2) : '';
        var to = grades[i + 1] != null ? ' – ' + Number(grades[i + 1]).toFixed(2) : '';
        html += '<i style="background:' + colors[i] + '"></i> ' + from + to + '<br>';
      }
      this._legendEl.innerHTML = html;
      this._legendEl.style.display = 'block';
    },

    onRemove: function (map) {
      if (this._layer) { map.removeLayer(this._layer); }
      if (this._panel && this._panel.parentNode) {
        this._panel.parentNode.removeChild(this._panel);
      }
    },

    // Public API
    getLayer: function () {
      return this._layer;
    },

    loadData: function (data, columns) {
      this._data = data;
      this._columns = columns || Object.keys(data[0] || {});
      this._populateColumns(this._columns);
      this._renderBtn.disabled = false;
      this._fileNameEl.textContent = '(通过 API 加载)';
      this._statusEl.textContent = '已加载 ' + data.length + ' 条数据';
      return this;
    }
  });

  L.control.contour = function (options) {
    return new L.Control.Contour(options);
  };

})();
