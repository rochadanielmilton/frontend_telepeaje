<template>
  <q-page>
    <Titulo titulo="Cuentas" icono="add_business"></Titulo>
    <CrudTable :filters="filters" :columns="columns" :url="url" :order="'createdAt'">
      <template v-slot:buttons="{ open, }">
        <q-btn icon="add" color="secondary" @click="openModal(open)" label="Nueva Cuenta" />
        <q-btn icon="add" color="secondary" @click="$router.replace('/app/vehiculos')" label="Ver vehiculos"></q-btn>
      </template>
      <template v-slot:form="{ close, update }">
        <q-card style="width: 700px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon name="add_business" size="md" />
            <q-toolbar-title>
              {{ cuenta.id_cuenta ? 'Editar' : 'Agregar' }} cuenta
            </q-toolbar-title>
            <q-space />
            <q-btn flat round icon="close" @click="closeModal(close)" />
          </q-toolbar>
          <q-card-section>
            <Cuenta v-model:valores="cuenta" @guardar="guardar(update, close)" @cancelar="closeModal(close)"></Cuenta>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, cambiarEstado, update }">
        <q-tr>
          <q-td>
            <q-btn v-if="row.tipo === 'empresa'" class="q-pa-xs" flat round icon="visibility"
              :disabled="row.nombre_entidad === null ? '' : disabled"
              @click="detalleCuenta(row.id_cuenta); $router.replace('/app/empa/cuentas/cuentaempresa')" />
            <q-btn v-if="row.tipo === 'personal'" class="q-pa-xs" flat round icon="visibility"
              :disabled="row.nombre_entidad === null ? '' : disabled"
              @click="detalleCuenta(row.id_cuenta, row.tipo); $router.replace('/app/cuentapersona')" />
            <q-btn v-if="row.nombre_entidad === null && row.tipo === 'empresa'" class="q-pa-xs" flat round icon="rule"
              @click="openModalEditarDp(); detalleCuentaDos(row.id_cuenta, update)" />
            <q-btn v-if="row.nombre_entidad === null && row.tipo === 'personal'" class="q-pa-xs" flat round icon="rule"
              @click="openModalCompletarP(); detalleCuentaDos(row.id_cuenta)" />
            <!--q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminar({ url: `${url}/baja/${row.id_cuenta}` })"
            /-->
          </q-td>
          <q-td>
            <q-toggle v-model="row.estado" color="primary" false-value="deshabilitado" true-value="habilitado"
              @click="cambiarEstado({ registro: row, url: `${url}/${row.id_cuenta}/` })" />
          </q-td>
          <q-td>{{ row.id_cuenta }}</q-td>
          <q-td>{{ row.tipo }}</q-td>
          <q-td>{{ row.nombre_entidad }}</q-td>
          <q-td>{{ row.saldo }}</q-td>
          <q-td>{{ row.fecha_inicio }}</q-td>
          <q-td>{{ row.fecha_fin }}</q-td>
          <q-td>{{ row.created }}</q-td>
          <!--q-td>{{ row.id_punto_empadronamiento }}</q-td-->
          <q-td v-if="row.nombre_entidad == null">
            <q-chip square color="danger" text-color="white" label="PENDIENTE" />
          </q-td>
          <q-td v-else>
            <Estado :estado="row.estado" />
          </q-td>

        </q-tr>
      </template>
    </CrudTable>
  </q-page>
  <div class="col-xs-12">
    <q-dialog v-model="editarDpModal" persistent>
      <q-card style="width: 700px; max-width: 90vw;">
        <q-toolbar class="q-pa-md">
          <q-icon name="rule" size="md" />
          <q-toolbar-title>
            Registro empresa
          </q-toolbar-title>
          <q-space />
          <q-btn flat round icon="close" @click="closeModal(close)" />
        </q-toolbar>
        <q-card-section>
          <AgregarEntidad v-model:valores="empresas" @guardar="CompletarRegistro(close, update)"
            @cancelar="closeModal(close)">
          </AgregarEntidad>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
  <div class="col-xs-12">
    <q-dialog v-model="completarDpModal" persistent>
      <q-card style="width: 700px; max-width: 90vw;">
        <q-toolbar class="q-pa-md">
          <q-icon name="rule" size="md" />
          <q-toolbar-title>
            Registro persona
          </q-toolbar-title>
          <q-space />
          <q-btn flat round icon="close" @click="closeModal(close)" />
        </q-toolbar>
        <q-card-section>
          <AgregarEntidadPersona v-model:valores="personas" @guardar="CompletarRegistroPersona(update, close)"
            @cancelar="closeModal(close)">
          </AgregarEntidadPersona>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, inject } from 'vue'
import CrudTable from '@components/common/CrudTable'
import Cuenta from 'components/Formularios/Cuenta'
import Estado from '@components/common/Estado'
import AgregarEntidad from 'components/Formularios/AgregarEntidad'
import AgregarEntidadPersona from 'components/Formularios/AgregarEntidadPersona'
const filters = [
  {
    label: 'Empresa/Persona',
    field: 'nombre_entidad',
    type: 'input'
  },
  {
    label: 'Empresa/Persona',
    field: 'nombre_entidad',
    type: 'input'
  },
  {
    label: 'Empresa/Persona',
    field: 'nombre_entidad',
    type: 'input'
  }
]

