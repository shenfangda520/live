<template>
    <div id="app">
        <whearder></whearder>
        <router-view></router-view>
    </div>
</template>

<script>
    import whearder from "@/components/header"
export default {
    name: "app",
    components: {
        whearder
    },
    computed: {},
    mounted() {}
};
</script>
<style lang="scss">
*{
    margin: 0;
    padding: 0;
}
html,body {
    width: 100%;
    height: 100%;
    background-position: center top;
    background-repeat: repeat-y;
    background-size: 100%;
}
#app {

}
.el-menu--horizontal>.el-menu-item{
    margin-right: 40px!important;
    font-size: 20px!important;
    padding: 0 40px!important;
}
</style>