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


        <ApolloQuery class="characters" :query="require('../graphql/getCharacters.gql')" :variables="{name: inputedName}">
            <template v-slot="{ result: { loading, error, data } }">
                <div v-if="loading" class="loading apollo">Loading...</div>
                
                <div v-else-if="error" class="error apollo">No characters matching search.</div>

                <div v-else-if="data" class="result apollo">
                    <div v-if="characters">
                        <Character v-for="(character, index) in characters.results" :index="index" :key="character.id" :character="data.characters.results[index]"/>
                    </div>
                </div>

                <div v-else class="no-result apollo">No result</div>
            </template>
        </ApolloQuery>
        
        <button @click="moreResults">more</button>
    </div>
</template>

<script>

import Character from './Character.vue'
import gql from 'graphql-tag'
import { mapState } from 'vuex'

export default {

    data() {
        return {
            page: 1,
            showMoreEnabled: true,
            characterHeight: 84,
        }
    },

    computed: {
        ...mapState(["isSearching", "inputedName", "favouriteTable"]),

        scrollHeight(){
            return document.querySelector(".characters").scrollHeight
        }
    },

    components: {
        Character,
    },

    apollo: {
        characters: {
            query: gql`
                query characters($page: Int!) {
                    characters (
                        page: $page,
                        filter: {name: ""}
                    ){

                        info{
                            pages
                            next
                            }

                        results {
                            id
                            name
                            status
                            species
                            gender
                            image
                            episode {
                                episode
                            }
                        }
                    }
                }`,

            variables: {
                page: 1,
            },
        }  
    },

    methods: {
        moreResults() {
            this.page++
            this.$apollo.queries.characters.fetchMore({
                variables: {
                    page: this.page,
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    const newCharacters = fetchMoreResult.characters.results

                    return {
                        characters: {
                        __typename: previousResult.characters.__typename,
                        results: [...previousResult.characters.results, ...newCharacters],
                        },
                    }
                },
            })
        },
    },

    mounted() {
        const table = document.querySelector(".characters")
        table.addEventListener('scroll', () => {
            
            if (table.scrollHeight - table.scrollTop === table.clientHeight) {
                this.moreResults()
            }
        });
    },

    beforeCreate() {
        this.$store.commit("changeFavouriteTable", false)  
    }

}
        
    

</script>


<style lang="scss">

    $padding-left: 120px;

    .table {
        width: 100%;

        ul {
            padding: 15px 0px;
            list-style: none;
            background-color: rgba(229, 234, 244, 0.25);
            padding-left: 120px;
            display: flex;
            justify-content: flex-start;

            li {
                width: 16.6%;
                text-align: left;
            }

            li:first-child {
                margin-left: 0px;
            }

            li:last-child {
                margin-right: 0px;
            }
        }
    }
    .characters {
        height: 70vh;
        overflow-y: scroll;
    }

    .result-apollo {
        max-height: auto;
        transition: max-height 0.5s;
    }
</style>