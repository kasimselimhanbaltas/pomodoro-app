<template>
  <h1 class="mt-5 pt-5">Pomodoro</h1>
      <h2 id="timer" class="">{{ remainingTime }}</h2>
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
      <h3 id="successfulPomodorosElement">
        Successful Pomodoros: {{ successfulPomodoros }}
      </h3>
</template>

<script>
export default {
  data() {
    return {
      remainingTime: "00:00",
      defaultMinutes: 5,
      defaultSeconds: 0,
      minutes: 5,
      seconds: 0,
      timerLock: 1,
      successfulPomodoros: 0,
      buttonControlVar: false, // 0: start | 1: active timer -> pause, resume, reset
      pauseControlVar: false, // 0: running | 1: paused
    };
  },
  mounted() {
    this.remainingTime = `${this.minutes
      .toString()
      .padStart(2, "0")}:${this.seconds.toString().padStart(2, "0")}`;
    setInterval(() => {
      if (this.timerLock === 0) {
        console.log(this.minutes, this.seconds);
        // Timer work permission
        if (this.seconds === 0) {
          if (this.minutes === 0) {
            // Time is up
            console.log("SESSION SUCCEED");
            this.successfulPomodoros += 1;
            this.timerLock = 1;
            this.buttonControlVar = false;
          } else {
            // 1 minute passed
            this.minutes -= 1;
            this.seconds = 60;
          }
        } else {
          // 1 second passed
          this.seconds -= 1;
        }
        this.remainingTime = `${this.minutes
          .toString()
          .padStart(2, "0")}:${this.seconds.toString().padStart(2, "0")}`;
      }
    }, 10);
  },
  methods: {
    startTimer() {
      this.minutes = this.defaultMinutes;
      this.seconds = this.defaultSeconds;
      this.timerLock = 0;
      this.buttonControlVar = true;
    },
    pauseTimer() {
      this.timerLock = 1;
      this.pauseControlVar = true;
    },
    resumeTimer() {
      this.timerLock = 0;
      this.pauseControlVar = false;
    },
    resetTimer() {
      this.minutes = this.defaultMinutes;
      this.seconds = this.defaultSeconds;
      this.timerLock = 1;
      this.buttonControlVar = false;
      this.remainingTime = `${this.minutes
        .toString()
        .padStart(2, "0")}:${this.seconds.toString().padStart(2, "0")}`;
    },
  },
};
</script>

<style>
#mainContainer {
  height: 100vh;
  position: relative;
  background: url(@/assets/bg1.gif);
}
#innerContainer {
  height: 70vh;
  width: 70vh;
  background-color: rgb(179, 135, 187);
  padding: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
</style>