<template>
  <q-page>
    <Titulo
      titulo="Grupos"
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
          label="Nuevo grupo"
        />
      </template>
      <template v-slot:form="{ close, update}">
        <q-card style="width: 800px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="group"
              size="md"
            />
            <q-toolbar-title>
              {{ grupo.id ? 'Editar' : 'Agregar' }} grupo
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
            <Grupo
              v-model:valores="grupo"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Grupo>
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
          <q-td>{{ row.name}}</q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>

<script>
import { ref, inject } from 'vue'
import CrudTable from '@components/common/CrudTable'
import Grupo from 'components/Formularios/Grupo'
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
    name: 'name',
    label: 'Nombre Grupo',
    sortable: false
  }
]

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { CrudTable, Grupo, Estado, MapaView },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const url = ref('/administracion/grupos')
    const _message = inject('message')
    const _storage = inject('storage')
    const grupo = ref({
      id: null,
      name: null,
      baja: null
    })
    const resetForm = () => {
      grupo.value = {
        id: null,
        name: null,
        baja: null
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        grupo.value = await _http.get(`${url.value}/${id}`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      if (grupo.value.id) {
        await _http.put(`${url.value}/${grupo.value.id}/`, grupo.value)
        _message.success('Actualizacion realizada de manera correcta.')
      } else {
        grupo.value.baja = 0
        await _http.post(`${url.value}/`, grupo.value)
        _message.success('Registro realizado de manera correcta.')
      }
      await update()
      updateList()
      closeModal(close)
    }
    const updateList = async (update, close) => {
      const grupos = await _http.get('/administracion/grupos')
      _storage.set('grupo', grupos)
    }
    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      grupo,
      filters,
      columns,
      url,
      closeModal,
      openModal,
      getNombreCompleto,
      guardar,
      updateList
    }
  }
}
</script>
