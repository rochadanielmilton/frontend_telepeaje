<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
    enctype="multipart/form-data"
  >
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Nombre categoria"
      v-model="valoresModel.nombre_categoria"
      type="text"
      :rules="valoresRules.nombre_categoria"
    />
   <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Descripcion"
      v-model="valoresModel.descripcion"
      :rules="valoresRules.descripcion"
    >
    </q-input>
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
      :rules="valoresRules.estado"
    />
    <q-file
          filled
          class="col-xs-12 col-md-6"
          label="Seleccione una imagen"
          v-model="valoresModel.imagen"
          counter
          :counter-label="counterLabelFn"
          max-files="1"
          multiple
          accept=".jpg"
          @update:model-value="previewImage"
          :rules="valoresRules.imagen"
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
              @click.stop.prevent="valoresModel.imagen = null"
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
import { ref, onMounted, inject } from 'vue'
import validaciones from '../../common/validations'
const valoresRules = {
  nombre_categoria: [
    validaciones.requerido
  ],
  descripcion: [
    validaciones.requerido,
    validaciones.letras
  ],
  estado: [
    validaciones.requerido
  ],
  imagen: [
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
    const categorias = ref([])
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
      if (valoresModel.value) {
        imageUrl.value = URL.createObjectURL(valoresModel.value.imagen[0])
      }
    }
    onMounted(async () => {
      const { rows } = await _http.get('/parametros/categorias')
      categorias.value = rows
      if (valoresModel.value.imagen) {
        imageUrl.value = valoresModel.value.imagen
        const file = new File([imageUrl.value], 'imagename.png')
        valoresModel.value.imagen = file
      }
    })
    return {
      valoresModel,
      valoresRules,
      estados,
      categorias,
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
