<template>
  <div id="mainContainer" class="contanier-fluid bg-danger text-center">
    <div id="innerContainer">
      <h1 class="mt-5 pt-5">Pomodoro</h1>
      <h2 id="timer" class="">{{ remainingTime }}</h2>
      <div id="controls">
        <button
          id="startTimer"
          class="btn btn-primary px-3 m-2"
          @click="startTimer()"
        >
          Start
        </button>
        <button
          id="pauseTimer"
          class="btn btn-primary px-3 m-2"
          @click="pauseTimer()"
        >
          Pause
        </button>
        <button
          id="resumeTimer"
          class="btn btn-primary px-3 m-2"
          @click="resumeTimer()"
        >
          Resume
        </button>
        <button
          id="resetTimer"
          class="btn btn-primary px-3 m-2"
          @click="resetTimer()"
        >
          Reset
        </button>
      </div>
      <h3 id="successfulPomodorosElement">Successful Pomodoros: {{ successfulPomodoros }}</h3>
    </div>
  </div>
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
    },
    pauseTimer() {
      this.timerLock = 1;
    },
    resumeTimer() {
        
      this.timerLock = 0;
    },
    resetTimer() {
      this.minutes = this.defaultMinutes;
      this.seconds = this.defaultSeconds;
      this.timerLock = 1;
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
}
#innerContainer {
    height: 70vh;
    width: 70vh;
    background-color: orangered;
    padding: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
}
</style>