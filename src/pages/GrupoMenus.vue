<template>
  <q-page>
    <Titulo
      titulo="Grupos Menu"
      icono="group"
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
          label="Nuevo grupoMenu"
        />
      </template>
      <template v-slot:form="{ close, update}">
        <q-card style="width: 800px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="home_work"
              size="md"
            />
            <q-toolbar-title>
              {{ grupomenu.id ? 'Editar' : 'Agregar' }} grupomenu
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
            <GrupoMenu
              v-model:valores="grupomenu"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></GrupoMenu>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, open, eliminar }">
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
              @click="eliminar({ url: `${url}/baja/${row.id}` })"
            />
          </q-td>
          <q-td>{{ row.nombre_grupo}}</q-td>
          <q-td>{{ row.nombre_menu}}</q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>

<script>
import { ref, inject } from 'vue'
import CrudTable from '@components/common/CrudTable'
import GrupoMenu from 'components/Formularios/GrupoMenu'
import Estado from '@components/common/Estado'
import MapaView from '@components/common/MapaView'

const filters = [
  {
    label: 'Nombre',
    field: 'nombre',
    type: 'input'
  },
  {
    label: 'Regional',
    field: 'nombre_regional',
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
    name: 'id_group',
    label: 'Nombre Grupo',
    sortable: false
  },
  {
    name: 'id_menu',
    label: 'Nombre menu',
    sortable: false
  }
]

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { CrudTable, GrupoMenu, Estado, MapaView },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const url = ref('/administracion/menuGroup')
    const _message = inject('message')
    const grupomenu = ref({
      id: null,
      id_group: null,
      id_menu: null
    })
    const resetForm = () => {
      grupomenu.value = {
        id: null,
        id_group: null,
        id_menu: null
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        grupomenu.value = await _http.get(`${url.value}/${id}`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      if (grupomenu.value.id) {
        await _http.put(`${url.value}/${grupomenu.value.id}/`, grupomenu.value)
        _message.success('Actualizacion realizada de manera correcta.')
      } else {
        grupomenu.value.baja = 0
        await _http.post(`${url.value}/`, grupomenu.value)
        _message.success('Registro realizado de manera correcta.')
      }
      await update()
      closeModal(close)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      grupomenu,
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
