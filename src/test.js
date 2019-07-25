function () {
	var map = nsGmx.leafletMap,
		data = {},
		lid = 'B750DB8488714446A1C0F2246B8FA630',
		gmxProps = nsGmx.gmxMap.layersByID[lid].getGmxProperties(),
		meta = gmxProps.MetaProperties,
		delay = meta.delay ? parseInt(meta.delay.Value) : 5000,
		prefix = '//maps.kosmosnimki.ru',
		url = 'http://dvfu.dewish.ru/map/api',
		fg = L.geoJSON([], {
			onEachFeature: function (feature, layer) {
				let props = feature.properties;
				data[props.id] = layer;
				layer.options.icon = L.icon({
					iconUrl: prefix + '/GetImage.ashx?usr=motorin%40scanex.ru&img=icon.png',
					iconSize: [30, 30],
					iconAnchor: [15, 15],
					popupAnchor: [7, -15]
				});
			}
		}).bindPopup(function (layer) {
			return JSON.stringify(layer.feature.properties, null, 2);
		}),
		reget = () => {
		 if (fg._map) {
			 fetch(prefix + '/proxy?' + url, {mode: 'cors'})
				.then((res) => res.json())
				.then((arr) => {
					arr.forEach(it => {
						let feature = {
							type: 'Feature',
							geometry: {
								type: 'Point',
								coordinates: [it.longitude, it.latitude]
							},
							properties: it
						};
						let layer = data[it.id];
						if (layer) {
							layer.setLatLng([it.latitude, it.longitude]);
						} else {
							fg.addData([feature]);
						}
						
					})
			 });
		 }
		};
	fg.getGmxProperties = () => gmxProps;
	nsGmx.gmxMap.layersByID[lid] = fg;
	setInterval(reget, delay);
	reget();
}
