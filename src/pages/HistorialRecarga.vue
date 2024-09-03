<template>
  <q-page>
    <Titulo titulo="Historial de Recargaaas" icono="business"></Titulo>
    <q-card>
    <q-card-section class="text-left">
            <q-btn
              type="submit"
              color="primary"
              class="q-ml-sm"
              @click="tipoEntidad==='empresa'?$router.replace('/app/cuentaempresa'):$router.replace('/app/cuentapersona')"
            >
            <q-icon
              center
              name='reply'
            />
            </q-btn>
    </q-card-section>
      <!--div class="row">
        <q-card-section class="col-xs-12 col-md-12">
          <q-banner class="bg-primary text-white">
            DATOS DE LA EMPRESA
          </q-banner>
        </q-card-section>
        <q-card-section>
          <div class="container">
            <div class="row q-col-gutter-x-md q-col-gutter-y-md">
              <q-field outlined label="Codigo" stack-label class="col-xs-12 col-md-4">
                {{ empresa.id_entidad_empresa }}
              </q-field>
              <q-field outlined label="Cuenta" stack-label class="col-xs-12 col-md-4">
                {{ empresa.id_cuenta }}
              </q-field>
              <q-field outlined label="Regional" stack-label class="col-xs-12 col-md-4">
                {{ empresa.nombre_regional }}
              </q-field>
              <q-field outlined label="Razon social" stack-label class="col-xs-12 col-md-4">
                {{ empresa.razon_social }}
              </q-field>
              <q-field outlined label="Nit" stack-label class="col-xs-12 col-md-4">
                {{ empresa.nit }}
              </q-field>
              <q-field outlined label="Tipo Empresa " stack-label class="col-xs-12 col-md-4">
                {{ empresa.tipo_empresa }}
              </q-field>
              <q-field outlined label="Correo" stack-label class="col-xs-12 col-md-4">
                {{ empresa.correo }}
              </q-field>
              <q-field outlined label="Celular" stack-label class="col-xs-12 col-md-4">
                {{ empresa.celular }}
              </q-field>
              <q-field outlined label="Saldo" stack-label class="col-xs-12 col-md-4">
                {{ saldoCuenta }}
              </q-field>
            </div>
          </div>
        </q-card-section>
      </div-->
      <div class="row">
        <q-card-section class="col-xs-12 col-md-12">
          <div>
            <q-table :rows="listDepositos" :columns="columnsRecarga" :grid="grid" :filter="filter" row-key="id">
              <template v-slot:top-right="props">
                <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>

                <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                  @click="setFs(props)">
                  <q-tooltip>{{
                    props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen"
                  }}</q-tooltip>
                </q-btn>
                <div class="q-pa-sm q-gutter-sm">

                </div>
              </template>
              <template v-slot:body="props">
                <q-tr :props="props">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>
                <q-td auto-width>
                  <q-btn class="q-pa-xs" flat round icon="delete" color="negative"  @click="deleteRow(props.row)" />
                </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </q-card-section>
      </div>
    </q-card>
    <!--CrudTable
      :filters="filters"
      :columns="columns"
      :url="`${url}/${id}`"
      :order="'createdAt'"
    >
      <template v-slot:buttons="{ open }">
        <q-btn
          icon="add"
          color="secondary"
          @click="openModal(open)"
          label="Nuevo cargo"
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
              {{ cargo.id_cargo ? 'Editar' : 'Agregar' }} cargo
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
            <Cargo
              v-model:valores="cargo"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Cargo>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, open, eliminar, cambiarEstado }">
        <q-tr>
          <q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              icon="edit"
              @click="openModal(open, row.id_cargo)"
            />
            <q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminar({ url: `${url}/baja/${row.id_cargo}` })"
            />
          </q-td>
          <q-td>
            <q-toggle
              v-model="row.estado"
              color="primary"
              false-value="deshabilitado"
              true-value="habilitado"
              @click="cambiarEstado({ registro: row, url: `${url}/${row.id_cargo}/` })"
            />
          </q-td>
          <q-td>{{ row.nombre_cargo }}</q-td>
          <q-td>{{ row.descripcion }}</q-td>
          <q-td>{{ row.created.slice(0, 10) }}</q-td>
          <q-td>
            <Estado :estado="row.estado" />
          </q-td>
        </q-tr>
      </template>
    </CrudTable-->
  </q-page>
