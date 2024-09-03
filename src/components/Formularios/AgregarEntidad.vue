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
          label="Direccion"
          v-model="valoresModel.direccion"
          maxlength="150"
          :rules="valoresRules.direccion"
      ></q-input>
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
      maxlength="255"
      :rules="valoresRules.id_punto_empadronamiento"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Sector"
      v-model="valoresModel.sector"
      :rules="valoresRules.sector"
    ></q-input>
    <q-select
        filled
        clearable
        v-model="valoresModel.id_regional"
        :options="regionales"
        :rules="valoresRules.id_regional"
        option-value="id_regional"
        option-label="nombre_regional"
        label="Regional"
        map-options
        emit-value
        class="col-xs-12 col-md-6"
      />
        <q-select
          filled
          clearable
          v-model="valoresModel.tipo_empresa"
          :options="tipoEmpresa"
          option-value="nombre"
          option-label="nombre"
          label="Tipo de empresa"
          map-options
          emit-value
          class="col-xs-12 col-md-6"
          :rules="valoresRules.tipo_empresa"
          maxlength="100"
        />
    <q-input
          filled
          class="col-xs-12 col-md-6"
          label="Nombre Empresa"
          v-model="valoresModel.nombre"
          :rules="valoresRules.nombre"
          maxlength="100"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Correo"
      v-model="valoresModel.correo"
      :rules="valoresRules.correo"
      maxlength="50"
    ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Razon social"
      v-model="valoresModel.razon_social"
      :rules="valoresRules.razon_social"
      maxlength="100"
      ></q-input>
        <q-input
              filled
              class="col-xs-12 col-md-6"
              label="Telefono"
              v-model="valoresModel.telefono"
              :rules="valoresRules.telefono"
              maxlength="12"
        ></q-input>
    <q-input
        filled
        class="col-xs-12 col-md-6"
        label="Nit"
        v-model="valoresModel.nit"
        :rules="valoresRules.nit"
        maxlength="100"
        ></q-input>
          <q-input
                filled
                class="col-xs-12 col-md-6"
                label="Celular"
                v-model="valoresModel.celular"
                :rules="valoresRules.celular"
                maxlength="12"
          ></q-input>
      <!--q-input
          filled
          class="col-xs-12 col-md-4"
          label="Fecha Inicio de contrato"
          v-model="valoresModel.descripcion"
          :rules="valoresRules.nombre"
      ></q-input>
            <q-input
            filled
            class="col-xs-12 col-md-4"
            label="Fecha Fin"
            v-model="valoresModel.descripcion"
            :rules="valoresRules.nombre"
        ></q-input>
        <q-file
              filled
              class="col-xs-12 col-md-4"
              label="Documento de contrato"
              v-model="valoresModel.foto3"
              counter
              :counter-label="counterLabelFn"
              max-files="10"
              multiple
        >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
          </q-file-->

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
  direccion: [
    validaciones.requerido
  ],
  id_punto_empadronamiento: [
    validaciones.requerido
  ],
  tipo_empresa: [
    validaciones.requerido
  ],
  nombre: [
    validaciones.requerido
  ],
  correo: [
    validaciones.requerido,
    validaciones.correo
  ],
  nit: [
    validaciones.requerido
  ],
  telefono: [
    validaciones.requerido,
    validaciones.telefono2
  ],
  celular: [
    validaciones.requerido,
    validaciones.telefono
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
