<template>
  <div class="home">
    <LoginComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginComponent from '@/components/content/LoginComponent.vue'

export default {
  name: 'HomeView',
  components: {
    LoginComponent
  }
}
</script>
