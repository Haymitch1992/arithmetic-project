<template>
    <div id="app">
        <el-container>
            <!-- 机器学习-->
            <div v-if="currentModel === 1" class="machine-box">
                <el-container>
                    <el-header class="header-box-2">
                        <img
                            src="./assets/img/system-logo-2.png"
                            class="system-logo"
                            alt=""
                        />
                        <span class="machine">机器学习</span>
                        <span class="machine-test-title">
                            {{ project_name }}
                        </span>
                        <span class="login-info">
                            <img
                                src="../src/assets/img/person.jpg"
                                alt=""
                                class="info-img-small"
                            />
                            <span>{{ $store.state.userName }}</span>
                            <loginInfo></loginInfo>
                        </span>
                    </el-header>
                    <el-main class="home-menu-2">
                        <el-container class="content-container2">
                            <experimentMenu
                                style="width: 66px;margin-right: 10px;"
                            ></experimentMenu>
                            <el-main style="padding: 0;">
                                <router-view />
                            </el-main>
                        </el-container>
                    </el-main>
                </el-container>
            </div>
            <!-- 注册登录-->
            <div v-if="currentModel === 2" style="width: 100%;">
                <router-view />
            </div>
            <!-- 普通-->
            <div v-if="currentModel === 3" class="public-box">
                <el-aside class="home-menu">
                    <MENU></MENU>
                </el-aside>
                <el-container class="content-container">
                    <el-header class="header-box">
                        <span class="login-info">
                            <img
                                src="../src/assets/img/person.jpg"
                                alt=""
                                class="info-img-small"
                            />
                            <span @click="goPersonalPage()">
                                {{ $store.state.userName }}
                            </span>
                            <loginInfo></loginInfo>
                        </span>
                        <span
                            class="badgeItem"
                            v-if="progerssNum === 0"
                            @click="openProgressTaskDialog"
                        >
                            <el-button size="small">
                                任务列表
                            </el-button>
                        </span>
                        <el-badge
                            :value="progerssNum"
                            v-if="progerssNum !== 0"
                            class="badgeItem"
                            @click.native="openProgressTaskDialog"
                        >
                            <el-button size="small">任务列表</el-button>
                        </el-badge>
                    </el-header>
                    <el-main style="padding: 0;">
                        <router-view />
                    </el-main>
                </el-container>
            </div>
            <!-- 任务列表弹框 -->
            <progressTask></progressTask>
        </el-container>
    </div>
</template>

<script>
import getBrowserCore from './model/getBrowserCore';
import progressTask from './components/progressTask';
import MENU from './components/menu';
import experimentMenu from './components/menu-2';
import LoginInfo from './components/logo-info';
export default {
    name: 'App',
    components: {
        MENU: MENU,
        experimentMenu: experimentMenu,
        loginInfo: LoginInfo,
        progressTask: progressTask
    },
    computed: {
        progerssNum() {
            let num = 0;
            if (this.$store.state.taskList.unfinished_task) {
                num = this.$store.state.taskList.unfinished_task.length;
            }
            return num;
        }
    },
    watch: {
        $route: {
            handler(newRouter) {
                console.log(newRouter);
                if (this.experimentArr.indexOf(this.$route.path) !== -1) {
                    this.currentModel = 1;
                } else if (
                    this.fullScreenArr.indexOf(this.$route.path) !== -1
                ) {
                    this.currentModel = 2;
                } else {
                    this.currentModel = 3;
                }
            },
            immediate: true
        }
    },
    created() {
        // 在页面刷新时将vuex里的信息保存到localStorage里
        window.addEventListener('beforeunload', () => {
            localStorage.setItem(
                'messageStore',
                JSON.stringify(this.$store.state)
            );
        });

        // 在页面加载时读取localStorage里的状态信息
        localStorage.getItem('messageStore') &&
            this.$store.replaceState(
                Object.assign(
                    this.$store.state,
                    JSON.parse(localStorage.getItem('messageStore'))
                )
            );
    },
    data() {
        return {
            showList: [],
            currnetStatus: 0, // 查看状态
            badgeNum: 0,
            currentModel: 1,
            currentMenu: 2,
            experimentArr: [
                '/plan',
                '/diagramExample',
                '/engineering',
                '/selectAlgorithm',
                '/assessAlgorithm'
            ],
            fullScreenArr: ['/personal', '/login', '/register', '/forget'],
            project_name: localStorage.getItem('data_project_name')
        };
    },
    mounted() {
        if (getBrowserCore() !== 'Google Chrome or Chromium') {
            this.$message.error('为了保证拖拽效果，建议使用chrome浏览器');
        }
    },
    methods: {
        openProgressTaskDialog() {
            this.$store.commit('changeProgressDialog', true);
        }
    }
};
</script>

