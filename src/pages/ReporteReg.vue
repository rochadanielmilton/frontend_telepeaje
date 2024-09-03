<template>
  <q-page>
    <Titulo titulo="Recaudacion por Regional y Reten" icono="file_copy"></Titulo>
    <div class="col-xs-12">
      <q-card class="q-ma-md">
        <q-toolbar inset class="q-gutter-md q-px-md q-pb-md">
          <div class="col-xs-12 col-md-12">
            <q-form class="row col-xs-12 col-md-12 q-col-gutter-md q-col-gutter-y-md" method="post" @submit="listarRetenes()">
              <q-select v-model="reporte.id_regional" :options="listRegionales" option-value="id_regional"
                option-label="nombre_regional" class="col-xs-12 col-md-4" label="Regional" map-options emit-value>
              </q-select>
              <q-input filled class="col-xs-12 col-md-4" label="Fecha" v-model="reporte.fecha">
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
            <q-table class="my-sticky-dynamic"  flat bordered :rows="listRetenes" :columns="columns" virtual-scroll :virtual-scroll-item-size="48" :loading="loading"
              :pagination="pagination" row-key="index" table-header-class="bg-primary text-white">
              <!--template v-slot:body="props">
                <q-tr :props="props">
                  <q-td v-for="col in props.cols" :key="col.name" :props="props">
                    {{ col.value }}
                  </q-td>
                </q-tr>
              </template-->
              <template v-slot:body-cell="props">
              <q-td
                :props="props"
                :class="(props.row[0]=='RECAUDACIÓN TOTAL')?'bg-primary text-white':'bg-white text-black'"
              >
                {{props.value}}
              </q-td>
            </template>
            </q-table>
            <q-space />
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
    name: 'Reten',
    label: 'Reten',
    align: 'left',
    field: 0,
    sortable: false
  },
  {
    name: 'Total cierre',
    label: 'Total cierre',
    align: 'left',
    field: 1,
    format: val => `${val != null ? val : '0.00'}`,
    sortable: false
  }
]
export default {
  components: { },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const url = ref('/transacciones/recaudacionNacionalRegionalFecha')
    const urlRecarga = ref('/empadronamiento/formularioRecarga')
    const listRetenes = ref([])
    const listRegionales = ref([])
    const totalRecaudado = ref([])
    const _storage = inject('storage')
    const base64Img = ref([])
    const reporte = ref({
      id_regional: null,
      fecha: null
    })

    const listarRetenes = async () => {
      const row = await _http.post(`${url.value}`, reporte.value)
      listRetenes.value = row.lista_cierres
      totalRecaudado.value = row.recaudacion_total
      listRetenes.value.forEach((row, index) => {
        row.index = (row[0] === 'RECAUDACIÓN TOTAL') ? '' : index + 1
        row[1] = (row[1] === null) ? '0.00' : row[1]
      })
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }
    const exportar = async () => {
      base64Img.value = json[0].logoBase64
      const usuario = _storage.get('usuario')
      const columns = [
        { title: 'Regional/Reten', dataKey: 'id_regional' },
        { title: 'Total Cierre', dataKey: 'nombre_regional' }
      ]
      const doc = new Pdf({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter'
      })
      const totalPagesExp = '{total_pages_count_string}'
      doc.setFontSize(10)
      doc.autoTable({
        columns,
        body: listRetenes.value,
        margin: { left: 0.5, top: 1.25 },
        foot: [['RECAUDACION TOTAL', totalRecaudado.value === null ? '0.00' : totalRecaudado.value]],
        startY: 2.1,
        didDrawPage: function (data) {
          doc.setFontSize(16)
          doc.setTextColor(20)
          if (base64Img.value) {
            doc.addImage(base64Img.value, 'JPEG', data.settings.margin.left, 0.1, 1.5, 1.5)
          }
          doc.text('VIAS BOLIVIA', data.settings.margin.left + 3.7, 0.75, 'center')
          doc.setFontSize(7.7)
          doc.text('Entidad Renovada, Tecnificada y Transparente para una eficiente', data.settings.margin.left + 3.7, 0.9, 'center')
          doc.text('recaudación de Peaje y Control de Pesos y Dimensiones Vehiculares', data.settings.margin.left + 3.7, 1.05, 'center')
          doc.text('en la Red Vial Fundamental del Estado Plurinacional de Bolivia', data.settings.margin.left + 3.7, 1.2, 'center')
          doc.setFontSize(15)
          doc.text('REPORTE DE CIERRE DE CAJA', data.settings.margin.left + 3.7, 1.6, 'center')
          doc.setFontSize(9)
          doc.text('USUARIO: ', data.settings.margin.left + 0.1, 2)
          doc.text(usuario.usuario, data.settings.margin.left + 0.8, 2)
          doc.text('E-MAIL: ', data.settings.margin.left + 2.7, 2)
          doc.text(usuario.correoElectronico, data.settings.margin.left + 3.2, 2)
          doc.text('FECHA/HORA: ', data.settings.margin.left + 5.1, 2)
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

    const datosDefault = () => {
      const fecha = new Date()
      reporte.value.id_regional = 0
      reporte.value.fecha = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate()
    }
    const pdfOptions = {
      margin: 10,
      filename: 'reporte_anual.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    onMounted(async () => {
      const regionales = _storage.get('regionales')
      regionales.push({
        id_regional: 0,
        nombre_regional: 'Todos'
      })
      listRegionales.value = regionales
      datosDefault()
    })
    return {
      filters,
      url,
      listRetenes,
      totalRecaudado,
      urlRecarga,
      listRegionales,
      reporte,
      columns,
      getNombreCompleto,
      listarRetenes,
      datosDefault,
      exportar,
      pdfOptions,
      pagination: {
        rowsPerPage: 0
      }
    }
  }
}
</script>
