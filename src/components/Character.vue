<template>
    <ul v-if="character" class="character">
        <li><img :src="character.image" alt=""></li>
        <li>{{character.id}}</li>
        <li>{{character.name}}</li>
        <li>{{character.gender}}</li>
        <li>{{character.species}}</li>
        <li>{{character.episode[character.episode.length - 1].episode}}</li>
        <li><svg-icon width="54px" height="54px" class="ico" type="mdi" :path="path"></svg-icon></li>
    </ul>
</template>


<script>

import SvgIcon from '@jamescoyle/vue-icon'
import { mdiStarBox } from '@mdi/js'; 

export default {
    data() {
        return {
            path: mdiStarBox
        }
    },

    components: { 
        SvgIcon,
    },

    props: ["character", "index"],
}
</script>


<style lang="scss" scoped>
    .table {
        .character {
            display: flex;
            align-items: center;
            background-color: #ffffff;
            border-bottom: 1px solid #E5EAF4;
            padding-top: 0px;
            padding-bottom: 0px;
            max-height: 80px;

            li {
                display: flex;
                padding: 4px 0px;

                img {
                    width: 50px;
                    height: 70px;
                }
                .ico {
                    color: #11B0C8;
                    height: 40px;
                    cursor: pointer;
                }
            }


        }
    }

</style>