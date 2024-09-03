<template>
  <section>
    <q-chip
      v-if="estado === 0"
      square
      color="info"
      text-color="white"
      label="ACTIVO"
    />
    <q-chip
      v-if="estado === 1"
      square
      color="warning"
      text-color="white"
      label="INACTIVO"
    />
  </section>
</template>
<script>
export default {
  props: {
    estado: {
      type: String,
      default: () => 'habilitado'
    }
  }
}
</script>
