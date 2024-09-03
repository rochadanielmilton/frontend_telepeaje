<template>
  <q-page>
    <Titulo
      titulo="Localidades"
      icono="maps_home_work"
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
          label="Nueva localidad"
        />
      </template>
      <template v-slot:form="{ close, update}">
        <q-card style="width: 700px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="maps_home_work"
              size="md"
            />
            <q-toolbar-title>
              {{ localidad.id_localidad ? 'Editar' : 'Agregar' }} localidad
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
            <Localidad
              v-model:valores="localidad"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Localidad>
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
              @click="openModal(open, row.id_localidad)"
            />
            <q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminar({ url: `${url}/baja/${row.id_localidad}` })"
            />
          </q-td>
          <q-td>
            <q-toggle
              v-model="row.estado"
              color="primary"
              false-value="deshabilitado"
              true-value="habilitado"
              @click="cambiarEstado({ registro: row, url: `${url}/${row.id_localidad}/` })"
            />
          </q-td>
          <q-td>{{ row.nombre_localidad }}</q-td>
          <q-td>{{ row.nombre_regional }}</q-td>
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
import Localidad from 'components/Formularios/Localidad'
import Estado from '@components/common/Estado'

const filters = [
  {
    label: 'Nombre',
    field: 'nombre_localidad',
    type: 'input'
  },
  {
    label: 'Regional',
    field: 'id_regional',
    type: 'input'
  },
  {
    label: 'Código',
    field: 'id_localidad',
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
    name: 'nombre_localidad',
    label: 'Nombre',
    sortable: false
  },
  {
    name: 'id_regional',
    label: 'Regional',
    sortable: false
  },
  {
    name: 'created',
    label: 'Creado',
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
  components: { CrudTable, Localidad, Estado },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')
    const url = ref('/parametros/localidades')
    const _storage = inject('storage')
    const localidad = ref({
      id_localidad: null,
      nombre_localidad: null,
      estado: null,
      id_regional: null,
      nombre_regional: null,
      baja: null
    })

    const resetForm = () => {
      localidad.value = {
        id_localidad: null,
        nombre_localidad: null,
        estado: null,
        id_regional: null,
        nombre_regional: null,
        baja: null
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        localidad.value = await _http.get(`${url.value}/${id}`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      localidad.value.baja = 0
      if (localidad.value.id_localidad) {
        await _http.put(`${url.value}/${localidad.value.id_localidad}/`, localidad.value)
        _message.success('Actualizacion realizada de manera correcta.')
      } else {
        await _http.post(`${url.value}/`, localidad.value)
        _message.success('Registro realizado de manera correcta.')
      }
      await update()
      closeModal(close)
      const localidadlist = await _http.get('/parametros/listaLocalidades')
      _storage.set('localidades', localidadlist)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      localidad,
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
