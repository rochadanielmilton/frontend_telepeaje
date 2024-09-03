
<template>
  <div style="height:500px; width:400px">
    <div :id='mapId' class='map' style="height:500px; width:96%"></div>
    <LRoutingMachine
    :mapObject='mapObject'
    :waypoints='waypoints'
    :visible="true"
    v-on:move="move"
    />
  </div>
</template>

<script>
import LRoutingMachine from '@components/common/LRoutingMachine.vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const waypoints = [
  { lat: -68.15289464761594, lng: -16.844731819856136 },
  { lat: -68.19737291800205, lng: -16.182861328125004 }
]

export default {
  props: {
    latitudI: {
      type: String,
      default: '-68.43706249050945'
    },
    longitudI: {
      type: String,
      default: '-16.321284090673515'
    },
    latitudF: {
      type: String,
      default: '-68.23028607519096'
    },
    longitudF: {
      type: String,
      default: '-16.48496316226955'
    }
  },
  components: {
    LRoutingMachine
  },
  data () {
    return {
      mapId: 'map',
      mapObject: null,
      zoom: 15,
      center: { lat: '-16.489423340614213', lng: '-68.13308715820314' },
      osmUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      waypoints
    }
  },
  mounted () {
    this.waypoints = [
      { lat: this.latitudI, lng: this.longitudI },
      { lat: this.latitudF, lng: this.longitudF }
    ]
    this.mapObject = L.map(this.mapId, {
      zoom: this.zoom,
      center: this.center,
      // osmUrl: require('../../assets/marker.png'),
      osmUrl: require('leaflet/dist/images/marker-icon.png'),
      // iconUrl: require('../../assets/marker.png')
      iconUrl: require('leaflet/dist/images/marker-shadow.png')
    })

    L.tileLayer(this.osmUrl, {
      attribution: this.attribution
    }).addTo(this.mapObject)
  },
  methods: {
    move (event) {
      this.$emit('change', { latitud: event.latlng.lat, longitud: event.latlng.lng })
    }
  }
}
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
