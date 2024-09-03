<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
  <q-select
      filled
      clearable
      v-model="valoresModel.recaudadores_seleccionados"
      :options="recaudadores.value"
      option-value="id"
      option-label="username"
      label="Recaudadores"
      multiple
      map-options
      emit-value
      class="col-xs-12 col-md-12"
      :rules="valoresRules.recaudadores_seleccionados"
    />
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Fecha Inicio"
      v-model="valoresModel.fecha_ini"
      :rules="valoresRules.fecha_ini"
      disable
    >
     <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="valoresModel.fecha_inicio" mask="YYYY-MM-DD" >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
  </q-input>
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Fecha fin"
      v-model="valoresModel.fecha_fin"
      :rules="valoresRules.fecha_fin"
    >
      <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="valoresModel.fecha_fin" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
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
import { onMounted, inject } from 'vue'
import validaciones from '../../common/validations'
const valoresRules = {
  recaudadores_seleccionados: [
    validaciones.requerido
  ],
  fecha_fin: [
    validaciones.requerido
  ]
}
export default {
  props: {
    valores: {
      type: Object,
      default: () => ({})
    },
    datos: {
      type: Object,
      default: () => ({})
    },
    fechaI: {
      type: String,
      default: 'url'
    },
    regional: {
      type: String,
      default: 'url'
    }
  },
  setup (props, { emit }) {
    const _http = inject('http')
    const valoresModel = useVModel(props, 'valores')
    const fechad = useVModel(props, 'fechaI')
    const regionald = useVModel(props, 'regional')
    const data = useVModel(props, 'datos')
    const disloques = []
    // const _storage = inject('storage')
    const recaudadores = [{}]
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
    // const recaudadores = _storage.get('regionales')
    onMounted(async () => {
      valoresModel.fecha_inicio = fechad.value
      getData()
      const body = {
        fecha_ini: fechad.value,
        id_regional: regionald.value
      }
      const { rows } = await _http.post('/administracion/usuariosLibres', body)
      if (rows) {
        recaudadores.value = rows
      }
      // recaudadores.value = rows.data
      // console.log('recaduad//a', rows)
    })

    const getData = async () => {
      const body = {
        fecha_ini: fechad.value,
        id_regional: regionald.value
      }
      const rows = await _http.post('/administracion/usuariosLibres', body)
      if (rows) {
        recaudadores.value = rows
      }
    }
    return {
      valoresModel,
      valoresRules,
      estados,
      disloques,
      recaudadores,
      fechad,
      regionald,
      data,
      getData
    }
  }
}
</script>