</template>

<script>
import { ref, inject, onMounted } from 'vue'

const filters = [
  {
    label: 'id_cuenta',
    field: 'id_cuenta',
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

const columnsRecarga = [
  {
    name: 'id_cuenta',
    required: true,
    label: 'Codigo Cuenta',
    align: 'left',
    field: 'id_cuenta',
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'Cuenta',
    required: true,
    label: 'Nombre Cuenta',
    align: 'left',
    field: 'nombre_cuenta',
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'Depositante',
    align: 'center',
    label: 'Depositante',
    field: 'nombre_depositante',
    sortable: true
  },
  {
    name: 'celular',
    align: 'center',
    label: 'Celular',
    field: 'celular',
    sortable: true
  },
  {
    name: 'monto_depositado',
    align: 'center',
    label: 'Monto Depositado',
    field: 'monto_depositado',
    sortable: true
  },
  {
    name: 'fecha_deposito',
    align: 'center',
    label: 'Fecha Deposito',
    field: 'fecha_deposito',
    format: val => `${val.slice(0, 10)}`,
    sortable: true
  },
  {
    name: 'tipo_pago',
    align: 'center',
    label: 'Tipo Pago',
    field: 'tipo_pago',
    sortable: true
  },
  {
    name: 'cuenta_bancaria',
    align: 'center',
    label: 'Cuenta Bancaria',
    field: 'cuenta_bancaria',
    sortable: true
  }
]

export default {
  components: { },
  name: 'Dashboard',
  setup (props) {
    const _http = inject('http')
    const _message = inject('message')
    const url = ref('/empadronamiento/historialRecargas')
    const listDepositos = ref([])
    const empresa = ref([])
    const _storage = inject('storage')
    const tipoEntidad = ref('')
    const depositos = ref({
      id: null,
      nombre_cuenta: null,
      nombre_depositante: null,
      celular: null,
      monto_depositado: null,
      comprobante_deposito: null,
      fecha_deposito: null,
      tipo_pago: null,
      cuenta_bancaria: null,
      id_usuario: null,
      id_cuenta: null
    })

    const resetForm = () => {
      depositos.value = {
        id: null,
        nombre_cuenta: null,
        nombre_depositante: null,
        celular: null,
        monto_depositado: null,
        comprobante_deposito: null,
        fecha_deposito: null,
        tipo_pago: null,
        cuenta_bancaria: null,
        id_usuario: null,
        id_cuenta: null
      }
    }

    const idCuenta = _storage.get('id_cuenta')
    const apellidos = _storage.get('apellido')
    console.log('@@@@@@apellido', apellidos, idCuenta)
    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        depositos.value = await _http.get(`${url.value}/${id}`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      depositos.value.baja = 0
      if (depositos.value.id_cargo) {
        await _http.put(`${url.value}/${depositos.value.id_cargo}/`, depositos.value)
        _message.success('Actualizacion realizada de manera correcta.')
      } else {
        await _http.post(`${url.value}/`, depositos.value)
        _message.success('Registro realizado de manera correcta.')
      }
      await update()
      closeModal(close)
    }

    const getData = async () => {
      const rows = await _http.get(`${url.value}/${idCuenta}`)
      empresa.value = rows.entidad
      listDepositos.value = rows.lista_depositos
    }
    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }
    onMounted(async () => {
      getData()
      tipoEntidad.value = _storage.get('tipoEntidad')
    })
    return {
      depositos,
      empresa,
      filters,
      columnsRecarga,
      url,
      listDepositos,
      tipoEntidad,
      closeModal,
      openModal,
      getNombreCompleto,
      getData,
      guardar
    }
  }
}
</script>
