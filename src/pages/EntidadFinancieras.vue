<template>
  <q-page>
    <Titulo
      titulo="Entidades Financieras"
      icono="business"
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
          label="Nueva Entidad Financiera"
        />
      </template>
      <template v-slot:form="{ close, update}">
        <q-card style="width: 700px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="business"
              size="md"
            />
            <q-toolbar-title>
              {{ entidadFinanciera.id_entidad ? 'Editar' : 'Agregar' }} entidadFinanciera
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
            <EntidadFinanciera
              v-model:valores="entidadFinanciera"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></EntidadFinanciera>
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
              @click="openModal(open, row.id_entidad)"
            />
            <q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminar({ url: `${url}/baja/${row.id_entidad}` })"
            />
          </q-td>
          <q-td>
            <q-toggle
              v-model="row.estado"
              color="primary"
              false-value="deshabilitado"
              true-value="habilitado"
              @click="cambiarEstado({ registro: row, url: `${url}/${row.id_entidad}/` })"
            />
          </q-td>
          <q-td>{{ row.nombre_regional }}</q-td>
          <q-td>{{ row.nombre_entidad }}</q-td>
          <q-td>{{ row.acronimo_entidad }}</q-td>
          <q-td>{{ row.rubro }}</q-td>
          <q-td>{{ row.direccion }}</q-td>
          <q-td>{{ row.telefono }}</q-td>
          <q-td>{{ row.celular }}</q-td>
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
import EntidadFinanciera from 'components/Formularios/EntidadFinanciera'
import Estado from '@components/common/Estado'

const filters = [
  {
    label: 'Nombre',
    field: 'nombre_regional',
    type: 'input'
  },
  {
    label: 'Nombre Entidad',
    field: 'nombre_entidad',
    type: 'input'
  },
  {
    label: 'Acronimo Entidad',
    field: 'acronimo_entidad',
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
    label: 'Regional',
    sortable: false
  },
  {
    name: 'nombre_entidad',
    label: 'Entidad',
    sortable: false
  },
  {
    name: 'acronimo_entidad',
    label: 'Acronimo Entidad',
    sortable: false
  },
  {
    name: 'rubro',
    label: 'Rubro',
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
    name: 'celular',
    label: 'Celular',
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
  components: { CrudTable, EntidadFinanciera, Estado },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')
    const url = ref('/parametros/entidadFinanciera')
    const entidadFinanciera = ref({
      id_entidad: null,
      nombre_entidad: null,
      acronimo_entidad: null,
      direccion: null,
      telefono: null,
      celular: null,
      rubro: null,
      baja: null,
      estado: null,
      id_regional: null,
      nombre_regional: null
    })

    const resetForm = () => {
      entidadFinanciera.value = {
        id_entidad: null,
        nombre_entidad: null,
        acronimo_entidad: null,
        direccion: null,
        telefono: null,
        celular: null,
        rubro: null,
        baja: null,
        estado: null,
        id_regional: null,
        nombre_regional: null
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        entidadFinanciera.value = await _http.get(`${url.value}/${id}`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      if (entidadFinanciera.value.id_entidad) {
        await _http.put(`${url.value}/${entidadFinanciera.value.id_entidad}/`, entidadFinanciera.value)
        _message.success('Actualizacion realizada de manera correcta.')
      } else {
        entidadFinanciera.value.baja = 0
        await _http.post(`${url.value}/`, entidadFinanciera.value)
        _message.success('Registro realizado de manera correcta.')
      }
      await update()
      closeModal(close)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      entidadFinanciera,
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
