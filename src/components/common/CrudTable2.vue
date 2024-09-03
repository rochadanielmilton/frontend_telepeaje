<template>
  <div class="row">
    <div class="col-xs-12">
      <slot name="buscar"
      :listarRetenes="listarRetenes"
      :listarTransaccion="listarTransaccion"
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
      <q-card class="q-ma-md">
        <q-toolbar
          inset
          class="q-gutter-md q-px-md q-pb-md"
        >
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
          @request="getData"
          :wrap-cells="true"
        >
          <template
            v-slot:top
            v-if="enableSearch"
            class="full-width"
          >
            <div class="row q-col-gutter-md no-padding full-width">
              <div
                v-for="(item, index) of filters"
                :key="index"
                align="center"
                class="col-grow"
              >
                <q-select
                  v-if="item.type === 'select'"
                  v-model="search[item.field]"
                  :options="item.options"
                  :label="item.label"
                  behavior="menu"
                  clearable
                  filled
                  dense
                  emit-value
                  map-options
                  :autofocus="index === 0"
                />
                <q-checkbox
                  v-if="item.type === 'checkbox'"
                  v-model="search[item.field]"
                  :label="item.label"
                  filled
                  dense
                  :autofocus="index === 0"
                />
                <q-input
                  v-if="item.type === 'input'"
                  v-model="search[item.field]"
                  :label="item.label"
                  clearable
                  filled
                  dense
                  :autofocus="index === 0"
                />
                <q-input
                  v-if="item.type === 'date'"
                  v-model="search[item.field]"
                  :label="item.label"
                  clearable
                  filled
                  dense
                >
                  <template
                    v-slot:append
                    :props="item"
                  >
                    <q-icon
                      name="event"
                      class="cursor-pointer"
                    ></q-icon>
                    <q-popup-proxy
                      :ref="item.field"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="search[item.field]"
                        color="secondary"
                        mask="YYYY-MM-DD"
                        @update:model-value="$refs[item.field].hide()"
                      />
                    </q-popup-proxy>
                  </template>
                </q-input>
              </div>
            </div>
          </template>
          <template v-slot:body="props">
            <slot
              :row="props.row"
              :open="openModal"
              :update="updateList"
              :eliminar="eliminar"
              :eliminarPermiso="eliminarPermiso"
              :cambiarEstado="cambiarEstado"
              :cambiarEstado2="cambiarEstado2"
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
    fechad: {
      type: String,
      default: 'fechad'
    },
    regionald: {
      type: String,
      default: 'regionald'
    }
  },
  setup (props) {
    const _http = inject('http')
    const _message = inject('message')
    const $q = useQuasar()
    const urlCrud = ref(props.url)
    const regionaldis = ref(props.regionald)
    const fechadis = ref(props.fechad)
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

    onMounted(() => {
      division.value = parseInt(props.filters.length / 12)
      tamanioColumna.value = division.value > 1 ? division.value : 2
      updateList()
    })

    const updateList = async () => {
      await getData({
        pagination: pagination.value,
        filter: undefined
      })
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
      // const { rows2, count } = await _http.post(_http.convertQuery(`${urlCrud.value}/${regionaldis.value}/${fechadis.value}`, query), false)
      let body = {}
      if (regionaldis.value === 99) {
        body = {
          fecha: fechadis.value
        }
      } else {
        body = {
          fecha_ini: fechadis.value,
          id_regional: regionaldis.value
        }
      }
      const { rows2, count } = await _http.post(`${urlCrud.value}`, body)
      const rows = await _http.post(`${urlCrud.value}`, body)
      // eslint-disable-next-line no-unused-expressions
      console.log('row2', rows2)
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

    const listarRetenes = async ({ registro, url, titulo, mensaje, aceptar, cancelar }) => {
      fechadis.value = registro.fecha_ini
      regionaldis.value = registro.id_regional
      updateList()
    }

    const listarTransaccion = async ({ registro, url, titulo, mensaje, aceptar, cancelar }) => {
      fechadis.value = registro.fecha_ini
      updateList()
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

    return {
      persistent: ref(true),
      search,
      enableSearch,
      registros,
      pagination,
      urlCrud,
      regionaldis,
      fechadis,
      getColumns,
      page: ref(1),
      limit: ref(5),
      loading,
      crudTableModal,
      selected: ref([]),
      eliminar,
      eliminarPermiso,
      cambiarEstado,
      cambiarEstado2,
      getData,
      toggleSearch,
      updateList,
      listarRetenes,
      listarTransaccion,
      openModal: () => { crudTableModal.value = true },
      closeModal: () => { crudTableModal.value = false },
      getPaginationLabel
    }
  }
}
</script>
