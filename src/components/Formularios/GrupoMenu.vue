<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
  <q-select
      filled
      clearable
      v-model="valoresModel.id_group"
      :options="grupos"
      option-value="id"
      option-label="name"
      label="Grupo"
      map-options
      emit-value
      class="col-xs-12 col-md-12"
      @update:model-value="val => showregional(val)"
    />
    <q-select
      filled
      clearable
      v-model="valoresModel.id_menu"
      :options="menus"
      option-value="id_menu"
      option-label="nombre"
      label="Menu"
      map-options
      emit-value
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
    const grupomenu = ref([])
    // const menus = ref([])
    // const grupos = ref([])
    const valoresRules = ref({})
    const _storage = inject('storage')
    const grupos = _storage.get('grupo')
    const menus = _storage.get('menus')
    onMounted(async () => {
      const { rows } = await _http.get('/administracion/menuGroup')
      grupomenu.value = rows
      /* const { rowsgrupo } = await _http.get('/administracion/grupos')
      grupos.value = rowsgrupo
      const { rowsmenu } = await _http.get('/administracion/menu')
      menus.value = rowsmenu */
      /* const { rowsgrupo } = _http.get('/administracion/grupos').then(respon => {
        grupos.value = respon
      })
      grupos.value = rowsgrupo
      const { rowsmenu } = _http.get('/administracion/menu').then(respon => {
        menus.value = respon
      })
      menus.value = rowsmenu */
    })
    return {
      valoresModel,
      valoresRules,
      grupomenu,
      grupos,
      menus
    }
  }
}
</script>
