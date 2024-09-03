<template>
  <q-page>
    <Titulo
      titulo="Cargos"
      icono="engineering"
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
          label="Nuevo cargo"
        />
      </template>
      <template v-slot:form="{ close, update}">
        <q-card style="width: 700px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="engineering"
              size="md"
            />
            <q-toolbar-title>
              {{ cargo.id ? 'Editar' : 'Agregar' }} cargo
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
            <Cargo
              v-model:valores="cargo"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Cargo>
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
              @click="eliminar({ url: `${url}/baja/${row.id}` })"
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
          <q-td>{{ row.nombre_cargo }}</q-td>
          <q-td>{{ row.descripcion }}</q-td>
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
import Cargo from 'components/Formularios/Cargo'
import Estado from '@components/common/Estado'

const filters = [
  {
    label: 'Nombre',
    field: 'nombre_cargo',
    type: 'input'
  },
  {
    label: 'Descripcion',
    field: 'descripcion',
    type: 'input'
  },
  {
    label: 'Código',
    field: 'id',
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
    name: 'nombre_cargo',
    label: 'Nombre',
    sortable: false
  },
  {
    name: 'descripcion',
    label: 'Descripcion',
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
  components: { CrudTable, Cargo, Estado },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')
    const url = ref('/parametros/cargos')
    const _storage = inject('storage')
    const cargo = ref({
      id_cargo: null,
      descripcion: null,
      estado: null,
      nombre_cargo: null,
      baja: null
    })

    const resetForm = () => {
      cargo.value = {
        id_cargo: null,
        descripcion: null,
        estado: null,
        nombre_cargo: null,
        baja: null
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        cargo.value = await _http.get(`${url.value}/${id}`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      cargo.value.baja = 0
      if (cargo.value.id) {
        await _http.put(`${url.value}/${cargo.value.id}/`, cargo.value)
        _message.success('Actualizacion realizada de manera correcta.')
      } else {
        await _http.post(`${url.value}/`, cargo.value)
        _message.success('Registro realizado de manera correcta.')
      }
      await update()
      closeModal(close)
      const cargolist = await _http.get('/parametros/cargos')
      _storage.set('cargo', cargolist)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      cargo,
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
