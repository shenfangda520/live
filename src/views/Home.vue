<template>
    <div class="meter_wrapper">
        <div class="kuai">
            <div class="pingdao" v-for="(item,index) in list">
                <a @click="playLive(item)">{{index+1<10?'0'+(index+1):index+1}}-{{item.name}}</a>
            </div>
            <div>123456</div>
        </div>
    </div>
</template>

<script>


export default {
    data() {
        return {
            player : null,
            list:[]
        };
    },
    methods: {
        playLive(url){
            //params传参
            this.$router.push({
                name:"play",
                params:{
                    name:url.name,
                    turl:url.turl
                }
            });
        },
        geturllist(){
            const _this = this;
            fetch('../../static/live.json').then(function(response) {
                 return response.json();
            })
            .then(function(myJson) {
                 console.log(myJson);
                 _this.list = myJson;
            });
        }
    },
    components: {

    },
    mounted() {
        this.geturllist()
    },

    destroyed() {

    }
};
</script>
<style lang="scss" scoped>
    .meter_wrapper {
        width: 1200px;
        margin: 0 auto;
        height: 100%;
    }
    #playercontainer{
        width: 1200px;
        height: 675px;
        background: black;
    }
    .kongbai{
        margin: 20px 0;
    }
    .kuai{
        padding: 30px 10px;
    }
    .pingdao{
        width: 174px;
        font-size: 18px;
        line-height: 30px;
        cursor: pointer;
        float: left;
        margin-right: 20px;
    }
    .pingdao:hover{
        color: #aa5500;
    }
</style>

