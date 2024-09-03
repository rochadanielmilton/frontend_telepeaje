<template>
  <q-form class="row q-col-gutter-md" @submit="$emit('guardar')" enctype="multipart/form-data">
    <div v-if="reasignar" class="row col-xs-12 col-md-12">
    <q-card class="col-xs-12 col-md-12">
      <q-card-section>
            <div class="row q-col-gutter-x-md q-col-gutter-y-md">
              <q-field outlined label="Codigo cuenta" stack-label class="col-xs-12 col-md-6">
                {{ vehiculo.id_cuenta }}
              </q-field>
              <q-field outlined label="Placa" stack-label class="col-xs-12 col-md-6">
                {{ vehiculo.placa }}
              </q-field>
              <q-field outlined label="Marca" stack-label class="col-xs-12 col-md-6">
                {{ vehiculo.marca }}
              </q-field>
              <q-field outlined label="Tag" stack-label class="col-xs-12 col-md-6">
                {{ vehiculo.tag }}
              </q-field>
            </div>

      </q-card-section>
    </q-card>
  </div>
    <q-select  filled clearable v-model="valoresModel.id_tag" :options="tagsLibres" option-value="id"
      option-label="cod_tag" label="Tag Libres" map-options emit-value class="col-xs-12 col-md-12" />
    <div class="col-xs-12 text-right">
      <q-btn label="Cancelar" @click="$emit('cancelar')" />
      <q-btn label="Guardar" type="submit" color="primary" class="q-ml-sm" />
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
    },
    reasignar: {
      type: Boolean,
      default: () => false
    },
    vehiculo: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const _http = inject('http')
    const valoresModel = useVModel(props, 'valores')
    const categorias = ref([])
    const valoresRules = ref({})
    const urlTagDisponible = ref('/empadronamiento/listaTagsDisponibles')
    // const tags = ref([])
    const tagsLibres = ref([])
    const _storage = inject('storage')
    const asignarTags = _storage.get('asignarTags')

    const tagDisponibles = async () => {
      const rows = await _http.get(`${urlTagDisponible.value}`)
      tagsLibres.value = rows.tags
    }
    onMounted(async () => {
      tagDisponibles()
    })
    return {
      valoresModel,
      valoresRules,
      categorias,
      urlTagDisponible,
      tagsLibres,
      asignarTags,
      tagDisponibles
    }
  },
  methods: {
    onResultados (datos) {
      console.log('onresultados', datos)
    }
  }
}
</script>
