<template>
  <div id="mainContainer" class="contanier-fluid text-center">
    <div
      id="mainNav"
      class="container-fluid shadow d-flex justify-content-center pt-3"
    >
      <button @click="selectTimer" class="p-2"><h6>Timer</h6></button>
      <button v-if="myStore.logInVar" @click="selectTasks" class="p-2">
        <h6>Tasks</h6>
      </button>
      <button @click="selectSettings" class="p-2"><h6>Settings</h6></button>
      <button @click="loginButtonClicked" class="p-2">
        <h6 v-if="myStore.logInVar">Switch Acc</h6>
        <h6 v-else>Log in</h6>
      </button>
    </div>
    <div v-if="myStore.logInVar">
      <h1 class="text-light fade-in">
        {{ myStore.loggedUser.displayName }}, time is money, so use it wisely.
      </h1>
    </div>

    <div id="innerContainer" class="fade-in shadow">
      <div id="innerContent">
        <div>
          <Timer v-if="timer"></Timer>
          <Tasks v-if="tasks"></Tasks>
          <Settings v-if="settings"></Settings>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "~/stores/store";
const myStore = useMainStore();

import { loginWithGoogle, saveUser, getTasks } from "../firebase/config.js";
import { ref, onMounted } from "vue";

let timer = ref(true);
let tasks = ref(false);
let settings = ref(false);
let loginResult = ref(null);

async function loginButtonClicked() {
  try {
    const result = await loginWithGoogle();
    if (result.displayName !== undefined) {
      myStore.setLoggedUser(result);
      myStore.logInVar = true;
      myStore.tasksOfUser = await getTasks(myStore.loggedUser.uid);
      console.log("storetasks: ", myStore.tasksOfUser);
    }

    await saveUser(myStore.loggedUser.uid);
  } catch (error) {
    console.log("LoginButton error: ", error);
  }
}
function selectTimer() {
  // console.log("timer")
  timer.value = true;
  tasks.value = false;
  settings.value = false;
}
function selectTasks() {
  // console.log("tasks")
  timer.value = false;
  tasks.value = true;
  settings.value = false;
}
function selectSettings() {
  // console.log("settings")
  timer.value = false;
  tasks.value = false;
  settings.value = true;
}
</script>

<style>
#mainContainer {
  height: 100vh;
  position: relative;
  background-color: #16161a;
  color: #fffffe;
}
#innerContainer {
  opacity: 0.9;
  height: 70vh;
  width: 70vh;
  background-color: #242629;
  padding: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  border-radius: 20px;
}
.btn,
.btn-primary,
.btn-success {
  background-color: #7f5af0 !important;
  border-color: #7f5af0 !important;
}
#mainNav {
  top: 0;
  left: 0;
  z-index: 1;
}
#mainNav button {
  background-color: transparent;
  border: none;
  margin-left: 4%;
  margin-right: 4%;
  color: #fffffe;
}
#innerContent {

}
.fade-in {
  animation: fadeIn 1s;
  -webkit-animation: fadeIn 1s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>