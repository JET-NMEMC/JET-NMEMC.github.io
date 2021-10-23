/* calc measurements for an array of points */
function calc(latlngs) {
    const path = latlngs.map(latlng => [latlng.lat, latlng.lng]);

    const polyline = L.polyline(path),
        polygon = L.polygon(path);
    const meters = turf.length(polyline.toGeoJSON(), { units: 'kilometers' }) * 1000;
    const sqMeters = turf.area(polygon.toGeoJSON());
    return {
        length: meters,
        area: sqMeters
    };
}
//返回layer的类型的字符串
function getType(targetLayer) {
    if (targetLayer instanceof L.Rectangle) {
        return 'Rectangle'
    } else if (targetLayer instanceof L.Polygon) {
        return 'Polygon'
    } else if (targetLayer instanceof L.Polyline) {
        return 'Polyline'
    } else if (targetLayer instanceof L.Marker) {
        return 'Marker'
    } else if (targetLayer instanceof L.divIcon) {
        return 'divIcon'
    } else if (targetLayer instanceof L.layerGroup) {
        return 'layerGroup'
    } else if (targetLayer instanceof L.featureGroup) {
        return 'featureGroup'
    } else {
        return 'unknown'
    }
}

//-------------------------------------------------------------------------------------popup
var popup = L.popup({ autoClose: true, offset: [0, -25], maxWidth: 600, minWidth: 180 });
//---------------------创建图形时，写入popup方法----------
map.on('pm:create', ({ layer }) => {
    console.log("-----事件触发 图形创建--------");
    // console.log(layer);
    layer.addTo(templayer);
    layer.on('click', (e) => {
        popupA(e);
    });
    console.log("-----------结 束-------------");
})

