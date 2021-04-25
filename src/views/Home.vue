<template>
  <div class="home">
    <Header />
    <nav>
        <router-link class="active" :to="{name: 'Table'}">All Characters</router-link>
        <router-link :to="{name: 'FavoriteTable'}">Favorites</router-link>
    </nav>
    <main>
        <router-view />
    </main>
    <Pagination />
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Pagination from '@/components/Pagination.vue'

export default  {
  name: 'Home',
  components: {
    Header,
    Pagination,
    
  }
}
</script>


<style lang="scss" scoped>
    nav {
        margin: 0px 120px;
        text-align: left;
        padding: 20px 0px;

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
</style>