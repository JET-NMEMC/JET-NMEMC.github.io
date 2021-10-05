!function(t) {
    var e = {};
    function i(n) {
        if (e[n])
            return e[n].exports;
        var r = e[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(r.exports, r, r.exports, i),
        r.l = !0,
        r.exports
    }
    i.m = t,
    i.c = e,
    i.d = function(t, e, n) {
        i.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        })
    }
    ,
    i.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }
    ,
    i.t = function(t, e) {
        if (1 & e && (t = i(t)),
        8 & e)
            return t;
        if (4 & e && "object" == typeof t && t && t.__esModule)
            return t;
        var n = Object.create(null);
        if (i.r(n),
        Object.defineProperty(n, "default", {
            enumerable: !0,
            value: t
        }),
        2 & e && "string" != typeof t)
            for (var r in t)
                i.d(n, r, function(e) {
                    return t[e]
                }
                .bind(null, r));
        return n
    }
    ,
    i.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        }
        : function() {
            return t
        }
        ;
        return i.d(e, "a", e),
        e
    }
    ,
    i.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    ,
    i.p = "",
    i(i.s = 58)
}([function(t, e, i) {
    var n = i(126);
    t.exports = function(t, e, i) {
        var r = null == t ? void 0 : n(t, e);
        return void 0 === r ? i : r
    }
}
, function(t, e, i) {
    "use strict";
    function n(t, e, i) {
        void 0 === i && (i = {});
        var n = {
            type: "Feature"
        };
        return 0 !== i.id && !i.id || (n.id = i.id),
        i.bbox && (n.bbox = i.bbox),
        n.properties = e || {},
        n.geometry = t,
        n
    }
    function r(t, e, i) {
        return void 0 === i && (i = {}),
        n({
            type: "Point",
            coordinates: t
        }, e, i)
    }
    function o(t, e, i) {
        void 0 === i && (i = {});
        for (var r = 0, o = t; r < o.length; r++) {
            var a = o[r];
            if (a.length < 4)
                throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
            for (var s = 0; s < a[a.length - 1].length; s++)
                if (a[a.length - 1][s] !== a[0][s])
                    throw new Error("First and last Position are not equivalent.")
        }
        return n({
            type: "Polygon",
            coordinates: t
        }, e, i)
    }
    function a(t, e, i) {
        if (void 0 === i && (i = {}),
        t.length < 2)
            throw new Error("coordinates must be an array of two or more positions");
        return n({
            type: "LineString",
            coordinates: t
        }, e, i)
    }
    function s(t, e) {
        void 0 === e && (e = {});
        var i = {
            type: "FeatureCollection"
        };
        return e.id && (i.id = e.id),
        e.bbox && (i.bbox = e.bbox),
        i.features = t,
        i
    }
    function l(t, e, i) {
        return void 0 === i && (i = {}),
        n({
            type: "MultiLineString",
            coordinates: t
        }, e, i)
    }
    function c(t, e, i) {
        return void 0 === i && (i = {}),
        n({
            type: "MultiPoint",
            coordinates: t
        }, e, i)
    }
    function h(t, e, i) {
        return void 0 === i && (i = {}),
        n({
            type: "MultiPolygon",
            coordinates: t
        }, e, i)
    }
    function p(t, i) {
        void 0 === i && (i = "kilometers");
        var n = e.factors[i];
        if (!n)
            throw new Error(i + " units is invalid");
        return t * n
    }
    function u(t, i) {
        void 0 === i && (i = "kilometers");
        var n = e.factors[i];
        if (!n)
            throw new Error(i + " units is invalid");
        return t / n
    }
    function d(t) {
        return t % (2 * Math.PI) * 180 / Math.PI
    }
    function f(t) {
        return !isNaN(t) && null !== t && !Array.isArray(t) && !/^\s*$/.test(t)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.earthRadius = 6371008.8,
    e.factors = {
        centimeters: 100 * e.earthRadius,
        centimetres: 100 * e.earthRadius,
        degrees: e.earthRadius / 111325,
        feet: 3.28084 * e.earthRadius,
        inches: 39.37 * e.earthRadius,
        kilometers: e.earthRadius / 1e3,
        kilometres: e.earthRadius / 1e3,
        meters: e.earthRadius,
        metres: e.earthRadius,
        miles: e.earthRadius / 1609.344,
        millimeters: 1e3 * e.earthRadius,
        millimetres: 1e3 * e.earthRadius,
        nauticalmiles: e.earthRadius / 1852,
        radians: 1,
        yards: e.earthRadius / 1.0936
    },
    e.unitsFactors = {
        centimeters: 100,
        centimetres: 100,
        degrees: 1 / 111325,
        feet: 3.28084,
        inches: 39.37,
        kilometers: .001,
        kilometres: .001,
        meters: 1,
        metres: 1,
        miles: 1 / 1609.344,
        millimeters: 1e3,
        millimetres: 1e3,
        nauticalmiles: 1 / 1852,
        radians: 1 / e.earthRadius,
        yards: 1 / 1.0936
    },
    e.areaFactors = {
        acres: 247105e-9,
        centimeters: 1e4,
        centimetres: 1e4,
        feet: 10.763910417,
        inches: 1550.003100006,
        kilometers: 1e-6,
        kilometres: 1e-6,
        meters: 1,
        metres: 1,
        miles: 386e-9,
        millimeters: 1e6,
        millimetres: 1e6,
        yards: 1.195990046
    },
    e.feature = n,
    e.geometry = function(t, e, i) {
        switch (void 0 === i && (i = {}),
        t) {
        case "Point":
            return r(e).geometry;
        case "LineString":
            return a(e).geometry;
        case "Polygon":
            return o(e).geometry;
        case "MultiPoint":
            return c(e).geometry;
        case "MultiLineString":
            return l(e).geometry;
        case "MultiPolygon":
            return h(e).geometry;
        default:
            throw new Error(t + " is invalid")
        }
    }
    ,
    e.point = r,
    e.points = function(t, e, i) {
        return void 0 === i && (i = {}),
        s(t.map((function(t) {
            return r(t, e)
        }
        )), i)
    }
    ,
    e.polygon = o,
    e.polygons = function(t, e, i) {
        return void 0 === i && (i = {}),
        s(t.map((function(t) {
            return o(t, e)
        }
        )), i)
    }
    ,
    e.lineString = a,
    e.lineStrings = function(t, e, i) {
        return void 0 === i && (i = {}),
        s(t.map((function(t) {
            return a(t, e)
        }
        )), i)
    }
    ,
    e.featureCollection = s,
    e.multiLineString = l,
    e.multiPoint = c,
    e.multiPolygon = h,
    e.geometryCollection = function(t, e, i) {
        return void 0 === i && (i = {}),
        n({
            type: "GeometryCollection",
            geometries: t
        }, e, i)
    }
    ,
    e.round = function(t, e) {
        if (void 0 === e && (e = 0),
        e && !(0 <= e))
            throw new Error("precision must be a positive number");
        var i = Math.pow(10, e || 0);
        return Math.round(t * i) / i
    }
    ,
    e.radiansToLength = p,
    e.lengthToRadians = u,
    e.lengthToDegrees = function(t, e) {
        return d(u(t, e))
    }
    ,
    e.bearingToAzimuth = function(t) {
        var e = t % 360;
        return e < 0 && (e += 360),
        e
    }
    ,
    e.radiansToDegrees = d,
    e.degreesToRadians = function(t) {
        return t % 360 * Math.PI / 180
    }
    ,
    e.convertLength = function(t, e, i) {
        if (void 0 === e && (e = "kilometers"),
        void 0 === i && (i = "kilometers"),
        !(0 <= t))
            throw new Error("length must be a positive number");
        return p(u(t, e), i)
    }
    ,
    e.convertArea = function(t, i, n) {
        if (void 0 === i && (i = "meters"),
        void 0 === n && (n = "kilometers"),
        !(0 <= t))
            throw new Error("area must be a positive number");
        var r = e.areaFactors[i];
        if (!r)
            throw new Error("invalid original units");
        var o = e.areaFactors[n];
        if (!o)
            throw new Error("invalid final units");
        return t / r * o
    }
    ,
    e.isNumber = f,
    e.isObject = function(t) {
        return !!t && t.constructor === Object
    }
    ,
    e.validateBBox = function(t) {
        if (!t)
            throw new Error("bbox is required");
        if (!Array.isArray(t))
            throw new Error("bbox must be an Array");
        if (4 !== t.length && 6 !== t.length)
            throw new Error("bbox must be an Array of 4 or 6 numbers");
        t.forEach((function(t) {
            if (!f(t))
                throw new Error("bbox must only contain numbers")
        }
        ))
    }
    ,
    e.validateId = function(t) {
        if (!t)
            throw new Error("id is required");
        if (-1 === ["string", "number"].indexOf(typeof t))
            throw new Error("id must be a number or a string")
    }
    ,
    e.radians2degrees = function() {
        throw new Error("method has been renamed to `radiansToDegrees`")
    }
    ,
    e.degrees2radians = function() {
        throw new Error("method has been renamed to `degreesToRadians`")
    }
    ,
    e.distanceToDegrees = function() {
        throw new Error("method has been renamed to `lengthToDegrees`")
    }
    ,
    e.distanceToRadians = function() {
        throw new Error("method has been renamed to `lengthToRadians`")
    }
    ,
    e.radiansToDistance = function() {
        throw new Error("method has been renamed to `radiansToLength`")
    }
    ,
    e.bearingToAngle = function() {
        throw new Error("method has been renamed to `bearingToAzimuth`")
    }
    ,
    e.convertDistance = function() {
        throw new Error("method has been renamed to `convertLength`")
    }
}
, function(t, e) {
    t.exports = function(t) {
        var e = typeof t;
        return null != t && ("object" == e || "function" == e)
    }
}
, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = i(1);
    function r(t, e, i, n, r, o, a, s) {
        var l, c, h, p, u = {
            x: null,
            y: null,
            onLine1: !1,
            onLine2: !1
        };
        return 0 == (l = (s - o) * (i - t) - (a - r) * (n - e)) ? null !== u.x && null !== u.y && u : (p = (i - t) * (c = e - o) - (n - e) * (h = t - r),
        c = ((a - r) * c - (s - o) * h) / l,
        h = p / l,
        u.x = t + c * (i - t),
        u.y = e + c * (n - e),
        0 <= c && c <= 1 && (u.onLine1 = !0),
        0 <= h && h <= 1 && (u.onLine2 = !0),
        !(!u.onLine1 || !u.onLine2) && [u.x, u.y])
    }
    e.default = function(t) {
        var e, i, o = {
            type: "FeatureCollection",
            features: []
        };
        if ("LineString" === (i = "Feature" === t.type ? t.geometry : t).type)
            e = [i.coordinates];
        else if ("MultiLineString" === i.type)
            e = i.coordinates;
        else if ("MultiPolygon" === i.type)
            e = [].concat.apply([], i.coordinates);
        else {
            if ("Polygon" !== i.type)
                throw new Error("Input must be a LineString, MultiLineString, Polygon, or MultiPolygon Feature or Geometry");
            e = i.coordinates
        }
        return e.forEach((function(t) {
            e.forEach((function(e) {
                for (var i = 0; i < t.length - 1; i++)
                    for (var a = i; a < e.length - 1; a++) {
                        if (t === e) {
                            if (1 === Math.abs(i - a))
                                continue;
                            if (0 === i && a === t.length - 2 && t[i][0] === t[t.length - 1][0] && t[i][1] === t[t.length - 1][1])
                                continue
                        }
                        var s = r(t[i][0], t[i][1], t[i + 1][0], t[i + 1][1], e[a][0], e[a][1], e[a + 1][0], e[a + 1][1]);
                        s && o.features.push(n.point([s[0], s[1]]))
                    }
            }
            ))
        }
        )),
        o
    }
}
, function(t, e, i) {
    var n = i(28)
      , r = "object" == typeof self && self && self.Object === Object && self
      , o = n || r || Function("return this")();
    t.exports = o
}
, function(t, e) {
    t.exports = function(t) {
        return null != t && "object" == typeof t
    }
}
, function(t, e) {
    var i = Array.isArray;
    t.exports = i
}
, function(t, e, i) {
    var n = i(16)
      , r = i(74)
      , o = i(75)
      , a = n ? n.toStringTag : void 0;
    t.exports = function(t) {
        return null == t ? void 0 === t ? "[object Undefined]" : "[object Null]" : a && a in Object(t) ? r(t) : o(t)
    }
}
, function(t, e, i) {
    var n = i(62)
      , r = i(63)
      , o = i(64)
      , a = i(65)
      , s = i(66);
    function l(t) {
        var e = -1
          , i = null == t ? 0 : t.length;
        for (this.clear(); ++e < i; ) {
            var n = t[e];
            this.set(n[0], n[1])
        }
    }
    l.prototype.clear = n,
    l.prototype.delete = r,
    l.prototype.get = o,
    l.prototype.has = a,
    l.prototype.set = s,
    t.exports = l
}
, function(t, e, i) {
    var n = i(10);
    t.exports = function(t, e) {
        for (var i = t.length; i--; )
            if (n(t[i][0], e))
                return i;
        return -1
    }
}
, function(t, e) {
    t.exports = function(t, e) {
        return t === e || t != t && e != e
    }
}
, function(t, e, i) {
    var n = i(14)(Object, "create");
    t.exports = n
}
, function(t, e, i) {
    var n = i(88);
    t.exports = function(t, e) {
        var i = t.__data__;
        return n(e) ? i["string" == typeof e ? "string" : "hash"] : i.map
    }
}
, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = i(1);
    e.getCoord = function(t) {
        if (!t)
            throw new Error("coord is required");
        if (!Array.isArray(t)) {
            if ("Feature" === t.type && null !== t.geometry && "Point" === t.geometry.type)
                return t.geometry.coordinates;
            if ("Point" === t.type)
                return t.coordinates
        }
        if (Array.isArray(t) && 2 <= t.length && !Array.isArray(t[0]) && !Array.isArray(t[1]))
            return t;
        throw new Error("coord must be GeoJSON Point or an Array of numbers")
    }
    ,
    e.getCoords = function(t) {
        if (Array.isArray(t))
            return t;
        if ("Feature" === t.type) {
            if (null !== t.geometry)
                return t.geometry.coordinates
        } else if (t.coordinates)
            return t.coordinates;
        throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array")
    }
    ,
    e.containsNumber = function t(e) {
        if (1 < e.length && n.isNumber(e[0]) && n.isNumber(e[1]))
            return !0;
        if (Array.isArray(e[0]) && e[0].length)
            return t(e[0]);
        throw new Error("coordinates must only contain numbers")
    }
    ,
    e.geojsonType = function(t, e, i) {
        if (!e || !i)
            throw new Error("type and name required");
        if (!t || t.type !== e)
            throw new Error("Invalid input to " + i + ": must be a " + e + ", given " + t.type)
    }
    ,
    e.featureOf = function(t, e, i) {
        if (!t)
            throw new Error("No feature passed");
        if (!i)
            throw new Error(".featureOf() requires a name");
        if (!t || "Feature" !== t.type || !t.geometry)
            throw new Error("Invalid input to " + i + ", Feature with geometry required");
        if (!t.geometry || t.geometry.type !== e)
            throw new Error("Invalid input to " + i + ": must be a " + e + ", given " + t.geometry.type)
    }
    ,
    e.collectionOf = function(t, e, i) {
        if (!t)
            throw new Error("No featureCollection passed");
        if (!i)
            throw new Error(".collectionOf() requires a name");
        if (!t || "FeatureCollection" !== t.type)
            throw new Error("Invalid input to " + i + ", FeatureCollection required");
        for (var n = 0, r = t.features; n < r.length; n++) {
            var o = r[n];
            if (!o || "Feature" !== o.type || !o.geometry)
                throw new Error("Invalid input to " + i + ", Feature with geometry required");
            if (!o.geometry || o.geometry.type !== e)
                throw new Error("Invalid input to " + i + ": must be a " + e + ", given " + o.geometry.type)
        }
    }
    ,
    e.getGeom = function(t) {
        return "Feature" === t.type ? t.geometry : t
    }
    ,
    e.getType = function(t, e) {
        return "FeatureCollection" === t.type ? "FeatureCollection" : "GeometryCollection" === t.type ? "GeometryCollection" : "Feature" === t.type && null !== t.geometry ? t.geometry.type : t.type
    }
}
, function(t, e, i) {
    var n = i(72)
      , r = i(79);
    t.exports = function(t, e) {
        var i = r(t, e);
        return n(i) ? i : void 0
    }
}
, function(t, e, i) {
    var n = i(7)
      , r = i(2);
    t.exports = function(t) {
        if (!r(t))
            return !1;
        var e = n(t);
        return "[object Function]" == e || "[object GeneratorFunction]" == e || "[object AsyncFunction]" == e || "[object Proxy]" == e
    }
}
, function(t, e, i) {
    var n = i(4).Symbol;
    t.exports = n
}
, function(t, e, i) {
    var n = i(31);
    t.exports = function(t, e, i) {
        "__proto__" == e && n ? n(t, e, {
            configurable: !0,
            enumerable: !0,
            value: i,
            writable: !0
        }) : t[e] = i
    }
}
, function(t, e) {
    t.exports = function(t) {
        return t.webpackPolyfill || (t.deprecate = function() {}
        ,
        t.paths = [],
        t.children || (t.children = []),
        Object.defineProperty(t, "loaded", {
            enumerable: !0,
            get: function() {
                return t.l
            }
        }),
        Object.defineProperty(t, "id", {
            enumerable: !0,
            get: function() {
                return t.i
            }
        }),
        t.webpackPolyfill = 1),
        t
    }
}
, function(t, e, i) {
    var n = i(103)
      , r = i(5)
      , o = Object.prototype
      , a = o.hasOwnProperty
      , s = o.propertyIsEnumerable
      , l = n(function() {
        return arguments
    }()) ? n : function(t) {
        return r(t) && a.call(t, "callee") && !s.call(t, "callee")
    }
    ;
    t.exports = l
}
, function(t, e, i) {
    var n = i(15)
      , r = i(21);
    t.exports = function(t) {
        return null != t && r(t.length) && !n(t)
    }
}
, function(t, e) {
    t.exports = function(t) {
        return "number" == typeof t && -1 < t && t % 1 == 0 && t <= 9007199254740991
    }
}
, function(t, e) {
    var i = /^(?:0|[1-9]\d*)$/;
    t.exports = function(t, e) {
        var n = typeof t;
        return !!(e = null == e ? 9007199254740991 : e) && ("number" == n || "symbol" != n && i.test(t)) && -1 < t && t % 1 == 0 && t < e
    }
}
, function(t, e, i) {
    var n = i(7)
      , r = i(5);
    t.exports = function(t) {
        return "symbol" == typeof t || r(t) && "[object Symbol]" == n(t)
    }
}
, function(t, e, i) {
    !function(t) {
        "use strict";
        function e(t, e) {
            return e < t ? 1 : t < e ? -1 : 0
        }
        var i = function(t, i) {
            void 0 === t && (t = e),
            void 0 === i && (i = !1),
            this._compare = t,
            this._root = null,
            this._size = 0,
            this._noDuplicates = !!i
        }
          , n = {
            size: {
                configurable: !0
            }
        };
        i.prototype.rotateLeft = function(t) {
            var e = t.right;
            e && (t.right = e.left,
            e.left && (e.left.parent = t),
            e.parent = t.parent),
            t.parent ? t === t.parent.left ? t.parent.left = e : t.parent.right = e : this._root = e,
            e && (e.left = t),
            t.parent = e
        }
        ,
        i.prototype.rotateRight = function(t) {
            var e = t.left;
            e && (t.left = e.right,
            e.right && (e.right.parent = t),
            e.parent = t.parent),
            t.parent ? t === t.parent.left ? t.parent.left = e : t.parent.right = e : this._root = e,
            e && (e.right = t),
            t.parent = e
        }
        ,
        i.prototype._splay = function(t) {
            for (var e = this; t.parent; ) {
                var i = t.parent;
                i.parent ? i.left === t && i.parent.left === i ? (e.rotateRight(i.parent),
                e.rotateRight(i)) : i.right === t && i.parent.right === i ? (e.rotateLeft(i.parent),
                e.rotateLeft(i)) : i.left === t && i.parent.right === i ? (e.rotateRight(i),
                e.rotateLeft(i)) : (e.rotateLeft(i),
                e.rotateRight(i)) : i.left === t ? e.rotateRight(i) : e.rotateLeft(i)
            }
        }
        ,
        i.prototype.splay = function(t) {
            for (var e, i, n, r, o; t.parent; )
                (i = (e = t.parent).parent) && i.parent ? ((n = i.parent).left === i ? n.left = t : n.right = t,
                t.parent = n) : (t.parent = null,
                this._root = t),
                r = t.left,
                o = t.right,
                t === e.left ? (i && (i.left === e ? (e.right ? (i.left = e.right,
                i.left.parent = i) : i.left = null,
                (e.right = i).parent = e) : (r ? (i.right = r).parent = i : i.right = null,
                (t.left = i).parent = t)),
                o ? (e.left = o).parent = e : e.left = null,
                (t.right = e).parent = t) : (i && (i.right === e ? (e.left ? (i.right = e.left,
                i.right.parent = i) : i.right = null,
                (e.left = i).parent = e) : (o ? (i.left = o).parent = i : i.left = null,
                (t.right = i).parent = t)),
                r ? (e.right = r).parent = e : e.right = null,
                (t.left = e).parent = t)
        }
        ,
        i.prototype.replace = function(t, e) {
            t.parent ? t === t.parent.left ? t.parent.left = e : t.parent.right = e : this._root = e,
            e && (e.parent = t.parent)
        }
        ,
        i.prototype.minNode = function(t) {
            if (void 0 === t && (t = this._root),
            t)
                for (; t.left; )
                    t = t.left;
            return t
        }
        ,
        i.prototype.maxNode = function(t) {
            if (void 0 === t && (t = this._root),
            t)
                for (; t.right; )
                    t = t.right;
            return t
        }
        ,
        i.prototype.insert = function(t, e) {
            var i = this._root
              , n = null
              , r = this._compare;
            if (this._noDuplicates)
                for (; i; ) {
                    if (0 === r((n = i).key, t))
                        return;
                    i = r(i.key, t) < 0 ? i.right : i.left
                }
            else
                for (; i; )
                    i = r((n = i).key, t) < 0 ? i.right : i.left;
            return i = {
                key: t,
                data: e,
                left: null,
                right: null,
                parent: n
            },
            n ? r(n.key, i.key) < 0 ? n.right = i : n.left = i : this._root = i,
            this.splay(i),
            this._size++,
            i
        }
        ,
        i.prototype.find = function(t) {
            for (var e = this._root, i = this._compare; e; ) {
                var n = i(e.key, t);
                if (n < 0)
                    e = e.right;
                else {
                    if (!(0 < n))
                        return e;
                    e = e.left
                }
            }
            return null
        }
        ,
        i.prototype.contains = function(t) {
            for (var e = this._root, i = this._compare; e; ) {
                var n = i(t, e.key);
                if (0 === n)
                    return !0;
                e = n < 0 ? e.left : e.right
            }
            return !1
        }
        ,
        i.prototype.remove = function(t) {
            var e = this.find(t);
            if (!e)
                return !1;
            if (this.splay(e),
            e.left)
                if (e.right) {
                    var i = this.minNode(e.right);
                    i.parent !== e && (this.replace(i, i.right),
                    i.right = e.right,
                    i.right.parent = i),
                    this.replace(e, i),
                    i.left = e.left,
                    i.left.parent = i
                } else
                    this.replace(e, e.left);
            else
                this.replace(e, e.right);
            return this._size--,
            !0
        }
        ,
        i.prototype.removeNode = function(t) {
            if (!t)
                return !1;
            if (this.splay(t),
            t.left)
                if (t.right) {
                    var e = this.minNode(t.right);
                    e.parent !== t && (this.replace(e, e.right),
                    e.right = t.right,
                    e.right.parent = e),
                    this.replace(t, e),
                    e.left = t.left,
                    e.left.parent = e
                } else
                    this.replace(t, t.left);
            else
                this.replace(t, t.right);
            return this._size--,
            !0
        }
        ,
        i.prototype.erase = function(t) {
            var e = this.find(t);
            if (e) {
                this.splay(e);
                var i = e.left
                  , n = e.right
                  , r = null;
                i && (i.parent = null,
                r = this.maxNode(i),
                this.splay(r),
                this._root = r),
                n && (i ? r.right = n : this._root = n,
                n.parent = r),
                this._size--
            }
        }
        ,
        i.prototype.pop = function() {
            var t = this._root
              , e = null;
            if (t) {
                for (; t.left; )
                    t = t.left;
                e = {
                    key: t.key,
                    data: t.data
                },
                this.remove(t.key)
            }
            return e
        }
        ,
        i.prototype.next = function(t) {
            var e = t;
            if (e)
                if (e.right)
                    for (e = e.right; e && e.left; )
                        e = e.left;
                else
                    for (e = t.parent; e && e.right === t; )
                        e = (t = e).parent;
            return e
        }
        ,
        i.prototype.prev = function(t) {
            var e = t;
            if (e)
                if (e.left)
                    for (e = e.left; e && e.right; )
                        e = e.right;
                else
                    for (e = t.parent; e && e.left === t; )
                        e = (t = e).parent;
            return e
        }
        ,
        i.prototype.forEach = function(t) {
            for (var e = this._root, i = [], n = !1, r = 0; !n; )
                e ? (i.push(e),
                e = e.left) : 0 < i.length ? (t(e = i.pop(), r++),
                e = e.right) : n = !0;
            return this
        }
        ,
        i.prototype.range = function(t, e, i, n) {
            for (var r = [], o = this._compare, a = this._root; 0 !== r.length || a; )
                if (a)
                    r.push(a),
                    a = a.left;
                else {
                    if (0 < o((a = r.pop()).key, e))
                        break;
                    if (0 <= o(a.key, t) && i.call(n, a))
                        return this;
                    a = a.right
                }
            return this
        }
        ,
        i.prototype.keys = function() {
            for (var t = this._root, e = [], i = [], n = !1; !n; )
                t ? (e.push(t),
                t = t.left) : 0 < e.length ? (t = e.pop(),
                i.push(t.key),
                t = t.right) : n = !0;
            return i
        }
        ,
        i.prototype.values = function() {
            for (var t = this._root, e = [], i = [], n = !1; !n; )
                t ? (e.push(t),
                t = t.left) : 0 < e.length ? (t = e.pop(),
                i.push(t.data),
                t = t.right) : n = !0;
            return i
        }
        ,
        i.prototype.at = function(t) {
            for (var e = this._root, i = [], n = !1, r = 0; !n; )
                if (e)
                    i.push(e),
                    e = e.left;
                else if (0 < i.length) {
                    if (e = i.pop(),
                    r === t)
                        return e;
                    r++,
                    e = e.right
                } else
                    n = !0;
            return null
        }
        ,
        i.prototype.load = function(t, e, i) {
            if (void 0 === t && (t = []),
            void 0 === e && (e = []),
            void 0 === i && (i = !1),
            0 !== this._size)
                throw new Error("bulk-load: tree is not empty");
            var n = t.length;
            return i && function t(e, i, n, r, o) {
                if (!(r <= n)) {
                    for (var a = e[n + r >> 1], s = n - 1, l = r + 1; ; ) {
                        for (; o(e[++s], a) < 0; )
                            ;
                        for (; 0 < o(e[--l], a); )
                            ;
                        if (l <= s)
                            break;
                        var c = e[s];
                        e[s] = e[l],
                        e[l] = c,
                        c = i[s],
                        i[s] = i[l],
                        i[l] = c
                    }
                    t(e, i, n, l, o),
                    t(e, i, l + 1, r, o)
                }
            }(t, e, 0, n - 1, this._compare),
            this._root = function t(e, i, n, r, o) {
                var a = o - r;
                if (0 < a) {
                    var s = r + Math.floor(a / 2)
                      , l = {
                        key: i[s],
                        data: n[s],
                        parent: e
                    };
                    return l.left = t(l, i, n, r, s),
                    l.right = t(l, i, n, s + 1, o),
                    l
                }
                return null
            }(null, t, e, 0, n),
            this._size = n,
            this
        }
        ,
        i.prototype.min = function() {
            var t = this.minNode(this._root);
            return t ? t.key : null
        }
        ,
        i.prototype.max = function() {
            var t = this.maxNode(this._root);
            return t ? t.key : null
        }
        ,
        i.prototype.isEmpty = function() {
            return null === this._root
        }
        ,
        n.size.get = function() {
            return this._size
        }
        ,
        i.createTree = function(t, e, n, r, o) {
            return new i(n,o).load(t, e, r)
        }
        ,
        Object.defineProperties(i.prototype, n);
        function r(t, e, i) {
            null === e ? (t.inOut = !1,
            t.otherInOut = !0) : (t.isSubject === e.isSubject ? (t.inOut = !e.inOut,
            t.otherInOut = e.otherInOut) : (t.inOut = !e.otherInOut,
            t.otherInOut = e.isVertical() ? !e.inOut : e.inOut),
            e && (t.prevInResult = !o(e, i) || e.isVertical() ? e.prevInResult : e)),
            t.inResult = o(t, i)
        }
        function o(t, e) {
            switch (t.type) {
            case 0:
                switch (e) {
                case 0:
                    return !t.otherInOut;
                case 1:
                    return t.otherInOut;
                case 2:
                    return t.isSubject && t.otherInOut || !t.isSubject && !t.otherInOut;
                case 3:
                    return !0
                }
                break;
            case 2:
                return 0 === e || 1 === e;
            case 3:
                return 2 === e;
            case 1:
                return !1
            }
            return !1
        }
        var a = function(t, e, i, n, r) {
            this.left = e,
            this.point = t,
            this.otherEvent = i,
            this.isSubject = n,
            this.type = r || 0,
            this.inOut = !1,
            this.otherInOut = !1,
            this.prevInResult = null,
            this.inResult = !1,
            this.resultInOut = !1,
            this.isExteriorRing = !0
        };
        function s(t, e) {
            return t[0] === e[0] && t[1] === e[1]
        }
        function l(t, e, i) {
            return (t[0] - i[0]) * (e[1] - i[1]) - (e[0] - i[0]) * (t[1] - i[1])
        }
        function c(t, e) {
            var i = t.point
              , n = e.point;
            return i[0] > n[0] ? 1 : i[0] < n[0] ? -1 : i[1] !== n[1] ? i[1] > n[1] ? 1 : -1 : function(t, e, i, n) {
                return t.left === e.left ? 0 === l(i, t.otherEvent.point, e.otherEvent.point) ? !t.isSubject && e.isSubject ? 1 : -1 : t.isBelow(e.otherEvent.point) ? -1 : 1 : t.left ? 1 : -1
            }(t, e, i)
        }
        function h(t, e, i) {
            var n = new a(e,!1,t,t.isSubject)
              , r = new a(e,!0,t.otherEvent,t.isSubject);
            return s(t.point, t.otherEvent.point) && console.warn("what is that, a collapsed segment?", t),
            n.contourId = r.contourId = t.contourId,
            0 < c(r, t.otherEvent) && (t.otherEvent.left = !0,
            r.left = !1),
            t.otherEvent.otherEvent = r,
            t.otherEvent = n,
            i.push(r),
            i.push(n),
            i
        }
        function p(t, e) {
            return t[0] * e[1] - t[1] * e[0]
        }
        function u(t, e) {
            return t[0] * e[0] + t[1] * e[1]
        }
        function d(t, e, i) {
            var n = function(t, e, i, n, r) {
                var o = [e[0] - t[0], e[1] - t[1]]
                  , a = [n[0] - i[0], n[1] - i[1]];
                function s(t, e, i) {
                    return [t[0] + e * i[0], t[1] + e * i[1]]
                }
                var l = [i[0] - t[0], i[1] - t[1]]
                  , c = p(o, a)
                  , h = c * c
                  , d = u(o, o);
                if (0 < h) {
                    var f = p(l, a) / c;
                    if (f < 0 || 1 < f)
                        return null;
                    var g = p(l, o) / c;
                    return g < 0 || 1 < g ? null : 0 == f || 1 == f ? r ? null : [s(t, f, o)] : 0 == g || 1 == g ? r ? null : [s(i, g, a)] : [s(t, f, o)]
                }
                if (0 < (h = (c = p(l, o)) * c))
                    return null;
                var m = u(o, l) / d
                  , y = m + u(o, a) / d
                  , _ = Math.min(m, y)
                  , v = Math.max(m, y);
                return _ <= 1 && 0 <= v ? 1 === _ ? r ? null : [s(t, 0 < _ ? _ : 0, o)] : 0 === v ? r ? null : [s(t, v < 1 ? v : 1, o)] : r && 0 === _ && 1 === v ? null : [s(t, 0 < _ ? _ : 0, o), s(t, v < 1 ? v : 1, o)] : null
            }(t.point, t.otherEvent.point, e.point, e.otherEvent.point)
              , r = n ? n.length : 0;
            if (0 === r)
                return 0;
            if (1 === r && (s(t.point, e.point) || s(t.otherEvent.point, e.otherEvent.point)))
                return 0;
            if (2 === r && t.isSubject === e.isSubject)
                return 0;
            if (1 === r)
                return s(t.point, n[0]) || s(t.otherEvent.point, n[0]) || h(t, n[0], i),
                s(e.point, n[0]) || s(e.otherEvent.point, n[0]) || h(e, n[0], i),
                1;
            var o = []
              , a = !1
              , l = !1;
            return s(t.point, e.point) ? a = !0 : 1 === c(t, e) ? o.push(e, t) : o.push(t, e),
            s(t.otherEvent.point, e.otherEvent.point) ? l = !0 : 1 === c(t.otherEvent, e.otherEvent) ? o.push(e.otherEvent, t.otherEvent) : o.push(t.otherEvent, e.otherEvent),
            a && l || a ? (e.type = 1,
            t.type = e.inOut === t.inOut ? 2 : 3,
            a && !l && h(o[1].otherEvent, o[0].point, i),
            2) : (l ? h(o[0], o[1].point, i) : o[0] !== o[3].otherEvent ? (h(o[0], o[1].point, i),
            h(o[1], o[2].point, i)) : (h(o[0], o[1].point, i),
            h(o[3].otherEvent, o[2].point, i)),
            3)
        }
        function f(t, e) {
            if (t === e)
                return 0;
            if (0 !== l(t.point, t.otherEvent.point, e.point) || 0 !== l(t.point, t.otherEvent.point, e.otherEvent.point))
                return s(t.point, e.point) ? t.isBelow(e.otherEvent.point) ? -1 : 1 : t.point[0] === e.point[0] ? t.point[1] < e.point[1] ? -1 : 1 : 1 === c(t, e) ? e.isAbove(t.point) ? -1 : 1 : t.isBelow(e.point) ? -1 : 1;
            if (t.isSubject !== e.isSubject)
                return t.isSubject ? -1 : 1;
            var i = t.point
              , n = e.point;
            return i[0] === n[0] && i[1] === n[1] ? (i = t.otherEvent.point,
            n = e.otherEvent.point,
            i[0] === n[0] && i[1] === n[1] ? 0 : t.contourId > e.contourId ? 1 : -1) : 1 === c(t, e) ? 1 : -1
        }
        function g(t, e, i, n) {
            var r = t + 1
              , o = e.length;
            if (o - 1 < r)
                return t - 1;
            for (var a = e[t].point, s = e[r].point; r < o && s[0] === a[0] && s[1] === a[1]; ) {
                if (!i[r])
                    return r;
                s = e[++r].point
            }
            for (r = t - 1; i[r] && n <= r; )
                r--;
            return r
        }
        a.prototype.isBelow = function(t) {
            var e = this.point
              , i = this.otherEvent.point;
            return this.left ? 0 < (e[0] - t[0]) * (i[1] - t[1]) - (i[0] - t[0]) * (e[1] - t[1]) : 0 < (i[0] - t[0]) * (e[1] - t[1]) - (e[0] - t[0]) * (i[1] - t[1])
        }
        ,
        a.prototype.isAbove = function(t) {
            return !this.isBelow(t)
        }
        ,
        a.prototype.isVertical = function() {
            return this.point[0] === this.otherEvent.point[0]
        }
        ,
        a.prototype.clone = function() {
            var t = new a(this.point,this.left,this.otherEvent,this.isSubject,this.type);
            return t.inResult = this.inResult,
            t.prevInResult = this.prevInResult,
            t.isExteriorRing = this.isExteriorRing,
            t.inOut = this.inOut,
            t.otherInOut = this.otherInOut,
            t
        }
        ;
        var m = _
          , y = _;
        function _(t, e) {
            if (!(this instanceof _))
                return new _(t,e);
            if (this.data = t || [],
            this.length = this.data.length,
            this.compare = e || v,
            0 < this.length)
                for (var i = (this.length >> 1) - 1; 0 <= i; i--)
                    this._down(i)
        }
        function v(t, e) {
            return t < e ? -1 : e < t ? 1 : 0
        }
        _.prototype = {
            push: function(t) {
                this.data.push(t),
                this.length++,
                this._up(this.length - 1)
            },
            pop: function() {
                if (0 !== this.length) {
                    var t = this.data[0];
                    return this.length--,
                    0 < this.length && (this.data[0] = this.data[this.length],
                    this._down(0)),
                    this.data.pop(),
                    t
                }
            },
            peek: function() {
                return this.data[0]
            },
            _up: function(t) {
                for (var e = this.data, i = this.compare, n = e[t]; 0 < t; ) {
                    var r = t - 1 >> 1
                      , o = e[r];
                    if (0 <= i(n, o))
                        break;
                    e[t] = o,
                    t = r
                }
                e[t] = n
            },
            _down: function(t) {
                for (var e = this.data, i = this.compare, n = this.length >> 1, r = e[t]; t < n; ) {
                    var o = 1 + (t << 1)
                      , a = o + 1
                      , s = e[o];
                    if (a < this.length && i(e[a], s) < 0 && (s = e[o = a]),
                    0 <= i(s, r))
                        break;
                    e[t] = s,
                    t = o
                }
                e[t] = r
            }
        },
        m.default = y;
        var L = Math.max
          , k = Math.min
          , b = 0;
        function M(t, e, i, n, r, o) {
            var s, l, h, p, u, d;
            for (s = 0,
            l = t.length - 1; s < l; s++)
                if (h = t[s],
                p = t[s + 1],
                u = new a(h,!1,void 0,e),
                d = new a(p,!1,u,e),
                u.otherEvent = d,
                h[0] !== p[0] || h[1] !== p[1]) {
                    u.contourId = d.contourId = i,
                    o || (u.isExteriorRing = !1,
                    d.isExteriorRing = !1),
                    0 < c(u, d) ? d.left = !0 : u.left = !0;
                    var f = h[0]
                      , g = h[1];
                    r[0] = k(r[0], f),
                    r[1] = k(r[1], g),
                    r[2] = L(r[2], f),
                    r[3] = L(r[3], g),
                    n.push(u),
                    n.push(d)
                }
        }
        var E = [];
        function w(t, e, n) {
            "number" == typeof t[0][0][0] && (t = [t]),
            "number" == typeof e[0][0][0] && (e = [e]);
            var o = function(t, e, i) {
                var n = null;
                return t.length * e.length == 0 && (0 === i ? n = E : 2 === i ? n = t : 1 !== i && 3 !== i || (n = 0 === t.length ? e : t)),
                n
            }(t, e, n);
            if (o)
                return o === E ? null : o;
            var a = [1 / 0, 1 / 0, -1 / 0, -1 / 0]
              , s = [1 / 0, 1 / 0, -1 / 0, -1 / 0]
              , l = function(t, e, i, n, r) {
                var o, a, s, l, h, p, u = new m(null,c);
                for (s = 0,
                l = t.length; s < l; s++)
                    for (h = 0,
                    p = (o = t[s]).length; h < p; h++)
                        (a = 0 === h) && b++,
                        M(o[h], !0, b, u, i, a);
                for (s = 0,
                l = e.length; s < l; s++)
                    for (h = 0,
                    p = (o = e[s]).length; h < p; h++)
                        a = 0 === h,
                        2 === r && (a = !1),
                        a && b++,
                        M(o[h], !1, b, u, n, a);
                return u
            }(t, e, a, s, n);
            return (o = function(t, e, i, n, r) {
                var o = null;
                return (i[0] > n[2] || n[0] > i[2] || i[1] > n[3] || n[1] > i[3]) && (0 === r ? o = E : 2 === r ? o = t : 1 !== r && 3 !== r || (o = t.concat(e))),
                o
            }(t, e, a, s, n)) ? o === E ? null : o : function(t, e) {
                var i, n, r, o = function(t) {
                    var e, i, n, r, o = [];
                    for (i = 0,
                    n = t.length; i < n; i++)
                        ((e = t[i]).left && e.inResult || !e.left && e.otherEvent.inResult) && o.push(e);
                    for (var a = !1; !a; )
                        for (a = !0,
                        i = 0,
                        n = o.length; i < n; i++)
                            i + 1 < n && 1 === c(o[i], o[i + 1]) && (r = o[i],
                            o[i] = o[i + 1],
                            o[i + 1] = r,
                            a = !1);
                    for (i = 0,
                    n = o.length; i < n; i++)
                        (e = o[i]).pos = i;
                    for (i = 0,
                    n = o.length; i < n; i++)
                        (e = o[i]).left || (r = e.pos,
                        e.pos = e.otherEvent.pos,
                        e.otherEvent.pos = r);
                    return o
                }(t), a = {}, s = [];
                for (i = 0,
                n = o.length; i < n; i++)
                    if (!a[i]) {
                        var l = [[]];
                        o[i].isExteriorRing ? 2 === e && !o[i].isSubject && 1 < s.length ? s[s.length - 1].push(l[0]) : s.push(l) : 2 !== e || o[i].isSubject || 0 !== s.length ? 0 === s.length ? s.push([[l]]) : s[s.length - 1].push(l[0]) : s.push(l);
                        var h = s.length - 1
                          , p = i
                          , u = o[i].point;
                        for (l[0].push(u); i <= p; )
                            r = o[p],
                            a[p] = !0,
                            r.left ? (r.resultInOut = !1,
                            r.contourId = h) : (r.otherEvent.resultInOut = !0,
                            r.otherEvent.contourId = h),
                            a[p = r.pos] = !0,
                            l[0].push(o[p].point),
                            p = g(p, o, a, i);
                        r = o[p = -1 === p ? i : p],
                        a[p] = a[r.pos] = !0,
                        r.otherEvent.resultInOut = !0,
                        r.otherEvent.contourId = h
                    }
                return s
            }(function(t, e, n, o, a, s) {
                for (var l, c, h, p = new i(f), u = [], g = Math.min(o[2], a[2]); 0 !== t.length; ) {
                    var m = t.pop();
                    if (u.push(m),
                    0 === s && m.point[0] > g || 2 === s && m.point[0] > o[2])
                        break;
                    if (m.left) {
                        c = l = p.insert(m),
                        l = l !== (h = p.minNode()) ? p.prev(l) : null,
                        c = p.next(c);
                        var y = l ? l.key : null;
                        if (r(m, y, s),
                        c && 2 === d(m, c.key, t) && (r(m, y, s),
                        r(m, c.key, s)),
                        l && 2 === d(l.key, m, t)) {
                            var _ = l;
                            r(y, (_ = _ !== h ? p.prev(_) : null) ? _.key : null, s),
                            r(m, y, s)
                        }
                    } else
                        m = m.otherEvent,
                        c = l = p.find(m),
                        l && c && (l = l !== h ? p.prev(l) : null,
                        c = p.next(c),
                        p.remove(m),
                        c && l && d(l.key, c.key, t))
                }
                return u
            }(l, 0, 0, a, s, n), n)
        }
        var C = {
            UNION: 1,
            DIFFERENCE: 2,
            INTERSECTION: 0,
            XOR: 3
        };
        t.union = function(t, e) {
            return w(t, e, 1)
        }
        ,
        t.diff = function(t, e) {
            return w(t, e, 2)
        }
        ,
        t.xor = function(t, e) {
            return w(t, e, 3)
        }
        ,
        t.intersection = function(t, e) {
            return w(t, e, 0)
        }
        ,
        t.operations = C,
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }(e)
}
, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = i(1);
    function r(t, e, i) {
        if (null !== t)
            for (var n, o, a, s, l, c, h, p, u = 0, d = 0, f = t.type, g = "FeatureCollection" === f, m = "Feature" === f, y = g ? t.features.length : 1, _ = 0; _ < y; _++) {
                l = (p = !!(h = g ? t.features[_].geometry : m ? t.geometry : t) && "GeometryCollection" === h.type) ? h.geometries.length : 1;
                for (var v = 0; v < l; v++) {
                    var L = 0
                      , k = 0;
                    if (null !== (s = p ? h.geometries[v] : h)) {
                        c = s.coordinates;
                        var b = s.type;
                        switch (u = !i || "Polygon" !== b && "MultiPolygon" !== b ? 0 : 1,
                        b) {
                        case null:
                            break;
                        case "Point":
                            if (!1 === e(c, d, _, L, k))
                                return !1;
                            d++,
                            L++;
                            break;
                        case "LineString":
                        case "MultiPoint":
                            for (n = 0; n < c.length; n++) {
                                if (!1 === e(c[n], d, _, L, k))
                                    return !1;
                                d++,
                                "MultiPoint" === b && L++
                            }
                            "LineString" === b && L++;
                            break;
                        case "Polygon":
                        case "MultiLineString":
                            for (n = 0; n < c.length; n++) {
                                for (o = 0; o < c[n].length - u; o++) {
                                    if (!1 === e(c[n][o], d, _, L, k))
                                        return !1;
                                    d++
                                }
                                "MultiLineString" === b && L++,
                                "Polygon" === b && k++
                            }
                            "Polygon" === b && L++;
                            break;
                        case "MultiPolygon":
                            for (n = 0; n < c.length; n++) {
                                for (o = k = 0; o < c[n].length; o++) {
                                    for (a = 0; a < c[n][o].length - u; a++) {
                                        if (!1 === e(c[n][o][a], d, _, L, k))
                                            return !1;
                                        d++
                                    }
                                    k++
                                }
                                L++
                            }
                            break;
                        case "GeometryCollection":
                            for (n = 0; n < s.geometries.length; n++)
                                if (!1 === r(s.geometries[n], e, i))
                                    return !1;
                            break;
                        default:
                            throw new Error("Unknown Geometry Type")
                        }
                    }
                }
            }
    }
    function o(t, e) {
        var i;
        switch (t.type) {
        case "FeatureCollection":
            for (i = 0; i < t.features.length && !1 !== e(t.features[i].properties, i); i++)
                ;
            break;
        case "Feature":
            e(t.properties, 0)
        }
    }
    function a(t, e) {
        if ("Feature" === t.type)
            e(t, 0);
        else if ("FeatureCollection" === t.type)
            for (var i = 0; i < t.features.length && !1 !== e(t.features[i], i); i++)
                ;
    }
    function s(t, e) {
        var i, n, r, o, a, s, l, c, h, p, u = 0, d = "FeatureCollection" === t.type, f = "Feature" === t.type, g = d ? t.features.length : 1;
        for (i = 0; i < g; i++) {
            for (s = d ? t.features[i].geometry : f ? t.geometry : t,
            c = d ? t.features[i].properties : f ? t.properties : {},
            h = d ? t.features[i].bbox : f ? t.bbox : void 0,
            p = d ? t.features[i].id : f ? t.id : void 0,
            a = (l = !!s && "GeometryCollection" === s.type) ? s.geometries.length : 1,
            r = 0; r < a; r++)
                if (null !== (o = l ? s.geometries[r] : s))
                    switch (o.type) {
                    case "Point":
                    case "LineString":
                    case "MultiPoint":
                    case "Polygon":
                    case "MultiLineString":
                    case "MultiPolygon":
                        if (!1 === e(o, u, c, h, p))
                            return !1;
                        break;
                    case "GeometryCollection":
                        for (n = 0; n < o.geometries.length; n++)
                            if (!1 === e(o.geometries[n], u, c, h, p))
                                return !1;
                        break;
                    default:
                        throw new Error("Unknown Geometry Type")
                    }
                else if (!1 === e(null, u, c, h, p))
                    return !1;
            u++
        }
    }
    function l(t, e) {
        s(t, (function(t, i, r, o, a) {
            var s, l = null === t ? null : t.type;
            switch (l) {
            case null:
            case "Point":
            case "LineString":
            case "Polygon":
                return !1 !== e(n.feature(t, r, {
                    bbox: o,
                    id: a
                }), i, 0) && void 0
            }
            switch (l) {
            case "MultiPoint":
                s = "Point";
                break;
            case "MultiLineString":
                s = "LineString";
                break;
            case "MultiPolygon":
                s = "Polygon"
            }
            for (var c = 0; c < t.coordinates.length; c++) {
                var h = {
                    type: s,
                    coordinates: t.coordinates[c]
                };
                if (!1 === e(n.feature(h, r), i, c))
                    return !1
            }
        }
        ))
    }
    function c(t, e) {
        l(t, (function(t, i, o) {
            var a = 0;
            if (t.geometry) {
                var s = t.geometry.type;
                if ("Point" !== s && "MultiPoint" !== s) {
                    var l, c = 0, h = 0, p = 0;
                    return !1 !== r(t, (function(r, s, u, d, f) {
                        if (void 0 === l || c < i || h < d || p < f)
                            return l = r,
                            c = i,
                            h = d,
                            p = f,
                            void (a = 0);
                        var g = n.lineString([l, r], t.properties);
                        if (!1 === e(g, i, o, f, a))
                            return !1;
                        a++,
                        l = r
                    }
                    )) && void 0
                }
            }
        }
        ))
    }
    function h(t, e) {
        if (!t)
            throw new Error("geojson is required");
        l(t, (function(t, i, r) {
            if (null !== t.geometry) {
                var o = t.geometry.type
                  , a = t.geometry.coordinates;
                switch (o) {
                case "LineString":
                    if (!1 === e(t, i, r, 0, 0))
                        return !1;
                    break;
                case "Polygon":
                    for (var s = 0; s < a.length; s++)
                        if (!1 === e(n.lineString(a[s], t.properties), i, r, s))
                            return !1
                }
            }
        }
        ))
    }
    e.coordEach = r,
    e.coordReduce = function(t, e, i, n) {
        var o = i;
        return r(t, (function(t, n, r, a, s) {
            o = 0 === n && void 0 === i ? t : e(o, t, n, r, a, s)
        }
        ), n),
        o
    }
    ,
    e.propEach = o,
    e.propReduce = function(t, e, i) {
        var n = i;
        return o(t, (function(t, r) {
            n = 0 === r && void 0 === i ? t : e(n, t, r)
        }
        )),
        n
    }
    ,
    e.featureEach = a,
    e.featureReduce = function(t, e, i) {
        var n = i;
        return a(t, (function(t, r) {
            n = 0 === r && void 0 === i ? t : e(n, t, r)
        }
        )),
        n
    }
    ,
    e.coordAll = function(t) {
        var e = [];
        return r(t, (function(t) {
            e.push(t)
        }
        )),
        e
    }
    ,
    e.geomEach = s,
    e.geomReduce = function(t, e, i) {
        var n = i;
        return s(t, (function(t, r, o, a, s) {
            n = 0 === r && void 0 === i ? t : e(n, t, r, o, a, s)
        }
        )),
        n
    }
    ,
    e.flattenEach = l,
    e.flattenReduce = function(t, e, i) {
        var n = i;
        return l(t, (function(t, r, o) {
            n = 0 === r && 0 === o && void 0 === i ? t : e(n, t, r, o)
        }
        )),
        n
    }
    ,
    e.segmentEach = c,
    e.segmentReduce = function(t, e, i) {
        var n = i
          , r = !1;
        return c(t, (function(t, o, a, s, l) {
            n = !1 === r && void 0 === i ? t : e(n, t, o, a, s, l),
            r = !0
        }
        )),
        n
    }
    ,
    e.lineEach = h,
    e.lineReduce = function(t, e, i) {
        var n = i;
        return h(t, (function(t, r, o, a) {
            n = 0 === r && void 0 === i ? t : e(n, t, r, o, a)
        }
        )),
        n
    }
    ,
    e.findSegment = function(t, e) {
        if (e = e || {},
        !n.isObject(e))
            throw new Error("options is invalid");
        var i, r = e.featureIndex || 0, o = e.multiFeatureIndex || 0, a = e.geometryIndex || 0, s = e.segmentIndex || 0, l = e.properties;
        switch (t.type) {
        case "FeatureCollection":
            r < 0 && (r = t.features.length + r),
            l = l || t.features[r].properties,
            i = t.features[r].geometry;
            break;
        case "Feature":
            l = l || t.properties,
            i = t.geometry;
            break;
        case "Point":
        case "MultiPoint":
            return null;
        case "LineString":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon":
            i = t;
            break;
        default:
            throw new Error("geojson is invalid")
        }
        if (null === i)
            return null;
        var c = i.coordinates;
        switch (i.type) {
        case "Point":
        case "MultiPoint":
            return null;
        case "LineString":
            return s < 0 && (s = c.length + s - 1),
            n.lineString([c[s], c[s + 1]], l, e);
        case "Polygon":
            return a < 0 && (a = c.length + a),
            s < 0 && (s = c[a].length + s - 1),
            n.lineString([c[a][s], c[a][s + 1]], l, e);
        case "MultiLineString":
            return o < 0 && (o = c.length + o),
            s < 0 && (s = c[o].length + s - 1),
            n.lineString([c[o][s], c[o][s + 1]], l, e);
        case "MultiPolygon":
            return o < 0 && (o = c.length + o),
            a < 0 && (a = c[o].length + a),
            s < 0 && (s = c[o][a].length - s - 1),
            n.lineString([c[o][a][s], c[o][a][s + 1]], l, e)
        }
        throw new Error("geojson is invalid")
    }
    ,
    e.findPoint = function(t, e) {
        if (e = e || {},
        !n.isObject(e))
            throw new Error("options is invalid");
        var i, r = e.featureIndex || 0, o = e.multiFeatureIndex || 0, a = e.geometryIndex || 0, s = e.coordIndex || 0, l = e.properties;
        switch (t.type) {
        case "FeatureCollection":
            r < 0 && (r = t.features.length + r),
            l = l || t.features[r].properties,
            i = t.features[r].geometry;
            break;
        case "Feature":
            l = l || t.properties,
            i = t.geometry;
            break;
        case "Point":
        case "MultiPoint":
            return null;
        case "LineString":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon":
            i = t;
            break;
        default:
            throw new Error("geojson is invalid")
        }
        if (null === i)
            return null;
        var c = i.coordinates;
        switch (i.type) {
        case "Point":
            return n.point(c, l, e);
        case "MultiPoint":
            return o < 0 && (o = c.length + o),
            n.point(c[o], l, e);
        case "LineString":
            return s < 0 && (s = c.length + s),
            n.point(c[s], l, e);
        case "Polygon":
            return a < 0 && (a = c.length + a),
            s < 0 && (s = c[a].length + s),
            n.point(c[a][s], l, e);
        case "MultiLineString":
            return o < 0 && (o = c.length + o),
            s < 0 && (s = c[o].length + s),
            n.point(c[o][s], l, e);
        case "MultiPolygon":
            return o < 0 && (o = c.length + o),
            a < 0 && (a = c[o].length + a),
            s < 0 && (s = c[o][a].length - s),
            n.point(c[o][a][s], l, e)
        }
        throw new Error("geojson is invalid")
    }
}
, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = i(25)
      , r = 6378137;
    function o(t) {
        var e = 0;
        if (t && 0 < t.length) {
            e += Math.abs(a(t[0]));
            for (var i = 1; i < t.length; i++)
                e -= Math.abs(a(t[i]))
        }
        return e
    }
    function a(t) {
        var e, i, n, o, a, l, c = 0, h = t.length;
        if (2 < h) {
            for (l = 0; l < h; l++)
                a = l === h - 2 ? (n = h - 2,
                o = h - 1,
                0) : l === h - 1 ? (n = h - 1,
                o = 0,
                1) : (o = (n = l) + 1,
                l + 2),
                e = t[n],
                i = t[o],
                c += (s(t[a][0]) - s(e[0])) * Math.sin(s(i[1]));
            c = c * r * r / 2
        }
        return c
    }
    function s(t) {
        return t * Math.PI / 180
    }
    e.default = function(t) {
        return n.geomReduce(t, (function(t, e) {
            return t + function(t) {
                var e, i = 0;
                switch (t.type) {
                case "Polygon":
                    return o(t.coordinates);
                case "MultiPolygon":
                    for (e = 0; e < t.coordinates.length; e++)
                        i += o(t.coordinates[e]);
                    return i;
                case "Point":
                case "MultiPoint":
                case "LineString":
                case "MultiLineString":
                    return 0
                }
                return 0
            }(e)
        }
        ), 0)
    }
}
, function(t, e, i) {
    var n = i(14)(i(4), "Map");
    t.exports = n
}
, function(t, e, i) {
    (function(e) {
        var i = "object" == typeof e && e && e.Object === Object && e;
        t.exports = i
    }
    ).call(this, i(73))
}
, function(t, e, i) {
    var n = i(80)
      , r = i(87)
      , o = i(89)
      , a = i(90)
      , s = i(91);
    function l(t) {
        var e = -1
          , i = null == t ? 0 : t.length;
        for (this.clear(); ++e < i; ) {
            var n = t[e];
            this.set(n[0], n[1])
        }
    }
    l.prototype.clear = n,
    l.prototype.delete = r,
    l.prototype.get = o,
    l.prototype.has = a,
    l.prototype.set = s,
    t.exports = l
}
, function(t, e, i) {
    var n = i(17)
      , r = i(10);
    t.exports = function(t, e, i) {
        (void 0 === i || r(t[e], i)) && (void 0 !== i || e in t) || n(t, e, i)
    }
}
, function(t, e, i) {
    var n = i(14)
      , r = function() {
        try {
            var t = n(Object, "defineProperty");
            return t({}, "", {}),
            t
        } catch (t) {}
    }();
    t.exports = r
}
, function(t, e, i) {
    var n = i(102)(Object.getPrototypeOf, Object);
    t.exports = n
}
, function(t, e) {
    var i = Object.prototype;
    t.exports = function(t) {
        var e = t && t.constructor;
        return t === ("function" == typeof e && e.prototype || i)
    }
}
, function(t, e, i) {
    (function(t) {
        var n = i(4)
          , r = i(105)
          , o = e && !e.nodeType && e
          , a = o && "object" == typeof t && t && !t.nodeType && t
          , s = a && a.exports === o ? n.Buffer : void 0
          , l = (s ? s.isBuffer : void 0) || r;
        t.exports = l
    }
    ).call(this, i(18)(t))
}
, function(t, e, i) {
    var n = i(107)
      , r = i(108)
      , o = i(109)
      , a = o && o.isTypedArray
      , s = a ? r(a) : n;
    t.exports = s
}
, function(t, e) {
    t.exports = function(t, e) {
        if (("constructor" !== e || "function" != typeof t[e]) && "__proto__" != e)
            return t[e]
    }
}
, function(t, e, i) {
    var n = i(113)
      , r = i(115)
      , o = i(20);
    t.exports = function(t) {
        return o(t) ? n(t, !0) : r(t)
    }
}
, function(t, e) {
    t.exports = function(t) {
        return t
    }
}
, function(t, e, i) {
    var n = i(6)
      , r = i(127)
      , o = i(128)
      , a = i(131);
    t.exports = function(t, e) {
        return n(t) ? t : r(t, e) ? [t] : o(a(t))
    }
}
, function(t, e, i) {
    var n = i(23);
    t.exports = function(t) {
        if ("string" == typeof t || n(t))
            return t;
        var e = t + "";
        return "0" == e && 1 / t == -1 / 0 ? "-0" : e
    }
}
, function(t) {
    t.exports = JSON.parse('{"a":"2.4.0"}')
}
, function(t, e, i) {
    var n = i(60)
      , r = i(117)((function(t, e, i) {
        n(t, e, i)
    }
    ));
    t.exports = r
}
, function(t) {
    t.exports = JSON.parse('{"tooltips":{"placeMarker":"Click to place marker","firstVertex":"Click to place first vertex","continueLine":"Click to continue drawing","finishLine":"Click any existing marker to finish","finishPoly":"Click first marker to finish","finishRect":"Click to finish","startCircle":"Click to place circle center","finishCircle":"Click to finish circle","placeCircleMarker":"Click to place circle marker"},"actions":{"finish":"Finish","cancel":"Cancel","removeLastVertex":"Remove Last Vertex"},"buttonTitles":{"drawMarkerButton":"Draw Marker","drawPolyButton":"Draw Polygons","drawLineButton":"Draw Polyline","drawCircleButton":"Draw Circle","drawRectButton":"Draw Rectangle","editButton":"Edit Layers","dragButton":"Drag Layers","cutButton":"Cut Layers","deleteButton":"Remove Layers","drawCircleMarkerButton":"Draw Circle Marker","snappingButton":"Snap dragged marker to other layers and vertices","pinningButton":"Pin shared vertices together"}}')
}
, function(t) {
    t.exports = JSON.parse('{"tooltips":{"placeMarker":"Platziere den Marker mit Klick","firstVertex":"Platziere den ersten Marker mit Klick","continueLine":"Klicke, um weiter zu zeichnen","finishLine":"Beende mit Klick auf existierenden Marker","finishPoly":"Beende mit Klick auf ersten Marker","finishRect":"Beende mit Klick","startCircle":"Platziere das Kreiszentrum mit Klick","finishCircle":"Beende den Kreis mit Klick","placeCircleMarker":"Platziere den Kreismarker mit Klick"},"actions":{"finish":"Beenden","cancel":"Abbrechen","removeLastVertex":"Letzten Vertex löschen"},"buttonTitles":{"drawMarkerButton":"Marker zeichnen","drawPolyButton":"Polygon zeichnen","drawLineButton":"Polyline zeichnen","drawCircleButton":"Kreis zeichnen","drawRectButton":"Rechteck zeichnen","editButton":"Layer editieren","dragButton":"Layer bewegen","cutButton":"Layer schneiden","deleteButton":"Layer löschen","drawCircleMarkerButton":"Kreismarker zeichnen"}}')
}
, function(t) {
    t.exports = JSON.parse('{"tooltips":{"placeMarker":"Clicca per posizionare un Marker","firstVertex":"Clicca per posizionare il primo vertice","continueLine":"Clicca per continuare a disegnare","finishLine":"Clicca qualsiasi marker esistente per terminare","finishPoly":"Clicca il primo marker per terminare","finishRect":"Clicca per terminare","startCircle":"Clicca per posizionare il punto centrale del cerchio","finishCircle":"Clicca per terminare il cerchio","placeCircleMarker":"Clicca per posizionare un Marker del cherchio"},"actions":{"finish":"Termina","cancel":"Annulla","removeLastVertex":"Rimuovi l\'ultimo vertice"},"buttonTitles":{"drawMarkerButton":"Disegna Marker","drawPolyButton":"Disegna Poligoni","drawLineButton":"Disegna Polilinea","drawCircleButton":"Disegna Cerchio","drawRectButton":"Disegna Rettangolo","editButton":"Modifica Livelli","dragButton":"Sposta Livelli","cutButton":"Ritaglia Livelli","deleteButton":"Elimina Livelli","drawCircleMarkerButton":"Disegna Marker del Cherchio"}}')
}
, function(t) {
    t.exports = JSON.parse('{"tooltips":{"placeMarker":"Klik untuk menempatkan marker","firstVertex":"Klik untuk menempatkan vertex pertama","continueLine":"Klik untuk meneruskan digitasi","finishLine":"Klik pada sembarang marker yang ada untuk mengakhiri","finishPoly":"Klik marker pertama untuk mengakhiri","finishRect":"Klik untuk mengakhiri","startCircle":"Klik untuk menempatkan titik pusat lingkaran","finishCircle":"Klik untuk mengakhiri lingkaran"},"actions":{"finish":"Selesai","cancel":"Batal","removeLastVertex":"Hilangkan Vertex Terakhir"},"buttonTitles":{"drawMarkerButton":"Digitasi Marker","drawPolyButton":"Digitasi Polygon","drawLineButton":"Digitasi Polyline","drawCircleButton":"Digitasi Lingkaran","drawRectButton":"Digitasi Segi Empat","editButton":"Edit Layer","dragButton":"Geser Layer","cutButton":"Potong Layer","deleteButton":"Hilangkan Layer"}}')
}
, function(t) {
    t.exports = JSON.parse('{"tooltips":{"placeMarker":"Adaugă un punct","firstVertex":"Apasă aici pentru a adăuga primul Vertex","continueLine":"Apasă aici pentru a continua desenul","finishLine":"Apasă pe orice obiect pentru a finisa desenul","finishPoly":"Apasă pe primul obiect pentru a finisa","finishRect":"Apasă pentru a finisa","startCircle":"Apasă pentru a desena un cerc","finishCircle":"Apasă pentru a finisa un cerc","placeCircleMarker":"Adaugă un punct"},"actions":{"finish":"Termină","cancel":"Anulează","removeLastVertex":"Șterge ultimul Vertex"},"buttonTitles":{"drawMarkerButton":"Adaugă o bulină","drawPolyButton":"Desenează un poligon","drawLineButton":"Desenează o linie","drawCircleButton":"Desenează un cerc","drawRectButton":"Desenează un dreptunghi","editButton":"Editează straturile","dragButton":"Mută straturile","cutButton":"Taie straturile","deleteButton":"Șterge straturile","placeCircleMarker":"Adaugă o bulină"}}')
}
, function(t) {
    t.exports = JSON.parse('{"tooltips":{"placeMarker":"Щелкните, чтобы поместить маркер","firstVertex":"Нажмите, чтобы поместить первый объект","continueLine":"Нажмите, чтобы продолжить рисование","finishLine":"Щелкните любой существующий маркер для завершения","finishPoly":"Выберите первую точку, чтобы закончить","finishRect":"Нажмите, чтобы закончить","startCircle":"Нажмите чтобы добавить круг","finishCircle":"Нажмите чтобы закончить круг","placeCircleMarker":"Click to place circle marker"},"actions":{"finish":"Заканчивать","cancel":"Отмена","removeLastVertex":"Удалить последний объект на карте"},"buttonTitles":{"drawMarkerButton":"Добавить маркер","drawPolyButton":"Рисовать полигон","drawLineButton":"Рисовать Полилинию","drawCircleButton":"Рисовать круг","drawRectButton":"Рисовать Прямоугольник","editButton":"Редактировать слой","dragButton":"Перетаскивать слой","cutButton":"Вырезать слой","deleteButton":"Удалить слой","placeCircleMarker":"Щелкните, чтобы поместить маркер"}}')
}
, function(t) {
    t.exports = JSON.parse('{"tooltips":{"placeMarker":"Presiona para colocar un marcador","firstVertex":"Presiona para colocar el primer vértice","continueLine":"Presiona para continuar dibujando","finishLine":"Presiona cualquier marcador existente para finalizar","finishPoly":"Presiona el primer marcador para finalizar","finishRect":"Presiona para finalizar","startCircle":"Presiona para colocar el centro del circulo","finishCircle":"Presiona para finalizar el circulo","placeCircleMarker":"Presiona para colocar un marcador de circulo"},"actions":{"finish":"Finalizar","cancel":"Cancelar","removeLastVertex":"Remover ultimo vértice"},"buttonTitles":{"drawMarkerButton":"Dibujar Marcador","drawPolyButton":"Dibujar Polígono","drawLineButton":"Dibujar Línea","drawCircleButton":"Dibujar Circulo","drawRectButton":"Dibujar Rectángulo","editButton":"Editar Capas","dragButton":"Arrastrar Capas","cutButton":"Cortar Capas","deleteButton":"Remover Capas","drawCircleMarkerButton":"Dibujar Marcador de Circulo"}}')
}
, function(t) {
    t.exports = JSON.parse('{"tooltips":{"placeMarker":"Klik om een marker te plaatsen","firstVertex":"Klik om het eerste punt te plaatsen","continueLine":"Klik om te blijven tekenen","finishLine":"Klik op een bestaand punt om te beëindigen","finishPoly":"Klik op het eerst punt om te beëindigen","finishRect":"Klik om te beëindigen","startCircle":"Klik om het middelpunt te plaatsen","finishCircle":"Klik om de cirkel te beëindigen","placeCircleMarker":"Klik om een marker te plaatsen"},"actions":{"finish":"Bewaar","cancel":"Annuleer","removeLastVertex":"Verwijder laatste punt"},"buttonTitles":{"drawMarkerButton":"Plaats Marker","drawPolyButton":"Teken een vlak","drawLineButton":"Teken een lijn","drawCircleButton":"Teken een cirkel","drawRectButton":"Teken een vierkant","editButton":"Bewerk","dragButton":"Verplaats","cutButton":"Knip","deleteButton":"Verwijder","drawCircleMarkerButton":"Plaats Marker"}}')
}
, function(t) {
    t.exports = JSON.parse('{"tooltips":{"placeMarker":"Cliquez pour placer un marqueur","firstVertex":"Cliquez pour placer le premier sommet","continueLine":"Cliquez pour continuer à dessiner","finishLine":"Cliquez sur n\'importe quel marqueur pour terminer","finishPoly":"Cliquez sur le premier marqueur pour terminer","finishRect":"Cliquez pour terminer","startCircle":"Cliquez pour placer le centre du cercle","finishCircle":"Cliquez pour finir le cercle"},"actions":{"finish":"Terminer","cancel":"Annuler","removeLastVertex":"Retirer le dernier sommet"},"buttonTitles":{"drawMarkerButton":"Placer des marqueurs","drawPolyButton":"Dessiner des polygones","drawLineButton":"Dessiner des polylignes","drawCircleButton":"Dessiner un cercle","drawRectButton":"Dessiner un rectangle","editButton":"Éditer des calques","dragButton":"Déplacer des calques","cutButton":"Couper des calques","deleteButton":"Supprimer des calques"}}')
}
, function(t) {
    t.exports = JSON.parse('{"tooltips":{"placeMarker":"单击放置标记","firstVertex":"单击放置首个顶点","continueLine":"单击继续绘制","finishLine":"单击任何存在的标记以完成","finishPoly":"单击第一个标记以完成","finishRect":"单击完成","startCircle":"单击放置圆心","finishCircle":"单击完成圆形","placeCircleMarker":"单击放置圆形标记"},"actions":{"finish":"完成","cancel":"取消","removeLastVertex":"移除最后的顶点"},"buttonTitles":{"drawMarkerButton":"绘制标记","drawPolyButton":"绘制多边形","drawLineButton":"绘制线段","drawCircleButton":"绘制圆形","drawRectButton":"绘制长方形","editButton":"编辑图层","dragButton":"拖拽图层","cutButton":"剪切图层","deleteButton":"删除图层"}}')
}
, function(t) {
    t.exports = JSON.parse('{"tooltips":{"placeMarker":"Clique para posicionar o marcador","firstVertex":"Clique para posicionar o primeiro vértice","continueLine":"Clique para continuar desenhando","finishLine":"Clique em qualquer marcador existente para finalizar","finishPoly":"Clique no primeiro ponto para fechar o polígono","finishRect":"Clique para finalizar","startCircle":"Clique para posicionar o centro do círculo","finishCircle":"Clique para fechar o círculo"},"actions":{"finish":"Finalizar","cancel":"Cancelar","removeLastVertex":"Remover último vértice"},"buttonTitles":{"drawMarkerButton":"Desenhar um marcador","drawPolyButton":"Desenhar um polígono","drawLineButton":"Desenhar uma polilinha","drawCircleButton":"Desenhar um círculo","drawRectButton":"Desenhar um retângulo","editButton":"Editar camada(s)","dragButton":"Mover camada(s)","cutButton":"Recortar camada(s)","deleteButton":"Remover camada(s)"}}')
}
, function(t) {
    t.exports = JSON.parse('{"tooltips":{"placeMarker":"Kliknij, aby ustawić znacznik","firstVertex":"Kliknij, aby ustawić pierwszy punkt","continueLine":"Kliknij, aby kontynuować rysowanie","finishLine":"Kliknij dowolny punkt, aby zakończyć","finishPoly":"Kliknij pierwszy punkt, aby zakończyć","finishRect":"Kliknij, aby zakończyć","startCircle":"Kliknij, aby ustawić środek koła","finishCircle":"Kliknij, aby zakończyć rysowanie koła","placeCircleMarker":"Kliknij, aby ustawić okrągły znacznik"},"actions":{"finish":"Zakończ","cancel":"Anuluj","removeLastVertex":"Usuń ostatni punkt"},"buttonTitles":{"drawMarkerButton":"Narysuj znacznik","drawPolyButton":"Narysuj wielokąt","drawLineButton":"Narysuj ścieżkę","drawCircleButton":"Narysuj koło","drawRectButton":"Narysuj prostokąt","editButton":"Edytuj","dragButton":"Przesuń","cutButton":"Wytnij","deleteButton":"Usuń","drawCircleMarkerButton":"Narysuj okrągły znacznik"}}')
}
, function(t) {
    t.exports = JSON.parse('{"tooltips":{"placeMarker":"Klicka för att placera punkt","firstVertex":"Klicka för att placera första vertex","continueLine":"Klicka för att fortsätta rita","finishLine":"Klicka på en existerande punkt för att slutföra","finishPoly":"Klicka på den första punkten för att slutföra","finishRect":"Klicka för att slutföra","startCircle":"Klicka för att placera cirkelns centrum","finishCircle":"Klicka för att slutföra cirkeln","placeCircleMarker":"Klicka för att placera cirkelmakör"},"actions":{"finish":"Slutför","cancel":"Avbryt","removeLastVertex":"Ta bort sista vertex"},"buttonTitles":{"drawMarkerButton":"Rita Punkt","drawPolyButton":"Rita Rolygoner","drawLineButton":"Rita Polyline","drawCircleButton":"Rta Cirkel","drawRectButton":"Rita Rectangle","editButton":"Redigera Lager","dragButton":"Dra Lager","cutButton":"Klipp i Lager","deleteButton":"Ta bort Lager","drawCircleMarkerButton":"Rita Cirkelmakör"}}')
}
, function(t, e, i) {
    var n = i(134)
      , r = i(135);
    t.exports = function(t, e) {
        return null != t && r(t, e, n)
    }
}
, function(t, e, i) {
    "use strict";
    var n = this && this.__importStar || function(t) {
        if (t && t.__esModule)
            return t;
        var e = {};
        if (null != t)
            for (var i in t)
                Object.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e.default = t,
        e
    }
    ;
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = i(1)
      , o = i(13)
      , a = n(i(24));
    e.default = function t(e, i, n) {
        void 0 === n && (n = {});
        var s = o.getGeom(e)
          , l = o.getGeom(i);
        if ("Polygon" === s.type && "Polygon" === l.type) {
            var c = a.intersection(s.coordinates, l.coordinates);
            if (null === c || 0 === c.length)
                return null;
            if (1 !== c.length)
                return r.multiPolygon(c, n.properties);
            var h = c[0][0][0]
              , p = c[0][0][c[0][0].length - 1];
            return h[0] === p[0] && h[1] === p[1] ? r.polygon(c[0], n.properties) : null
        }
        if ("MultiPolygon" === s.type) {
            for (var u = [], d = 0, f = s.coordinates; d < f.length; d++) {
                var g = f[d]
                  , m = t(o.getGeom(r.polygon(g)), l);
                if (m) {
                    var y = o.getGeom(m);
                    if ("Polygon" === y.type)
                        u.push(y.coordinates);
                    else {
                        if ("MultiPolygon" !== y.type)
                            throw new Error("intersection is invalid");
                        u = u.concat(y.coordinates)
                    }
                }
            }
            return 0 === u.length ? null : 1 === u.length ? r.polygon(u[0], n.properties) : r.multiPolygon(u, n.properties)
        }
        if ("MultiPolygon" === l.type)
            return t(l, s);
        throw new Error("poly1 and poly2 must be either polygons or multiPolygons")
    }
}
, function(t, e, i) {
    t.exports = i(141)
}
, function(t, e) {
    Array.prototype.findIndex = Array.prototype.findIndex || function(t) {
        if (null === this)
            throw new TypeError("Array.prototype.findIndex called on null or undefined");
        if ("function" != typeof t)
            throw new TypeError("callback must be a function");
        for (var e = Object(this), i = e.length >>> 0, n = arguments[1], r = 0; r < i; r++)
            if (t.call(n, e[r], r, e))
                return r;
        return -1
    }
    ,
    Array.prototype.find = Array.prototype.find || function(t) {
        if (null === this)
            throw new TypeError("Array.prototype.find called on null or undefined");
        if ("function" != typeof t)
            throw new TypeError("callback must be a function");
        for (var e = Object(this), i = e.length >>> 0, n = arguments[1], r = 0; r < i; r++) {
            var o = e[r];
            if (t.call(n, o, r, e))
                return o
        }
    }
    ,
    "function" != typeof Object.assign && (Object.assign = function(t) {
        "use strict";
        if (null == t)
            throw new TypeError("Cannot convert undefined or null to object");
        t = Object(t);
        for (var e = 1; e < arguments.length; e++) {
            var i = arguments[e];
            if (null != i)
                for (var n in i)
                    Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
        }
        return t
    }
    ),
    [Element.prototype, CharacterData.prototype, DocumentType.prototype].forEach((function(t) {
        t.hasOwnProperty("remove") || Object.defineProperty(t, "remove", {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            value: function() {
                this.parentNode.removeChild(this)
            }
        })
    }
    ))
}
, function(t, e, i) {
    var n = i(61)
      , r = i(30)
      , o = i(92)
      , a = i(94)
      , s = i(2)
      , l = i(37)
      , c = i(36);
    t.exports = function t(e, i, h, p, u) {
        e !== i && o(i, (function(o, l) {
            if (u = u || new n,
            s(o))
                a(e, i, l, h, t, p, u);
            else {
                var d = p ? p(c(e, l), o, l + "", e, i, u) : void 0;
                void 0 === d && (d = o),
                r(e, l, d)
            }
        }
        ), l)
    }
}
, function(t, e, i) {
    var n = i(8)
      , r = i(67)
      , o = i(68)
      , a = i(69)
      , s = i(70)
      , l = i(71);
    function c(t) {
        var e = this.__data__ = new n(t);
        this.size = e.size
    }
    c.prototype.clear = r,
    c.prototype.delete = o,
    c.prototype.get = a,
    c.prototype.has = s,
    c.prototype.set = l,
    t.exports = c
}
, function(t, e) {
    t.exports = function() {
        this.__data__ = [],
        this.size = 0
    }
}
, function(t, e, i) {
    var n = i(9)
      , r = Array.prototype.splice;
    t.exports = function(t) {
        var e = this.__data__
          , i = n(e, t);
        return !(i < 0 || (i == e.length - 1 ? e.pop() : r.call(e, i, 1),
        --this.size,
        0))
    }
}
, function(t, e, i) {
    var n = i(9);
    t.exports = function(t) {
        var e = this.__data__
          , i = n(e, t);
        return i < 0 ? void 0 : e[i][1]
    }
}
, function(t, e, i) {
    var n = i(9);
    t.exports = function(t) {
        return -1 < n(this.__data__, t)
    }
}
, function(t, e, i) {
    var n = i(9);
    t.exports = function(t, e) {
        var i = this.__data__
          , r = n(i, t);
        return r < 0 ? (++this.size,
        i.push([t, e])) : i[r][1] = e,
        this
    }
}
, function(t, e, i) {
    var n = i(8);
    t.exports = function() {
        this.__data__ = new n,
        this.size = 0
    }
}
, function(t, e) {
    t.exports = function(t) {
        var e = this.__data__
          , i = e.delete(t);
        return this.size = e.size,
        i
    }
}
, function(t, e) {
    t.exports = function(t) {
        return this.__data__.get(t)
    }
}
, function(t, e) {
    t.exports = function(t) {
        return this.__data__.has(t)
    }
}
, function(t, e, i) {
    var n = i(8)
      , r = i(27)
      , o = i(29);
    t.exports = function(t, e) {
        var i = this.__data__;
        if (i instanceof n) {
            var a = i.__data__;
            if (!r || a.length < 199)
                return a.push([t, e]),
                this.size = ++i.size,
                this;
            i = this.__data__ = new o(a)
        }
        return i.set(t, e),
        this.size = i.size,
        this
    }
}
, function(t, e, i) {
    var n = i(15)
      , r = i(76)
      , o = i(2)
      , a = i(78)
      , s = /^\[object .+?Constructor\]$/
      , l = Function.prototype
      , c = Object.prototype
      , h = l.toString
      , p = c.hasOwnProperty
      , u = RegExp("^" + h.call(p).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    t.exports = function(t) {
        return !(!o(t) || r(t)) && (n(t) ? u : s).test(a(t))
    }
}
, function(t, e) {
    var i;
    i = function() {
        return this
    }();
    try {
        i = i || new Function("return this")()
    } catch (t) {
        "object" == typeof window && (i = window)
    }
    t.exports = i
}
, function(t, e, i) {
    var n = i(16)
      , r = Object.prototype
      , o = r.hasOwnProperty
      , a = r.toString
      , s = n ? n.toStringTag : void 0;
    t.exports = function(t) {
        var e = o.call(t, s)
          , i = t[s];
        try {
            t[s] = void 0;
            var n = !0
        } catch (t) {}
        var r = a.call(t);
        return n && (e ? t[s] = i : delete t[s]),
        r
    }
}
, function(t, e) {
    var i = Object.prototype.toString;
    t.exports = function(t) {
        return i.call(t)
    }
}
, function(t, e, i) {
    var n, r = i(77), o = (n = /[^.]+$/.exec(r && r.keys && r.keys.IE_PROTO || "")) ? "Symbol(src)_1." + n : "";
    t.exports = function(t) {
        return !!o && o in t
    }
}
, function(t, e, i) {
    var n = i(4)["__core-js_shared__"];
    t.exports = n
}
, function(t, e) {
    var i = Function.prototype.toString;
    t.exports = function(t) {
        if (null != t) {
            try {
                return i.call(t)
            } catch (t) {}
            try {
                return t + ""
            } catch (t) {}
        }
        return ""
    }
}
, function(t, e) {
    t.exports = function(t, e) {
        return null == t ? void 0 : t[e]
    }
}
, function(t, e, i) {
    var n = i(81)
      , r = i(8)
      , o = i(27);
    t.exports = function() {
        this.size = 0,
        this.__data__ = {
            hash: new n,
            map: new (o || r),
            string: new n
        }
    }
}
, function(t, e, i) {
    var n = i(82)
      , r = i(83)
      , o = i(84)
      , a = i(85)
      , s = i(86);
    function l(t) {
        var e = -1
          , i = null == t ? 0 : t.length;
        for (this.clear(); ++e < i; ) {
            var n = t[e];
            this.set(n[0], n[1])
        }
    }
    l.prototype.clear = n,
    l.prototype.delete = r,
    l.prototype.get = o,
    l.prototype.has = a,
    l.prototype.set = s,
    t.exports = l
}
, function(t, e, i) {
    var n = i(11);
    t.exports = function() {
        this.__data__ = n ? n(null) : {},
        this.size = 0
    }
}
, function(t, e) {
    t.exports = function(t) {
        var e = this.has(t) && delete this.__data__[t];
        return this.size -= e ? 1 : 0,
        e
    }
}
, function(t, e, i) {
    var n = i(11)
      , r = Object.prototype.hasOwnProperty;
    t.exports = function(t) {
        var e = this.__data__;
        if (n) {
            var i = e[t];
            return "__lodash_hash_undefined__" === i ? void 0 : i
        }
        return r.call(e, t) ? e[t] : void 0
    }
}
, function(t, e, i) {
    var n = i(11)
      , r = Object.prototype.hasOwnProperty;
    t.exports = function(t) {
        var e = this.__data__;
        return n ? void 0 !== e[t] : r.call(e, t)
    }
}
, function(t, e, i) {
    var n = i(11);
    t.exports = function(t, e) {
        var i = this.__data__;
        return this.size += this.has(t) ? 0 : 1,
        i[t] = n && void 0 === e ? "__lodash_hash_undefined__" : e,
        this
    }
}
, function(t, e, i) {
    var n = i(12);
    t.exports = function(t) {
        var e = n(this, t).delete(t);
        return this.size -= e ? 1 : 0,
        e
    }
}
, function(t, e) {
    t.exports = function(t) {
        var e = typeof t;
        return "string" == e || "number" == e || "symbol" == e || "boolean" == e ? "__proto__" !== t : null === t
    }
}
, function(t, e, i) {
    var n = i(12);
    t.exports = function(t) {
        return n(this, t).get(t)
    }
}
, function(t, e, i) {
    var n = i(12);
    t.exports = function(t) {
        return n(this, t).has(t)
    }
}
, function(t, e, i) {
    var n = i(12);
    t.exports = function(t, e) {
        var i = n(this, t)
          , r = i.size;
        return i.set(t, e),
        this.size += i.size == r ? 0 : 1,
        this
    }
}
, function(t, e, i) {
    var n = i(93)();
    t.exports = n
}
, function(t, e) {
    t.exports = function(t) {
        return function(e, i, n) {
            for (var r = -1, o = Object(e), a = n(e), s = a.length; s--; ) {
                var l = a[t ? s : ++r];
                if (!1 === i(o[l], l, o))
                    break
            }
            return e
        }
    }
}
, function(t, e, i) {
    var n = i(30)
      , r = i(95)
      , o = i(96)
      , a = i(99)
      , s = i(100)
      , l = i(19)
      , c = i(6)
      , h = i(104)
      , p = i(34)
      , u = i(15)
      , d = i(2)
      , f = i(106)
      , g = i(35)
      , m = i(36)
      , y = i(110);
    t.exports = function(t, e, i, _, v, L, k) {
        var b = m(t, i)
          , M = m(e, i)
          , E = k.get(M);
        if (E)
            n(t, i, E);
        else {
            var w = L ? L(b, M, i + "", t, e, k) : void 0
              , C = void 0 === w;
            if (C) {
                var S = c(M)
                  , O = !S && p(M)
                  , x = !S && !O && g(M);
                w = M,
                S || O || x ? w = c(b) ? b : h(b) ? a(b) : O ? r(M, !(C = !1)) : x ? o(M, !(C = !1)) : [] : f(M) || l(M) ? l(w = b) ? w = y(b) : d(b) && !u(b) || (w = s(M)) : C = !1
            }
            C && (k.set(M, w),
            v(w, M, _, L, k),
            k.delete(M)),
            n(t, i, w)
        }
    }
}
, function(t, e, i) {
    (function(t) {
        var n = i(4)
          , r = e && !e.nodeType && e
          , o = r && "object" == typeof t && t && !t.nodeType && t
          , a = o && o.exports === r ? n.Buffer : void 0
          , s = a ? a.allocUnsafe : void 0;
        t.exports = function(t, e) {
            if (e)
                return t.slice();
            var i = t.length
              , n = s ? s(i) : new t.constructor(i);
            return t.copy(n),
            n
        }
    }
    ).call(this, i(18)(t))
}
, function(t, e, i) {
    var n = i(97);
    t.exports = function(t, e) {
        var i = e ? n(t.buffer) : t.buffer;
        return new t.constructor(i,t.byteOffset,t.length)
    }
}
, function(t, e, i) {
    var n = i(98);
    t.exports = function(t) {
        var e = new t.constructor(t.byteLength);
        return new n(e).set(new n(t)),
        e
    }
}
, function(t, e, i) {
    var n = i(4).Uint8Array;
    t.exports = n
}
, function(t, e) {
    t.exports = function(t, e) {
        var i = -1
          , n = t.length;
        for (e = e || Array(n); ++i < n; )
            e[i] = t[i];
        return e
    }
}
, function(t, e, i) {
    var n = i(101)
      , r = i(32)
      , o = i(33);
    t.exports = function(t) {
        return "function" != typeof t.constructor || o(t) ? {} : n(r(t))
    }
}
, function(t, e, i) {
    var n = i(2)
      , r = Object.create;
    function o() {}
    t.exports = function(t) {
        if (!n(t))
            return {};
        if (r)
            return r(t);
        o.prototype = t;
        var e = new o;
        return o.prototype = void 0,
        e
    }
}
, function(t, e) {
    t.exports = function(t, e) {
        return function(i) {
            return t(e(i))
        }
    }
}
, function(t, e, i) {
    var n = i(7)
      , r = i(5);
    t.exports = function(t) {
        return r(t) && "[object Arguments]" == n(t)
    }
}
, function(t, e, i) {
    var n = i(20)
      , r = i(5);
    t.exports = function(t) {
        return r(t) && n(t)
    }
}
, function(t, e) {
    t.exports = function() {
        return !1
    }
}
, function(t, e, i) {
    var n = i(7)
      , r = i(32)
      , o = i(5)
      , a = Function.prototype
      , s = Object.prototype
      , l = a.toString
      , c = s.hasOwnProperty
      , h = l.call(Object);
    t.exports = function(t) {
        if (!o(t) || "[object Object]" != n(t))
            return !1;
        var e = r(t);
        if (null === e)
            return !0;
        var i = c.call(e, "constructor") && e.constructor;
        return "function" == typeof i && i instanceof i && l.call(i) == h
    }
}
, function(t, e, i) {
    var n = i(7)
      , r = i(21)
      , o = i(5)
      , a = {};
    a["[object Float32Array]"] = a["[object Float64Array]"] = a["[object Int8Array]"] = a["[object Int16Array]"] = a["[object Int32Array]"] = a["[object Uint8Array]"] = a["[object Uint8ClampedArray]"] = a["[object Uint16Array]"] = a["[object Uint32Array]"] = !0,
    a["[object Arguments]"] = a["[object Array]"] = a["[object ArrayBuffer]"] = a["[object Boolean]"] = a["[object DataView]"] = a["[object Date]"] = a["[object Error]"] = a["[object Function]"] = a["[object Map]"] = a["[object Number]"] = a["[object Object]"] = a["[object RegExp]"] = a["[object Set]"] = a["[object String]"] = a["[object WeakMap]"] = !1,
    t.exports = function(t) {
        return o(t) && r(t.length) && !!a[n(t)]
    }
}
, function(t, e) {
    t.exports = function(t) {
        return function(e) {
            return t(e)
        }
    }
}
, function(t, e, i) {
    (function(t) {
        var n = i(28)
          , r = e && !e.nodeType && e
          , o = r && "object" == typeof t && t && !t.nodeType && t
          , a = o && o.exports === r && n.process
          , s = function() {
            try {
                return o && o.require && o.require("util").types || a && a.binding && a.binding("util")
            } catch (t) {}
        }();
        t.exports = s
    }
    ).call(this, i(18)(t))
}
, function(t, e, i) {
    var n = i(111)
      , r = i(37);
    t.exports = function(t) {
        return n(t, r(t))
    }
}
, function(t, e, i) {
    var n = i(112)
      , r = i(17);
    t.exports = function(t, e, i, o) {
        var a = !i;
        i = i || {};
        for (var s = -1, l = e.length; ++s < l; ) {
            var c = e[s]
              , h = o ? o(i[c], t[c], c, i, t) : void 0;
            void 0 === h && (h = t[c]),
            a ? r(i, c, h) : n(i, c, h)
        }
        return i
    }
}
, function(t, e, i) {
    var n = i(17)
      , r = i(10)
      , o = Object.prototype.hasOwnProperty;
    t.exports = function(t, e, i) {
        var a = t[e];
        o.call(t, e) && r(a, i) && (void 0 !== i || e in t) || n(t, e, i)
    }
}
, function(t, e, i) {
    var n = i(114)
      , r = i(19)
      , o = i(6)
      , a = i(34)
      , s = i(22)
      , l = i(35)
      , c = Object.prototype.hasOwnProperty;
    t.exports = function(t, e) {
        var i = o(t)
          , h = !i && r(t)
          , p = !i && !h && a(t)
          , u = !i && !h && !p && l(t)
          , d = i || h || p || u
          , f = d ? n(t.length, String) : []
          , g = f.length;
        for (var m in t)
            !e && !c.call(t, m) || d && ("length" == m || p && ("offset" == m || "parent" == m) || u && ("buffer" == m || "byteLength" == m || "byteOffset" == m) || s(m, g)) || f.push(m);
        return f
    }
}
, function(t, e) {
    t.exports = function(t, e) {
        for (var i = -1, n = Array(t); ++i < t; )
            n[i] = e(i);
        return n
    }
}
, function(t, e, i) {
    var n = i(2)
      , r = i(33)
      , o = i(116)
      , a = Object.prototype.hasOwnProperty;
    t.exports = function(t) {
        if (!n(t))
            return o(t);
        var e = r(t)
          , i = [];
        for (var s in t)
            ("constructor" != s || !e && a.call(t, s)) && i.push(s);
        return i
    }
}
, function(t, e) {
    t.exports = function(t) {
        var e = [];
        if (null != t)
            for (var i in Object(t))
                e.push(i);
        return e
    }
}
, function(t, e, i) {
    var n = i(118)
      , r = i(125);
    t.exports = function(t) {
        return n((function(e, i) {
            var n = -1
              , o = i.length
              , a = 1 < o ? i[o - 1] : void 0
              , s = 2 < o ? i[2] : void 0;
            for (a = 3 < t.length && "function" == typeof a ? (o--,
            a) : void 0,
            s && r(i[0], i[1], s) && (a = o < 3 ? void 0 : a,
            o = 1),
            e = Object(e); ++n < o; ) {
                var l = i[n];
                l && t(e, l, n, a)
            }
            return e
        }
        ))
    }
}
, function(t, e, i) {
    var n = i(38)
      , r = i(119)
      , o = i(121);
    t.exports = function(t, e) {
        return o(r(t, e, n), t + "")
    }
}
, function(t, e, i) {
    var n = i(120)
      , r = Math.max;
    t.exports = function(t, e, i) {
        return e = r(void 0 === e ? t.length - 1 : e, 0),
        function() {
            for (var o = arguments, a = -1, s = r(o.length - e, 0), l = Array(s); ++a < s; )
                l[a] = o[e + a];
            a = -1;
            for (var c = Array(e + 1); ++a < e; )
                c[a] = o[a];
            return c[e] = i(l),
            n(t, this, c)
        }
    }
}
, function(t, e) {
    t.exports = function(t, e, i) {
        switch (i.length) {
        case 0:
            return t.call(e);
        case 1:
            return t.call(e, i[0]);
        case 2:
            return t.call(e, i[0], i[1]);
        case 3:
            return t.call(e, i[0], i[1], i[2])
        }
        return t.apply(e, i)
    }
}
, function(t, e, i) {
    var n = i(122)
      , r = i(124)(n);
    t.exports = r
}
, function(t, e, i) {
    var n = i(123)
      , r = i(31)
      , o = i(38)
      , a = r ? function(t, e) {
        return r(t, "toString", {
            configurable: !0,
            enumerable: !1,
            value: n(e),
            writable: !0
        })
    }
    : o;
    t.exports = a
}
, function(t, e) {
    t.exports = function(t) {
        return function() {
            return t
        }
    }
}
, function(t, e) {
    var i = Date.now;
    t.exports = function(t) {
        var e = 0
          , n = 0;
        return function() {
            var r = i()
              , o = 16 - (r - n);
            if (n = r,
            0 < o) {
                if (800 <= ++e)
                    return arguments[0]
            } else
                e = 0;
            return t.apply(void 0, arguments)
        }
    }
}
, function(t, e, i) {
    var n = i(10)
      , r = i(20)
      , o = i(22)
      , a = i(2);
    t.exports = function(t, e, i) {
        if (!a(i))
            return !1;
        var s = typeof e;
        return !!("number" == s ? r(i) && o(e, i.length) : "string" == s && e in i) && n(i[e], t)
    }
}
, function(t, e, i) {
    var n = i(39)
      , r = i(40);
    t.exports = function(t, e) {
        for (var i = 0, o = (e = n(e, t)).length; null != t && i < o; )
            t = t[r(e[i++])];
        return i && i == o ? t : void 0
    }
}
, function(t, e, i) {
    var n = i(6)
      , r = i(23)
      , o = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
      , a = /^\w*$/;
    t.exports = function(t, e) {
        if (n(t))
            return !1;
        var i = typeof t;
        return !("number" != i && "symbol" != i && "boolean" != i && null != t && !r(t)) || a.test(t) || !o.test(t) || null != e && t in Object(e)
    }
}
, function(t, e, i) {
    var n = i(129)
      , r = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g
      , o = /\\(\\)?/g
      , a = n((function(t) {
        var e = [];
        return 46 === t.charCodeAt(0) && e.push(""),
        t.replace(r, (function(t, i, n, r) {
            e.push(n ? r.replace(o, "$1") : i || t)
        }
        )),
        e
    }
    ));
    t.exports = a
}
, function(t, e, i) {
    var n = i(130);
    t.exports = function(t) {
        var e = n(t, (function(t) {
            return 500 === i.size && i.clear(),
            t
        }
        ))
          , i = e.cache;
        return e
    }
}
, function(t, e, i) {
    var n = i(29);
    function r(t, e) {
        if ("function" != typeof t || null != e && "function" != typeof e)
            throw new TypeError("Expected a function");
        var i = function() {
            var n = arguments
              , r = e ? e.apply(this, n) : n[0]
              , o = i.cache;
            if (o.has(r))
                return o.get(r);
            var a = t.apply(this, n);
            return i.cache = o.set(r, a) || o,
            a
        };
        return i.cache = new (r.Cache || n),
        i
    }
    r.Cache = n,
    t.exports = r
}
, function(t, e, i) {
    var n = i(132);
    t.exports = function(t) {
        return null == t ? "" : n(t)
    }
}
, function(t, e, i) {
    var n = i(16)
      , r = i(133)
      , o = i(6)
      , a = i(23)
      , s = n ? n.prototype : void 0
      , l = s ? s.toString : void 0;
    t.exports = function t(e) {
        if ("string" == typeof e)
            return e;
        if (o(e))
            return r(e, t) + "";
        if (a(e))
            return l ? l.call(e) : "";
        var i = e + "";
        return "0" == i && 1 / e == -1 / 0 ? "-0" : i
    }
}
, function(t, e) {
    t.exports = function(t, e) {
        for (var i = -1, n = null == t ? 0 : t.length, r = Array(n); ++i < n; )
            r[i] = e(t[i], i, t);
        return r
    }
}
, function(t, e) {
    var i = Object.prototype.hasOwnProperty;
    t.exports = function(t, e) {
        return null != t && i.call(t, e)
    }
}
, function(t, e, i) {
    var n = i(39)
      , r = i(19)
      , o = i(6)
      , a = i(22)
      , s = i(21)
      , l = i(40);
    t.exports = function(t, e, i) {
        for (var c = -1, h = (e = n(e, t)).length, p = !1; ++c < h; ) {
            var u = l(e[c]);
            if (!(p = null != t && i(t, u)))
                break;
            t = t[u]
        }
        return p || ++c != h ? p : !!(h = null == t ? 0 : t.length) && s(h) && a(u, h) && (o(t) || r(t))
    }
}
, function(t, e) {
    var i, n, r, o, a;
    i = L.Polyline.prototype.onAdd,
    n = L.Polyline.prototype.onRemove,
    r = L.Polyline.prototype._updatePath,
    o = L.Polyline.prototype.bringToFront,
    a = {
        onAdd: function(t) {
            i.call(this, t),
            this._textRedraw()
        },
        onRemove: function(t) {
            (t = t || this._map) && this._textNode && t._renderer._container && t._renderer._container.removeChild(this._textNode),
            n.call(this, t)
        },
        bringToFront: function() {
            o.call(this),
            this._textRedraw()
        },
        _updatePath: function() {
            r.call(this),
            this._textRedraw()
        },
        _textRedraw: function() {
            var t = this._text
              , e = this._textOptions;
            t && this.setText(null).setText(t, e)
        },
        setText: function(t, e) {
            if (this._text = t,
            this._textOptions = e,
            !L.Browser.svg || void 0 === this._map)
                return this;
            if (e = L.Util.extend({
                repeat: !1,
                fillColor: "black",
                attributes: {},
                below: !1
            }, e),
            !t)
                return this._textNode && this._textNode.parentNode && (this._map._renderer._container.removeChild(this._textNode),
                delete this._textNode),
                this;
            t = t.replace(/ /g, " ");
            var i = "pathdef-" + L.Util.stamp(this)
              , n = this._map._renderer._container;
            if (this._path.setAttribute("id", i),
            e.repeat) {
                var r = L.SVG.create("text");
                for (var o in e.attributes)
                    r.setAttribute(o, e.attributes[o]);
                r.appendChild(document.createTextNode(t)),
                n.appendChild(r);
                var a = r.getComputedTextLength();
                n.removeChild(r),
                t = new Array(Math.ceil(isNaN(this._path.getTotalLength() / a) ? 0 : this._path.getTotalLength() / a)).join(t)
            }
            var s = L.SVG.create("text")
              , l = L.SVG.create("textPath")
              , c = e.offset || this._path.getAttribute("stroke-width");
            for (var o in l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + i),
            s.setAttribute("dy", c),
            e.attributes)
                s.setAttribute(o, e.attributes[o]);
            if (l.appendChild(document.createTextNode(t)),
            s.appendChild(l),
            this._textNode = s,
            e.below ? n.insertBefore(s, n.firstChild) : n.appendChild(s),
            e.center) {
                var h = s.getComputedTextLength()
                  , p = this._path.getTotalLength();
                s.setAttribute("dx", p / 2 - h / 2)
            }
            if (e.orientation) {
                var u = 0;
                switch (e.orientation) {
                case "flip":
                    u = 180;
                    break;
                case "perpendicular":
                    u = 90;
                    break;
                default:
                    u = e.orientation
                }
                var d = s.getBBox().x + s.getBBox().width / 2
                  , f = s.getBBox().y + s.getBBox().height / 2;
                s.setAttribute("transform", "rotate(" + u + " " + d + " " + f + ")")
            }
            if (this.options.interactive) {
                !L.Browser.svg && L.Browser.vml || l.setAttribute("class", "leaflet-interactive");
                for (var g = ["click", "dblclick", "mousedown", "mouseover", "mouseout", "mousemove", "contextmenu"], m = 0; m < g.length; m++)
                    L.DomEvent.on(s, g[m], this.fire, this)
            }
            return this
        }
    },
    L.Polyline.include(a),
    L.LayerGroup.include({
        setText: function(t, e) {
            for (var i in this._layers)
                "function" == typeof this._layers[i].setText && this._layers[i].setText(t, e);
            return this
        }
    })
}
, function(t, e, i) {}
, function(t, e, i) {}
, function(t, e) {
    function i(t) {
        return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        )(t)
    }
    var n, r;
    function o(t) {
        if (r[t])
            return r[t].exports;
        var e = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return n[t].call(e.exports, e, e.exports, o),
        e.l = !0,
        e.exports
    }
    r = {},
    o.m = n = [function(t, e) {
        t.exports = void 0
    }
    , function(t, e, i) {}
    , function(t, e, i) {
        "use strict";
        i.r(e),
        i(0),
        i(1),
        L.StyleEditor = {
            marker: {},
            forms: {},
            formElements: {}
        },
        L.Marker.include({
            styleEditor: {
                type: "Marker"
            }
        }),
        L.Polygon.include({
            styleEditor: {
                type: "Polygon"
            }
        }),
        L.Polyline.include({
            styleEditor: {
                type: "Polyline"
            }
        }),
        L.Rectangle.include({
            styleEditor: {
                type: "Rectangle"
            }
        }),
        L.StyleEditor.Util = L.Class.extend({
            initialize: function(t) {
                t && L.setOptions(this, t)
            },
            fireEvent: function(t, e) {
                this.options.styleEditorOptions.map.fireEvent(this.options.styleEditorOptions.styleEditorEventPrefix + t, e)
            },
            fireChangeEvent: function(t) {
                this.fireEvent("changed", t)
            },
            hideElement: function(t) {
                t && L.DomUtil.addClass(t, "leaflet-styleeditor-hidden")
            },
            rgbToHex: function(t, e) {
                if (t || 0 !== (t = this.options.styleEditorOptions.defaultColor).indexOf("#") && (t = "#" + t),
                0 === t.indexOf("#"))
                    return e && t.replace("#", ""),
                    t;
                if (t.indexOf("(") < 0)
                    return "#" + t;
                var i = t.substring(4).replace(")", "").split(",")
                  , n = this._componentToHex(parseInt(i[0], 10)) + this._componentToHex(parseInt(i[1], 10)) + this._componentToHex(parseInt(i[2], 10));
                return e ? n : "#" + n
            },
            getCurrentElement: function() {
                return this.options.styleEditorOptions.currentElement ? void 0 !== this.options.styleEditorOptions.currentElement.target ? this.options.styleEditorOptions.currentElement.target : this.options.styleEditorOptions.currentElement : null
            },
            setCurrentElement: function(t) {
                this.options.styleEditorOptions.currentElement.target = t
            },
            fillCurrentElement: function() {
                return this.getCurrentElement().options.fill
            },
            getStyle: function(t) {
                return this.getCurrentElement().options[t] || null
            },
            setStyle: function(t, e) {
                var i = this.getCurrentElement();
                if (i instanceof L.Marker)
                    this.options.styleEditorOptions.markerType.setStyle(t, e);
                else {
                    var n = {};
                    n[t] = e,
                    i.setStyle(n)
                }
                this.fireChangeEvent(i)
            },
            showElement: function(t) {
                t && L.DomUtil.removeClass(t, "leaflet-styleeditor-hidden")
            },
            _componentToHex: function(t) {
                var e = t.toString(16);
                return 1 === e.length ? "0" + e : e
            },
            getMarkersForColor: function(t) {
                t = this.rgbToHex(t);
                var e = this.options.styleEditorOptions.markerType.options.markers
                  , i = this.options.styleEditorOptions.markers;
                if (Array.isArray(e) || (e = Object.keys(e).includes(t) ? e[t] : e.default),
                null === i)
                    return e;
                if (!Array.isArray(i)) {
                    var n = Object.keys(i);
                    i = n.includes(t) ? i[t] : n.includes("default") ? i.default : e
                }
                return e.filter((function(t) {
                    return i.includes(t)
                }
                ))
            },
            getDefaultMarkerForColor: function(t) {
                t = this.rgbToHex(t);
                var e = this.getMarkersForColor(t)
                  , i = []
                  , n = this.options.styleEditorOptions.defaultMarkerIcon;
                return null !== n && ("string" == typeof n && i.push(n),
                Object.keys(n).includes(t) && i.push(n[t])),
                void 0 !== (n = this.options.styleEditorOptions.markerType.options.defaultMarkerIcon) && ("string" == typeof n && i.push(n),
                Object.keys(n).includes(t) && i.push(n[t])),
                i.filter((function(t) {
                    return e.includes(t)
                }
                )),
                0 < i.length ? i[0] : e[0]
            }
        }),
        L.StyleEditor.formElements.FormElement = L.Class.extend({
            initialize: function(t) {
                t && L.setOptions(this, t),
                !this.options.title && this.options.styleOption && (this.options.title = this.options.styleOption.charAt(0).toUpperCase() + this.options.styleOption.slice(1))
            },
            create: function(t) {
                this.options.uiElement = L.DomUtil.create("div", "leaflet-styleeditor-uiElement", t),
                this.createTitle(),
                this.createContent()
            },
            createTitle: function() {
                L.DomUtil.create("label", "leaflet-styleeditor-label", this.options.uiElement).innerHTML = this.options.title + ":"
            },
            createContent: function() {},
            show: function() {
                this.style(),
                this.showForm()
            },
            showForm: function() {
                this.options.styleEditorOptions.util.showElement(this.options.uiElement)
            },
            hide: function() {
                this.options.styleEditorOptions.util.hideElement(this.options.uiElement)
            },
            style: function() {},
            lostFocus: function() {},
            setStyle: function(t) {
                var e = this.options.styleEditorOptions.util.getCurrentElement()
                  , i = [e];
                e instanceof L.LayerGroup && (i = Object.values(e._layers));
                for (var n = 0; n < i.length; n++) {
                    var r = i[n];
                    if (r instanceof L.Marker)
                        this.options.styleEditorOptions.markerType.setStyle(this.options.styleOption, t);
                    else {
                        var o = {};
                        o[this.options.styleOption] = t,
                        r.setStyle(o),
                        r.options[this.options.styleOption] = t
                    }
                    this.options.styleEditorOptions.util.fireChangeEvent(r)
                }
                this.options.parentForm.style()
            }
        }),
        L.StyleEditor.formElements.ColorElement = L.StyleEditor.formElements.FormElement.extend({
            createContent: function() {
                this.options.colorPickerDiv = L.DomUtil.create("div", "leaflet-styleeditor-colorpicker", this.options.uiElement),
                this._getColorRamp().forEach(this._setSelectCallback, this)
            },
            _getColorRamp: function() {
                return this.options.colorRamp || (this.options.parentForm instanceof L.StyleEditor.forms.MarkerForm && this.options.styleEditorOptions.markerType.options.colorRamp ? this.options.colorRamp = this.options.styleEditorOptions.markerType.options.colorRamp : this.options.colorRamp = this.options.styleEditorOptions.colorRamp),
                this.options.colorRamp
            },
            _setSelectCallback: function(t) {
                var e = L.DomUtil.create("div", "leaflet-styleeditor-color", this.options.colorPickerDiv);
                e.style.backgroundColor = t,
                L.DomEvent.addListener(e, "click", this._selectColor, this)
            },
            _selectColor: function(t) {
                t.stopPropagation(),
                this.setStyle(this.options.styleEditorOptions.util.rgbToHex(t.target.style.backgroundColor)),
                this.options.styleEditorOptions.currentElement.target instanceof L.Marker && this.options.styleEditorOptions.markerType.setNewMarker()
            }
        }),
        L.StyleEditor.formElements.DashElement = L.StyleEditor.formElements.FormElement.extend({
            createContent: function() {
                var t = this.options.uiElement
                  , e = L.DomUtil.create("div", "leaflet-styleeditor-stroke", t);
                e.style.backgroundPosition = "0px -75px",
                L.DomEvent.addListener(e, "click", (function() {
                    this.setStyle("1")
                }
                ), this),
                (e = L.DomUtil.create("div", "leaflet-styleeditor-stroke", t)).style.backgroundPosition = "0px -95px",
                L.DomEvent.addListener(e, "click", (function() {
                    this.setStyle("10, 10")
                }
                ), this),
                (e = L.DomUtil.create("div", "leaflet-styleeditor-stroke", t)).style.backgroundPosition = "0px -115px",
                L.DomEvent.addListener(e, "click", (function() {
                    this.setStyle("15, 10, 1, 10")
                }
                ), this)
            }
        }),
        L.StyleEditor.formElements.IconElement = L.StyleEditor.formElements.FormElement.extend({
            _selectOptionWrapperClasses: "leaflet-styleeditor-select-option-wrapper leaflet-styleeditor-hidden",
            _selectOptionClasses: "leaflet-styleeditor-select-option",
            createContent: function() {
                var t = this.options.uiElement
                  , e = L.DomUtil.create("div", "leaflet-styleeditor-select", t);
                this.options.selectBoxImage = this._createSelectInputImage(e),
                L.DomEvent.addListener(e, "click", this._toggleSelectInput, this)
            },
            style: function() {
                var t = this.options.styleEditorOptions.markerType.getIconOptions();
                this._styleSelectInputImage(this.options.selectBoxImage, t.icon, t.iconColor),
                this._createColorSelect(this.options.styleEditorOptions.markerType.options.iconOptions.iconColor),
                this._hideSelectOptions()
            },
            lostFocus: function() {
                this._hideSelectOptions()
            },
            _createSelectInputImage: function(t) {
                var e = L.DomUtil.create("div", "leaflet-styleeditor-select-image-wrapper", t);
                return L.DomUtil.create("div", "leaflet-styleeditor-select-image", e)
            },
            _styleSelectInputImage: function(t, e, i) {
                if (e = e || t.getAttribute("value")) {
                    var n = this.options.styleEditorOptions.markerType.getIconOptions();
                    i && (n.iconColor = i),
                    t.innerHTML = "",
                    this.options.styleEditorOptions.markerType.createSelectHTML(t, n, e),
                    t.setAttribute("value", e)
                }
            },
            _createColorSelect: function(t) {
                if (this.options.selectOptions || (this.options.selectOptions = {}),
                !(t in this.options.selectOptions)) {
                    var e = this.options.uiElement
                      , i = L.DomUtil.create("ul", this._selectOptionWrapperClasses, e);
                    this.options.styleEditorOptions.util.getMarkersForColor(t).forEach((function(e) {
                        var n = L.DomUtil.create("li", this._selectOptionClasses, i)
                          , r = this._createSelectInputImage(n);
                        this._styleSelectInputImage(r, e, t)
                    }
                    ), this),
                    this.options.selectOptions[t] = i,
                    L.DomEvent.addListener(i, "click", (function(t) {
                        t.stopPropagation();
                        var e = t.target;
                        if ("UL" !== e.nodeName) {
                            if ("leaflet-styleeditor-select-image" === e.parentNode.className)
                                e = e.parentNode;
                            else
                                for (; e && "leaflet-styleeditor-select-image" !== e.className; )
                                    e = e.childNodes[0];
                            this._selectMarker({
                                target: e
                            }, this)
                        }
                    }
                    ), this)
                }
            },
            _toggleSelectInput: function(t) {
                var e = this._getCurrentColorElement(this.options.styleEditorOptions.util.rgbToHex(this.options.styleEditorOptions.markerType.options.iconOptions.iconColor))
                  , i = !1;
                e && (i = L.DomUtil.hasClass(e, "leaflet-styleeditor-hidden")),
                this._hideSelectOptions(),
                i && this.options.styleEditorOptions.util.showElement(e)
            },
            _selectMarker: function(t) {
                var e = this._getValue(t.target);
                this.options.selectBoxImage.setAttribute("value", e),
                this.setStyle(e),
                this._hideSelectOptions()
            },
            _getValue: function(t) {
                return t.getAttribute("value")
            },
            _getCurrentColorElement: function(t) {
                return this.options.selectOptions[t] || this._createColorSelect(t),
                this.options.selectOptions[t]
            },
            _hideSelectOptions: function() {
                for (var t in this.options.selectOptions)
                    this.options.styleEditorOptions.util.hideElement(this.options.selectOptions[t])
            }
        }),
        L.StyleEditor.formElements.OpacityElement = L.StyleEditor.formElements.FormElement.extend({
            createContent: function() {
                this.options.label = L.DomUtil.create("span", "leaflet-styleeditor-input-span", this.options.uiElement);
                var t = this.options.slider = L.DomUtil.create("input", "leaflet-styleeditor-input", this.options.uiElement);
                t.type = "range",
                t.max = 1,
                t.min = 0,
                t.step = .01,
                t.value = .5,
                L.DomEvent.addListener(t, "change", this._setStyle, this),
                L.DomEvent.addListener(t, "input", this._setStyle, this),
                L.DomEvent.addListener(t, "keyup", this._setStyle, this),
                L.DomEvent.addListener(t, "mouseup", this._setStyle, this)
            },
            style: function() {
                this.options.slider.value = this.options.styleEditorOptions.util.getStyle(this.options.styleOption),
                this.options.label.innerText = parseInt(100 * this.options.slider.value) + "%"
            },
            _setStyle: function() {
                this.setStyle(this.options.slider.value)
            }
        }),
        L.StyleEditor.formElements.PopupContentElement = L.StyleEditor.formElements.FormElement.extend({
            options: {
                title: "Description"
            },
            createContent: function() {
                var t = this.options.uiElement
                  , e = this.options.descTextAreaField = L.DomUtil.create("textarea", "leaflet-styleeditor-input", t);
                L.DomEvent.addListener(e, "change", this._setStyle, this)
            },
            style: function() {
                var t = this.options.styleEditorOptions.util.getCurrentElement();
                t && t.options && (this.options.descTextAreaField.value = t.options.popupContent || "")
            },
            _setStyle: function() {
                var t = this.options.styleEditorOptions.util.getCurrentElement()
                  , e = this.options.descTextAreaField.value
                  , i = [t];
                t instanceof L.LayerGroup && (i = Object.values(t._layers));
                for (var n = 0; n < i.length; n++) {
                    var r = i[n];
                    if (r && r.getPopup && r.bindPopup) {
                        var o = r.getPopup();
                        o ? o.setContent(e) : r.bindPopup(e),
                        r.options = r.options || {},
                        r.options.popupContent = e
                    }
                }
                this.setStyle(e)
            }
        }),
        L.StyleEditor.formElements.SizeElement = L.StyleEditor.formElements.FormElement.extend({
            createContent: function() {
                var t = this.options.uiElement
                  , e = L.DomUtil.create("div", "leaflet-styleeditor-sizeicon sizeicon-small", t);
                L.DomEvent.addListener(e, "click", (function() {
                    this.setStyle(this.options.styleEditorOptions.markerType.options.size.small)
                }
                ), this),
                e = L.DomUtil.create("div", "leaflet-styleeditor-sizeicon sizeicon-medium", t),
                L.DomEvent.addListener(e, "click", (function() {
                    this.setStyle(this.options.styleEditorOptions.markerType.options.size.medium)
                }
                ), this),
                e = L.DomUtil.create("div", "leaflet-styleeditor-sizeicon sizeicon-large", t),
                L.DomEvent.addListener(e, "click", (function() {
                    this.setStyle(this.options.styleEditorOptions.markerType.options.size.large)
                }
                ), this)
            }
        }),
        L.StyleEditor.formElements.WeightElement = L.StyleEditor.formElements.FormElement.extend({
            createContent: function() {
                this.options.label = L.DomUtil.create("span", "leaflet-styleeditor-input-span", this.options.uiElement);
                var t = this.options.weight = L.DomUtil.create("input", "leaflet-styleeditor-input", this.options.uiElement);
                t.type = "range",
                t.min = 0,
                t.max = 20,
                t.step = 1,
                t.value = 4,
                L.DomEvent.addListener(t, "change", this._setStyle, this),
                L.DomEvent.addListener(t, "input", this._setStyle, this),
                L.DomEvent.addListener(t, "keyup", this._setStyle, this),
                L.DomEvent.addListener(t, "mouseup", this._setStyle, this)
            },
            style: function() {
                this.options.weight.value = this.options.styleEditorOptions.util.getStyle(this.options.styleOption),
                this.options.label.innerText = this.options.weight.value
            },
            _setStyle: function() {
                this.setStyle(this.options.weight.value)
            }
        }),
        L.StyleEditor.forms.Form = L.Class.extend({
            initialize: function(t) {
                t && L.setOptions(this, t),
                this.options.initializedElements = []
            },
            create: function(t) {
                this.options.parentUiElement = t;
                for (var e = this.getFormElements(), i = Object.keys(e), n = 0; n < i.length; n++) {
                    var r = this.getFormElementClass(i[n], e);
                    void 0 !== r && (r.create(t),
                    this.options.initializedElements.push(r))
                }
            },
            hide: function() {
                this.hideFormElements(),
                this.hideForm()
            },
            hideFormElements: function() {
                for (var t = 0; t < this.options.initializedElements.length; t++)
                    this.options.initializedElements[t].hide()
            },
            hideForm: function() {
                this.options.styleEditorOptions.util.hideElement(this.options.parentUiElement)
            },
            show: function() {
                this.preShow(),
                this.showFormElements(),
                this.showForm(),
                this.style()
            },
            preShow: function() {},
            showFormElements: function() {
                for (var t = 0; t < this.options.initializedElements.length; t++)
                    this.showFormElement(this.options.initializedElements[t])
            },
            showForm: function() {
                this.options.styleEditorOptions.util.showElement(this.options.parentUiElement)
            },
            style: function() {
                for (var t = 0; t < this.options.initializedElements.length; t++)
                    this.options.initializedElements[t].style()
            },
            lostFocus: function() {
                for (var t = 0; t < this.options.initializedElements.length; t++)
                    this.options.initializedElements[t].lostFocus()
            },
            showFormElement: function(t) {
                this.showFormElementForStyleOption(t.options.styleOption) ? t.show() : t.hide()
            },
            getFormElements: function() {
                return this.options.formOptionKey in this.options.styleEditorOptions.forms ? this.options.styleEditorOptions.forms[this.options.formOptionKey] : this.options.formElements
            },
            getFormElementClass: function(t) {
                var e = this.getFormElements();
                if (0 <= Object.keys(e).indexOf(t)) {
                    var i = e[t];
                    if (i) {
                        if ("boolean" == typeof i)
                            return this.getFormElementStandardClass(t);
                        "formElement"in i && "boolean"in i && (i = i.formElement);
                        try {
                            var n = new i({
                                styleOption: t,
                                parentForm: this,
                                styleEditorOptions: this.options.styleEditorOptions
                            });
                            if (n instanceof L.StyleEditor.formElements.FormElement)
                                return n
                        } catch (t) {}
                    }
                    return this.getFormElementStandardClass(t)
                }
            },
            showFormElementForStyleOption: function(t) {
                var e = this.getFormElements();
                if (t in e) {
                    var i = e[t];
                    if ("function" == typeof i)
                        try {
                            return i(this.options.styleEditorOptions.util.getCurrentElement())
                        } catch (t) {
                            return !0
                        }
                    return "boolean" == typeof i ? i : !("boolean"in i) || ("function" == typeof i.boolean ? i.boolean(this.options.styleEditorOptions.util.getCurrentElement()) : i.boolean)
                }
                return !1
            },
            getFormElementStandardClass: function(t) {
                return new this.options.formElements[t]({
                    styleOption: t,
                    parentForm: this,
                    styleEditorOptions: this.options.styleEditorOptions
                })
            }
        }),
        L.StyleEditor.forms.GeometryForm = L.StyleEditor.forms.Form.extend({
            options: {
                formOptionKey: "geometry",
                formElements: {
                    color: L.StyleEditor.formElements.ColorElement,
                    opacity: L.StyleEditor.formElements.OpacityElement,
                    weight: L.StyleEditor.formElements.WeightElement,
                    dashArray: L.StyleEditor.formElements.DashElement,
                    fillColor: L.StyleEditor.formElements.ColorElement,
                    fillOpacity: L.StyleEditor.formElements.OpacityElement,
                    popupContent: L.StyleEditor.formElements.PopupContentElement
                }
            },
            showFormElements: function() {
                for (var t = 0; t < this.options.initializedElements.length; t++)
                    0 === this.options.initializedElements[t].options.styleOption.indexOf("fill") ? this.options.styleEditorOptions.util.fillCurrentElement() ? this.showFormElement(this.options.initializedElements[t]) : this.options.initializedElements[t].hide() : this.showFormElement(this.options.initializedElements[t])
            }
        }),
        L.StyleEditor.forms.MarkerForm = L.StyleEditor.forms.Form.extend({
            options: {
                formOptionKey: "marker",
                formElements: {
                    icon: L.StyleEditor.formElements.IconElement,
                    color: L.StyleEditor.formElements.ColorElement,
                    size: L.StyleEditor.formElements.SizeElement,
                    popupContent: L.StyleEditor.formElements.PopupContentElement
                }
            }
        }),
        L.StyleEditor.marker.Marker = L.Marker.extend({
            markerForm: L.StyleEditor.forms.MarkerForm,
            options: {
                size: {
                    small: [20, 50],
                    medium: [30, 70],
                    large: [35, 90]
                },
                selectIconSize: [],
                selectIconClass: "",
                iconOptions: {}
            },
            initialize: function(t) {
                L.setOptions(this, t),
                L.setOptions(this, this.options),
                "" === this.options.selectIconClass || this.options.selectIconClass.startsWith("leaflet-styleeditor-select-image") || (this.options.selectIconClass = "leaflet-styleeditor-select-image-" + this.options.selectIconClass)
            },
            setNewMarker: function() {
                var t = this._createMarkerIcon()
                  , e = this.options.styleEditorOptions.currentElement.target;
                // console.log(t),
                e.setIcon(t),
                e instanceof L.LayerGroup ? e.eachLayer((function(t) {
                    L.DomUtil.addClass(t.getElement(), "leaflet-styleeditor-marker-selected")
                }
                )) : L.DomUtil.addClass(e.getElement(), "leaflet-styleeditor-marker-selected")
            },
            setStyle: function(t, e) {
                // console.log("setStyle"),
                "icon" !== t && (t = "icon" + t.charAt(0).toUpperCase() + t.slice(1)),
                this.setIconOptions(t, e),
                this.setNewMarker()
            },
            createSelectHTML: function(t, e, i) {},
            getIconOptions: function() {
                try {
                    this.options.iconOptions = this.options.styleEditorOptions.currentElement.target.options.icon.options
                } catch (t) {}
                return 0 < Object.keys(this.options.iconOptions).length || (this.options.iconOptions.iconColor = this._getDefaultMarkerColor(),
                this.options.iconOptions.iconSize = this.options.styleEditorOptions.markerType.options.size.small,
                this.options.iconOptions.icon = this.options.styleEditorOptions.util.getDefaultMarkerForColor(this.options.iconOptions.iconColor),
                this.options.iconOptions = this._ensureMarkerIcon(this.options.iconOptions)),
                this.options.iconOptions
            },
            resetIconOptions: function() {
                var t = this;
                Object.keys(this.getIconOptions()).forEach((function(e) {
                    return t.setStyle(e, t.options.iconOptions[e])
                }
                ))
            },
            setIconOptions: function(t, e) {
                this.getIconOptions()[t] = e
            },
            _createMarkerIcon: function() {
                var t = this.getIconOptions();
                return this.createMarkerIcon(t)
            },
            _ensureMarkerIcon: function(t) {
                return this.options.styleEditorOptions.util.getMarkersForColor(t.iconColor).includes(t.icon) || (t.icon = this.options.styleEditorOptions.util.getDefaultMarkerForColor(t.iconColor)),
                t
            },
            _getDefaultMarkerColor: function() {
                var t = this.options.colorRamp
                  , e = this.options.styleEditorOptions.colorRamp
                  , i = [];
                null != t ? 0 === (i = t.filter((function(t) {
                    return e.includes(t)
                }
                ))).length && (i = t) : i = e;
                var n = this.options.styleEditorOptions.defaultMarkerColor;
                return null === n || i.includes(n) || (n = null),
                null === n && (null === (n = this.options.styleEditorOptions.defaultColor) || i.includes(n) || (n = null),
                null === n && (n = i[0])),
                this.options.styleEditorOptions.util.rgbToHex(n)
            },
            sizeToName: function(t) {
                var e = Object.keys(this.options.size);
                if ("string" == typeof t) {
                    "s" === t ? t = "small" : " m" === t ? t = "medium" : "l" === t && (t = "large");
                    for (var i = 0; i < e.length; i++)
                        if (this.options.size[e[i]] === t)
                            return e[i]
                }
                for (var n = Object.values(this.options.size), r = 0; r < n.length; r++)
                    if (JSON.stringify(t) === JSON.stringify(n[r]))
                        return e[r];
                return e[0]
            },
            sizeToPixel: function(t) {
                return t = this.sizeToName(t),
                this.options.size[t]
            }
        }),
        L.StyleEditor.marker.DefaultMarker = L.StyleEditor.marker.Marker.extend({
            createMarkerIcon: function(t, e) {
                e = e || "";
                var i = t.iconSize;
                return new L.Icon({
                    iconUrl: this._getMarkerUrlForStyle(t),
                    iconSize: t.iconSize,
                    iconColor: t.iconColor,
                    icon: t.icon,
                    className: e,
                    iconAnchor: [i[0] / 2, i[1] / 2],
                    popupAnchor: [0, -i[1] / 2]
                })
            },
            createSelectHTML: function(t, e, i) {
                var n = {};
                n.iconSize = this.options.size.small,
                n.icon = i,
                n.iconColor = e.iconColor,
                t.innerHTML = this.createMarkerIcon(n, this.options.selectIconClass).createIcon().outerHTML
            },
            _getMarkerUrlForStyle: function(t) {
                return this._getMarkerUrl(t.iconSize, t.iconColor, t.icon)
            },
            _getMarkerUrl: function(t, e, i) {
                var n = "https://api.tiles.mapbox.com/v3/marker/pin-" + (t = this.sizeToName(t)[0]);
                return i && (n += "-" + i),
                n + "+" + (e = 0 === e.indexOf("#") ? e.replace("#", "") : this.options.styleEditorOptions.util.rgbToHex(e, !0)) + ".png"
            },
            options: {
                selectIconClass: "defaultmarker",
                markers: ["circle-stroked", "circle", "square-stroked", "square"]
            }
        }),
        L.StyleEditor.marker.GlyphiconMarker = L.StyleEditor.marker.Marker.extend({
            getMarkerHtml: function(t, e, i) {
                var n = this._getMarkerUrl(t, e);
                return '<div class="leaflet-styleeditor-marker leaflet-styleeditor-marker-' + this.sizeToName(t)[0] + '" style="background-image: url(' + n + ');"><div class="leaflet-styleeditor-fill"></div><i class="glyphicon ' + i + '"></i><div class="leaflet-styleeditor-fill"></div></div>'
            },
            createMarkerIcon: function(t) {
                var e = t.iconSize;
                return L.divIcon({
                    className: "leaflet-styleeditor-glyphicon-marker-wrapper",
                    html: this.getMarkerHtml(e, t.iconColor, t.icon),
                    icon: t.icon,
                    iconColor: t.iconColor,
                    iconSize: e,
                    iconAnchor: [e[0] / 2, e[1] / 2],
                    popupAnchor: [0, -e[1] / 2]
                })
            },
            setStyle: function(t, e) {
                "icon" !== t && (t = "icon" + t.charAt(0).toUpperCase() + t.slice(1));
                var i = this.options.iconOptions;
                i[t] !== e && (i[t] = e,
                this.setNewMarker())
            },
            createSelectHTML: function(t, e, i) {
                t.innerHTML = this.getMarkerHtml("s", e.iconColor, i)
            },
            _getMarkerUrlForStyle: function(t) {
                return this._getMarkerUrl(t.iconSize, t.iconColor, t.icon)
            },
            _getMarkerUrl: function(t, e, i) {
                return "https://api.tiles.mapbox.com/v3/marker/pin-" + (t = this.sizeToName(t)[0]) + "+" + (e = 0 === e.indexOf("#") ? e.replace("#", "") : this.options.styleEditorOptions.util.rgbToHex(e, !0)) + ".png"
            },
            options: {
                markers: ["glyphicon-plus", "glyphicon-asterisk", "glyphicon-plus", "glyphicon-euro", "glyphicon-minus", "glyphicon-cloud", "glyphicon-envelope", "glyphicon-pencil", "glyphicon-glass", "glyphicon-music", "glyphicon-search", "glyphicon-heart", "glyphicon-star", "glyphicon-star-empty", "glyphicon-user", "glyphicon-film", "glyphicon-th-large", "glyphicon-th", "glyphicon-th-list", "glyphicon-ok", "glyphicon-remove", "glyphicon-zoom-in", "glyphicon-zoom-out", "glyphicon-off", "glyphicon-signal", "glyphicon-cog", "glyphicon-trash", "glyphicon-home", "glyphicon-file", "glyphicon-time", "glyphicon-road", "glyphicon-download-alt", "glyphicon-download", "glyphicon-upload", "glyphicon-inbox", "glyphicon-play-circle", "glyphicon-repeat", "glyphicon-refresh", "glyphicon-list-alt", "glyphicon-lock", "glyphicon-flag", "glyphicon-headphones", "glyphicon-volume-off", "glyphicon-volume-down", "glyphicon-volume-up", "glyphicon-qrcode", "glyphicon-barcode", "glyphicon-tag", "glyphicon-tags", "glyphicon-book", "glyphicon-bookmark", "glyphicon-print", "glyphicon-camera", "glyphicon-font", "glyphicon-bold", "glyphicon-italic", "glyphicon-text-height", "glyphicon-text-width", "glyphicon-align-left", "glyphicon-align-center", "glyphicon-align-right", "glyphicon-align-justify", "glyphicon-list", "glyphicon-indent-left", "glyphicon-indent-right", "glyphicon-facetime-video", "glyphicon-picture", "glyphicon-map-marker", "glyphicon-adjust", "glyphicon-tint", "glyphicon-edit", "glyphicon-share", "glyphicon-check", "glyphicon-move", "glyphicon-chevron-right", "glyphicon-plus-sign", "glyphicon-minus-sign", "glyphicon-remove-sign", "glyphicon-ok-sign", "glyphicon-question-sign", "glyphicon-info-sign", "glyphicon-screenshot", "glyphicon-remove-circle", "glyphicon-ok-circle", "glyphicon-ban-circle", "glyphicon-arrow-left", "glyphicon-arrow-right", "glyphicon-arrow-up", "glyphicon-arrow-down", "glyphicon-share-alt", "glyphicon-resize-full", "glyphicon-resize-small", "glyphicon-exclamation-sign", "glyphicon-gift", "glyphicon-leaf", "glyphicon-fire", "glyphicon-eye-open", "glyphicon-eye-close", "glyphicon-warning-sign", "glyphicon-plane", "glyphicon-calendar", "glyphicon-random", "glyphicon-comment", "glyphicon-magnet", "glyphicon-chevron-up", "glyphicon-chevron-down", "glyphicon-retweet", "glyphicon-shopping-cart", "glyphicon-bullhorn", "glyphicon-bell", "glyphicon-certificate", "glyphicon-thumbs-up", "glyphicon-thumbs-down", "glyphicon-hand-right", "glyphicon-hand-left", "glyphicon-hand-up", "glyphicon-hand-down", "glyphicon-circle-arrow-right", "glyphicon-circle-arrow-left", "glyphicon-circle-arrow-up", "glyphicon-circle-arrow-down", "glyphicon-globe", "glyphicon-wrench", "glyphicon-tasks", "glyphicon-filter", "glyphicon-briefcase", "glyphicon-fullscreen", "glyphicon-dashboard", "glyphicon-paperclip", "glyphicon-heart-empty", "glyphicon-link", "glyphicon-phone", "glyphicon-pushpin", "glyphicon-usd"]
            }
        }),
        L.StyleForm = L.Class.extend({
            initialize: function(t) {
                L.setOptions(this, t),
                this.createMarkerForm(),
                this.createGeometryForm(),
                this.addDOMEvents()
            },
            addDOMEvents: function() {
                L.DomEvent.addListener(this.options.styleEditorOptions.map, "click", this.lostFocus, this),
                L.DomEvent.addListener(this.options.styleEditorDiv, "click", this.lostFocus, this)
            },
            clearForm: function() {
                this.options.styleEditorOptions.markerForm.hide(),
                this.options.styleEditorOptions.geometryForm.hide()
            },
            createMarkerForm: function() {
                var t = L.DomUtil.create("div", "leaflet-styleeditor-interior-marker", this.options.styleEditorInterior);
                this.options.styleEditorOptions.markerForm.create(t)
            },
            createGeometryForm: function() {
                var t = L.DomUtil.create("div", "leaflet-styleeditor-interior-geometry", this.options.styleEditorInterior);
                this.options.styleEditorOptions.geometryForm.create(t)
            },
            showMarkerForm: function() {
                this.clearForm(),
                this.options.styleEditorOptions.markerForm.show()
            },
            showGeometryForm: function() {
                this.clearForm(),
                this.options.styleEditorOptions.geometryForm.show()
            },
            fireChangeEvent: function(t) {
                this.options.styleEditorOptions.util.fireChangedEvent(t)
            },
            lostFocus: function(t) {
                for (var e = t.target, i = 0; i < 10 && e; i++) {
                    if (e.className && L.DomUtil.hasClass(e, "leaflet-styleeditor-interior"))
                        return;
                    e = e.parentNode
                }
                this.options.styleEditorOptions.markerForm.lostFocus(),
                this.options.styleEditorOptions.geometryForm.lostFocus()
            }
        }),
        L.Control.StyleEditor = L.Control.extend({
            options: {
                position: "topleft",
                colorRamp: ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e"],
                defaultColor: null,
                markerType: L.StyleEditor.marker.DefaultMarker,
                markers: null,
                defaultMarkerIcon: null,
                defaultMarkerColor: null,
                geometryForm: L.StyleEditor.forms.GeometryForm,
                ignoreLayerTypes: [],
                forms: {},
                openOnLeafletDraw: !0,
                openOnLeafletEditable: !0,
                showTooltip: !0,
                strings: {
                    cancel: "取消",
                    cancelTitle: "取消样式",
                    tooltip: "点击你要修改的元素",
                    tooltipNext: "隐藏"
                },
                useGrouping: !0,
                styleEditorEventPrefix: "styleeditor:",
                currentElement: null,
                _editLayers: [],
                _layerGroups: []
            },
            initialize: function(t) {
                t && L.setOptions(this, t),
                this.options.util = new L.StyleEditor.Util({
                    styleEditorOptions: this.options
                }),
                this.options.markerType = new this.options.markerType({
                    styleEditorOptions: this.options
                }),
                this.options.markerForm = new this.options.markerType.markerForm({
                    styleEditorOptions: this.options
                }),
                this.options.geometryForm = new this.options.geometryForm({
                    styleEditorOptions: this.options
                }),
                this.getDefaultIcon = this.options.markerType._createMarkerIcon.bind(this.options.markerType),
                this.createIcon = this.options.markerType.createMarkerIcon.bind(this.options.markerType)
            },
            onAdd: function(t) {
                return this.options.map = t,
                this.createUi()
            },
            fireEvent: function(t, e) {
                this.options.util.fireEvent(t, e)
            },
            createUi: function() {
                var t = this.options.controlDiv = L.DomUtil.create("div", "leaflet-control-styleeditor leaflet-control leaflet-bar");
                (this.options.controlUI = L.DomUtil.create("a", "leaflet-control-styleeditor-interior", t)).title = "样式修改器";
                var e = this.options.cancelUI = L.DomUtil.create("div", " leaflet-styleeditor-hidden", t)
                  , i = L.DomUtil.create("a", "leaflet-control-styleeditor-cancel", e);
                i.innerHTML = this.options.strings.cancel,
                i.title = this.options.strings.cancelTitle;
                var n = this.options.styleEditorDiv = L.DomUtil.create("div", "leaflet-styleeditor", this.options.map._container);
                this.options.styleEditorHeader = L.DomUtil.create("div", "leaflet-styleeditor-header", n);
                var r = L.DomUtil.create("div", "leaflet-styleeditor-interior", n);
                return this.addDomEvents(),
                this.addEventListeners(),
                this.addButtons(),
                this.options.styleForm = new L.StyleForm({
                    styleEditorDiv: n,
                    styleEditorInterior: r,
                    styleEditorOptions: this.options
                }),
                t
            },
            addDomEvents: function() {
                L.DomEvent.disableScrollPropagation(this.options.styleEditorDiv),
                L.DomEvent.disableScrollPropagation(this.options.controlDiv),
                L.DomEvent.disableScrollPropagation(this.options.cancelUI),
                L.DomEvent.disableClickPropagation(this.options.styleEditorDiv),
                L.DomEvent.disableClickPropagation(this.options.controlDiv),
                L.DomEvent.disableClickPropagation(this.options.cancelUI),
                L.DomEvent.on(this.options.controlDiv, "click", (function() {
                    this.toggle()
                }
                ), this)
            },
            addEventListeners: function() {
                this.addLeafletDrawEvents(),
                this.addLeafletGeoDrawEvents()
            },
            addLeafletDrawEvents: function() {
                this.options.openOnLeafletDraw && L.Control.Draw && (console.log("s1"),
                this.options.map.on("layeradd", this.onLayerAdd, this),
                this.options.map.on(L.Draw.Event.CREATED, this.onLayerCreated, this))
            },
            addLeafletGeoDrawEvents: function() {
                this.options.openOnLeafletDraw && L.Control.PMButton && (this.options.map.on("layeradd", (function(t) {}
                ), this),
                this.options.map.on("pm:create", (function(t) {
                    this.enable(t.layer),
                    this.removeIndicators()
                    // console.log("4")
                }
                ), this))
            },
            addLeafletEditableEvents: function() {
                this.options.openOnLeafletEditable && L.Editable && (this.options.map.on("layeradd", this.onLayerAdd, this),
                this.options.map.on("editable:created", this.onLayerCreated, this))
            },
            onLayerCreated: function(t) {
                this.removeIndicators(),
                this.options.currentElement = t.layer
            },
            onLayerAdd: function(t) {
                console.log("1"),
                this.options.currentElement && (console.log("2"),
                console.log("3"),
                t.layer === this.options.util.getCurrentElement() && (this.enable(t.layer),
                console.log("4")))
            },
            onRemove: function() {
                this.disable(),
                this.removeDomEvents(),
                this.removeEventListeners(),
                L.DomUtil.remove(this.options.styleEditorDiv),
                L.DomUtil.remove(this.options.cancelUI),
                delete this.options.styleEditorDiv,
                delete this.options.cancelUI
            },
            removeEventListeners: function() {
                this.options.map.off("layeradd", this.onLayerAdd),
                L.Draw && this.options.map.off(L.Draw.Event.CREATED, this.onLayerCreated),
                L.Editable && this.options.map.off("editable:created", this.onLayerCreated)
            },
            removeDomEvents: function() {
                L.DomEvent.off(this.options.controlDiv, "click", (function() {
                    this.toggle()
                }
                ), this)
            },
            addButtons: function() {
                var t = L.DomUtil.create("button", "leaflet-styleeditor-button styleeditor-nextBtn", this.options.styleEditorHeader);
                t.title = this.options.strings.tooltipNext,
                L.DomEvent.on(t, "click", (function(t) {
                    this.hideEditor(),
                    L.DomUtil.hasClass(this.options.controlUI, "enabled") && this.createTooltip(),
                    t.stopPropagation()
                }
                ), this)
            },
            toggle: function() {
                L.DomUtil.hasClass(this.options.controlUI, "enabled") ? this.disable() : this.enable()
            },
            enable: function(t) {
                this._layerIsIgnored(t) || (L.DomUtil.addClass(this.options.controlUI, "enabled"),
                this.options.map.eachLayer(this.addEditClickEvents, this),
                this.showCancelButton(),
                this.createTooltip(),
                void 0 !== t && (this.isEnabled() && this.removeIndicators(),
                this.initChangeStyle({
                    target: t
                })))
            },
            isEnabled: function() {
                return L.DomUtil.hasClass(this.options.controlUI, "enabled")
            },
            disable: function() {
                this.isEnabled() && (this.options._editLayers.forEach(this.removeEditClickEvents, this),
                this.options._editLayers = [],
                this.options._layerGroups = [],
                this.hideEditor(),
                this.hideCancelButton(),
                this.removeTooltip(),
                L.DomUtil.removeClass(this.options.controlUI, "enabled"))
            },
            addEditClickEvents: function(t) {
                if (!this._layerIsIgnored(t))
                    if (this.options.useGrouping && t instanceof L.LayerGroup)
                        this.options._layerGroups.push(t);
                    else if (t instanceof L.Marker || t instanceof L.Path) {
                        var e = t.on("click", this.initChangeStyle, this);
                        this.options._editLayers.push(e)
                    }
            },
            removeEditClickEvents: function(t) {
                t.off("click", this.initChangeStyle, this)
            },
            addIndicators: function() {
                if (this.options.currentElement) {
                    var t = this.options.currentElement.target;
                    t instanceof L.LayerGroup ? t.eachLayer((function(t) {
                        t instanceof L.Marker && t.getElement() && L.DomUtil.addClass(t.getElement(), "leaflet-styleeditor-marker-selected")
                    }
                    )) : t instanceof L.Marker && t.getElement() && L.DomUtil.addClass(t.getElement(), "leaflet-styleeditor-marker-selected")
                }
            },
            removeIndicators: function() {
                if (this.options.currentElement) {
                    var t = this.options.util.getCurrentElement();
                    t instanceof L.LayerGroup ? t.eachLayer((function(t) {
                        t.getElement() && L.DomUtil.removeClass(t.getElement(), "leaflet-styleeditor-marker-selected")
                    }
                    )) : t.getElement() && L.DomUtil.removeClass(t.getElement(), "leaflet-styleeditor-marker-selected")
                }
            },
            hideEditor: function() {
                L.DomUtil.hasClass(this.options.styleEditorDiv, "editor-enabled") && (this.removeIndicators(),
                L.DomUtil.removeClass(this.options.styleEditorDiv, "editor-enabled"),
                this.fireEvent("hidden"))
            },
            hideCancelButton: function() {
                L.DomUtil.addClass(this.options.cancelUI, "leaflet-styleeditor-hidden")
            },
            showEditor: function() {
                var t = this.options.styleEditorDiv;
                L.DomUtil.hasClass(t, "editor-enabled") || (L.DomUtil.addClass(t, "editor-enabled"),
                this.fireEvent("visible"))
            },
            showCancelButton: function() {
                L.DomUtil.removeClass(this.options.cancelUI, "leaflet-styleeditor-hidden")
            },
            initChangeStyle: function(t) {
                this.removeIndicators(),
                this.options.currentElement = this.options.useGrouping ? this.getMatchingElement(t) : t,
                this.addIndicators(),
                this.showEditor(),
                this.removeTooltip();
                var e = t;
                e instanceof L.Layer || (e = t.target),
                this.fireEvent("editing", e),
                e instanceof L.Marker ? (this.options.markerType.resetIconOptions(),
                this.showMarkerForm(e)) : this.showGeometryForm(e)
            },
            showGeometryForm: function(t) {
                this.fireEvent("geometry", t),
                this.options.styleForm.showGeometryForm()
            },
            showMarkerForm: function(t) {
                this.fireEvent("marker", t),
                this.options.styleForm.showMarkerForm()
            },
            createTooltip: function() {
                this.options.showTooltip && (this.options.tooltipWrapper || (this.options.tooltipWrapper = L.DomUtil.create("div", "leaflet-styleeditor-tooltip-wrapper", this.options.map.getContainer())),
                this.options.tooltip || (this.options.tooltip = L.DomUtil.create("div", "leaflet-styleeditor-tooltip", this.options.tooltipWrapper)),
                this.options.tooltip.innerHTML = this.options.strings.tooltip)
            },
            getMatchingElement: function(t) {
                for (var e = null, i = t.target, n = 0; n < this.options._layerGroups.length; ++n)
                    if ((e = this.options._layerGroups[n]) && i !== e && e.hasLayer(i))
                        return e.options && e.options.opacity || (e.options = i.options,
                        i.setIcon && (e.setIcon = function(t) {
                            e.eachLayer((function(e) {
                                e instanceof L.Marker && e.setIcon(t)
                            }
                            ))
                        }
                        )),
                        this.getMatchingElement({
                            target: e
                        });
                return t
            },
            removeTooltip: function() {
                this.options.tooltip && this.options.tooltip.parentNode && (this.options.tooltip.remove(),
                this.options.tooltip = void 0)
            },
            _layerIsIgnored: function(t) {
                return void 0 !== t && this.options.ignoreLayerTypes.some((function(e) {
                    return t.styleEditor && t.styleEditor.type.toUpperCase() === e.toUpperCase()
                }
                ))
            }
        }),
        L.control.styleEditor = function(t) {
            return t = t || {},
            new L.Control.StyleEditor(t)
        }
        ,
        e.default = L
    }
    ],
    o.c = r,
    o.d = function(t, e, i) {
        o.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: i
        })
    }
    ,
    o.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }
    ,
    o.t = function(t, e) {
        if (1 & e && (t = o(t)),
        8 & e)
            return t;
        if (4 & e && "object" == i(t) && t && t.__esModule)
            return t;
        var n = Object.create(null);
        if (o.r(n),
        Object.defineProperty(n, "default", {
            enumerable: !0,
            value: t
        }),
        2 & e && "string" != typeof t)
            for (var r in t)
                o.d(n, r, function(e) {
                    return t[e]
                }
                .bind(null, r));
        return n
    }
    ,
    o.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        }
        : function() {
            return t
        }
        ;
        return o.d(e, "a", e),
        e
    }
    ,
    o.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    ,
    o.p = "",
    o(o.s = 2)
}
, function(t, e, i) {}
, function(t, e, i) {
    "use strict";
    i.r(e),
    i(59);
    var n = i(41)
      , r = i(42)
      , o = i.n(r)
      , a = i(43)
      , s = i(44)
      , l = i(45)
      , c = i(46)
      , h = i(47)
      , p = i(48)
      , u = i(49)
      , d = i(50)
      , f = i(51)
      , g = i(52)
      , m = {
        en: a,
        de: s,
        it: l,
        id: c,
        ro: h,
        ru: p,
        es: u,
        nl: d,
        fr: f,
        pt_br: i(53),
        zh: g,
        pl: i(54),
        sv: i(55)
    };
    function y(t, e) {
        var i = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e && (n = n.filter((function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }
            ))),
            i.push.apply(i, n)
        }
        return i
    }
    function _(t) {
        for (var e = 1; e < arguments.length; e++) {
            var i = null != arguments[e] ? arguments[e] : {};
            e % 2 ? y(Object(i), !0).forEach((function(e) {
                v(t, e, i[e])
            }
            )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : y(Object(i)).forEach((function(e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
            }
            ))
        }
        return t
    }
    function v(t, e, i) {
        return e in t ? Object.defineProperty(t, e, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = i,
        t
    }
    var k = L.Class.extend({
        initialize: function(t) {
            this.map = t,
            this.Draw = new L.PM.Draw(t),
            this.Toolbar = new L.PM.Toolbar(t),
            this._globalRemovalMode = !1,
            this.globalOptions = {
                snappable: !0
            }
        },
        setLang: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "en"
              , e = 1 < arguments.length ? arguments[1] : void 0
              , i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "en";
            e && (m[t] = o()(m[i], e)),
            L.PM.activeLang = t,
            this.map.pm.Toolbar.reinit()
        },
        addControls: function(t) {
            this.Toolbar.addControls(t)
        },
        removeControls: function() {
            this.Toolbar.removeControls()
        },
        toggleControls: function() {
            this.Toolbar.toggleControls()
        },
        controlsVisible: function() {
            return this.Toolbar.isVisible
        },
        enableDraw: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "Polygon"
              , e = 1 < arguments.length ? arguments[1] : void 0;
            "Poly" === t && (t = "Polygon"),
            this.Draw.enable(t, e)
        },
        disableDraw: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "Polygon";
            "Poly" === t && (t = "Polygon"),
            this.Draw.disable(t)
        },
        setPathOptions: function(t) {
            this.Draw.setPathOptions(t)
        },
        findLayers: function() {
            var t = [];
            return this.map.eachLayer((function(e) {
                (e instanceof L.Polyline || e instanceof L.Marker || e instanceof L.Circle || e instanceof L.CircleMarker) && t.push(e)
            }
            )),
            t = (t = t.filter((function(t) {
                return !!t.pm
            }
            ))).filter((function(t) {
                return !t._pmTempLayer
            }
            ))
        },
        removeLayer: function(t) {
            var e = t.target;
            e._pmTempLayer || e.pm && e.pm.dragging() || (e.remove(),
            this.map.fire("pm:remove", {
                layer: e
            }),
            console.log("L.PM.Map.js移除"))
        },
        globalDragModeEnabled: function() {
            return !!this._globalDragMode
        },
        enableGlobalDragMode: function() {
            var t = this.findLayers();
            this._globalDragMode = !0,
            t.forEach((function(t) {
                t.pm.enableLayerDrag()
            }
            )),
            this.map.on("layeradd", this.layerAddHandler, this),
            this.Toolbar.toggleButton("dragMode", this._globalDragMode),
            this._fireDragModeEvent(!0)
        },
        disableGlobalDragMode: function() {
            var t = this.findLayers();
            this._globalDragMode = !1,
            t.forEach((function(t) {
                t.pm.disableLayerDrag()
            }
            )),
            this.map.off("layeradd", this.layerAddHandler, this),
            this.Toolbar.toggleButton("dragMode", this._globalDragMode),
            this._fireDragModeEvent(!1)
        },
        _fireDragModeEvent: function(t) {
            this.map.fire("pm:globaldragmodetoggled", {
                enabled: t,
                map: this.map
            })
        },
        toggleGlobalDragMode: function() {
            this.globalDragModeEnabled() ? this.disableGlobalDragMode() : this.enableGlobalDragMode()
        },
        layerAddHandler: function(t) {
            var e = t.layer;
            !e.pm || e._pmTempLayer || (this.globalRemovalEnabled() && (this.disableGlobalRemovalMode(),
            this.enableGlobalRemovalMode()),
            this.globalEditEnabled() && (this.disableGlobalEditMode(),
            this.enableGlobalEditMode()),
            this.globalDragModeEnabled() && (this.disableGlobalDragMode(),
            this.enableGlobalDragMode()))
        },
        disableGlobalRemovalMode: function() {
            var t = this;
            this._globalRemovalMode = !1,
            this.map.eachLayer((function(e) {
                e.off("click", t.removeLayer, t)
            }
            )),
            this.map.off("layeradd", this.layerAddHandler, this),
            this.Toolbar.toggleButton("deleteLayer", this._globalRemovalMode),
            this._fireRemovalModeEvent(!1)
        },
        enableGlobalRemovalMode: function() {
            var t = this;
            this._globalRemovalMode = !0,
            this.map.eachLayer((function(e) {
                (function(t) {
                    return t.pm && !(t.pm.options && t.pm.options.preventMarkerRemoval) && !(t instanceof L.LayerGroup)
                }
                )(e) && e.on("click", t.removeLayer, t)
            }
            )),
            this.map.on("layeradd", this.layerAddHandler, this),
            this.Toolbar.toggleButton("deleteLayer", this._globalRemovalMode),
            this._fireRemovalModeEvent(!0)
        },
        _fireRemovalModeEvent: function(t) {
            this.map.fire("pm:globalremovalmodetoggled", {
                enabled: t,
                map: this.map
            })
        },
        toggleGlobalRemovalMode: function() {
            this.globalRemovalEnabled() ? this.disableGlobalRemovalMode() : this.enableGlobalRemovalMode()
        },
        globalRemovalEnabled: function() {
            return !!this._globalRemovalMode
        },
        getGlobalOptions: function() {
            return this.globalOptions
        },
        setGlobalOptions: function(t) {
            var e = this
              , i = _({}, this.globalOptions, {}, t);
            this.map.pm.Draw.shapes.forEach((function(t) {
                e.map.pm.Draw[t].setOptions(i)
            }
            )),
            this.findLayers().forEach((function(t) {
                t.pm.setOptions(i)
            }
            )),
            this.applyGlobalOptions(),
            this.globalOptions = i
        },
        applyGlobalOptions: function() {
            this.findLayers().forEach((function(t) {
                t.pm.enabled() && t.pm.applyOptions()
            }
            ))
        },
        globalEditEnabled: function() {
            return this._globalEditMode
        },
        enableGlobalEditMode: function(t) {
            var e = _({
                snappable: this._globalSnappingEnabled
            }, t)
              , i = this.findLayers();
            this._globalEditMode = !0,
            this.Toolbar.toggleButton("editMode", this._globalEditMode),
            i.forEach((function(t) {
                t.pm.enable(e)
            }
            )),
            this.map.on("layeradd", this.layerAddHandler, this),
            this._fireEditModeEvent(!0)
        },
        disableGlobalEditMode: function() {
            var t = this.findLayers();
            this._globalEditMode = !1,
            t.forEach((function(t) {
                t.pm.disable()
            }
            )),
            this.map.off("layeroff", this.layerAddHandler, this),
            this.Toolbar.toggleButton("editPolygon", this._globalEditMode),
            this._fireEditModeEvent(!1)
        },
        _fireEditModeEvent: function(t) {
            this.map.fire("pm:globaleditmodetoggled", {
                enabled: t,
                map: this.map
            })
        },
        toggleGlobalEditMode: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.globalOptions;
            this.globalEditEnabled() ? this.disableGlobalEditMode() : this.enableGlobalEditMode(t)
        }
    })
      , b = i(0)
      , M = i.n(b)
      , E = i(56)
      , w = i.n(E);
    function C(t) {
        var e = L.PM.activeLang;
        return w()(m, e) || (e = "en"),
        M()(m[e], t)
    }
    var S = L.Control.extend({
        options: {
            position: "topleft"
        },
        initialize: function(t) {
            this._button = Object.assign({}, this.options, t)
        },
        onAdd: function(t) {
            return this._map = t,
            "edit" === this._button.tool ? this._container = this._map.pm.Toolbar.editContainer : "options" === this._button.tool ? this._container = this._map.pm.Toolbar.optionsContainer : this._container = this._map.pm.Toolbar.drawContainer,
            this.buttonsDomNode = this._makeButton(this._button),
            this._container.appendChild(this.buttonsDomNode),
            this._container
        },
        onRemove: function() {
            return this.buttonsDomNode.remove(),
            this._container
        },
        getText: function() {
            return this._button.text
        },
        getIconUrl: function() {
            return this._button.iconUrl
        },
        destroy: function() {
            this._button = {},
            this._update()
        },
        toggle: function(t) {
            return this._button.toggleStatus = "boolean" == typeof t ? t : !this._button.toggleStatus,
            this._applyStyleClasses(),
            this._button.toggleStatus
        },
        toggled: function() {
            return this._button.toggleStatus
        },
        onCreate: function() {
            this.toggle(!1)
        },
        _triggerClick: function(t) {
            this._button.onClick(t),
            this._clicked(t),
            this._button.afterClick(t)
        },
        _makeButton: function(t) {
            var e = this
              , i = L.DomUtil.create("div", "button-container", this._container)
              , n = L.DomUtil.create("a", "leaflet-buttons-control-button", i)
              , r = L.DomUtil.create("div", "leaflet-pm-actions-container", i)
              , o = t.actions
              , a = {
                cancel: {
                    text: C("actions.cancel"),
                    onClick: function() {
                        this._triggerClick()
                    }
                },
                finishMode: {
                    text: C("actions.finish"),
                    onClick: function() {
                        this._triggerClick()
                    }
                },
                removeLastVertex: {
                    text: C("actions.removeLastVertex"),
                    onClick: function() {
                        this._map.pm.Draw[t.jsClass]._removeLastVertex()
                    }
                },
                finish: {
                    text: C("actions.finish"),
                    onClick: function(e) {
                        this._map.pm.Draw[t.jsClass]._finishShape(e)
                    }
                }
            };
            o.forEach((function(t) {
                var i = a[t]
                  , n = L.DomUtil.create("a", "leaflet-pm-action action-".concat(t), r);
                n.innerHTML = i.text,
                L.DomEvent.addListener(n, "click", i.onClick, e),
                L.DomEvent.disableClickPropagation(n)
            }
            )),
            t.toggleStatus && L.DomUtil.addClass(i, "active");
            var s = L.DomUtil.create("div", "control-icon", n);
            return t.title && s.setAttribute("title", t.title),
            t.iconUrl && s.setAttribute("src", t.iconUrl),
            t.className && L.DomUtil.addClass(s, t.className),
            L.DomEvent.addListener(n, "click", (function() {
                e._button.disableOtherButtons && e._map.pm.Toolbar.triggerClickOnToggledButtons(e)
            }
            )),
            L.DomEvent.addListener(n, "click", this._triggerClick, this),
            L.DomEvent.disableClickPropagation(n),
            i
        },
        _applyStyleClasses: function() {
            this._container && (this._button.toggleStatus ? L.DomUtil.addClass(this.buttonsDomNode, "active") : L.DomUtil.removeClass(this.buttonsDomNode, "active"))
        },
        _clicked: function() {
            this._button.doToggle && this.toggle()
        }
    });
    L.Control.PMButton = S;
    var O = L.Class.extend({
        options: {
            drawMarker: !0,
            drawRectangle: !0,
            drawPolyline: !0,
            drawSingleline: !0,
            drawPolygon: !0,
            drawCircle: !0,
            drawCircleMarker: !0,
            editMode: !0,
            dragMode: !0,
            cutPolygon: !0,
            removalMode: !0,
            snappingOption: !0,
            position: "topleft"
        },
        initialize: function(t) {
            this.init(t)
        },
        reinit: function() {
            var t = this.isVisible;
            this.removeControls(),
            this._defineButtons(),
            t && this.addControls()
        },
        init: function(t) {
            this.map = t,
            this.buttons = {},
            this.isVisible = !1,
            this.drawContainer = L.DomUtil.create("div", "leaflet-pm-toolbar leaflet-pm-draw leaflet-bar leaflet-control"),
            this.editContainer = L.DomUtil.create("div", "leaflet-pm-toolbar leaflet-pm-edit leaflet-bar leaflet-control"),
            this.optionsContainer = L.DomUtil.create("div", "leaflet-pm-toolbar leaflet-pm-options leaflet-bar leaflet-control"),
            this._defineButtons()
        },
        getButtons: function() {
            return this.buttons
        },
        addControls: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.options;
            void 0 !== t.editPolygon && (t.editMode = t.editPolygon),
            void 0 !== t.deleteLayer && (t.removalMode = t.deleteLayer),
            L.Util.setOptions(this, t),
            this.applyIconStyle(),
            this._showHideButtons(),
            this.isVisible = !0
        },
        applyIconStyle: function() {
            var t = this.getButtons()
              , e = {
                geomanIcons: {
                    drawMarker: "control-icon leaflet-pm-icon-marker",
                    drawPolyline: "control-icon leaflet-pm-icon-polyline",
                    drawSingleline: "control-icon leaflet-pm-icon-polyline",
                    drawRectangle: "control-icon leaflet-pm-icon-rectangle",
                    drawPolygon: "control-icon leaflet-pm-icon-polygon",
                    drawCircle: "control-icon leaflet-pm-icon-circle",
                    drawCircleMarker: "control-icon leaflet-pm-icon-circle-marker",
                    editMode: "control-icon leaflet-pm-icon-edit",
                    dragMode: "control-icon leaflet-pm-icon-drag",
                    cutPolygon: "control-icon leaflet-pm-icon-cut",
                    removalMode: "control-icon leaflet-pm-icon-delete"
                }
            };
            for (var i in t) {
                var n = t[i];
                L.Util.setOptions(n, {
                    className: e.geomanIcons[i]
                })
            }
        },
        removeControls: function() {
            var t = this.getButtons();
            for (var e in t)
                t[e].remove();
            this.isVisible = !1
        },
        toggleControls: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.options;
            this.isVisible ? this.removeControls() : this.addControls(t)
        },
        _addButton: function(t, e) {
            return this.buttons[t] = e,
            this.options[t] = this.options[t] || !1,
            this.buttons[t]
        },
        triggerClickOnToggledButtons: function(t) {
            var e = ["snappingOption"];
            for (var i in this.buttons)
                !e.includes(i) && this.buttons[i] !== t && this.buttons[i].toggled() && this.buttons[i]._triggerClick()
        },
        toggleButton: function(t, e) {
            return "editPolygon" === t && (t = "editMode"),
            "deleteLayer" === t && (t = "removalMode"),
            (!(2 < arguments.length && void 0 !== arguments[2]) || arguments[2]) && this.triggerClickOnToggledButtons(this.buttons[t]),
            this.buttons[t].toggle(e)
        },
        _defineButtons: function() {
            var t = this
              , e = {
                className: "control-icon leaflet-pm-icon-marker",
                title: C("buttonTitles.drawMarkerButton"),
                jsClass: "Marker",
                onClick: function() {},
                afterClick: function() {
                    t.map.pm.Draw.Marker.toggle()
                },
                doToggle: !0,
                toggleStatus: !1,
                disableOtherButtons: !0,
                position: this.options.position,
                actions: ["cancel"]
            }
              , i = {
                title: C("buttonTitles.drawPolyButton"),
                className: "control-icon leaflet-pm-icon-polygon",
                jsClass: "Polygon",
                onClick: function() {},
                afterClick: function() {
                    t.map.pm.Draw.Polygon.toggle()
                },
                doToggle: !0,
                toggleStatus: !1,
                disableOtherButtons: !0,
                position: this.options.position,
                actions: ["finish", "removeLastVertex", "cancel"]
            }
              , n = {
                className: "control-icon leaflet-pm-icon-polyline",
                title: C("buttonTitles.drawLineButton"),
                jsClass: "Line",
                onClick: function() {},
                afterClick: function() {
                    t.map.pm.Draw.Line.toggle()
                },
                doToggle: !0,
                toggleStatus: !1,
                disableOtherButtons: !0,
                position: this.options.position,
                actions: ["finish", "removeLastVertex", "cancel"]
            }
              , r = {
                className: "control-icon leaflet-pm-icon-singleline",
                title: C("buttonTitles.drawLineButton"),
                jsClass: "SingleLine",
                onClick: function() {},
                afterClick: function() {
                    t.map.pm.Draw.SingleLine.toggle()
                },
                doToggle: !0,
                toggleStatus: !1,
                disableOtherButtons: !0,
                position: this.options.position,
                actions: ["cancel"]
            }
              , o = {
                title: C("buttonTitles.drawCircleButton"),
                className: "control-icon leaflet-pm-icon-circle",
                jsClass: "Circle",
                onClick: function() {},
                afterClick: function() {
                    t.map.pm.Draw.Circle.toggle()
                },
                doToggle: !0,
                toggleStatus: !1,
                disableOtherButtons: !0,
                position: this.options.position,
                actions: ["cancel"]
            }
              , a = {
                title: C("buttonTitles.drawCircleMarkerButton"),
                className: "control-icon leaflet-pm-icon-circle-marker",
                jsClass: "CircleMarker",
                onClick: function() {},
                afterClick: function() {
                    t.map.pm.Draw.CircleMarker.toggle()
                },
                doToggle: !0,
                toggleStatus: !1,
                disableOtherButtons: !0,
                position: this.options.position,
                actions: ["cancel"]
            }
              , s = {
                title: C("buttonTitles.drawRectButton"),
                className: "control-icon leaflet-pm-icon-rectangle",
                jsClass: "Rectangle",
                onClick: function() {},
                afterClick: function() {
                    t.map.pm.Draw.Rectangle.toggle()
                },
                doToggle: !0,
                toggleStatus: !1,
                disableOtherButtons: !0,
                position: this.options.position,
                actions: ["cancel"]
            }
              , l = {
                title: C("buttonTitles.editButton"),
                className: "control-icon leaflet-pm-icon-edit",
                onClick: function() {},
                afterClick: function() {
                    t.map.pm.toggleGlobalEditMode()
                },
                doToggle: !0,
                toggleStatus: !1,
                disableOtherButtons: !0,
                position: this.options.position,
                tool: "edit",
                actions: ["finishMode"]
            }
              , c = {
                title: C("buttonTitles.dragButton"),
                className: "control-icon leaflet-pm-icon-drag",
                onClick: function() {},
                afterClick: function() {
                    t.map.pm.toggleGlobalDragMode()
                },
                doToggle: !0,
                toggleStatus: !1,
                disableOtherButtons: !0,
                position: this.options.position,
                tool: "edit",
                actions: ["finishMode"]
            }
              , h = {
                title: C("buttonTitles.cutButton"),
                className: "control-icon leaflet-pm-icon-cut",
                jsClass: "Cut",
                onClick: function() {},
                afterClick: function() {
                    t.map.pm.Draw.Cut.toggle({
                        snappable: !0,
                        cursorMarker: !0,
                        allowSelfIntersection: !1
                    })
                },
                doToggle: !0,
                toggleStatus: !1,
                disableOtherButtons: !0,
                position: this.options.position,
                tool: "edit",
                actions: ["finish", "removeLastVertex", "cancel"]
            }
              , p = {
                title: C("buttonTitles.deleteButton"),
                className: "control-icon leaflet-pm-icon-delete",
                onClick: function() {},
                afterClick: function() {
                    t.map.pm.toggleGlobalRemovalMode()
                },
                doToggle: !0,
                toggleStatus: !1,
                disableOtherButtons: !0,
                position: this.options.position,
                tool: "edit",
                actions: ["finishMode"]
            };
            this._addButton("drawMarker", new L.Control.PMButton(e)),
            // this._addButton("drawSingleline", new L.Control.PMButton(r)),
            this._addButton("drawPolyline", new L.Control.PMButton(n)),            
            this._addButton("drawPolygon", new L.Control.PMButton(i)),
            this._addButton("drawRectangle", new L.Control.PMButton(s)),
            this._addButton("drawCircle", new L.Control.PMButton(o)),
            this._addButton("drawCircleMarker", new L.Control.PMButton(a)),
            this._addButton("editMode", new L.Control.PMButton(l)),
            this._addButton("dragMode", new L.Control.PMButton(c)),
            this._addButton("cutPolygon", new L.Control.PMButton(h)),
            this._addButton("removalMode", new L.Control.PMButton(p))
        },
        _showHideButtons: function() {
            this.removeControls();
            var t = this.getButtons();
            for (var e in t)
                this.options[e] && (t[e].setPosition(this.options.position),
                t[e].addTo(this.map))
        }
    })
      , x = (i(136),
    {
        calcMiddleLatLng: function(t, e, i) {
            var n = t.project(e)
              , r = t.project(i);
            return t.unproject(n._add(r)._divideBy(2))
        }
    })
      , D = {
        _initSnappableMarkers: function() {
            this.options.snapDistance = this.options.snapDistance || 30,
            this._assignEvents(this._markers),
            this._layer.off("pm:dragstart", this._unsnap, this),
            this._layer.on("pm:dragstart", this._unsnap, this)
        },
        _disableSnapping: function() {
            this._layer.off("pm:dragstart", this._unsnap, this)
        },
        _assignEvents: function(t) {
            var e = this;
            t.forEach((function(t) {
                Array.isArray(t) ? e._assignEvents(t) : (t.off("drag", e._handleSnapping, e),
                t.on("drag", e._handleSnapping, e),
                t.off("dragend", e._cleanupSnapping, e),
                t.on("dragend", e._cleanupSnapping, e))
            }
            ))
        },
        _unsnap: function() {
            delete this._snapLatLng
        },
        _cleanupSnapping: function() {
            delete this._snapList,
            this._map.off("pm:remove", this._handleSnapLayerRemoval, this),
            this.debugIndicatorLines && this.debugIndicatorLines.forEach((function(t) {
                t.remove()
            }
            ))
        },
        _handleSnapLayerRemoval: function(t) {
            var e = t.layer
              , i = this._snapList.findIndex((function(t) {
                return t._leaflet_id === e._leaflet_id
            }
            ));
            this._snapList.splice(i, 1)
        },
        _handleSnapping: function(t) {
            var e = this;
            if (t.originalEvent.altKey)
                return !1;
            if (void 0 === this._snapList && (this._createSnapList(),
            this._map.off("layeradd", this._createSnapList, this),
            this._map.on("layeradd", this._createSnapList, this)),
            this._snapList.length <= 0)
                return !1;
            var i, n = t.target, r = this._calcClosestLayer(n.getLatLng(), this._snapList), o = r.layer instanceof L.Marker || r.layer instanceof L.CircleMarker;
            i = o ? r.latlng : this._checkPrioritiySnapping(r);
            var a = this.options.snapDistance
              , s = {
                marker: n,
                snapLatLng: i,
                segment: r.segment,
                layer: this._layer,
                layerInteractedWith: r.layer,
                distance: r.distance
            };
            if (s.marker.fire("pm:snapdrag", s),
            this._layer.fire("pm:snapdrag", s),
            r.distance < a) {
                n.setLatLng(i),
                n._snapped = !0;
                var l = this._snapLatLng || {}
                  , c = i || {};
                l.lat === c.lat && l.lng === c.lng || (e._snapLatLng = i,
                n.fire("pm:snap", s),
                e._layer.fire("pm:snap", s))
            } else
                this._snapLatLng && (this._unsnap(s),
                n._snapped = !1,
                s.marker.fire("pm:unsnap", s),
                this._layer.fire("pm:unsnap", s));
            return !0
        },
        _checkPrioritiySnapping: function(t) {
            var e, i = this._map, n = t.segment[0], r = t.segment[1], o = t.latlng, a = this._getDistance(i, n, o), s = this._getDistance(i, r, o), l = a < s ? n : r, c = a < s ? a : s;
            if (this.options.snapMiddle) {
                var h = x.calcMiddleLatLng(i, n, r)
                  , p = this._getDistance(i, h, o);
                p < a && p < s && (l = h,
                c = p)
            }
            return e = c < this.options.snapDistance ? l : o,
            Object.assign({}, e)
        },
        _createSnapList: function() {
            var t = this
              , e = []
              , i = []
              , n = this._map;
            n.off("pm:remove", this._handleSnapLayerRemoval, this),
            n.on("pm:remove", this._handleSnapLayerRemoval, this),
            n.eachLayer((function(t) {
                if ((t instanceof L.Polyline || t instanceof L.Marker || t instanceof L.CircleMarker) && !0 !== t.options.snapIgnore) {
                    e.push(t);
                    var n = L.polyline([], {
                        color: "red",
                        pmIgnore: !0
                    });
                    n._pmTempLayer = !0,
                    i.push(n)
                }
            }
            )),
            e = (e = (e = e.filter((function(e) {
                return t._layer !== e
            }
            ))).filter((function(t) {
                return t._latlng || t._latlngs && 0 < t._latlngs.length
            }
            ))).filter((function(t) {
                return !t._pmTempLayer
            }
            )),
            this._otherSnapLayers ? this._snapList = e.concat(this._otherSnapLayers) : this._snapList = e,
            this.debugIndicatorLines = i
        },
        _calcClosestLayer: function(t, e) {
            var i = this
              , n = {};
            return e.forEach((function(e, r) {
                var o = i._calcLayerDistances(t, e);
                i.debugIndicatorLines[r].setLatLngs([t, o.latlng]),
                (void 0 === n.distance || o.distance < n.distance) && ((n = o).layer = e)
            }
            )),
            n
        },
        _calcLayerDistances: function(t, e) {
            var i, n, r = this, o = this._map, a = e instanceof L.Marker || e instanceof L.CircleMarker, s = e instanceof L.Polygon, l = t, c = a ? e.getLatLng() : e.getLatLngs();
            if (a)
                return {
                    latlng: Object.assign({}, c),
                    distance: this._getDistance(o, c, l)
                };
            !function t(e) {
                e.forEach((function(a, c) {
                    if (Array.isArray(a))
                        t(a);
                    else {
                        var h, p = a;
                        h = s ? c + 1 === e.length ? 0 : c + 1 : c + 1 === e.length ? void 0 : c + 1;
                        var u = e[h];
                        if (u) {
                            var d = r._getDistanceToSegment(o, l, p, u);
                            (void 0 === n || d < n) && (n = d,
                            i = [p, u])
                        }
                    }
                }
                ))
            }(c);
            var h = this._getClosestPointOnSegment(o, t, i[0], i[1]);
            return {
                latlng: Object.assign({}, h),
                segment: i,
                distance: n
            }
        },
        _getClosestPointOnSegment: function(t, e, i, n) {
            var r = t.getMaxZoom();
            r === 1 / 0 && (r = t.getZoom());
            var o = t.project(e, r)
              , a = t.project(i, r)
              , s = t.project(n, r)
              , l = L.LineUtil.closestPointOnSegment(o, a, s);
            return t.unproject(l, r)
        },
        _getDistanceToSegment: function(t, e, i, n) {
            var r = t.latLngToLayerPoint(e)
              , o = t.latLngToLayerPoint(i)
              , a = t.latLngToLayerPoint(n);
            return L.LineUtil.pointToSegmentDistance(r, o, a)
        },
        _getDistance: function(t, e, i) {
            return t.latLngToLayerPoint(e).distanceTo(t.latLngToLayerPoint(i))
        }
    }
      , P = L.Class.extend({
        includes: [D],
        options: {
            snappable: !0,
            snapDistance: 20,
            tooltips: !0,
            cursorMarker: !0,
            finishOnDoubleClick: !1,
            finishOn: null,
            allowSelfIntersection: !0,
            templineStyle: {},
            hintlineStyle: {
                color: "#3388ff",
                dashArray: "5,5"
            },
            markerStyle: {
                draggable: !0
            }
        },
        setOptions: function(t) {
            L.Util.setOptions(this, t)
        },
        initialize: function(t) {
            var e = this;
            this._map = t,
            this.shapes = ["Marker", "CircleMarker", "Line", "SingleLine", "Polygon", "Rectangle", "Circle", "Cut"],
            this.shapes.forEach((function(t) {
                e[t] = new L.PM.Draw[t](e._map)
            }
            ))
        },
        setPathOptions: function(t) {
            this.options.pathOptions = t
        },
        getShapes: function() {
            return this.shapes
        },
        enable: function(t, e) {
            if (!t)
                throw new Error("Error: Please pass a shape as a parameter. Possible shapes are: ".concat(this.getShapes().join(",")));
            this.disable(),
            this[t].enable(e)
        },
        disable: function() {
            var t = this;
            this.shapes.forEach((function(e) {
                t[e].disable()
            }
            ))
        },
        addControls: function() {
            var t = this;
            this.shapes.forEach((function(e) {
                t[e].addButton()
            }
            ))
        }
    });
    P.Marker = P.extend({
        initialize: function(t) {
            this._map = t,
            this._shape = "Marker",
            this.toolbarButtonName = "drawMarker"
        },
        enable: function(t) {
            var e = this;
            L.Util.setOptions(this, t),
            this._enabled = !0,
            this._map.on("click", this._createMarker, this),
            this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0);
            var i = L.icon({
                iconUrl: "https://api.tiles.mapbox.com/v3/marker/pin-s-circle-stroked+1abc9c.png",
                iconSize: [20, 50],
                className: "",
                iconAnchor: [10, 25]
            });
            this._hintMarker = L.marker([0, 0], this.options.markerStyle),
            this._hintMarker.setIcon(i),
            this._hintMarker._pmTempLayer = !0,
            this._hintMarker.addTo(this._map),
            this.options.tooltips && this._hintMarker.bindTooltip(C("tooltips.placeMarker"), {
                permanent: !0,
                offset: L.point(0, 10),
                direction: "bottom",
                opacity: .8
            }).openTooltip(),
            this._layer = this._hintMarker,
            this._map.on("mousemove", this._syncHintMarker, this),
            this._map.fire("pm:drawstart", {
                shape: this._shape,
                workingLayer: this._layer
            }),
            this._map.eachLayer((function(t) {
                e.isRelevantMarker(t) && t.pm.enable()
            }
            ))
        },
        disable: function() {
            var t = this;
            this._enabled && (this._map.off("click", this._createMarker, this),
            this._hintMarker.remove(),
            this._map.off("mousemove", this._syncHintMarker, this),
            this._map.eachLayer((function(e) {
                t.isRelevantMarker(e) && e.pm.disable()
            }
            )),
            this._map.fire("pm:drawend", {
                shape: this._shape
            }),
            this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !1),
            this.options.snappable && this._cleanupSnapping(),
            this._enabled = !1)
        },
        isRelevantMarker: function(t) {
            return t instanceof L.Marker && t.pm && !t._pmTempLayer
        },
        enabled: function() {
            return this._enabled
        },
        toggle: function(t) {
            this.enabled() ? this.disable() : this.enable(t)
        },
        _createMarker: function(t) {
            if (t.latlng) {
                this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
                var e = this._hintMarker.getLatLng()
                  , i = (L.divIcon({
                    html: '<div style="text-align: center">#</div><div style="text-align: center"><img src="renjing.png" /></div>',
                    color: "red",
                    iconSize: [50, 50],
                    className: "",
                    iconAnchor: [25, 33]
                }),
                new L.Marker(e,this.options.markerStyle));
                i.addTo(this._map),
                i.pm.enable(),
                this._map.fire("pm:create", {
                    shape: this._shape,
                    marker: i,
                    layer: i
                }),
                this._cleanupSnapping(),
                this.disable()
            }
        },
        _syncHintMarker: function(t) {
            if (this._hintMarker.setLatLng(t.latlng),
            this.options.snappable) {
                var e = t;
                e.target = this._hintMarker,
                this._handleSnapping(e)
            }
        }
    });
    var T = i(3)
      , B = i.n(T);
    P.Line = P.extend({
        initialize: function(t) {
            this._map = t,
            this._shape = "Line",
            this.toolbarButtonName = "drawPolyline",
            this._doesSelfIntersect = !1
        },
        enable: function(t) {
            L.Util.setOptions(this, t),
            this.options.finishOnDoubleClick && !this.options.finishOn && (this.options.finishOn = "dblclick"),
            this._enabled = !0,
            this._layerGroup = new L.LayerGroup,
            this._layerGroup._pmTempLayer = !0,
            this._layerGroup.addTo(this._map),
            this._layer = L.polyline([], this.options.templineStyle),
            this._layer._pmTempLayer = !0,
            this._layerGroup.addLayer(this._layer),
            this._hintline = L.polyline([], this.options.hintlineStyle),
            this._hintline._pmTempLayer = !0,
            this._layerGroup.addLayer(this._hintline),
            this._hintMarker = L.marker(this._map.getCenter(), {
                icon: L.divIcon({
                    className: "marker-icon cursor-marker"
                })
            }),
            this._hintMarker._pmTempLayer = !0,
            this._layerGroup.addLayer(this._hintMarker),
            this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"),
            this.options.tooltips && this._hintMarker.bindTooltip(C("tooltips.firstVertex"), {
                permanent: !0,
                offset: L.point(0, 10),
                direction: "bottom",
                opacity: .8
            }).openTooltip(),
            this._map._container.style.cursor = "crosshair",
            this._map.on("click", this._createVertex, this),
            this.options.finishOn && this._map.on(this.options.finishOn, this._finishShape, this),
            "dblclick" === this.options.finishOn && (this.tempMapDoubleClickZoomState = this._map.doubleClickZoom._enabled,
            this.tempMapDoubleClickZoomState && this._map.doubleClickZoom.disable()),
            this._map.on("mousemove", this._syncHintMarker, this),
            this._hintMarker.on("move", this._syncHintLine, this),
            this._map.fire("pm:drawstart", {
                shape: this._shape,
                workingLayer: this._layer
            }),
            this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0),
            this._otherSnapLayers = []
        },
        disable: function() {
            this._enabled && (this._enabled = !1,
            this._map._container.style.cursor = "",
            this._map.off("click", this._createVertex, this),
            this._map.off("mousemove", this._syncHintMarker, this),
            this.options.finishOn && this._map.off(this.options.finishOn, this._finishShape, this),
            this.tempMapDoubleClickZoomState && this._map.doubleClickZoom.enable(),
            this._map.removeLayer(this._layerGroup),
            this._map.fire("pm:drawend", {
                shape: this._shape
            }),
            this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !1),
            this.options.snappable && this._cleanupSnapping())
        },
        enabled: function() {
            return this._enabled
        },
        toggle: function(t) {
            this.enabled() ? this.disable() : this.enable(t)
        },
        hasSelfIntersection: function() {
            return 0 < B()(this._layer.toGeoJSON(15)).features.length
        },
        _syncHintLine: function() {
            var t = this._layer.getLatLngs();
            if (0 < t.length) {
                var e = t[t.length - 1];
                this._hintline.setLatLngs([e, this._hintMarker.getLatLng()])
            }
        },
        _syncHintMarker: function(t) {
            if (this._hintMarker.setLatLng(t.latlng),
            this.options.snappable) {
                var e = t;
                e.target = this._hintMarker,
                this._handleSnapping(e)
            }
            this.options.allowSelfIntersection || this._handleSelfIntersection(!0, t.latlng)
        },
        _handleSelfIntersection: function(t, e) {
            var i = L.polyline(this._layer.getLatLngs());
            t && (e = e || this._hintMarker.getLatLng(),
            i.addLatLng(e));
            var n = B()(i.toGeoJSON(15));
            this._doesSelfIntersect = 0 < n.features.length,
            this._doesSelfIntersect ? this._hintline.setStyle({
                color: "red"
            }) : this._hintline.setStyle(this.options.hintlineStyle)
        },
        _removeLastVertex: function() {
            var t = this._layer.getLatLngs()
              , e = t.pop();
            if (t.length < 1)
                this.disable();
            else {
                var i = this._layerGroup.getLayers().filter((function(t) {
                    return t instanceof L.Marker
                }
                )).filter((function(t) {
                    return !L.DomUtil.hasClass(t._icon, "cursor-marker")
                }
                )).find((function(t) {
                    return t.getLatLng() === e
                }
                ));
                this._layerGroup.removeLayer(i),
                this._layer.setLatLngs(t),
                this._syncHintLine()
            }
        },
        _createVertex: function(t) {
            if (this.options.allowSelfIntersection || (this._handleSelfIntersection(!0, t.latlng),
            !this._doesSelfIntersect)) {
                this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
                var e = this._hintMarker.getLatLng();
                if (e.equals(this._layer.getLatLngs()[0]))
                    this._finishShape(t);
                else {
                    var i = 0 === this._layer.getLatLngs().length;
                    this._layer.addLatLng(e);
                    var n = this._createMarker(e, i);
                    this._hintline.setLatLngs([e, e]),
                    this._layer.fire("pm:vertexadded", {
                        shape: this._shape,
                        workingLayer: this._layer,
                        marker: n,
                        latlng: e
                    })
                }
            }
        },
        _finishShape: function() {
            if (this.options.allowSelfIntersection || (this._handleSelfIntersection(!1),
            !this._doesSelfIntersect)) {
                var t = this._layer.getLatLngs();
                if (!(t.length <= 1)) {
                    var e = L.polyline(t, this.options.pathOptions).addTo(this._map);
                    this.disable(),
                    this._map.fire("pm:create", {
                        shape: this._shape,
                        layer: e
                    }),
                    this.options.snappable && this._cleanupSnapping()
                }
            }
        },
        _createMarker: function(t, e) {
            var i = new L.Marker(t,{
                draggable: !1,
                icon: L.divIcon({
                    className: "marker-icon"
                })
            });
            return i._pmTempLayer = !0,
            this._layerGroup.addLayer(i),
            i.on("click", this._finishShape, this),
            e && this._hintMarker.setTooltipContent(C("tooltips.continueLine")),
            2 === this._layer.getLatLngs().length && this._hintMarker.setTooltipContent(C("tooltips.finishLine")),
            i
        }
    }),
    P.SingleLine = P.extend({
        initialize: function(t) {
            this._map = t,
            this._shape = "SingleLine",
            this.toolbarButtonName = "drawSingleline",
            this._doesSelfIntersect = !1
        },
        enable: function(t) {
            L.Util.setOptions(this, t),
            this._enabled = !0,
            this._layerGroup = new L.LayerGroup,
            this._layerGroup._pmTempLayer = !0,
            this._layerGroup.addTo(this._map),
            this._layer = L.polyline([], this.options.templineStyle),
            this._layer._pmTempLayer = !0,
            this._layerGroup.addLayer(this._layer),
            this._hintline = L.polyline([], this.options.hintlineStyle),
            this._hintline._pmTempLayer = !0,
            this._layerGroup.addLayer(this._hintline),
            this._hintMarker = L.marker(this._map.getCenter(), {
                icon: L.divIcon({
                    className: "marker-icon cursor-marker"
                })
            }),
            this._hintMarker._pmTempLayer = !0,
            this._layerGroup.addLayer(this._hintMarker),
            this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"),
            this.options.tooltips && this._hintMarker.bindTooltip(C("tooltips.firstVertex"), {
                permanent: !0,
                offset: L.point(0, 10),
                direction: "bottom",
                opacity: .8
            }).openTooltip(),
            this._map._container.style.cursor = "crosshair",
            this._map.on("click", this._createVertex, this),
            this._map.on("mousemove", this._syncHintMarker, this),
            this._hintMarker.on("move", this._syncHintLine, this),
            this._map.fire("pm:drawstart", {
                shape: this._shape,
                workingLayer: this._layer
            }),
            this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0),
            this._otherSnapLayers = []
        },
        disable: function() {
            this._enabled && (this._enabled = !1,
            this._map._container.style.cursor = "",
            this._map.off("click", this._finishShape, this),
            this._map.off("click", this._createVertex, this),
            this._map.off("mousemove", this._syncHintMarker, this),
            this._map.doubleClickZoom.enable(),
            this._map.removeLayer(this._layerGroup),
            this._map.fire("pm:drawend", {
                shape: this._shape
            }),
            this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !1),
            this.options.snappable && this._cleanupSnapping())
        },
        enabled: function() {
            return this._enabled
        },
        toggle: function(t) {
            this.enabled() ? this.disable() : this.enable(t)
        },
        _syncHintLine: function() {
            var t = this._layer.getLatLngs();
            if (0 < t.length) {
                var e = t[t.length - 1];
                this._hintline.setLatLngs([e, this._hintMarker.getLatLng()])
            }
        },
        _syncHintMarker: function(t) {
            if (this._hintMarker.setLatLng(t.latlng),
            this.options.snappable) {
                var e = t;
                e.target = this._hintMarker,
                this._handleSnapping(e)
            }
            this.options.allowSelfIntersection || this._handleSelfIntersection(!0, t.latlng)
        },
        _removeLastVertex: function() {
            var t = this._layer.getLatLngs()
              , e = t.pop();
            if (t.length < 1)
                this.disable();
            else {
                var i = this._layerGroup.getLayers().filter((function(t) {
                    return t instanceof L.Marker
                }
                )).filter((function(t) {
                    return !L.DomUtil.hasClass(t._icon, "cursor-marker")
                }
                )).find((function(t) {
                    return t.getLatLng() === e
                }
                ));
                this._layerGroup.removeLayer(i),
                this._layer.setLatLngs(t),
                this._syncHintLine()
            }
        },
        _createVertex: function(t) {
            this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
            var e = this._hintMarker.getLatLng()
              , i = 0 === this._layer.getLatLngs().length;
            this._layer.addLatLng(e);
            var n = this._createMarker(e, i);
            this._hintline.setLatLngs([e, e]),
            this._layer.fire("pm:vertexadded", {
                shape: this._shape,
                workingLayer: this._layer,
                marker: n,
                latlng: e
            }),
            this._map.on("click", this._finishShape, this)
        },
        _finishShape: function() {
            var t = this._layer.getLatLngs();
            if (!(t.length <= 1)) {
                var e = L.polyline(t, this.options.pathOptions).addTo(this._map);
                e.setText((t[0].distanceTo(t[1]) / 1000).toFixed(3) + " km", {
                    offset: -5,
                    center: !0,
                    attributes: {
                        font: "bold 30px serif",
                        fill: "black"
                    }
                }),
                this.disable(),
                this._map.fire("pm:create", {
                    shape: this._shape,
                    layer: e
                }),
                this.options.snappable && this._cleanupSnapping()
            }
        },
        _createMarker: function(t, e) {
            var i = new L.Marker(t,{
                draggable: !1,
                icon: L.divIcon({
                    className: "marker-icon"
                })
            });
            return i._pmTempLayer = !0,
            this._layerGroup.addLayer(i),
            i.on("click", this._finishShape, this),
            e && this._hintMarker.setTooltipContent(C("tooltips.continueLine")),
            2 === this._layer.getLatLngs().length && this._hintMarker.setTooltipContent(C("tooltips.finishLine")),
            i
        }
    }),
    P.Polygon = P.Line.extend({
        initialize: function(t) {
            this._map = t,
            this._shape = "Polygon",
            this.toolbarButtonName = "drawPolygon"
        },
        _finishShape: function(t) {
            if (this.options.allowSelfIntersection || (this._handleSelfIntersection(!1),
            !this._doesSelfIntersect)) {
                var e = this._layer.getLatLngs();
                if (!(e.length <= 2)) {
                    t && "dblclick" === t.type && e.splice(e.length - 1, 1);
                    var i = L.polygon(e, this.options.pathOptions).addTo(this._map);
                    this.disable(),
                    this._map.fire("pm:create", {
                        shape: this._shape,
                        layer: i
                    }),
                    this._cleanupSnapping(),
                    this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1),
                    delete this._tempSnapLayerIndex
                }
            }
        },
        _createMarker: function(t, e) {
            var i = new L.Marker(t,{
                draggable: !1,
                icon: L.divIcon({
                    className: "marker-icon"
                })
            });
            return i._pmTempLayer = !0,
            this._layerGroup.addLayer(i),
            e && (i.on("click", this._finishShape, this),
            this._tempSnapLayerIndex = this._otherSnapLayers.push(i) - 1,
            this.options.snappable && this._cleanupSnapping()),
            e && this._hintMarker.setTooltipContent(C("tooltips.continueLine")),
            3 === this._layer.getLatLngs().length && this._hintMarker.setTooltipContent(C("tooltips.finishPoly")),
            i
        }
    }),
    P.Rectangle = P.extend({
        initialize: function(t) {
            this._map = t,
            this._shape = "Rectangle",
            this.toolbarButtonName = "drawRectangle"
        },
        enable: function(t) {
            if (L.Util.setOptions(this, t),
            this._enabled = !0,
            this._layerGroup = new L.LayerGroup,
            this._layerGroup._pmTempLayer = !0,
            this._layerGroup.addTo(this._map),
            this._layer = L.rectangle([[0, 0], [0, 0]], this.options.pathOptions),
            this._layer._pmTempLayer = !0,
            this._startMarker = L.marker([0, 0], {
                icon: L.divIcon({
                    className: "marker-icon rect-start-marker"
                }),
                draggable: !1,
                zIndexOffset: 100,
                opacity: this.options.cursorMarker ? 1 : 0
            }),
            this._startMarker._pmTempLayer = !0,
            this._layerGroup.addLayer(this._startMarker),
            this._hintMarker = L.marker([0, 0], {
                icon: L.divIcon({
                    className: "marker-icon cursor-marker"
                })
            }),
            this._hintMarker._pmTempLayer = !0,
            this._layerGroup.addLayer(this._hintMarker),
            this.options.tooltips && this._hintMarker.bindTooltip(C("tooltips.firstVertex"), {
                permanent: !0,
                offset: L.point(0, 10),
                direction: "bottom",
                opacity: .8
            }).openTooltip(),
            this.options.cursorMarker) {
                L.DomUtil.addClass(this._hintMarker._icon, "visible"),
                this._styleMarkers = [];
                for (var e = 0; e < 2; e += 1) {
                    var i = L.marker([0, 0], {
                        icon: L.divIcon({
                            className: "marker-icon rect-style-marker"
                        }),
                        draggable: !1,
                        zIndexOffset: 100
                    });
                    i._pmTempLayer = !0,
                    this._layerGroup.addLayer(i),
                    this._styleMarkers.push(i)
                }
            }
            this._map._container.style.cursor = "crosshair",
            this._map.on("click", this._placeStartingMarkers, this),
            this._map.on("mousemove", this._syncHintMarker, this),
            this._map.fire("pm:drawstart", {
                shape: this._shape,
                workingLayer: this._layer
            }),
            this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0),
            this._otherSnapLayers = []
        },
        disable: function() {
            this._enabled && (this._enabled = !1,
            this._map._container.style.cursor = "",
            this._map.off("click", this._finishShape, this),
            this._map.off("click", this._placeStartingMarkers, this),
            this._map.off("mousemove", this._syncHintMarker, this),
            this._map.removeLayer(this._layerGroup),
            this._map.fire("pm:drawend", {
                shape: this._shape
            }),
            this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !1),
            this.options.snappable && this._cleanupSnapping())
        },
        enabled: function() {
            return this._enabled
        },
        toggle: function(t) {
            this.enabled() ? this.disable() : this.enable(t)
        },
        _placeStartingMarkers: function(t) {
            this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
            var e = this._hintMarker.getLatLng();
            L.DomUtil.addClass(this._startMarker._icon, "visible"),
            this._startMarker.setLatLng(e),
            this.options.cursorMarker && this._styleMarkers && this._styleMarkers.forEach((function(t) {
                L.DomUtil.addClass(t._icon, "visible"),
                t.setLatLng(e)
            }
            )),
            this._map.off("click", this._placeStartingMarkers, this),
            this._map.on("click", this._finishShape, this),
            this._hintMarker.setTooltipContent(C("tooltips.finishRect")),
            this._setRectangleOrigin()
        },
        _setRectangleOrigin: function() {
            var t = this._startMarker.getLatLng();
            t && (this._layerGroup.addLayer(this._layer),
            this._layer.setLatLngs([t, t]),
            this._hintMarker.on("move", this._syncRectangleSize, this))
        },
        _syncHintMarker: function(t) {
            if (this._hintMarker.setLatLng(t.latlng),
            this.options.snappable) {
                var e = t;
                e.target = this._hintMarker,
                this._handleSnapping(e)
            }
        },
        _syncRectangleSize: function() {
            var t = this
              , e = this._startMarker.getLatLng()
              , i = this._hintMarker.getLatLng();
            if (this._layer.setBounds([e, i]),
            this.options.cursorMarker && this._styleMarkers) {
                var n = this._findCorners()
                  , r = [];
                n.forEach((function(e) {
                    e.equals(t._startMarker.getLatLng()) || e.equals(t._hintMarker.getLatLng()) || r.push(e)
                }
                )),
                r.forEach((function(e, i) {
                    t._styleMarkers[i].setLatLng(e)
                }
                ))
            }
        },
        _finishShape: function(t) {
            this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
            var e = this._hintMarker.getLatLng()
              , i = this._startMarker.getLatLng()
              , n = L.rectangle([i, e], this.options.pathOptions).addTo(this._map);
            this.disable(),
            this._map.fire("pm:create", {
                shape: this._shape,
                layer: n
            })
        },
        _findCorners: function() {
            var t = this._layer.getBounds();
            return [t.getNorthWest(), t.getNorthEast(), t.getSouthEast(), t.getSouthWest()]
        }
    }),
    P.Circle = P.extend({
        initialize: function(t) {
            this._map = t,
            this._shape = "Circle",
            this.toolbarButtonName = "drawCircle"
        },
        enable: function(t) {
            L.Util.setOptions(this, t),
            this.options.radius = 0,
            this._enabled = !0,
            this._layerGroup = new L.LayerGroup,
            this._layerGroup._pmTempLayer = !0,
            this._layerGroup.addTo(this._map),
            this._layer = L.circle([0, 0], this.options.templineStyle),
            this._layer._pmTempLayer = !0,
            this._layerGroup.addLayer(this._layer),
            this._centerMarker = L.marker([0, 0], {
                icon: L.divIcon({
                    className: "marker-icon"
                }),
                draggable: !1,
                zIndexOffset: 100
            }),
            this._centerMarker._pmTempLayer = !0,
            this._layerGroup.addLayer(this._centerMarker),
            this._hintMarker = L.marker([0, 0], {
                icon: L.divIcon({
                    className: "marker-icon cursor-marker"
                })
            }),
            this._hintMarker._pmTempLayer = !0,
            this._layerGroup.addLayer(this._hintMarker),
            this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"),
            this.options.tooltips && this._hintMarker.bindTooltip(C("tooltips.startCircle"), {
                permanent: !0,
                offset: L.point(0, 10),
                direction: "bottom",
                opacity: .8
            }).openTooltip(),
            this._hintline = L.polyline([], this.options.hintlineStyle),
            this._hintline._pmTempLayer = !0,
            this._layerGroup.addLayer(this._hintline),
            this._map._container.style.cursor = "crosshair",
            this._map.on("click", this._placeCenterMarker, this),
            this._map.on("mousemove", this._syncHintMarker, this),
            this._map.fire("pm:drawstart", {
                shape: this._shape,
                workingLayer: this._layer
            }),
            this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0),
            this._otherSnapLayers = []
        },
        disable: function() {
            this._enabled && (this._enabled = !1,
            this._map._container.style.cursor = "",
            this._map.off("click", this._finishShape, this),
            this._map.off("click", this._placeCenterMarker, this),
            this._map.off("mousemove", this._syncHintMarker, this),
            this._map.removeLayer(this._layerGroup),
            this._map.fire("pm:drawend", {
                shape: this._shape
            }),
            this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !1),
            this.options.snappable && this._cleanupSnapping())
        },
        enabled: function() {
            return this._enabled
        },
        toggle: function(t) {
            this.enabled() ? this.disable() : this.enable(t)
        },
        _syncHintLine: function() {
            var t = this._centerMarker.getLatLng();
            this._hintline.setLatLngs([t, this._hintMarker.getLatLng()])
        },
        _syncCircleRadius: function() {
            var t = this._centerMarker.getLatLng()
              , e = this._hintMarker.getLatLng()
              , i = t.distanceTo(e);
            this._layer.setRadius(i)
        },
        _syncHintMarker: function(t) {
            if (this._hintMarker.setLatLng(t.latlng),
            this.options.snappable) {
                var e = t;
                e.target = this._hintMarker,
                this._handleSnapping(e)
            }
        },
        _placeCenterMarker: function(t) {
            this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
            var e = this._hintMarker.getLatLng();
            this._centerMarker.setLatLng(e),
            this._map.off("click", this._placeCenterMarker, this),
            this._map.on("click", this._finishShape, this),
            this._placeCircleCenter()
        },
        _placeCircleCenter: function() {
            var t = this._centerMarker.getLatLng();
            t && (this._layer.setLatLng(t),
            this._hintMarker.on("move", this._syncHintLine, this),
            this._hintMarker.on("move", this._syncCircleRadius, this),
            this._hintMarker.setTooltipContent(C("tooltips.finishCircle")),
            this._layer.fire("pm:centerplaced", {
                shape: this._shape,
                workingLayer: this._layer,
                latlng: t
            }))
        },
        _finishShape: function(t) {
            this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
            var e = this._centerMarker.getLatLng()
              , i = this._hintMarker.getLatLng()
              , n = e.distanceTo(i)
              , r = Object.assign({}, this.options.pathOptions, {
                radius: n
            })
              , o = L.circle(e, r).addTo(this._map);
            this.disable(),
            this._map.fire("pm:create", {
                shape: this._shape,
                layer: o
            })
        },
        _createMarker: function(t) {
            var e = new L.Marker(t,{
                draggable: !1,
                icon: L.divIcon({
                    className: "marker-icon"
                })
            });
            return e._pmTempLayer = !0,
            this._layerGroup.addLayer(e),
            e
        }
    }),
    P.CircleMarker = P.Marker.extend({
        initialize: function(t) {
            this._map = t,
            this._shape = "CircleMarker",
            this.toolbarButtonName = "drawCircleMarker"
        },
        enable: function(t) {
            var e = this;
            L.Util.setOptions(this, t),
            this._enabled = !0,
            this._map.on("click", this._createMarker, this),
            this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0),
            this._hintMarker = L.circleMarker([0, 0], this.options.templineStyle),
            this._hintMarker._pmTempLayer = !0,
            this._hintMarker.addTo(this._map),
            this.options.tooltips && this._hintMarker.bindTooltip(C("tooltips.placeCircleMarker"), {
                permanent: !0,
                offset: L.point(0, 10),
                direction: "bottom",
                opacity: .8
            }).openTooltip(),
            this._layer = this._hintMarker,
            this._map.on("mousemove", this._syncHintMarker, this),
            this._map.fire("pm:drawstart", {
                shape: this._shape,
                workingLayer: this._layer
            }),
            this._map.eachLayer((function(t) {
                e.isRelevantMarker(t) && t.pm.enable()
            }
            ))
        },
        isRelevantMarker: function(t) {
            return t instanceof L.CircleMarker && !(t instanceof L.Circle) && t.pm && !t._pmTempLayer
        },
        _createMarker: function(t) {
            if (t.latlng) {
                this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
                var e = this._hintMarker.getLatLng()
                  , i = new L.circleMarker(e,this.options.pathOptions);
                i.addTo(this._map),
                i.pm.enable(),
                this._map.fire("pm:create", {
                    shape: this._shape,
                    marker: i,
                    layer: i
                }),
                this._cleanupSnapping()
            }
        }
    });
    var I = i(57)
      , j = i.n(I)
      , R = i(24)
      , z = i(26)
      , F = i.n(z)
      , N = i(1)
      , G = i(13)
      , U = i(25);
    function A(t) {
        switch (t.type) {
        case "Polygon":
            return 1 < F()(t) ? t : null;
        case "MultiPolygon":
            var e = [];
            if (Object(U.flattenEach)(t, (function(t) {
                1 < F()(t) && e.push(t.geometry.coordinates)
            }
            )),
            e.length)
                return {
                    type: "MultiPolygon",
                    coordinates: e
                }
        }
    }
    P.Cut = P.Polygon.extend({
        initialize: function(t) {
            this._map = t,
            this._shape = "Cut",
            this.toolbarButtonName = "cutPolygon"
        },
        _cut: function(t) {
            var e = this
              , i = this._map._layers;
            Object.keys(i).map((function(t) {
                return i[t]
            }
            )).filter((function(t) {
                return t.pm
            }
            )).filter((function(t) {
                return t instanceof L.Polygon
            }
            )).filter((function(e) {
                return e !== t
            }
            )).filter((function(e) {
                try {
                    return !!j()(t.toGeoJSON(15), e.toGeoJSON(15))
                } catch (t) {
                    return console.error("You cant cut polygons with self-intersections"),
                    !1
                }
            }
            )).forEach((function(i) {
                var n = function(t, e) {
                    var i = Object(G.getGeom)(t)
                      , n = Object(G.getGeom)(e)
                      , r = t.properties || {};
                    if (i = A(i),
                    n = A(n),
                    !i)
                        return null;
                    if (!n)
                        return Object(N.feature)(i, r);
                    var o = R.diff(i.coordinates, n.coordinates);
                    return 0 === o.length ? null : 1 === o.length ? Object(N.polygon)(o[0], r) : Object(N.multiPolygon)(o, r)
                }(i.toGeoJSON(15), t.toGeoJSON(15))
                  , r = L.geoJSON(n, i.options).addTo(e._map);
                r.addTo(e._map),
                r.pm.enable(e.options),
                r.pm.disable(),
                i._pmTempLayer = !0,
                t._pmTempLayer = !0,
                i.remove(),
                t.remove(),
                0 === r.getLayers().length && e._map.pm.removeLayer({
                    target: r
                }),
                i.fire("pm:cut", {
                    shape: e._shape,
                    layer: r,
                    originalLayer: i
                }),
                e._map.fire("pm:cut", {
                    shape: e._shape,
                    layer: r,
                    originalLayer: i
                })
            }
            ))
        },
        _finishShape: function() {
            if (this.options.allowSelfIntersection || (this._handleSelfIntersection(!1),
            !this._doesSelfIntersect)) {
                var t = this._layer.getLatLngs()
                  , e = L.polygon(t, this.options.pathOptions);
                this._cut(e),
                this.disable(),
                this._cleanupSnapping(),
                this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1),
                delete this._tempSnapLayerIndex
            }
        }
    });
    var H = {
        enableLayerDrag: function() {
            if (this._layer instanceof L.Marker)
                this._layer.dragging.enable();
            else {
                this._tempDragCoord = null;
                var t = this._layer._path ? this._layer._path : this._layer._renderer._container;
                L.DomUtil.addClass(t, "leaflet-pm-draggable"),
                this._originalMapDragState = this._layer._map.dragging._enabled,
                this._safeToCacheDragState = !0,
                this._layer.on("mousedown", this._dragMixinOnMouseDown, this)
            }
        },
        disableLayerDrag: function() {
            if (this._layer instanceof L.Marker)
                this._layer.dragging.disable();
            else {
                var t = this._layer._path ? this._layer._path : this._layer._renderer._container;
                L.DomUtil.removeClass(t, "leaflet-pm-draggable"),
                this._safeToCacheDragState = !1,
                this._layer.off("mousedown", this._dragMixinOnMouseDown, this)
            }
        },
        _dragMixinOnMouseUp: function() {
            var t = this
              , e = this._layer._path ? this._layer._path : this._layer._renderer._container;
            return this._originalMapDragState && this._layer._map.dragging.enable(),
            this._safeToCacheDragState = !0,
            this._layer._map.off("mousemove", this._dragMixinOnMouseMove, this),
            this._layer._map.off("mouseup", this._dragMixinOnMouseUp, this),
            !!this._dragging && (window.setTimeout((function() {
                t._dragging = !1,
                L.DomUtil.removeClass(e, "leaflet-pm-dragging"),
                t._layer.fire("pm:dragend"),
                t._fireEdit()
            }
            ), 10),
            !0)
        },
        _dragMixinOnMouseMove: function(t) {
            var e = this._layer._path ? this._layer._path : this._layer._renderer._container;
            this._dragging || (this._dragging = !0,
            L.DomUtil.addClass(e, "leaflet-pm-dragging"),
            this._layer.bringToFront(),
            this._originalMapDragState && this._layer._map.dragging.disable(),
            this._layer.fire("pm:dragstart")),
            this._onLayerDrag(t)
        },
        _dragMixinOnMouseDown: function(t) {
            0 < t.originalEvent.button || (this._safeToCacheDragState && (this._originalMapDragState = this._layer._map.dragging._enabled,
            this._safeToCacheDragState = !1),
            this._tempDragCoord = t.latlng,
            this._layer._map.on("mouseup", this._dragMixinOnMouseUp, this),
            this._layer._map.on("mousemove", this._dragMixinOnMouseMove, this))
        },
        dragging: function() {
            return this._dragging
        },
        _onLayerDrag: function(t) {
            var e = t.latlng
              , i = e.lat - this._tempDragCoord.lat
              , n = e.lng - this._tempDragCoord.lng;
            if (this._layer instanceof L.CircleMarker)
                this._layer.setLatLng(e);
            else {
                var r = function t(e) {
                    return e.map((function(e) {
                        return Array.isArray(e) ? t(e) : {
                            lat: e.lat + i,
                            lng: e.lng + n
                        }
                    }
                    ))
                }(this._layer.getLatLngs());
                this._layer.setLatLngs(r)
            }
            this._tempDragCoord = e,
            this._layer.fire("pm:drag", t)
        }
    }
      , V = L.Class.extend({
        includes: [H, D],
        options: {
            snappable: !0,
            snapDistance: 20,
            allowSelfIntersection: !0,
            draggable: !0
        },
        setOptions: function(t) {
            L.Util.setOptions(this, t)
        },
        applyOptions: function() {},
        isPolygon: function() {
            return this._layer instanceof L.Polygon
        }
    });
    V.LayerGroup = L.Class.extend({
        initialize: function(t) {
            var e = this;
            this._layerGroup = t,
            this._layers = this.findLayers(),
            this._layers.forEach((function(t) {
                return e._initLayer(t)
            }
            )),
            this._layerGroup.on("layeradd", (function(t) {
                t.target._pmTempLayer || (e._layers = e.findLayers(),
                t.layer.pm && e._initLayer(t.layer),
                t.target.pm.enabled() && e.enable(e.getOptions()))
            }
            )),
            this._layerGroup.on("layerremove", (function(t) {
                t.target._pmTempLayer || (e._layers = e.findLayers())
            }
            ))
        },
        findLayers: function() {
            var t = this._layerGroup.getLayers();
            return (t = (t = t.filter((function(t) {
                return !(t instanceof L.LayerGroup)
            }
            ))).filter((function(t) {
                return !!t.pm
            }
            ))).filter((function(t) {
                return !t._pmTempLayer
            }
            ))
        },
        _initLayer: function(t) {
            var e = this;
            ["pm:edit", "pm:update", "pm:remove", "pm:dragstart", "pm:drag", "pm:dragend", "pm:snap", "pm:unsnap", "pm:cut", "pm:intersect", "pm:raiseMarkers", "pm:markerdragend", "pm:markerdragstart", "pm:vertexadded", "pm:vertexremoved", "pm:centerplaced"].forEach((function(i) {
                t.on(i, e._fireEvent, e)
            }
            )),
            t.pm._layerGroup = this._layerGroup
        },
        _fireEvent: function(t) {
            this._layerGroup.fireEvent(t.type, t)
        },
        toggleEdit: function(t) {
            this._options = t,
            this._layers.forEach((function(e) {
                e.pm.toggleEdit(t)
            }
            ))
        },
        enable: function(t) {
            this._options = t,
            this._layers.forEach((function(e) {
                e.pm.enable(t)
            }
            ))
        },
        disable: function() {
            this._layers.forEach((function(t) {
                t.pm.disable()
            }
            ))
        },
        enabled: function() {
            var t = this._layers.find((function(t) {
                return t.pm.enabled()
            }
            ));
            return !!t
        },
        dragging: function() {
            var t = this._layers.find((function(t) {
                return t.pm.dragging()
            }
            ));
            return !!t
        },
        getOptions: function() {
            return this._options
        }
    }),
    V.Marker = V.extend({
        initialize: function(t) {
            this._layer = t,
            this._enabled = !1,
            this._layer.on("dragend", this._onDragEnd, this)
        },
        applyOptions: function() {
            this.options.snappable ? this._initSnappableMarkers() : this._disableSnapping(),
            this.options.draggable && this._layer.dragging.enable(),
            this.options.preventMarkerRemoval || this._layer.on("contextmenu", this._removeMarker, this)
        },
        toggleEdit: function(t) {
            this.enabled() ? this.disable() : this.enable(t)
        },
        enable: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {
                draggable: !0
            };
            L.Util.setOptions(this, t),
            this._map = this._layer._map,
            this.enabled() || (this._enabled = !0,
            this.applyOptions())
        },
        enabled: function() {
            return this._enabled
        },
        disable: function() {
            this._enabled = !1,
            this._layer.dragging && this._layer.dragging.disable(),
            this._layer.off("contextmenu", this._removeMarker, this),
            this._layer.off("dragstart", this._onPinnedMarkerDragStart, this),
            this._layerEdited && this._layer.fire("pm:update", {}),
            this._layerEdited = !1
        },
        _removeMarker: function(t) {
            var e = t.target;
            e.remove(),
            e.fire("pm:remove"),
            console.log("移除了")
        },
        _onDragEnd: function(t) {
            t.target.fire("pm:edit"),
            this._layerEdited = !0
        },
        _initSnappableMarkers: function() {
            var t = this._layer;
            this.options.snapDistance = this.options.snapDistance || 30,
            t.off("drag", this._handleSnapping, this),
            t.on("drag", this._handleSnapping, this),
            t.off("dragend", this._cleanupSnapping, this),
            t.on("dragend", this._cleanupSnapping, this),
            t.off("pm:dragstart", this._unsnap, this),
            t.on("pm:dragstart", this._unsnap, this)
        },
        _disableSnapping: function() {
            var t = this._layer;
            t.off("drag", this._handleSnapping, this),
            t.off("dragend", this._cleanupSnapping, this),
            t.off("pm:dragstart", this._unsnap, this)
        }
    }),
    V.Line = V.extend({
        initialize: function(t) {
            this._layer = t,
            this._enabled = !1
        },
        applyOptions: function() {
            this.options.snappable ? this._initSnappableMarkers() : this._disableSnapping()
        },
        toggleEdit: function(t) {
            return this.enabled() ? this.disable() : this.enable(t),
            this.enabled()
        },
        enable: function(t) {
            L.Util.setOptions(this, t),
            this._map = this._layer._map,
            this._map && (this.enabled() || this.disable(),
            this._enabled = !0,
            this._initMarkers(),
            this.applyOptions(),
            this._layer.on("remove", this._onLayerRemove, this),
            this.options.allowSelfIntersection || this._layer.on("pm:vertexremoved", this._handleSelfIntersectionOnVertexRemoval, this),
            this.options.allowSelfIntersection || (this.cachedColor = this._layer.options.color,
            this.isRed = !1,
            this._handleLayerStyle()))
        },
        _onLayerRemove: function(t) {
            this.disable(t.target)
        },
        enabled: function() {
            return this._enabled
        },
        disable: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this._layer;
            if (!this.enabled())
                return !1;
            if (t.pm._dragging)
                return !1;
            t.pm._enabled = !1,
            t.pm._markerGroup.clearLayers(),
            t.off("mousedown"),
            t.off("mouseup"),
            this._layer.off("remove", this._onLayerRemove, this),
            this.options.allowSelfIntersection || this._layer.off("pm:vertexremoved", this._handleSelfIntersectionOnVertexRemoval);
            var e = t._path ? t._path : this._layer._renderer._container;
            return L.DomUtil.removeClass(e, "leaflet-pm-draggable"),
            this.hasSelfIntersection() && L.DomUtil.removeClass(e, "leaflet-pm-invalid"),
            this._layerEdited && this._layer.fire("pm:update", {}),
            !(this._layerEdited = !1)
        },
        hasSelfIntersection: function() {
            return 0 < B()(this._layer.toGeoJSON(15)).features.length
        },
        _handleSelfIntersectionOnVertexRemoval: function() {
            this._handleLayerStyle(!0),
            this.hasSelfIntersection() && (this._layer.setLatLngs(this._coordsBeforeEdit),
            this._coordsBeforeEdit = null,
            this._initMarkers())
        },
        _handleLayerStyle: function(t) {
            var e = this
              , i = this._layer;
            if (this.hasSelfIntersection()) {
                if (this.isRed)
                    return;
                t ? (i.setStyle({
                    color: "red"
                }),
                this.isRed = !0,
                window.setTimeout((function() {
                    i.setStyle({
                        color: e.cachedColor
                    }),
                    e.isRed = !1
                }
                ), 200)) : (i.setStyle({
                    color: "red"
                }),
                this.isRed = !0),
                this._layer.fire("pm:intersect", {
                    intersection: B()(this._layer.toGeoJSON(15))
                })
            } else
                i.setStyle({
                    color: this.cachedColor
                }),
                this.isRed = !1
        },
        _initMarkers: function() {
            var t = this
              , e = this._map
              , i = this._layer.getLatLngs();
            this._markerGroup && this._markerGroup.clearLayers(),
            this._markerGroup = new L.LayerGroup,
            this._markerGroup._pmTempLayer = !0,
            e.addLayer(this._markerGroup);
            this._markers = function e(i) {
                if (Array.isArray(i[0]))
                    return i.map(e, t);
                var n = i.map(t._createMarker, t);
                return i.map((function(e, r) {
                    var o = t.isPolygon() ? (r + 1) % i.length : r + 1;
                    return t._createMiddleMarker(n[r], n[o])
                }
                )),
                n
            }(i)
        },
        _createMarker: function(t) {
            var e = new L.Marker(t,{
                draggable: !0,
                icon: L.divIcon({
                    className: "marker-icon"
                })
            });
            return e._pmTempLayer = !0,
            e.on("dragstart", this._onMarkerDragStart, this),
            e.on("move", this._onMarkerDrag, this),
            e.on("dragend", this._onMarkerDragEnd, this),
            this.options.preventMarkerRemoval || e.on("contextmenu", this._removeMarker, this),
            this._markerGroup.addLayer(e),
            e
        },
        _createMiddleMarker: function(t, e) {
            var i = this;
            if (!t || !e)
                return !1;
            var n = x.calcMiddleLatLng(this._map, t.getLatLng(), e.getLatLng())
              , r = this._createMarker(n)
              , o = L.divIcon({
                className: "marker-icon marker-icon-middle"
            });
            return r.setIcon(o),
            t._middleMarkerNext = r,
            (e._middleMarkerPrev = r).on("click", (function() {
                var n = L.divIcon({
                    className: "marker-icon"
                });
                r.setIcon(n),
                i._addMarker(r, t, e)
            }
            )),
            r.on("movestart", (function() {
                r.on("moveend", (function() {
                    var t = L.divIcon({
                        className: "marker-icon"
                    });
                    r.setIcon(t),
                    r.off("moveend")
                }
                )),
                i._addMarker(r, t, e)
            }
            )),
            r
        },
        _addMarker: function(t, e, i) {
            t.off("movestart"),
            t.off("click");
            var n = t.getLatLng()
              , r = this._layer._latlngs
              , o = this.findDeepMarkerIndex(this._markers, e)
              , a = o.indexPath
              , s = o.index
              , l = o.parentPath
              , c = 1 < a.length ? M()(r, l) : r
              , h = 1 < a.length ? M()(this._markers, l) : this._markers;
            c.splice(s + 1, 0, n),
            h.splice(s + 1, 0, t),
            this._layer.setLatLngs(r),
            this._createMiddleMarker(e, t),
            this._createMiddleMarker(t, i),
            this._fireEdit(),
            this._layer.fire("pm:vertexadded", {
                layer: this._layer,
                marker: t,
                indexPath: this.findDeepMarkerIndex(this._markers, t).indexPath,
                latlng: n
            }),
            this.options.snappable && this._initSnappableMarkers()
        },
        _removeMarker: function(t) {
            if (!this.options.allowSelfIntersection) {
                var e = this._layer.getLatLngs();
                this._coordsBeforeEdit = JSON.parse(JSON.stringify(e))
            }
            var i = t.target
              , n = this._layer.getLatLngs()
              , r = this.findDeepMarkerIndex(this._markers, i)
              , o = r.indexPath
              , a = r.index
              , s = r.parentPath;
            if (o) {
                var l, c, h = 1 < o.length ? M()(n, s) : n, p = 1 < o.length ? M()(this._markers, s) : this._markers;
                if (h.splice(a, 1),
                this._layer.setLatLngs(n),
                h.length <= 1 && (h.splice(0, h.length),
                this._layer.setLatLngs(n),
                this.disable(),
                this.enable(this.options)),
                function(t) {
                    return !function t(e) {
                        return e.filter((function(t) {
                            return ![null, "", void 0].includes(t)
                        }
                        )).reduce((function(e, i) {
                            return e.concat(Array.isArray(i) ? t(i) : i)
                        }
                        ), [])
                    }(t).length
                }(n) && this._layer.remove(),
                i._middleMarkerPrev && this._markerGroup.removeLayer(i._middleMarkerPrev),
                i._middleMarkerNext && this._markerGroup.removeLayer(i._middleMarkerNext),
                this._markerGroup.removeLayer(i),
                this.isPolygon() ? (l = (a + 1) % p.length,
                c = (a + (p.length - 1)) % p.length) : (c = a - 1 < 0 ? void 0 : a - 1,
                l = a + 1 >= p.length ? void 0 : a + 1),
                l !== c) {
                    var u = p[c]
                      , d = p[l];
                    this._createMiddleMarker(u, d)
                }
                p.splice(a, 1),
                this._fireEdit(),
                this._layer.fire("pm:vertexremoved", {
                    layer: this._layer,
                    marker: i,
                    indexPath: o
                })
            }
        },
        findDeepMarkerIndex: function(t, e) {
            var i;
            t.some(function t(n) {
                return function(r, o) {
                    var a = n.concat(o);
                    return r._leaflet_id === e._leaflet_id ? (i = a,
                    !0) : Array.isArray(r) && r.some(t(a))
                }
            }([]));
            var n = {};
            return i && (n = {
                indexPath: i,
                index: i[i.length - 1],
                parentPath: i.slice(0, i.length - 1)
            }),
            n
        },
        updatePolygonCoordsFromMarkerDrag: function(t) {
            var e = this._layer.getLatLngs()
              , i = t.getLatLng()
              , n = this.findDeepMarkerIndex(this._markers, t)
              , r = n.indexPath
              , o = n.index
              , a = n.parentPath;
            (1 < r.length ? M()(e, a) : e).splice(o, 1, i),
            this._layer.setLatLngs(e)
        },
        _onMarkerDrag: function(t) {
            var e = t.target
              , i = this.findDeepMarkerIndex(this._markers, e)
              , n = i.indexPath
              , r = i.index
              , o = i.parentPath;
            if (n) {
                this.updatePolygonCoordsFromMarkerDrag(e);
                var a = 1 < n.length ? M()(this._markers, o) : this._markers
                  , s = (r + 1) % a.length
                  , l = (r + (a.length - 1)) % a.length
                  , c = e.getLatLng()
                  , h = a[l].getLatLng()
                  , p = a[s].getLatLng();
                if (e._middleMarkerNext) {
                    var u = x.calcMiddleLatLng(this._map, c, p);
                    e._middleMarkerNext.setLatLng(u)
                }
                if (e._middleMarkerPrev) {
                    var d = x.calcMiddleLatLng(this._map, c, h);
                    e._middleMarkerPrev.setLatLng(d)
                }
                this.options.allowSelfIntersection || this._handleLayerStyle()
            }
        },
        _onMarkerDragEnd: function(t) {
            var e = t.target
              , i = this.findDeepMarkerIndex(this._markers, e).indexPath;
            if (!this.options.allowSelfIntersection && this.hasSelfIntersection())
                return this._layer.setLatLngs(this._coordsBeforeEdit),
                this._coordsBeforeEdit = null,
                this._initMarkers(),
                void this._handleLayerStyle();
            this._layer.fire("pm:markerdragend", {
                markerEvent: t,
                indexPath: i
            }),
            this._fireEdit()
        },
        _onMarkerDragStart: function(t) {
            var e = t.target
              , i = this.findDeepMarkerIndex(this._markers, e).indexPath;
            this._layer.fire("pm:markerdragstart", {
                markerEvent: t,
                indexPath: i
            }),
            this.options.allowSelfIntersection || (this._coordsBeforeEdit = this._layer.getLatLngs()),
            this.cachedColor = this._layer.options.color
        },
        _fireEdit: function() {
            this._layerEdited = !0,
            this._layer.fire("pm:edit")
        }
    }),
    V.Polygon = V.Line.extend({}),
    V.Rectangle = V.Polygon.extend({
        _initMarkers: function() {
            var t = this._map
              , e = this._findCorners();
            this._markerGroup && this._markerGroup.clearLayers(),
            this._markerGroup = new L.LayerGroup,
            this._markerGroup._pmTempLayer = !0,
            t.addLayer(this._markerGroup),
            this._markers = [],
            this._markers[0] = e.map(this._createMarker, this);
            var i = function(t, e) {
                return function(t) {
                    if (Array.isArray(t))
                        return t
                }(t) || function(t, e) {
                    if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) {
                        var i = []
                          , n = !0
                          , r = !1
                          , o = void 0;
                        try {
                            for (var a, s = t[Symbol.iterator](); !(n = (a = s.next()).done) && (i.push(a.value),
                            !e || i.length !== e); n = !0)
                                ;
                        } catch (t) {
                            r = !0,
                            o = t
                        } finally {
                            try {
                                n || null == s.return || s.return()
                            } finally {
                                if (r)
                                    throw o
                            }
                        }
                        return i
                    }
                }(t, e) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }()
            }(this._markers, 1);
            this._cornerMarkers = i[0],
            this.options.snappable && this._initSnappableMarkers()
        },
        _createMarker: function(t, e) {
            var i = new L.Marker(t,{
                draggable: !0,
                icon: L.divIcon({
                    className: "marker-icon"
                })
            });
            return i._origLatLng = t,
            i._index = e,
            i._pmTempLayer = !0,
            i.on("dragstart", this._onMarkerDragStart, this),
            i.on("drag", this._onMarkerDrag, this),
            i.on("dragend", this._onMarkerDragEnd, this),
            i.on("pm:snap", this._adjustRectangleForMarkerSnap, this),
            this.options.preventMarkerRemoval || i.on("contextmenu", this._removeMarker, this),
            this._markerGroup.addLayer(i),
            i
        },
        _removeMarker: function() {
            return null
        },
        _onMarkerDragStart: function(t) {
            var e = t.target
              , i = this._findCorners();
            e._oppositeCornerLatLng = i[(e._index + 2) % 4],
            e._snapped = !1,
            this._layer.fire("pm:markerdragstart", {
                markerEvent: t
            })
        },
        _onMarkerDrag: function(t) {
            var e = t.target;
            void 0 !== e._index && (e._snapped || this._adjustRectangleForMarkerMove(e))
        },
        _onMarkerDragEnd: function(t) {
            var e = this._findCorners();
            this._adjustAllMarkers(e),
            this._cornerMarkers.forEach((function(t) {
                delete t._oppositeCornerLatLng
            }
            )),
            this._layer.setLatLngs(e),
            this._layer.fire("pm:markerdragend", {
                markerEvent: t
            }),
            this._fireEdit()
        },
        _adjustRectangleForMarkerMove: function(t) {
            L.extend(t._origLatLng, t._latlng);
            var e = t.getLatLng();
            this._layer.setBounds(L.latLngBounds(e, t._oppositeCornerLatLng)),
            this._adjustAdjacentMarkers(t),
            this._layer.redraw()
        },
        _adjustRectangleForMarkerSnap: function(t) {
            if (this.options.snappable) {
                var e = t.target;
                this._adjustRectangleForMarkerMove(e)
            }
        },
        _adjustAllMarkers: function(t) {
            t.length && 4 === t.length ? this._cornerMarkers.forEach((function(e, i) {
                e.setLatLng(t[i])
            }
            )) : console.error("_adjustAllMarkers() requires an array of EXACTLY 4 LatLng coordinates")
        },
        _adjustAdjacentMarkers: function(t) {
            if (t && t.getLatLng && t._oppositeCornerLatLng) {
                var e = t.getLatLng()
                  , i = t._oppositeCornerLatLng
                  , n = [];
                this._findCorners().forEach((function(t) {
                    t.equals(e) || t.equals(i) || n.push(t)
                }
                ));
                var r = 0;
                2 === n.length && this._cornerMarkers.forEach((function(t) {
                    var o = t.getLatLng();
                    o.equals(e) || o.equals(i) || (t.setLatLng(n[r]),
                    r += 1)
                }
                ))
            } else
                console.error("_adjustAdjacentMarkers() requires a valid Marker object")
        },
        _findCorners: function() {
            var t = this._layer.getBounds();
            return [t.getNorthWest(), t.getNorthEast(), t.getSouthEast(), t.getSouthWest()]
        }
    }),
    V.Circle = V.extend({
        initialize: function(t) {
            this._layer = t,
            this._enabled = !1
        },
        applyOptions: function() {
            this.options.snappable ? (this._initSnappableMarkers(),
            this._outerMarker.on("move", this._syncHintLine, this),
            this._outerMarker.on("move", this._syncCircleRadius, this),
            this._centerMarker.on("move", this._moveCircle, this)) : this._disableSnapping()
        },
        _disableSnapping: function() {
            var t = this;
            this._markers.forEach((function(e) {
                e.off("move", t._syncHintLine, t),
                e.off("move", t._syncCircleRadius, t),
                e.off("drag", t._handleSnapping, t),
                e.off("dragend", t._cleanupSnapping, t)
            }
            )),
            this._layer.off("pm:dragstart", this._unsnap, this)
        },
        toggleEdit: function(t) {
            this.enabled() ? this.disable() : this.enable(t)
        },
        enabled: function() {
            return this._enabled
        },
        enable: function(t) {
            var e = this;
            L.Util.setOptions(this, t),
            this._map = this._layer._map,
            this.enabled() || this.disable(),
            this._enabled = !0,
            this._initMarkers(),
            this.applyOptions(),
            this._layer.on("remove", (function(t) {
                e.disable(t.target)
            }
            ))
        },
        disable: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this._layer;
            if (!this.enabled())
                return !1;
            if (t.pm._dragging)
                return !1;
            t.pm._enabled = !1,
            t.pm._helperLayers.clearLayers(),
            t.off("mousedown"),
            t.off("mouseup");
            var e = t._path ? t._path : this._layer._renderer._container;
            return L.DomUtil.removeClass(e, "leaflet-pm-draggable"),
            this._layerEdited && this._layer.fire("pm:update", {}),
            !(this._layerEdited = !1)
        },
        _initMarkers: function() {
            var t = this._map;
            this._helperLayers && this._helperLayers.clearLayers(),
            this._helperLayers = new L.LayerGroup,
            this._helperLayers._pmTempLayer = !0,
            this._helperLayers.addTo(t);
            var e = this._layer.getLatLng()
              , i = this._layer._radius
              , n = this._getLatLngOnCircle(e, i);
            this._centerMarker = this._createCenterMarker(e),
            this._outerMarker = this._createOuterMarker(n),
            this._markers = [this._centerMarker, this._outerMarker],
            this._createHintLine(this._centerMarker, this._outerMarker)
        },
        _getLatLngOnCircle: function(t, e) {
            var i = this._map.project(t)
              , n = L.point(i.x + e, i.y);
            return this._map.unproject(n)
        },
        _resizeCircle: function() {
            this._syncHintLine(),
            this._syncCircleRadius()
        },
        _moveCircle: function(t) {
            var e = t.latlng;
            this._layer.setLatLng(e);
            var i = this._layer._radius
              , n = this._getLatLngOnCircle(e, i);
            this._outerMarker.setLatLng(n),
            this._syncHintLine(),
            this._layer.fire("pm:centerplaced", {
                layer: this._layer,
                latlng: e
            })
        },
        _onMarkerDragStart: function(t) {
            this._layer.fire("pm:markerdragstart", {
                markerEvent: t
            })
        },
        _onMarkerDragEnd: function(t) {
            this._fireEdit(),
            this._layer.fire("pm:markerdragend", {
                markerEvent: t
            })
        },
        _syncCircleRadius: function() {
            var t = this._centerMarker.getLatLng()
              , e = this._outerMarker.getLatLng()
              , i = t.distanceTo(e);
            this._layer.setRadius(i)
        },
        _syncHintLine: function() {
            var t = this._centerMarker.getLatLng()
              , e = this._outerMarker.getLatLng();
            this._hintline.setLatLngs([t, e])
        },
        _createHintLine: function(t, e) {
            var i = t.getLatLng()
              , n = e.getLatLng();
            this._hintline = L.polyline([i, n], this.options.hintlineStyle),
            this._hintline._pmTempLayer = !0,
            this._helperLayers.addLayer(this._hintline)
        },
        _createCenterMarker: function(t) {
            var e = this._createMarker(t);
            return L.DomUtil.addClass(e._icon, "leaflet-pm-draggable"),
            e.on("drag", this._moveCircle, this),
            e
        },
        _createOuterMarker: function(t) {
            var e = this._createMarker(t);
            return e.on("drag", this._resizeCircle, this),
            e
        },
        _createMarker: function(t) {
            var e = new L.Marker(t,{
                draggable: !0,
                icon: L.divIcon({
                    className: "marker-icon"
                })
            });
            return e._origLatLng = t,
            e._pmTempLayer = !0,
            e.on("dragstart", this._onMarkerDragStart, this),
            e.on("dragend", this._onMarkerDragEnd, this),
            this._helperLayers.addLayer(e),
            e
        },
        _fireEdit: function() {
            this._layer.fire("pm:edit"),
            this._layerEdited = !0
        }
    }),
    V.CircleMarker = V.extend({
        initialize: function(t) {
            this._layer = t,
            this._enabled = !1
        },
        applyOptions: function() {
            this.options.draggable ? this.enableLayerDrag() : this.disableLayerDrag(),
            this.options.snappable ? this._initSnappableMarkers() : this._disableSnapping(),
            this.options.preventMarkerRemoval || this._layer.on("contextmenu", this._removeMarker, this)
        },
        toggleEdit: function(t) {
            this.enabled() ? this.disable() : this.enable(t)
        },
        enabled: function() {
            return this._enabled
        },
        enable: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {
                draggable: !0,
                snappable: !0
            };
            L.Util.setOptions(this, t),
            this._map = this._layer._map,
            this._map && (this.enabled() || this.disable(),
            this._enabled = !0,
            this.applyOptions(),
            this._layer.on("pm:dragend", this._onMarkerDragEnd, this))
        },
        disable: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this._layer;
            return !(!this.enabled() || (t.off("contextmenu", this._removeMarker, this),
            t.pm._dragging || (t.pm._enabled = !1,
            this.disableLayerDrag(),
            this._layerEdited && this._layer.fire("pm:update", {}),
            this._layerEdited = !1)))
        },
        _moveMarker: function(t) {
            var e = t.latlng;
            this._layer.setLatLng(e).redraw()
        },
        _removeMarker: function() {
            this._layer.fire("pm:remove"),
            this._layer.remove(),
            console.log("移除了")
        },
        _fireEdit: function() {
            this._layer.fire("pm:edit"),
            this._layerEdited = !0
        },
        _onMarkerDragEnd: function(t) {
            this._layer.fire("pm:markerdragend", {
                markerEvent: t
            }),
            this._fireEdit()
        },
        _initSnappableMarkers: function() {
            var t = this._layer;
            this.options.snapDistance = this.options.snapDistance || 30,
            t.off("pm:drag", this._handleSnapping, this),
            t.on("pm:drag", this._handleSnapping, this),
            t.off("pm:dragend", this._cleanupSnapping, this),
            t.on("pm:dragend", this._cleanupSnapping, this),
            t.off("pm:dragstart", this._unsnap, this),
            t.on("pm:dragstart", this._unsnap, this)
        },
        _disableSnapping: function() {
            var t = this._layer;
            t.off("pm:drag", this._handleSnapping, this),
            t.off("pm:dragend", this._cleanupSnapping, this),
            t.off("pm:dragstart", this._unsnap, this)
        }
    }),
    i(137),
    i(138),
    i(139),
    i(140),
    L.PM = L.PM || {
        version: n.a,
        Map: k,
        Toolbar: O,
        Draw: P,
        Edit: V,
        activeLang: "zh",
        initialize: function(t) {
            this.addInitHooks(t)
        },
        addInitHooks: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            L.Map.addInitHook((function() {
                this.pm = void 0,
                t.optIn ? !1 === this.options.pmIgnore && (this.pm = new L.PM.Map(this)) : this.options.pmIgnore || (this.pm = new L.PM.Map(this))
            }
            )),
            L.LayerGroup.addInitHook((function() {
                this.pm = new L.PM.Edit.LayerGroup(this)
            }
            )),
            L.Marker.addInitHook((function() {
                this.pm = void 0,
                t.optIn ? !1 === this.options.pmIgnore && (this.pm = new L.PM.Edit.Marker(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Marker(this))
            }
            )),
            L.CircleMarker.addInitHook((function() {
                this.pm = void 0,
                t.optIn ? !1 === this.options.pmIgnore && (this.pm = new L.PM.Edit.CircleMarker(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.CircleMarker(this))
            }
            )),
            L.Polyline.addInitHook((function() {
                this.pm = void 0,
                t.optIn ? !1 === this.options.pmIgnore && (this.pm = new L.PM.Edit.Line(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Line(this))
            }
            )),
            L.Polygon.addInitHook((function() {
                this.pm = void 0,
                t.optIn ? !1 === this.options.pmIgnore && (this.pm = new L.PM.Edit.Polygon(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Polygon(this))
            }
            )),
            L.Rectangle.addInitHook((function() {
                this.pm = void 0,
                t.optIn ? !1 === this.options.pmIgnore && (this.pm = new L.PM.Edit.Rectangle(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Rectangle(this))
            }
            )),
            L.Circle.addInitHook((function() {
                this.pm = void 0,
                t.optIn ? !1 === this.options.pmIgnore && (this.pm = new L.PM.Edit.Circle(this)) : this.options.pmIgnore || (this.pm = new L.PM.Edit.Circle(this))
            }
            ))
        }
    },
    L.PM.initialize()
}
]);
