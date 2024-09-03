<template>
  <q-page>
    <Titulo
      titulo="Generar Disloque por Regional"
      icono="group"
    ></Titulo>
    <!-- div class="row">
        <div class="col-xs-12">
          <q-card class="q-ma-md">
            <q-toolbar inset class="q-gutter-md q-px-md q-pb-md">
              <div class="col-xs-12 col-md-12">
                <q-form
                class="row col-xs-12 col-md-12"
                method="post"
                @submit.prevent="BusquedaRetenes()"
                >
                  <q-select
                  v-model="datosDisloq.id_regional"
                  :options="regionales"
                  option-value="id_regional"
                  option-label="nombre_regional"
                  class="col-xs-12 col-md-5"
                  label="Regional"
                  map-options
                  />
                  <q-input
                    filled
                    class="col-xs-12 col-md-5"
                    label="Fecha"
                    v-model="datosDisloq.fecha_ini"
                  >
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-date v-model="datosDisloq.fecha_ini" mask="YYYY-MM-DD">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                  </q-input>
                  <q-btn
                    icon="search"
                    color="secondary"
                    type="Submit"
                    label="Buscar"
                    class="col-xs-12 col-md-2"
                    @click="$emit('getData')"
                  >
                  </q-btn>
                </q-form>
              </div>
          <slot name="buttons-end"></slot>
        </q-toolbar>
          </q-card>
        </div>
      </div-->
    <CrudTable2
      :filters="filters"
      :columns="columns"
      :url="url2"
      :fechad="fechad"
      :regionald="regionald"
      :order="'createdAt'"
    >
      <template v-slot:buscar="{listarRetenes}">
        <div class="col-xs-12">
          <q-card class="q-ma-md">
            <q-toolbar inset class="q-gutter-md q-px-md q-pb-md">
              <div class="col-xs-12 col-md-12">
                <q-form
                class="row col-xs-12 col-md-12"
                method="post"
                @submit="listarRetenes({ url: `${url2}`, registro: datosDisloq})"
                >
                  <q-select
                  v-model="datosDisloq.id_regional"
                  :options="regionales"
                  option-value="id_regional"
                  option-label="nombre_regional"
                  class="col-xs-12 col-md-5"
                  label="Regional"
                  map-options
                  emit-value
                  />
                  <q-input
                    filled
                    class="col-xs-12 col-md-5"
                    label="Fecha"
                    v-model="datosDisloq.fecha_ini"
                  >
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-date v-model="datosDisloq.fecha_ini" mask="YYYY-MM-DD">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                  </q-input>
                  <q-btn
                    icon="search"
                    color="secondary"
                    type="Submit"
                    label="Buscar"
                    class="col-xs-12 col-md-2"
                  >
                <!-- q-tooltip>{{ enableSearch ? 'Cerrar filtros' : 'Abrir filtros' }}</q-tooltip-->
                  </q-btn>
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
              v-model:valores="disloqueFormulario"
              :fechaI="datosDisloq.fecha_ini"
              :regional="datosDisloq.id_regional"
              :datos="datosDisloq"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></DisloqueA>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, open }">
        <q-tr>
          <q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              icon="add_home"
              @click="openModal(open, row.id_reten)"
            />
          </q-td>
          <q-td>{{ row.nombre_reten }}</q-td>
          <q-td>{{ row.descripcion }}</q-td>
          <q-td>{{ row.num_carril}}</q-td>
          <q-td>{{ row.tiene_antena }}</q-td>
          <q-td>
            <Estado :estado="row.estado" />
          </q-td>
        </q-tr>
      </template>
    </CrudTable2>
  </q-page>
</template>

<script>
import { ref, inject } from 'vue'
import CrudTable2 from '@components/common/CrudTable2'
import DisloqueA from 'components/Formularios/DisloqueA'
import Estado from '@components/common/Estado'
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
    name: 'nombre_reten',
    label: 'Nombre de Reten',
    sortable: false
  },
  {
    name: 'descripcion',
    label: 'Descripcion',
    sortable: false
  },
  {
    name: 'num_carril',
    label: 'Numero de carriles',
    sortable: false
  },
  {
    name: 'tiene_antena',
    label: 'Tiene Antena',
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
  components: { CrudTable2, DisloqueA, Estado },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')
    const _storage = inject('storage')
    const url = ref('/administracion/registroDisloque')
    const fechad = ref('2023-10-16')
    const regionald = ref('8')
    const url2 = ref('/administracion/retenesNoDisloqueAPI')
    const regionales = _storage.get('regionales')
    const datosDisloq = ref({
      fecha_ini: fechad.value,
      id_regional: regionald.value
    })
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
      console.log('id', id)
      disloqueFormulario.value.regional_id = datosDisloq.value.id_regional
      disloqueFormulario.value.reten_id = id
      disloqueFormulario.value.fecha_ini = datosDisloq.value.fecha_ini
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
        await _http.put(`${url.value}${disloques.value.id}/`, disloqueFormulario.value)
        _message.success('Actualizacion realizada de manera correcta.')
      } else {
        console.log('registrando disloque', disloqueFormulario.value)
        await _http.post(`${url.value}/`, disloqueFormulario.value)
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
      url2,
      fechad,
      regionald,
      datosDisloq,
      regionales,
      disloqueFormulario,
      closeModal,
      openModal,
      getNombreCompleto,
      guardar
    }
  },
  methods: {
    BusquedaRetenes (evt) {
      console.log('busqueedasss', this.datosDisloq.fecha_ini, this.datosDisloq.id_regional)

      /* axios.get(`http://127.0.0.1:8000/administracion/retenesNoDisloqueAPI/${this.datosDisloq.id_regional}/${this.datosDisloq.fecha_inicio}`).then(response => {
        this.listRetenes = response.data
        console.log('cad', response.data, this.lista, 'asdsa')
      }) */
    }
  }
}
</script>
