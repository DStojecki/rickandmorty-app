<template>
  <div class="home">
    <Header />
    <nav>
        <router-link :class="{active: !favouriteTable}" :to="{name: 'Table'}">All Characters</router-link>
        <router-link :class="{active: favouriteTable}" :to="{name: 'FavoriteTable'}">Favorites</router-link>
    </nav>
    <main>
        <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import {mapState} from 'vuex'
export default  {
    name: 'Home',
    computed: {
        ...mapState(["favouriteTable"]),
        headerHeight() {
            return document.querySelector("header").offsetHeight
        },
        navHeight() {
            return document.querySelector("nav").offsetHeight
        },
        tableHeaderHeight() {
            return document.querySelector("ul").offsetHeight
        },
        footerHeight() {
            return document.querySelector("footer").offsetHeight
        }
    },
    components: {
        Header,
        Footer,
    },
    mounted() {
        // Setting table height 
        const table = document.querySelector(".characters")
        const tableHeight = window.innerHeight - this.headerHeight - this.footerHeight - this.navHeight - this.tableHeaderHeight - 30
        this.$store.commit("changeTableHeight", tableHeight)
        table.style.height = this.tableHeight + "px"
        table.style.maxHeight = this.tableHeight + "px"
    },
}
</script>


<style lang="scss">
    nav {
        margin: 0px 120px;
        text-align: left;
        padding: 20px 0px 0px;
        height: 70px;
        a {
            margin-right: 80px;
            text-decoration: none;
            color: #A9B1BD;
            line-height: 1.2;
            font-size: 16px;
            &.active {
                border-bottom: 3px solid #11B0C8;
                color: #11B0C8;
            }
        }
    }
    .home {
        justify-content: flex-start;
        flex-wrap: wrap;
        max-width: 100vw;
        max-height: 100vh;
        width:100vw;
        height: 100vh;
        header {
            max-width: 100%;
            width:100%;
        }
        main {
            max-width: 100%;
            width:100%;
        }
        footer {
            position:absolute;
            bottom: 0;
            left: 0;
            width:100%;
            max-width: 100%;
            align-self: flex-end;
        }
    }

     @media(max-width: 1150px) {
        nav {
            margin: 0px 60px;
        }
    }

    @media(max-width: 500px) {
        nav {
            margin: 0px 40px;
        }
    }

       @media(max-width: 430px) {
           nav {
            margin: 0px 20px;

            a {
                margin-right: 40px;
            }
        }
       }
</style>