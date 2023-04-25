<template>
  <h3>Tasks of </h3>
  <div class="mt-1" v-for="task in tasks" :key="task">
    {{ task.name }}
  </div>
  <button @click="addTask" class="btn btn-primary px-4 py-2 mt-3"> <h6 class="m-0"> Add Task </h6></button>
</template>

<script>
// import { db } from "firebase";

export default {
  data() {
    return{
      taskName: 'deneme',
      successfulPomodoros: -1,
      estimatedPomodoros: 0,
      tasks: [
        {
          id: 1,
          name: "Front End Development",
          successfulPomodoros: 0,
          estimatedPomodoros: 99
        },
        {
          id: 2,
          name: "School Classes",
          successfulPomodoros: 0,
          estimatedPomodoros: 99
        }
      ],
    }
  },
  methods: {
    addTask() {
      db.collection('users').doc(this.$store.state.user.uid).collection('tasks').add({
        name: this.taskName,
        successfulPomodoros: this.successfulPomodoros,
        estimatedPomodoros: this.estimatedPomodoros
      })
      .then(() => {
        console.log('Task added successfully')
      })
      .catch((error) => {
        console.error('Error adding task: ', error)
      })
    }
  },



}
</script>

<style>

</style>