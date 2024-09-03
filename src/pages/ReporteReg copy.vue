<template>
  <q-page>
    <Titulo titulo="Recaudacion por Regional y Reten" icono="file_copy"></Titulo>
    <div class="col-xs-12">
      <q-card class="q-ma-md">
        <q-toolbar inset class="q-gutter-md q-px-md q-pb-md">
          <div class="col-xs-12 col-md-12">
            <q-form class="row col-xs-12 col-md-12" method="post" @submit="listarRetenes()">
              <q-select v-model="reporte.id_regional" :options="listRegionales" option-value="id_regional"
                option-label="nombre_regional" class="col-xs-12 col-md-5" label="Regional" map-options emit-value>
              </q-select>
              <q-input filled class="col-xs-12 col-md-5" label="Fecha" v-model="reporte.fecha">
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
              <q-btn icon="search" color="secondary" type="Submit" label="Buscar" class="col-xs-12 col-md-1">
                <!-- q-tooltip>{{ enableSearch ? 'Cerrar filtros' : 'Abrir filtros' }}</q-tooltip-->
              </q-btn>
              <q-btn icon="download" color="secondary" label="Exportar" class="col-xs-12 col-md-1"
                @click="exportar()"></q-btn>
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
            <q-table :rows="listRetenes" :columns="columns" virtual-scroll :virtual-scroll-item-size="48"
              :pagination="pagination" row-key="index">
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td v-for="col in props.cols" :key="col.name" :props="props">
                    {{ col.value }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
            <q-space />
            <q-field outlined alig-self="right" label="RECAUDACIÓN TOTAL:" stack-label class="col-xs-12 col-md-4">
              {{ totalRecaudado }}
            </q-field>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div style="width:60px; height: 50px; border: 1px solid blue;">
          <img style="width:50px;" src="../assets/logoVias.png" />
        </div>
  </q-page>
  <template>
    <div id="reporte" class="row">
      <div class="col" style="float: left;">
        <div style="width:60px; height: 50px; border: 1px solid blue;">
          <img style="width:50px;" src="../assets/logoVias.png" />
        </div>
      </div>
      <div class="col" style="float: left;">
        <div style="width: 100px; height: 50px; text-align: center; color: #000; border: 1px solid red;">
          <div style=" font-size:7px; text-align: center; font-weight:bold;color: black;">
          VIAS BOLIVIA</div>
          <p style="font-size: 4px;">Entidad Renovada, Tecnificada y
            Transparente para una eficiente recaudación de
            Peaje y Control de Pesos y Dimensiones
            Vehiculares en la Red Vial Fundamental del
            Estado Plurinacional de Bolivia.</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div style="font-size:4px; text-align: center; font-weight:bold; color: black;">REPORTE...............
        </div>
        <table  id= "repoT" summary="Los grupos de música punk más famosos del Reino Unido" style="font-size:1px; border-collapse: collapse;">
  <thead>
    <tr>
      <th scope="col">Grupo</th>
      <th scope="col">Año de formación</th>
      <th scope="col">Número de álbumes</th>
      <th scope="col">Canción más conocida</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Buzzcocks</th>
      <td>1976</td>
      <td>9</td>
      <td>Ever fallen in love (with someone you shouldn't've)</td>
    </tr>
    <tr>
      <th scope="row">The Clash</th>
      <td>1976</td>
      <td>6</td>
      <td>London Calling</td>
    </tr>
    <tr>
      <th scope="row">The Stranglers</th>
      <td>1974</td>
      <td>17</td>
      <td>No More Heroes</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row" colspan="2">Número total de álbumes</th>
      <td colspan="2">77</td>
    </tr>
  </tfoot>
</table>
<table id="cabecera">
  <tr>
    <td>
      <div style="width:60px; height: 50px; border: 1px solid blue;">
          <img style="width:50px;" src="../assets/logoVias.png" />
        </div>
    </td>
    <td>
      <div style="width: 100px; height: 50px; text-align: center; color: #000; border: 1px solid red;">
          <div style=" font-size:7px; text-align: center; font-weight:bold;color: black;">
          VIAS BOLIVIA</div>
          <p style="font-size: 4px;">Entidad Renovada, Tecnificada y
            Transparente para una eficiente recaudación de
            Peaje y Control de Pesos y Dimensiones
            Vehiculares en la Red Vial Fundamental del
            Estado Plurinacional de Bolivia.</p>
        </div>
    </td>
  </tr>
</table>
    </div>
    <!--div>
      <div class="row">
        <div>
          <img style="width:50px;" src="../assets/logoVias.png" />
        </div>
        <div>
          <div style="font-size:7px;  text-align: center; font-weight:bold;color: black;">
            VIAS BOLIVIA</div>
          <div>
            <p>Entidad Renovada, Tecnificada y
              Transparente para una eficiente recaudación de
              Peaje y Control de Pesos y Dimensiones
              Vehiculares en la Red Vial Fundamental del
              Estado Plurinacional de Bolivia.</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="col-xs-10 col-md-7" style="width:150px; border: 1px solid red;">
          col-md-7
        </div>
        <div class="col-md-3">
          col-md-3
        </div>
      </div>
    </div-->
  </template>
</template>
<script>
import { ref, inject, onMounted } from 'vue'
import AsignarTag from 'components/Formularios/AsignarTag'
import Estado from '@components/common/Estado'
import { jsPDF as Pdf } from 'jspdf'
import 'jspdf-autotable'
import html2pdf from 'html2pdf.js'

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
    format: val => `${val != null ? val : 0}`,
    sortable: false
  }
]
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Estado, AsignarTag },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const url = ref('/transacciones/recaudacionNacionalRegionalFecha')
    const urlRecarga = ref('/empadronamiento/formularioRecarga')
    const empresa = ref([])
    const listRetenes = ref([])
    const listRegionales = ref([])
    const totalRecaudado = ref([])
    const contrato = ref([])
    const saldoCuenta = ref([])
    const _storage = inject('storage')
    const crudModal = ref(false)
    const recargaModal = ref()
    const tagModal = ref()
    const reasignarTag = ref(false)
    const resetForm = () => {

    }

    const reporte = ref({
      id_regional: null,
      fecha: null
    })

    const closeModal = (close) => {
      crudModal.value = false
      recargaModal.value = false
      tagModal.value = false
      resetForm()
      close()
    }

    const listarRetenes = async () => {
      const row = await _http.post(`${url.value}`, reporte.value)
      listRetenes.value = row.lista_cierres
      totalRecaudado.value = row.recaudacion_total
      listRetenes.value.forEach((row, index) => {
        row.index = index + 1
      })
      console.log(listRetenes.value)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }
    const exportar = () => {
      console.log('data export')
      /* const doc = new Pdf({
        orientation: 'portrait',
        unit: 'in',
        format: 'mm'
      }) */
      // const doc = new Pdf('l', 'mm', [1200, 1210])
      /* const doc = new Pdf('P', 'mm', [324, 419])
      const elementHTML = document.querySelector('#reporte').innerHTML
      doc.html(elementHTML, {
        callback: function (doc) {
          doc.save('output.pdf')
        },
        x: 10,
        y: 10
      }).css('border', '#d96557 1px solid')
      */
      /* doc.text('This is the default font.', 20, 20)
      doc.setFont('courier', 'normal')
      doc.text('This is courier normal.', 20, 30)

      doc.setFont('times', 'italic')
      doc.text('This is times italic.', 20, 40)

      doc.setFont('helvetica', 'bold')
      doc.text('This is helvetica bold.', 20, 50)

      doc.setFont('courier', 'bolditalic')
      doc.text('This is courier bolditalic.', 20, 60)

      doc.setFont('times', 'normal')
      doc.text('This is centred text.', 105, 80, null, null, 'center')
      doc.text('And a little bit more underneath it.', 105, 90, null, null, 'center')
      doc.text('This is right aligned text', 200, 100, null, null, 'right')
      doc.text('And some more', 200, 110, null, null, 'right')
      doc.text('Back to left', 20, 120)

      doc.text('10 degrees rotated', 20, 140, null, 10)
      doc.text('-10 degrees rotated', 20, 160, null, -10)
      doc.addImage('../assets/logo.png', 'JPEG', 15, 40, 180, 180) */
      // doc.save('a4.pdf')
      // generarPDF()
      /* const doc2 = new Pdf()
      doc2.autoTable({ html: '#cabecera' })
      doc2.save('table2.pdf') */
      const heading = 'REPORTE POR REGIONAL'
      const moreText = [
        'This is another few sentences of text to look at it.',
        'Just testing the paragraphs to see how they format.',
        'jsPDF likes arrays for sentences.',
        'Do paragraphs wrap properly?',
        'Yes, they do!',
        'What does it look like?',
        'Not bad at all.'
      ]
      /* const items = [
        { title: 'Item 1', body: 'I am item 1 body text' },
        { title: 'Item 2', body: 'I am item 2 body text' },
        { title: 'Item 3', body: 'I am item 3 body text' },
        { title: 'Item 4', body: 'I am item 4 body text' }
      ] */
      const usuario = _storage.get('usuario')
      // const moreText = 'FECHA DE OPERACIONES:'
      const datosCabecera = [
        ['USUARIO : ', usuario.usuario, 'E-MAIL : ', usuario.correoElectronico, 'FECHA/HORA : ', new Date().getFullYear()]
      ]
      const columns = [
        { title: 'Title', dataKey: 'id_regional' },
        { title: 'Body', dataKey: 'nombre_regional' }
      ]
      const doc = new Pdf({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter'
      })
      // const base64Img = 'http://localhost:8000/media/ImgVehiculos/estaciones.jpg'
      // const logo = require('../assets/logoVias.png')
      // const base64Img = new Image()
      // base64Img.src = logo
      doc.setFontSize(16).text(heading, 0.5, 1.0)
      doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1)
      const pageNumber = doc.internal.getNumberOfPages()
      doc.setPage(pageNumber)
      /* doc.autoTable({
        body: listRetenes.value,
        willDrawPage: function (data) {
          // Header
          doc.setFontSize(20)
          doc.setTextColor(40)
          doc.addImage(base64Img, 'PNG', 15, 15, 10, 10)
        },
        margin: { top: 30 }
      }) */
      doc.autoTable({
        body: datosCabecera,
        margin: { left: 0.5, top: 1.25 }
      })
      doc.text('10 degrees rotated', 20, 140, null, 10)
      doc
        .setFont('helvetica')
        .setFontSize(12)
        .text(moreText, 0.5, 3.5, { align: 'left', maxWidth: '7.5' })
      doc.autoTable({
        columns,
        body: listRetenes.value,
        margin: { left: 0.5, top: 1.25 },
        foot: [['RECAUDACION TOTAL', totalRecaudado.value]]
      })
      /* doc
        .setFont('helvetica')
        .setFontSize(12)
        .text(moreText, 0.5, 3.5, { align: 'rigth', maxWidth: '7.5' })
      /* doc
        .setFont('helvetica')
        .setFontSize(11)
        .setFontStyle('italic')
        .setTextColor(0, 0, 255)
        .text(
          'This is a simple footer located .5 inches from page bottom',
          0.5,
          doc.internal.pageSize.height - 0.5
        ) */
        .save(`${heading}.pdf`)
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
    const generarPDF = async () => {
      console.log('generar PDf')
      const row = await _http.post(`${url.value}`, reporte.value)
      console.log(row)
      // const html = '<body><div><div class="row">imagen ejemplo<div class="col"><img style="width:150px; position: absolute; top: 0px; left: 0px;" src="{% static ../assets/tele.png  %}" /><br></div></div></div>'
      const html = document.getElementById('reporte').innerHTML
      const pdfOptions = {
        margin: 10,
        filename: 'reporte_anual.pdf',
        image: { type: 'pdf', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }
      console.log('PDf', html)
      const worker = html2pdf().from(html).set(pdfOptions).outputPdf('my_doc.pdf')
      worker.save()
    }
    const IMG_URL = _storage.get('imgUrl')
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
      empresa,
      listRetenes,
      contrato,
      totalRecaudado,
      saldoCuenta,
      crudModal,
      recargaModal,
      tagModal,
      urlRecarga,
      reasignarTag,
      listRegionales,
      reporte,
      columns,
      IMG_URL,
      getNombreCompleto,
      closeModal,
      listarRetenes,
      datosDefault,
      exportar,
      generarPDF,
      pdfOptions,
      pagination: {
        rowsPerPage: 0
      }
    }
  }
}
</script>
