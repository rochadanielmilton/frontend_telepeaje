<template>
  <q-form class="row q-col-gutter-md" @submit="$emit('guardar');">
    <!--q-input filled class="col-xs-12 col-md-6" label="Codigo Cuenta" v-model="valoresModel.id_cuenta"
      :rules="valoresRules.id_cuenta"></q-input-->
    <q-select filled clearable v-model="valoresModel.id_categoria" :options="categorias" option-value="id_categoria"
      option-label="nombre_categoria" label="Categoria" map-options emit-value class="col-xs-12 col-md-6"
      :rules="valoresRules.id_categoria"
 />
    <q-input filled class="col-xs-12 col-md-6" label="Color" v-model="valoresModel.color"
      :rules="valoresRules.color"></q-input>
    <q-input filled class="col-xs-12 col-md-6" label="cilindrada" v-model="valoresModel.cilindrada"  type="number"
      :rules="valoresRules.cilindrada"></q-input>
    <q-input filled class="col-xs-12 col-md-6" label="Placa" v-model="valoresModel.placa"
      :rules="valoresRules.placa"></q-input>
    <q-input filled class="col-xs-12 col-md-6" label="Capaciadad de carga" v-model="valoresModel.cap_carga"
      :rules="valoresRules.cap_carga"></q-input>
    <q-input filled class="col-xs-12 col-md-6" label="Marca" v-model="valoresModel.marca"
      :rules="valoresRules.marca"></q-input>
    <q-input filled class="col-xs-12 col-md-6" label="Nro de ejes" v-model="valoresModel.nro_ejes"  type="number"
      :rules="valoresRules.nro_ejes"></q-input>
    <q-input filled class="col-xs-12 col-md-6" label="Tipo" v-model="valoresModel.tipo"
      :rules="valoresRules.tipo"></q-input>
    <q-input filled class="col-xs-12 col-md-6" label="Clase" v-model="valoresModel.clase"
      :rules="valoresRules.clase"></q-input>
    <q-input filled class="col-xs-12 col-md-6" label="Modelo" v-model="valoresModel.modelo"  type="number"
      :rules="valoresRules.modelo"></q-input>
    <q-file filled class="col-xs-12 col-md-6" label="Seleccione imagen frontal del vehiculo" v-model="valoresModel.imagen_fronal_vehiculo" counter
      :counter-label="counterLabelFn" max-files="1" multiple accept=".jpg,.png,.web" @update:model-value="previewImage1" :rules="valoresRules.imagen_fronal_vehiculo">
      <template v-slot:prepend>
        <q-icon name="cloud_upload" @click.stop.prevent />
      </template>
      <template v-slot:append>
        <q-icon name="close" @click.stop.prevent="valoresModel.imagen_fronal_vehiculo = null" class="cursor-pointer"/>
      </template>
    </q-file>
    <q-file filled class="col-xs-12 col-md-6" label="Seleccione una imagen" v-model="valoresModel.imagen_lateral_vehiculo" counter
      :counter-label="counterLabelFn" max-files="1" multiple accept=".jpg,.png,.web" @update:model-value="previewImage2" :rules="valoresRules.imagen_lateral_vehiculo">
      <template v-slot:prepend>
        <q-icon name="cloud_upload" @click.stop.prevent />
      </template>
      <template v-slot:append>
        <q-icon name="close" @click.stop.prevent="valoresModel.imagen_lateral_vehiculo = null" class="cursor-pointer" />
      </template>
    </q-file>
    <div class="mainPhotoContainer col-xs-12 col-md-6">
      <q-img class="col-xs-12 col-md-6" :src="imageUrl1" alt="" />
    </div>
    <div class="mainPhotoContainer col-xs-12 col-md-6">
      <q-img class="col-xs-12 col-md-6" :src="imageUrl2" alt="" />
    </div>
    <div class="col-xs-12 text-right">
      <q-btn label="Cancelar"  @click="$emit('cancelar')"/>
      <q-btn label="Guardar" type="submit" color="primary" class="q-ml-sm" />
    </div>
  </q-form>
</template>
<script>

import { useVModel } from '../../composables/useVModel.js'
import { ref, onMounted, inject } from 'vue'
import validaciones from '../../common/validations'
const valoresRules = {
  id_categoria: [
    validaciones.requerido
  ],
  color: [
    validaciones.requerido
  ],
  cilindrada: [
    validaciones.requerido
  ],
  placa: [
    validaciones.requerido
  ],
  cap_carga: [
    validaciones.requerido
  ],
  marca: [
    validaciones.requerido
  ],
  nro_ejes: [
    validaciones.requerido
  ],
  tipo: [
    validaciones.requerido
  ],
  modelo: [
    validaciones.requerido
  ],
  imagen_fronal_vehiculo: [
    validaciones.requerido
  ],
  imagen_lateral_vehiculo: [
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
    const cuentas = ref([])
    const _storage = inject('storage')
    const imageUrl1 = ref('')
    const imageUrl2 = ref('')
    const tipoEmpresa = [
      {
        nombre: 'Publica',
        id: '1'
      },
      {
        nombre: 'Privada',
        id: '2'
      }
    ]
    const regionales = _storage.get('regionales')
    const categorias = _storage.get('categorias')
    const pempadronamiento = _storage.get('pempadronamiento')
    const idCuenta = _storage.get('id_cuenta')
    const IMG_URL = _storage.get('imgUrl')
    const previewImage1 = () => {
      if (valoresModel.value) {
        imageUrl1.value = URL.createObjectURL(valoresModel.value.imagen_fronal_vehiculo[0])
      }
    }
    const previewImage2 = () => {
      if (valoresModel.value) {
        imageUrl2.value = URL.createObjectURL(valoresModel.value.imagen_lateral_vehiculo[0])
      }
    }
    onMounted(async () => {
      if (valoresModel.value.imagen_fronal_vehiculo) {
        imageUrl1.value = `${valoresModel.value.imagen_fronal_vehiculo}`
        imageUrl2.value = `${valoresModel.value.imagen_lateral_vehiculo}`

        const file = new File([imageUrl1.value], 'imagen.png')
        const file2 = new File([imageUrl2.value], 'imagen.png')
        valoresModel.value.imagen_fronal_vehiculo = file
        valoresModel.value.imagen_lateral_vehiculo = file2
      } else {
        valoresModel.value.imagen_fronal_vehiculo = ''
        valoresModel.value.imagen_lateral_vehiculo = ''
      }
    })

    return {
      valoresModel,
      valoresRules,
      cuentas,
      tipoEmpresa,
      pempadronamiento,
      regionales,
      categorias,
      idCuenta,
      imageUrl1,
      imageUrl2,
      IMG_URL,
      previewImage1,
      previewImage2
    }
  }
}
</script>
