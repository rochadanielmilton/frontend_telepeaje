<template>
  <q-page>
    <Titulo
      titulo="Regionales"
      icono="meeting_room"
    ></Titulo>
    <CrudTable
      :filters="filters"
      :columns="columns"
      :url="url"
      :order="'created'"
    >
      <template v-slot:buttons="{ open }">
        <q-btn
          icon="add"
          color="secondary"
          @click="openModal(open)"
          label="Nueva regional"
        />
      </template>
      <template v-slot:form="{ close, update}">
        <q-card style="width: 700px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="meeting_room"
              size="md"
            />
            <q-toolbar-title>
              {{ regional.id ? 'Editar' : 'Agregar' }} regional
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
            <Regional
              v-model:valores="regional"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Regional>
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
              @click="openModal(open, row.id)"
            />
            <q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminar({ url: `${url}/baja/${row.id}`})"
            />
          </q-td>
          <q-td>
            <q-toggle
              v-model="row.estado"
              color="primary"
              false-value="deshabilitado"
              true-value="habilitado"
              @click="cambiarEstado({ registro: row, url: `${url}/${row.id}/` })"
            />
          </q-td>
          <q-td>{{ row.nombre_regional }}</q-td>
          <q-td>{{ row.descripcion }}</q-td>
          <q-td>{{ row.direccion }}</q-td>
          <q-td>{{ row.telefono }}</q-td>
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
import Regional from 'components/Formularios/Regional'
import Estado from '@components/common/Estado'

const filters = [
  {
    label: 'Nombre',
    field: 'nombre_regional',
    type: 'input'
  },
  {
    label: 'Descripcion',
    field: 'descripcion',
    type: 'input'
  },
  {
    label: 'Telefono',
    field: 'telefono',
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
    name: 'nombre_regional',
    label: 'Nombre',
    sortable: false
  },
  {
    name: 'descripcion',
    label: 'Descripcion',
    sortable: false
  },
  {
    name: 'direccion',
    label: 'Direccion',
    sortable: false
  },
  {
    name: 'telefono',
    label: 'Telefono',
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
  components: { CrudTable, Regional, Estado },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')
    const url = ref('/parametros/regionales')
    const _storage = inject('storage')
    const regional = ref({
      id_regional: null,
      nombre_regional: null,
      descripcion: null,
      estado: null,
      telefono: null,
      direccion: null,
      baja: null
    })

    const resetForm = () => {
      regional.value = {
        id_regional: null,
        nombre_regional: null,
        descripcion: null,
        estado: null,
        telefono: null,
        direccion: null,
        baja: null
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        regional.value = await _http.get(`${url.value}/${id}`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      if (regional.value.id) {
        await _http.put(`${url.value}/${regional.value.id}/`, regional.value)
        _message.success('Actualizacion realizada de manera correcta.')
      } else {
        regional.value.baja = 0
        await _http.post(`${url.value}/`, regional.value)
        _message.success('Registro realizado de manera correcta.')
      }
      await update()
      closeModal(close)
      const regionalist = await _http.get('/parametros/listaRegionales')
      _storage.set('regionales', regionalist)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      regional,
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
