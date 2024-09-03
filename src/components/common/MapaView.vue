<template>
  <div style="height:600px; width:800px">
    <l-map ref="map"
      :zoom="zoom"
      :center="[latitud, longitud]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      >
    </l-tile-layer>
    <l-marker
    :lat-lng="[latitud, longitud]"
    :draggable="true"
    v-on:move="move"
    >
    </l-marker>
    </l-map>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'

export default {
  props: [
    'latitud',
    'longitud'
  ],
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      zoom: 7,
      center: [this.latitud, this.longitud]
    }
  },
  mounted () {
    setTimeout(() => {
      this.visible = true
    }, 500)
    setTimeout(() => {
      if (this.$refs.marker) {
        if (this.$refs.marker) {
          this.$refs.marker.mapObject.openPopup()
        }
      }
    }, 700)
  },
  methods: {
    move (event) {
      this.$emit('change', { latitud: event.latlng.lat, longitud: event.latlng.lng })
    }
  }
}
</script>
