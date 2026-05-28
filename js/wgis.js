/**
 * WGIS — WebGIS namespace, configuration, and utility functions.
 * All modules attach to this single global namespace.
 */
var WGIS = (function () {
  'use strict';

  var self = {};

  // =========================================================================
  // Configuration (API keys)
  // =========================================================================
  self.config = {
    mapboxToken: 'pk.eyJ1IjoiamV0emhhbmc2NjYiLCJhIjoiY2wybHR4aG1oMGF3dzNqbzMzNHB0MnFlaSJ9.XX7c6An8IZPI0muNhrTf9w',
    tiandituToken: '0a5d3fb2ad894a60ff2d3abccc7a7c51',
    jawgToken: 'DGEPTrYpfvrfrjgNGAF1tziKZBqDBXP1ukNpvd7PEQ8tf6cvdMBI4Md4JetBfC7B'
  };

  // =========================================================================
  // Shared application state
  // =========================================================================
  self.state = {
    map: null,
    layerControl: null,
    layerControl2: null,
    templayer: null,
    data: null,
    xrange: null,
    yrange: null,
    gridArea: null,
    clipAreaCoords: undefined,
    figurectrol: {},
    finishlist: [],
    legend: null,
    countourmap: null
  };

  // =========================================================================
  // Array utility functions (replaces Array.prototype modifications)
  // =========================================================================
  function arrMin(arr) {
    return Math.min.apply(null, arr);
  }
  function arrMax(arr) {
    return Math.max.apply(null, arr);
  }
  function arrMean(arr) {
    var i, sum = 0;
    for (i = 0; i < arr.length; i++) { sum += arr[i]; }
    return sum / arr.length;
  }
  function repeat(val, n) {
    var arr = new Array(n);
    for (var i = 0; i < n; i++) { arr[i] = val; }
    return arr;
  }

  // Point-in-polygon test (ray casting algorithm)
  function pip(polygon, x, y) {
    var i, j, c = false;
    for (i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      if (((polygon[i][1] > y) !== (polygon[j][1] > y)) &&
        (x < (polygon[j][0] - polygon[i][0]) * (y - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0])) {
        c = !c;
      }
    }
    return c;
  }

  self.arrMin = arrMin;
  self.arrMax = arrMax;
  self.arrMean = arrMean;
  self.repeat = repeat;
  self.pip = pip;

  // =========================================================================
  // DOM / UI utilities
  // =========================================================================
  function showHide(id) {
    var el = document.getElementById(id);
    if (el) {
      el.style.display = (el.style.display === 'none') ? 'block' : 'none';
    }
  }
  self.showHide = showHide;

  function msg(text) {
    var div = document.getElementById('ShowDiv');
    if (!div) { return; }
    div.style.display = 'block';
    div.textContent = text;
    setTimeout(function () {
      div.style.display = 'none';
    }, 3000);
  }
  self.msg = msg;

  function createAndDownloadFile(fileName, content) {
    var a = document.createElement('a');
    var blob = new Blob([content]);
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.click();
    URL.revokeObjectURL(blob);
  }
  self.createAndDownloadFile = createAndDownloadFile;

  // Drag a parent element by its title-bar child
  function dragFatherBySon(fatherId, sonId) {
    var father = document.getElementById(fatherId);
    var son = document.getElementById(sonId);
    if (!father || !son) { return; }
    son.onmousedown = function (e) {
      var evt = e || window.event;
      var offsetX = evt.clientX - father.offsetLeft;
      var offsetY = evt.clientY - father.offsetTop;
      son.style.cursor = 'move';
      document.onmousemove = function (e) {
        var evt = e || window.event;
        father.style.left = (evt.clientX - offsetX) + 'px';
        father.style.top = (evt.clientY - offsetY) + 'px';
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
      };
    };
    son.onmouseup = function () {
      document.onmousemove = null;
      son.style.cursor = 'default';
    };
  }
  self.dragFatherBySon = dragFatherBySon;

  // =========================================================================
  // Data parsing utilities
  // =========================================================================

  // Parse textarea coordinate data into a 2D array
  function parseCoordText(textareaId) {
    var text = document.getElementById(textareaId).value;
    text = text.trim();
    var lines = text.split(/[\n]/);
    var result = [];
    for (var i = 0; i < lines.length; i++) {
      result[i] = lines[i].split(/,|，|\s+/);
    }
    return result;
  }
  self.parseCoordText = parseCoordText;

  // Parse CSV/TSV table string into structured data
  function tableStringToArr(text) {
    text = text.trim();
    var lines = text.split(/[\n]/);
    var raw = [];
    for (var i = 0; i < lines.length; i++) {
      raw[i] = lines[i].trim().split(/,|，|\s+/);
    }
    var objArr = [];
    var totalCells = 0;
    for (var i = 1; i < raw.length; i++) {
      var obj = {};
      for (var j = 0; j < raw[0].length; j++) {
        var val = Number(raw[i][j]);
        obj[raw[0][j]] = isNaN(val) ? raw[i][j] : val;
      }
      objArr.push(obj);
      totalCells += raw[i].length;
    }
    if (totalCells !== (raw.length - 1) * raw[0].length) {
      alert('监测到非法字符，可能是空格或者逗号，请检查数据后再试');
    }
    var colNames = [];
    for (var key in objArr[0]) { colNames.push(key); }
    return { tableArr: raw, objArr: objArr, lieName: colNames };
  }
  self.tableStringToArr = tableStringToArr;

  function readFileAsText(file, callback) {
    var reader = new FileReader();
    reader.onload = callback;
    reader.readAsText(file, 'utf-8');
  }
  self.readFileAsText = readFileAsText;

  return self;
})();
