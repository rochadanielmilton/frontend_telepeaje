<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Observaciones"
      v-model="valoresModel.observaciones"
      :rules="valoresRules.observaciones"
      maxlength="254"
    />
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Total cierre"
      v-model="valoresModel.total_cierre_recaudador"
      :rules="valoresRules.total_cierre_recaudador"
      mask="#.##"
      fill-mask="0"
      reverse-fill-mask
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
  observaciones: [
    validaciones.requerido,
    validaciones.maximoCaracteresCr
  ],
  total_cierre_recaudador: [
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
    // const _http = inject('http')
    const valoresModel = useVModel(props, 'valores')
    const cierrecaja = ref([])
    const _storage = inject('storage')
    const recaudadores = ref([])
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
    const retenes = _storage.get('retenes')
    const disloques = _storage.get('disloques')
    onMounted(async () => {
      /* _http.get('/administracion/datosCreacionCaja/1/242').then(respo => {
        recaudadores.value = respo
      }) */
    })

    return {
      valoresModel,
      valoresRules,
      estados,
      cierrecaja,
      regionales,
      retenes,
      disloques,
      recaudadores
    }
  }
}
</script>
