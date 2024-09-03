<template>
  <q-page>
    <Titulo
      titulo="Detalles Transaccion"
      icono="business"
    ></Titulo>
    <div>
      <q-card>
        <div class="q-pa-md">
          <q-card-section class="text-left">
            <q-btn
              type="submit"
              color="primary"
              class="q-ml-sm"
              @click="$router.replace('/app/postclasificacion')"
            >
            <q-icon
              center
              name='reply'
            />
            </q-btn>
          </q-card-section>
          <q-expansion-item
            v-model="expanded"
            icon="perm_identity"
            label="DATOS GENERALES"
            header-class="bg-primary text-white"
          >
            <q-card>
              <q-card-section>
                <div class="container"></div>
                <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                  <q-field outlined label="Oficina Recional" stack-label class="col-xs-12 col-md-3" >
                    {{ transaccion.nombre_regional }}
                  </q-field>
                  <q-field outlined label="Estacion" stack-label class="col-xs-12 col-md-3" >
                    {{ transaccion.nombre_reten }}
                  </q-field>
                  <q-field outlined label="Carril" stack-label class="col-xs-12 col-md-3" >
                    {{ transaccion.id_carril}}
                  </q-field>
                  <q-field outlined label="Fecha Transaccion" stack-label class="col-xs-12 col-md-3" >
                    {{ transaccion.fecha }}
                  </q-field>
                  <q-field outlined label="Localidad Inicio" stack-label class="col-xs-12 col-md-3" >
                    {{ transaccion.localidad_inicio }}
                  </q-field>
                  <q-field outlined label="Localidad Fin" stack-label class="col-xs-12 col-md-3" >
                    {{ transaccion.localidad_fin }}
                  </q-field>
                  <q-field outlined label="Ruta" stack-label class="col-xs-12 col-md-3" >
                    {{ transaccion.nombre_ruta }}
                  </q-field>
                  <q-field outlined label="Tipo de Carril" stack-label class="col-xs-12 col-md-3" >
                    {{ transaccion.tipo_carril }}
                  </q-field>
                  <q-field outlined label="Turno" stack-label class="col-xs-12 col-md-3" >
                    {{ transaccion.id_turno }}
                  </q-field>
                  <q-field outlined label="Hora apertura" stack-label class="col-xs-12 col-md-3" >
                    {{ transaccion.hora }}
                  </q-field>
                  <q-field outlined label="Transaccion" stack-label class="col-xs-12 col-md-3" >
                    {{ transaccion.id}}
                  </q-field>
                  <q-field outlined label="Ciclo" stack-label class="col-xs-12 col-md-3" >
                    {{ transaccion.id_ciclo}}
                  </q-field>
                  <q-field outlined label="Cuenta Entidad" stack-label class="col-xs-12 col-md-3" >
                    {{ transaccion.id_cuenta }}
                  </q-field>
                  <q-field outlined label="Cobrador" stack-label class="col-xs-12 col-md-3" >
                    {{ transaccion.nombre_recaudador }}
                  </q-field>
                  <q-field outlined label="Reviso" stack-label class="col-xs-12 col-md-3" >
                    {{ transaccion.nombre_revisor }}
                  </q-field>
                  <q-field outlined label="Estado" stack-label class="col-xs-12 col-md-3" >
                    {{ transaccion.estado }}
                  </q-field>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
        <div class="row">
          <q-card-section class="col-xs-12 col-md-6">
                <q-banner class="bg-primary text-white">
                  DATOS TELEPEAJE
                </q-banner>
                <q-card-section>
                  <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                    <div class="col-xs-12 col-md-6">
                      <strong>N° Ejes Nivel 1:</strong><span>{{transaccion.numero_ejes_inicio}}</span>
                    </div>
                    <div class="col-xs-12 col-md-6">
                      <strong>Alto:</strong><span>{{transaccion.alto_vehiculo}}</span>
                    </div>
                    <div class="col-xs-12 col-md-6">
                      <strong>N° Ejes Nivel 1:</strong><span>{{transaccion.numero_ejes_salida}}</span>
                    </div>
                    <div class="col-xs-12 col-md-6">
                      <strong>Ancho:</strong><span>{{transaccion.ancho_vehiculo}}</span>
                    </div>
                    <div class="col-xs-12 col-md-6">
                      <strong>Categoria del vehiculo:</strong><span>{{transaccion.nombre_categoria}}</span>
                    </div>
                    <div class="col-xs-12 col-md-6">
                      <strong>Placa Detectada:</strong><span>{{transaccion.placa}}</span>
                    </div>
                    <div class="col-xs-12 col-md-6">
                      <strong>Clase del vehiculo:</strong><span>{{transaccion.clase_vehiculo}}</span>
                    </div>
                    <div class="col-xs-12 col-md-6">
                      <strong>Tag Vechiculo:</strong><span>{{transaccion.tag_leido}}</span>
                    </div>
                    <q-field outlined stack-label class="col-xs-12 col-md-12" >
                    {{ transaccion.importe_telepeaje }} {{ transaccion.importe_telepeaje }}
                    </q-field>
                  </div>
                </q-card-section>
              </q-card-section>
              <q-card-section class="col-xs-12 col-md-6">
                <q-banner class="bg-primary text-white">
                  COBRADOR
                </q-banner>
                <q-card-section>
                  <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                    <div class="col-xs-12 col-md-6">
                      <strong>Tipo de pago:</strong><span>{{transaccion.tipo_pago}}</span>
                    </div>
                    <div class="col-xs-12 col-md-6">
                      <strong>Tipo de Carril:</strong><span>{{transaccion.tipo_carril}}</span>
                    </div>
                    <div class="col-xs-12 col-md-6">
                      <strong>Categoria según recaudador:</strong><span>{{transaccion.nombre_categoria}}</span>
                    </div>
                    <div class="col-xs-12 col-md-6">
                      <strong>Monto segun revisor:</strong><span>{{transaccion.importe_revision}}</span>
                    </div>
                    <div class="col-xs-12 col-md-6">
                      <strong>Comentario:</strong><span>{{transaccion.comentario_revisor}}</span>
                    </div>
                    <div class="col-xs-12 col-md-6">
                      <strong>Recaudador:</strong><span>{{transaccion.nombre_recaudador}}</span>
                    </div>
                    <q-field outlined stack-label class="col-xs-12 col-md-12" >
                    {{ transaccion.importe_recaudador }}
                    </q-field>
                  </div>
                </q-card-section>
              </q-card-section>
        </div>
        <div class="row">
          <q-card-section class="col-xs-12 col-md-6">
                <q-banner class="bg-primary text-white">
                  FOTOGRAFIAS
                </q-banner>
                <div class="mainPhotoContainer col-11 col-md-4 q-pa-md q-mt-md">
                  <q-img class="col-6" :src="`${IMG_URL}${transaccion.imagen_frontal}`" alt="" />
                </div>
                <div class="mainPhotoContainer col-11 col-md-4 q-pa-md q-mt-md">
                  <q-img class="col-6" :src="`${IMG_URL}${transaccion.imagen_lateral}`" alt="" />
                </div>
                </q-card-section>
                <q-card-section class="col-xs-12 col-md-6">
                <q-banner class="bg-primary text-white">
                  VALIDACION
                </q-banner>
                <div class="row" v-if="transaccion.estado === 'Observado'">
                <q-card>
                <q-form
                  class="row q-col-gutter-md"
                  @submit="guardar()"
                >
                  <q-select
                  filled
                  v-model="model"
                  :options="tarifario"
                  option-value="importe"
                  option-label="nombre_categoria"
                  label="Categoria"
                  color="teal"
                  clearable
                  options-selected-class="text-deep-orange"
                  class="col-xs-12 col-md-6"
                  @update:model-value="val => seleccionCategoria(val)"
                >
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section>
                        <q-item-label>{{ scope.opt.nombre_categoria }}</q-item-label>
                        <q-item-label caption>{{ scope.opt.importe }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                  </q-select>
                  <q-input
                    filled
                    class="col-xs-12 col-md-6"
                    label="Importe"
                    v-model="diferencia"
                  >
                  </q-input>
                  <q-input
                    filled
                    class="col-xs-12 col-md-12"
                    label="Comentario"
                    v-model="revision.comentario_revisor"
                    :rules="nombre"
                  >
                  </q-input>
                  <div class="col-xs-12 text-center" >
                    <q-btn
                      label="Validar Transaccion"
                      type="submit"
                      color="primary"
                      class="q-ml-sm"
                    />
                </div>
              </q-form>
            </q-card>
            </div>
            <div class="row text-center" v-else >
              <h6><strong>Esta transaccion no tiene observaciones</strong></h6>
            </div>

                </q-card-section>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import TablaDisloque from '@components/common/TablaDisloque'
import Recaudador from 'components/Formularios/Recaudador'
import Estado from '@components/common/Estado'
const customize = [
  {
    label: 'Satisfied customers',
    header: 'root',
    children: [
      {
        label: 'Good food',
        icon: 'restaurant_menu',
        header: 'generic',
        children: [
          {
            label: 'Quality ingredients',
            header: 'generic',
            body: 'story',
            story: 'Lorem ipsum dolor sit amet.'
          },
          {
            label: 'Good recipe',
            body: 'story',
            story: 'A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.'
          }
        ]
      }]
  }
]
const datos = ({
  panel: [0, 1],
  readonly: false
})

const filters = [
  {
    label: 'Nombre',
    field: 'nombre_cargo',
    type: 'input'
  },
  {
    label: 'Descripcion',
    field: 'descripcion',
    type: 'input'
  },
  {
    label: 'Código',
    field: 'id_cargo',
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
    name: 'recaudador',
    label: 'Recaudador',
    sortable: false
  },
  {
    name: 'responsable',
    label: 'Responsable',
    sortable: false
  },
  {
    name: 'estado',
    label: 'Agregar/quitar',
    sortable: false
  }
]

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { TablaDisloque, Recaudador, Estado },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')
    const url = ref('/post_clasificacion/transaccionAPI')
    const urlasignarR = ref('/administracion/asignarResponsable')
    const urlquitarR = ref('/administracion/quitarResponsable')
    const urlAgregarRev = ref('/post_clasificacion/transaccionAPI')
    const urlQuitarReca = ref('/administracion/quitarUnRecaudadorAPI')
    const urllista = ref('/administracion/verListaDetalleDisloque')
    const _storage = inject('storage')
    const transaccion = ref([])
    const tarifario = ref([])
    const diferencia = ref([])
    const model = ref(null)
    const revision = ref({
      id_tarifario: null,
      id_transaccion: null
    })
    const detalle = ref({
      id: null,
      numero_disloque: null,
      fecha_inicio: null,
      fecha_fin: null,
      fecha_creacion: null,
      estado: null,
      responsable_disloque: null,
      responsable_reten: null,
      id_regional: null,
      id_reten: null,
      id_recaudador: null,
      baja: null
    })
    const resetForm = () => {
      detalle.value = {
        id: null,
        numero_disloque: null,
        fecha_inicio: null,
        fecha_fin: null,
        fecha_creacion: null,
        estado: null,
        responsable_disloque: null,
        responsable_reten: null,
        id_regional: null,
        id_reten: null,
        id_recaudador: null,
        baja: null
      }
    }
    const dataDisloque = _storage.get('datadisloque')
    const IMG_URL = _storage.get('imgUrl')
    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        detalle.value = await _http.get(`${url.value}/${id}`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      console.log('gudar_reca', revision)
      await _http.post(`${urlAgregarRev.value}`, revision.value)
      _message.success('Registro realizado de manera correcta.')
      // await update()
      lista()
      closeModal(close)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    const lista = async (update, close) => {
      console.log('lista')
      transaccion.value = await _http.get(`${urllista.value}/${dataDisloque.id}`)
    }

    onMounted(async () => {
      const idTransaccion = _storage.get('id_transaccion')
      const rows = await _http.get(`${url.value}/${idTransaccion}`)
      transaccion.value = rows.transacion
      tarifario.value = rows.tarifario
      revision.value.id_transaccion = idTransaccion
      diferencia.value = 0
    })
    return {
      detalle,
      filters,
      columns,
      url,
      urlAgregarRev,
      dataDisloque,
      revision,
      urlasignarR,
      urlquitarR,
      urlQuitarReca,
      urllista,
      transaccion,
      tarifario,
      model,
      customize,
      datos,
      IMG_URL,
      diferencia,
      closeModal,
      openModal,
      getNombreCompleto,
      guardar
    }
  },
  methods: {
    seleccionCategoria (model) {
      if (model) {
        this.diferencia = model.importe
        this.revision.id_tarifario = model.id_tarifario
      }
    }
  }
}
</script>
