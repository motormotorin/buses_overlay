function () {
	var map = nsGmx.leafletMap,
		data = [],
		fg = L.geoJSON(data, {
			onEachFeature: function (feature, layer) {
				layer.options.icon = L.icon({
					iconUrl: '//maps.kosmosnimki.ru/GetImage.ashx?usr=motorin%40scanex.ru&img=icon.png',
					iconSize: [30, 30],
					iconAnchor: [15, 15],
					popupAnchor: [-15, -15]
				});
			}
		}).bindPopup(function (layer) {
			return layer.feature.properties.description;
		}).addTo(map),
		reget = () => {
		 fetch('//maps.kosmosnimki.ru/proxy?http://dvfu.dewish.ru/map/api', {mode: 'cors'})
			.then((res) => res.json())
			.then((arr) => {
				let data = {
					type: 'FeatureCollection',
					features: arr.map(it => {
						return {
							type: 'Feature',
							geometry: {
								type: 'Point',
								coordinates: [it.longitude, it.latitude]
							},
							properties: it
						};
					})
				};
				fg.clearLayers();
				fg.addData(data);
				console.log(data);
				
		 })
		};
		
	setInterval(reget, 15000);
	//reget();
}
