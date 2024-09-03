<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
  <q-select
                  v-model="valoresModel.id_regional"
                  :options="regionales"
                  option-value="id_regional"
                  option-label="nombre_regional"
                  class="col-xs-12 col-md-6"
                  label="Regional"
                  map-options
                  emit-value
                  @update:model-value="val => showregional(val)"
                  :rules="valoresRules.id_regional"
                  />
                  <q-select
                  v-model="valoresModel.id_reten"
                  :options="retenes"
                  option-value="id_reten"
                  option-label="nombre_reten"
                  class="col-xs-12 col-md-6"
                  label="Reten"
                  map-options
                  emit-value
                  @update:model-value="val => listaRecaudadores(val)"
                  :rules="valoresRules.id_reten"
                  />
                  <q-select
                  v-model="valoresModel.id_disloque"
                  :options="disloques"
                  option-value="id"
                  option-label="fecha_inicio"
                  class="col-xs-12 col-md-6"
                  label="Disloque"
                  map-options
                  emit-value
                  @update:model-value="val => listaRecaudadores(val)"
                  :rules="valoresRules.id_disloque"
                  />
                  <q-select
                  v-model="valoresModel.id_recaudador"
                  :options="recaudadores.lista_recaudadores"
                  option-value="id"
                  option-label="username"
                  class="col-xs-12 col-md-6"
                  label="Recaudador"
                  map-options
                  emit-value
                  :rules="valoresRules.id_recaudador"
                  />
                  <q-input
                    filled
                    class="col-xs-12 col-md-6"
                    label="Fecha Operacion"
                    v-model="valoresModel.fecha_operaciones"
                    :rules="valoresRules.fecha_operaciones"
                  >
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-date v-model="valoresModel.fecha_operaciones" mask="YYYY-MM-DD">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                  </q-input>
                  <q-select
                  v-model="valoresModel.turno"
                  :options="recaudadores.turnos_disponibles"
                  option-value="id_turno"
                  option-label="nombre"
                  class="col-xs-12 col-md-6"
                  label="Turno"
                  map-options
                  emit-value
                  :rules="valoresRules.turnos_disponibles"
                  />
                  <q-input
      filled
      class="col-xs-12 col-md-6"
      label="numero carril"
      v-model="valoresModel.numero_carril"
      :rules="valoresRules.numero_carril"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Total apertura"
      v-model="valoresModel.total_apertura"
      :rules="valoresRules.total_apertura"
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
  id_regional: [
    validaciones.requerido
  ],
  id_reten: [
    validaciones.requerido
  ],
  id_disloque: [
    validaciones.requerido
  ],
  id_recaudador: [
    validaciones.requerido
  ],
  fecha_operaciones: [
    validaciones.requerido
  ],
  turnos_disponibles: [
    validaciones.requerido
  ],
  numero_carril: [
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
    const cajas = ref([])
    const _storage = inject('storage')
    const recaudadores = ref([])
    const url = ref('/administracion/datosCreacionCaja')
    const disloques = ref({})
    const disloqueslist = ref({})
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
    const reteneslist = _storage.get('retenes')
    // const disloques = _storage.get('disloques')
    // const disloqueslist = _storage.get('disloques')
    const listaRecaudador = async (open, id) => {
      if (valoresModel.value.id_reten != null && valoresModel.value.id_disloque != null) {
        recaudadores.value = await _http.get(`${url.value}/${valoresModel.value.id_reten}/${valoresModel.value.id_disloque}`)
      }
    }
    const listaDisloque = async (open, id) => {
      const row = await await _http.get('/administracion/listaDisloquesParaApertura')
      disloques.value = row
      disloqueslist.value = row
    }
    onMounted(async () => {
      const { rows } = await _http.get('/administracion/cajaCarril')
      cajas.value = rows
      listaDisloque()
      /* const { rowsreca } = await _http.get('/administracion/datosCreacionCaja/1/242')
      recaudadores.value = rowsreca */
      /* _http.get('/administracion/datosCreacionCaja/1/242').then(respo => {
        recaudadores.value = respo
      }) */
    })

    return {
      valoresModel,
      valoresRules,
      estados,
      cajas,
      regionales,
      retenes,
      reteneslist,
      disloqueslist,
      disloques,
      recaudadores,
      listaRecaudador,
      listaDisloque
    }
  },
  methods: {
    showregional (id) {
      if (id) {
        this.retenes = this.busqueda(this.reteneslist, id)
        this.disloques = this.busqueda(this.disloqueslist, id)
      }
    },
    listaRecaudadores (id) {
      this.listaRecaudador()
    },
    busqueda (objeto, id) {
      const result = []
      objeto.forEach(element => {
        if (element.id_regional === id) {
          result.push(element)
        }
      })
      return result
    }
  }
}
</script>
