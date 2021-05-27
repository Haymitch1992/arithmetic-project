<template>
    <div class="menu-box">
        <h2 class="menu-title">
            <img
                src="../assets/img/system-logo.png"
                class="system-logo"
                alt=""
            />
            数据智能
        </h2>
        <div class="menu-container">
            <el-menu
                :default-active="$store.state.menuCurrentIndex"
                class="el-menu-vertical-demo"
                @select="handleSelect"
            >
                <el-menu-item index="2">
                    <span slot="title">数据集管理</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <span slot="title">模型开发和训练</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <span slot="title">模型管理</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <span slot="title">模型部署</span>
                </el-menu-item>
            </el-menu>
            <div class="help-box">
                <el-button type="text" @click="goHelpPage">帮助文档</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        handleSelect(key, keyPath) {
            // 根据index 判断页面跳转
            let index = keyPath[keyPath.length - 1];
            switch (index) {
                case '2':
                    this.$store.commit('changeMenuIndex', '2');
                    this.$router.push('/dataManagement');
                    break;
                case '3':
                    this.$store.commit('changeMenuIndex', '3');
                    this.$router.push('/projectManagement');
                    break;
                case '4':
                    this.$store.commit('changeMenuIndex', '4');
                    this.$router.push('/modelManagement');
                    break;
                case '5':
                    this.$store.commit('changeMenuIndex', '4');
                    this.$router.push('/online');
                    break;
            }
        },
        goHelpPage() {
            this.$router.push('/help');
        }
    }
};
</script>

<style scoped lang="scss">
.menu-container {
    padding-top: 50px;
    background-color: #fff;
    border-top-right-radius: 50px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
    height: calc(100vh - 70px);
    box-sizing: border-box;
    overflow: hidden;
}
.system-logo {
    width: 24px;
    margin-right: 6px;
    vertical-align: sub;
}
.menu-title {
    padding-left: 20px;
    color: #fff;
    font-size: 18px;
    color: #464f68;
    line-height: 70px;
    margin: 0;
}
</style>
<style>
.help-box {
    position: absolute;
    width: 100%;
    bottom: 10px;
    text-align: center;
}
.menu-box .el-menu {
    border-right: 0;
}
.menu-box .el-menu-item {
    height: 36px;
    line-height: 36px;
    margin: 16px 10px;
    transition: none;
}
.menu-box .el-menu-item:focus,
.menu-box .el-menu-item:hover {
    background: transparent;
}
.menu-box .el-menu-item.is-active {
    background: #1677ff;
    color: #fff;
    border-radius: 40px;
    box-shadow: 2px 0 6px 0 rgba(172, 170, 170, 0.6);
}
</style>
