<template>
  <h3>Tasks</h3>
  <div v-for="task in tasks" :key="task">
    {{ task.name }}
  </div>
</template>

<script>
export default {
  data() {
    return{

    }
  },

}
</script>

<style>

</style>