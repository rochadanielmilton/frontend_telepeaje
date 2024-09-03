<template>
  <q-page>
    <Titulo
      titulo="Historial de Contratos"
      icono="business"
    ></Titulo>
        <q-card-section class="text-left">
            <q-btn
              type="submit"
              color="primary"
              class="q-ml-sm"
              @click="$router.replace('/app/cuentaempresa')"
            >
            <q-icon
              center
              name='reply'
            />
            </q-btn>
      </q-card-section>
    <CrudTable
      :filters="filters"
      :columns="columns"
      :url="`${url}/${idEmpresa}`"
      :order="'createdAt'"
    >
      <template v-slot:buttons="{ open }">
        <q-btn
          icon="add"
          color="secondary"
          @click="openModal(open)"
          label="Nuevo Contrato"
        />
      </template>
      <template v-slot:form="{ close, update}">
        <q-card style="width: 700px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="home_work"
              size="md"
            />
            <q-toolbar-title>
             Agregar contrato
            </q-toolbar-title>
            <q-space />
            <q-btn
              flat
              round
              icon="close"
              @click="closeModal(close)"
            />
          </q-toolbar>
          <q-card-section>
            <Contrato
              v-model:valores="contratoRegistro"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Contrato>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row }">
        <q-tr>
          <q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              color="primary"
              icon="download"
            />
            <!--q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminar({ url: `${url}/baja/${row.id_contrato}/` })"
            /-->
          </q-td>
              <q-td>{{ row.doc_contrato }}</q-td>
              <q-td>{{ row.fecha_ini_contrato }}</q-td>
              <q-td>{{ row.fecha_fin_contrato }}</q-td>
          <q-td>
            <EstadoContrato :estado="row.baja_contrato" />
          </q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import CrudTable from '@components/common/CrudTable'
import Contrato from 'components/Formularios/Contrato'
import EstadoContrato from '@components/common/EstadoContrato'

const filters = [
  {
    label: 'Fecha inicio contrato',
    field: 'fecha_ini_contrato',
    type: 'input'
  },
  {
    label: 'Fecha fin contrato',
    field: 'fecha_fin_contrato',
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
    name: 'doc_contrato',
    label: 'Contrato',
    sortable: false
  },
  {
    name: 'fecha_ini_contrato',
    label: 'Fecha inicio contrato',
    sortable: false
  },
  {
    name: 'fecha_fin_contrato',
    label: 'Fecha fin contrato',
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
  components: { CrudTable, Contrato, EstadoContrato },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const url = ref('/empadronamiento/verContratoEmpresa')
    const urlRegistro = ref('/empadronamiento/registrarNuevoContratoEmpresa')
    const _storage = inject('storage')
    const _message = inject('message')
    const contrato = ref({
      id_contrato: null,
      doc_contrato: null,
      fecha_ini_contrato: null,
      fecha_fin_contrato: null,
      baja_contrato: null,
      id_entidad_empresa: null,
      id_entidad_persona: null
    })

    const contratoRegistro = ref({
      id_ultimo_contrato: null,
      doc_contrato: null,
      fecha_ini_contrato: null,
      fecha_fin_contrato: null,
      baja_contrato: null,
      id_entidad_empresa: null
    })
    const resetForm = () => {
      contrato.value = {
        id_contrato: null,
        doc_contrato: null,
        fecha_ini_contrato: null,
        fecha_fin_contrato: null,
        baja_contrato: null,
        id_entidad_empresa: null,
        id_entidad_persona: null
      }
      contratoRegistro.value = {
        id_ultimo_contrato: null,
        doc_contrato: null,
        fecha_ini_contrato: null,
        fecha_fin_contrato: null,
        baja_contrato: null,
        id_entidad_empresa: null
      }
    }
    const idEmpresa = _storage.get('idEmpresa')
    const openModal = async (open, id) => {
      resetForm()
      contratoRegistro.value.id_entidad_empresa = idEmpresa
      const ultimoContrato = await _http.get(`${url.value}/${idEmpresa}`)
      contratoRegistro.value.id_ultimo_contrato = ultimoContrato[0].id_contrato
      /* if (id) {
        contrato.value = await _http.get(`${url.value}/${id}/`)
      } */
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      console.log('sadsad', contratoRegistro.value)
      const contratoForm = new FormData()
      contratoForm.append('id_ultimo_contrato', contratoRegistro.value.id_ultimo_contrato)
      contratoForm.append('fecha_ini_contrato', contratoRegistro.value.fecha_ini_contrato)
      contratoForm.append('fecha_fin_contrato', contratoRegistro.value.fecha_fin_contrato)
      contratoForm.append('baja_contrato', 0)
      contratoForm.append('id_entidad_empresa', contratoRegistro.value.id_entidad_empresa)
      contratoForm.append('doc_contrato', contratoRegistro.value.doc_contrato[0])
      if (contratoRegistro.value.id_contrato) {
        await _http.put(`${urlRegistro.value}/${contrato.value.id_contrato}/`, contrato)
      } else {
        await _http.post(`${urlRegistro.value}`, contratoForm)
        _message.success('Registro realizado de manera correcta.')
      }
      await update()
      closeModal(close)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    onMounted(async () => {

    })
    return {
      contrato,
      contratoRegistro,
      filters,
      columns,
      url,
      urlRegistro,
      idEmpresa,
      closeModal,
      openModal,
      getNombreCompleto,
      guardar
    }
  }
}
</script>
