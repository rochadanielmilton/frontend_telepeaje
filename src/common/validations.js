'use strict'

export default {
  correo: v => {
    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    return re.test(String(v).toLowerCase()) || !v || 'El correo no es válido.'
  },
  url: v => {
    return /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/.test(v) || !v || 'Introduzca una URL válida'
  },
  contrasena: v => v.length >= 6 || !v || 'Debe tener al menos 10 carácteres.',
  requerido: v => !!v || 'El campo es requerido.',
  minimoOcho: v => v.length > 8 || !v || 'Debe tener mas de 8 carácteres.',
  minimoUno: v => v.length >= 1 || !v || 'Select at least 1 option.',
  maximoDos: v => v.length < 3 || !v || 'Select max 3 choices.',
  telefono: v => {
    const re = /^[0-9]/
    return (re.test(String(v).toLowerCase()) && v.length === 8) || !v || 'Introduzca un numero de celular válido.'
  },
  telefono2: v => {
    const re = /^[0-9]/
    return (re.test(String(v).toLowerCase()) && v.length <= 8) || !v || 'Introduzca un numero de telefono válido.'
  },
  telefonoOcel: v => {
    const re = /^[0-9]/
    return (re.test(String(v).toLowerCase()) && v.length >= 6) || !v || 'Introduzca un numero de telefono o celular válido.'
  },
  letras: v => {
    const re = /^[a-zñÑáéíóú]/
    return re.test(String(v).toLowerCase()) || !v || 'Solo se permiten letras.'
  },
  numeros: v => {
    const re = /^\d+$/g
    return re.test(String(v)) || !v || 'Solo se permiten números enteros.'
  },
  decimales: v => {
    const re = /^\d{0,2}(.\d{0,2}){0,1}$/g
    return re.test(String(v)) || !v || 'Solo se permiten números decimales.'
  },
  soloNumeros: v => {
    const re = /^[0-9]/
    return re.test(String(v)) || !v || 'Solo se permiten números.'
  },
  numMaxLetrasMenu: v => {
    const maxLetrasPermitidas = 100
    if (/^[A-Za-z\s]+$/.test(v) && v.length <= maxLetrasPermitidas) {
      return true
    } else {
      return `Solo se permiten letras y máximo ${maxLetrasPermitidas} caracteres en este campo`
    }
  },
  numMaxLetrasMaxNum: v => {
    const maxLetrasPermitidas = 255
    if (/^[A-Za-z\s]+$/.test(v) && v.length <= maxLetrasPermitidas) {
      return true
    } else {
      return `Solo se permiten letras y máximo ${maxLetrasPermitidas} caracteres en este campo`
    }
  },
  // validacion entidad persona
  numMaxLetrasNompP: v => {
    const maxLetrasPermitidas = 30
    if (/^[A-Za-z\s]+$/.test(v) && v.length <= maxLetrasPermitidas) {
      return true
    } else {
      return `Solo se permiten letras y máximo ${maxLetrasPermitidas} caracteres en este campo`
    }
  },
  numDirec: v => {
    const maxLetrasPermitidas = 100
    if (/^[A-Za-z\s]+$/.test(v) && v.length <= maxLetrasPermitidas) {
      return true
    } else {
      return `Solo se permiten letras y máximo ${maxLetrasPermitidas} caracteres en este campo`
    }
  },
  numMaxLetrasApellidosP: v => {
    const maxLetrasPermitidas = 20
    if (/^[A-Za-z\s]+$/.test(v) && v.length <= maxLetrasPermitidas) {
      return true
    } else {
      return `Solo se permiten letras y máximo ${maxLetrasPermitidas} caracteres en este campo`
    }
  },
  // validaciones usuarios
  numMaxLetrasPass: v => {
    const maxLetrasPermitidas = 128
    if (/^[A-Za-z\s]+$/.test(v) && v.length <= maxLetrasPermitidas) {
      return true
    } else {
      return `Solo se permiten letras y máximo ${maxLetrasPermitidas} caracteres en este campo`
    }
  },
  numMaxLetrasNomAcc: v => {
    const maxLetrasPermitidas = 150
    if (/^[A-Za-z\s]+$/.test(v) && v.length <= maxLetrasPermitidas) {
      return true
    } else {
      return `Solo se permiten letras y máximo ${maxLetrasPermitidas} caracteres en este campo`
    }
  },
  numCi: v => {
    const re = /^[0-9]/
    return (re.test(String(v).toLowerCase()) && v.length > 5) || !v || 'Introduzca un número de cedula de indentidad válida.'
  },
  numCiExede: v => {
    const re = /^[0-9]/
    return (re.test(String(v).toLowerCase()) && v.length < 30) || !v || 'Su ci execede el numero permito de caracteres.'
  },
  numMaxDirec: v => {
    const maxLetrasPermitidas = 30
    if (/^[A-Za-z\s]+$/.test(v) && v.length <= maxLetrasPermitidas) {
      return true
    } else {
      return `Solo se permiten letras y máximo ${maxLetrasPermitidas} caracteres en este campo`
    }
  },
  // minimo de caracteres tag
  minimoCaracteresTag: v => v.length > 18 || !v || 'Debe tener mas de 18 carácteres.',

  minimoCaracteres: v => v.length >= 4 || !v || 'Debe tener 4 o mas carácteres para qie sea valido.',
  // cargos
  maximoCaracteres: v => v.length < 81 || !v || 'Llego al maximo de caracteres permitidos en este campo.',

  maximoCaracteresEf: v => v.length < 100 || !v || 'Llego al maximo de caracteres permitidos en este campo.',

  maximoCaracteresCr: v => v.length < 254 || !v || 'Llego al maximo de caracteres permitidos en este campo.'

}
