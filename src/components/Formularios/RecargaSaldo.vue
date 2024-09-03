<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Nombre Depositante"
      v-model="valoresModel.nombre_depositante"
      :rules="valoresRules.nombre_depositante"
      type="text"
      maxlength="151"
    >
    </q-input>
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Celular"
      v-model="valoresModel.celular"
      :rules="valoresRules.celular"
      type="number"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Monto Depositado"
      v-model="valoresModel.monto_depositado"
      :rules="valoresRules.monto_depositado"
      mask="#.##"
      fill-mask="0"
      reverse-fill-mask
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Cuenta Bancaria"
      v-model="valoresModel.cuenta_bancaria"
      :rules="valoresRules.descripcion"
      type="number"
    ></q-input>
    <q-select
      filled
      clearable
      v-model="valoresModel.tipo_recarga"
      :options="tipoRecarga"
      option-value="id"
      option-label="nombre"
      label="Tipo de Recarga"
      map-options
      emit-value
      class="col-xs-12 col-md-12"
      :rules="valoresRules.tipo_recarga"
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
  nombre_depositante: [
    validaciones.requerido,
    validaciones.numMaxLetrasNomAcc
  ],
  monto_depositado: [
    validaciones.requerido
  ],
  tipo_recarga: [
    validaciones.requerido
  ],
  celular: [
    validaciones.telefono,
    validaciones.soloNumeros
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
  },
  methods: {
    validarCelular () {
      if (this.valoresModel.celular.length > 10) {
        // Truncar el número o realizar alguna otra acción según tus necesidades
        this.valoresModel.celular = this.valoresModel.celular.slice(0, 10)
      }
    }
  }
}
</script>
