// import { contours as d3_contours } from 'd3-contour';
// import { rotate as geom_rotate } from './geom';

// Extend the Array class
//数组最大值
Array.prototype.max = function () {
	return Math.max.apply(null, this);
};
//数组最小值
Array.prototype.min = function () {
	return Math.min.apply(null, this);
};
//数组平均值
Array.prototype.mean = function () {
	var i,
		sum;
	for (i = 0, sum = 0; i < this.length; i++)
		sum += this[i];
	return sum / this.length;
};

//将数组第一项取出为v，生成长度为n的数组，每个数组item为v
Array.prototype.rep = function (n) {
	var arrayn = new Array(n);
	var v = this[0];
	for (var i = 0; i < n; i++) {
		arrayn[i] = v;
	}
	return arrayn;
};

Array.prototype.pip = function (x, y) {
	var i,
		j,
		c = false;
	for (i = 0, j = this.length - 1; i < this.length; j = i++) {
		if (((this[i][1] > y) != (this[j][1] > y)) &&
			(x < (this[j][0] - this[i][0]) * (y - this[i][1]) / (this[j][1] - this[i][1]) + this[i][0])) {
			c = !c;
		}
	}
	return c;
}

// Matrix algebra
function kriging_matrix_diag(c, n) {
	var i,
		Z = [0].rep(n * n);
	for (i = 0; i < n; i++)
		Z[i * n + i] = c;
	return Z;
};
function kriging_matrix_transpose(X, n, m) {
	var i,
		j,
		Z = Array(m * n);
	for (i = 0; i < n; i++)
		for (j = 0; j < m; j++)
			Z[j * n + i] = X[i * m + j];
	return Z;
};
function kriging_matrix_scale(X, c, n, m) {
	var i,
		j;
	for (i = 0; i < n; i++)
		for (j = 0; j < m; j++)
			X[i * m + j] *= c;
};
function kriging_matrix_add(X, Y, n, m) {
	var i,
		j,
		Z = Array(n * m);
	for (i = 0; i < n; i++)
		for (j = 0; j < m; j++)
			Z[i * m + j] = X[i * m + j] + Y[i * m + j];
	return Z;
};
// Naive matrix multiplication
function kriging_matrix_multiply(X, Y, n, m, p) {
	var i,
		j,
		k,
		Z = Array(n * p);
	for (i = 0; i < n; i++) {
		for (j = 0; j < p; j++) {
			Z[i * p + j] = 0;
			for (k = 0; k < m; k++)
				Z[i * p + j] += X[i * m + k] * Y[k * p + j];
		}
	}
	return Z;
};
// Cholesky decomposition
function kriging_matrix_chol(X, n) {
	var i,
		j,
		k,
		sum,
		p = Array(n);
	for (i = 0; i < n; i++)
		p[i] = X[i * n + i];
	for (i = 0; i < n; i++) {
		for (j = 0; j < i; j++)
			p[i] -= X[i * n + j] * X[i * n + j];
		if (p[i] <= 0)
			return false;
		p[i] = Math.sqrt(p[i]);
		for (j = i + 1; j < n; j++) {
			for (k = 0; k < i; k++)
				X[j * n + i] -= X[j * n + k] * X[i * n + k];
			X[j * n + i] /= p[i];
		}
	}
	for (i = 0; i < n; i++)
		X[i * n + i] = p[i];
	return true;
};
// Inversion of cholesky decomposition
function kriging_matrix_chol2inv(X, n) {
	var i,
		j,
		k,
		sum;
	for (i = 0; i < n; i++) {
		X[i * n + i] = 1 / X[i * n + i];
		for (j = i + 1; j < n; j++) {
			sum = 0;
			for (k = i; k < j; k++)
				sum -= X[j * n + k] * X[k * n + i];
			X[j * n + i] = sum / X[j * n + j];
		}
	}
	for (i = 0; i < n; i++)
		for (j = i + 1; j < n; j++)
			X[i * n + j] = 0;
	for (i = 0; i < n; i++) {
		X[i * n + i] *= X[i * n + i];
		for (k = i + 1; k < n; k++)
			X[i * n + i] += X[k * n + i] * X[k * n + i];
		for (j = i + 1; j < n; j++)
			for (k = j; k < n; k++)
				X[i * n + j] += X[k * n + i] * X[k * n + j];
	}
	for (i = 0; i < n; i++)
		for (j = 0; j < i; j++)
			X[i * n + j] = X[j * n + i];

};
// Inversion via gauss-jordan elimination
function kriging_matrix_solve(X, n) {
	var m = n;
	var b = Array(n * n);
	var indxc = Array(n);
	var indxr = Array(n);
	var ipiv = Array(n);
	var i,
		icol,
		irow,
		j,
		k,
		l,
		ll;
	var big,
		dum,
		pivinv,
		temp;

	for (i = 0; i < n; i++)
		for (j = 0; j < n; j++) {
			if (i == j)
				b[i * n + j] = 1;
			else
				b[i * n + j] = 0;
		}
	for (j = 0; j < n; j++)
		ipiv[j] = 0;
	for (i = 0; i < n; i++) {
		big = 0;
		for (j = 0; j < n; j++) {
			if (ipiv[j] != 1) {
				for (k = 0; k < n; k++) {
					if (ipiv[k] == 0) {
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

		if (irow != icol) {
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

		if (X[icol * n + icol] == 0)
			return false; // Singular

		pivinv = 1 / X[icol * n + icol];
		X[icol * n + icol] = 1;
		for (l = 0; l < n; l++)
			X[icol * n + l] *= pivinv;
		for (l = 0; l < m; l++)
			b[icol * n + l] *= pivinv;

		for (ll = 0; ll < n; ll++) {
			if (ll != icol) {
				dum = X[ll * n + icol];
				X[ll * n + icol] = 0;
				for (l = 0; l < n; l++)
					X[ll * n + l] -= X[icol * n + l] * dum;
				for (l = 0; l < m; l++)
					b[ll * n + l] -= b[icol * n + l] * dum;
			}
		}
	}
	for (l = (n - 1); l >= 0; l--)
		if (indxr[l] != indxc[l]) {
			for (k = 0; k < n; k++) {
				temp = X[k * n + indxr[l]];
				X[k * n + indxr[l]] = X[k * n + indxc[l]];
				X[k * n + indxc[l]] = temp;
			}
		}

	return true;
}

// Variogram models
function kriging_variogram_gaussian(h, nugget, range, sill, A) {
	return nugget + ((sill - nugget) / range) *
		(1.0 - Math.exp(- (1.0 / A) * Math.pow(h / range, 2)));
};
function kriging_variogram_exponential(h, nugget, range, sill, A) {
	return nugget + ((sill - nugget) / range) *
		(1.0 - Math.exp(- (1.0 / A) * (h / range)));
};
function kriging_variogram_spherical(h, nugget, range, sill, A) {
	if (h > range)
		return nugget + (sill - nugget) / range;
	return nugget + ((sill - nugget) / range) *
		(1.5 * (h / range) - 0.5 * Math.pow(h / range, 3));
};

var kriging = {};

// Train using gaussian processes with bayesian priors
kriging.train = function (t, x, y, model, sigma2, alpha) {
	var variogram = {
		t: t,
		x: x,
		y: y,
		nugget: 0.0,
		range: 0.0,
		sill: 0.0,
		A: 1 / 3,
		n: 0
	};
	switch (model) {
		case "gaussian":
			variogram.model = kriging_variogram_gaussian;
			break;
		case "exponential":
			variogram.model = kriging_variogram_exponential;
			break;
		case "spherical":
			variogram.model = kriging_variogram_spherical;
			break;
	};

	// Lag distance/semivariance
	var i,
		j,
		k,
		l,
		n = t.length;
	var distance = Array((n * n - n) / 2);
	for (i = 0, k = 0; i < n; i++)
		for (j = 0; j < i; j++, k++) {
			distance[k] = Array(2);
			distance[k][0] = Math.pow(
				Math.pow(x[i] - x[j], 2) +
				Math.pow(y[i] - y[j], 2), 0.5);
			distance[k][1] = Math.abs(t[i] - t[j]);
		}
	distance.sort(function (a, b) {
		return a[0] - b[0];
	});
	variogram.range = distance[(n * n - n) / 2 - 1][0];

	// Bin lag distance
	var lags = ((n * n - n) / 2) > 30 ? 30 : (n * n - n) / 2;
	var tolerance = variogram.range / lags;
	var lag = [0].rep(lags);
	var semi = [0].rep(lags);
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
				j++;
				k++;
				if (j >= ((n * n - n) / 2))
					break;
			}
			if (k > 0) {
				lag[l] /= k;
				semi[l] /= k;
				l++;
			}
		}
		if (l < 2)
			return variogram; // Error: Not enough points
	}

	// Feature transformation
	n = l;
	variogram.range = lag[n - 1] - lag[0];
	var X = [1].rep(2 * n);
	var Y = Array(n);
	var A = variogram.A;
	for (i = 0; i < n; i++) {
		switch (model) {
			case "gaussian":
				X[i * 2 + 1] = 1.0 - Math.exp(- (1.0 / A) * Math.pow(lag[i] / variogram.range, 2));
				break;
			case "exponential":
				X[i * 2 + 1] = 1.0 - Math.exp(- (1.0 / A) * lag[i] / variogram.range);
				break;
			case "spherical":
				X[i * 2 + 1] = 1.5 * (lag[i] / variogram.range) -
					0.5 * Math.pow(lag[i] / variogram.range, 3);
				break;
		};
		Y[i] = semi[i];
	}

	// Least squares
	var Xt = kriging_matrix_transpose(X, n, 2);
	var Z = kriging_matrix_multiply(Xt, X, 2, n, 2);
	Z = kriging_matrix_add(Z, kriging_matrix_diag(1 / alpha, 2), 2, 2);
	var cloneZ = Z.slice(0);
	if (kriging_matrix_chol(Z, 2))
		kriging_matrix_chol2inv(Z, 2);
	else {
		kriging_matrix_solve(cloneZ, 2);
		Z = cloneZ;
	}
	var W = kriging_matrix_multiply(kriging_matrix_multiply(Z, Xt, 2, 2, n), Y, 2, n, 1);

	// Variogram parameters
	variogram.nugget = W[0];
	variogram.sill = W[1] * variogram.range + variogram.nugget;
	variogram.n = x.length;

	// Gram matrix with prior
	n = x.length;
	var K = Array(n * n);
	for (i = 0; i < n; i++) {
		for (j = 0; j < i; j++) {
			K[i * n + j] = variogram.model(Math.pow(Math.pow(x[i] - x[j], 2) +
				Math.pow(y[i] - y[j], 2), 0.5),
				variogram.nugget,
				variogram.range,
				variogram.sill,
				variogram.A);
			K[j * n + i] = K[i * n + j];
		}
		K[i * n + i] = variogram.model(0, variogram.nugget,
			variogram.range,
			variogram.sill,
			variogram.A);
	}

	// Inverse penalized Gram matrix projected to target vector
	var C = kriging_matrix_add(K, kriging_matrix_diag(sigma2, n), n, n);
	var cloneC = C.slice(0);
	if (kriging_matrix_chol(C, n))
		kriging_matrix_chol2inv(C, n);
	else {
		kriging_matrix_solve(cloneC, n);
		C = cloneC;
	}

	// Copy unprojected inverted matrix as K
	var K = C.slice(0);
	var M = kriging_matrix_multiply(C, t, n, n, 1);
	variogram.K = K;
	variogram.M = M;

	return variogram;
};

// Model prediction
kriging.predict = function (x, y, variogram) {
	var i,
		k = Array(variogram.n);
	for (i = 0; i < variogram.n; i++)
		k[i] = variogram.model(Math.pow(Math.pow(x - variogram.x[i], 2) +
			Math.pow(y - variogram.y[i], 2), 0.5),
			variogram.nugget, variogram.range,
			variogram.sill, variogram.A);
	return kriging_matrix_multiply(k, variogram.M, 1, variogram.n, 1)[0];
};
kriging.variance = function (x, y, variogram) {
	var i,
		k = Array(variogram.n);
	for (i = 0; i < variogram.n; i++)
		k[i] = variogram.model(Math.pow(Math.pow(x - variogram.x[i], 2) +
			Math.pow(y - variogram.y[i], 2), 0.5),
			variogram.nugget, variogram.range,
			variogram.sill, variogram.A);
	return variogram.model(0, variogram.nugget, variogram.range,
		variogram.sill, variogram.A) +
		kriging_matrix_multiply(kriging_matrix_multiply(k, variogram.K,
			1, variogram.n, variogram.n),
			k, 1, variogram.n, 1)[0];
};

// Gridded matrices or contour paths
kriging.grid = function (polygons, variogram, x_width, y_width) {
	var i,
		j,
		k,
		n = polygons.length;
	if (n == 0)
		return;

	// Boundaries of polygons space
	var xlim = [polygons[0][0][0], polygons[0][0][0]];
	var ylim = [polygons[0][0][1], polygons[0][0][1]];

	for (i = 0; i < n; i++) // Polygons
	{
		for (j = 0; j < polygons[i].length; j++) { // Vertices
			if (polygons[i][j][0] < xlim[0])
				xlim[0] = polygons[i][j][0];
			if (polygons[i][j][0] > xlim[1])
				xlim[1] = polygons[i][j][0];
			if (polygons[i][j][1] < ylim[0])
				ylim[0] = polygons[i][j][1];
			if (polygons[i][j][1] > ylim[1])
				ylim[1] = polygons[i][j][1];
		}
	}
	// Alloc for O(n^2) space
	var xtarget,
		ytarget;
	var a = new Array(2),
		b = new Array(2);
	var lxlim = new Array(2); // Local dimensions
	var lylim = new Array(2); // Local dimensions
	var x = Math.ceil((xlim[1] - xlim[0]) / x_width);
	var y = Math.ceil((ylim[1] - ylim[0]) / y_width);

	var A = [];
	var B = [];
	for (i = 0; i < n; i++) {
		// Range for polygons[i]
		lxlim[0] = polygons[i][0][0];
		lxlim[1] = lxlim[0];
		lylim[0] = polygons[i][0][1];
		lylim[1] = lylim[0];
		for (j = 1; j < polygons[i].length; j++) { // Vertices
			if (polygons[i][j][0] < lxlim[0])
				lxlim[0] = polygons[i][j][0];
			if (polygons[i][j][0] > lxlim[1])
				lxlim[1] = polygons[i][j][0];
			if (polygons[i][j][1] < lylim[0])
				lylim[0] = polygons[i][j][1];
			if (polygons[i][j][1] > lylim[1])
				lylim[1] = polygons[i][j][1];
		}

		// Loop through polygon subspace
		a[0] = Math.floor(((lxlim[0] - ((lxlim[0] - xlim[0]) % x_width)) - xlim[0]) / x_width);
		a[1] = Math.ceil(((lxlim[1] - ((lxlim[1] - xlim[1]) % x_width)) - xlim[0]) / x_width);
		b[0] = Math.floor(((lylim[0] - ((lylim[0] - ylim[0]) % y_width)) - ylim[0]) / y_width);
		b[1] = Math.ceil(((lylim[1] - ((lylim[1] - ylim[1]) % y_width)) - ylim[0]) / y_width);
		for (j = a[0]; j < a[1]; j++) {
			A[j] = [];
			for (k = b[0]; k < b[1]; k++) {
				xtarget = xlim[0] + j * x_width;
				ytarget = ylim[0] + k * y_width;
				if (polygons[i].pip(xtarget, ytarget)) {
					var sdf = kriging.predict(xtarget, ytarget, variogram);
					A[j][k] = sdf;
					B.push(sdf);
				}

			}
		}
	}
	return {
		grid: A,
		grid2: B,
		n: a[1],
		m: b[1],
		xlim: xlim,
		ylim: ylim,
		zlim: [variogram.t.min(), variogram.t.max()],
		x_width: x_width,
		y_width: y_width
	};
};
//克里金生成矢量等值面
kriging.contour = function (grid_metedate, breaks) {
	let grid = grid_metedate.grid2;
	var n = grid_metedate.n;
	var m = grid_metedate.m;
	//像素坐标系的等值面
	var _contours = d3.contours()
		.size([n, m])
		.thresholds(breaks)
		(grid);
	//像素坐标系换算地理坐标系
	//图形旋转锚点
	let origin = [(grid_metedate.xlim[1] + grid_metedate.xlim[0]) / 2, (grid_metedate.ylim[1] + grid_metedate.ylim[0]) / 2];
	let dataset = {
		"type": "FeatureCollection",
		"features": []
	};
	_contours.forEach(contour => {
		let coordinates = contour.coordinates.forEach(polygon => {
			//polygon分内环和外环
			let _polygon = polygon.map(ring => {
				let _ring = ring.map(function (coor) {
					let lon = grid_metedate.xlim[0] + (grid_metedate.xlim[1] - grid_metedate.xlim[0]) * (coor[0] / n);
					let lat = grid_metedate.ylim[1] - (grid_metedate.ylim[1] - grid_metedate.ylim[0]) * (coor[1] / m);
					let _coor = [lon, lat];
					//d3.contours的坐标需要旋转90度转回来
					//旋转，有点问题
					let pt = {
						type: 'Point',
						coordinates: _coor
					};
					_coor = geom_rotate(pt, Math.PI / 2, origin);
					return _coor;
				});
				return _ring;
			});
			dataset.features.push({
				"type": "Feature",
				"properties": {
					"level": contour.value
				},
				"geometry": {
					"type": "Polygon",
					"coordinates": _polygon
				}
			});
		});
	});
	return dataset;
};
// Plotting on the DOM
kriging.plot = function (canvas, grid, xlim, ylim, colors, valuelist) {
	// kriging.plot = function (canvas, grid, xlim, ylim, colors, valuelist = null) {
	// Clear screen
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Starting boundaries
	var range = [xlim[1] - xlim[0], ylim[1] - ylim[0], grid.zlim[1] - grid.zlim[0]];
	var i, j, x, y, z;
	var n = grid.n;
	var m = grid.m;
	var wx = Math.ceil(grid.x_width * canvas.width / (xlim[1] - xlim[0]));
	var wy = Math.ceil(grid.y_width * canvas.height / (ylim[1] - ylim[0]));
	area_list = []
	for (var i = 0; i < colors.length; i++) {
		area_list[i] = 0
	}
	//涂色开始
	for (i = 0; i < n; i++) {
		// if (grid[i].length == 0) continue;
		for (j = 0; j < m; j++) {
			if (grid.grid[i][j] == undefined) continue;
			x = canvas.width * (i * grid.x_width + grid.xlim[0] - xlim[0]) / range[0];
			y = canvas.height * (1 - (j * grid.y_width + grid.ylim[0] - ylim[0]) / range[1]);
			z = (grid.grid[i][j] - grid.zlim[0]) / range[2];
			if (colors[0] == 0) {
				if (grid.zlim[0] == grid.zlim[1]) {
					ctx.fillStyle = colors[Math.round(grid.zlim[0])];
				} else {
					if (z < 0.0) z = 0.0;
					if (z > 1.0) z = 1.0;
					ctx.fillStyle = colors[Math.round(grid.grid[i][j])];
				}
			} else {
				if (valuelist) {
					if (valuelist.length) {
						for (k = 1; k < valuelist.length; k++) {
							if (grid.grid[i][j] <= valuelist[k]) {
								ctx.fillStyle = colors[k - 1];//当实际值在当前等级范围时，涂色
								area_list[k - 1] = area_list[k - 1] + 1; //为各等级区间的数据计数，统计数量
								break;
							}
							if (k == valuelist.length) {
								ctx.fillStyle = colors[k - 1];
							}
						}
					} else {
						if (z < 0.0) z = 0.0;
						if (z > 1.0) z = 1.0;
						ctx.fillStyle = colors[Math.floor((colors.length - 1) * z)];
					}
				} else {
					if (z < 0.0) z = 0.0;
					if (z > 1.0) z = 1.0;
					ctx.fillStyle = colors[Math.floor((colors.length - 1) * z)];
				}
			}
			ctx.fillRect(Math.round(x - wx / 2), Math.round(y - wy / 2), wx, wy);
		}
	}
};

kriging.pixel_Grid_drawImage = function (polygons, canvas, variogram, xrange, yrange, colors, valuelist) {
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	console.log(1);
	console.log(polygons[0]);

	for (var pix_x = 0; pix_x < canvas.width; pix_x++) {
		for (var pix_y = 0; pix_y < canvas.height; pix_y++) {
			var pix_lng = xrange[0] + pix_x * ((xrange[1] - xrange[0]) / canvas.width);
			var pix_lat = yrange[1] - pix_y * ((yrange[1] - yrange[0]) / canvas.height);
			if (polygons[0].pip(pix_lng, pix_lat)) {
				var pix_value = kriging.predict(pix_lng, pix_lat, variogram);
				try {
					for (var k = 0; k < valuelist.length; k++) {
						if (pix_value >= valuelist[k] && pix_value < valuelist[k + 1]) {
							ctx.fillStyle = colors[k];
							break
						}
						else {
							ctx.fillStyle = "#FFFFFF";
						}
					}
				}
				catch (err) {
					ctx.fillStyle = "#000000"
				}
			}
			else{
				continue
			}

			ctx.fillRect(pix_x, pix_y, 2, 2);
		}
	}
}

// export { kriging };
