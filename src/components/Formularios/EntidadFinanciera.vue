<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
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
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Nombre Entidad"
      v-model="valoresModel.nombre_entidad"
      :rules="valoresRules.nombre_entidad"
      maxlength="100"
    >
    </q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Acronimo Entidad"
      v-model="valoresModel.acronimo_entidad"
      :rules="valoresRules.acronimo_entidad"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Direccion"
      v-model="valoresModel.direccion"
      :rules="valoresRules.direccion"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Telefono"
      v-model="valoresModel.telefono"
      :rules="valoresRules.telefono"
      type="number"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Celular"
      v-model="valoresModel.celular"
      :rules="valoresRules.celular"
      type="number"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Rubro"
      v-model="valoresModel.rubro"
      :rules="valoresRules.rubro"
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
      :rules="valoresRules.estado"
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
import validaciones from '../../common/validations'
const valoresRules = {
  id_regional: [
    validaciones.requerido
  ],
  nombre_entidad: [
    validaciones.requerido,
    validaciones.maximoCaracteresEf
  ],
  celular: [
    validaciones.requerido,
    validaciones.telefono
  ],
  acronimo_entidad: [
    validaciones.requerido
  ],
  estado: [
    validaciones.requerido
  ],
  rubro: [
    validaciones.letras
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
    const entidadFinancieras = ref([])
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
    const regionales = _storage.get('regionales')
    onMounted(async () => {
      const { rows } = await _http.get('/parametros/entidadFinanciera')
      entidadFinancieras.value = rows
    })

    return {
      valoresModel,
      valoresRules,
      estados,
      regionales,
      entidadFinancieras
    }
  }
}
</script>
