<template>
  <section>
    <q-chip
      v-if="is_active === true"
      square
      color="info"
      text-color="white"
      label="ACTIVO"
    />
    <q-chip
      v-if="is_active === false"
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
    is_active: {
      type: String,
      default: () => 'ACTIVO'
    }
  }
}
</script>
