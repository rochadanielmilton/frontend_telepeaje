<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
    enctype="multipart/form-data"
  >
  <q-input
    filled
    class="col-xs-12 col-md-6"
    label="Fecha inicio contrato"
    v-model="valoresModel.fecha_ini_contrato"
    :rules="valoresRules.fecha_ini_contrato"
  >
       <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="valoresModel.fecha_ini_contrato" mask="YYYY-MM-DD">
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
    class="col-xs-12 col-md-6"
    label="Fecha fin contrato"
    v-model="valoresModel.fecha_fin_contrato"
    :rules="valoresRules.fecha_fin_contrato"
  >
       <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="valoresModel.fecha_fin_contrato" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
    </q-input>
    <q-file
          filled
          class="col-xs-12 col-md-6"
          label="Seleccione una imagen"
          v-model="valoresModel.doc_contrato"
          counter
          :counter-label="counterLabelFn"
          max-files="1"
          multiple
          accept=".jpg"
          @update:model-value="previewImage"
          :rules="valoresRules.doc_contrato"
        >
          <!--template v-slot:prepend>
            <q-icon name="attach_file" />
          </template-->
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click.stop.prevent="valoresModel.doc_contrato = null"
              class="cursor-pointer"
            />
          </template>
    </q-file>
    <div class="mainPhotoContainer col-11 col-md-4 q-pa-md q-mt-md">
      <q-img class="col-12" :src="imageUrl" alt="" />
    </div>
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
  fecha_ini_contrato: [
    validaciones.requerido
  ],
  fecha_fin_contrato: [
    validaciones.requerido
  ],
  doc_contrato: [
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
    const contratos = ref([])
    const imageUrl = ref('')
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
    const previewImage = () => {
      console.log('conse', valoresModel.value.doc_contrato)
      if (valoresModel.value) {
        imageUrl.value = URL.createObjectURL(valoresModel.value.doc_contrato[0])
      }
    }
    onMounted(async () => {
      console.log('valores', valoresModel.value.id_ultimo_contrato)
      /* const { rows } = await _http.get('/parametros/contratos')
      contratos.value = rows */
      /* imageUrl.value = valoresModel.value.doc_contrato
      const file = new File([imageUrl.value], 'imagename.png')
      valoresModel.value.doc_contrato = file */
    })
    return {
      valoresModel,
      valoresRules,
      estados,
      contratos,
      imageUrl,
      previewImage
    }
  },
  methods: {
    onResultados (datos) {
      console.log('onresultados', datos)
    }
  }
}
</script>
