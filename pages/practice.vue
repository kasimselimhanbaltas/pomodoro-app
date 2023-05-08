<template>
  <h1>deneme</h1>  
  <button @click="mero" class="btn btn-secondary"> SELO </button>
</template>

<script lang="ts">
  
  // export default{

  //   methods: {
  //     mero() {
  //       console.log("mERLO")
  //     }
  //   }
  // }

</script>

<script setup lang="ts">
import { useMainStore } from "../stores/store.js";
import { denemeMetod } from "../firebase/deneme.js"


const store = useMainStore()
console.log(store.logInVar)

</script>

<style>

</style>