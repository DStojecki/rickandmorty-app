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




</style>


