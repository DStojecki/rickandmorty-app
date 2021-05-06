<template>
  <div id="app">
    <Home />
  </div>
</template>


<script>

import Home from "./views/Home"

export default {
    components: { Home },

    created() {
        const item = localStorage.getItem("favouriteCharacters")

        switch (item) {
            case null:
                localStorage.setItem("favouriteCharacters", "[]")

            default: 
                return
        }
    }
}
</script>

<style lang="scss">

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Poppins, Avenir, Helvetica, Arial, sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #A9B1BD;
}

body {
    scrollbar-face-color: #000000;
    scrollbar-shadow-color: #2D2C4D;
    scrollbar-highlight-color:#7D7E94;
    scrollbar-3dlight-color: #7D7E94;
    scrollbar-darkshadow-color: #2D2C4D;
    scrollbar-track-color: #7D7E94;
    scrollbar-arrow-color: #C1C1D1; 
}


</style>


