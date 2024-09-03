<template>
  <q-page>
    <Titulo
      titulo="Usuarios"
      icono="groups"
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
          label="Nuevo usuario"
        />
      </template>
      <template v-slot:form="{ close, update}">
        <q-card style="width: 800px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="groups"
              size="md"
            />
            <q-toolbar-title>
              {{ users.id ? 'Editar' : 'Agregar' }} users
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
            <User
              v-model:valores="users"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></User>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, open}">
        <q-tr>
          <q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              icon="edit"
              @click="openModal(open, row.id)"
            />
            <!--q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminar({ url: `${url}${row.id}/` })"
            /-->
          </q-td>
          <q-td>{{ row.username }}</q-td>
          <q-td>{{ row.first_name }}</q-td>
          <q-td>{{ row.last_name }}</q-td>
          <q-td>{{ row.email }}</q-td>
          <q-td>{{ row.ci }}</q-td>
          <q-td>{{ row.celular }}</q-td>
          <q-td>{{ row.direccion }}</q-td>
          <q-td>{{ row.nombre_regional }}</q-td>
          <q-td>{{ row.nombre_cargo }}</q-td>
          <q-td>
            <EstadoUser :is_active="row.is_active"></EstadoUser>
          </q-td>
          <q-td>{{ row.grupo }}</q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>

<script>
import { ref, inject } from 'vue'
import CrudTable from '@components/common/CrudTable'
import User from 'components/Formularios/User'
import EstadoUser from '@components/common/EstadoUser'

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
    field: 'id_cargo',
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
    name: 'username',
    label: 'Usuario',
    sortable: false
  },
  {
    name: 'first_name',
    label: 'Nombres',
    sortable: false
  },
  {
    name: 'last_name',
    label: 'Apellidos',
    sortable: false
  },
  {
    name: 'email',
    label: 'Correo',
    sortable: false
  },
  {
    name: 'ci',
    label: 'Ci',
    sortable: false
  },
  {
    name: 'celular',
    label: 'Celular',
    sortable: false
  },
  {
    name: 'direccion',
    label: 'Direccion',
    sortable: false
  },
  {
    name: 'nombre_regional',
    label: 'Regional',
    sortable: false
  },
  {
    name: 'nombre_cargo',
    label: 'Cargo',
    sortable: false
  },
  {
    name: 'is_active',
    label: 'es activo',
    sortable: false
  },
  {
    name: 'grupo',
    label: 'Grupo',
    sortable: false
  }
]

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { CrudTable, User, EstadoUser },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const url = ref('/administracion/usuarios/')
    const users = ref({
      id: null,
      username: null,
      first_name: null,
      last_name: null,
      email: null,
      ci: null,
      celular: null,
      direccion: null,
      id_regional: null,
      nombre_regional: null,
      id_cargo: null,
      nombre_cargo: null,
      id_grupo: null,
      grupo: null,
      is_active: null
    })
    const resetForm = () => {
      users.value = {
        id: null,
        username: null,
        first_name: null,
        last_name: null,
        email: null,
        ci: null,
        celular: null,
        direccion: null,
        id_regional: null,
        nombre_regional: null,
        id_cargo: null,
        nombre_cargo: null,
        id_grupo: null,
        grupo: null,
        is_active: null
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        console.log(`/${url.value}/${id}`)
        users.value = await _http.get(`${url.value}${id}`)
        console.log(users.value)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      users.value.baja = 0
      if (users.value.id) {
        await _http.put(`${url.value}${users.value.id}/`, users.value)
      } else {
        users.value.is_staff = true
        console.log(users.value)
        await _http.post(`${url.value}`, users.value)
      }
      await update()
      closeModal(close)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      users,
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
