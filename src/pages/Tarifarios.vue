<template>
  <q-page>
    <Titulo
      titulo="Tarifarios"
      icono="all_inbox"
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
          label="Nuevo Tarifario"
        />
      </template>
      <template v-slot:form="{ close, update}">
        <q-card style="width: 700px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="all_inbox"
              size="md"
            />
            <q-toolbar-title>
              {{tarifario.id_tarifario ? 'Editar' : 'Agregar' }} tarifario
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
            <Tarifario
              v-model:valores="tarifario"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Tarifario>
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
              @click="openModal(open, row.id_tarifario)"
            />
            <q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminar({ url: `${url}/baja/${row.id_tarifario}` })"
            />
          </q-td>
          <q-td>
            <q-toggle
              v-model="row.estado"
              color="primary"
              false-value="deshabilitado"
              true-value="habilitado"
              @click="cambiarEstado({ registro: row, url: `${url}${row.id_tarifario}/` })"
            />
          </q-td>
          <q-td>{{ row.nombre_categoria }}</q-td>
          <q-td>{{ row.nombre_regional }}</q-td>
          <q-td>{{ row.localidad_origen }}</q-td>
          <q-td>{{ row.localidad_destino }}</q-td>
          <q-td>{{ row.rutas }}</q-td>
          <q-td>{{ row.importe }}</q-td>
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
import Tarifario from 'components/Formularios/Tarifario'
import Estado from '@components/common/Estado'

const filters = [
  {
    label: 'categoria',
    field: 'nombre_categoria',
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
    name: 'id_categoria',
    label: 'Categoria',
    sortable: false
  },
  {
    name: 'id_regional',
    label: 'Regional',
    sortable: false
  },
  {
    name: 'reten_origen',
    label: 'Localidad origen',
    sortable: false
  },
  {
    name: 'localidad_destino',
    label: 'teleLocalidad destino',
    sortable: false
  },
  {
    name: 'rutas',
    label: 'Ruta',
    sortable: false
  },
  {
    name: 'importe',
    label: 'Importe',
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
  components: { CrudTable, Tarifario, Estado },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')
    const url = ref('/parametros/tarifarios')
    const tarifario = ref({
      id_tarifario: null,
      importe: null,
      estado: null,
      baja: null,
      reten_origen: null,
      reten_destino: null,
      localidad_destino: null,
      rutas: null,
      id_categoria: null,
      created: null,
      id_regional: null,
      id_reten: null,
      modified: null
    })

    const resetForm = () => {
      tarifario.value = {
        id_tarifario: null,
        importe: null,
        estado: null,
        baja: null,
        reten_origen: null,
        reten_destino: null,
        localidad_destino: null,
        rutas: null,
        id_categoria: null,
        created: null,
        id_regional: null,
        id_reten: null,
        modified: null
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        tarifario.value = await _http.get(`${url.value}/${id}`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      tarifario.value.baja = 0
      if (tarifario.value.id_tarifario) {
        await _http.put(`${url.value}/${tarifario.value.id_tarifario}/`, tarifario.value)
        _message.success('Actualizacion realizada de manera correcta.')
      } else {
        await _http.post(`${url.value}/`, tarifario.value)
        _message.success('Registro realizado de manera correcta.')
      }
      await update()
      closeModal(close)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      tarifario,
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
