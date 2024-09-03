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
        option-value="id"
        option-label="nombre"
        label="Regional"
        map-options
        emit-value
        class="col-xs-12 col-md-12"
        :rules="valoresRules.id_regional"
      />
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Direccion"
      v-model="valoresModel.direccion"
      :rules="valoresRules.direccion"
    >
    </q-input>
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Descripcion"
      v-model="valoresModel.descripcion"
      :rules="valoresRules.descripcion"
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
      class="col-xs-12 col-md-12"
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
  id_regional: [
    validaciones.requerido
  ],
  estado: [
    validaciones.requerido
  ],
  direccion: [
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
    const puntoempadronamiento = ref([])
    const estados = [
      {
        nombre: 'inhabilitado',
        id: 'inhabilitado'
      },
      {
        nombre: 'habilitado',
        id: 'habilitado'
      }
    ]
    const regionales = [
      {
        nombre: 'Tarija',
        id: '1'
      },
      {
        nombre: 'Pando',
        id: '2'
      },
      {
        nombre: 'La Paz',
        id: '3'
      },
      {
        nombre: 'Santa Cruz',
        id: '4'
      },
      {
        nombre: 'Oruro',
        id: '5'
      },
      {
        nombre: 'Potosi',
        id: '6'
      },
      {
        nombre: 'Chuquisaca',
        id: '7'
      },
      {
        nombre: 'Cochabamba',
        id: '8'
      },
      {
        nombre: 'Beni',
        id: '9'
      }
    ]
    onMounted(async () => {
      const { rows } = await _http.get('/empadronamiento/pempadronamiento')
      puntoempadronamiento.value = rows
    })

    return {
      valoresModel,
      valoresRules,
      estados,
      regionales,
      puntoempadronamiento
    }
  }
}
</script>
