<template>
  <q-page>
    <Titulo
      titulo="Menus"
      icono="menu"
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
          label="Nuevo menu"
        />
      </template>
      <template v-slot:form="{ close, update}">
        <q-card style="width: 700px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="list"
              size="md"
            />
            <q-toolbar-title>
              {{ menu.id_menu ? 'Editar' : 'Agregar' }} menu
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
            <Menu
              v-model:valores="menu"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Menu>
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
              @click="openModal(open, row.id_menu)"
            />
            <q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminar({ url: `${url}/baja/${row.id_menu}` })"
            />
          </q-td>
          <!--q-td>
            <q-toggle
              v-model="row.estado"
              color="primary"
              false-value="INACTIVO"
              true-value="ACTIVO"
              @click="cambiarEstado({ registro: row, url: `${url}/${row.id_menu}/` })"
            />
          </q-td-->
          <q-td>{{ row.nombre }}</q-td>
          <q-td>{{ row.ruta }}</q-td>
          <q-td>
            <q-icon
              size="md"
              :name="row.icono"
            />
          </q-td>
          <q-td>{{ row.orden }}</q-td>
          <q-td>{{ row.fid_menu }}</q-td>
          <!--q-td>
            <q-icon
              size="xs"
              :name="row.menuSuperior?.icono"
            /> {{ row.menuSuperior?.nombre }}
          </q-td-->
          <!--q-td>
            <Estado :estado="row.estado" />
          </q-td-->
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>

<script>
import { ref, inject } from 'vue'
import CrudTable from '@components/common/CrudTable'
import Menu from 'components/Formularios/Menu'

const filters = [
  {
    label: 'Nombre',
    field: 'nombre',
    type: 'input'
  },
  {
    label: 'Descripcion',
    field: 'descripcion',
    type: 'input'
  },
  {
    label: 'Estado',
    field: 'estado',
    type: 'select',
    options: [
      {
        label: 'ACTIVO',
        value: 'ACTIVO'
      },
      {
        label: 'INACTIVO',
        value: 'INACTIVO'
      }
    ]
  }
]

const columns = [
  {
    name: 'acciones',
    label: 'Acciones',
    sortable: false
  },

  {
    name: 'nombre',
    label: 'Nombre',
    sortable: true
  },
  {
    name: 'ruta',
    label: 'Ruta',
    sortable: true
  },
  {
    name: 'icono',
    label: 'Icono',
    sortable: false
  },
  {
    name: 'orden',
    label: 'Orden',
    sortable: true
  },
  {
    name: 'menuSuperior',
    label: 'Menu superior',
    sortable: false
  }
]

export default {
  components: { CrudTable, Menu },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')
    const _storage = inject('storage')
    const url = ref('/administracion/menu')
    const menu = ref({
      grupo: null,
      nombre: null,
      descripcion: null,
      codigo: null,
      estado: 'ACTIVO'
    })

    const resetForm = () => {
      menu.value = {
        grupo: null,
        nombre: null,
        descripcion: null,
        codigo: null,
        estado: 'ACTIVO'
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        menu.value = await _http.get(`${url.value}/${id}`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      let mennsaje = 'Menu creado de manera exitosa.'
      if (menu.value.id_menu) {
        mennsaje = 'Menu actualizado de manera exitosa.'
        await _http.put(`${url.value}/${menu.value.id_menu}/`, menu.value)
      } else {
        await _http.post(`${url.value}/`, menu.value)
      }
      _message.success(mennsaje)
      await update()
      updateList()
      closeModal(close)
    }

    const updateList = async (update, close) => {
      const menus = await _http.get('/administracion/menu')
      _storage.set('menus', menus)
    }
    return {
      menu,
      filters,
      columns,
      url,
      closeModal,
      openModal,
      guardar,
      updateList
    }
  }
}
</script>
