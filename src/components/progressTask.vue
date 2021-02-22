<template>
      <el-dialog
        title="任务列表"
        :visible.sync="this.$store.state.progressDialog"
        width="740px"
        class="progress-task-dialog"
        :before-close="handleClose">
      <div class="status-button-line">
          <el-button  :type="currnetStatus===0?'primary':''" size="small" @click="currnetStatus=0">未完成</el-button>
          <el-button  :type="currnetStatus===1?'primary':''" size="small" @click="currnetStatus=1">已完成</el-button>
          <el-button  :type="currnetStatus===2?'primary':''" size="small" @click="currnetStatus=2">失败</el-button>
      </div>
      <ul class="task-ul" v-if="showList.length!==0" >
            <li>
              <span class="textLimit" style="width:220px;"> 数据集名称</span>
              <span class="textLimit" style="margin-right:20px"> 创建时间</span>
              <span  style="vertical-align: top;">状态</span>
          </li>
          <li v-for="item in showList" :key="item.id">
              <span class="textLimit" style="width:220px;"> {{item.task_name}}</span>
              <span class="textLimit" style="margin-right:20px"> {{item.create_time|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
              <el-tag style="vertical-align: top;" size="small" v-if="item.task_plan===1" type="success">已完成</el-tag>
              <span v-if="item.task_plan===0" class="progress-span">
                  <el-progress :text-inside="true" :stroke-width="18" :percentage="item.plan.progress*100"></el-progress>
              </span>
              <el-tag style="vertical-align: top;"  size="small" v-if="item.task_plan===2" type="danger">失败</el-tag>
          </li>
      </ul>
      <p class="task-text-info" v-if="showList.length===0">暂无数据</p>
</el-dialog>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            dialogVisible: true,
            currnetStatus: 0,
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
    height: 400px;
    overflow-y: auto;
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
.progress-span {
    display: inline-block;
    width: 140px;
    vertical-align: top;
    padding-top: 4px;
}
.textLimit {
    display: inline-block;
    width: 240px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
