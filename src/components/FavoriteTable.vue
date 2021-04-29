<template>
    <div class="table">
        <ul>
            <li>Photo</li>
            <li>Character ID</li>
            <li>Name</li>
            <li>Gender</li>
            <li>Spiecies</li>
            <li>Last Episode</li>
            <li>Add To Favorites</li>
        </ul>

        
        <ApolloQuery class="characters" :query="require('../graphql/getFavouriteCharacters.gql')" :variables="{ids: ids}">
            <template v-slot="{ result: { loading, error, data } }">
                <div v-if="loading" class="loading apollo">Loading...</div>
                
                <div v-else-if="error" class="error apollo">No characters matching search.</div>

                <div v-else-if="data" class="result apollo">
                    <div>
                        <Character v-for="(character, index) in data.charactersByIds" :index="index" :key="character.id" :character="data.charactersByIds[index]"/>
                    </div>
                </div>

                <div v-else class="no-result apollo">No result</div>
            </template>
        </ApolloQuery>
        
    </div>
</template>

<script>
import Character from './Character'

export default {
    data() {
        return {
            ids: []
        }
    },

    components: {
        Character,
    },

    created() {
        this.ids = JSON.parse(localStorage.getItem("favouriteCharacters"))
    }
    
}
</script>