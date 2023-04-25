<template>
  <div id="mainContainer" class="contanier-fluid text-center">
    <div v-if="loggedIn">
      <h1 class="text-light">{{ loginResult.user.displayName }}, time is money, so spend it wisely.</h1>
      
    </div>
    <div id="innerContainer">
      <div id="mainNav" class="container-fluid d-flex justify-content-center position-absolute mt-3">
        <button @click="selectTimer" class="p-2"><h6>Timer</h6></button>
        <button @click="selectTasks" class="p-2"><h6>Tasks</h6></button>
        <button @click="selectSettings" class="p-2"><h6>Settings</h6></button>
        <button @click="loginWithGoogle" class="p-2"><h6>Log in</h6></button>
      </div>
      <Timer v-if="timer"></Timer>
      <Tasks v-if="tasks"></Tasks>
      <Settings v-if="settings"></Settings>
    </div>
  </div>
</template>


<script>
import { auth } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


export default {
  computed: {
  },

  data() {
    return {
      timer: true,
      tasks: false,
      settings: false,
      loggedIn: false,
      loginResult : {},
      
    };
  },
  mounted() {
    
  },
  methods: {
    selectTimer() {
      console.log("timer")
      this.timer = true;
      this.tasks = false;
      this.settings = false;
    },
    selectTasks() {
      console.log("tasks")
      this.timer = false;
      this.tasks = true;
      this.settings = false;
    },
    selectSettings() {
      console.log("settings")
      this.timer = false;
      this.tasks = false;
      this.settings = true;
    },
    async loginWithGoogle() {
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider)
        .then(result => {
          console.log(result);
          this.loginResult = result;
          this.loggedIn = true;
        });
      } catch (error) {
        console.error(error);
      }
    },

  }
};
</script>

<style>
#mainContainer {
  height: 100vh;
  position: relative;
  background: url(@/assets/bg1.gif);
}
#innerContainer {
  opacity: 0.9;
  height: 70vh;
  width: 70vh;
  background-color: rgb(179, 135, 187);
  padding: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
#mainNav {
  top: 0;
  left: 0;
}
#mainNav button{
  background-color: transparent;
  border: none;
  margin-left: 4%;
  margin-right: 4%;
}
</style>