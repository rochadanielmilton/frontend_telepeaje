<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
      <q-input
        filled
        class="col-xs-12 col-md-6"
        label="Cuenta"
        v-model="valoresModel.id_cuenta"
        :rules="valoresRules.id_cuenta"
      ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Nombre"
      v-model="valoresModel.nombre"
      :rules="valoresRules.nombre"
      maxlength="31"
    >
    </q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Apellido Paterno"
      v-model="valoresModel.ap_paterno"
      :rules="valoresRules.ap_paterno"
      maxlength="21"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Apellido Materno"
      v-model="valoresModel.ap_materno"
      :rules="valoresRules.ap_materno"
      maxlength="21"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Ci"
      v-model="valoresModel.ci_persona"
      :rules="valoresRules.ci_persona"
      maxlength="31"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Direccion"
      v-model="valoresModel.direccion"
      :rules="valoresRules.direccion"
      maxlength="100"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Telefono"
      v-model="valoresModel.telefono"
      :rules="valoresRules.telefono"
      maxlength="31"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Celular"
      v-model="valoresModel.celular"
      :rules="valoresRules.celular"
      maxlength="31"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Ciudad"
      v-model="valoresModel.ciudad"
      :rules="valoresRules.ciudad"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Correo"
      v-model="valoresModel.correo"
      :rules="valoresRules.correo"
    ></q-input>
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
        class="col-xs-12 col-md-6"
        :rules="valoresRules.id_regional"
      />
    <q-select
      filled
      clearable
      v-model="valoresModel.id_punto_empadronamiento"
      :options="pempadronamiento"
      option-value="id_punto_empadronamiento"
      option-label="direccion"
      label="Punto de empadronamiento"
      map-options
      emit-value
      class="col-xs-12 col-md-6"
      :rules="valoresRules.id_punto_empadronamiento"
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
  nombre: [
    validaciones.requerido,
    validaciones.numMaxLetrasNompP
  ],
  ap_paterno: [
    validaciones.requerido,
    validaciones.numMaxLetrasApellidosP
  ],
  ap_materno: [
    validaciones.requerido,
    validaciones.numMaxLetrasApellidosP
  ],
  ci_persona: [
    validaciones.requerido,
    validaciones.numCi,
    validaciones.numCiExede
  ],
  direccion: [
    validaciones.requerido
  ],
  telefono: [
    validaciones.requerido,
    validaciones.telefono2
  ],
  celular: [
    validaciones.requerido,
    validaciones.telefono
  ],
  correo: [
    validaciones.requerido,
    validaciones.correo
  ],
  id_punto_empadronamiento: [
    validaciones.requerido
  ],
  id_regional: [
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
    const cuentas = ref([])
    const _storage = inject('storage')
    const estados = [
      {
        nombre: 'inhabilitado',
        id: 'inhabilitado'
      },
      {
        nombre: 'habilitado',
        id: 'habilitado'
      }
    ]
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
    const pempadronamiento = _storage.get('pempadronamiento')
    const idCuenta = _storage.get('id_cuentas')
    onMounted(async () => {
      const { rows } = await _http.get('/empadronamiento/entidadEmpresas/')
      console.log('aaaacuenta greagada id', idCuenta)
      valoresModel.value.id_cuenta = idCuenta
      console.log('@@@@@@@>>>>..', valoresModel.id_cuenta)
      cuentas.value = rows
    })

    return {
      valoresModel,
      valoresRules,
      estados,
      cuentas,
      tipoEmpresa,
      pempadronamiento,
      regionales,
      idCuenta
    }
  }
}
</script>