const columns = [
  {
    name: 'acciones',
    label: 'Acciones',
    sortable: false
  },
  {
    name: 'activo',
    label: 'Activo',
    sortable: false
  },
  {
    name: 'id_cuenta',
    label: 'Codigo',
    sortable: false
  },
  {
    name: 'tipo',
    label: 'tipo',
    sortable: false
  },
  {
    name: 'nombre_entidad',
    label: 'Empresa/Persona',
    sortable: false
  },
  {
    name: 'Saldo',
    label: 'saldo',
    sortable: false
  },
  {
    name: 'Fecha Incio',
    label: 'fecha_inicio',
    sortable: false
  },
  {
    name: 'Fecha Fin',
    label: 'fecha_fin',
    sortable: false
  },
  {
    name: 'Fecha de registro',
    label: 'created ',
    sortable: false
  },
  {
    name: 'estado',
    label: 'Estado',
    sortable: false
  }
]

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { CrudTable, Cuenta, Estado, AgregarEntidad, AgregarEntidadPersona },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _storage = inject('storage')
    const editarDpModal = ref()
    const completarDpModal = ref()
    const url = ref('/empadronamiento/cuentas')
    const urlRegCuenta = ref('/empadronamiento/registrarCuenta/')
    const urlCompletarR = ref('/empadronamiento/agregarEmpresa')
    const urlCompletarRP = ref('/empadronamiento/agregarPersonaConvenio')
    const _message = inject('message')
    const cuenta = ref({
      tipo: null,
      fecha_inicio: null,
      estado: null,
      baja: null,
      created: null,
      modified: null,
      fecha_fin: null,
      nombre_entidad: null
    })
    const empresas = ref({
      id_entidad_empresa: null,
      razon_social: null,
      nombre: null,
      direccion: null,
      sector: null,
      correo: null,
      telefono: null,
      celular: null,
      created: null,
      modified: null,
      nit: null,
      id_punto_empadronamiento: null,
      id_cuenta: null,
      id_regional: null
    })
    const personas = ref({
      nombre: null,
      ap_paterno: null,
      ap_materno: null,
      ci_persona: null,
      direccion: null,
      celular: null,
      telefono: null,
      ciudad: null,
      correo: null,
      id_cuenta: null,
      id_regional: null
    })
    const resetForm = () => {
      cuenta.value = {
        tipo: null,
        fecha_inicio: null,
        estado: null,
        baja: null,
        created: null,
        modified: null,
        fecha_fin: null,
        nombre_entidad: null
      }
      empresas.value = {
        id_entidad_empresa: null,
        razon_social: null,
        nombre: null,
        direccion: null,
        sector: null,
        correo: null,
        telefono: null,
        celular: null,
        created: null,
        modified: null,
        nit: null,
        id_punto_empadronamiento: null,
        id_cuenta: null,
        id_regional: null
      }
      personas.value = {
        nombre: null,
        ap_paterno: null,
        ap_materno: null,
        ci_persona: null,
        direccion: null,
        celular: null,
        telefono: null,
        ciudad: null,
        correo: null,
        id_cuenta: null,
        id_regional: null
      }
    }
    const CompletarRegistro = async (update, close) => {
      /* empresas.value.baja = 0
      empresas.value.created = '2023-11-14'
      empresas.value.modified = '2023-11-14' */
      await _http.post(`${urlCompletarR.value}`, empresas.value)
      _message.success('Registro realizado de manera correcta.')
      closeModal(close)
      await update()
    }
    const CompletarRegistroPersona = async (update, close) => {
      /* personas.value.baja = 0
      personas.value.created = '2023-11-14'
      personas.value.modified = '2023-11-14' */
      await _http.post(`${urlCompletarRP.value}`, personas.value)
      _message.success('Registro realizado de manera correcta.')
      closeModal(close)
      await update()
    }
    const openModal = async (open, id) => {
      resetForm()
      open()
    }
    const detalleCuenta = async (id) => {
      console.log('cuenta', id)
      _storage.set('id_cuenta', id)
    }
    const detalleCuentaDos = async (id) => {
      console.log('cuenta este es el id', id)
      _storage.set('id_cuentas', id)
    }
    const closeModal = (close) => {
      editarDpModal.value = false
      completarDpModal.value = false
      resetForm()
      close()
    }
    const guardar = async (update, close) => {
      cuenta.value.baja = 0
      _http.post(`${urlRegCuenta.value}`, cuenta.value).then(resp => {
        _storage.set('id_cuenta', resp.AgregarEmpresa)
      })
      _message.success('Registro realizado de manera correcta.')
      await update()
      closeModal(close)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      cuenta,
      filters,
      columns,
      url,
      urlRegCuenta,
      empresas,
      personas,
      closeModal,
      openModal,
      getNombreCompleto,
      CompletarRegistro,
      CompletarRegistroPersona,
      guardar,
      editarDpModal,
      completarDpModal,
      openModalEditarDp: () => { editarDpModal.value = true },
      openModalCompletarP: () => { completarDpModal.value = true },
      detalleCuenta,
      detalleCuentaDos
    }
  }
}
</script>
