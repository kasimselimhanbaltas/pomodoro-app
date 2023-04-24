<template>
  <head>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
  </head>
  <div>
    <NuxtPage/>
  </div>  
</template>

<script>
export default {
  router: {
    extendRoutes(routes, resolve) {
      return [
        {
          name: 'main',
          path: '/Pomodoro', // <--- change this
          component: resolve(__dirname, 'pages/about/index.vue'),
          chunkName: 'pages/about/index'
        },
      ]
    }
  }

}

</script>