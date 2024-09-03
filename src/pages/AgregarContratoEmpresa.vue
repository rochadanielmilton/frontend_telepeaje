<template>
  <q-page>
    <Titulo titulo="Agregar Contrato empresa" icono="business"></Titulo>
    <q-form
     @submit="guardar(); $router.replace('/app/cuentaempresa')">
    <q-card>
        <div class="q-pa-md">
          DATOS DE LA EMPRESA
        </div>
            <div class="q-pa-md">
              <div class="row">
                <div class="col-xs-12 col-md-6">
               <q-field outlined label="Nro de cuenta" stack-label>
                  <template v-slot:control>
                    <div class="self-center full-width no-outline" tabindex="0">{{ reten.id_cuenta }}</div>
                  </template>
               </q-field>
               </div>
                  <div class="col-xs-12 col-md-6" >
               <q-field outlined label="Nombre Cuenta" stack-label>
                  <template v-slot:control>
                    <div class="self-center full-width no-outline" tabindex="0">{{ empresanNombre }}</div>
                  </template>
               </q-field>
                  </div>
                  <div class="col-xs-12 col-md-6">
                 <q-field outlined label="Saldo Actual" stack-label>
                    <template v-slot:control>
                      <div class="self-center full-width no-outline" tabindex="0">{{ saldoEmpresa }}</div>
                    </template>
                 </q-field>
                    </div>
            </div>
      </div>
      <div class="q-pa-md">
      <q-input outlined v-model="reten.nombre_depositante" label="Nombre completo del depositante:" />
      </div>
      <div class="q-pa-md">
      <q-input outlined v-model="reten.celular" label="Celular :" />
      </div>
      <div class="q-pa-md">
        <q-input outlined v-model="reten.cuenta_bancaria" label="Cuenta bancaria :" />
      </div>
      <div class="q-pa-md">
      <q-input standout="bg-teal text-white" v-model="reten.monto_depositado" label="Recargar saldo" />
      </div>
        <div class="q-pa-md">
          <q-btn icon="add" label="Cancelar" color="secondary" @click="prompt" style="margin-right: 10px;" />
          <q-btn icon="add" label="Guardar" color="primary" type="submit" />
        </div>
    </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import CrudTable from '@components/common/CrudTable'
import Reten from 'components/Formularios/Reten'
import Estado from '@components/common/Estado'
import { useQuasar } from 'quasar'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { CrudTable, Reten, Estado },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')
    const url = ref('/empadronamiento/formularioRecarga')
    const empresa = ref([])
    const contrato = ref([])
    const empresanNombre = ref('')
    const saldoEmpresa = ref('')
    const _storage = inject('storage')
    const $q = useQuasar()
    const reten = ref({
      id_cuenta: null,
      nombre_depositante: null,
      celular: null,
      monto_depositado: null,
      tipo_recarga: null,
      cuenta_bancaria: null
    })
    const resetForm = () => {
      reten.value = {
        id_cuenta: null,
        nombre_depositante: null,
        celular: null,
        monto_depositado: null,
        tipo_recarga: null,
        cuenta_bancaria: null
      }
    }
    const AgregarVehiculo = (id) => {
      _storage.set('id_cuenta', id)
    }
    const openModal = async (open, id) => {
      _storage.set('id_entidad_empresa', id)
      resetForm()
      if (id) {
        reten.value = await _http.get(`${url.value}/${id}`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async () => {
      reten.value.baja = 0
      await _http.post(`${url.value}`, reten.value)
      _message.success('Recarga de saldo exitosa.')
    }
    const getDataE = async () => {
      // const rows = await _http.get(`${url.value}/`)
      // empresa.value = rows.empresa
      // listContrato.value = rows.lista_contratos
      // contrato.value = rows.contrato
    }
    const idCuenta = _storage.get('id_cuentaE')
    const nombreEmpresa = _storage.get('nombreE')
    const saldoE = _storage.get('saldoCuentas')
    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }
    onMounted(async () => {
      reten.value.id_cuenta = idCuenta
      reten.value.tipo_recarga = 2
      empresanNombre.value = nombreEmpresa
      saldoEmpresa.value = saldoE
      // saldoL = saldoE
      // reten.value.nombre = nombreEmpresa
      // reten.value.saldo = saldoE
      getDataE()
    })
    function prompt () {
      $q.dialog({
        title: 'Agregar nuevo contrato',
        message: 'Agregue fecha Inicio',
        prompt: {
          model: '',
          type: 'date' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        console.log('>>>> OK, received', data)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
    return {
      reten,
      url,
      empresa,
      contrato,
      AgregarVehiculo,
      closeModal,
      openModal,
      getNombreCompleto,
      guardar,
      getDataE,
      saldoEmpresa,
      empresanNombre,
      prompt
    }
  }
}

</script>
