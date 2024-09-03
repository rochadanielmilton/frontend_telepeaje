<template>
  <q-page>
    <Titulo
      titulo="Permisos"
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
          label="Nuevo permiso"
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
              {{ permisos.id ? 'Editar' : 'Agregar' }} permisos
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
            <Permiso
              v-model:valores="permisos"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Permiso>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, open, eliminarPermiso }">
        <q-tr>
          <q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              icon="edit"
              @click="openModal(open, row.id)"
            />
            <q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminarPermiso({ url: `${url}/${row.id}` })"
            />
          </q-td>
          <q-td>{{ row.name }}</q-td>
          <q-td>{{ row.nombre_content_type }}</q-td>
          <q-td>{{ row.codename }}</q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>

<script>
import { ref, inject } from 'vue'
import CrudTable from '@components/common/CrudTable'
import Permiso from 'components/Formularios/Permiso'
import Estado from '@components/common/Estado'
import MapaView from '@components/common/MapaView'

const filters = [
  {
    label: 'Nombre',
    field: 'nombre_reten',
    type: 'input'
  },
  {
    label: 'Regional',
    field: 'id_regional',
    type: 'input'
  },
  {
    label: 'Cantidad de carriles',
    field: 'num_carril',
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
    name: 'name',
    label: 'Nombre',
    sortable: false
  },
  {
    name: 'content_type',
    label: 'Tipo de contenido',
    sortable: false
  },
  {
    name: 'codename',
    label: 'Nombre en codigo',
    sortable: false
  }
]

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { CrudTable, Permiso, Estado, MapaView },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')
    const url = ref('/administracion/permisos')
    const permisos = ref({
      id: null,
      name: null,
      codename: null,
      content_type: null

    })
    const resetForm = () => {
      permisos.value = {
        id: null,
        name: null,
        codename: null,
        content_type: null
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        permisos.value = await _http.get(`${url.value}/${id}`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      permisos.value.baja = 0
      if (permisos.value.id) {
        await _http.put(`${url.value}/${permisos.value.id}/`, permisos.value)
        _message.success('Actualizacion realizada de manera correcta.')
      } else {
        await _http.post(`${url.value}/`, permisos.value)
        _message.success('Registro realizado de manera correcta.')
      }
      await update()
      closeModal(close)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      permisos,
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
