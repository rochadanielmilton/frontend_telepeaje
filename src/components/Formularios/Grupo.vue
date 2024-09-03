<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Grupo"
      v-model="valoresModel.name"
      :rules="valoresRules.name"
      maxlength="101"
    >
    </q-input>

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
  name: [
    validaciones.requerido,
    validaciones.numMaxLetrasMenu
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
    const grupo = ref([])
    onMounted(async () => {
      const { rows } = await _http.get('/administracion/grupos/')
      grupo.value = rows
    })
    return {
      valoresModel,
      valoresRules,
      grupo
    }
  }
}
</script>
