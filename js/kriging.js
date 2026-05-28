/**
 * Kriging interpolation engine.
 * Based on oeo4b/kriging.js — cleaned: no native prototype modifications.
 * All array helpers accessed via WGIS (pip, repeat, arrMin, arrMax).
 */
(function () {
  'use strict';

  var pip = WGIS.pip;
  var repeat = WGIS.repeat;
  var arrMin = WGIS.arrMin;
  var arrMax = WGIS.arrMax;

  // =========================================================================
  // Matrix algebra
  // =========================================================================
  function matrixDiag(c, n) {
    var i, Z = repeat(0, n * n);
    for (i = 0; i < n; i++) { Z[i * n + i] = c; }
    return Z;
  }
  function matrixTranspose(X, n, m) {
    var i, j, Z = new Array(m * n);
    for (i = 0; i < n; i++)
      for (j = 0; j < m; j++)
        Z[j * n + i] = X[i * m + j];
    return Z;
  }
  function matrixScale(X, c, n, m) {
    var i, j;
    for (i = 0; i < n; i++)
      for (j = 0; j < m; j++)
        X[i * m + j] *= c;
  }
  function matrixAdd(X, Y, n, m) {
    var i, j, Z = new Array(n * m);
    for (i = 0; i < n; i++)
      for (j = 0; j < m; j++)
        Z[i * m + j] = X[i * m + j] + Y[i * m + j];
    return Z;
  }
  function matrixMultiply(X, Y, n, m, p) {
    var i, j, k, Z = new Array(n * p);
    for (i = 0; i < n; i++) {
      for (j = 0; j < p; j++) {
        Z[i * p + j] = 0;
        for (k = 0; k < m; k++)
          Z[i * p + j] += X[i * m + k] * Y[k * p + j];
      }
    }
    return Z;
  }
  // Cholesky decomposition
  function matrixChol(X, n) {
    var i, j, k, sum, p = new Array(n);
    for (i = 0; i < n; i++) { p[i] = X[i * n + i]; }
    for (i = 0; i < n; i++) {
      for (j = 0; j < i; j++) { p[i] -= X[i * n + j] * X[i * n + j]; }
      if (p[i] <= 0) { return false; }
      p[i] = Math.sqrt(p[i]);
      for (j = i + 1; j < n; j++) {
        for (k = 0; k < i; k++) { X[j * n + i] -= X[j * n + k] * X[i * n + k]; }
        X[j * n + i] /= p[i];
      }
    }
    for (i = 0; i < n; i++) { X[i * n + i] = p[i]; }
    return true;
  }
  // Inversion of Cholesky decomposition
  function matrixChol2inv(X, n) {
    var i, j, k, sum;
    for (i = 0; i < n; i++) {
      X[i * n + i] = 1 / X[i * n + i];
      for (j = i + 1; j < n; j++) {
        sum = 0;
        for (k = i; k < j; k++) { sum -= X[j * n + k] * X[k * n + i]; }
        X[j * n + i] = sum / X[j * n + j];
      }
    }
    for (i = 0; i < n; i++)
      for (j = i + 1; j < n; j++)
        X[i * n + j] = 0;
    for (i = 0; i < n; i++) {
      X[i * n + i] *= X[i * n + i];
      for (k = i + 1; k < n; k++) { X[i * n + i] += X[k * n + i] * X[k * n + i]; }
      for (j = i + 1; j < n; j++)
        for (k = j; k < n; k++)
          X[i * n + j] += X[k * n + i] * X[k * n + j];
    }
    for (i = 0; i < n; i++)
      for (j = 0; j < i; j++)
        X[i * n + j] = X[j * n + i];
  }
  // Inversion via Gauss-Jordan elimination
  function matrixSolve(X, n) {
    var m = n;
    var b = new Array(n * n);
    var indxc = new Array(n);
    var indxr = new Array(n);
    var ipiv = new Array(n);
    var i, icol, irow, j, k, l, ll;
    var big, dum, pivinv, temp;

    for (i = 0; i < n; i++)
      for (j = 0; j < n; j++)
        b[i * n + j] = (i === j) ? 1 : 0;
    for (j = 0; j < n; j++) { ipiv[j] = 0; }
    for (i = 0; i < n; i++) {
      big = 0;
      for (j = 0; j < n; j++) {
        if (ipiv[j] !== 1) {
          for (k = 0; k < n; k++) {
            if (ipiv[k] === 0) {
              if (Math.abs(X[j * n + k]) >= big) {
                big = Math.abs(X[j * n + k]);
                irow = j;
                icol = k;
              }
            }
          }
        }
      }
      ++(ipiv[icol]);

      if (irow !== icol) {
        for (l = 0; l < n; l++) {
          temp = X[irow * n + l];
          X[irow * n + l] = X[icol * n + l];
          X[icol * n + l] = temp;
        }
        for (l = 0; l < m; l++) {
          temp = b[irow * n + l];
          b[irow * n + l] = b[icol * n + l];
          b[icol * n + l] = temp;
        }
      }
      indxr[i] = irow;
      indxc[i] = icol;

      if (X[icol * n + icol] === 0) { return false; } // Singular

      pivinv = 1 / X[icol * n + icol];
      X[icol * n + icol] = 1;
      for (l = 0; l < n; l++) { X[icol * n + l] *= pivinv; }
      for (l = 0; l < m; l++) { b[icol * n + l] *= pivinv; }

      for (ll = 0; ll < n; ll++) {
        if (ll !== icol) {
          dum = X[ll * n + icol];
          X[ll * n + icol] = 0;
          for (l = 0; l < n; l++) { X[ll * n + l] -= X[icol * n + l] * dum; }
          for (l = 0; l < m; l++) { b[ll * n + l] -= b[icol * n + l] * dum; }
        }
      }
    }
    for (l = (n - 1); l >= 0; l--)
      if (indxr[l] !== indxc[l]) {
        for (k = 0; k < n; k++) {
          temp = X[k * n + indxr[l]];
          X[k * n + indxr[l]] = X[k * n + indxc[l]];
          X[k * n + indxc[l]] = temp;
        }
      }

    return true;
  }

  // =========================================================================
  // Variogram models
  // =========================================================================
  function variogramGaussian(h, nugget, range, sill, A) {
    return nugget + ((sill - nugget) / range) *
      (1.0 - Math.exp(-(1.0 / A) * Math.pow(h / range, 2)));
  }
  function variogramExponential(h, nugget, range, sill, A) {
    return nugget + ((sill - nugget) / range) *
      (1.0 - Math.exp(-(1.0 / A) * (h / range)));
  }
  function variogramSpherical(h, nugget, range, sill, A) {
    if (h > range) { return nugget + (sill - nugget) / range; }
    return nugget + ((sill - nugget) / range) *
      (1.5 * (h / range) - 0.5 * Math.pow(h / range, 3));
  }

  // =========================================================================
  // Kriging object
  // =========================================================================
  var kriging = {};

  // Train using Gaussian processes with Bayesian priors
  kriging.train = function (t, x, y, model, sigma2, alpha) {
    var variogram = {
      t: t, x: x, y: y,
      nugget: 0.0, range: 0.0, sill: 0.0,
      A: 1 / 3, n: 0
    };
    switch (model) {
      case 'gaussian':
        variogram.model = variogramGaussian;
        break;
      case 'exponential':
        variogram.model = variogramExponential;
        break;
      case 'spherical':
        variogram.model = variogramSpherical;
        break;
    }

    // Lag distance / semivariance
    var i, j, k, l, n = t.length;
    var distance = new Array((n * n - n) / 2);
    for (i = 0, k = 0; i < n; i++)
      for (j = 0; j < i; j++, k++) {
        distance[k] = new Array(2);
        distance[k][0] = Math.pow(
          Math.pow(x[i] - x[j], 2) + Math.pow(y[i] - y[j], 2), 0.5);
        distance[k][1] = Math.abs(t[i] - t[j]);
      }
    distance.sort(function (a, b) { return a[0] - b[0]; });
    variogram.range = distance[(n * n - n) / 2 - 1][0];

    // Bin lag distance
    var lags = ((n * n - n) / 2) > 30 ? 30 : (n * n - n) / 2;
    var tolerance = variogram.range / lags;
    var lag = repeat(0, lags);
    var semi = repeat(0, lags);
    if (lags < 30) {
      for (l = 0; l < lags; l++) {
        lag[l] = distance[l][0];
        semi[l] = distance[l][1];
      }
    } else {
      for (i = 0, j = 0, k = 0, l = 0; i < lags && j < ((n * n - n) / 2); i++, k = 0) {
        while (distance[j][0] <= ((i + 1) * tolerance)) {
          lag[l] += distance[j][0];
          semi[l] += distance[j][1];
          j++; k++;
          if (j >= ((n * n - n) / 2)) { break; }
        }
        if (k > 0) {
          lag[l] /= k;
          semi[l] /= k;
          l++;
        }
      }
      if (l < 2) { return variogram; } // Not enough points
    }

    // Feature transformation
    n = l;
    variogram.range = lag[n - 1] - lag[0];
    var X = repeat(1, 2 * n);
    var Y = new Array(n);
    var A = variogram.A;
    for (i = 0; i < n; i++) {
      switch (model) {
        case 'gaussian':
          X[i * 2 + 1] = 1.0 - Math.exp(-(1.0 / A) * Math.pow(lag[i] / variogram.range, 2));
          break;
        case 'exponential':
          X[i * 2 + 1] = 1.0 - Math.exp(-(1.0 / A) * lag[i] / variogram.range);
          break;
        case 'spherical':
          X[i * 2 + 1] = 1.5 * (lag[i] / variogram.range) - 0.5 * Math.pow(lag[i] / variogram.range, 3);
          break;
      }
      Y[i] = semi[i];
    }

    // Least squares
    var Xt = matrixTranspose(X, n, 2);
    var Z = matrixMultiply(Xt, X, 2, n, 2);
    Z = matrixAdd(Z, matrixDiag(1 / alpha, 2), 2, 2);
    var cloneZ = Z.slice(0);
    if (matrixChol(Z, 2)) {
      matrixChol2inv(Z, 2);
    } else {
      matrixSolve(cloneZ, 2);
      Z = cloneZ;
    }
    var W = matrixMultiply(matrixMultiply(Z, Xt, 2, 2, n), Y, 2, n, 1);

    // Variogram parameters
    variogram.nugget = W[0];
    variogram.sill = W[1] * variogram.range + variogram.nugget;
    variogram.n = x.length;

    // Gram matrix with prior
    n = x.length;
    var K = new Array(n * n);
    for (i = 0; i < n; i++) {
      for (j = 0; j < i; j++) {
        K[i * n + j] = variogram.model(
          Math.pow(Math.pow(x[i] - x[j], 2) + Math.pow(y[i] - y[j], 2), 0.5),
          variogram.nugget, variogram.range, variogram.sill, variogram.A);
        K[j * n + i] = K[i * n + j];
      }
      K[i * n + i] = variogram.model(0, variogram.nugget, variogram.range, variogram.sill, variogram.A);
    }

    // Inverse penalized Gram matrix projected to target vector
    var C = matrixAdd(K, matrixDiag(sigma2, n), n, n);
    var cloneC = C.slice(0);
    if (matrixChol(C, n)) {
      matrixChol2inv(C, n);
    } else {
      matrixSolve(cloneC, n);
      C = cloneC;
    }

    // Copy unprojected inverted matrix as K
    K = C.slice(0);
    var M = matrixMultiply(C, t, n, n, 1);
    variogram.K = K;
    variogram.M = M;

    return variogram;
  };

  // Model prediction
  kriging.predict = function (x, y, variogram) {
    var i, k = new Array(variogram.n);
    for (i = 0; i < variogram.n; i++)
      k[i] = variogram.model(
        Math.pow(Math.pow(x - variogram.x[i], 2) + Math.pow(y - variogram.y[i], 2), 0.5),
        variogram.nugget, variogram.range, variogram.sill, variogram.A);
    return matrixMultiply(k, variogram.M, 1, variogram.n, 1)[0];
  };

  kriging.variance = function (x, y, variogram) {
    var i, k = new Array(variogram.n);
    for (i = 0; i < variogram.n; i++)
      k[i] = variogram.model(
        Math.pow(Math.pow(x - variogram.x[i], 2) + Math.pow(y - variogram.y[i], 2), 0.5),
        variogram.nugget, variogram.range, variogram.sill, variogram.A);
    return variogram.model(0, variogram.nugget, variogram.range, variogram.sill, variogram.A) +
      matrixMultiply(matrixMultiply(k, variogram.K, 1, variogram.n, variogram.n), k, 1, variogram.n, 1)[0];
  };

  // Gridded matrices
  kriging.grid = function (polygons, variogram, xWidth, yWidth) {
    var i, j, k, n = polygons.length;
    if (n === 0) { return; }

    // Boundaries of polygons space
    var xlim = [polygons[0][0][0], polygons[0][0][0]];
    var ylim = [polygons[0][0][1], polygons[0][0][1]];

    for (i = 0; i < n; i++) {
      for (j = 0; j < polygons[i].length; j++) {
        if (polygons[i][j][0] < xlim[0]) { xlim[0] = polygons[i][j][0]; }
        if (polygons[i][j][0] > xlim[1]) { xlim[1] = polygons[i][j][0]; }
        if (polygons[i][j][1] < ylim[0]) { ylim[0] = polygons[i][j][1]; }
        if (polygons[i][j][1] > ylim[1]) { ylim[1] = polygons[i][j][1]; }
      }
    }

    var xtarget, ytarget;
    var a = new Array(2), b = new Array(2);
    var lxlim = new Array(2), lylim = new Array(2);
    var cols = Math.ceil((xlim[1] - xlim[0]) / xWidth);
    var rows = Math.ceil((ylim[1] - ylim[0]) / yWidth);

    var A = [];
    var B = new Array(cols * rows);

    for (i = 0; i < n; i++) {
      lxlim[0] = polygons[i][0][0];
      lxlim[1] = lxlim[0];
      lylim[0] = polygons[i][0][1];
      lylim[1] = lylim[0];
      for (j = 1; j < polygons[i].length; j++) {
        if (polygons[i][j][0] < lxlim[0]) { lxlim[0] = polygons[i][j][0]; }
        if (polygons[i][j][0] > lxlim[1]) { lxlim[1] = polygons[i][j][0]; }
        if (polygons[i][j][1] < lylim[0]) { lylim[0] = polygons[i][j][1]; }
        if (polygons[i][j][1] > lylim[1]) { lylim[1] = polygons[i][j][1]; }
      }

      a[0] = Math.floor(((lxlim[0] - ((lxlim[0] - xlim[0]) % xWidth)) - xlim[0]) / xWidth);
      a[1] = Math.ceil(((lxlim[1] - ((lxlim[1] - xlim[1]) % xWidth)) - xlim[0]) / xWidth);
      b[0] = Math.floor(((lylim[0] - ((lylim[0] - ylim[0]) % yWidth)) - ylim[0]) / yWidth);
      b[1] = Math.ceil(((lylim[1] - ((lylim[1] - ylim[1]) % yWidth)) - ylim[0]) / yWidth);

      for (j = a[0]; j < a[1]; j++) {
        if (!A[j]) { A[j] = []; }
        for (k = b[0]; k < b[1]; k++) {
          xtarget = xlim[0] + j * xWidth;
          ytarget = ylim[0] + k * yWidth;
          if (pip(polygons[i], xtarget, ytarget)) {
            var sdf = kriging.predict(xtarget, ytarget, variogram);
            A[j][k] = sdf;
            B[k * cols + j] = sdf;
          }
        }
      }
    }
    return {
      grid: A, grid2: B,
      n: cols, m: rows,
      xlim: xlim, ylim: ylim,
      zlim: [arrMin(variogram.t), arrMax(variogram.t)],
      x_width: xWidth, y_width: yWidth
    };
  };

  // Pixel coordinates to geographic coordinates
  function polygonPixel2Geos(polygon, gridInfo) {
    var _polygon = polygon.map(function (ring) {
      return ring.map(function (coor) {
        var lon = gridInfo.xlim[0] + coor[1] * gridInfo.x_width;
        var lat;
        if (gridInfo.y_width < 0) {
          lat = gridInfo.ylim[1] + coor[0] * gridInfo.y_width;
        } else {
          lat = gridInfo.ylim[0] + coor[0] * gridInfo.y_width;
        }
        return [lon, lat];
      });
    });
    return _polygon;
  }

  // Generate vector contours from kriging grid (requires d3-contour)
  kriging.getVectorContour = function (gridInfo, breaks) {
    var _contours = d3.contours()
      .size([gridInfo.n, gridInfo.m])
      .thresholds(breaks)
      (gridInfo.grid2);
    var dataset = {
      type: 'FeatureCollection',
      features: []
    };
    for (var i = 0; i < _contours.length; i++) {
      var contour = _contours[i];
      if (contour.type === 'MultiPolygon') {
        contour.coordinates.forEach(function (polygon) {
          var geom = { type: 'Polygon', coordinates: [] };
          geom.coordinates = polygonPixel2Geos(polygon, gridInfo);
          if (geom.coordinates.length > 0) {
            dataset.features.push({
              type: 'Feature',
              properties: { value: contour.value },
              geometry: geom
            });
          }
        });
      } else if (contour.type === 'Polygon') {
        var geom = { type: 'Polygon', coordinates: [] };
        geom.coordinates = polygonPixel2Geos(contour.coordinates, gridInfo);
        if (geom.coordinates.length > 0) {
          dataset.features.push({
            type: 'Feature',
            properties: { value: contour.value },
            geometry: geom
          });
        }
      }
    }
    return dataset;
  };

  // Compatibility alias
  kriging.contour = kriging.getVectorContour;

  // Canvas grid rendering
  kriging.plot = function (canvas, grid, xlim, ylim, colors, valuelist) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var range = [xlim[1] - xlim[0], ylim[1] - ylim[0], grid.zlim[1] - grid.zlim[0]];
    var i, j, x, y, z;
    var n = grid.n, m = grid.m;
    var wx = Math.ceil(grid.x_width * canvas.width / (xlim[1] - xlim[0]));
    var wy = Math.ceil(grid.y_width * canvas.height / (ylim[1] - ylim[0]));
    var area_list = [];
    for (i = 0; i < colors.length; i++) { area_list[i] = 0; }

    for (i = 0; i < n; i++) {
      for (j = 0; j < m; j++) {
        if (grid.grid[i][j] === undefined) { continue; }
        x = canvas.width * (i * grid.x_width + grid.xlim[0] - xlim[0]) / range[0];
        y = canvas.height * (1 - (j * grid.y_width + grid.ylim[0] - ylim[0]) / range[1]);
        z = (grid.grid[i][j] - grid.zlim[0]) / range[2];

        if (colors[0] === 0) {
          if (grid.zlim[0] === grid.zlim[1]) {
            ctx.fillStyle = colors[Math.round(grid.zlim[0])];
          } else {
            if (z < 0.0) { z = 0.0; }
            if (z > 1.0) { z = 1.0; }
            ctx.fillStyle = colors[Math.round(grid.grid[i][j])];
          }
        } else {
          if (valuelist) {
            if (valuelist.length) {
              for (var k = 1; k < valuelist.length; k++) {
                if (grid.grid[i][j] <= valuelist[k]) {
                  ctx.fillStyle = colors[k - 1];
                  area_list[k - 1] = area_list[k - 1] + 1;
                  break;
                }
                if (k === valuelist.length) {
                  ctx.fillStyle = colors[k - 1];
                }
              }
            } else {
              if (z < 0.0) { z = 0.0; }
              if (z > 1.0) { z = 1.0; }
              ctx.fillStyle = colors[Math.floor((colors.length - 1) * z)];
            }
          } else {
            if (z < 0.0) { z = 0.0; }
            if (z > 1.0) { z = 1.0; }
            ctx.fillStyle = colors[Math.floor((colors.length - 1) * z)];
          }
        }
        ctx.fillRect(Math.round(x - wx / 2), Math.round(y - wy / 2), wx, wy);
      }
    }
  };

  // Pixel-based rendering (alternative to grid rendering)
  kriging.pixelGridDrawImage = function (polygons, canvas, variogram, xrange, yrange, colors, valuelist) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var pix_x = 0; pix_x < canvas.width; pix_x++) {
      for (var pix_y = 0; pix_y < canvas.height; pix_y++) {
        var pix_lng = xrange[0] + pix_x * ((xrange[1] - xrange[0]) / canvas.width);
        var pix_lat = yrange[1] - pix_y * ((yrange[1] - yrange[0]) / canvas.height);
        if (pip(polygons[0], pix_lng, pix_lat)) {
          var pix_value = kriging.predict(pix_lng, pix_lat, variogram);
          try {
            for (var k = 0; k < valuelist.length; k++) {
              if (pix_value >= valuelist[k] && pix_value <= valuelist[k + 1]) {
                ctx.fillStyle = colors[k];
                break;
              }
            }
          } catch (err) {
            ctx.fillStyle = '#000000';
          }
        } else {
          continue;
        }
        ctx.fillRect(pix_x, pix_y, 2, 2);
      }
    }
  };

  // Compatibility: keep old method name
  kriging.pixel_Grid_drawImage = kriging.pixelGridDrawImage;

  // Expose to global namespace
  WGIS.kriging = kriging;
})();