<style>
body {
    margin: 0;
}
/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  height: 100%;*/
/*  width: 100%;*/
/*}*/
/*.el-loading-mask.is-fullscreen {*/
/*  position: fixed;*/
/*  left: 0;*/
/*  right: 0;*/
/*  top: 0;*/
/*  bottom: 0;*/
/*}*/
/*foreignObject {*/
/*  !* 解决foreignObject默认遮挡溢出部分导致的形变 *!*/
/*  overflow: inherit;*/
/*  animation-duration: 1s;*/
/*  animation-fill-mode: both;*/
/*  animation-name: fadeInLeft;*/
/*}*/
#app {
    background-color: #f7f7f8;
}

.machine-box {
    display: flex;
    width: 100%;
    background: #1b1b1b;
}
.public-box {
    display: flex;
    width: 100%;
}
.system-logo {
    vertical-align: middle;
    margin-right: 10px;
}
.home-menu {
    height: 100vh;
    width: 160px !important;
    position: relative;
    z-index: 100;
    overflow: visible;
}
.home-menu-2 {
    width: 100%;
    padding: 10px 0 0 0 !important;
}
.content-container {
    background: #f7f7f8;
}
/*.content-container2{*/
/*    background: #292C36;*/
/*}*/
.header-box {
    background: #fff;
    border-bottom-left-radius: 50px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}
.header-box-2 {
    background: #292c36;
    width: 100%;
    height: 60px;
    flex-wrap: wrap;
}
.header-box-2 .login-info {
    color: #ffffff;
}
.login-info {
    float: right;
    font-size: 14px;
    color: #666666;
    padding-right: 20px;
    line-height: 60px;
}
.login-info .el-avatar {
    vertical-align: middle;
    margin-right: 4px;
}
.machine {
    line-height: 60px;
    color: #fff;
    font-size: 18px;
}
.machine img {
    width: 28px;
    margin-right: 10px;
    vertical-align: middle;
}
.machine-test-title {
    color: #ffffff;
    margin-left: 10px;
}
.el-button--primary {
    background-color: #1677ff;
    border-color: #1677ff;
}
.el-button {
    font-weight: normal;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #1677ff;
}
.login-info:hover .info-drop-down-box {
    visibility: visible;
}
.public-box .info-drop-down-box {
    color: #666;
    background: #fff;
    box-shadow: 2px 0px 6px #ddd;
    border: 1px solid #ddd;
}
.public-box .iconfont {
    color: #666;
}
.info-drop-down-box {
    visibility: hidden;
    width: 230px;
    height: 260px;
    background-color: #292c36;
    position: absolute;
    right: 10px;
    top: 54px;
    z-index: 100;
    border: 1px solid #1b1b1b;
    box-shadow: 2px 0px 6px #000000;
    border-radius: 4px;
    color: #ffffff;
    cursor: pointer;
    line-height: 14px;
    padding: 0 30px;
    box-sizing: border-box;
}
.info-img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: block;
    margin: 30px auto 14px;
    background: #eee;
    border: 1px solid #ddd;
}
.info-drop-down-box p {
    text-align: center;
    font-size: 12px;
    margin: 10px 0;
}
.info-drop-down-ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 12px 0 0;
}
.info-drop-down-ul .iconfont {
    font-size: 32px;
}
.info-drop-down-ul li {
    flex: 1;
}
.info-img-small {
    display: inline-block;
    width: 30px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 4px;
    border: 1px solid #ddd;
}
.badgeItem {
    margin-right: 30px;
    float: right;
    margin-top: 14px;
    position: relative;
}
.badgeItem:hover .task-box {
    display: block;
}
.task-box {
    position: absolute;
    display: none;
    width: 390px;
    background: #fff;
    top: 32px;
    left: -185px;
    z-index: 999;
    border: 1px solid #eee;
    min-height: 200px;
    max-height: 800px;
    overflow-y: auto;
    border-radius: 4px;
    -webkit-box-shadow: 2px 0px 6px #ddd;
    box-shadow: 2px 0px 6px #ddd;
}
.task-ul {
    list-style: none;
    margin: 0;
    padding: 0;
    padding: 0px 10px 10px;
}
.task-ul li {
    line-height: 30px;
    font-size: 14px;
    color: #666;
}
.status-button-line {
    padding: 10px 10px;
}
.task-text-info {
    color: #666;
    padding: 10px;
    font-size: 14px;
    text-align: center;
    line-height: 80px;
}
</style>
