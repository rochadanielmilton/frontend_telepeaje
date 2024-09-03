<template>
  <q-page>
    <Titulo titulo="Recaudación por Usuario y Regional" icono="add_chart"></Titulo>
    <div class="col-xs-12">
      <q-card class="q-ma-md">
        <q-toolbar inset class="q-gutter-md q-px-md q-pb-md">
          <div class="col-xs-12 col-md-12">
            <q-form class="row col-xs-12 col-md-3 q-col-gutter-md q-col-gutter-y-md" method="post" @submit="listarRetenes()">
              <q-select v-model="reporte.id_regional" :options="listRegionales" option-value="id_regional" @update:model-value="val => showregional(val)"
                option-label="nombre_regional" class="col-xs-6 col-md-3" label="Regional" map-options emit-value />
                <q-select v-model="reporte.id_recaudador" :options="listRecaUsus" option-value="id_usuario"
                option-label="usuario" class="col-xs-6 col-md-3" label="Usuarios" map-options emit-value />
              <q-input filled class="col-xs-6 col-md-3" label="Fecha" v-model="reporte.fecha">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="reporte.fecha" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <div class="col-xs-2 col-md-1 " style="top: 10px">
              <q-btn icon="search" color="secondary" type="Submit" label="" class="col-xs-6 col-md-5">
                <q-tooltip>Buscar</q-tooltip>
              </q-btn>
              </div>
              <div class="col-xs-2 col-md-1" style="top: 10px">
              <q-btn icon="download" color="secondary" label="" class="col-xs-6 col-md-5" @click="exportar()">
                <q-tooltip>Exportar</q-tooltip>
              </q-btn>
              </div>
            </q-form>
          </div>
          <slot name="buttons-end"></slot>
        </q-toolbar>
      </q-card>
    </div>
    <div class="row">
      <q-card class="col-xs-12 col-md-12">
        <q-card-section class="col-xs-12 col-md-12">
          <div>
            <q-table class="my-sticky-dynamic" flat bordered :rows="listaCierre" :columns="columns" virtual-scroll  :virtual-scroll-item-size="48" :pagination="pagination" row-key="index" table-header-class="bg-primary text-white">
            </q-table>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import { jsPDF as Pdf } from 'jspdf'
