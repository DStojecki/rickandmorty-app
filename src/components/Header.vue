<template>
    <header>
        <div class="header-content">
            <div class="logo"><img src="logo.png" alt="Rick and Morty Logo"></div>
            <div class="input-wrapper">
                <input id="search" placeholder="Start typing to search..." type="text" v-model="name">
                <svg-icon type="mdi" :path="path"></svg-icon>
            </div>
        </div>
    </header>
</template>

<script>

import SvgIcon from '@jamescoyle/vue-icon'
import { mdiMagnify } from '@mdi/js'

export default {

    data() {
        return {
            path: mdiMagnify,
            name: ""
        }
    },

    components: {
        SvgIcon
    },

    watch: {
        name() {
            this.$store.commit("changeInputedName", this.name)
        }
    }

}
</script>


<style lang="scss" scoped>

    header {
        border-bottom: 1px solid #E5EAF4;
        padding: 25px 0px;

        .header-content {
            margin: 0px 120px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            
            .logo {
                width: 240px;
                
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            
            .input-wrapper {
                margin-left: 80px;
                border: 1px solid #A9B1BD;
                border-radius: 10px;
                padding: 10px 15px;
                display: flex;
                width: 450px;
                justify-content: space-between;

                    input {
                        border: none;
                        flex-grow: 1;

                        &:focus {
                            border: none;
                            outline: none;
                        }
                    }

                    svg {
                        color: #11B0C8;
                        margin-left: 5px;
                    }

            }
        }
    }
</style>