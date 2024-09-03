<template>
  <q-page>
    <Titulo
      titulo="Listado de transacciones empadronados"
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
          <q-td>{{ row.id_cuenta }}</q-td>
          <q-td>{{ row.nombre_regional }}</q-td>
          <q-td>{{ row.nombre_reten }}</q-td>
          <q-td>{{ row.id_carril }}</q-td>
          <q-td>{{ row.tipo_carril }}</q-td>
          <q-td>{{ row.id_ruta }}</q-td>
          <q-td>{{ row.localidad_inicio }}</q-td>
          <q-td>{{ row.localidad_fin }}</q-td>
          <q-td>{{ row.importe_telepeaje }}</q-td>
          <q-td>{{ row.tipo_pago }}</q-td>
          <q-td>{{ row.fecha }}</q-td>
          <q-td>{{ row.saldo_restante }}</q-td>
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
  {
    name: 'id_cuenta',
    label: 'Cuenta',
    sortable: false
  },
  {
    name: 'nombre_regional',
    label: 'Regional',
    sortable: false
  },
  {
    name: 'nombre_reten',
    label: 'Reten',
    sortable: false
  },
  {
    name: 'id_carril',
    label: 'Carril',
    sortable: false
  },
  {
    name: 'tipo_carril',
    label: 'Tipo carril',
    sortable: false
  },
  {
    name: 'id_ruta',
    label: 'Ruta',
    sortable: false
  },
  {
    name: 'localidad_inicio',
    label: 'Localidad inicio',
    sortable: false
  },
  {
    name: 'localidad_fin',
    label: 'localidad fin',
    sortable: false
  },
  {
    name: 'importe_telepeaje',
    label: 'Importe telepeaje',
    sortable: false
  },
  {
    name: 'tipo_pago',
    label: 'Tipo pago',
    sortable: false
  },
  {
    name: 'fecha',
    label: 'Fecha',
    sortable: false
  },
  {
    name: 'saldo_restante',
    label: 'Saldo restante',
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
    const url = ref('/transacciones/listarTransaccionesTag')
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
        vehiculos.value = await _http.get(`${url.value}/${id}`)
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
