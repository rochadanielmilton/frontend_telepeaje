<template>
  <q-page>
    <Titulo
      titulo="Editar vehiculo"
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
    <editarVehiculo
     v-model:valores="editarVehiculo"
     @guardar="guardar(update, close)"
     @cancelar="closeModal(close)"
    >
    </editarVehiculo>
    </q-card-section>
  </q-page>

</template>

<script>
import { ref, inject } from 'vue'
import CrudTable from '@components/common/CrudTable'
import editarVehiculo from 'components/Formularios/editarVehiculo'
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
  components: { CrudTable, editarVehiculo, Estado },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const url = ref('/empadronamiento/vehiculo')
    const editarVehiculo = ref({
      nombre_categoria: null,
      placa: null,
      marca: null,
      tipo: null,
      clase: null,
      modelo: null,
      color: null,
      cilindrada: null,
      cap_carga: null,
      nro_ejes: null,
      baja: null,
      tag: null,
      id_usuario: null,
      id_cuenta: null,
      id_categoria: null
    })
    const resetForm = () => {
      editarVehiculo.value = {
        nombre_categoria: null,
        placa: null,
        marca: null,
        tipo: null,
        clase: null,
        modelo: null,
        color: null,
        cilindrada: null,
        cap_carga: null,
        nro_ejes: null,
        baja: null,
        tag: null,
        id_usuario: null,
        id_cuenta: null,
        id_categoria: null
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
      console.log('@@@@@@@@@@@@####------2222------>')
      editarVehiculo.value.baja = 0
      editarVehiculo.value.created = '2023-11-14'
      editarVehiculo.value.modified = '2023-11-14'
      editarVehiculo.value.id_usuario = 10
      editarVehiculo.value.imagen_fronal_vehiculo = '/media/hola.jpg'
      editarVehiculo.value.imagen_lateral_vehiculo = '/media/hola2.jpg'
      console.log('@@@@@@@@@@@@-------222222----->')
      console.log('qqqq22dfsf', editarVehiculo.value.id_vehiculo)
      await _http.post(`/empadronamiento/vehiculo/${editarVehiculo.value.id_vehiculo}/`, editarVehiculo.value)

      await update()
      closeModal(close)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      editarVehiculo,
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
