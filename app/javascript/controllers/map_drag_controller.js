import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl';

// Connects to data-controller="map-drag"
export default class extends Controller {
  static targets = ['latitudeField', 'longitudeField'];
  static values = { latitude: Number, longitude: Number }

  connect() {
    mapboxgl.accessToken = metaContent('mapbox_access_token');

    const map = new mapboxgl.Map({
      container: 'map',
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [this.longitudeValue, this.latitudeValue],
      zoom: 15
    });

    const marker = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([this.longitudeValue, this.latitudeValue])
      .addTo(map);


    const dragEndFunc = function () {
      const lngLat = marker.getLngLat();
      console.log(`Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`);
      this.setLocation(lngLat);
    }.bind(this)

    marker.on('dragend', dragEndFunc);
  }

  setLocation(lngLat) {
    console.log("setLocation", lngLat);
    this.longitudeFieldTarget.value = lngLat.lng;
    this.latitudeFieldTarget.value = lngLat.lat;
  }
}
