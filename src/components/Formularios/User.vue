<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Nombre de acceso"
      v-model="valoresModel.username"
      :rules="valoresRules.username"
      maxlength="151"
    >
    </q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Nombres"
      v-model="valoresModel.first_name"
      :rules="valoresRules.first_name"
      maxlength="151"
      type="text"
    ></q-input>
    <q-input
        filled
        class="col-xs-12 col-md-6"
        label="Apellidos"
        v-model="valoresModel.last_name"
        :rules="valoresRules.last_name"
        maxlength="151"
      ></q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Correo"
      v-model="valoresModel.email"
      :rules="valoresRules.email"
      maxlength="255"
    ></q-input>
    <q-input
        filled
        class="col-xs-12 col-md-6"
        label="Ci"
        v-model="valoresModel.ci"
        :rules="valoresRules.ci"
        maxlength="30"
        type="number"
      ></q-input>
      <q-input
        filled
        class="col-xs-12 col-md-6"
        label="Celular"
        v-model="valoresModel.celular"
        :rules="valoresRules.celular"
        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
        maxlength="8"
        type="number"
      ></q-input>
          <q-input
        filled
        class="col-xs-12 col-md-6"
        label="Direccion"
        v-model="valoresModel.direccion"
        :rules="valoresRules.direccion"
        maxlength="30"
      ></q-input>
      <q-select
        filled
        clearable
        v-model="valoresModel.id_cargo"
        :options="cargo"
        option-value="id_cargo"
        option-label="descripcion"
        label="Cargo"
        map-options
        emit-value
        class="col-xs-12 col-md-6"
      />
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
        v-model="valoresModel.id_grupo"
        :options="grupo"
        option-value="id"
        option-label="name"
        label="Grupo"
        map-options
        emit-value
        class="col-xs-12 col-md-6"
        :rules="valoresRules.id_grupo"
      />
      <q-input
        filled
        v-if="!valoresModel.id"
        label="Contraseña"
        class="col-xs-12 col-md-6"
        v-model="valoresModel.password"
        type="password"
        :rules="valoresRules.password"
        maxlength="129"
      >
    </q-input>
      <q-input
        filled
        v-if="!valoresModel.id"
        class="col-xs-12 col-md-6"
        label="Confirmacion de contraseña"
        v-model="valoresModel.password"
        type="password"
        :rules="valoresRules.password"
      ></q-input>
      <q-toggle
        v-model="valoresModel.is_active"
        color="primary"
        label="habilitado en el sistema"
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
  username: [
    validaciones.requerido,
    validaciones.numMaxLetrasNomAcc
  ],
  first_name: [
    validaciones.requerido,
    validaciones.letras,
    validaciones.numMaxLetrasNomAcc
  ],
  last_name: [
    validaciones.requerido,
    validaciones.letras,
    validaciones.numMaxLetrasNomAcc
  ],
  email: [
    validaciones.requerido,
    validaciones.correo
  ],
  ci: [
    validaciones.requerido,
    validaciones.numeros,
    validaciones.numCi
  ],
  celular: [
    validaciones.requerido,
    validaciones.telefono
  ],
  direccion: [
    validaciones.requerido,
    validaciones.letras
  ],
  password: [
    validaciones.requerido,
    validaciones.contrasena
  ],
  id_grupo: [
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
    const users = ref([])
    const _storage = inject('storage')
    const regionales = _storage.get('regionales')
    const cargo = _storage.get('cargo')
    const grupo = _storage.get('grupo')
    onMounted(async () => {
      const { rows } = await _http.get('/administracion/usuarios')
      users.value = rows
    })

    return {
      valoresModel,
      valoresRules,
      regionales,
      cargo,
      grupo,
      users
    }
  }
}
</script>
