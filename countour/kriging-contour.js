// undefined v1.0.0 Copyright 2019 undefined
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-contour'), require('@turf/intersect')) :
typeof define === 'function' && define.amd ? define(['exports', 'd3-contour', '@turf/intersect'], factory) :
(factory((global.freegis = global.freegis || {}),global.d3,global.intersect));
}(this, (function (exports,d3Contour,intersect) { 'use strict';

intersect = intersect && intersect.hasOwnProperty('default') ? intersect['default'] : intersect;

/*
geometry:geojson格式的feature的geometry属性
angle:旋转角度，弧度制,
anchor：旋转原点

*/
function rotate(geometry,angle, anchor){
	let _geometry;
	switch(geometry.type)
	{
		case 'Point':
			_geometry=point_rotate(geometry.coordinates,angle,anchor);
			break;
		case 'MultiPoint':
			_geometry=multiPoint_rotate(geometry.coordinates,angle,anchor);
			break;
		case 'LineString':
			_geometry=lineString_rotate(geometry.coordinates,angle,anchor);
			break;
		case 'MultiLineString':
			_geometry=multiLineString_rotate(geometry.coordinates,angle,anchor);
			break;
		case 'Polygon':
			_geometry=polygon_rotate(geometry.coordinates,angle,anchor);
			break;
		case 'MultiPolygon':
			_geometry=multiPolygon_rotate(geometry.coordinates,angle,anchor);
			break;
	}
	
	return _geometry;
}


function coorRotate(coor,cos,sin, anchor){
	//const cos = Math.cos(angle);
	//const sin = Math.sin(angle);
	const anchorX = anchor[0];
	const anchorY = anchor[1];
	const deltaX = coor[0] - anchorX;
    const deltaY = coor[1] - anchorY;
	let rotate_coor=[];
    rotate_coor[0] = anchorX + deltaX * cos - deltaY * sin;
	rotate_coor[1] = anchorY + deltaX * sin + deltaY * cos;
	return rotate_coor;
}
//点旋转
function point_rotate(coordinates,angle,anchor){
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);
	return coorRotate(coordinates,cos,sin,anchor);
}
//多点旋转
function multiPoint_rotate(coordinates,angle,anchor){
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);
	let length=coordinates.length;
	let _coors=new Array(length);
	for(let i=0;i<length;i++){
		_coors[i]=coorRotate(coordinates[i],cos,sin,anchor);
	}
	return _coors;
}
//线要素旋转
function lineString_rotate(coordinates,angle,anchor){
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);
	let length=coordinates.length;
	let _coors=new Array(length);
	for(let i=0;i<length;i++){
		_coors[i]=coorRotate(coordinates[i],cos,sin,anchor);
	}
	return _coors;
}
//多线要素旋转
function multiLineString_rotate(coordinates,angle,anchor){
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);
	let group_length=coordinates.length;
	let group=new Array(group_length);
	for(let i=0;i<group_length;i++){
		let singleLineString=coordinates[i];
		let coor_length=singleLineString.length;
		let coors=new Array(coor_length);
		for(let j=0;j<coor_length;j++){
			coors[j]=coorRotate(singleLineString[j],cos,sin,anchor);
		}
		group[i]=coors;
	}
	return group;
}

//面要素旋转
function polygon_rotate(coordinates,angle,anchor){
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);
	let group_length=coordinates.length;
	let group=new Array(group_length);
	for(let i=0;i<group_length;i++){
		let singleLineString=coordinates[i];
		let coor_length=singleLineString.length;
		let coors=new Array(coor_length);
		for(let j=0;j<coor_length;j++){
			coors[j]=coorRotate(singleLineString[j],cos,sin,anchor);
		}
		group[i]=coors;
	}
	return group;
}


//多面要素旋转
function multiPolygon_rotate(coordinates,angle,anchor){
	let group_length=coordinates.length;
	let group=new Array(group_length);
	for(let i=0;i<group_length;i++){
		group[i]=polygon_rotate(coordinates,angle,anchor);
	}
	return group;
}

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
};

// Matrix algebra
function kriging_matrix_diag(c, n) {
	var i,
	Z = [0].rep(n * n);
	for (i = 0; i < n; i++)
		Z[i * n + i] = c;
	return Z;
}function kriging_matrix_transpose(X, n, m) {
	var i,
	j,
	Z = Array(m * n);
	for (i = 0; i < n; i++)
		for (j = 0; j < m; j++)
			Z[j * n + i] = X[i * m + j];
	return Z;
}function kriging_matrix_add(X, Y, n, m) {
	var i,
	j,
	Z = Array(n * m);
	for (i = 0; i < n; i++)
		for (j = 0; j < m; j++)
			Z[i * m + j] = X[i * m + j] + Y[i * m + j];
	return Z;
}// Naive matrix multiplication
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
}// Cholesky decomposition
function kriging_matrix_chol(X, n) {
	var i,
	j,
	k,
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
}// Inversion of cholesky decomposition
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

}// Inversion via gauss-jordan elimination
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
	(1.0 - Math.exp( - (1.0 / A) * Math.pow(h / range, 2)));
}function kriging_variogram_exponential(h, nugget, range, sill, A) {
	return nugget + ((sill - nugget) / range) *
	(1.0 - Math.exp( - (1.0 / A) * (h / range)));
}function kriging_variogram_spherical(h, nugget, range, sill, A) {
	if (h > range)
		return nugget + (sill - nugget) / range;
	return nugget + ((sill - nugget) / range) *
	(1.5 * (h / range) - 0.5 * Math.pow(h / range, 3));
}
var kriging = {};

