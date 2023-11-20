<script>
import { onMounted, ref } from 'vue';
export default {
  setup() {
    onMounted(() => {
      //this.$router.push('./Inicio')
    })
  }
}
</script>

<template>
  <!--Para cambio de Pestalla en vue3-->
  <router-view ></router-view>
</template>
<style></style>