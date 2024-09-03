<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
    <!--q-select
      filled
      clearable
      v-model="valoresModel.id_reten"
      :options="retenes"
      option-value="id_reten"
      option-label="nombre_reten"
      label="Reten"
      map-options
      emit-value
      class="col-xs-12 col-md-12"
    /-->
    <q-select
      filled
      clearable
      v-model="valoresModel.id_recaudador"
      :options="usuarios"
      option-value="id"
      option-label="username"
      label="Recaudador"
      map-options
      emit-value
      :rules="valoresRules.id_recaudador"
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
  id_regional: [
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
    const recaudador = ref([])
    const retenes = ref([])
    const usuarios = ref([])
    const urlReten = ref('/parametros/listaRetenesDeRegional')
    const urlUsuario = ref('/administracion/usuariosLibres')
    const _storage = inject('storage')
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
    const dataDisloque = _storage.get('datadisloque')
    const getRetenes = async () => {
      const rows = await _http.get(`${urlReten.value}/${dataDisloque.id_regional}`)
      if (rows) {
        retenes.value = rows
      }
    }

    const getUsuarios = async () => {
      const body = {
        id_regional: dataDisloque.id_regional,
        fecha_ini: dataDisloque.fecha_inicio
      }
      const rows = await _http.post(`${urlUsuario.value}`, body)
      if (rows) {
        usuarios.value = rows
      }
    }

    onMounted(async () => {
      // const { rows } = await _http.get('/parametros/cargos')
      // recaudador.value = rows
      valoresModel.value.id_disloque = dataDisloque.id
      valoresModel.value.id_regional = dataDisloque.id_regional
      valoresModel.value.fecha_ini = dataDisloque.fecha_inicio
      getRetenes()
      getUsuarios()
    })

    return {
      valoresModel,
      valoresRules,
      estados,
      recaudador,
      retenes,
      usuarios,
      dataDisloque
    }
  }
}
</script>
