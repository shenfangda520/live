<template>
    <div class="header">
        <div class="el-paddingaa">
            <el-menu
                    :default-active="activeIndex2"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <el-menu-item index="1">
                    <a href="#/">我在首页</a>
                </el-menu-item>
                <el-menu-item index="2">
                    <a href="#/play">播放页面</a>
                </el-menu-item>
                <el-menu-item index="3">
                    交流中心
                </el-menu-item>
                <el-menu-item index="4">
                    发布直播
                </el-menu-item>
                <el-menu-item index="5">
                    个人中心
                </el-menu-item>
                <el-menu-item index="6">
                    关于平台
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
    export default {
        name: "header",
        data() {
            return {
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header{
        width: 100%;
        height: 61px;
        background: rgb(84, 92, 100);
        .el-paddingaa{
            width: 1200px!important;
            margin: 0 auto;
        }
        a{
            text-decoration:none;
        }
    }
</style>