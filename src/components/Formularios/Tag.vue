<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Nuevo Tag recibido"
      v-model="valoresModel.cod_tag"
      :rules="valoresRules.cod_tag"
      maxlength="200"
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
import { ref, onMounted } from 'vue'
import validaciones from '../../common/validations'
const valoresRules = {
  cod_tag: [
    validaciones.requerido,
    validaciones.minimoCaracteresTag
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
    const tags = ref([])

    onMounted(async () => {
    })

    return {
      valoresModel,
      valoresRules,
      tags
    }
  }
}
</script>
