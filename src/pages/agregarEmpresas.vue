<template>
  <q-page>
    <Titulo
      titulo="Registro de nueva empresa"
      icono="business"
    ></Titulo>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <q-card-section>
    <agregarEmpresa
     v-model:valores="empresas"
     @guardar="guardar(update, close)"
     @cancelar="closeModal(close)"
    >
    </agregarEmpresa>
    </q-card-section>
  </q-page>

</template>

<script>
import { ref, inject } from 'vue'
import CrudTable from '@components/common/CrudTable'
import agregarEmpresa from 'components/Formularios/agregarEmpresa'
import Estado from '@components/common/Estado'

const filters = [
  {
    label: 'Empresa/Persona',
    field: 'nombre_entidad',
    type: 'input'
  },
  {
    label: 'Empresa/Persona',
    field: 'nombre_entidad',
    type: 'input'
  },
  {
    label: 'Empresa/Persona',
    field: 'nombre_entidad',
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
    name: 'id_cuenta',
    label: 'Codigo',
    sortable: false
  },
  {
    name: 'tipo',
    label: 'tipo',
    sortable: false
  },
  {
    name: 'nombre_entidad',
    label: 'Empresa/Persona',
    sortable: false
  },
  {
    name: 'Saldo',
    label: 'saldo',
    sortable: false
  },
  {
    name: 'Fecha Incio',
    label: 'fecha_inicio',
    sortable: false
  },
  {
    name: 'Fecha Fin',
    label: 'fecha_fin',
    sortable: false
  },
  {
    name: 'Fecha de registro',
    label: 'created ',
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
  components: { CrudTable, agregarEmpresa, Estado },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const url = ref('/empadronamiento/entidadEmpresas')
    const empresas = ref({
      id_entidad_empresa: null,
      razon_social: null,
      nombre: null,
      direccion: null,
      sector: null,
      correo: null,
      telefono: null,
      celular: null,
      created: null,
      modified: null,
      nit: null,
      id_punto_empadronamiento: null,
      id_cuenta: null,
      id_regional: null
    })
    const resetForm = () => {
      empresas.value = {
        id_entidad_empresa: null,
        razon_social: null,
        nombre: null,
        direccion: null,
        sector: null,
        correo: null,
        telefono: null,
        celular: null,
        created: null,
        modified: null,
        nit: null,
        id_punto_empadronamiento: null,
        id_cuenta: null,
        id_regional: null
      }
    }
    const openModal = async (open, id) => {
      resetForm()
      /* if (id) {
        cuenta.value = await _http.get(`${url.value}/${id}`)
        console.log(cuenta.value.descripcion)
      } */
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }
    const guardar = async (update, close) => {
      if (empresas.value.id_entidad_empresa) {
        // await _http.put(`${url.value}/${cuenta.value.id_cuenta}/`, cuenta.value)
      } else {
        empresas.value.baja = 0
        empresas.value.created = '2023-11-14'
        empresas.value.modified = '2023-11-14'
        console.log('dfsf', empresas.value)
        await _http.post('/empadronamiento/agregarEmpresa', empresas.value)
      }
      await update()
      closeModal(close)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      empresas,
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