import 'jspdf-autotable'
import json from '../json/dataLogo.json'

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
    name: 'index',
    label: 'N°',
    field: 'index'
  },
  {
    name: 'id_disloque',
    label: 'Disloque',
    align: 'left',
    field: 'id_disloque',
    sortable: false
  },
  {
    name: 'fecha_operaciones',
    label: 'Fecha',
    align: 'left',
    field: 'fecha_operaciones',
    sortable: false
  },
  {
    name: 'nombre_recaudador',
    label: 'Nombre Recaudador',
    align: 'left',
    field: 'nombre_recaudador',
    sortable: false
  },
  {
    name: 'turno',
    label: 'Turno',
    align: 'left',
    field: 'turno',
    sortable: false
  },
  {
    name: 'nombre_reten',
    label: 'Nombre reten',
    align: 'left',
    field: 'nombre_reten',
    sortable: false
  },
  {
    name: 'observacion',
    label: 'Observacion',
    align: 'left',
    field: 'observacion',
    sortable: false
  },
  {
    name: 'total_apertura',
    label: 'Total apertura',
    align: 'left',
    field: 'total_apertura',
    sortable: false
  },
  {
    name: 'total_cierre_recaudador',
    label: 'Total recaudado',
    align: 'left',
    field: 'total_cierre_recaudador',
    sortable: false
  },
  {
    name: 'Total cierre',
    label: 'Total cierre',
    align: 'left',
    field: 1,
    format: val => `${val != null ? val : 0}`,
    sortable: false
  }
]
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const url = ref('/transacciones/transaccionesRecaudadorRegionalFecha')
    const listReca = ref('/parametros/listaUsuariosDeRegional')
    const listaCierre = ref([])
    const listRegionales = ref([])
    const listRecaUsus = ref([])
    const retenes = ref([])
    const _storage = inject('storage')
    const base64Img = ref([])
    const reporte = ref({
      fecha: null,
      id_regional: null,
      id_recaudador: null
    })

    const listarReca = async (id) => {
      const row = await _http.get(`${listReca.value}/${id}`)
      listRecaUsus.value = row
      const listaReca = row
      listaReca.push({
        id_usuario: 0,
        usuario: 'Todos',
        id_regional: 0
      })
      listRecaUsus.value = listaReca
    }

    const listarRetenes = async () => {
      const row = await _http.post(`${url.value}`, reporte.value)
      listaCierre.value = row.lista_cierres
      // listRecaudadores.value = row.lista_recaudadores
      listaCierre.value.forEach((row, index) => {
        row.index = index + 1
      })
    }
    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }
    const datosDefault = () => {
      const fecha = new Date()
      reporte.value.id_regional = 3
      reporte.value.fecha = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate()
      listarReca(3)
      const listaReca = listRecaUsus.value
      listaReca.push({
        id_usuario: 0,
        usuario: 'Todos',
        id_regional: 0
      })
      listRecaUsus.value = listaReca
      reporte.value.id_recaudador = 0
    }
    const exportar = async () => {
      base64Img.value = json[0].logoBase64
      const usuario = _storage.get('usuario')
      const columns = [
        { title: 'N°', dataKey: 'index' },
        { title: 'Disloque', dataKey: 'id_disloque' },
        { title: 'Fecha', dataKey: 'fecha_operaciones' },
        { title: 'Nombre Recaudador', dataKey: 'nombre_recaudador' },
        { title: 'Turno', dataKey: 'turno' },
        { title: 'Nombre reten', dataKey: 'nombre_reten' },
        { title: 'Observacion', dataKey: 'observacion' },
        { title: 'Total apertura', dataKey: 'total_apertura' },
        { title: 'Total cierre sistema', dataKey: 'total_cierre_sistema' },
        { title: 'Total cierre recaudador', dataKey: 'total_cierre_recaudador' }
      ]
      const doc = new Pdf({
        orientation: 'landscape',
        unit: 'in',
        format: 'letter'
      })
      const totalPagesExp = '{total_pages_count_string}'
      doc.setFontSize(7)
      doc.autoTable({
        columns,
        body: listaCierre.value,
        margin: { left: 0.5, top: 1.25 },
        startY: 2.1,
        didDrawPage: function (data) {
          doc.setFontSize(16)
          doc.setTextColor(20)
          if (base64Img.value) {
            doc.addImage(base64Img.value, 'JPEG', data.settings.margin.left, 0.1, 1.5, 1.5)
          }
          doc.text('VIAS BOLIVIA', data.settings.margin.left + 5, 0.75, 'center')
          doc.setFontSize(7.7)
          doc.text('Entidad Renovada, Tecnificada y Transparente para una eficiente', data.settings.margin.left + 5, 0.9, 'center')
          doc.text('recaudación de Peaje y Control de Pesos y Dimensiones Vehiculares', data.settings.margin.left + 5, 1.05, 'center')
          doc.text('en la Red Vial Fundamental del Estado Plurinacional de Bolivia', data.settings.margin.left + 5, 1.2, 'center')
          doc.setFontSize(15)
          doc.text('REPORTE DE RECAUDACION POR TURNO REGIONAL Y RETEN', data.settings.margin.left + 5, 1.6, 'center')
          doc.setFontSize(9)
          doc.text('USUARIO: ', data.settings.margin.left + 0.1, 2)
          doc.text(usuario.usuario, data.settings.margin.left + 0.8, 2)
          doc.text('E-MAIL: ', data.settings.margin.left + 3, 2)
          doc.text(usuario.correoElectronico, data.settings.margin.left + 3.7, 2)
          doc.text('FECHA/HORA: ', data.settings.margin.left + 6.3, 2)
          doc.text(reporte.value.fecha, data.settings.margin.left + 7.3, 2)
          let str = 'Page' + doc.internal.getNumberOfPages()
          if (typeof doc.putTotalPages === 'function') {
            str = str + ' of ' + totalPagesExp
          }
          doc.setFontSize(6)
          const pageSize = doc.internal.pageSize
          const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
          doc.text(str, data.settings.margin.left, pageHeight - 0.5)
        }
      })
      if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp)
      }
      doc.save('reporteregional.pdf')
    }
    onMounted(async () => {
      listRegionales.value = _storage.get('regionales')
      datosDefault()
    })
    return {
      filters,
      url,
      listaCierre,
      retenes,
      listRegionales,
      listReca,
      // listRecaudadores,
      listRecaUsus,
      reporte,
      columns,
      getNombreCompleto,
      listarRetenes,
      listarReca,
      datosDefault,
      exportar,
      pagination: {
        rowsPerPage: 0
      }
    }
  },
  methods: {
    showregional (id) {
      if (id) {
        this.listarReca(id)
      }
    }
  }
}
</script>
