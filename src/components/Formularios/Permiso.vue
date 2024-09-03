<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Nombre"
      v-model="valoresModel.name"
      :rules="valoresRules.nombre"
    >
    </q-input>
    <q-select
      filled
      clearable
      v-model="valoresModel.content_type"
      :options="listConten"
      option-value="id"
      option-label="model"
      label="Tipo de contenido"
      map-options
      emit-value
      class="col-xs-12 col-md-12"
        />
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Nombre en codigo"
      v-model="valoresModel.codename"
      :rules="valoresRules.nombre"
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
    const permisos = ref([])
    const valoresRules = ref({})
    const _storage = inject('storage')
    const listConten = _storage.get('listaC')
    onMounted(async () => {
      const { rows } = await _http.get('/administracion/permisos/')
      permisos.value = rows
    })

    return {
      valoresModel,
      valoresRules,
      listConten,
      permisos
    }
  }
}
</script>
