<template>
  <q-page>
    <Titulo
      titulo="Empresas"
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
          label="Reporte"
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
          <q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              icon="visibility"
              @click="verDetalleEmpresa(row.id_entidad_empresa);$router.replace('/app/cuentaempresa')"
            />
          </q-td>
          <q-td>{{ row.id_cuenta }}</q-td>
          <q-td>{{ row.razon_social }}</q-td>
          <q-td>{{ row.direccion }}</q-td>
          <q-td>{{ row.sector }}</q-td>
          <q-td>{{ row.nit }}</q-td>
          <q-td>{{ row.tipo_empresa }}</q-td>
          <q-td>{{ row.id_regional }}</q-td>
          <q-td>{{ row.id_punto_empadronamiento }}</q-td>
          <q-td>{{ row.correo }}</q-td>
          <q-td>{{ row.telefono }}</q-td>
          <q-td>{{ row.celular }}</q-td>
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
    name: 'id_entidad_empresa',
    label: 'Opciones',
    sortable: false
  },
  {
    name: 'id_cuenta',
    label: 'Cuentas',
    sortable: false
  },
  {
    name: 'razon_social',
    label: 'Razon social',
    sortable: false
  },
  {
    name: 'direccion',
    label: 'Direccion',
    sortable: false
  },
  {
    name: 'sector',
    label: 'Sector',
    sortable: false
  },
  {
    name: 'nit',
    label: 'Nit',
    sortable: false
  },
  {
    name: 'tipo_empresa',
    label: 'T/E',
    sortable: false
  },
  {
    name: 'id_regional',
    label: 'Regional',
    sortable: false
  },
  {
    name: 'id_punto_empadronamiento',
    label: 'Punto empadronamiento',
    sortable: false
  },
  {
    name: 'correo',
    label: 'Correo',
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
  }
]

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { CrudTable, Reten, Estado, MapaView },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')
    const _storage = inject('storage')
    const url = ref('/empadronamiento/entidadEmpresas/')
    const reten = ref({
      id_entidad_empresa: null,
      razon_social: null,
      nombre: null,
      direccion: null,
      sector: null,
      tipo_empresa: null,
      tiene_antena: null,
      correo: null,
      interno_1: null,
      interno_2: null,
      telefono: null,
      celular: null,
      created: null,
      num_carril: null,
      modified: null,
      nit: null,
      baja: null,
      id_punto_empadronamiento: null,
      id_cuenta: null,
      id_regional: null
    })
    const resetForm = () => {
      reten.value = {
        id_entidad_empresa: null,
        razon_social: null,
        nombre: null,
        direccion: null,
        sector: null,
        tipo_empresa: null,
        tiene_antena: null,
        correo: null,
        interno_1: null,
        interno_2: null,
        telefono: null,
        celular: null,
        created: null,
        num_carril: null,
        modified: null,
        nit: null,
        baja: null,
        id_punto_empadronamiento: null,
        id_cuenta: null,
        id_regional: null
      }
    }
    const verDetalleEmpresa = (id) => {
      console.log('22222333344¿¿¿', id)
      _storage.set('id_empresa', id)
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
      verDetalleEmpresa,
      guardar
    }
  }
}
</script>
