<template>
    <div class="table">
        <ul>
            <li>Photo</li>
            <li>Character ID</li>
            <li>Name</li>
            <li>Gender</li>
            <li>Spiecies</li>
            <li>Last Episode</li>
            <li>Remove</li>
        </ul>
        
        <ApolloQuery class="characters" :query="require('../graphql/getFavouriteCharacters.gql')" :variables="{ids: ids}">
            <template v-slot="{ result: { loading, error, data } }">
                <div v-if="loading" class="loading apollo">Loading...</div>
                
                <div v-else-if="error" class="error apollo">No characters matching search.</div>

                <div v-else-if="data" class="result apollo">
                    <div>
                        <Character @forceUpdate="downloadNewIds" class="favourites" v-for="(character, index) in data.charactersByIds" :index="index" :key="character.id" :character="data.charactersByIds[index]"/>
                    </div>
                </div>

                <div v-else class="no-result apollo">No result</div>
            </template>
        </ApolloQuery>
        
    </div>
</template>

<script>
import Character from './Character'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            ids: []
        }
    },

    components: {
        Character,
    },

    computed: {
        ...mapState(["favouriteTable"]),
    },

    methods: {
        downloadNewIds() {
            this.ids = JSON.parse(localStorage.getItem("favouriteCharacters"))
        }
    },
    
    beforeCreate() {
        this.$store.commit("changeFavouriteTable", true)  
    },

    created() {
        this.ids = JSON.parse(localStorage.getItem("favouriteCharacters"))
    },

    
}
</script>