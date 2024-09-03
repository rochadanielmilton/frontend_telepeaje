<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar'); $router.replace('/app/cuentaempresa')"
  >
      <q-input
        filled
        class="col-xs-12 col-md-6"
        label="Cuentas"
        v-model="valoresModel.id_cuenta"
        :rules="valoresRules.id_cuenta"
      ></q-input>
        <q-input
          filled
          class="col-xs-12 col-md-6"
          label="Color"
          v-model="valoresModel.color"
          :rules="valoresRules.color"
      ></q-input>
    <q-select
      filled
      clearable
      v-model="valoresModel.id_categoria"
      :options="categorias"
      option-value="id_categoria"
      option-label="nombre_categoria"
      label="Categoria"
      map-options
      emit-value
      class="col-xs-12 col-md-6"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="cilindrada"
      v-model="valoresModel.cilindrada"
      :rules="valoresRules.cilindrada"
    ></q-input>
        <q-input
        filled
        class="col-xs-12 col-md-6"
        label="Placa"
        v-model="valoresModel.placa"
        :rules="valoresRules.placa"
      ></q-input>
        <q-input
          filled
          class="col-xs-12 col-md-6"
          label="Capaciadad de carga"
          v-model="valoresModel.cap_carga"
          :rules="valoresRules.cap_carga"
        ></q-input>
            <q-input
            filled
            class="col-xs-12 col-md-6"
            label="Marca"
            v-model="valoresModel.marca"
            :rules="valoresRules.marca"
          ></q-input>
              <q-input
              filled
              class="col-xs-12 col-md-6"
              label="Nro de ejes"
              v-model="valoresModel.nro_ejes"
              :rules="valoresRules.nro_ejes"
            ></q-input>
            <q-input
              filled
              class="col-xs-12 col-md-6"
              label="Tipo"
              v-model="valoresModel.tipo"
              :rules="valoresRules.tipo"
            ></q-input>
                <q-input
                filled
                class="col-xs-12 col-md-6"
                label="Imgen frontal"
                v-model="valoresModel.imagen_fronal_vehiculo"
                :rules="valoresRules.imagen_fronal_vehiculo"
              ></q-input>
              <q-input
                filled
                class="col-xs-12 col-md-6"
                label="Clase"
                v-model="valoresModel.clase"
                :rules="valoresRules.clase"
              ></q-input>
                <q-input
                  filled
                  class="col-xs-12 col-md-6"
                  label="Imgen Lateral"
                  v-model="valoresModel.imagen_lateral_vehiculo"
                  :rules="valoresRules.imagen_lateral_vehiculo"
                ></q-input>
                    <q-input
                    filled
                    class="col-xs-12 col-md-6"
                    label="Modelo"
                    v-model="valoresModel.modelo"
                    :rules="valoresRules.modelo"
                  ></q-input>
    <div class="col-xs-12 text-right">
      <q-btn
        label="Cancelar"
        @click="$router.replace('/app/cuentaempresa')"
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
    const valoresRules = ref({})
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
    const categorias = _storage.get('categorias')
    const pempadronamiento = _storage.get('pempadronamiento')
    const idCuenta = _storage.get('id_cuenta')
    const vehiculod = _storage.get('vehiculo')
    const idV = _storage.get('id_vehiculo')
    // const idV = _storage.get('id_vehiculo')
    // const idV = _storage.get('id_vehiculo')
    onMounted(async () => {
      console.log('cuenta@@@ greagada id', idCuenta)
      // console.log('cuenta@@@ MARCA', marcaV)
      const { rows } = await _http.get('/empadronamiento/vehiculo/90')
      valoresModel.value.id_cuenta = idCuenta
      valoresModel.value = vehiculod
      // valoresModel.value.id_vehiculo = idV
      console.log('cuenta greagada id', idCuenta)
      console.log('valores', this.valoresModel.value.id_cuenta)
      console.log('valores', this.valoresModel.value.marca)
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
      categorias,
      idCuenta,
      idV
    }
  }
}
</script>
