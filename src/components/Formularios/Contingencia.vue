<template>
  <q-form
    class="row q-col-gutter-md"
    @submit.prevent="$emit('guardar')"
    enctype="multipart/form-data"
  >
  <q-select
      filled
      clearable
      v-model="valoresModel.id_regional"
      :options="regionales"
      option-value="id_regional"
      option-label="nombre_regional"
      label="Regional"
      map-options
      emit-value
      class="col-xs-12 col-md-12"
      :rules="valoresRules.id_regional"
      @update:model-value="val => showregional(val)"
    />
    <q-select
      filled
      clearable
      v-model="valoresModel.id_ruta"
      :options="rutas"
      option-value="id_ruta"
      option-label="nombre"
      label="Rutas"
      map-options
      emit-value
      class="col-xs-12 col-md-12"
      :rules="valoresRules.id_ruta"
    />
  <q-input
    filled
    class="col-xs-12 col-md-6"
    label="Fecha Inicio"
    v-model="valoresModel.fecha_ini"
    :rules="valoresRules.fecha_ini"
  >
       <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="valoresModel.fecha_ini" mask="YYYY-MM-DD">
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
      label="Hora Inicio"
      v-model="valoresModel.hora_ini"
      :rules="valoresRules.hora_ini"
    >
    <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time
                  v-model="valoresModel.hora_ini"
                  with-seconds
                  format24h
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
    </q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Fecha Fin"
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
      <q-input
        filled
        class="col-xs-12 col-md-6"
        label="Hora Fin"
        v-model="valoresModel.hora_fin"
        :rules="valoresRules.hora_fin"
      >
      <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time
                    v-model="valoresModel.hora_fin"
                    with-seconds
                    format24h
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
      </q-input>
    <q-input
        filled
        class="col-xs-12 col-md-6"
        label="Descripción de la Contingencia"
        v-model="valoresModel.descripcion"
        :rules="valoresRules.descripcion"
    ></q-input>
    <q-input
        filled
        class="col-xs-12 col-md-6"
        label="Resumen de hecho"
        v-model="valoresModel.resumen_hecho"
        :rules="valoresRules.resumen_hecho"
    ></q-input>
    <q-select
        filled
        clearable
        v-model="valoresModel.estado"
        :options="estados"
        option-value="nombre"
        option-label="nombre"
        label="Estado"
        map-options
        emit-value
        class="col-xs-12 col-md-12"
        :rules="valoresRules.estado"
      />
      <q-select
        filled
        clearable
        v-model="valoresModel.id_tipo_contingencia"
        :options="tipoContingencia"
        option-value="id"
        option-label="tipo"
        label="Tipo contingencia"
        map-options
        emit-value
        class="col-xs-12 col-md-12"
        :rules="valoresRules.id_tipo_contingencia"
      />
    <q-file
          filled
          class="col-xs-12 col-md-12"
          label="Seleccione una imagen"
          v-model="valoresModel.foto1"
          counter
          :counter-label="counterLabelFn"
          max-files="4"
          multiple
          accept=".jpg"
          @update:model-value="previewImage1"
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
              @click.stop.prevent="valoresModel.foto1 = null"
              class="cursor-pointer"
            />
          </template>
    </q-file>
    <div class="mainPhotoContainer col-xs-12 col-md-6">
      <q-img class="col-xs-12 col-md-6" :src="imageUrl1" alt="" />
    </div>
    <!--q-file
          filled
          class="col-xs-12 col-md-6"
          label="Seleccione una imagen"
          v-model="valoresModel.foto2"
          counter
          :counter-label="counterLabelFn"
          max-files="1"
          multiple
          accept=".jpg"
          @update:model-value="previewImage2"
        >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click.stop.prevent="valoresModel.foto2 = null"
              class="cursor-pointer"
            />
          </template>
    </q-file-->
    <div class="mainPhotoContainer ccol-xs-12 col-md-6">
      <q-img class="col-xs-12 col-md-6" :src="imageUrl2" alt="" />
    </div>
    <!-- q-file
          filled
          class="col-xs-12 col-md-6"
          label="Seleccione una imagen"
          v-model="valoresModel.foto3"
          counter
          :counter-label="counterLabelFn"
          max-files="1"
          multiple
          accept=".jpg"
          @update:model-value="previewImage3"
        >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click.stop.prevent="valoresModel.foto3 = null"
              class="cursor-pointer"
            />
          </template>
    </q-file -->
    <div class="mainPhotoContainer ccol-xs-12 col-md-6">
      <q-img class="col-xs-12 col-md-6" :src="imageUrl3" alt="" />
    </div>
    <!--q-file
          filled
          class="col-xs-12 col-md-6"
          label="Seleccione una imagen"
          v-model="valoresModel.foto4"
          counter
          :counter-label="counterLabelFn"
          max-files="1"
          multiple
          accept=".jpg"
          @update:model-value="previewImage4"
        >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click.stop.prevent="valoresModel.foto4 = null"
              class="cursor-pointer"
            />
          </template>
    </q-file-->
    <div class="mainPhotoContainer ccol-xs-12 col-md-6">
      <q-img class="col-xs-12 col-md-6" :src="imageUrl4" alt="" />
    </div>
    <MapaView :latitud="latitud" :longitud="longitud" v-on:change="(latitud, longitud)=>this.change(latitud, longitud)" ></MapaView>
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

