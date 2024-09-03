<template>
  <div class="row">
    <div class="col-xs-12">
      <slot name="caja"
      :open="openModal"
      ></slot>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12">
      <q-dialog
        v-model="crudTableModal"
        persistent
      >
        <slot
          name="form"
          :close="closeModal"
          :update="updateList"
        >Agregue su formulario aquí</slot>
      </q-dialog>
    </div>
    <div class="col-xs-12">
      <q-dialog
        v-model="crudTableModalCierre"
        persistent
      >
        <slot
          name="formcierre"
          :close="closeModalCajaCierre"
          :update="updateList"
        >Agregue su formulario aquí</slot>
      </q-dialog>
    </div>
    <div class="col-xs-12">
      <q-card class="q-ma-md">
        <q-toolbar
          inset
          class="q-gutter-md q-px-md q-pb-md"
        >
          <slot
            name="buttons"
            :open="openModal"
            :openCerrar="openModalCajaCierre"
          ></slot>
          <slot name="buttons-end"></slot>
        </q-toolbar>
        <q-table
          v-model:pagination="pagination"
          :grid="grid"
          :rows="registros"
          :columns="getColumns"
          :loading="loading"
          :rows-per-page-options="[10, 25, 50, 100]"
          :pagination-label="getPaginationLabel"
          no-data-label="No existe registros disponibles"
          no-results-label="No existe registros"
          loading-label="Cargando..."
          rows-per-page-label="Filas por pagina"
          v-model:selected="selected"
          :wrap-cells="true"
        >
          <template v-slot:body="props">
            <slot
              :row="props.row"
              :open="openModal"
              :openCerrar="openModalCajaCierre"
              :update="updateList"
              :eliminar="eliminar"
              :eliminarPermiso="eliminarPermiso"
              :cambiarEstado="cambiarEstado"
              :cambiarEstado2="cambiarEstado2"
              :aprobarDisloque="aprobar"
              :bajaDisloque="bajaDisloque"
              :cerrarcaja="cierrecaja"
              :eliminarReca="eliminarReca"
              :asignarRes="asignarRes"
              :quitarRes="quitarRes"
              name="row"
            />
          </template>
          <template v-slot:item="props">
            <slot
              :row="props.row"
              :selected="props.selected"
              :open="openModal"
              :update="updateList"
              :cambiarEstado="cambiarEstado"
              :cambiarEstado2="cambiarEstado2"
              name="item"
            />
          </template>
        </q-table>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref, inject, watch, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'

