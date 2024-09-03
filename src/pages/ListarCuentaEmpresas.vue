<template>
  <q-page>
    <Titulo
      titulo="Entidad Empresa Detalle"
      icono="business"
    ></Titulo>
      <q-card>
        <div class="q-pa-md">
        <q-btn
              icon="add"
              color="secondary"
              @click="$router.replace('/app/vehiculos')"
              label="Agregar Vehiculo"
        ></q-btn>
        </div>
              <div class="q-pa-md">
          DATOS DE LA EMPRESA
          </div>
      <div class="q-pa-md">
        <div class="row">
          <div class="col-xs-12 col-md-6">
         <q-field outlined label="Codigo" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{ empresa.id_entidad_empresa }}</div>
            </template>
         </q-field>
         </div>
            <div class="col-xs-12 col-md-6" >
         <q-field outlined label="Cuenta" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{ empresa.id_cuenta }}</div>
            </template>
         </q-field>
            </div>
            <div class="col-xs-12 col-md-6">
           <q-field outlined label="Punto Empadronamiento" stack-label>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{ empresa.id_punto_empadronamiento }}</div>
              </template>
           </q-field>
              </div>
          <div class="col-xs-12 col-md-6">
           <q-field outlined label="Regional" stack-label>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{ empresa.nombre_regional }}</div>
              </template>
           </q-field>
              </div>
          <div class="col-xs-12 col-md-6">
           <q-field outlined label="Razon social" stack-label>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{ empresa.razon_social }}</div>
              </template>
           </q-field>
              </div>
                    <div class="col-xs-12 col-md-6">
           <q-field outlined label="Nit" stack-label>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{ empresa.nit }}</div>
              </template>
           </q-field>
              </div>
                          <div class="col-xs-12 col-md-6">
             <q-field outlined label="Nombre" stack-label>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ empresa.nombre }}</div>
                </template>
             </q-field>
                </div>
                      <div class="col-xs-12 col-md-6">
             <q-field outlined label="Direccion" stack-label>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ empresa.direccion }}</div>
                </template>
             </q-field>
                </div>
                        <div class="col-xs-12 col-md-6">
               <q-field outlined label="Sector" stack-label>
                  <template v-slot:control>
                    <div class="self-center full-width no-outline" tabindex="0">{{ empresa.sector }}</div>
                  </template>
               </q-field>
                  </div>
              <div class="col-xs-12 col-md-6">
               <q-field outlined label="Tipo Empresa " stack-label>
                  <template v-slot:control>
                    <div class="self-center full-width no-outline" tabindex="0">{{ empresa.tipo_empresa }}</div>
                  </template>
               </q-field>
                  </div>
                      <div class="col-xs-12 col-md-6">
                 <q-field outlined label="Correo" stack-label>
                    <template v-slot:control>
                      <div class="self-center full-width no-outline" tabindex="0">{{ empresa.correo }}</div>
                    </template>
                 </q-field>
                    </div>
                <div class="col-xs-12 col-md-6">
                 <q-field outlined label="Telefono" stack-label>
                    <template v-slot:control>
                      <div class="self-center full-width no-outline" tabindex="0">{{ empresa.telefono }}</div>
                    </template>
                 </q-field>
                </div>
                  <div class="col-xs-12 col-md-6">
                   <q-field outlined label="Celular" stack-label>
                      <template v-slot:control>
                        <div class="self-center full-width no-outline" tabindex="0">{{ empresa.celular }}</div>
                      </template>
                   </q-field>
                  </div>
                    <div class="col-xs-12 col-md-6">
                     <q-field outlined label="Fecha Creaccion" stack-label>
                        <template v-slot:control>
                          <div class="self-center full-width no-outline" tabindex="0">{{ empresa.created }}</div>
                        </template>
                     </q-field>
                    </div>
                    <div class="col-xs-12 col-md-6">
                     <q-field outlined label="Saldo" stack-label>
                        <template v-slot:control>
                          <div class="self-center full-width no-outline" tabindex="0">{{ saldo_cuenta }}</div>
                        </template>
                     </q-field>
                    </div>
      </div>
      </div>
        <div class="q-pa-md">
          DATOS DEL CONTRATO
        </div>
  <div style="display: flex; justify-content: space-between;">
    <div class="q-pa-md" style="width:50%;">
        <div class="q-gutter-md" style="max-width: 300px">
          <q-field label="Fecha Inicio Contrato" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{ contrato.fecha_ini_contrato }}</div>
            </template>
          </q-field>
        </div>
      </div>
        <div class="q-pa-md" style="width: 50%;">
          <div class="q-gutter-md" style="max-width: 300px">
            <q-field label="Fecha Fin Contrato" stack-label>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{ contrato.fecha_fin_contrato }}</div>
              </template>
            </q-field>
          </div>
        </div>
  </div>
  <div class="q-pa-md">
      LISTADO DE VEHICULOS
      </div>
      <div class="q-pa-md">
        <div class="q-pa-md">
        <q-table
          title="Vehiculos"
          :rows="listVehiculos"
          :columns="columnsVehi"
          row-key="name"
        />
      </div>
      </div>
    </q-card>
    <!-- CrudTable
      :filters="filters"
      :columns="columns"
      :url="url"
      :order="'createdAt'"
    >
      <template v-slot:buttons="{ open }">
        <q-btn
          icon="add"
          color="secondary"
          @click="openModal(open)"
          label="Nueva Reten"
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
              {{ reten.id_reten ? 'Editar' : 'Agregar' }} reten
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
            <Reten
              v-model:valores="reten"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Reten>
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
              icon="visibility"
              @click="openModal(open, row.empresa.id_entidad_empresa)"
            />
          </q-td>
          <q-td>{{ row.id_cuenta }}</q-td>
          <q-td>{{ row.razon_social }}</q-td>
          <q-td>{{ row.direccion }}</q-td>
          <q-td>{{ row.sector }}</q-td>
          <q-td>{{ row.nit }}</q-td>
          <q-td>{{ row.tipo_empresa }}</q-td>
          <q-td>{{ row.id_regional }}</q-td>
          <q-td>{{ row.id_punto_empadronamiento }}</q-td>
          <q-td>{{ row.correo }}</q-td>
          <q-td>{{ row.telefono }}</q-td>
          <q-td>{{ row.celular }}</q-td>
        </q-tr>
      </template>
    </CrudTable-->
  </q-page>
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import CrudTable from '@components/common/CrudTable'
import Reten from 'components/Formularios/Reten'
import Estado from '@components/common/Estado'
import MapaView from '@components/common/MapaView'

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
    label: 'Dessert (100g serving)',
    align: 'left',
    field: 'nombre_categoria',
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'placa',
    align: 'center',
    label: 'Calories',
    field: 'placa',
    sortable: true
  },
  {
    name: 'marca',
    align: 'center',
    label: 'Calories',
    field: 'marca',
    sortable: true
  },
  {
    name: 'tipo',
    align: 'center',
    label: 'Calories',
    field: 'tipo',
    sortable: true
  },
  {
    name: 'clase',
    align: 'center',
    label: 'Calories',
    field: 'clase',
    sortable: true
  }
]
const columns = [
  {
    name: 'empresa.id_entidad_empresa',
    label: 'Opciones',
    sortable: false
  },
  {
    name: 'empresa.id_cuenta',
    label: 'Cuentas',
    sortable: false
  },
  {
    name: 'empresa.razon_social',
    label: 'Razon social',
    sortable: false
  },
  {
    name: 'empresa.direccion',
    label: 'Direccion',
    sortable: false
  },
  {
    name: 'empresa.sector',
    label: 'Sector',
    sortable: false
  },
  {
    name: 'empresa.nit',
    label: 'Nit',
    sortable: false
  },
  {
    name: 'empresa.tipo_empresa',
    label: 'T/E',
    sortable: false
  },
  {
    name: 'empresa.id_regional',
    label: 'Regional',
    sortable: false
  },
  {
    name: 'empresa.id_punto_empadronamiento',
    label: 'Punto empadronamiento',
    sortable: false
  },
  {
    name: 'empresa.correo',
    label: 'Correo',
    sortable: false
  },
  {
    name: 'empresa.telefono',
    label: 'Telefono',
    sortable: false
  },
  {
    name: 'empresa.celular',
    label: 'Celular',
    sortable: false
  }
]

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { CrudTable, Reten, Estado, MapaView },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')
    const url = ref('/empadronamiento/verEmpresa')
    const empresa = ref([])
    const listVehiculos = ref([])
    const contrato = ref([])
    const reten = ref({
      id_entidad_empresa: null,
      razon_social: null,
      nombre: null,
      direccion: null,
      sector: null,
      tipo_empresa: null,
      correo: null,
      interno_1: null,
      interno_2: null,
      telefono: null,
      celular: null,
      created: null,
      modified: null,
      nit: null,
      baja: null,
      id_punto_empadronamiento: null,
      id_cuenta: null,
      id_regional: null
    })
    const resetForm = () => {
      reten.value = {
        id_entidad_empresa: null,
        razon_social: null,
        nombre: null,
        direccion: null,
        sector: null,
        tipo_empresa: null,
        correo: null,
        interno_1: null,
        interno_2: null,
        telefono: null,
        celular: null,
        created: null,
        modified: null,
        nit: null,
        baja: null,
        id_punto_empadronamiento: null,
        id_cuenta: null,
        id_regional: null
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        reten.value = await _http.get(`${url.value}/${id}`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      reten.value.baja = 0
      if (reten.value.id_reten) {
        await _http.put(`${url.value}/${reten.value.id_reten}/`, reten.value)
        _message.success('Actualizacion realizada de manera correcta.')
      } else {
        await _http.post(`${url.value}/`, reten.value)
        _message.success('Registro realizado de manera correcta.')
      }
      await update()
      closeModal(close)
    }
    const getDataE = async () => {
      const rows = await _http.get(`${url.value}/121`)
      empresa.value = rows.empresa
      listVehiculos.value = rows.lista_vehiculos
      contrato.value = rows.contrato
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    onMounted(async () => {
      getDataE()
    })
    return {
      reten,
      filters,
      columns,
      url,
      empresa,
      listVehiculos,
      columnsVehi,
      contrato,
      closeModal,
      openModal,
      getNombreCompleto,
      guardar,
      getDataE
    }
  }
}
</script>
