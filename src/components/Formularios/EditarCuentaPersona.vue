<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Nombre"
      v-model="valoresModel.nombre"
      :rules="valoresRules.nombre"
    >
    </q-input>
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Apellido Paterno"
      v-model="valoresModel.ap_paterno"
      :rules="valoresRules.ap_paterno"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Apellido Materno"
      v-model="valoresModel.ap_materno"
      :rules="valoresRules.ap_materno"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Ci"
      v-model="valoresModel.ci_persona"
      :rules="valoresRules.ci_persona"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Direccion"
      v-model="valoresModel.celular"
      :rules="valoresRules.celular"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Telefono"
      v-model="valoresModel.telefono"
      :rules="valoresRules.telefono"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Ciudad"
      v-model="valoresModel.ciudad"
      :rules="valoresRules.ciudad"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Correo"
      v-model="valoresModel.correo"
      :rules="valoresRules.correo"
    ></q-input>
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
  nombre: [
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
    const cargos = ref([])

    const tipoRecarga = [
      {
        nombre: 'Efectivo',
        id: '1'
      },
      {
        nombre: 'Deposito Bancario',
        id: '2'
      }
    ]

    onMounted(async () => {
      const { rows } = await _http.get('/parametros/cargos')
      cargos.value = rows
    })

    return {
      valoresModel,
      valoresRules,
      tipoRecarga,
      cargos
    }
  }
}
</script>