export default {
  name: 'CrudTable',
  props: {
    filters: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    url: {
      type: String,
      default: 'url'
    },
    order: {
      type: String,
      default: () => ''
    },
    grid: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const _http = inject('http')
    const _message = inject('message')
    const _storage = inject('storage')
    const $q = useQuasar()
    const urlCrud = ref(props.url)
    const loading = ref(false)
    const search = ref({})
    const enableSearch = ref('')
    const registros = ref([])
    const pagination = ref({
      sortBy: props.order,
      descending: true,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
      'rows-per-page-label': 'Páginas'
    })
    const division = ref(12)
    const tamanioColumna = ref(12)
    const crudTableModal = ref(false)
    const crudTableModalCierre = ref(false)

    onMounted(() => {
      registros.value = props.data
      division.value = parseInt(props.filters.length / 12)
      tamanioColumna.value = division.value > 1 ? division.value : 2
    })

    const updateList = async () => {

      /* await getData({
        pagination: pagination.value,
        filter: undefined
      }) */
    }

    const getData = async (props) => {
      loading.value = true
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const query = {
        limit: rowsPerPage === 0 ? 99999 : rowsPerPage,
        page: page
      }
      if (sortBy) {
        query.order = (descending ? '-' : '') + sortBy
      }
      if (Object.keys(search.value).length) {
        for (const key of Object.keys(search.value)) {
          if (search.value[key]) {
            if (search.value[key].toString().length > 0) {
              query[key] = search.value[key]
            }
          }
        }
      }
      if (search.value.nombre_categoria) {
        query.nombre_categoria = search.value.nombre_categoria
      }
      const { rows2, count } = await _http.get(_http.convertQuery(urlCrud.value, query), false)
      const rows = await _http.get(_http.convertQuery(urlCrud.value, query), false)
      // eslint-disable-next-line no-unused-expressions
      console.log('rows', rows2)
      const rutalist = await _http.get('/parametros/listaRutas')
      _storage.set('rutas', rutalist)
      const regionalist = await _http.get('/parametros/listaRegionales')
      _storage.set('regionales', regionalist)
      const categorialist = await _http.get('/parametros/listaCategorias')
      _storage.set('categorias', categorialist)
      const localidadlist = await _http.get('/parametros/listaLocalidades')
      _storage.set('localidades', localidadlist)
      const cargolist = await _http.get('/parametros/cargos')
      _storage.set('cargo', cargolist)
      const grupos = await _http.get('/administracion/grupos')
      _storage.set('grupo', grupos)
      const tipoContingencias = await _http.get('/contingencias/listaTipoContingencia')
      _storage.set('tipoContingencias', tipoContingencias)
      const menus = await _http.get('/administracion/menu')
      _storage.set('menus', menus)
      const listConten = await _http.get('/administracion/listaContentType')
      const pempadronamiento = await _http.get('/empadronamiento/pempadronamiento/')
      _storage.set('pempadronamiento', pempadronamiento)
      _storage.set('listaC', listConten)
      const reteneslist = await _http.get('/parametros/listaRetenes')
      _storage.set('retenes', reteneslist)
      const disloquelist = await _http.get('/administracion/listaDisloquesParaApertura')
      _storage.set('disloques', disloquelist)
      if (rows) {
        registros.value = rows
        pagination.value = props.pagination
        pagination.value.rowsNumber = count
      }
      loading.value = false
    }

    const toggleSearch = () => {
      enableSearch.value = !enableSearch.value
      search.value = {}
    }

    const getColumns = computed(() => {
      const items = []
      for (const el of props.columns) {
        el.align = 'center'
        items.push(el)
      }
      return items
    })

    const getPaginationLabel = (firstRowIndex, endRowIndex, totalRowsNumber) => {
      return `${firstRowIndex} - ${endRowIndex} de ${totalRowsNumber}`
    }
    watch(() => { return { ...search.value } }, async (value) => {
      await getData({
        pagination: pagination.value,
        filter: undefined
      })
    })
    const eliminar = ({ titulo, mensaje, aceptar, cancelar, url }) => {
      $q.dialog({
        title: titulo || 'Confirmacion',
        message: mensaje || '¿Esta seguro de eliminar el registro?',
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
        _message.success('Eliminado de manera correcta.')
        await updateList()
      }).onCancel(async () => {
        if (cancelar) {
          await cancelar()
        }
      })
    }
    const eliminarPermiso = ({ titulo, mensaje, aceptar, cancelar, url }) => {
      $q.dialog({
        title: titulo || 'Confirmacion',
        message: mensaje || '¿Esta seguro de eliminar el registro?',
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
        _message.success('Eliminado de manera correcta.')
        await updateList()
      }).onCancel(async () => {
        if (cancelar) {
          await cancelar()
        }
      })
    }

    const cambiarEstado = async ({ registro, url, titulo, mensaje, aceptar, cancelar }) => {
      const estadoOriginal = registro.estado === 'habilitado' ? 'deshabilitado' : 'habilitado'
      $q.dialog({
        title: titulo || 'Confirmacion',
        message: mensaje || `Esta seguro de que quiere cambiar el estado a ${registro.estado === 'habilitado' ? 'habilitado' : 'deshabilitado'} de este registro?`,
        ok: {
          color: 'primary',
          label: 'Aceptar'
        },
        cancel: {
          color: 'white',
          'text-color': 'secondary',
          label: 'Cancelar'
        },
        persistent: true
      }).onOk(async () => {
        if (aceptar) {
          await aceptar()
        } else {
          await _http.put(url, registro)
        }
        _message.success(`Se ${registro.estado === 'habilitado' ? 'habilitado' : 'deshabilitado'} el registro de manera exitosa.`)
        await updateList()
      }).onCancel(async () => {
        if (cancelar) {
          await cancelar()
        } else {
          registro.estado = estadoOriginal
        }
      })
    }
    const cambiarEstado2 = async ({ registro, url, titulo, mensaje, aceptar, cancelar }) => {
      const estadoOriginal = registro.estado === 'Aprobar' ? 'Pendiente' : 'Aprobar'
      $q.dialog({
        title: titulo || 'Confirmacion',
        message: mensaje || `Esta seguro de que quiere cambiar el estado a ${registro.estado === 'Aprobar' ? 'Aprobar' : 'Pendiente'} de este registro?`,
        ok: {
          color: 'primary',
          label: 'Aceptar'
        },
        cancel: {
          color: 'white',
          'text-color': 'secondary',
          label: 'Cancelar'
        },
        persistent: true
      }).onOk(async () => {
        if (aceptar) {
          await aceptar()
        } else {
          await _http.put(url, registro)
        }
        _message.success(`Se ${registro.estado === 'Aprobar' ? 'Aprobar' : 'Pendiente'} el registro de manera exitosa.`)
        await updateList()
      }).onCancel(async () => {
        if (cancelar) {
          await cancelar()
        } else {
          registro.estado = estadoOriginal
        }
      })
    }
    const aprobar = ({ titulo, mensaje, aceptar, cancelar, url }) => {
      $q.dialog({
        title: titulo || 'Confirmacion',
        message: mensaje || '¿Esta seguro de aprobar el disloque?',
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
        _message.success('Aprobado de manera correcta.')
        await updateList()
      }).onCancel(async () => {
        if (cancelar) {
          await cancelar()
        }
      })
    }
    const bajaDisloque = ({ titulo, mensaje, aceptar, cancelar, url }) => {
      $q.dialog({
        title: titulo || 'Confirmacion',
        message: mensaje || '¿Esta seguro de dar de baja el disloque?',
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
        _message.success('Se dio de baja el disloque de manera correcta.')
        await updateList()
      }).onCancel(async () => {
        if (cancelar) {
          await cancelar()
        }
      })
    }
    const cierrecaja = ({ titulo, mensaje, aceptar, cancelar, url, id }) => {
      crudTableModalCierre.value = true
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
        await updateList()
      }).onCancel(async () => {
        if (cancelar) {
          await cancelar()
        }
      })
    }
    const asignarRes = ({ titulo, mensaje, aceptar, cancelar, url }) => {
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
      }).onCancel(async () => {
        if (cancelar) {
          await cancelar()
        }
      })
    }
    return {
      persistent: ref(true),
      search,
      enableSearch,
      registros,
      pagination,
      urlCrud,
      getColumns,
      page: ref(1),
      limit: ref(5),
      loading,
      crudTableModal,
      crudTableModalCierre,
      selected: ref([]),
      eliminar,
      eliminarPermiso,
      cambiarEstado,
      cambiarEstado2,
      getData,
      toggleSearch,
      updateList,
      aprobar,
      bajaDisloque,
      cierrecaja,
      eliminarReca,
      asignarRes,
      quitarRes,
      openModal: () => { crudTableModal.value = true },
      closeModal: () => { crudTableModal.value = false },
      openModalCajaCierre: () => { crudTableModalCierre.value = true },
      closeModalCajaCierre: () => { crudTableModalCierre.value = false },
      getPaginationLabel
    }
  }
}
</script>
