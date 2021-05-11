<template>
    <ul v-if="character" class="character">
        <li><img :src="character.image" alt=""></li>
        <li>{{character.id}}</li>
        <li>{{character.name}}</li>
        <li>{{character.gender}}</li>
        <li>{{character.species}}</li>
        <li>{{character.episode[character.episode.length - 1].episode}}</li>
        <li v-if="isFavourite" @click="removeFromFavourites" class="golden"><svg-icon width="40px" height="40px" class="ico" type="mdi" :path="path"></svg-icon></li>
        <li v-else @click="addToFavourite"><svg-icon width="40px" height="40px" class="ico" type="mdi" :path="path"></svg-icon></li>

        <transition name="show-alert">
            <li v-if="showAlert" class="alert"><h1>Character added to favourites</h1></li>
        </transition>
    </ul>
</template>


<script>

import { mapState } from 'vuex'

import SvgIcon from '@jamescoyle/vue-icon'
import { mdiStarBox } from '@mdi/js'; 

export default {
    data() {
        return {
            path: mdiStarBox,
            isFavourite: false,
            showAlert: false,
        }
    },

    components: { 
        SvgIcon,
    },

    computed: {
        ...mapState(["favouriteTable"]),
    },

    props: ["character", "index"],

    methods: {
        addToFavourite() {
            this.setAlertAnimation()

            const favouriteCharacters = JSON.parse(window.localStorage.getItem("favouriteCharacters"))

            for(let i = 0; i < favouriteCharacters.length; i++) {
                if(favouriteCharacters[i] === this.character.id) {
                    return this.isCharacterAlreadyOnList = true
                }
            }

            if(!this.isCharacterAlreadyOnList) {
                favouriteCharacters.push(this.character.id)
            }
            
            this.isFavourite = true
            
            window.localStorage.setItem('favouriteCharacters', JSON.stringify(favouriteCharacters))
            
        },

        removeFromFavourites() {
            if(this.favouriteTable) {
                this.$el.style.height = 0 + "px";
                
                setTimeout(() => {
                    const favouriteCharacters = JSON.parse(window.localStorage.getItem("favouriteCharacters"))

                    for(let i = 0; i < favouriteCharacters.length; i++) {
                        if(favouriteCharacters[i] === this.character.id) {
                            favouriteCharacters.splice(i, 1)

                            window.localStorage.setItem('favouriteCharacters', JSON.stringify(favouriteCharacters))
                            this.$emit("forceUpdate")
                        }
                    }
                }, 100)
            }
        },

        setAlertAnimation() {
            this.showAlert = true

            setTimeout(() => {
                this.showAlert = false
            }, 1500)
        },

        checkIfIsFavourite() {
            const favouriteCharacters = JSON.parse(window.localStorage.getItem("favouriteCharacters"))
            for(let i = 0; i < favouriteCharacters.length; i++) {
                if(favouriteCharacters[i] === this.character.id) {
                    this.isFavourite = true
                }
            }
        },
    },

    mounted() {
        this.checkIfIsFavourite()
    }
}
</script>


<style lang="scss" scoped>
    .table {
        .character {
            transition: 0.3s;
            height: 80px;
            display: flex;
            align-items: center;
            background-color: #ffffff;
            border-bottom: 1px solid #E5EAF4;
            padding-top: 0px;
            padding-bottom: 0px;
            max-height: 80px;
            position: relative;
            overflow: hidden;

            li {
                display: flex;
                padding: 4px 0px;

                img {
                    width: 52px;
                    height: 72px;
                }
                .ico {
                    color: #11B0C8;
                    cursor: pointer;
                }
            }


        }
    }

    .favourites {
        li {
            .ico {
                    color: lightgrey !important;
                    cursor: pointer;
                }
        }
    }

    .golden {
        .ico {
            color: goldenrod !important;
            cursor: default !important;
        }
    }
    .alert {
        width: calc(100% + 120px);
        height: 100%;
        background-color: rgba(17, 176, 200, .8);
        position: absolute;
        left: calc(0% - 120px);
            h1 {
                width: 100%;
                height: 100%;
                color: white;
                font-size: 32px;
                text-align: center;
                line-height: 68px;
            }
    }


    .show-alert-enter-active {
        transition: left .6s;
        left: calc(0% - 120px);
    }

    .show-alert-enter {
        left: 100%
    }

    .show-alert-leave-active {
        transition: left .6s;
        left: calc(-100% - 120px)
    }

    .show-alert-leave {
        left: calc(0% - 120px);
    }

</style>