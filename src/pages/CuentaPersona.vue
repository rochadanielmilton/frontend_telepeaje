<template>
  <q-page>
    <Titulo titulo="Entidad Persona Detalle" icono="business"></Titulo>
    <q-card-section class="text-left">
            <q-btn
              type="submit"
              color="primary"
              class="q-ml-sm"
              @click="$router.replace('/app/cuentas')"
            >
            <q-icon
              center
              name='reply'
            />
            </q-btn>
      </q-card-section>
    <q-card>
      <div class="row">
        <q-card-section class="col-xs-12 col-md-12">
          <q-banner class="bg-primary text-white">
            DATOS DE LA PERSONA
          </q-banner>
        </q-card-section>
        <q-card-section>
          <div class="container">
            <div class="container">
              <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                <q-field outlined label="Codigo" stack-label class="col-xs-12 col-md-4">
                  {{ personaConvenio.id_entidad_persona }}
                </q-field>
                        <q-field outlined label="Cuenta" stack-label class="col-xs-12 col-md-4">
                          {{ personaConvenio.id_cuenta }}
                        </q-field>
                        <q-field outlined label="Punto Empadronamiento" stack-label class="col-xs-12 col-md-4">
                          {{ personaConvenio.id_punto_empadronamiento }}
                        </q-field>
                        <q-field outlined label="Nombre" stack-label class="col-xs-12 col-md-4">
                          {{ personaConvenio.nombre }}
                        </q-field>
                        <q-field outlined label="Apellido paterno" stack-label class="col-xs-12 col-md-4">
                          {{ personaConvenio.ap_paterno }}
                        </q-field>
                 <q-field outlined label="Apellido materno" stack-label class="col-xs-12 col-md-4">
                  {{ personaConvenio.ap_materno }}
                 </q-field>
                 <q-field outlined label="Ci" stack-label class="col-xs-12 col-md-4">
                    {{ personaConvenio.ci_persona }}
                  </q-field>
                <q-field outlined label="Regional" stack-label class="col-xs-12 col-md-4">
                  {{ personaConvenio.ciudad }}
                </q-field>
                 <q-field outlined label="Direccion" stack-label class="col-xs-12 col-md-4">
                  {{ personaConvenio.direccion }}
                 </q-field>
                   <q-field outlined label="Celular" stack-label class="col-xs-12 col-md-4">
                    {{ personaConvenio.celular }}
                   </q-field>
                   <q-field outlined label="Telefono " stack-label class="col-xs-12 col-md-4">
                    {{ personaConvenio.telefono }}
                   </q-field>
                     <q-field outlined label="Correo" stack-label class="col-xs-12 col-md-4">
                      {{ personaConvenio.correo }}
                     </q-field>
                     <q-field outlined label="Ciudad" stack-label class="col-xs-12 col-md-4">
                      {{ personaConvenio.ciudad }}
                     </q-field>
                         <q-field outlined label="Fecha Creaccion" stack-label class="col-xs-12 col-md-4">
                          {{ personaConvenio.created }}
                         </q-field>
                         <q-field outlined label="Saldo" stack-label class="col-xs-12 col-md-4">
                          {{ saldoCuenta }}
                         </q-field>
                      </div>
            </div>
            <br>
            <div class="col-xs-12 col-md-4">
                <q-btn icon="mode_edit" color="secondary" @click="openModalEditarP" label="Editar Datos Persona"
                class="q-mr-md"></q-btn>
            </div>
          </div>
        </q-card-section>
      </div>
      <div class="row">
        <q-card-section class="col-xs-12 col-md-12">
          <q-banner class="bg-primary text-white">
            DATOS DE CONTRATO
          </q-banner>
        </q-card-section>
        <q-card-section class="col-xs-12 col-md-12">
          <div class="container">
            <div class="row q-col-gutter-x-md q-col-gutter-y-md">
              <q-field outlined label="Fecha Inicio Contrato" stack-label class="col-xs-12 col-md-4">
                {{ contrato.fecha_ini_contrato }}
              </q-field>
              <q-field outlined label="Fecha Fin Contrato" stack-label class="col-xs-12 col-md-4">
                {{ contrato.fecha_fin_contrato }}
              </q-field>
              <div class="col-xs-12 col-md-4">
                <q-btn icon="file_download" color="secondary" class="q-mr-md"></q-btn>
                <q-btn icon="list" color="secondary" @click="$router.replace('/app/controsPersonas')"
                  label="Historial Contratos" class="q-mr-md"></q-btn>
              </div>
            </div>
          </div>
        </q-card-section>
      </div>
      <div class="row">
        <q-card-section class="col-xs-12 col-md-12">
          <q-banner class="bg-primary text-white">
            DATOS DE RECARGA DE SALDOS
          </q-banner>
        </q-card-section>
        <q-card-section class="col-xs-12 col-md-12">
          <div class="container">
            <div class="row q-col-gutter-x-md q-col-gutter-y-md">
              <q-field outlined label="Saldo actual" stack-label class="col-xs-12 col-md-4">
                {{ saldoCuenta }}
              </q-field>
              <q-field outlined label="Nombre persona" stack-label class="col-xs-12 col-md-4">
                {{ personaConvenio.nombre }}
              </q-field>
              <div class="col-xs-12 col-md-4">
                <q-btn icon="file_download" label="Historial" @click="dataEntidad(); $router.replace('/app/historialRecarga')"
                  color="secondary" class="q-mr-md"></q-btn>
                <q-btn icon="add_shopping_cart" color="secondary" @click="openModalRecarga(); asignaCuenta()" label="Recarga de saldo"
                  class="q-mr-md"></q-btn>
              </div>
            </div>
          </div>
        </q-card-section>
      </div>
      <div class="row">
        <q-card-section class="col-xs-12 col-md-12">
          <q-expansion-item v-model="expanded" icon="local_shipping" label="LISTA DE VEHICULOS REGISTRADOS"
            header-class="bg-primary text-white">
            <div class="row">

            </div>
            <q-card>
              <q-card-section class="col-xs-12 col-md-12">
                <q-btn icon="add" color="secondary" @click="openModal(); asignaCuenta()" label="Agregar Vehiculo" class="q-mr-md"></q-btn>
              </q-card-section>
              <q-card-section class="col-xs-12 col-md-12">
                <div>
                  <q-table :rows="listVehiculos" :columns="columnsVehi" row-key="name">
                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td v-for="col in props.cols" :key="col.name" :props="props">
                          {{ col.value }}
                        </q-td>
                        <q-td auto-width>
                          <q-btn class="q-pa-xs" flat round icon="edit" @click="editRow(props.row)" />
                          <q-btn class="q-pa-xs" flat round icon="delete" @click="deleteRow(props.row)" />
                          <q-btn class="q-pa-xs" flat round icon="sell" @click="asignarTag(props.row)" />
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-card-section>
      </div>
    </q-card>
  </q-page>
  <div class="col-xs-12">
    <q-dialog v-model="crudModal" persistent>
      <q-card style="width: 700px; max-width: 90vw;">
        <q-toolbar class="q-pa-md">
          <q-icon name="home_work" size="md" />
          <q-toolbar-title>
            {{ vehiculos.id_vehiculo ? 'Editar' : 'Agregar' }} vehiculo
          </q-toolbar-title>
          <q-space />
          <q-btn flat round icon="close" @click="closeModal(close)" />
        </q-toolbar>
        <q-card-section>
          <Vehiculo v-model:valores="vehiculos" @guardar="guardar(close)" @cancelar="closeModal(close)">
          </Vehiculo>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
  <div class="col-xs-12">
    <q-dialog v-model="recargaModal" persistent>
      <q-card style="width: 700px; max-width: 90vw;">
        <q-toolbar class="q-pa-md">
          <q-icon name="home_work" size="md" />
          <q-toolbar-title>
            Recargar Saldo
          </q-toolbar-title>
          <q-space />
          <q-btn flat round icon="close" @click="closeModal(close)" />
        </q-toolbar>
        <q-card-section>
          <RecargaSaldo v-model:valores="recargas" @guardar="guardarRecarga(close)" @cancelar="closeModal(close)">
          </RecargaSaldo>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
  <div class="col-xs-12">
    <q-dialog v-model="editarPModal" persistent>
      <q-card style="width: 700px; max-width: 90vw;">
        <q-toolbar class="q-pa-md">
          <q-icon name="home_work" size="md" />
          <q-toolbar-title>
            Editar Datos Persona
          </q-toolbar-title>
          <q-space />
          <q-btn flat round icon="close" @click="closeModal(close)" />
        </q-toolbar>
        <q-card-section>
          <EditarCuentaPersona v-model:valores="personaConvenio" @guardar="EditarPersona(close)" @cancelar="closeModal(close)">
          </EditarCuentaPersona>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
  <div class="col-xs-12">
    <q-dialog v-model="tagModal" persistent>
      <q-card style="width: 700px; max-width: 90vw;">
        <q-toolbar class="q-pa-md">
          <q-icon name="sell" size="md" />
          <q-toolbar-title>
            Asignar Tag
          </q-toolbar-title>
          <q-space />
          <q-btn flat round icon="close" @click="closeModal(close)" />
        </q-toolbar>
        <q-card-section>
          <AsignarTag v-model:valores="tag" :reasignar="reasignarTag" :vehiculo="dataVehiculo" @guardar="guardarTag(close)" @cancelar="closeModal(close)">
          </AsignarTag>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
  <slot name="buttons" :open="openModal"></slot>
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import CrudTable from '@components/common/CrudTable'
import Vehiculo from 'components/Formularios/Vehiculo'
import RecargaSaldo from 'components/Formularios/RecargaSaldo'
import AsignarTag from 'components/Formularios/AsignarTag'
import EditarCuentaPersona from 'components/Formularios/EditarCuentaPersona'
import Estado from '@components/common/Estado'
import { useQuasar } from 'quasar'

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

