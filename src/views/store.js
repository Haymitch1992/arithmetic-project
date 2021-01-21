/*
* 此文件读取router下所有一级目录并自动注册index.js
*/
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const requireStore = require.context('./', true, /vx.js/);
const module = {};
requireStore.keys().forEach(fileName => {
  module[fileName.split('/')[1]] = requireStore(fileName).default;
});
let store = new Vuex.Store({
  modules: module,
  state: {
    count: 0, // 0显示 实验列表 1 显示组件 2 显示数据库
    testId: 0,
    num: 0,
    userName: '',
    userEmail: '',
    currentSelectDate: [],
    currentSelectNum: 0,
    set_id: '',
    deployId: '', // 部署ID
    demoStationStatus: true,
    step: 1,
    dataDialog: false, // 数据集列表展示
    logDialog: false, // 运行结果展示
    analysisDialog: false, // 分析结果展示
    currentDialog: {},
    current_set_id: '', // 当前数据集的id
    run_uuid: '',
    taskList: [{"id": 5, "create_time": "2021-01-20T16:01:53.738490", "update_time": "2021-01-20T16:01:53.738525", "data_user_id": 6, "task_name": "9008023-主题数据创建使用", "task_plan": 0}] // 任务列表
  },
  mutations: {
    saveTaskList(state, obj) {
      state.taskList = obj;
    },
    saveRunUuid(state, num) {
      state.run_uuid = num;
    },
    saveCurrentSetId(state, num) {
      state.current_set_id = num;
    },
    handleNode(state, obj) {
      state[obj.nodeTpye] = obj.status;
      state.currentDialog.nodeName = obj.nodeName;
    },
    changeStep(state, num) {
      state.step = num;
    },
    changeDemoStaion(state, type) {
      state.demoStationStatus = type;
    },
    changeCount (state, num) {
      state.count = num;
    },
    changeTestId (state, num) {
      state.testId = num;
    },
    changeUserName (state, str) {
      state.userName = str;
    },
    changeUserEmail (state, str) {
      state.userEmail = str;
    },
    changeSelectDate(state, arr) {
      state.currentSelectDate = arr;
    },
    changeSelectNum(state, num) {
      state.currentSelectNum = num;
    },
    changeSetId(state, num) {
      state.set_id = num;
    },
    changeDeployId (state, num) {
      state.deployId = num;
    }
  }
});
export default store;
