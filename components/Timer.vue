<template>
  <div id="timerMain" class="fade-in " style="margin-top: 50%; transform: translateY(-50%);">
    <h2 v-if="!store.selectedTask" class="">Pomodoro</h2>
    <h2 v-if="store.selectedTask" class="">{{ store.selectedTask.name }}</h2>
    <div class="timer-container">
      <h2 id="timer" class="">
        <span class="clockChar">
          {{ remainingTime.substring(0,1) }}
        </span>
        <span class="clockChar">
          {{ remainingTime.substring(1,2) }}
        </span>
        <span class="clockChar px-1" style="width: 3vh !important;">
          {{ remainingTime.substring(2,3) }}
        </span>
        <span class="clockChar">
          {{ remainingTime.substring(3,4) }}
        </span>
        <span class="clockChar">
          {{ remainingTime.substring(4,5) }}
        </span>
      </h2>
    </div>
    <div id="controls">
      <button
        v-show="!buttonControlVar"
        id="startTimer"
        class="btn btn-primary px-3 m-2"
        @click="startTimer()"
      >
        <p class="m-0 p-0">START</p>
      </button>
      <button
        v-show="buttonControlVar && !pauseControlVar"
        id="pauseTimer"
        class="btn btn-primary px-3 m-2"
        @click="pauseTimer()"
      >
        <p class="m-0 p-0">PAUSE</p>
      </button>
      <button
        v-show="buttonControlVar && pauseControlVar"
        id="resumeTimer"
        class="btn btn-primary px-3 m-2"
        @click="resumeTimer()"
      >
        <p class="m-0 p-0">RESUME</p>
      </button>
      <button
        v-show="buttonControlVar"
        id="resetTimer"
        class="btn btn-primary px-3 m-2"
        @click="resetTimer()"
      >
        <p class="m-0 p-0">RESET</p>
      </button>
    </div>
    <h5 v-if="!store.selectedTask" class="successfulPomodorosElement mt-3" >
      Successful Pomodoros: {{ successfulPomodorosC }}
    </h5>
    
    <h5 v-if="store.selectedTask" class="successfulPomodorosElement mt-3" >
      Successful Pomodoros: {{ store.selectedTask.successfulPomodoros }} / {{ store.selectedTask.estimatedPomodoros }}
    </h5>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMainStore } from '~/stores/store';
import { updateTasks } from '~/firebase/config.js'

const store = useMainStore();

  let remainingTime = ref("00:00");
  const defaultMinutes = 5
  const defaultSeconds = 0
  let minutes = 5
  let seconds = 0
  let timerLock = 1
  let successfulPomodorosC = 0
  let buttonControlVar = ref(false) // 0: start | 1: active timer -> pause, resume, reset
  let pauseControlVar = ref(false) // 0: running | 1: paused

  onMounted(() => {
    remainingTime.value = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    setInterval(() => {
      if (timerLock === 0) {
        // Timer work permission
        if (seconds === 0) {
          if (minutes === 0) {
            // Time is up
            console.log("SESSION SUCCEED");
            successfulPomodorosC += 1;
            timerLock = 1;
            buttonControlVar.value = false;
            pomodoroComplete(store.selectedTask);
          } else {
            // 1 minute passed
            minutes -= 1;
            seconds = 59;
          }
        } else {
          // 1 second passed
          seconds -= 1;
        }
        remainingTime.value = `${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      }
    }, 1);
  })
  async function pomodoroComplete(task) {
    if(task) { // a task has selected
      store.tasksOfUser[store.tasksOfUser.indexOf(task)].successfulPomodoros += 1;
      await updateTasks(store.loggedUser.uid, store.tasksOfUser);
    }
    else { // no task selected

    }
  }
    
  function startTimer(){
    minutes = defaultMinutes;
    seconds = defaultSeconds;
    timerLock = 0;
    buttonControlVar.value = true;
  }
  function pauseTimer(){
    timerLock = 1;
    pauseControlVar.value = true;
  }
  function resumeTimer(){
    timerLock = 0;
    pauseControlVar.value = false;
  }
  function resetTimer(){
    minutes = defaultMinutes;
    seconds = defaultSeconds;
    timerLock = 1;
    buttonControlVar.value = false;
    remainingTime.value = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
</script>

<style>
#timer-main {
  margin-top: 50%;
}
.timer-container{
  width: 35vh;
  font-family: 'Technology';
  background-color: #94a1b2;
  border-radius: 10px;
  margin-left: auto; margin-right: auto;
}
#timer{
  display: inline-block;
  margin: 0 auto;
  text-align: left;
  font-size: 100px;
  letter-spacing: 10px;
  padding: 0;
}
.clockChar {
  display: inline-block;
  width: 6vh;
  text-align: center;
}
@font-face{
 font-family:'Technology';
 src: url('../assets/fonts/Technology-Bold.ttf');
}

</style>