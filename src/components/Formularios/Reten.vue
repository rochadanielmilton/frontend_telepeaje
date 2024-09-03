<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Nombre"
      v-model="valoresModel.nombre_reten"
      :rules="valoresRules.nombre_reten"
       maxlength="100"
       type="text"
    >
    </q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Nombre creacion"
      v-model="valoresModel.nombre_creacion"
      :rules="valoresRules.nombre_creacion"
      maxlength="100"
      type="text"
    ></q-input>
    <q-toggle
      v-model="valoresModel.tiene_antena"
      color="primary"
      false-value="no"
      true-value="si"
      label="Cuenta con una antena?"
      class="col-xs-12 col-md-6"
    />
    <q-toggle
      v-model="valoresModel.compartido_regional"
      color="primary"
      false-value="no"
      true-value="si"
      label="Es compartido con otra regional?"
      class="col-xs-12 col-md-6"
    />
    <q-toggle
      v-model="valoresModel.convenio_abc"
      color="primary"
      false-value="no"
      true-value="si"
      label="Tiene convenio con la ABC?"
      class="col-xs-12 col-md-6"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Numero de carriles"
      v-model="valoresModel.num_carril"
      :rules="valoresRules.num_carril"
      type="number"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Descripcion"
      v-model="valoresModel.descripcion"
      :rules="valoresRules.descripcion"
      maxlength="100"
    ></q-input>
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
      class="col-xs-12 col-md-6"
      :rules="valoresRules.id_regional"
      @update:model-value="val => showregional(val)"
    />
    <q-select
      filled
      clearable
      v-model="valoresModel.id_tipo_reten"
      :options="tipoReten"
      option-value="id"
      option-label="nombre"
      label="Tipo Reten"
      map-options
      emit-value
      :rules="valoresRules.id_tipo_reten"
      class="col-xs-12 col-md-6"
    />
    <q-select
      filled
      clearable
      v-model="valoresModel.id_ruta"
      :options="rutas"
      option-value="id_ruta"
      option-label="nombre"
      label="Rutas"
      map-options
      emit-value
      class="col-xs-12 col-md-6"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Documento creacion"
      v-model="valoresModel.doc_creacion"
      :rules="valoresRules.nombre"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Documento resolucion"
      v-model="valoresModel.doc_resolucion"
      :rules="valoresRules.nombre"
    ></q-input>
    <q-select
      filled
      clearable
      v-model="valoresModel.localidad"
      :options="localidades"
      option-value="id_localidad"
      option-label="nombre_localidad"
      label="Localidad"
      map-options
      emit-value
      class="col-xs-12 col-md-6"
    />
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
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Descripcion de la Ubicacion"
      v-model="valoresModel.ubicacion"
      maxlength="100"
      :rules="valoresRules.direccion"
    ></q-input>
    <MapaView :latitud="valoresModel.latitud?valoresModel.latitud:'-16.489423340614213'"  :longitud="valoresModel.longitud?valoresModel.longitud:'-68.13308715820314'" v-on:change="(latitud, longitud)=>this.change(latitud, longitud)" ></MapaView>
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

import MapaView from '@components/common/MapaView'
import { useVModel } from '../../composables/useVModel.js'
import { ref, onMounted, inject } from 'vue'
import validaciones from '../../common/validations'
const valoresRules = {
  nombre_reten: [
    validaciones.requerido,
    validaciones.maximoCaracteresEf
  ],
  id_regional: [
    validaciones.requerido
  ],
  num_carril: [
    validaciones.requerido
  ],
  nombre_creacion: [
    validaciones.requerido
  ],
  estado: [
    validaciones.requerido
  ],
  ubicacion: [
    validaciones.requerido
  ]
}
export default {
  components: { MapaView },
  props: {
    valores: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const _http = inject('http')
    const valoresModel = useVModel(props, 'valores')
    const retenes = ref([])
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
    const tipoReten = [
      {
        nombre: 'telepeaje',
        id: '1'
      },
      {
        nombre: 'siscap',
        id: '2'
      },
      {
        nombre: 'mixto',
        id: '3'
      }
    ]
    const regionales = _storage.get('regionales')
    const categorias = _storage.get('categorias')
    const localidades = _storage.get('localidades')
    const rutas = _storage.get('rutas')
    const localidadeslist = _storage.get('localidades')
    const rutaslist = _storage.get('rutas')
    onMounted(async () => {
      const { rows } = await _http.get('/parametros/retenes')
      retenes.value = rows
    })

    return {
      valoresModel,
      valoresRules,
      retenes,
      estados,
      regionales,
      categorias,
      localidades,
      rutas,
      localidadeslist,
      rutaslist,
      tipoReten,
      MapaView
    }
  },
  methods: {
    change ({ longitud, latitud }) {
      this.valoresModel.latitud = latitud
      this.valoresModel.longitud = longitud
    },
    showregional (id) {
      if (id) {
        this.localidades = this.busqueda(this.localidadeslist, id)
        this.rutas = this.busqueda(this.rutaslist, id)
      }
    },
    busqueda (objeto, id) {
      const result = []
      objeto.forEach(element => {
        if (element.id_regional === id) {
          result.push(element)
        }
      })
      return result
    },
    validarLetras (value) {
      if (/^[A-Za-z\s]+$/.test(value) == null) {
        return 'Este campo necesita ser llenado'
      }
      // console.log('Valor a validar:', value)
      // const soloLetrasRegex = /^[A-Za-z\s]+$/
      // return soloLetrasRegex.test(value) || 'Solo se permiten letras en este campo'
      const maxLetrasPermitidas = 100
      if (/^[A-Za-z\s]+$/.test(value) && value.length <= maxLetrasPermitidas) {
        return true
      } else {
        return `Solo se permiten letras y máximo ${maxLetrasPermitidas} caracteres en este campo`
      }
    },
    validarLetras2 (value) {
      console.log('Valor a validar:', value)
      if (/^[A-Za-z\s]+$/.test(value) == null) {
        return 'Este campo necesita ser llenado'
      }
      const maxLetrasPermitidas = 100
      if (/^[A-Za-z\s]+$/.test(value) && value.length <= maxLetrasPermitidas) {
        return true
      } else {
        return `Solo se permiten letras y máximo ${maxLetrasPermitidas} caracteres en este campo`
      }
      // const maxLetrasPermitidas = 90
      // if (/^[A-Za-z\s]+$/.test(value) && value.length <= maxLetrasPermitidas) {
      //   return true
      // } else {
      //   return `Solo se permiten letras y máximo ${maxLetrasPermitidas} caracteres en este campo`
      // }
    }
  }
}
</script>