import MapaView from '@components/common/MapaView'
import { useVModel } from '../../composables/useVModel.js'
import validaciones from '../../common/validations'
const valoresRules = {
  id_regional: [
    validaciones.requerido
  ],
  id_ruta: [
    validaciones.requerido
  ],
  fecha_ini: [
    validaciones.requerido
  ],
  hora_ini: [
    validaciones.requerido
  ],
  fecha_fin: [
    validaciones.requerido
  ],
  hora_fin: [
    validaciones.requerido
  ],
  descripcion: [
    validaciones.requerido
  ],
  estado: [
    validaciones.requerido
  ],
  id_tipo_contingencia: [
    validaciones.requerido
  ]
}
import { ref, onMounted, inject } from 'vue'
export default {
  components: { MapaView },
  props: {
    valores: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const _http = inject('http')
    const valoresModel = useVModel(props, 'valores')
    const retenes = ref([])
    const _storage = inject('storage')
    const imageUrl1 = ref('')
    const imageUrl2 = ref('')
    const imageUrl3 = ref('')
    const imageUrl4 = ref('')
    const latitud = valoresModel.value.punto_contingencia ? valoresModel.value.punto_contingencia.split(',')[0] : '-16.277960306212524'
    const longitud = valoresModel.value.punto_contingencia ? valoresModel.value.punto_contingencia.split(',')[1] : '-68.15917968750001'
    /* const latitud = valoresModel.punto_contingencia ? valoresModel.punto_contingencia.split(',')[0] : '-16.277960306212524'
    const longitud = valoresModel.punto_contingencia ? valoresModel.punto_contingencia.split(',')[1] : '-68.15917968750001' */
    // const latitud = '-16.277960306212524'
    // const longitud = '-68.15917968750001'
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
    const tipoReten = [
      {
        nombre: 'telepeaje',
        id: '1'
      },
      {
        nombre: 'siscap',
        id: '2'
      },
      {
        nombre: 'mixto',
        id: '3'
      }
    ]
    const regionales = _storage.get('regionales')
    const rutas = _storage.get('rutas')
    const rutaslist = _storage.get('rutas')
    const tipoContingencia = _storage.get('tipoContingencias')
    const previewImage1 = () => {
      /* const imgen = [imageUrl1.value, imageUrl2.value, imageUrl3.value, imageUrl4.value]
      let count = 1
      valoresModel.value.foto1.forEach(element => {
        imgen[count - 1] = URL.createObjectURL(element)
        count = count + 1
      })
      console.log('conse1', valoresModel.value.foto1)
    */
      if (valoresModel.value) {
        imageUrl1.value = valoresModel.value.foto1[0] ? URL.createObjectURL(valoresModel.value.foto1[0]) : null
        imageUrl2.value = valoresModel.value.foto1[1] ? URL.createObjectURL(valoresModel.value.foto1[1]) : null
        imageUrl3.value = valoresModel.value.foto1[2] ? URL.createObjectURL(valoresModel.value.foto1[2]) : null
        imageUrl4.value = valoresModel.value.foto1[3] ? URL.createObjectURL(valoresModel.value.foto1[3]) : null
      }
    }
    /* const previewImage2 = () => {
      if (valoresModel.value) {
        imageUrl2.value = URL.createObjectURL(valoresModel.value.foto2[0])
      }
    }
    const previewImage3 = () => {
      if (valoresModel.value) {
        imageUrl3.value = URL.createObjectURL(valoresModel.value.foto3[0])
      }
    }
    const previewImage4 = () => {
      if (valoresModel.value) {
        imageUrl4.value = URL.createObjectURL(valoresModel.value.foto4[0])
      }
    } */
    onMounted(async () => {
      const { rows } = await _http.get('/contingencias/contingencia')
      retenes.value = rows
      imageUrl1.value = valoresModel.value.foto1
      imageUrl2.value = valoresModel.value.foto2
      imageUrl3.value = valoresModel.value.foto3
      imageUrl4.value = valoresModel.value.foto4
    })

    return {
      valoresModel,
      valoresRules,
      retenes,
      estados,
      regionales,
      rutaslist,
      rutas,
      tipoReten,
      latitud,
      longitud,
      MapaView,
      imageUrl1,
      imageUrl2,
      imageUrl3,
      imageUrl4,
      tipoContingencia,
      previewImage1
    }
  },
  methods: {
    showregional (id) {
      if (id) {
        this.rutas = this.busqueda(this.rutaslist, id)
      }
    },
    busqueda (objeto, id) {
      const result = []
      objeto.forEach(element => {
        if (element.id_regional === id) {
          result.push(element)
        }
      })
      return result
    },
    change ({ longitud, latitud }) {
      this.valoresModel.punto_contingencia = latitud.toString() + ',' + longitud.toString()
    }
  }
}
</script>
