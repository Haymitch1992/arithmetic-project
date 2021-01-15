<template>
    <div class="menu-box">
        <h2 class="menu-title">
            <img src="../assets/img/system-logo.png" class="system-logo" alt="">
            算法中台</h2>
        <div class="menu-container">
            <el-menu
                    default-active="2"
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
                    <span slot="title">模板部署</span>
                </el-menu-item>
                <el-menu-item index="6">
                    <span slot="title">帮助中心</span>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        handleSelect(key, keyPath) {
            // 根据index 判断页面跳转
            let index = keyPath[keyPath.length - 1];
            switch (index) {
                case '1':
                    this.$router.push('/plan');
                    break;
                case '2':
                    this.$router.push('/dataManagement');
                    break;
                // case '2-2':
                //     this.$router.push('/dataTable') // 废弃
                //     break
                case '3':
                    this.$router.push('/projectManagement');
                    break;
                case '3-2':
                    this.$router.push('/engineering');
                    break;
                case '3-3':
                    this.$router.push('/selectAlgorithm');
                    break;
                case '3-4':
                    this.$router.push('/assessAlgorithm');
                    break;
                case '4':
                    this.$router.push('/modelManagement');
                    break;
                case '5':
                    this.$router.push('/online');
                    break;
                case '6':
                    this.$router.push('/help');
                    break;
            }
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
