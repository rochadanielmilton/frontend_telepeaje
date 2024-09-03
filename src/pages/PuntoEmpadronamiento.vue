<template>
  <q-page>
    <Titulo
      titulo="Puntos empadronamiento"
      icono="business"
    ></Titulo>
    <CrudTable
      :filters="filters"
      :columns="columns"
      :url="url"
      :order="'createdAt'"
    >
      <template v-slot:buttons="{ open, }">
        <q-btn
          icon="add"
          color="secondary"
          @click="openModal(open)"
          label="Nuevo Punto de empadronamiento"
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
              {{ puntoempadronamiento.id_punto_empadronamiento ? 'Editar' : 'Agregar' }} puntoempadronamiento
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
            <PuntoEmpadrona
              v-model:valores="puntoempadronamiento"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></PuntoEmpadrona>
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
              @click="openModal(open, row.id_punto_empadronamiento)"
            />
            <q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminar({ url: `${url}/baja/${row.id_punto_empadronamiento}` })"
            />
          </q-td>
          <q-td>
            <q-toggle
              v-model="row.estado"
              color="primary"
              false-value="deshabilitado"
              true-value="habilitado"
              @click="cambiarEstado({ registro: row, url: `${url}/${row.id_punto_empadronamiento}/` })"
            />
          </q-td>
          <q-td>{{ row.nombre_regional }}</q-td>
          <q-td>{{ row.direccion }}</q-td>
          <q-td>{{ row.descripcion }}</q-td>
          <q-td>{{ row.created }}</q-td>
          <q-td>{{ row.modified }}</q-td>
          <!--q-td>{{ row.id_punto_empadronamiento }}</q-td-->
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
import CrudTable from '@components/common/CrudTableEmpadronamiento'
import PuntoEmpadrona from 'components/Formularios/PuntoEmpadrona'
import Estado from '@components/common/Estado'

const filters = [
  {
    label: 'Regional',
    field: 'id_regional',
    type: 'input'
  },
  {
    label: 'Sigla',
    field: 'sigla',
    type: 'input'
  },
  {
    label: 'Correo electronico',
    field: 'email',
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
    name: 'id_regional',
    label: 'Regional',
    sortable: false
  },
  {
    name: 'direccion',
    label: 'Direccion',
    sortable: false
  },
  {
    name: 'descripcion',
    label: 'Descripcion',
    sortable: false
  },
  {
    name: 'created',
    label: 'created',
    sortable: false
  },
  {
    name: 'modified',
    label: 'modified',
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
  components: { CrudTable, PuntoEmpadrona, Estado },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const url = ref('/empadronamiento/pempadronamiento')
    const _storage = inject('storage')
    const puntoempadronamiento = ref({
      id_punto_empadronamiento: null,
      id_regional: null,
      direccion: null,
      baja: null,
      descripcion: null,
      created: null,
      modified: null,
      estado: null
    })
    const resetForm = () => {
      puntoempadronamiento.value = {
        id_punto_empadronamiento: null,
        id_regional: null,
        direccion: null,
        baja: null,
        descripcion: null,
        created: null,
        modified: null,
        estado: null
      }
    }
    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        console.log(`/${url.value}/${id}`)
        puntoempadronamiento.value = await _http.get(`/${url.value}/${id}`)
        console.log(puntoempadronamiento.value.descripcion)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }
    const guardar = async (update, close) => {
      puntoempadronamiento.value.created = '2023-04-05'
      puntoempadronamiento.value.modified = '2023-04-05'
      if (puntoempadronamiento.value.id_punto_empadronamiento) {
        await _http.put(`${url.value}/${puntoempadronamiento.value.id_punto_empadronamiento}/`, puntoempadronamiento.value)
      } else {
        puntoempadronamiento.value.baja = 0
        await _http.post(`${url.value}/`, puntoempadronamiento.value)
      }
      await update()
      closeModal(close)
      const pempadronamiento = await _http.get('/empadronamiento/pempadronamiento/')
      _storage.set('pempadronamiento', pempadronamiento)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      puntoempadronamiento,
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
