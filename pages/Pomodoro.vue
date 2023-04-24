<template>
  <div id="mainContainer" class="contanier-fluid text-center">
    <div id="innerContainer">
      <div id="mainNav" class="container-fluid d-flex position-absolute">
        
      </div>
      <Timer></Timer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  mounted() {
    
  },
  methods: {
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
  left: 50%;
}
</style>