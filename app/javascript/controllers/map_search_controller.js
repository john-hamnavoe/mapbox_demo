import { Controller } from "@hotwired/stimulus"
import { autofill } from '@mapbox/search-js-web';

// Connects to data-controller="map-search"
export default class extends Controller {
  static targets = ['manualEntry', 'minimapContainer', 'secondaryInputs', 'latitudeField', 'longitudeField', 'line1Field'];

  connect() {
    console.log("MapSearch controller connected");
    console.log("Manual entry target:", this.manualEntryTarget);

    let autofillCollection = autofill({
      accessToken: metaContent('mapbox_access_token')
    })

    let minimap = new MapboxAddressMinimap();
    minimap.canAdjustMarker = true;
    minimap.satelliteToggle = true;
    minimap.accessToken = metaContent('mapbox_access_token');
    minimap.onSaveMarkerLocation = (lnglat) => {
      this.setLocation(lnglat);
    };
    const minimapContainer = this.minimapContainerTarget;
    minimapContainer.appendChild(minimap);

    autofillCollection.addEventListener(
      "retrieve",
      async (e) => {
        this.expandForm();
        if (minimap) {
          minimap.feature = e.detail.features[0];
          this.showMap();
          this.setLocation(e.detail.features[0].geometry.coordinates);
          this.setLine1(e.detail.features[0].properties.address_line1);
          autofillCollection.update();
        }
      }
    );
  }

  openManualEntry(event) {
    console.log("Open manual entry clicked");
    event.preventDefault();
    this.expandForm();
  }

  expandForm() {
    this.manualEntryTarget.classList.add("hidden");
    this.secondaryInputsTarget.classList.remove("hidden");
  }

  collapseForm() {
    this.manualEntryTarget.classList.remove("hidden");
    this.secondaryInputsTarget.classList.add("hidden");
  }

  // Form operation functions
  showMap() {
    this.minimapContainerTarget.classList.remove("none");
  }

  hideMap() {
    this.minimapContainerTarget.classList.add("none");
  }

  setLocation(geometry) {
    console.log("Setting location");

    this.latitudeFieldTarget.value = geometry[1];
    this.longitudeFieldTarget.value = geometry[0];
  }

  // mapbox_search.js will add address-search to the name of search box 
  // so after user has searched for a location, we can use this to set the line1 field
  setLine1(line1) {
    if (this.line1FieldTarget) {
      this.line1FieldTarget.value = line1;
    }
  }
}
