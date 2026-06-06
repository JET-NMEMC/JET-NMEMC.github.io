(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['leaflet'], factory);
    } else if (typeof module !== 'undefined') {
        // CommonJS
        module.exports = factory(require('leaflet'));
    } else {
        // Browser globals
        if (typeof window.L === 'undefined') {
            throw new Error('Leaflet must be loaded first');
        }
        factory(window.L);
    }
}(function (L) {

    L.Control.CartoGraticule = L.Control.extend({
        options: {
            position: 'topleft',
            // Default mapping mode margins/size
            mapStyle: {
                top: '40px',
                bottom: '40px',
                left: '50px', // Equal margins for centering
                right: '50px',
                // width: 'auto',
                // height: 'auto'
            },
            // Options for coordinate drawing
            fontSize: 14, // Font size
            tickDirection: 'out', // 'in' or 'out'
            showZoomControl: true, // Show or hide zoom control in mapping mode
            targetN: {
                lng: 3, // Density factor for longitude
                lat: 2  // Density factor for latitude
            }
        },

        onAdd: function (map) {
            this._map = map;
            this._container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
            
            this._button = L.DomUtil.create('a', 'leaflet-control-carto-graticule-toggle', this._container);
            this._button.href = '#';
            this._button.title = '切换制图模式';
            this._button.role = 'button';

            L.DomEvent.on(this._button, 'click', this._toggleMode, this);
            L.DomEvent.disableClickPropagation(this._button);

            // Container for graticule (attached to map parent to be outside map)
            this._graticuleContainer = L.DomUtil.create('div', 'leaflet-carto-graticule-container');
            this._graticuleContainer.style.display = 'none';
            // We append it to the map's parent node so it sits behind/around the map
            this._map.getContainer().parentNode.appendChild(this._graticuleContainer);

            return this._container;
        },

        onRemove: function (map) {
            this._disableMode();
            L.DomEvent.off(this._button, 'click', this._toggleMode, this);
            if (this._graticuleContainer && this._graticuleContainer.parentNode) {
                this._graticuleContainer.parentNode.removeChild(this._graticuleContainer);
            }
        },

        _toggleMode: function (e) {
            if (e) L.DomEvent.stop(e);

            if (this._enabled) {
                this._disableMode();
            } else {
                this._enableMode();
            }
        },

        _enableMode: function () {
            this._enabled = true;
            this._button.style.backgroundColor = '#ccc';
            
            // Save original styles
            var mapContainer = this._map.getContainer();
            this._originalStyle = {
                left: mapContainer.style.left,
                top: mapContainer.style.top,
                width: mapContainer.style.width,
                height: mapContainer.style.height,
                position: mapContainer.style.position,
                border: mapContainer.style.border
            };

            // Apply mapping mode styles
            mapContainer.style.position = 'absolute';
            mapContainer.style.left = this.options.mapStyle.left;
            mapContainer.style.top = this.options.mapStyle.top;
            mapContainer.style.right = this.options.mapStyle.right;
            mapContainer.style.bottom = this.options.mapStyle.bottom;
            mapContainer.style.width = 'auto'; 
            mapContainer.style.height = 'auto'; 
            mapContainer.style.border = '1px solid #000';

            // Show graticule container
            this._graticuleContainer.style.display = 'block';

            // Refresh map
            this._map.invalidateSize();

            // Handle Zoom Control
            if (!this.options.showZoomControl && this._map.zoomControl) {
                this._mapZoomControl = this._map.zoomControl;
                this._map.removeControl(this._map.zoomControl);
            }

            // Register events with debounce
            this._debouncedDraw = L.Util.throttle(this._drawCoordinates, 100, this);
            this._map.on('move', this._debouncedDraw, this);
            this._map.on('zoom', this._debouncedDraw, this);
            this._map.on('resize', this._debouncedDraw, this);

            // Initial draw
            this._drawCoordinates();
        },

        _disableMode: function () {
            if (!this._enabled) return;
            this._enabled = false;
            this._button.style.backgroundColor = '#fff';

            // Restore original styles
            var mapContainer = this._map.getContainer();
            if (this._originalStyle) {
                mapContainer.style.left = this._originalStyle.left;
                mapContainer.style.top = this._originalStyle.top;
                mapContainer.style.width = this._originalStyle.width;
                mapContainer.style.height = this._originalStyle.height;
                mapContainer.style.position = this._originalStyle.position;
                mapContainer.style.border = this._originalStyle.border;
                
                // Reset right/bottom if they were set
                mapContainer.style.right = '';
                mapContainer.style.bottom = '';
            }

            // Hide graticule container
            this._graticuleContainer.style.display = 'none';
            this._graticuleContainer.innerHTML = '';

            // Refresh map
            this._map.invalidateSize();

            // Restore Zoom Control
            if (this._mapZoomControl) {
                this._map.addControl(this._mapZoomControl);
                
                // Try to restore order: Zoom Control should be above this control if they are in the same corner
                var zoomContainer = this._mapZoomControl.getContainer();
                var myContainer = this._container;
                if (zoomContainer && myContainer && zoomContainer.parentNode === myContainer.parentNode) {
                    // Move Zoom Control before this control
                    zoomContainer.parentNode.insertBefore(zoomContainer, myContainer);
                }

                this._mapZoomControl = null;
            }

            // Unregister events
            if (this._debouncedDraw) {
                this._map.off('move', this._debouncedDraw, this);
                this._map.off('zoom', this._debouncedDraw, this);
                this._map.off('resize', this._debouncedDraw, this);
            }
        },

        _drawCoordinates: function () {
            if (!this._enabled) return;

            var graticuleContainer = this._graticuleContainer;
            graticuleContainer.innerHTML = ""; // Clear
            
            var map = this._map;
            var bounds = map.getBounds();
            var lngmin = bounds.getWest();
            var lngmax = bounds.getEast();
            var latmin = bounds.getSouth();
            var latmax = bounds.getNorth();

            // Calculate breaks
            var lngInfo = this._getCoordBreaks(lngmin, lngmax, this.options.targetN.lng, "lng");
            var latInfo = this._getCoordBreaks(latmin, latmax, this.options.targetN.lat, "lat");

            var lngbreak = lngInfo.breaks;
            var lngstep = lngInfo.step;
            var latbreak = latInfo.breaks;
            var latstep = latInfo.step;

            // Get map container dimensions/position
            var mapRect = map.getContainer().getBoundingClientRect();
            
            var divtop = mapRect.top;
            var divbottom = mapRect.bottom;
            var divleft = mapRect.left;
            var divright = mapRect.right;

            var fontSize = this.options.fontSize;
            var tickDir = this.options.tickDirection;
            var tickLen = 5;

            // --- Longitude Labels (Top/Bottom) ---
            for (var i = 0; i < lngbreak.length; i++) {
                var val = parseFloat(lngbreak[i]);
                
                // Calculate pixel position X
                var point = map.latLngToContainerPoint(L.latLng(latmax, val));
                var Xpix = mapRect.left + point.x; 
                
                // Format text
                var text = this._formatCoord(val, lngstep, 'lng');

                // Top Label
                var topLabelY = divtop - fontSize - 8; 
                
                this._createLabel(
                    Xpix, 
                    topLabelY, 
                    text, 
                    fontSize, 
                    'top'
                );
                // Top Tick
                var topTickY = (tickDir === 'in') ? divtop : (divtop - tickLen);
                this._createTick(Xpix, topTickY, 'top');

                // Bottom Label
                var bottomLabelY = divbottom + 8;
                this._createLabel(
                    Xpix, 
                    bottomLabelY, 
                    text, 
                    fontSize, 
                    'bottom'
                );
                // Bottom Tick
                var bottomTickY = (tickDir === 'in') ? (divbottom - tickLen) : divbottom;
                this._createTick(Xpix, bottomTickY, 'bottom');
            }

            // --- Latitude Labels (Left/Right) ---
            for (var i = 0; i < latbreak.length; i++) {
                var val = parseFloat(latbreak[i]);
                
                // Calculate pixel position Y
                var point = map.latLngToContainerPoint(L.latLng(val, lngmin));
                var Ypix = mapRect.top + point.y;

                // Format text
                var text = this._formatCoord(val, latstep, 'lat');

                // Left Label
                var leftLabelX = divleft - 8;

                this._createLabel(
                    leftLabelX, 
                    Ypix, 
                    text, 
                    fontSize, 
                    'left'
                );
                // Left Tick
                var leftTickX = (tickDir === 'in') ? divleft : (divleft - tickLen);
                this._createTick(leftTickX, Ypix, 'left');

                // Right Label
                var rightLabelX = divright + 8;
                this._createLabel(
                    rightLabelX, 
                    Ypix, 
                    text, 
                    fontSize, 
                    'right'
                );
                    // Right Tick
                    var rightTickX = (tickDir === 'in') ? (divright - tickLen) : divright;
                    this._createTick(rightTickX, Ypix, 'right');
            }
        },

        _createLabel: function(x, y, text, size, pos) {
            var div = L.DomUtil.create('div', 'leaflet-carto-graticule-label', this._graticuleContainer);
            div.innerHTML = text;
            div.style.fontSize = size + 'px';
            div.style.position = 'absolute';
            div.style.fontFamily = 'sans-serif';
            div.style.lineHeight = '1';
            
            if (pos === 'left' || pos === 'right') {
                // Vertical labels (Latitude)
                div.style.whiteSpace = 'nowrap';
                div.style.transform = 'translate(-50%, -50%) rotate(270deg)';
                div.style.left = x + 'px';
                div.style.top = y + 'px';
                
                if (pos === 'left') {
                    div.style.left = (x - size/2) + 'px';
                } else {
                    div.style.left = (x + size/2) + 'px';
                }

            } else {
                // Horizontal labels (Longitude)
                div.style.transform = 'translate(-50%, 0)';
                div.style.left = x + 'px';
                
                if (pos === 'top') {
                    div.style.top = y + 'px';
                } else {
                    div.style.top = y + 'px';
                }
            }
        },

        _createTick: function(x, y, pos) {
            var div = L.DomUtil.create('div', 'leaflet-carto-graticule-tick', this._graticuleContainer);
            div.style.position = 'absolute';
            div.style.backgroundColor = '#000';
            
            if (pos === 'top' || pos === 'bottom') {
                div.style.width = '1px';
                div.style.height = '5px';
                div.style.left = x + 'px';
                div.style.top = y + 'px';
            } else {
                div.style.width = '5px';
                div.style.height = '1px';
                div.style.left = x + 'px';
                div.style.top = y + 'px';
            }
        },

        _formatCoord: function(val, step, type) {
            var absVal = Math.abs(val);
            var suffix = '';
            if (type === 'lng') {
                suffix = val > 0 ? ' E' : (val < 0 ? ' W' : '');
            } else {
                suffix = val > 0 ? ' N' : (val < 0 ? ' S' : '');
            }

            if (step >= 1) {
                return absVal + '°' + suffix;
            } else if (step >= 0.016666667) {
                return this._du2dufen(val, 0) + suffix;
            } else if (step >= 0.00027778) {
                return this._du2dufenmiao(val, 0) + suffix;
            } else {
                 // For very small steps, show decimals in seconds
                 var decimalPlaces = Math.max(0, Math.ceil(-Math.log10(step * 3600)));
                 return this._du2dufenmiao(val, decimalPlaces) + suffix;
            }
        },

        _getCoordBreaks: function (Tvaluemin, Tvaluemax, TargetN, latlngsy) {
            if (Tvaluemin > Tvaluemax) return { breaks: [], step: 1 };
            
            var TDelta = Tvaluemax - Tvaluemin;
            // Calculate rough step
            var roughStep = TDelta / TargetN;

            // Define step candidates
            var niceSteps = [
                // Degrees
                60, 30, 20, 10, 5, 2, 1, 
                // Minutes
                0.5, // 30'
                0.333333333, // 20'
                0.166666667, // 10'
                0.083333333, // 5'
                0.033333333, // 2'
                0.016666667, // 1'
                // Seconds
                0.008333333, // 30"
                0.005555556, // 20"
                0.002777778, // 10"
                0.001388889, // 5"
                0.000555556, // 2"
                0.000277778  // 1"
            ];

            var DX = niceSteps[niceSteps.length - 1]; // Default to smallest predefined step

            // Use predefined steps
            for (var kk = 0; kk < niceSteps.length; kk++) {
                if (roughStep >= niceSteps[kk]) {
                    DX = niceSteps[kk];
                    break;
                }
            }

            var nnn = this._getvaluenumber(DX);
            var tttmax = Math.floor(Tvaluemax / DX);
            var tttmin = Math.floor(Tvaluemin / DX);
            
            var levelMax = Number((tttmax * DX).toFixed(nnn));
            var levelMin = Number(((tttmin * DX) + DX).toFixed(nnn));
            
            var levelnum = Math.round((levelMax - levelMin) / DX) + 1;
            
            var breaks = [];
            for (var jj = 0; jj < levelnum; jj++) {
                var val = Number((levelMin + jj * DX).toFixed(nnn));
                if (val >= Tvaluemin && val <= Tvaluemax) {
                    breaks.push(val.toFixed(nnn));
                }
            }

            return {
                breaks: breaks,
                step: DX
            };
        },

        _getvaluenumber: function (x) {
            // Improve precision check to handle very small numbers
            if (x === 0) return 0;
            var s = x.toString();
            // Scientific notation check
            if (s.indexOf('e') !== -1) {
                var parts = s.split('e');
                return Math.abs(parseInt(parts[1])) + (parts[0].split('.')[1] || '').length;
            }
            var parts = s.split('.');
            return parts.length > 1 ? parts[1].length : 0;
        },

        _du2dufenmiao: function (value, n) {
            var value2 = Math.abs(value);
            var v1 = Math.floor(value2);
            var v2 = Math.floor((value2 - v1) * 60);
            var seconds = (value2 - v1) * 3600 % 60;
            // Round seconds to n decimal places
            var v3 = seconds.toFixed(n);
            
            // Handle carry over
            if (parseFloat(v3) >= 60) { 
                v3 = (0).toFixed(n); 
                v2 = v2 + 1; 
            }
            if (v2 >= 60) { 
                v2 = 0; 
                v1 = v1 + 1; 
            }
            
            var v31 = parseFloat(v3) < 10 ? "0" + v3 : v3;
            var v21 = v2 < 10 ? "0" + String(v2) : v2;
            return v1 + '°' + v21 + '\′' + v31 + '″';
        },

        _du2dufen: function (value, n) {
            var value2 = Math.abs(value);
            var v1 = Math.floor(value2);
            var v2 = ((value2 - v1) * 60).toFixed(n);
            if (parseFloat(v2) >= 60) { v2 = (0).toFixed(n); v1 = v1 + 1; }
            var v21 = parseFloat(v2) < 10 ? "0" + v2 : v2;
            return v1 + '°' + v21 + '\′';
        }
    });

    L.control.cartoGraticule = function (options) {
        return new L.Control.CartoGraticule(options);
    };

}));
