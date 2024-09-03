<template>
  <q-page>
    <Titulo
      titulo="Categorias"
      icono="directions_car"
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
          label="Nueva Categoria"
        />
      </template>
      <template v-slot:form="{ close, update}">
        <q-card style="width: 700px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="directions_car"
              size="md"
            />
            <q-toolbar-title>
              {{categoria.id_categoria ? 'Editar' : 'Agregar' }} categoria
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
            <Categori
              v-model:valores="categoria"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Categori>
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
              @click="openModal(open, row.id_categoria)"
            />
            <q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminar({ url: `${url}/baja/${row.id_categoria}/` })"
            />
          </q-td>
          <q-td>
            <q-toggle
              v-model="row.estado"
              color="primary"
              false-value="deshabilitado"
              true-value="habilitado"
              @click="cambiarEstado({ registro: row, url: `${url}/${row.id_categoria}/` })"
            />
          </q-td>
              <q-td>{{ row.nombre_categoria }}</q-td>
              <q-td>{{ row.descripcion }}</q-td>
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
import Categori from 'components/Formularios/Categori'
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
    name: 'nombre_categoria',
    label: 'Nombre Categoria',
    sortable: false
  },
  {
    name: 'descripcion',
    label: 'Descripcion',
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
  components: { CrudTable, Categori, Estado },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const url = ref('/parametros/categorias')
    const _message = inject('message')
    const _storage = inject('storage')
    const categoria = ref({
      id_cargo: null,
      descripcion: null,
      estado: null,
      nombre_cargo: null,
      imagen: null,
      baja: null
    })

    const resetForm = () => {
      categoria.value = {
        id_cargo: null,
        descripcion: null,
        estado: null,
        nombre_cargo: null,
        imagen: null,
        baja: null
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        categoria.value = await _http.get(`${url.value}/${id}/`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      categoria.value.baja = 0
      const categoriasVehiculos = new FormData()
      categoriasVehiculos.append('nombre_categoria', categoria.value.nombre_categoria)
      categoriasVehiculos.append('descripcion', categoria.value.descripcion)
      categoriasVehiculos.append('estado', categoria.value.estado)
      categoriasVehiculos.append('baja', categoria.value.baja)
      categoriasVehiculos.append('imagen', categoria.value.imagen[0])
      if (categoria.value.id_categoria) {
        await _http.put(`${url.value}/${categoria.value.id_categoria}/`, categoriasVehiculos)
        _message.success('Actualizacion realizada de manera correcta.')
      } else {
        await _http.post(`${url.value}/`, categoriasVehiculos)
        _message.success('Registro realizado de manera correcta.')
      }
      await update()
      closeModal(close)
      const categorialist = await _http.get('/parametros/listaCategorias')
      _storage.set('categorias', categorialist)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      categoria,
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
