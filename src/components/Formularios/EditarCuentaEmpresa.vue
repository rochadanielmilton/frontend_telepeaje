<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Razon social"
      v-model="valoresModel.razon_social"
      :rules="valoresRules.razon_social"
    >
    </q-input>
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Nombre empresa"
      v-model="valoresModel.nombre"
      :rules="valoresRules.nombre"
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
      class="col-xs-12 col-md-12"
      label="Sector"
      v-model="valoresModel.sector"
      :rules="valoresRules.sector"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Tipo Empresa"
      v-model="valoresModel.tipo_empresa"
      :rules="valoresRules.tipo_empresa"
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
      label="correo"
      v-model="valoresModel.correo"
      :rules="valoresRules.correo"
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
      label="Celular"
      v-model="valoresModel.celular"
      :rules="valoresRules.celular"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Nit"
      v-model="valoresModel.nit"
      :rules="valoresRules.nit"
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
    const valoresRules = ref({})

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
