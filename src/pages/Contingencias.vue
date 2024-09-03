<template>
  <q-page>
    <Titulo
      titulo="Lista de Continguencias"
      icono="broadcast_on_personal"
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
          label="Nueva Contingencia"
        />
      </template>
      <template v-slot:form="{ close, update}">
        <q-card style="width: 700px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="broadcast_on_personal"
              size="md"
            />
            <q-toolbar-title>
              {{ contingencias.id ? 'Editar' : 'Agregar' }} contingencias
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
            <Contingencia
              v-model:valores="contingencias"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Contingencia>
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
              @click="openModal(open, row.id)"
            />
            <q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminar({ url: `${url}/baja/${row.id}` })"
            />
          </q-td>
          <q-td>
            <q-toggle
              v-model="row.estado"
              color="primary"
              false-value="deshabilitado"
              true-value="habilitado"
              @click="cambiarEstado({ registro: row, url: `${url}/${row.id}/` })"
            />
          </q-td>
          <q-td>{{ row.nombre_regional }}</q-td>
          <q-td>{{ row.nombre_ruta }}</q-td>
          <q-td>{{ row.fecha_ini }}</q-td>
          <q-td>{{ row.hora_ini }}</q-td>
          <q-td>{{ row.fecha_fin }}</q-td>
          <q-td>{{ row.hora_fin }}</q-td>
          <q-td>{{ row.descripcion }}</q-td>
          <q-td>{{ row.tipo_contingencia }}</q-td>
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
import Contingencia from 'components/Formularios/Contingencia'
import Estado from '@components/common/Estado'

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
    name: 'nombre_regional',
    label: 'Regional',
    sortable: false
  },
  {
    name: 'nombre_ruta',
    label: 'Ruta',
    sortable: false
  },
  {
    name: 'fecha_ini',
    label: 'Fecha Inicio',
    sortable: false
  },
  {
    name: 'hora_ini',
    label: 'Hora Inicio',
    sortable: false
  },
  {
    name: 'fecha_fin',
    label: 'Fecha Fin',
    sortable: false
  },
  {
    name: 'hora_fin',
    label: 'Hora fin',
    sortable: false
  },
  {
    name: 'descripcion',
    label: 'Descripccion',
    sortable: false
  },
  {
    name: 'tipo_contingencia',
    label: 'Tipo contingencia',
    sortable: false
  },
  {
    name: 'estado',
    label: 'Estado',
    sortable: false
  }
]

export default {
  components: { CrudTable, Contingencia, Estado },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')
    const url = ref('/contingencias/contingencia')
    const _storage = inject('storage')
    const contingencias = ref({
      id: null,
      fecha_ini: null,
      fecha_fin: null,
      hora_ini: null,
      hora_fin: null,
      descripcion: null,
      foto1: null,
      foto2: null,
      foto3: null,
      foto4: null,
      punto_contingencia: null,
      id_tipo_contingencia: null,
      resumen_hecho: null,
      estado: null,
      baja: null,
      id_regional: null,
      id_ruta: null,
      nombre_regional: null,
      nombre_ruta: null,
      tipo_contingencia: null
    })
    const resetForm = () => {
      contingencias.value = {
        id: null,
        fecha_ini: null,
        fecha_fin: null,
        hora_ini: null,
        hora_fin: null,
        descripcion: null,
        foto1: null,
        foto2: null,
        foto3: null,
        foto4: null,
        punto_contingencia: null,
        id_tipo_contingencia: null,
        resumen_hecho: null,
        estado: null,
        baja: null,
        id_regional: null,
        id_ruta: null,
        nombre_regional: null,
        nombre_ruta: null,
        tipo_contingencia: null
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        contingencias.value = await _http.get(`${url.value}/${id}`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      const contingenciaF = new FormData()
      if (contingencias.value.id) {
        contingenciaF.append('foto1', contingencias.value.foto1[0])
        contingenciaF.append('foto2', contingencias.value.foto2[1])
        contingenciaF.append('foto3', contingencias.value.foto3[2])
        contingenciaF.append('foto4', contingencias.value.foto4[3])
        contingenciaF.append('fecha_ini', contingencias.value.fecha_ini)
        contingenciaF.append('fecha_fin', contingencias.value.fecha_fin)
        contingenciaF.append('hora_ini', contingencias.value.hora_ini)
        contingenciaF.append('hora_fin', contingencias.value.hora_fin)
        contingenciaF.append('punto_contingencia', contingencias.value.punto_contingencia)
        contingenciaF.append('resumen_hecho', contingencias.value.resumen_hecho)
        contingenciaF.append('descripcion', contingencias.value.descripcion)
        contingenciaF.append('id_tipo_contingencia', contingencias.value.id_tipo_contingencia)
        contingenciaF.append('estado', contingencias.value.estado)
        contingenciaF.append('baja', 0)
        contingenciaF.append('id_regional', contingencias.value.id_regional)
        contingenciaF.append('id_ruta', contingencias.value.id_ruta)
        await _http.put(`${url.value}/${contingencias.value.id}/`, contingenciaF)
        _message.success('Actualizacion realizada de manera correcta.')
      } else {
        let count = 1
        contingencias.value.foto1.forEach(element => {
          contingenciaF.append('foto' + count, element)
          count = count + 1
        })
        contingenciaF.append('fecha_ini', contingencias.value.fecha_ini)
        contingenciaF.append('fecha_fin', contingencias.value.fecha_fin)
        contingenciaF.append('hora_ini', contingencias.value.hora_ini)
        contingenciaF.append('hora_fin', contingencias.value.hora_fin)
        contingenciaF.append('punto_contingencia', contingencias.value.punto_contingencia)
        contingenciaF.append('resumen_hecho', contingencias.value.resumen_hecho)
        contingenciaF.append('descripcion', contingencias.value.descripcion)
        contingenciaF.append('id_tipo_contingencia', contingencias.value.id_tipo_contingencia)
        contingenciaF.append('estado', contingencias.value.estado)
        contingenciaF.append('baja', 0)
        contingenciaF.append('id_regional', contingencias.value.id_regional)
        contingenciaF.append('id_ruta', contingencias.value.id_ruta)
        await _http.post(`${url.value}/`, contingenciaF)
        _message.success('Registro realizado de manera correcta.')
      }
      await update()
      closeModal(close)
      const tipoContingencias = await _http.get('/contingencias/listaTipoContingencia')
      _storage.set('tipoContingencias', tipoContingencias)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      contingencias,
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
