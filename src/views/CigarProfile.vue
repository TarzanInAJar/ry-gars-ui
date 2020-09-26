<template>
  <div class="home">
    Handle profile
  </div>
</template>

<script>

export default {
  name: 'CigarProfile',
  data: () => ({
    cigarInfo: null
  }),
  watch: {
    $route(to, from) {
      // react to route changes...
      console.log('route changed')
    }
  }
}
</script>
