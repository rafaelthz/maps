// Initialize leaflet.js
var L = require('leaflet');

// Initialize the map
var map = L.map('map', {
  scrollWheelZoom: true
});

var initialCoordinates = [0,0];
var initialZoomLevel = 2;

// create a map in the "map" div, set the view to a given place and zoom
map.setView(initialCoordinates, initialZoomLevel);

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; Contribuidores do <a href="http://osm.org/copyright">OpenStreetMap</a>'
}).addTo(map);



var runIcon = L.icon({
    iconUrl: '/style/icons/jogging.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});

var points = L.geoJSON(bic, {
	pointToLayer: iconMarker,
    onEachFeature: onEachFeaturePoint
}).addTo(map);

var geojson = L.geoJSON(data, {
    onEachFeature: onEachFeature,
	style: style
}).addTo(map);

var lines = L.geoJSON(dataLines, {
	onEachFeature: onEachFeatureLines,
    style: style2
}).addTo(map);


//var geojson2 = L.geoJSON(data2).addTo(map);

function onEachFeaturePoint(feature, layer) {
    // does this feature have a property named popupContent?
    //"drvr_sex" "crashday" "crash_type"
    var feat = feature.properties
    if (feat){
        layer.bindPopup('Driver Sex: ' + feat.drvr_sex + '<br>Crash Day: '+ feat.crashday+ '<br>Crash Type: ' + feat.crash_type);
    }
}

function onEachFeaturePoint2(feature, layer) {
    // does this feature have a property named popupContent?
    //"drvr_sex" "crashday" "crash_type"
    var feat = feature.properties
    if (feat){
        layer.bindPopup('ID: ' + feat.id + '<br>Instant: '+ feat.instant);
    }
}

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    //"roadspeedlimit" "length" "type"
    var feat = feature.properties
    if (feat){
        layer.bindPopup('Road Speed Limit: ' + feat.roadspeedlimit + '<br>Length: '+ feat.length+ '<br>Type: ' + feat.type);
    }

    layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight
	});
}

function onEachFeatureLines(feature, layer) {
	var feat = feature.properties
    if (feat){
        layer.bindPopup('ID: ' + feat.id);
    }

	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight2
	});
}

function style(feature) {
	return {
		"weight": 4,
		"color": getColor(feature.properties.length),
	 	"opacity": 1
	}
};

function style2(feature) {
	return {
		"weight": 8,
		"color": '#000000',
	 	"opacity": 1
	}
};

function iconMarker(feature, latlng){
    var bikeIcon = new L.icon({
	    iconUrl: '/style/icons/cycling.png'
	});
    return L.marker(latlng, {icon: bikeIcon});
}

function getColor(x) {
  	return	x < 0.40	?  '#ffffb2':
         	x < 0.70	?  '#fecc5c':
         	x < 1.00	?  	'#fd8d3c':
         	x < 2.00	?  '#f03b20':
            	           '#bd0026';
};

function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 6,
		color: '#277FCA',
		fillOpacity: 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		layer.bringToFront();
	}
}

function resetHighlight(e) {
	geojson.resetStyle(e.target);
	//info.update();
}

function resetHighlight2(e) {
	lines.resetStyle(e.target);
	//info.update();
}

// // Set the position and zoom level of the map
// map.setView([47.70, 13.35], 7);

// var osm_bw_mapnik = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
// 	maxZoom: 18,
// 	attribution: '&copy; OSM Black and White Mapnik <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// var esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
// 	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
// })

// var esri_WorldTerrain = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}', {
// 	attribution: 'Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS',
// 	maxZoom: 13
// });

// var esri_NatGeoWorldMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
// 	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
// 	maxZoom: 16
// });

// var baseLayers = {
// 	"OpenStreetMap Mapnik":osm_bw_mapnik,
// 	"ESRI World Imagery": esri_WorldImagery,
// 	"ESRI World Terrain": esri_WorldTerrain,
// 	"ESRI National Geographic": esri_NatGeoWorldMap
// };


// // Add baseLayers to the map
// geojson = L.geoJson(states, {
// 	style: style,
// 	onEachFeature: onEachFeature
// }).addTo(map);

// var overLayers = {
// 	"Austrian States":geojson
// }

// L.control.layers(baseLayers, overLayers).addTo(map);

// // // Create control that shows information on hover
// // var info = L.control({position:'topright'});

// // info.onAdd = function (map) {
// // 	this._div = L.DomUtil.create('div', 'info');
// // 	this.update();
// // 	return this._div;
// // };

// // info.update = function (props) {
// // 		this._div.innerHTML = '<p><b>Population Density</b></p>' +  (props ?
// // 			'<b>' + props.name + '</b><br />' + props.density + ' people / km<sup>2</sup>'
// // 			: 'Hover over a state');
// // };
// // info.addTo(map);

// // function getColor(d) {
// // 	return d > 1000 ? '#0868ac' :
// // 			d > 130  ? '#2f8ec0' :
// // 			d > 100  ? '#55b0c8' :
// // 			d > 80   ? '#7bccc4' :
// // 			d > 70   ? '#a5dcbe' :
// // 			d > 50   ? '#ccebca' :
// // 						'#ccebca';
// // }

// // /* Set of function for the hover over the geojson layer */
// function style(feature) {
// 	return {
// 		weight: 2,
// 		opacity: 0.7,
// 		color: 'white',
// 		dashArray: '2',
// 		fillOpacity: 0.7,
// 		//fillColor: getColor(feature.properties.density)

// 	};
// }

// function highlightFeature(e) {
// 	var layer = e.target;

// 	layer.setStyle({
// 		weight: 5,
// 		color: '#277FCA',
// 		dashArray: '',
// 		fillOpacity: 0.7
// 	});

// 	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
// 		layer.bringToFront();
// 	}

// 	//info.update(layer.feature.properties);
// }

// var geojson;

// function resetHighlight(e) {
// 	geojson.resetStyle(e.target);
// 	//info.update();
// }

// function zoomToFeature(e) {
// 	map.fitBounds(e.target.getBounds());
// }

// function onEachFeature(feature, layer) {
// 	layer.on({
// 		mouseover: highlightFeature,
// 		mouseout: resetHighlight,
// 		click: zoomToFeature
// 	});
// }


// // var legend = L.control({position: 'bottomright'});

// // legend.onAdd = function (map) {

// // 	var div = L.DomUtil.create('div', 'info legend'),
// // 		grades = [1, 70, 80, 100, 130, 1000],
// // 		labels = [],
// // 		from, to;

// // 	for (var i = 0; i < grades.length; i++) {
// // 		from = grades[i];
// // 		to = grades[i + 1];

// // 		labels.push(
// // 			'<i style="background:' + getColor(from + 1) + '"></i> ' +
// // 			from + (to ? '&ndash;' + to : '+'));
// // 	}

// // 	div.innerHTML = labels.join('<br>');
// // 	return div;
// // };

// // legend.addTo(map);