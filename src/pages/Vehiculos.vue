<template>
  <q-page>
    <Titulo
      titulo="Vehiculos"
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
          label="PDF EN PROCESO"
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
      <template v-slot:row="{ row }">
        <q-tr>
          <!--q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              icon="visibility"
              @click="openModal(open, row.id_reten)"
            />
          </q-td-->
          <q-td>{{ row.id_categoria }}</q-td>
          <q-td>{{ row.id_cuenta }}</q-td>
          <q-td>{{ row.placa }}</q-td>
          <q-td>{{ row.marca }}</q-td>
          <q-td>{{ row.clase }}</q-td>
          <q-td>{{ row.modelo }}</q-td>
          <q-td>{{ row.color }}</q-td>
          <q-td>{{ row.cap_carga }}</q-td>
          <q-td>{{ row.nro_ejes }}</q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>

<script>
import { ref, inject } from 'vue'
import CrudTable from '@components/common/CrudTableEmpadronamiento'
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
  // {
  // name: 'acciones',
  // label: 'Acciones',
  // sortable: false
  // },
  {
    name: 'id_categoria',
    label: 'Categoria',
    sortable: false
  },
  {
    name: 'id_cuenta',
    label: 'Cuenta',
    sortable: false
  },
  {
    name: 'placa',
    label: 'Placa',
    sortable: false
  },
  {
    name: 'marca',
    label: 'Marca',
    sortable: false
  },
  {
    name: 'clase',
    label: 'Clase',
    sortable: false
  },
  {
    name: 'modelo',
    label: 'Modelo',
    sortable: false
  },
  {
    name: 'color',
    label: 'Color',
    sortable: false
  },
  {
    name: 'cap_carga',
    label: 'Cap_carga',
    sortable: false
  },
  {
    name: 'nro_ejes',
    label: 'nro_ejes',
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
    const url = ref('/empadronamiento/vehiculo')
    const vehiculos = ref({
      id_vehiculo: null,
      placa: null,
      marca: null,
      tipo: null,
      clase: null,
      modelo: null,
      color: null,
      cilindrada: null,
      cap_carga: null,
      nro_ejes: null,
      imagen_fronal_vehiculo: null,
      imagen_lateral_vehiculo: null,
      created: null,
      modified: null,
      baja: null,
      tag: null,
      id_usuario: null,
      id_cuenta: null,
      id_categoria: null
    })
    const resetForm = () => {
      vehiculos.value = {
        id_vehiculo: null,
        placa: null,
        marca: null,
        tipo: null,
        clase: null,
        modelo: null,
        color: null,
        cilindrada: null,
        cap_carga: null,
        nro_ejes: null,
        imagen_fronal_vehiculo: null,
        imagen_lateral_vehiculo: null,
        created: null,
        modified: null,
        baja: null,
        tag: null,
        id_usuario: null,
        id_cuenta: null,
        id_categoria: null
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        vehiculos.value = await _http.get(`${url.value}/${id}/`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      vehiculos.value.baja = 0
      if (vehiculos.value.id_vehiculo) {
        await _http.put(`${url.value}/${vehiculos.value.id_vehiculo}/`, vehiculos.value)
        _message.success('Actualizacion realizada de manera correcta.')
      } else {
        await _http.post(`${url.value}/`, vehiculos.value)
        _message.success('Registro realizado de manera correcta.')
      }
      await update()
      closeModal(close)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      vehiculos,
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
