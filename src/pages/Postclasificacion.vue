<template>
  <q-page>
    <Titulo
      titulo="Validacion de Transacciones"
      icono="group"
    ></Titulo>
    <CrudTable2
      :filters="filters"
      :columns="columns"
      :url="url2"
      :fechad="fechad"
      :regionald="99"
      :order="'hora'"
    >
      <template v-slot:buscar="{listarTransaccion}">
        <div class="col-xs-12">
          <q-card class="q-ma-md">
            <q-toolbar inset class="q-gutter-md q-px-md q-pb-md">
              <div class="col-xs-12 col-md-12">
                <q-form
                class="row col-xs-12 col-md-12 q-col-gutter-md q-col-gutter-y-md"
                method="post"
                @submit="listarTransaccion({ url: `${url2}`, registro: datosTransaccion})"
                >
                  <q-input
                    filled
                    class="col-xs-12 col-md-11 q-col-gutter-md q-col-gutter-y-md"
                    label="Fecha"
                    v-model="datosTransaccion.fecha_ini"
                  >
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-date v-model="datosTransaccion.fecha_ini" mask="YYYY-MM-DD">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                  </q-input>
                  <div class="col-xs-2 col-md-1 " style="top: 10px">
                  <q-btn
                    icon="search"
                    color="secondary"
                    type="Submit"
                    label=""
                    class="col-xs-12 col-md-1"
                  >
                  <q-tooltip>Buscar</q-tooltip>
                  </q-btn>
                  </div>
                </q-form>
              </div>
          <slot name="buttons-end"></slot>
        </q-toolbar>
          </q-card>
        </div>
      </template>
      <template v-slot:buttons="{ }">
        <q-btn
          icon="add"
          color="secondary"
          @click="$router.replace('/app/generardis')"
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
            <DisloqueA
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></DisloqueA>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row }">
        <q-tr>
          <q-td>{{ row.codigo_boleto }}</q-td>
          <q-td>{{ row.id_cuenta}}</q-td>
          <q-td>{{ row.id_regional }}</q-td>
          <q-td>{{ row.id_reten }}</q-td>
          <q-td>{{ row.id_turno }}</q-td>
          <q-td>{{ row.id_categoria }}</q-td>
          <q-td>{{ row.localidad_inicio }}</q-td>
          <q-td>{{ row.localidad_fin }}</q-td>
          <q-td>{{ row.tipo_pago }}</q-td>
          <q-td>{{ row.placa }}</q-td>
          <q-td>{{ row.nombre_recaudador }}</q-td>
          <q-td>{{ row.fecha }}</q-td>
          <q-td>{{ row.hora.split('.')[0] }}</q-td>
          <q-td>{{ row.importe_recaudador }}</q-td>
          <q-td>{{ row.importe_telepeaje }}</q-td>
          <q-td>{{ row.importe_revision }}</q-td>
          <q-td>
            <q-icon v-if="row.estado === 'Correcto'"  color="teal" size="2em" name="task_alt"/>
            <q-icon v-if="row.estado === 'Observado'" color="red" size="2em" name="help_outline" />
          </q-td>
          <!--q-td>
            <Estado :estado="row.estado" />
          </q-td-->
          <q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              icon="ballot"
              color="primary"
              @click="detalleTranccion(row.id);$router.replace('/app/validacion')"
            >
            <q-tooltip>Validacion</q-tooltip>
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </CrudTable2>
  </q-page>
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import CrudTable2 from '@components/common/CrudTable2'
import DisloqueA from 'components/Formularios/DisloqueA'
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
    name: 'codigo_boleto',
    label: 'Codigo',
    sortable: false
  },
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
    name: 'id_turno',
    label: 'Turno',
    sortable: false
  },
  {
    name: 'id_categoria',
    label: 'Categoria',
    sortable: false
  },
  {
    name: 'localidad_inicio',
    label: 'Localidad inicio',
    sortable: false
  },
  {
    name: 'localidad_fin',
    label: 'Localidad fin',
    sortable: false
  },
  {
    name: 'tipo_pago',
    label: 'Tipo Pago',
    sortable: false
  },
  {
    name: 'placa',
    label: 'Placa',
    sortable: false
  },
  {
    name: 'recaudador',
    label: 'Recaudador',
    sortable: false
  },
  {
    name: 'fecha',
    label: 'Fecha',
    sortable: false
  },
  {
    name: 'hora',
    label: 'Hora',
    sortable: false
  },
  {
    name: 'importe_recaudador',
    label: 'Cobro',
    sortable: false
  },
  {
    name: 'importe_telepeaje',
    label: 'Telepeaje',
    sortable: false
  },
  {
    name: 'importe_revision',
    label: 'Revision',
    sortable: false
  },
  {
    name: 'estado',
    label: 'Estado',
    sortable: false
  },
  {
    name: 'accion',
    label: 'Accion',
    sortable: false
  }
]

export default {

  components: { CrudTable2, DisloqueA },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')
    const _storage = inject('storage')
    const url = ref('/administracion/registroDisloque')
    const fechad = ref('2023-12-5')
    const regionald = ref('8')
    const url2 = ref('/post_clasificacion/transaccionesAPI')
    const regionales = _storage.get('regionales')
    /* const datosTransaccion = ref({
      fecha_ini: fechad.value
    }) */
    const datosTransaccion = ref({})
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
      disloqueFormulario.value = {
        fecha_ini: null,
        fecha_fin: null,
        regional_id: null,
        reten_id: null,
        recaudadores_seleccionados: null
      }
    }
    const disloqueFormulario = ref({
      fecha_ini: null,
      fecha_fin: null,
      regional_id: null,
      reten_id: null,
      recaudadores_seleccionados: null
    })

    const openModal = async (open, id) => {
      // const { rows } = await _http.post('/administracion/usuariosLibres', datosDisloq.value)
      // datosDisloq.value.recaudadores = rows
      /* resetForm()
      if (id) {
        reten.value = await _http.get(`${url.value}${id}`)
      } */
      /* disloqueFormulario.value.regional_id = datosDisloq.value.id_regional
      disloqueFormulario.value.reten_id = id
      disloqueFormulario.value.fecha_ini = datosDisloq.value.fecha_ini */
      open()
    }
    const detalleTranccion = async (id) => {
      _storage.set('id_transaccion', id)
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      disloques.value.baja = 0
      if (disloques.value.id) {
        await _http.put(`${url.value}${disloques.value.id}/`, disloqueFormulario.value)
        _message.success('Actualizacion realizada de manera correcta.')
      } else {
        await _http.post(`${url.value}/`, disloqueFormulario.value)
        _message.success('Registro realizado de manera correcta.')
      }
      await update()
      closeModal(close)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }
    const datosDefault = () => {
      const fecha = new Date()
      fechad.value = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate()
      datosTransaccion.value.fecha_ini = fechad
    }
    onMounted(async () => {
      datosDefault()
    })
    return {
      disloques,
      filters,
      columns,
      url,
      url2,
      fechad,
      regionald,
      regionales,
      disloqueFormulario,
      datosTransaccion,
      detalleTranccion,
      closeModal,
      openModal,
      getNombreCompleto,
      datosDefault,
      guardar
    }
  },
  methods: {
    BusquedaRetenes (evt) {

    }
  }
}
</script>
