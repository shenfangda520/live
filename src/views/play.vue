<template>
    <div class="meter_wrapper">
        <div class="kongbai"></div>
        <div class="pingd">{{tname || '返回首页选择频道'}}</div>
        <div id="playercontainer"></div>
    </div>
</template>

<script>
// import {} from "../api/api";


export default {
    name:'play',
    data() {
        return {
            player : null,
            tname:this.$route.params.name,
            turl:this.$route.params.turl
        };
    },
    methods: {
        loadStream(url) {
            //player.setMediaResourceURL(url);
            this.player = cyberplayer("playercontainer").setup({
                width: 1200,
                height: 675,
                file: url, // <—rtmp直播地址
                autostart: true,
                stretching: "uniform",
                volume: 100,
                controls: true,
                rtmp: {
                    reconnecttime: 10, // rtmp直播的重连次数
                    bufferlength: 0 // 缓冲多少秒之后开始播放 默认1秒
                }
            });
        }

    },
    components: {

    },
    mounted() {
        this.loadStream(this.turl)
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
    .pingd{
        font-size: 20px;
        font-weight: 400;
        line-height: 66px;
    }
</style>

