/**
 * Export module — export map layers to Shapefile, KML, or GeoJSON.
 */
(function () {
  'use strict';

  var map = null;

  function exportFeatures(mapInstance, fileType) {
    var collection = {
      type: 'FeatureCollection',
      features: []
    };

    mapInstance.eachLayer(function (layer) {
      if (layer instanceof L.Marker ||
          layer instanceof L.Polygon ||
          layer instanceof L.Polyline ||
          (layer.options && layer.options.featureType === 'CircleMarker')) {
        var geojson = layer.toGeoJSON();
        if (layer.options && layer.options.attribute) {
          geojson.properties = layer.options.attribute;
        }
        collection.features.push(geojson);
      }
    });

    if (collection.features.length === 0) {
      console.log(mapInstance._layers);
      alert('当前图层没有可导出的要素');
      return;
    }

    console.log(collection);

    switch (fileType) {
      case 'shp':
        GeoShape.transformAndDownload(collection);
        break;
      case 'kml':
        WGIS.createAndDownloadFile('kmlnew.kml', tokml(collection, {
          name: 'name',
          description: 'description'
        }));
        break;
      case 'json':
        WGIS.createAndDownloadFile('kmlnew.json', JSON.stringify(collection));
        break;
      default:
        alert('Wrong export type');
    }
  }

  function init() {
    map = WGIS.state.map;
  }

  WGIS.exportFeatures = exportFeatures;
  WGIS.exporterInit = init;
})();
