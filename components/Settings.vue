<template>
  <div class="fade-in">
    <h1>settings</h1>
    <img src="./kratos.gif" class="w-100" alt="">
  </div>
</template>

<script >

</script>

<style>
.fade-in {
  animation: fadeIn 1s;
  -webkit-animation: fadeIn 1s;
}

@keyframes fadeIn {
  0% { 
    transform: translateX(-300%);
    opacity: 0;
  }
  100% { 
    transform: translateX(0);
    opacity: 1; 
  }
}
</style>