<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
    <q-select
      filled
      clearable
      v-model="valoresModel.id_regional"
      :options="regionales"
      option-value="id_regional"
      option-label="nombre_regional"
      label="Regional"
      map-options
      emit-value
      class="col-xs-12 col-md-12"
      :rules="valoresRules.id_regional"
    />
    <!--q-select
      filled
      clearable
      v-model="valoresModel.id_reten"
      :options="retenes"
      option-value="id_reten"
      option-label="nombre_reten"
      label="Reten"
      map-options
      emit-value
      class="col-xs-12 col-md-12"
    /-->
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Nombre Ruta"
      v-model="valoresModel.nombre"
      :rules="valoresRules.nombre"
      maxlength="30"
    ></q-input>
    <q-select
      filled
      clearable
      v-model="valoresModel.estado"
      :options="estados"
      option-value="id"
      option-label="nombre"
      label="Estado"
      map-options
      emit-value
      class="col-xs-12 col-md-6"
      :rules="valoresRules.estado"
    />
    <!--q-input
      filled
      class="col-xs-12 col-md-6"
      label="Punto Inicio"
      v-model="valoresModel.punto_inicio"
      :rules="valoresRules.nombre"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Punto Fin"
      v-model="valoresModel.punto_fin"
      :rules="valoresRules.nombre"
    ></q-input-->
    <MapaRuta
    :latitudI="'-16.489623340614213'"
    :latitudF="'-16.489423340614213'"
    :longitudI="'-68.13608715820314'"
    :longitudF="'-68.13308715820314'"
    ></MapaRuta>
    <!-- MapaViewL
    :latitud="'-16.489423340614213'"
    :longitud="'-68.13308715820314'"
    :puntoI="valoresModel.punto_inicio"
    v-on:change="(latitud, longitud)=>this.change(latitud, longitud)" >
    </MapaViewL-->
    <div class="col-xs-12 text-right">
      <q-btn
        label="Cancelar"
        @click="$emit('cancelar')"
      />
      <q-btn
        label="Guardar"
        type="submit"
        color="primary"
        class="q-ml-sm"
      />
    </div>
  </q-form>
</template>
<script>

import MapaRuta from '@components/common/MapaRuta'
import { useVModel } from '../../composables/useVModel.js'
import { ref, onMounted, inject } from 'vue'
import validaciones from '../../common/validations'
const valoresRules = {
  id_regional: [
    validaciones.requerido
  ],
  nombre: [
    validaciones.requerido
  ],
  estado: [
    validaciones.requerido
  ]
}
export default {
  components: { MapaRuta },
  props: {
    valores: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const _http = inject('http')
    const valoresModel = useVModel(props, 'valores')
    const rutas = ref([])
    const _storage = inject('storage')
    const estados = [
      {
        nombre: 'deshabilitado',
        id: 'deshabilitado'
      },
      {
        nombre: 'habilitado',
        id: 'habilitado'
      }
    ]
    /* const latitudI = valoresModel.punto_inicio.split(',')[0]
    const longitudI = valoresModel.punto_inicio.split(',')[1] */
    const retenes = _storage.get('retenes')
    const regionales = _storage.get('regionales')
    onMounted(async () => {
      const { rows } = await _http.get('/parametros/rutas')
      rutas.value = rows
    })

    return {
      valoresModel,
      valoresRules,
      retenes,
      rutas,
      estados,
      regionales
    }
  },
  methods: {
    change ({ longitud, latitud }) {
      this.valoresModel.punto_inicio = latitud
      this.valoresModel.punto_fin = longitud
    }
  }
}
</script>
