<template>
  <q-page>
    <Titulo
      titulo="Tags"
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
          label="Nuevo Tag"
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
              {{'Agregar' }} tag
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
            <Tag
              v-model:valores="tag"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Tag>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, cambiarEstado }">
        <q-tr>
          <!--q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              icon="edit"
              @click="openModal(open, row.placa)"
            />
            <q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminar({ url: `${url}/${row.id}` })"
            />
          </q-td-->
          <q-td>
            <q-toggle
              v-model="row.estado"
              color="primary"
              false-value="deshabilitado"
              true-value="habilitado"
              @click="cambiarEstado({ registro: row, url: `${url}/${row.id}/` })"
            />
          </q-td>
          <q-td>{{ row.cod_tag }}</q-td>
          <q-td>{{ row.id_cuenta }}</q-td>
          <q-td>{{ row.nombre_entidad }}</q-td>
          <q-td>{{ row.placa }}</q-td>
          <q-td>{{ row.asignado }}</q-td>
          <q-td>
            <Estado :estado="row.estado" />
          </q-td>
          <q-td>
            <EstadoTag :estado="row.estado" :asignado="row.asignado" />
          </q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>

<script>
import { ref, inject } from 'vue'
import CrudTable from '@components/common/CrudTable'
import Tag from 'components/Formularios/Tag'
import Estado from '@components/common/Estado'
import EstadoTag from '@components/common/EstadoTag'

const filters = [
  {
    label: 'Codigo',
    field: 'id',
    type: 'input'
  },
  {
    label: 'Cuenta',
    field: 'id_cuenta',
    type: 'input'
  },
  {
    label: 'Placa Vehicular',
    field: 'placa',
    type: 'input'
  }
]

const columns = [
  {
    name: 'activo',
    label: 'Activo',
    sortable: false
  },
  {
    name: 'cod_tag',
    label: 'Codigo',
    sortable: false
  },
  {
    name: 'id_cuenta',
    label: 'Cuenta',
    sortable: false
  },
  {
    name: 'nombre_entidad',
    label: 'Empresa/Persona',
    sortable: false
  },
  {
    name: 'Placa Vehiculo',
    label: 'placa',
    sortable: false
  },
  {
    name: 'Placa Asignado',
    label: 'asignado',
    sortable: false
  },
  {
    name: 'estado',
    label: 'Estado',
    sortable: false
  },
  {
    name: 'opciones',
    label: 'Opciones',
    sortable: false
  }
]

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { CrudTable, Tag, Estado, EstadoTag },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')
    const url = ref('/empadronamiento/entidadTags')
    const tag = ref({
      id: null,
      cod_tag: null,
      asignado: null,
      id_cuenta: null,
      nombre_entidad: null,
      placa: null,
      estado: null
    })

    const resetForm = () => {
      tag.value = {
        id: null,
        cod_tag: null,
        asignado: null,
        id_cuenta: null,
        nombre_entidad: null,
        placa: null,
        estado: null
      }
    }

    const openModal = async (open) => {
      // resetForm()
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      tag.value.asignado = 'no'
      tag.value.estado = 'habilitado'
      await _http.post(`${url.value}/`, tag.value)
      _message.success('Registro realizado de manera correcta.')
      await update()
      closeModal(close)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      tag,
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
