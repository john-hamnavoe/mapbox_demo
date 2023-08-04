import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

// Connects to data-controller="map"
export default class extends Controller {
  connect() {
    mapboxgl.accessToken = metaContent('mapbox_access_token');

    const map = new mapboxgl.Map({
      container: 'map',
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-4.2533, 55.8596],
      zoom: 13
    });

    // Add the control to the map.
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    });

    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

    geocoder.on('result', function (e) {
      document.getElementById('address_attention').value = e.result.place_name
      document.getElementById('address_longitude').value = e.result.center[0]
      document.getElementById('address_latitude').value = e.result.center[1]

      console.log(e.result)

    })

  }
}
