<template>
  <q-page>
    <Titulo
      titulo="Rutas"
      icono="place"
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
          label="Nueva Ruta"
        />
      </template>
      <template v-slot:form="{ close, update}">
        <q-card style="width: 700px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="place"
              size="md"
            />
            <q-toolbar-title>
              {{ ruta.id_ruta ? 'Editar' : 'Agregar' }} ruta
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
            <Ruta
              v-model:valores="ruta"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Ruta>
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
              @click="openModal(open, row.id_ruta)"
            />
            <q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminar({ url: `${url}/baja/${row.id_ruta}` })"
            />
          </q-td>
          <q-td>
            <q-toggle
              v-model="row.estado"
              color="primary"
              false-value="deshabilitado"
              true-value="habilitado"
              @click="cambiarEstado({ registro: row, url: `${url}/${row.id_ruta}/` })"
            />
          </q-td>
          <q-td>{{ row.nombre}}</q-td>
          <q-td>{{ row.nombre_regional }}</q-td>
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
import Ruta from 'components/Formularios/Ruta'
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
  },
  {
    label: 'Estado',
    field: 'estado',
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
    label: 'Habilitado',
    sortable: false
  },
  {
    name: 'nombre',
    label: 'Nombre',
    sortable: false
  },
  {
    name: 'nombre_regional',
    label: 'Regional',
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
  components: { CrudTable, Ruta, Estado, MapaView },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')
    const url = ref('/parametros/rutas')
    const _storage = inject('storage')
    const ruta = ref({
      id_ruta: null,
      nombre_regional: null,
      nombre: null,
      estado: null,
      baja: null,
      punto_inicio: null,
      punto_fin: null,
      id_regional: null,
      id_usuario: null
    })
    const resetForm = () => {
      ruta.value = {
        id_ruta: null,
        nombre_regional: null,
        nombre: null,
        estado: null,
        baja: null,
        punto_inicio: null,
        punto_fin: null,
        id_regional: null,
        id_usuario: null
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        ruta.value = await _http.get(`${url.value}/${id}`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      ruta.value.baja = 0
      if (ruta.value.id_ruta) {
        await _http.put(`${url.value}/${ruta.value.id_ruta}/`, ruta.value)
        _message.success('Actualizacion realizada de manera correcta.')
      } else {
        await _http.post(`${url.value}/`, ruta.value)
        _message.success('Registro realizado de manera correcta.')
      }
      await update()
      closeModal(close)
      const rutalist = await _http.get('/parametros/listaRutas')
      _storage.set('rutas', rutalist)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      ruta,
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
