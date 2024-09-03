<template>
  <q-page>
    <Titulo
      titulo="Datos Contrato"
      icono="business"
    ></Titulo>
    <CrudTable
      :filters="filters"
      :columns="columns"
      :url="url"
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
              {{ contrato.id_contrato ? 'Editar' : 'Agregar' }} contrato
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
              v-model:valores="contrato"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Contrato>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, open, eliminar, cambiarEstado }">
        <q-tr>
          <q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              icon="edit"
              @click="openModal(open, row.id_contrato)"
            />
            <q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminar({ url: `${url}/baja/${row.id_contrato}` })"
            />
          </q-td>
          <q-td>
            <q-toggle
              v-model="row.baja_contrato"
              color="primary"
              false-value="deshabilitado"
              true-value="habilitado"
              @click="cambiarEstado({ registro: row, url: `${url}/${row.id_entidad_empresa}` })"
            />
          </q-td>
          <q-td>{{ row.id_entidad_empresa }}</q-td>
          <q-td>{{ row.doc_contrato.substring(45,row.doc_contrato.lenght) }}</q-td>
          <q-td>{{ row.fecha_ini_contrato }}</q-td>
          <q-td>{{ row.fecha_fin_contrato }}</q-td>
          <q-td>{{ row.created.slice(0, 10) }}</q-td>
          <q-td>
            <Estado :estado="row.estado" />
          </q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>

<script>
import { ref, inject } from 'vue'
import CrudTable from '@components/common/CrudTable'
import Contrato from 'components/Formularios/Contrato'
import Estado from '@components/common/Estado'

const filters = [
  {
    label: 'Empresa',
    field: 'id_entidad_empresa',
    type: 'input'
  },
  {
    label: 'Fecha inicio',
    field: 'fecha_ini_contrato',
    type: 'input'
  },
  {
    label: 'Fecha fin',
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
    name: 'activo',
    label: 'Activo',
    sortable: false
  },
  {
    name: 'id_entidad_empresa',
    label: 'Empresa',
    sortable: false
  },
  {
    name: 'doc_contrato',
    label: 'Documento Contrato',
    sortable: false
  },
  {
    name: 'fecha_ini_contrato',
    label: 'Fecha Inicio',
    sortable: false
  },
  {
    name: 'fecha_fin_contrato',
    label: 'Fecha Fin',
    sortable: false
  },
  {
    name: 'created',
    label: 'Creado',
    sortable: false
  },
  {
    name: 'baja_contrato',
    label: 'Estado',
    sortable: false
  }
]

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { CrudTable, Contrato, Estado },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const url = ref('/empadronamiento/entidadContrato')
    const contrato = ref({
      id_contrato: null,
      doc_contrato: null,
      fecha_ini_contrato: null,
      fecha_fin_contrato: null,
      baja_contrato: null,
      created: null,
      id_entidad_empresa: null,
      id_entidad_persona: null,
      id_seguimiento: null
    })

    const resetForm = () => {
      contrato.value = {
        id_contrato: null,
        doc_contrato: null,
        fecha_ini_contrato: null,
        fecha_fin_contrato: null,
        baja_contrato: null,
        created: null,
        id_entidad_empresa: null,
        id_entidad_persona: null,
        id_seguimiento: null
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        contrato.value = await _http.get(`${url.value}/${id}`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      if (contrato.value.id) {
        await _http.put(`/${url.value}/${contrato.value.id}`, contrato.value)
      } else {
        await _http.post(`/${url.value}`, contrato.value)
      }
      await update()
      closeModal(close)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      contrato,
      filters,
      columns,
      url,
      closeModal,
      openModal,
      getNombreCompleto,
      guardar
    }
  }
}
</script>
