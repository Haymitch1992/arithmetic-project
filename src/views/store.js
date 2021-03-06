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
    menuCurrentIndex: '2',
    currentSelectDate: [],
    currentSelectNum: 0,
    progressDialog: false,
    set_id: '',
    deployId: '', // 部署ID
    demoStationStatus: true,
    step: 1,
    dataDialog: false, // 数据集列表展示
    logDialog: false, // 运行结果展示
    analysisDialog: false, // 分析结果展示
    viewDataDialog: false, // 查看数据
    currentDialog: {},
    current_set_id: '', // 当前数据集的id
    run_uuid: '',
    taskList: {
      completed_task: [],
      fail_task: [],
      unfinished_task: []
    }// 任务列表
  },
  mutations: {
    changeProgressDialog(state, obj) {
      state.progressDialog = obj;
    },
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
      state.currentDialog.run_uuid = obj.run_uuid;
      state.currentDialog.nodeIndex = obj.nodeIndex;
    },
    changeStep(state, num) {
      state.step = num;
    },
    changeMenuIndex(state, num) {
      state.menuCurrentIndex = num;
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
