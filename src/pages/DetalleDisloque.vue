<template>
  <q-page>
    <Titulo
      titulo="Detalles Disloque"
      icono="business"
    ></Titulo>
    <q-card-section class="text-left">
            <q-btn
              type="submit"
              color="primary"
              class="q-ml-sm"
              @click="$router.replace('/app/administra/disloques')"
            >
            <q-icon
              center
              name='reply'
            />
            </q-btn>
          </q-card-section>
    <div>
      <q-card v-for="item in data" :key="item.nombre_reten" @request="lista"  >
        <q-banner dense inline-actions class="bg-primary text-white">
          {{ item.nombre_reten }}
    </q-banner>
    <q-table :rows="item.registros" :columns="columns" row-key="name">
      <template v-slot:top-left="">
        <q-btn
          icon="add"
          color="secondary"
          @click="openModal(item)"
          label="Nuevo"
        />
                <div class="q-pa-sm q-gutter-sm">
                </div>
              </template>

                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td v-for="col in props.cols" :key="col.name" :props="props">
                          {{ col.value }}
                        </q-td>
                        <q-td auto-width>
                          <q-btn class="q-pa-xs" flat round color="negative" icon="delete" @click="eliminarReca({ url: `${urlQuitarReca}/${props.row.id}` })" />
                          <q-btn class="q-pa-xs" flat round color="primary" icon="remove_circle" @click="quitarRes({ url: `${urlquitarR}/${props.row.id}` })" />
                          <q-btn class="q-pa-xs" flat round color="primary" icon="add_circle" @click="asignarRes({ url: `${urlasignarR}/${props.row.id}` })" />
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
    <!--TablaDisloque
      :filters="filters"
      :columns="columns"
      :order="'createdAt'"
      :data="item.registros"
      >
      <template v-slot:buttons="{ open }">
        <q-btn
          icon="add"
          color="secondary"
          @click="openModal(open)"
          label="Nuevo"
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
              {{ detalle.id ? 'Editar' : 'Agregar' }} recaudador
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
            <Recaudador
              v-model:valores="recaudador"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Recaudador>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, eliminarReca, asignarRes, quitarRes }">
        <q-tr>
          <q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminarReca({ url: `${urlQuitarReca}/${row.id}` })"
            />
          </q-td>
          <q-td>{{ row.recaudador}}</q-td>
          <q-td>{{ row.responsable}}</q-td>
          <q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              color="primary"
              icon="add_circle"
              @click="asignarRes({ url: `${urlasignarR}/${row.id}` })"
            />
            <q-btn
              class="q-pa-xs"
              flat
              round
              color="primary"
              icon="remove_circle"
              @click="quitarRes({ url: `${urlquitarR}/${row.id}` })"
            />
          </q-td>
        </q-tr>
      </template>
    </TablaDisloque-->
  </q-card>
    </div>
  </q-page>
  <div class="col-xs-12">
    <q-dialog v-model="crudModal" persistent>
      <q-card style="width: 700px; max-width: 90vw;">
        <q-toolbar class="q-pa-md">
          <q-icon name="home_work" size="md" />
          <q-toolbar-title>
            Agregar Recaudador
          </q-toolbar-title>
          <q-space />
          <q-btn flat round icon="close" @click="closeModal()" />
        </q-toolbar>
        <q-card-section>
          <Recaudador
              v-model:valores="recaudador"
              @guardar="guardar(update)"
              @cancelar="closeModal()"
            ></Recaudador>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import TablaDisloque from '@components/common/TablaDisloque'
