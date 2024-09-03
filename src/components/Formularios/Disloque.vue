<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
  <q-select
      filled
      clearable
      v-model="valoresModel.id_categoria"
      :options="regionales"
      option-value="id_regional"
      option-label="nombre_regional"
      label="Regional"
      map-options
      emit-value
      class="col-xs-12 col-md-12"
      @update:model-value="val => showregional(val)"
    />
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Fecha Inicio"
      v-model="valoresModel.fecha_inicio"
      :rules="valoresRules.fecha_inicio"
    >
     <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="valoresModel.fecha_inicio">
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
                <q-date v-model="valoresModel.fecha_fin">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
  </q-input>
  <q-select
      filled
      clearable
      v-model="valoresModel.responsable_disloque"
      :options="listaRetenes"
      option-value="id_reten"
      option-label="nombre_reten"
      label="Regional"
      map-options
      emit-value
      class="col-xs-12 col-md-12"
    />
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Responsable disloque"
      v-model="valoresModel.responsable_disloque"
      :rules="valoresRules.responsable_disloque"
    ></q-input>
    <q-select
      filled
      clearable
      v-model="valoresModel.estado"
      :options="estados"
      option-value="id"
      option-label="nombre"
      label="Estado"
      map-options
      emit-value
      class="col-xs-12 col-md-6"
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
  setup (props, { emit }) {
    const _http = inject('http')
    const valoresModel = useVModel(props, 'valores')
    const disloques = ref([])
    const valoresRules = ref({})
    const _storage = inject('storage')
    const listaRetenes = Object
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
    onMounted(async () => {
      const { rows } = await _http.get('/administracion/disloque')
      disloques.value = rows
    })
    const consulta = async (id, fecha) => {
      console.log('sdfsd')
      const { rows } = await _http.get('/administracion/retenesNoDisloqueAPI/8/2023-11-02')
      _http.get('/administracion/retenesNoDisloqueAPI/8/2023-11-02').then(response => {
        // console.log(response)
        this.listaRetenes = response
      })
      // this.listaRetenes = rows
      console.log('dats', rows)
    }
    return {
      valoresModel,
      valoresRules,
      estados,
      regionales,
      disloques,
      consulta,
      listaRetenes
    }
  },
  methods: {
    showregional (id) {
      if (id) {
        console.log(this.valoresModel.fecha_inicio)
        // const { rows } = await this._http.get('/administracion/retenesNoDisloqueAPI/8/2023-11-02')
        const { rows } = this.consulta(1, '2023-11-02')
        console.log(rows)
      }
    }
  }
}
</script>
