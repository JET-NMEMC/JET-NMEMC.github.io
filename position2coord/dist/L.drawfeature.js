function showHide(idname) {
    var obj = document.getElementById(idname);
    if (obj.style.display == "none") { 
        obj.style.display = "block" 
    }
    else { obj.style.display = "none" }
};
L.Control.Drawfeature = L.Control.extend({
    options: {
        position: 'bottomright', //初始位置
    },
    divname:"clickbuts",

    initialize: function (options) {
        L.Util.extend(this.options, options);

    },
    onAdd: function (map) {
        //创建一个class为 leaflet-control-container的div
        this._container = L.DomUtil.create('div', 'leaflet-control-container');
        //创建一个图片要素
        var img = L.DomUtil.create('img', 'leaflet-control-logo');
        
        img.id = 'leaflet-control-clegend';
        img.type = 'png';
        img.src = "./img/N图层2.png";
        this._legendimg = img;
        this._container.appendChild(this._legendimg);
        return this._container;
    },
    // _onClick: function(divname) {
    //     var obj = document.getElementById(divname);
    //     if (obj.style.display == "none") { 
    //         obj.style.display = "block" 
    //     }
    //     else { obj.style.display = "none" }
    // }

});
var options= {
    position: 'bottomright' //初始位置
};
L.control.drawfeature = function (options) {
    return new L.Control.Drawfeature(options)
};
L.control.drawfeature().addTo(window.api.map);