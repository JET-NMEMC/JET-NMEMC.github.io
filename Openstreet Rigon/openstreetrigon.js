if (/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)) {
    var lc = L.control.locate({
      position: 'bottomleft',
      locateOptions: {
        maxZoom: 17,
        enableHighAccuracy: true,
      },
      follow: true,
      icon: 'fa fa-location-arrow',// 图标类，fa-location-arrow 或 fa-map-marker
      cacheLocation: true,
      onLocationError: function (err) { alert(err.message) },  // define an error callback function
      onLocationFound: function (e) { console.log('定位成功=====>', e) },
    }).addTo(map);
  };