<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Nombre"
      v-model="valoresModel.nombre_localidad"
      :rules="valoresRules.nombre_localidad"
    >
    </q-input>
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
      :rules="valoresRules.id_regional"
      class="col-xs-12 col-md-12"
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
      :rules="valoresRules.estado"
      class="col-xs-12 col-md-12"
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
import validaciones from '../../common/validations'
const valoresRules = {
  nombre_localidad: [
    validaciones.requerido,
    validaciones.letras
  ],
  id_regional: [
    validaciones.requerido
  ],
  estado: [
    validaciones.requerido
  ]
}
import { ref, onMounted, inject } from 'vue'
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
    const localidades = ref([])
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
    onMounted(async () => {
      const { rows } = await _http.get('/parametros/localidades')
      localidades.value = rows
    })

    return {
      valoresModel,
      valoresRules,
      estados,
      regionales,
      localidades
    }
  }
}
</script>