function popupA(e) {
    console.log("-----事件触发 图形点击-----");
    console.log(e.target);
    var aaa = MyPopup(e.target);
    popup.setContent(aaa.popHtml).setLatLng(e.latlng).addTo(map);
    $("#pop_mid").html(aaa.pop_mid1);
    $("#popup-shuxing").attr("class", "popup-open");
    $("#popup-xiangqing").attr("class", "popup-close");

    $('input[type=radio][name=方法]').change(function () {
        if (this.id == "属性") {
            $("#pop_mid").html(aaa.pop_mid1);
            $("#popup-shuxing").attr("class", "popup-open");
            $("#popup-xiangqing").attr("class", "popup-close");
        } else {
            $("#pop_mid").html(aaa.pop_mid2);
            $("#popup-shuxing").attr("class", "popup-close");
            $("#popup-xiangqing").attr("class", "popup-open");
            $("#pop_printcoord").click(function () {
                console.log("坐标串：", aaa.coordoutput)
            });
        }
    });
    // $('input[type=button][id=pop_printcoord]').onclick = function () {
    //     console.log(aaa.coordoutput)
    // };

    // $('input[type=button][id=pop_printcoord]').on("click", function(){
    //     console.log(aaa.coordoutput)
    // });
}
//-------------------------生成popupHTML-----------------------------
function MyPopup(layer, featuretype) {
    // console.log(layer);
    var nametext;
    if (layer.options.name !== undefined) {
        layername = layer.options.name;
        nametext = '<h3>名称： ' + layername + '</h3>';
    } else if (layer.options.icon !== undefined) {
        layername = layer.options.icon.options.name;
        nametext = '<h3>名称： ' + layername + '</h3>';
    } else {
        nametext = '<h3>名称： Undefined</h3>'
    };
    featuretype = layer.styleEditor ? layer.styleEditor.type :
    layer.options.featureType ? layer.options.featureType : "unknow";
    // if (layer.styleEditor) {
    //     featuretype = layer.styleEditor.type
    // } else if (e.target.featureType) {
    //     featuretype = e.target.featureType
    // } else {
    //     console.log("图层没有type属性");
    //     featuretype = "Unknown";
    // }
    // if (layer.styleEditor) {
    //     featuretype = layer.styleEditor.type;
    // } else {
    //     console.log("图层没有type属性");
    //     featuretype = "Unknown";
    // }

    var typetext = '<h4 id="typetext" style="padding:10px 0 0 0; border-top:0.5px solid #000;">类型： ' +
        featuretype + '</h4>';

    var descriptext;
    if (layer.options.description) {
        descriptext = '<div id="descriptext">' +
            '<h4 style="padding:10px 0 0 0; border-top:0.5px solid #000;">描述:<h4/><div>' +
            layer.options.description + "</div></div>"
    } else {
        descriptext = ''
    };

    switch (featuretype) {
        case 'Polygon':
        case 'Rectangle':
        case 'Polyline':
            {
                var SW = layer._bounds._southWest.lng.toFixed(9) + "&emsp;" + layer._bounds._southWest.lat.toFixed(9);
                var NE = layer._bounds._northEast.lng.toFixed(9) + "&emsp;" + layer._bounds._northEast.lat.toFixed(9);
                var rangetext = '<div id="rangetext"><h4 style="padding:10px 0 0 0; border-top:0.5px solid #000;">范围：<h4/>' +
                    '经度&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;纬度<br>' + SW + '<br>' + NE + '</div>';

                if (featuretype == 'Polyline') {
                    var coord = layer.getLatLngs();
                    var Lengthtext = '<h4 id="lengthtext" style="padding:10px 0 0 0; border-top:0.5px solid #000;">长度： ' + (calc(coord).length / 1000).toFixed(3) + ' km<h4/>';
                    var Areatext = '';
                } else {
                    var coord = layer.getLatLngs()[0];
                    var Lengthtext = '';
                    var Areatext = '<h4 id="areatext" style="padding:10px 0 0 0; border-top:0.5px solid #000;">面积： ' + (calc(coord).area / 10000).toFixed(4) + ' 公顷<h4/>';
                }

                var coordtext;
                var coordtext0 = '<div id="coordtext"><h4 style="padding:10px 0 0 0; border-top:0.5px solid #000;">坐标:<h4/>';
                var coordtext1 = '<p>经度&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;纬度<br>';
                var coordtext2 = []; var coordoutput = [];
                for (i = 0; i < coord.length; i++) {
                    coordtext2.push(coord[i].lng.toFixed(9) + "&emsp;" + coord[i].lat.toFixed(9));
                    coordoutput.push([coord[i].lng.toFixed(9) + " " + coord[i].lat.toFixed(9)]);
                };
                if (coord.length <= 5) {
                    coordtext = coordtext0 + coordtext1 + coordtext2.join("<br>") + "</div>";
                } else {
                    coordtext = coordtext0 + '数据量超过10个，不显示</div><br>' +
                        '<div style="text-align: center;"><button id="pop_printcoord">打印到控制台</button></div><br>';
                }
            }
            break;
        case 'Marker':
        case 'CircleMarker':
            var coord = layer.getLatLng();
            var Lengthtext = "", Areatext = "", rangetext = "";
            var coordtext = '<div id="coordtext"><h4 style="padding:10px 0 0 0; border-top:0.5px solid #000;">位置:<h4/>' +
                '<p>经度&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;纬度<br>' +
                coord.lng.toFixed(9) + "&emsp;" + coord.lat.toFixed(8) + '</p>' + '</div>';
            break;
        default:
            alert("wrong featuretype");
    }
    var endtext = '<div><form action="">' +
        '<label id="popup-shuxing" class="popup-open"><input type="radio" name="方法" id="属性" style="display: none" checked="checked"></input>属性</label>' +
        '<label id="popup-xiangqing" class="popup-close"><input type="radio" name="方法" id="详情" style="display: none"></input>详情</label>' +
        '</form></div>'
    var pop_mid1 = typetext + Lengthtext + Areatext + descriptext;
    var pop_mid2 = rangetext + coordtext;

    return {
        pop_mid1: pop_mid1,
        pop_mid2: pop_mid2,
        popHtml: nametext + '<div id="pop_mid">' + pop_mid1 + '</div>' + endtext,
        coordoutput: coordoutput
    };
}
  //-------------------------------------------------------------------------------------popup
