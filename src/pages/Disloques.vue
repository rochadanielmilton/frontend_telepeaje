<template>
  <q-page>
    <Titulo
      titulo="Lista Disloque por Regional"
      icono="business"
    ></Titulo>
    <CrudTable
      :filters="filters"
      :columns="columns"
      :url="url"
      :order="'createdAt'"
    >
      <template v-slot:buttons="{ }">
        <q-btn
          icon="add"
          color="secondary"
          @click="$router.replace('/app/administra/disloques/generardisloque')"
          label="Generar nuevo disloque"
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
              {{ disloques.id ? 'Editar' : 'Agregar' }} disloques
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
            <Disloque
              v-model:valores="disloques"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Disloque>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, eliminar, aprobarDisloque, bajaDisloque }">
        <q-tr>
          <q-td>
            <!--q-btn
              class="q-pa-xs"
              flat
              round
              icon="edit"
              @click="openModal(open, row.id)"
            /-->
            <q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminar({ url: `${url}/baja/${row.id}` })"
            />
          </q-td>
          <q-td>{{ row.nombre_regional }}</q-td>
          <q-td>{{ row.fecha_inicio }}</q-td>
          <q-td>{{ row.fecha_fin }}</q-td>
          <q-td>{{ row.responsable_disloque }}</q-td>
          <q-td>{{ row.estado }}</q-td>
          <q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              icon="visibility"
              @click="verDetalle(row);$router.replace('/app/administra/disloques/detalleDisloque')"
            >
            <q-tooltip>Ver disloque</q-tooltip>
          </q-btn>
          </q-td>
          <q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              icon="task_alt"
              @click="aprobarDisloque({ url: `${urlAprobar}/${row.id}` })"
              :disabled="row.estado === 'Aprobado'? '' : disabled"
              :color="row.estado === 'Aprobado'? 'positive' : 'warning'"
            >
            <q-tooltip>Aprobar disloque</q-tooltip>
          </q-btn>
          </q-td>
          <q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              icon="cancel_presentation"
              @click="bajaDisloque({ url: `${urlBaja}/${row.id}` })"
              :disabled="row.baja === 1? '' : disabled"
              :color="row.baja === 1? 'negative' : 'primary'"
            >
            <q-tooltip>Baja disloque</q-tooltip>
          </q-btn>
          </q-td>
          <q-td>
            <EstadoBaja :estado = "row.baja">
            </EstadoBaja>
          </q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>

<script>
import { ref, inject } from 'vue'
import CrudTable from '@components/common/CrudTable'
import Disloque from 'components/Formularios/Disloque'
import EstadoBaja from '@components/common/EstadoBaja'

const filters = [
  {
    label: 'categoria',
    field: 'nombre_categoria',
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
    name: 'id_regional',
    label: 'Regional',
    sortable: false
  },
  {
    name: 'fecha_inicio',
    label: 'Fecha Inicio',
    sortable: false
  },
  {
    name: 'fecha_fin',
    label: 'Fecha Fin',
    sortable: false
  },
  {
    name: 'responsable_disloque',
    label: 'Responsable de Disloque',
    sortable: false
  },
  {
    name: 'estado',
    label: 'Estado',
    sortable: false
  },
  {
    name: 'ver',
    label: 'Ver disloque',
    sortable: false
  },
  {
    name: 'ver',
    label: 'Aprobar',
    sortable: false
  },
  {
    name: 'ver',
    label: 'Opciones',
    sortable: false
  },
  {
    name: 'baja',
    label: 'Ver Baja',
    sortable: false
  }
]

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { CrudTable, Disloque, EstadoBaja },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')
    const url = ref('/administracion/disloque')
    const urlAprobar = ref('/administracion/aprobarDisloque')
    const urlBaja = ref('/administracion/bajaDisloque')
    const _storage = inject('storage')
    const disloques = ref({
      id: null,
      fecha_inicio: null,
      fecha_fin: null,
      fecha_creacion: null,
      estado: null,
      responsable_disloque: null,
      baja: null,
      id_regional: null
    })

    const resetForm = () => {
      disloques.value = {
        id: null,
        fecha_inicio: null,
        fecha_fin: null,
        fecha_creacion: null,
        estado: null,
        responsable_disloque: null,
        baja: null,
        id_regional: null
      }
    }
    const verDetalle = (data) => {
      _storage.set('datadisloque', data)
      /* _storage.set('id_regional', data.id_regional)
      _storage.set('fecha_ini', data.fecha_inicio) */
    }
    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        disloques.value = await _http.get(`${url.value}/${id}`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      disloques.value.baja = 0
      console.log('regional data', disloques.value)
      if (disloques.value.id) {
        await _http.put(`${url.value}${disloques.value.id}/`, disloques.value)
        _message.success('Actualizacion realizada de manera correcta.')
      } else {
        await _http.post(`${url.value}`, disloques.value)
        _message.success('Registro realizado de manera correcta.')
      }
      await update()
      closeModal(close)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      disloques,
      filters,
      columns,
      url,
      urlAprobar,
      urlBaja,
      closeModal,
      openModal,
      getNombreCompleto,
      guardar,
      verDetalle
    }
  }
}
</script>
