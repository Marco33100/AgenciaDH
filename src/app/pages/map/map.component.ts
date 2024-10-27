import { Component,AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.initMap(); // Llama al método para inicializar el mapa
  }

  // Método privado para inicializar el mapa
  private initMap(): void {
    // Crea una nueva instancia y  esta se le va a  asignar al elemento con ID 'map'
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 21.157, lng: -100.932 }, // Establece donde aparecera el mapa cuando se inicialice, en este caso se puso en esas coordenadas por ser de Dolores Hidalgo
      zoom: 14, // Es el nivel del zoom del mapa
    });

    // Obtiene el elemento de entrada (input) para buscar lugares en especifico
    const input = document.getElementById('searchInput') as HTMLInputElement;
    // El searchBox sirve de ayuda para poder completar lo que estas escribiendo
    const searchBox = new google.maps.places.SearchBox(input);

    // Añade el input al mapa en la posición superior izquierda para que se vea de buena forma
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Inicializa un array para almacenar los marcadores que salen en el mapa
    let markers: google.maps.Marker[] = [];

    searchBox.addListener('places_changed', () => {
      // Obtienes los lugares seleccionados en el SearchBox
      const places = searchBox.getPlaces();
      if (!places || places.length === 0) return;

      // Esto lo que hace es eliminar los marcadores anteriores del mapa
      markers.forEach((marker) => marker.setMap(null));
      markers = [];

      // Crea un objeto para ajustar el mapa a los límites de los lugares encontrados
      const bounds = new google.maps.LatLngBounds();

      // Itera sobre los lugares seleccionados
      places.forEach((place: google.maps.places.PlaceResult) => {
        if (!place.geometry || !place.geometry.location) return;

        // Crea un nuevo marcador para el lugar
        const marker = new google.maps.Marker({
          map,
          title: place.name,
          position: place.geometry.location, // Establece la posición del marcador
        });
        markers.push(marker);

        // Ajusta los límites del mapa basados en el viewport o la ubicación del lugar
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      //Lo que hace es que para que el mapa se ajuste a los límites definidos y sea mas facil de cargar
      map.fitBounds(bounds);
    });
  }
}
