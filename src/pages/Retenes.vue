<template>
  <q-page>
    <Titulo
      titulo="Retenes"
      icono="signpost"
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
          label="Nueva Reten"
        />
      </template>
      <template v-slot:form="{ close, update}">
        <q-card style="width: 700px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="signpost"
              size="md"
            />
            <q-toolbar-title>
              {{ reten.id_reten ? 'Editar' : 'Agregar' }} reten
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
            <Reten
              v-model:valores="reten"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Reten>
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
              @click="openModal(open, row.id_reten)"
            />
            <q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminar({ url: `${url}/baja/${row.id_reten}` })"
            />
          </q-td>
          <q-td>
            <q-toggle
              v-model="row.estado"
              color="primary"
              false-value="deshabilitado"
              true-value="habilitado"
              @click="cambiarEstado({ registro: row, url: `${url}/${row.id_reten}/` })"
            />
          </q-td>
          <q-td>{{ row.nombre_reten }}</q-td>
          <q-td>{{ row.descripcion }}</q-td>
          <q-td>{{ row.tiene_antena }}</q-td>
          <q-td>{{ row.num_carril }}</q-td>
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
import Reten from 'components/Formularios/Reten'
import Estado from '@components/common/Estado'
import MapaView from '@components/common/MapaView'

const filters = [
  {
    label: 'Nombre',
    field: 'nombre_reten',
    type: 'input'
  },
  {
    label: 'Regional',
    field: 'id_regional',
    type: 'input'
  },
  {
    label: 'Cantidad de carriles',
    field: 'num_carril',
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
    name: 'nombre_reten',
    label: 'Nombre',
    sortable: false
  },
  {
    name: 'descripcion',
    label: 'Descripcion',
    sortable: false
  },
  {
    name: 'tiene_antena',
    label: 'Tiene Antena',
    sortable: false
  },
  {
    name: 'num_carril',
    label: 'Cantidad de carriles',
    sortable: false
  },
  {
    name: 'id_regional',
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
  components: { CrudTable, Reten, Estado, MapaView },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')
    const url = ref('/parametros/retenes')
    const _storage = inject('storage')
    const reten = ref({
      id_reten: null,
      nombre_reten: null,
      descripcion: null,
      estado: null,
      hubicacion: null,
      doc_creacion: null,
      tiene_antena: null,
      doc_resolucion: null,
      latitud: null,
      longitud: null,
      compartido_regional: null,
      convenio_abc: null,
      baja: null,
      nombre_creacion: null,
      num_carril: null,
      regionalcompartida: null,
      id_regional: null,
      nombre_regional: null,
      id_usuario: null,
      id_tipo_reten: null,
      id_ruta: null,
      nombre_ruta: null,
      localidad: null
    })
    const resetForm = () => {
      reten.value = {
        id_reten: null,
        nombre_reten: null,
        descripcion: null,
        estado: null,
        hubicacion: null,
        doc_creacion: null,
        tiene_antena: null,
        doc_resolucion: null,
        latitud: null,
        longitud: null,
        compartido_regional: null,
        convenio_abc: null,
        baja: null,
        nombre_creacion: null,
        num_carril: null,
        regionalcompartida: null,
        id_regional: null,
        nombre_regional: null,
        id_usuario: null,
        id_tipo_reten: null,
        id_ruta: null,
        nombre_ruta: null,
        localidad: null
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        reten.value = await _http.get(`${url.value}/${id}`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      reten.value.baja = 0
      if (reten.value.id_reten) {
        await _http.put(`${url.value}/${reten.value.id_reten}/`, reten.value)
        _message.success('Actualizacion realizada de manera correcta.')
      } else {
        await _http.post(`${url.value}/`, reten.value)
        _message.success('Registro realizado de manera correcta.')
      }
      await update()
      closeModal(close)
      const reteneslist = await _http.get('/parametros/listaRetenes')
      _storage.set('retenes', reteneslist)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      reten,
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