// Train using gaussian processes with bayesian priors
kriging.train = function (t, x, y, model, sigma2, alpha) {
	var variogram = {
		t : t,
		x : x,
		y : y,
		nugget : 0.0,
		range : 0.0,
		sill : 0.0,
		A : 1 / 3,
		n : 0
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
	}
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
			X[i * 2 + 1] = 1.0 - Math.exp( - (1.0 / A) * Math.pow(lag[i] / variogram.range, 2));
			break;
		case "exponential":
			X[i * 2 + 1] = 1.0 - Math.exp( - (1.0 / A) * lag[i] / variogram.range);
			break;
		case "spherical":
			X[i * 2 + 1] = 1.5 * (lag[i] / variogram.range) -
				0.5 * Math.pow(lag[i] / variogram.range, 3);
			break;
		}		Y[i] = semi[i];
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

	var A = [];
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
			//A[j]=[];
			for (k = b[0]; k < b[1]; k++) {
				xtarget = xlim[0] + j * x_width;
				ytarget = ylim[0] + k * y_width;
				if (polygons[i].pip(xtarget, ytarget)) {
					//A[j][k] = kriging.predict(xtarget,ytarget,variogram);
					A.push(kriging.predict(xtarget, ytarget, variogram));
				}

			}
		}
	}
	return {
		grid : A,
		n : a[1],
		m : b[1],
		xlim : xlim,
		ylim : ylim,
		zlim : [variogram.t.min(), variogram.t.max()],
		x_width : x_width,
		y_width : y_width
	};
};
//克里金生成矢量等值面
kriging.contour = function (grid_metedate, breaks) {
	let grid = grid_metedate.grid;
	var n = grid_metedate.n;
	var m = grid_metedate.m;
	//像素坐标系的等值面
	var _contours = d3Contour.contours()
		.size([n, m])
		.thresholds(breaks)
		(grid);
	//像素坐标系换算地理坐标系
	//图形旋转锚点
	let origin = [(grid_metedate.xlim[1] + grid_metedate.xlim[0]) / 2, (grid_metedate.ylim[1] + grid_metedate.ylim[0]) / 2];
	let dataset = {
		"type" : "FeatureCollection",
		"features" : []
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
											type : 'Point',
											coordinates : _coor
										};
										_coor = rotate(pt, Math.PI / 2, origin);
										return _coor;
									});
									return _ring;
								});
						dataset.features.push({
							"type" : "Feature",
							"properties" : {
								"level" : contour.value
							},
							"geometry" : {
								"type" : "Polygon",
								"coordinates" : _polygon
							}
						});
					});
		});
	return dataset;
};

/*
featureCollection:已有点数据，geojson格式
weight:插值所依赖的圈中字段
krigingParams:克里金插值参数设置
breaks:等值面间隔
clip_geom:是否根据提供的切割图形进行等值面切割显示
*/

function kriging_contour(featureCollection,weight,krigingParams,breaks,clip_geom){
    //先获取featureCollection的bbox
    let values=[],lons=[],lats=[];
    let extent=[100000000,100000000,-100000000,-100000000];
    featureCollection.features.forEach(feature => {
        //提取插值权重字段，准备克里金插值使用
        values.push(feature.properties[weight]);
        lons.push(feature.geometry.coordinates[0]);
        lats.push(feature.geometry.coordinates[1]);
        if(extent[0]>feature.geometry.coordinates[0])
            extent[0]=feature.geometry.coordinates[0];
        if(extent[1]>feature.geometry.coordinates[1])
            extent[1]=feature.geometry.coordinates[1];
        if(extent[2]<feature.geometry.coordinates[0])
            extent[2]=feature.geometry.coordinates[0];
        if(extent[3]<feature.geometry.coordinates[1])
            extent[3]=feature.geometry.coordinates[1];
    });
    let variogram=kriging.train(values,lons,lats,krigingParams.model,krigingParams.sigma2,krigingParams.alpha);
    let polygons=[[[extent[0],extent[1]],[extent[0],extent[3]],[extent[2],extent[3]],[extent[2],extent[1]],[extent[0],extent[1]]]];
    let grid=kriging.grid(polygons,variogram,(extent[2]-extent[0])/200,(extent[3]-extent[1])/200);
    let contourFeatureCollection=kriging.contour(grid,breaks);
    //是否需要切割
    if(clip_geom){
        let clip_features=contourFeatureCollection.features.map(feature=>{
            return intersect(feature, clip_geom);
        });
        contourFeatureCollection.features=clip_features;
    }
    return contourFeatureCollection;
}

exports.kriging_contour = kriging_contour;

Object.defineProperty(exports, '__esModule', { value: true });

})));
