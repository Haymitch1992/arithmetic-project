<template>
    <el-dialog
        title="任务列表"
        :visible.sync="this.$store.state.progressDialog"
        width="800px"
        class="progress-task-dialog"
        :before-close="handleClose"
    >
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="未完成" name="aa"></el-tab-pane>
            <el-tab-pane label="已完成" name="bb"></el-tab-pane>
            <el-tab-pane label="失败" name="cc"></el-tab-pane>
        </el-tabs>
        <ul class="task-ul" v-if="showList.length !== 0">
            <li class="task-header">
                <span class="textLimit" style="width:220px;">数据集名称</span>
                <span class="textLimit" style="margin-right:20px">
                    创建时间
                </span>
                <span style="vertical-align: top;">状态</span>
            </li>
            <li v-for="item in showList" :key="item.id">
                <span class="textLimit" style="width:220px;">
                    {{ item.task_name }}
                </span>
                <span class="textLimit" style="margin-right:20px">
                    {{ item.create_time | converTime('YYYY-MM-DD HH:mm:ss') }}
                </span>
                <span
                    class="textLimit"
                    style="width:140px;"
                    v-if="item.task_plan !== 0"
                >
                    <el-tag
                        size="small"
                        v-if="item.task_plan === 1"
                        type="success"
                    >
                        已完成
                    </el-tag>
                    <el-tag
                        size="small"
                        v-if="item.task_plan === 2"
                        type="danger"
                    >
                        失败
                    </el-tag>
                </span>
                <span
                    v-if="item.task_plan === 0"
                    class="progress-span"
                    style="line-height:22px;"
                >
                    <el-progress
                        :stroke-width="14"
                        :percentage="parseInt(item.plan.progress * 100)"
                    ></el-progress>
                    <span style="font-size:12px;">
                        {{ item.plan.title }}
                    </span>
                </span>
            </li>
        </ul>
        <p class="task-text-info" v-if="showList.length === 0">暂无数据</p>
    </el-dialog>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            dialogVisible: true,
            currnetStatus: 0,
            activeName: 'aa',
            showList: []
        };
    },
    computed: {},
    created() {},
    mounted() {},
    watch: {
        currnetStatus: function() {
            this.showList = [];
            switch (this.currnetStatus) {
                case 0:
                    this.showList = this.$store.state.taskList.unfinished_task;
                    break;
                case 1:
                    this.showList = this.$store.state.taskList.completed_task;
                    break;
                case 2:
                    this.showList = this.$store.state.taskList.fail_task;
                    break;
            }
            this.badgeNum = this.$store.state.taskList.unfinished_task.length;
        },
        // // 监听任务列表
        '$store.state.taskList': function() {
            this.showList = [];
            switch (this.currnetStatus) {
                case 0:
                    this.showList = this.$store.state.taskList.unfinished_task;
                    break;
                case 1:
                    this.showList = this.$store.state.taskList.completed_task;
                    break;
                case 2:
                    this.showList = this.$store.state.taskList.fail_task;
                    break;
            }
            this.badgeNum = this.$store.state.taskList.unfinished_task.length;
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
            switch (tab.name) {
                case 'aa':
                    this.currnetStatus = 0;
                    break;
                case 'bb':
                    this.currnetStatus = 1;
                    break;
                case 'cc':
                    this.currnetStatus = 2;
                    break;
            }
        },
        handleClose() {
            this.$store.commit('changeProgressDialog', false);
        }
    },
    components: {}
};
</script>

<style scoped lang="scss">
.progress-task-dialog {
    /deep/ .el-dialog__body {
        padding-top: 10px;
    }
}

.task-ul {
    list-style: none;
    margin: 0;
    padding: 0;
    padding: 0px 10px 10px;
    max-height: 570px;
    overflow-y: auto;
}
.task-ul li {
    line-height: 50px;
    font-size: 14px;
    color: #666;
    padding-left: 20px;
    height: 50px;
    border-bottom: 1px solid #fafafa;
    vertical-align: middle;
}
.task-ul .task-header {
    background: #fafafa;
    line-height: 40px;
    height: 40px;
    span {
        line-height: 40px;
    }
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
.progress-span {
    display: inline-block;
    width: 210px;
    vertical-align: top;
    padding-top: 10px;
    /deep/ .el-progress__text {
        font-size: 14px !important;
    }
}
.textLimit {
    display: inline-block;
    width: 240px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
