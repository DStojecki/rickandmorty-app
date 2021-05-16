<template>
    <div class="table">
        <ul>
            <li>Photo</li>
            <li class="mbl-hide">Character ID</li>
            <li>Name</li>
            <li class="mbl-hide">Gender</li>
            <li>Spiecies</li>
            <li class="mbl-hide">Last Episode</li>
            <li>Add To Favourites</li>
        </ul>


        <ApolloQuery class="characters" :query="require('../graphql/getCharacters.gql')" :variables="{name: inputedName}">
            <template v-slot="{ result: { loading, error, data } }">
                <div v-if="loading" class="loading apollo">Loading...</div>
                
                <div v-else-if="error" class="error apollo">No characters matching search.</div>

                <div v-else-if="data" class="result apollo">
                    <div v-if="characters">
                        <Character v-for="(character, index) in characters.results" :index="index" :key="character.id" :character="characters.results[index]"/>
                    </div>
                </div>
                <div v-else class="no-result apollo">No result</div>
            </template>
        </ApolloQuery>

        
    </div>
</template>

<script>

import Character from './Character.vue'
import gql from 'graphql-tag'
import { mapState } from 'vuex'

export default {

    data() {
        return {
            showMoreEnabled: true,
            newCharacters: null,
        }
    },

    computed: {
        ...mapState(["isSearching", "inputedName", "favouriteTable", "page", "tableHeight"]),

        scrollHeight(){
            return document.querySelector(".characters").scrollHeight
        },
    },

    components: {
        Character,
    },

    watch: {
        inputedName() {
            
        }
    },

    apollo: {
        characters: {
            query: gql`
                query characters($page: Int!, $name: String!) {
                    characters (
                        page: $page,
                        filter: {name: $name}
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

            variables () {
                return {
                    page: 1,
                    name: this.inputedName,
                }}  
            }
    },

    methods: {
        moreResults() {
            this.$store.commit("changePage", this.page + 1)

            this.$apollo.queries.characters.fetchMore({
                variables: {
                    page: this.page,
                    name: this.inputedName,
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    const newCharacters = fetchMoreResult.characters.results
                    this.newCharacters = fetchMoreResult.characters.results

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
        // Scroll listener set 
        const table = document.querySelector(".characters")
        table.addEventListener('scroll', () => {
            
            if (table.scrollHeight - table.scrollTop === table.clientHeight) {
                this.moreResults()
            }
        });

        // Clearing search input
        this.$store.commit("changeInputedName", "")
        document.getElementById("search").value = ""

        // Setting Table height
        setTimeout(() => {
            table.style.height = this.tableHeight + "px"
            table.style.maxHeight = this.tableHeight + "px"
        },100)
        
    },

    beforeCreate() {
        this.$store.commit("changeFavouriteTable", false) 
    },
}
        
    

</script>


<style lang="scss">

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
                padding: 0px 5px 0px 0px;
                vertical-align: middle;
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
        min-height: 50vh;
        max-height: 65vh;
        overflow-y: scroll;
        border-bottom: 0px solid rgba(229, 234, 244, 0.25);
        scrollbar-color: #11B0C8 #f1f1f1;
        scrollbar-width: thin;
        
    }

    .characters::-webkit-scrollbar {
        width: 8px;
        border-radius: 4px
    }

    /* Track */
    .characters::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
    }

    /* Handle */
    .characters::-webkit-scrollbar-thumb {
        background: #11B0C8;
        border-radius: 10px;
        height: 50px;
    }

    /* Handle on hover */
    .characters::-webkit-scrollbar-thumb:hover {
        background: #11B0C8;;
    }
    
    .result-apollo {
        max-height: auto;
        transition: max-height 0.5s;
    }

    .error, .no-result {
        margin-top: 30px;
    }

    @media(max-width: 1150px) {
        .table {
            ul {
                padding-left: 60px;
                font-size: 14px;
            }
        }
    }

     @media(max-width: 790px) {
         .table {
            ul {
                li {
                    width: 25%;
                }
            }
        }
        .mbl-hide {
            display: none;
        }
    }
    @media(max-width: 500px) {
        .table {
            ul {
                padding-left: 30px;
                font-size: 14px;
            }
        }
    }
</style>