const columnsVehi = [
  {
    name: 'nombre_categoria',
    required: true,
    label: 'Nombre categoria',
    align: 'left',
    field: 'nombre_categoria',
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'placa',
    align: 'center',
    label: 'Placa',
    field: 'placa',
    sortable: true
  },
  {
    name: 'marca',
    align: 'center',
    label: 'Marca',
    field: 'marca',
    sortable: true
  },
  {
    name: 'tipo',
    align: 'center',
    label: 'Tipo',
    field: 'tipo',
    sortable: true
  },
  {
    name: 'clase',
    align: 'center',
    label: 'Clase',
    field: 'clase',
    sortable: true
  },
  {
    name: 'tag',
    align: 'center',
    label: 'Tag',
    field: 'tag',
    sortable: true
  }
]
const columns = [

  {
    name: 'empresa.id_entidad_persona',
    label: 'Opciones',
    sortable: false
  },
  {
    name: 'personaConvenio.id_cuenta',
    label: 'Cuentas',
    sortable: false
  },
  {
    name: 'personaConvenio.nombre',
    label: 'Nombre',
    sortable: false
  },
  {
    name: 'personaConvenio.ap_paterno',
    label: 'Apellido Paterno',
    sortable: false
  },
  {
    name: 'personaConvenio.ap_materno',
    label: 'Apellido Materno',
    sortable: false
  },
  {
    name: 'personaConvenio.ci_persona',
    label: 'Ci',
    sortable: false
  },
  {
    name: 'personaConvenio.direccion',
    label: 'Punto de empadronamiento',
    sortable: false
  },
  {
    name: 'personaConvenio.celular',
    label: 'Celular',
    sortable: false
  },
  {
    name: 'personaConvenio.telefono',
    label: 'Telefono',
    sortable: false
  },
  {
    name: 'personaConvenio.correo',
    label: 'Correo',
    sortable: false
  },
  {
    name: 'personaConvenio.ciudad',
    label: 'Regional',
    sortable: false
  },
  {
    name: 'personaConvenio.celular',
    label: 'Celular',
    sortable: false
  }
]

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { CrudTable, Vehiculo, Estado, RecargaSaldo, AsignarTag, EditarCuentaPersona },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')
    const url = ref('/empadronamiento/verPersonaConvenio')
    const urlAgregarV = ref('/empadronamiento/vehiculo')
    const urlEiliminarV = ref('/empadronamiento/bajaVehiculo')
    const urlEditarV = ref('/empadronamiento/vehiculo')
    const urlRecarga = ref('/empadronamiento/formularioRecarga')
    const urlAsignarTag = ref('/empadronamiento/asignacionTag')
    const urlEditarPersona = ref('/empadronamiento/edicionPersonaConvenio')
    const urlReAsignarTag = ref('/empadronamiento/reasignarTag')
    const empresa = ref([])
    const personaConvenio = ref([])
    const listVehiculos = ref([])
    const contrato = ref([])
    const saldoCuenta = ref([])
    const _storage = inject('storage')
    const crudModal = ref(false)
    const recargaModal = ref()
    const editarPModal = ref()
    const tagModal = ref()
    const $q = useQuasar()
    const reasignarTag = ref(false)
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
      recargas.value = {
        id_cuenta: null,
        nombre_depositante: null,
        celular: null,
        monto_depositado: null,
        tipo_recarga: null,
        cuenta_bancaria: null
      }
      tag.value = {
        id_cuenta: null,
        id_vehiculo: null,
        id_tag: null
      }
      editarP.value = {
        nombre: null,
        ap_paterno: null,
        ap_materno: null,
        ci_persona: null,
        celular: null,
        telefono: null,
        ciudad: null,
        correo: null
      }
    }
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
    const recargas = ref({
      id_cuenta: null,
      nombre_depositante: null,
      celular: null,
      monto_depositado: null,
      tipo_recarga: null,
      cuenta_bancaria: null
    })
    const editarP = ref({
      nombre: null,
      ap_paterno: null,
      ap_materno: null,
      ci_persona: null,
      celular: null,
      telefono: null,
      ciudad: null,
      correo: null
    })
    const tag = ref({
      id_cuenta: null,
      id_vehiculo: null,
      id_tag: null
    })
    const dataVehiculo = ref({
      id_cuenta: null,
      placa: null,
      marca: null,
      tipo: null,
      id_tag: null,
      cod_tag: null
    })
    const idCuenta = _storage.get('id_cuenta')

    const closeModal = (close) => {
      crudModal.value = false
      recargaModal.value = false
      tagModal.value = false
      editarPModal.value = false
      resetForm()
    }

    const guardar = async (update, close) => {
      const VehiculosForm = new FormData()
      VehiculosForm.append('id_categoria', vehiculos.value.id_categoria)
      VehiculosForm.append('placa', vehiculos.value.placa)
      VehiculosForm.append('marca', vehiculos.value.marca)
      VehiculosForm.append('tipo', vehiculos.value.tipo)
      VehiculosForm.append('clase', vehiculos.value.clase)
      VehiculosForm.append('modelo', vehiculos.value.modelo)
      VehiculosForm.append('color', vehiculos.value.color)
      VehiculosForm.append('cilindrada', vehiculos.value.cilindrada)
      VehiculosForm.append('cap_carga', vehiculos.value.cap_carga)
      VehiculosForm.append('nro_ejes', vehiculos.value.nro_ejes)
      VehiculosForm.append('imagen_fronal_vehiculo', vehiculos.value.imagen_fronal_vehiculo[0])
      VehiculosForm.append('imagen_lateral_vehiculo', vehiculos.value.imagen_lateral_vehiculo[0])
      VehiculosForm.append('id_cuenta', vehiculos.value.id_cuenta)
      VehiculosForm.append('baja', 0)
      VehiculosForm.append('id_vehiculo', vehiculos.value.id_vehiculo)
      VehiculosForm.append('id_cuenta', vehiculos.value.id_cuenta)
      if (vehiculos.value.id_vehiculo) {
        await _http.put(`${urlEditarV.value}/${vehiculos.value.id_vehiculo}/`, VehiculosForm)
        _message.success('Actualizacion realizada de manera correcta.')
      } else {
        await _http.post(`${urlAgregarV.value}/`, VehiculosForm)
        _message.success('Registro realizado de manera correcta.')
      }
      // await update() modificar para lista de
      closeModal(close)
      await getDataE()
    }
    const guardarRecarga = async (close) => {
      await _http.post(`${urlRecarga.value}`, recargas.value)
      _message.success('Registro realizado de manera correcta.')
      closeModal(close)
      await getDataE()
    }
    const EditarPersona = async (close) => {
      await _http.post(`${urlEditarPersona.value}`, personaConvenio.value)
      _message.success('Se Registraron los cambios de manera correcta.')

      // await update() modificar para lista de
      // await getDataE()
      closeModal(close)
    }
    const asignaCuenta = async () => {
      vehiculos.value.id_cuenta = idCuenta
      recargas.value.id_cuenta = idCuenta
    }
    const dataEntidad = async () => {
      _storage.set('tipoEntidad', 'persona')
    }
    const guardarTag = async (close) => {
      if (reasignarTag.value) {
        await _http.patch(`${urlReAsignarTag.value}/${tag.value.id_vehiculo}`, tag.value)
        _message.success('Se reasigno el Tag de  manera correcta.')
      } else {
        await _http.post(`${urlAsignarTag.value}`, tag.value)
        _message.success('Se asigno el Tag de  manera correcta.')
      }
      // await update() modificar para lista de
      await getDataE()
      closeModal(close)
    }
    const mostrar = async (apll) => {
      _storage.set('apellido', apll)
    }

    const getDataE = async () => {
      const rows = await _http.get(`${url.value}/${idCuenta}`)
      personaConvenio.value = rows.persona_convenio
      listVehiculos.value = rows.lista_vehiculos
      contrato.value = rows.contrato
      vehiculos.value.id_cuenta = idCuenta
      saldoCuenta.value = rows.saldo_cuenta
      recargas.value.id_cuenta = idCuenta
      _storage.set('idPersona', rows.persona_convenio.id_entidad_persona)
      _storage.set('nom', rows.persona_convenio.nombre)
    }
    /* const datosSaldo = async () => {
      const rows = await _http.get(`${urlRecarga.value}/${idCuenta}`)
      console.log('saldoCuenta', saldoCuenta)
      saldoCuenta.value = rows.cuenta
    } */
    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }
    const deleteRow = (props) => {
      $q.dialog({
        title: 'Confirmacion',
        message: '¿Esta seguro de eliminar el registro?',
        persistent: true,
        ok: {
          color: 'primary',
          label: 'Aceptar'
        },
        cancel: {
          color: 'white',
          'text-color': 'black',
          label: 'Cancelar'
        }
      }).onOk(async () => {
        _http.put(`${urlEiliminarV.value}/${props.id_vehiculo}`)
        _message.success('Registro eliminado de manera correcta.')
        await getDataE()
      }).onCancel(async () => {
        closeModal(close)
      })
    }
    const editRow = async (props) => {
      const row = await _http.get(`${urlEditarV.value}/${props.id_vehiculo}`)
      console.log(row)
      vehiculos.value = row
      crudModal.value = true
      // _http.get(`${urlEditarV.value}/${props.id_vehiculo}`)
      // _storage.set('vehiculo', props)
    }
    const asignarTag = async (props) => {
      if (props.tag) {
        $q.dialog({
          title: 'Confirmacion',
          message: '¿Esta seguro que desea reasignar Tag?',
          persistent: true,
          ok: {
            color: 'primary',
            label: 'Aceptar'
          },
          cancel: {
            color: 'white',
            'text-color': 'black',
            label: 'Cancelar'
          }
        }).onOk(async () => {
          console.log('[rops]', props)
          reasignarTag.value = true
          dataVehiculo.value.id_cuenta = idCuenta
          dataVehiculo.value.marca = props.marca
          dataVehiculo.value.placa = props.placa
          dataVehiculo.value.tag = props.tag
          // dataVehiculo.value.cod_tag = props.tag
          dataVehiculo.value.id_vehiculo = props.id_vehiculo
          tag.value = props
          tagModal.value = true
        }).onCancel(async () => {
          reasignarTag.value = false
        })
      } else {
        tag.value.id_cuenta = idCuenta
        tag.value.id_vehiculo = props.id_vehiculo
        tagModal.value = true
        reasignarTag.value = false
      }
    }

    onMounted(async () => {
      getDataE()
      // datosSaldo()
    })
    return {
      filters,
      columns,
      url,
      empresa,
      personaConvenio,
      listVehiculos,
      columnsVehi,
      contrato,
      saldoCuenta,
      recargas,
      tag,
      editarP,
      crudModal,
      recargaModal,
      tagModal,
      editarPModal,
      EditarPersona,
      vehiculos,
      urlRecarga,
      reasignarTag,
      dataVehiculo,
      getNombreCompleto,
      guardar,
      guardarRecarga,
      asignaCuenta,
      guardarTag,
      getDataE,
      mostrar,
      deleteRow,
      editRow,
      asignarTag,
      dataEntidad,
      openModal: () => { crudModal.value = true },
      openModalRecarga: () => { recargaModal.value = true },
      openModalEditarP: () => { editarPModal.value = true },
      openModalTag: () => { tagModal.value = true },
      closeModal
    }
  }
}
</script>
