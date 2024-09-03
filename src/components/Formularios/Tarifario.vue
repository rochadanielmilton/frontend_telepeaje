<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
  <q-select
      filled
      clearable
      v-model="valoresModel.id_categoria"
      :options="categorias"
      option-value="id_categoria"
      option-label="nombre_categoria"
      label="Categoria"
      map-options
      emit-value
      class="col-xs-12 col-md-6"
      :rules="valoresRules.id_categoria"
    />
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
      v-model="valoresModel.localidad_origen"
      :options="localidades"
      option-value="nombre_localidad"
      option-label="nombre_localidad"
      label="Localidad Origen"
      map-options
      emit-value
      :rules="valoresRules.id_regional"
      class="col-xs-12 col-md-6"
    />
    <q-select
      filled
      clearable
      v-model="valoresModel.localidad_destino"
      :options="localidades"
      option-value="nombre_localidad"
      option-label="nombre_localidad"
      label="Localidad Destino"
      map-options
      emit-value
      :rules="valoresRules.localidad_destino"
      class="col-xs-12 col-md-6"
    />
    <q-select
      filled
      clearable
      v-model="valoresModel.rutas"
      :options="rutas"
      option-value="nombre"
      option-label="nombre"
      label="Rutas"
      map-options
      emit-value
      class="col-xs-12 col-md-6"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Importe"
      v-model="valoresModel.importe"
      :rules="valoresRules.importe"
      mask="#.##"
      fill-mask="0"
      reverse-fill-mask
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

import { useVModel } from '../../composables/useVModel.js'
import { ref, onMounted, inject } from 'vue'
import validaciones from '../../common/validations'
const valoresRules = {
  estado: [
    validaciones.requerido
  ],
  id_categoria: [
    validaciones.requerido
  ],
  id_regional: [
    validaciones.requerido
  ],
  localidad_origen: [
    validaciones.requerido
  ],
  localidad_destino: [
    validaciones.requerido
  ],
  importe: [
    validaciones.requerido
  ]
}
export default {
  props: {
    valores: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const _http = inject('http')
    const valoresModel = useVModel(props, 'valores')
    const tarifarios = ref([])
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
    const regionales = _storage.get('regionales')
    const categorias = _storage.get('categorias')
    const localidades = _storage.get('localidades')
    const localidadeslist = _storage.get('localidades')
    const rutas = _storage.get('rutas')
    const rutaslist = _storage.get('rutas')
    onMounted(async () => {
      const { rows } = await _http.get('/parametros/tarifarios')
      tarifarios.value = rows
    })
    return {
      valoresModel,
      valoresRules,
      estados,
      regionales,
      categorias,
      localidades,
      rutas,
      tarifarios,
      localidadeslist,
      rutaslist
    }
  },
  methods: {
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
    }
  }
}
</script>
