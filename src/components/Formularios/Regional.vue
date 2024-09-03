<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Nombre"
      v-model="valoresModel.nombre_regional"
      :rules="valoresRules.nombre_regional"
    >
    </q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Descripcion"
      v-model="valoresModel.descripcion"
      :rules="valoresRules.descripcion"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Direccion"
      v-model="valoresModel.direccion"
      :rules="valoresRules.direccion"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Telefono"
      v-model="valoresModel.telefono"
      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
      type="number"
      :rules="valoresRules.telefono"
      maxlength="10"
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
  nombre_regional: [
    validaciones.requerido
  ],
  direccion: [
    validaciones.requerido
  ],
  telefono: [
    validaciones.telefonoOcel
  ],
  estado: [
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
    const regionales = ref([])
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
      const { rows } = await _http.get('/parametros/regionales')
      regionales.value = rows
    })

    return {
      valoresModel,
      valoresRules,
      estados,
      regionales
    }
  }
}
</script>
