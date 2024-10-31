/*function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 21.157, lng: -100.932 },
    zoom: 14,
  });

  const input = document.getElementById('searchInput');
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  let markers = [];
  searchBox.addListener('places_changed', () => {
    const places = searchBox.getPlaces();
    if (places.length === 0) return;

    markers.forEach(marker => marker.setMap(null));
    markers = [];

    const bounds = new google.maps.LatLngBounds();
    places.forEach(place => {
      if (!place.geometry || !place.geometry.location) return;

      const marker = new google.maps.Marker({
        map,
        title: place.name,
        position: place.geometry.location,
      });

      markers.push(marker);

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}*/