import Recaudador from 'components/Formularios/Recaudador'
import Estado from '@components/common/Estado'
import { useQuasar } from 'quasar'
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
    name: 'recaudador',
    label: 'Recaudador',
    field: 'recaudador',
    sortable: false
  },
  {
    name: 'responsable',
    label: 'Responsable',
    field: 'responsable',
    sortable: false
  },
  {
    name: 'action',
    align: 'center',
    label: 'Action',
    field: ''
  }
]

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { TablaDisloque, Recaudador, Estado },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')
    const url = ref('/administracion/verListaDetalleDisloque')
    const urlasignarR = ref('/administracion/asignarResponsable')
    const urlquitarR = ref('/administracion/quitarResponsable')
    const urlAgregarReca = ref('/administracion/agregarUnRecaudador')
    const urlQuitarReca = ref('/administracion/quitarUnRecaudadorAPI')
    const urllista = ref('/administracion/verListaDetalleDisloque')
    const _storage = inject('storage')
    const data = ref([])
    const crudModal = ref(false)
    const $q = useQuasar()
    const recaudador = ref({
      id_regional: null,
      fecha_ini: null,
      id_recaudador: null,
      id_reten: null,
      id_disloque: null
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
      recaudador.value = {
        id_regional: null,
        fecha_ini: null,
        id_recaudador: null,
        id_reten: null,
        id_disloque: null
      }
    }
    const dataDisloque = _storage.get('datadisloque')
    const openModal = async (data) => {
      resetForm()
      crudModal.value = true
      recaudador.value.id_reten = data.id_reten
      /* if (id) {
        detalle.value = await _http.get(`${url.value}/${id}`)
      } */
    }

    const closeModal = () => {
      console.log('close')
      crudModal.value = false
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      console.log('gudar_reca', recaudador)
      await _http.post(`${urlAgregarReca.value}`, recaudador.value)
      _message.success('Registro realizado de manera correcta.')
      // await update()
      lista()
      closeModal()
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    const lista = async (update, close) => {
      data.value = await _http.get(`${urllista.value}/${dataDisloque.id}`)
    }
    const eliminarReca = ({ titulo, mensaje, aceptar, cancelar, url }) => {
      $q.dialog({
        title: titulo || 'Confirmacion',
        message: mensaje || '¿Esta seguro de eliminar al recaudador del disloque?',
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
        if (aceptar) {
          await aceptar()
        } else {
          await _http.delete(url)
        }
        _message.success('Se elimino al recadudador del disloque de manera correcta.')
        lista()
      // await updateList()
      }).onCancel(async () => {
        if (cancelar) {
          await cancelar()
        }
      })
    }
    const asignarRes = ({ titulo, mensaje, aceptar, cancelar, url }) => {
      console.log('sdsadas')
      $q.dialog({
        title: titulo || 'Confirmacion',
        message: mensaje || '¿Esta seguro de asignar a este usuario como responsable de disloque?',
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
        if (aceptar) {
          await aceptar()
        } else {
          await _http.put(url)
          lista()
        }
        _message.success('Se asigno al responsable del disloque de manera correcta.')
      }).onCancel(async () => {
        if (cancelar) {
          await cancelar()
        }
      })
    }
    const quitarRes = ({ titulo, mensaje, aceptar, cancelar, url }) => {
      $q.dialog({
        title: titulo || 'Confirmacion',
        message: mensaje || '¿Esta seguro de quitar al usuario como responsable del disloque?',
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
        if (aceptar) {
          await aceptar()
        } else {
          await _http.put(url)
        }
        _message.success('Se quito al usuario como responsable del disloque de manera correcta.')
        lista()
      }).onCancel(async () => {
        if (cancelar) {
          await cancelar()
        }
      })
    }
    onMounted(async () => {
      lista()
      /* _http.get('/administracion/datosCreacionCaja/1/242').then(respo => {
      }) */
    })
    return {
      detalle,
      filters,
      columns,
      url,
      urlAgregarReca,
      dataDisloque,
      recaudador,
      urlasignarR,
      urlquitarR,
      urlQuitarReca,
      urllista,
      data,
      crudModal,
      openModal,
      getNombreCompleto,
      guardar,
      eliminarReca,
      asignarRes,
      quitarRes,
      closeModal
    }
  }
}
</script>
