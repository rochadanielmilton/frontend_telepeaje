import { boot } from 'quasar/wrappers'
import axios from 'axios'

const AUTH_URL = process.env.AUTH_URL
// const AUTH_URL = 'http://190.129.122.93:8000'

export default boot(({ app, router, store }) => {
  const _storage = app.config.globalProperties.$storage
  const _store = store
  const _message = app.config.globalProperties.$message

  const login = async (params) => {
    try {
      const { data } = await axios.post(`${AUTH_URL}/login`, params)
      const respuesta = data
      const usuario = {
        usuario: respuesta.user.username,
        nombres: respuesta.user.username,
        primerApellido: respuesta.user.first_name,
        segundoApellido: respuesta.user.last_name,
        correoElectronico: respuesta.user.email,
        rol: respuesta.roles[0]?.name ?? 'Sin rol'
        // rol: roles[0]?.nombre ?? 'Sin rol'
        // entidad: respuesta.entidad.nombre
      }
      _storage.setUsuario(usuario)
      _storage.set('roles', respuesta.roles)
      // _storage.set('roles', roles)
      // _storage.set('menu', menu)
      _storage.set('menu', respuesta.menu)
      // _storage.set('permisos', respuesta.permisos)
      _storage.set('token', respuesta.token)
      _storage.set('login_local', true)
      // _storage.set('imgUrl', `${process.env.IMG_URL}`)

      initStore()
      let rutaInicial = '/app/'
      if (respuesta.menu.length > 0) {
      // if (menu.length > 0) {
        rutaInicial += respuesta.menu[0].ruta
        // rutaInicial += menu[0].ruta
      }
      router.push(rutaInicial)
    } catch (error) {
      let mensaje = 'Ocurrio un error desconocido. login'
      if (error.response) {
        const { data } = error.response
        mensaje = data.mensaje
      }
      _message.error(mensaje)
    }
  }

  const loginCiudadania = async () => {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/codigo`)
    if (data.codigo) {
      _storage.set('oauth2_state', data.codigo || null)
      window.location.href = data.url
    }
  }

  const logout = async () => {
    cleanStore()
    try {
      if (!_storage.get('login_local')) {
        await logoutCiudadania()
      }
      cleanStore()
    } catch (error) {
      _message.error('Ocurrio un error al intentar cerrar su sesión')
    }
  }

  const logoutCiudadania = async () => {
    const codigo = _storage.get('oauth2_state')
    const usuario = _storage.get('usuario')
    if (codigo && usuario) {
      const { data } = await axios.post(`${process.env.BACKEND_URL}/logout`, { usuario, codigo })
      window.location.href = data.url
    }
  }

  const logoutSistema = async () => {
    cleanStore()
  }

  const cleanStore = () => {
    _storage.removeUsuario()
    _storage.remove('roles')
    _storage.remove('menu')
    _storage.remove('permisos')
    _storage.remove('token')
    _storage.remove('rutas')
    _storage.remove('regionales')
    _storage.remove('categorias')
    _storage.remove('localidades')
    _storage.remove('grupo')
    _storage.remove('tipoContingencias')
    _storage.remove('menu')
    _storage.remove('pempadronamiento')
    _storage.remove('listaC')
    _storage.remove('retenes')
    _store.commit('global/setUsuario', {})
    _store.commit('global/setRoles', [])
    _store.commit('global/setMenu', [])
    _store.commit('global/setPermisos', [])
    _storage.remove('login_local')
    router.push('/')
  }

  const initStore = () => {
    _store.commit('global/setUsuario', _storage.getUsuario())
    _store.commit('global/setRoles', _storage.get('roles'))
    _store.commit('global/setMenu', _storage.get('menu'))
    _store.commit('global/setPermisos', _storage.get('permisos'))
  }

  app.config.globalProperties.$auth = {
    cleanStore,
    initStore,
    login,
    loginCiudadania,
    logout,
    logoutCiudadania,
    logoutSistema

  }

  app.provide('auth', {
    cleanStore,
    initStore,
    login,
    loginCiudadania,
    logout,
    logoutCiudadania
  })
})

//
