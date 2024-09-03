<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Nombre"
      v-model="valoresModel.nombre_cargo"
      :rules="valoresRules.nombre_cargo"
      maxlength="81"
    >
    </q-input>
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Descripcion"
      v-model="valoresModel.descripcion"
      :rules="valoresRules.descripcion"
      maxlength="80"
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
import { ref, onMounted, inject } from 'vue'
import validaciones from '../../common/validations'
const valoresRules = {
  nombre_cargo: [
    validaciones.requerido,
    validaciones.minimoCaracteres,
    validaciones.maximoCaracteres
  ],
  estado: [
    validaciones.requerido
  ],
  descripcion: [
    validaciones.maximoCaracteres
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
    const cargos = ref([])

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

    onMounted(async () => {
      const { rows } = await _http.get('/parametros/cargos')
      cargos.value = rows
    })

    return {
      valoresModel,
      valoresRules,
      estados,
      cargos
    }
  }
}
</script>
