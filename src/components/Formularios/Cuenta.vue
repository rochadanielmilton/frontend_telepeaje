<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
      <q-select
      filled
      clearable
      v-model="valoresModel.tipo"
      :options="tipoCuentas"
      option-value="nombre"
      option-label="nombre"
      label="Tipo"
      map-options
      emit-value
      class="col-xs-12 col-md-12"
      :rules="valoresRules.tipo"
    />
        <q-input
        filled
        class="col-xs-12 col-md-12"
        label="Saldo"
        v-model="valoresModel.saldo"
        :rules="valoresRules.saldo"
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        hint="Mask: #.##"
      ></q-input>
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
              <q-date v-model="valoresModel.fecha_inicio" mask="YYYY-MM-DD">
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
      class="col-xs-12 col-md-12"
      :rules="valoresRules.estado"
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
import { ref, onMounted } from 'vue'
import validaciones from '../../common/validations'
const valoresRules = {
  tipo: [
    validaciones.requerido
  ],
  estado: [
    validaciones.requerido
  ],
  fecha_inicio: [
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
    }
  },
  setup (props) {
    // const _http = inject('http')
    const valoresModel = useVModel(props, 'valores')
    const cuentas = ref([])
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
    const tipoCuentas = [
      {
        nombre: 'personal',
        id: '1'
      },
      {
        nombre: 'empresa',
        id: '2'
      }
    ]
    onMounted(async () => {
      // const { rows } = await _http.get('/empadronamiento/registrarCuenta/')
      // cuentas.value = rows
    })

    return {
      valoresModel,
      valoresRules,
      estados,
      cuentas,
      tipoCuentas
    }
  }
}
</script>
