<template>
    <div class="menu-box">
        <div class="menu-container">
            <ul class="menu-ul">
                <li :class="{'active':this.$store.state.count===99}" @click="handleMenu(99)">
                    <i class="iconfont iconzujian"></i>
                    <span class="menu-label">模板</span>
                </li>
                <li :class="{'active':this.$store.state.count===0}" @click="handleMenu(0)">
                    <i class="iconfont iconmoxingguanli"></i>
                    <span class="menu-label">实验</span>
                </li>
                <li :class="{'active':this.$store.state.count===1}" @click="handleMenu(1)">
                    <i class="iconfont iconpintu"></i>
                    <span class="menu-label">组件</span>
                </li>
                <li :class="{'active':this.$store.state.count===2}" @click="handleMenu(2)">
                    <i class="iconfont iconshujuyuanmoxing"></i>
                    <span class="menu-label">数据源</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        handleMenu(num) {
            switch (num) {
                case 99:
                    this.$store.commit('changeCount', 99);
                    this.$router.push('/plan');
                    break;
                case 0:
                    this.$store.commit('changeCount', 0);
                    this.$router.push('/diagramExample');
                    break;
                case 1:
                    // 修改模型页左侧的内容显示 为组件
                    this.$store.commit('changeCount', 1);
                    this.$router.push('/diagramExample');
                    break;
                case 2:
                    // 修改模型页左侧的内容显示 为数据
                    this.$store.commit('changeCount', 2);
                    this.$router.push('/diagramExample');
                    break;
            }
        }
    }
};
</script>

<style scoped lang="scss">
.menu-container {
    padding-top: 30px;
    background-color: #292c36;
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
    background: #545c64;
    line-height: 60px;
    margin: 0;
}
.menu-ul {
    list-style: none;
    color: #fff;
    margin: 0;
    padding: 0;
    text-align: center;
    li {
        padding: 12px 0;
        cursor: pointer;
    }
    li:hover {
        background: #20232c;
    }
    li.active .iconfont {
        color: #1677ff;
    }
    .iconfont {
        font-size: 20px;
    }
    span {
        display: block;
    }
    .menu-label {
        margin-top: 4px;
        font-size: 12px;
    }
}
</style>
<style>
.menu-box .el-menu {
    border-right: 0;
}
</style>
