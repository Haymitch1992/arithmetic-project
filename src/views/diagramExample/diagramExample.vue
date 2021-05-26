<!-- 纯净版示范 -->
<template>
    <!-- 最外层容器监mouse系列事件, 用来做节点拖拽 -->
    <div>
        <div class="diagramExample">
            <div class="tag-line" v-if="choiceNodeList.length !== 0">
                <!-- 展开的试验列表 默认打开第一个-->
                <div>
                    <span
                        :key="index"
                        v-for="(item, index) in choiceNodeList"
                        :class="{ active: item.id === currentTest.id }"
                        @click.stop="selectCurrentNode(index)"
                    >
                        <i
                            @click.stop="clearCurrentNode(index)"
                            class="el-icon-close"
                        ></i>
                        {{ item.test_name }}
                    </span>
                </div>
                <ul class="tag-ul">
                    <li @click="autoPrepostion">
                        <i class="iconfont iconbushu1"></i>
                        运行
                    </li>
                    <li @click="deployTest">
                        <i class="iconfont iconbushu1"></i>
                        部署
                    </li>
                    <li @click="dialogTableVisible = true">
                        <i class="iconfont iconzidonghua"></i>
                        自动调参
                    </li>
                    <li @click="showTestLog = true">
                        <i class="iconfont iconzidonghua"></i>
                        操作日志
                    </li>
                </ul>
            </div>
            <div class="page-left" v-show="$store.state.count === 0">
                <div class="search-line">
                    <el-input
                        placeholder="请输入关键词"
                        v-model="searchVal"
                        suffix-icon="el-icon-search"
                        @change="searchTest"
                    ></el-input>
                </div>
                <h3
                    class="my-experiment-title"
                    @click="showMyExperiment = !showMyExperiment"
                >
                    <span
                        class="el-icon-caret-bottom"
                        v-if="showMyExperiment"
                    ></span>
                    <span
                        class="el-icon-caret-right"
                        v-if="!showMyExperiment"
                    ></span>
                    <span
                        class="iconfont iconwenjianjia"
                        style="font-size: 14px;"
                    ></span>
                    <span>我的实验</span>
                </h3>
                <ul class="my-experiment-item" v-if="showMyExperiment">
                    <li
                        v-for="(item, index) in all_project"
                        :key="index"
                        :class="{ active: item.id === currentTest.id }"
                        @click="changeExperiment(index, item.id)"
                    >
                        {{ item.test_name }}
                    </li>
                </ul>
                <div class="addTest-line">
                    <el-button
                        type="primary"
                        style="width: 100%;"
                        @click="
                            dialogFormVisible = true;
                            btnShow = false;
                        "
                    >
                        <span
                            class="el-icon-circle-plus-outline"
                            style="margin-right: 6px;"
                        ></span>
                        创建实验
                    </el-button>
                </div>
            </div>
            <!-- 右侧表单  -->
            <div class="right-form">
                <!-- 随机森林 -->
                <randomForest
                    v-if="isShowNode"
                    @clearLink="clearLink"
                    @saveNode="saveNode"
                    @updateNodeParam="updateNodeParam"
                    :nodeData="nodeForm"
                    :componentId="componentId"
                    :nodeId="ndoeId"
                    :nodeTile="nodeTitle"
                ></randomForest>
                <!-- 实验属性 -->
                <experimentalDetail
                    v-if="!isShowNode"
                    :currentTest="currentTest"
                    @saveChange="editeTest"
                    @delelteNode="deleteTest"
                ></experimentalDetail>
            </div>
            <div
                class="diagramBox"
                @mousedown="startNodesBus($event)"
                @mousemove="moveNodesBus($event)"
                @mouseup="endNodesBus($event)"
            >
                <!--左侧拖拽主体-->
                <div class="page-left" v-show="$store.state.count === 1">
                    <div class="search-node-box">
                        <el-input
                            placeholder="搜索组件"
                            v-model="searchNode"
                            @input="findNodeList"
                        ></el-input>
                    </div>
                    <!-- 搜索的返回值 -->
                    <div v-if="searchNode">
                        <search-box
                            :dataList="searchNodeList"
                            dataName="数据预处理"
                        ></search-box>
                    </div>
                    <div v-if="!searchNode">
                        <drawer
                            :showItem="showItem5"
                            :dataList="nodeLabel5"
                            dataName="数据集"
                            @openParentNode="openNode(5)"
                        ></drawer>
                        <drawer
                            :showItem="showItem1"
                            :dataList="nodeLabel1"
                            dataName="数据预处理"
                            @openParentNode="openNode(1)"
                        ></drawer>
                        <drawer
                            :showItem="showItem2"
                            :dataList="nodeLabel2"
                            dataName="特征工程"
                            @openParentNode="openNode(2)"
                        ></drawer>
                        <drawer
                            :showItem="showItem3"
                            :dataList="nodeLabel3"
                            dataName="选择算法"
                            @openParentNode="openNode(3)"
                        ></drawer>
                        <drawer
                            :showItem="showItem4"
                            :dataList="nodeLabel4"
                            dataName="算法评估"
                            @openParentNode="openNode(4)"
                        ></drawer>
                    </div>
                </div>
                <div class="page-left" v-show="$store.state.count === 2">
                    <div class="labeliing" @click="showItem6 = !showItem6">
                        <span
                            class="el-icon-caret-bottom"
                            v-if="!showItem6"
                        ></span>
                        <span
                            class="el-icon-caret-right"
                            v-if="showItem6"
                        ></span>
                        <span
                            class="iconfont iconwenjianjia"
                            style="font-size: 14px;"
                        ></span>
                        <span>公共表</span>
                    </div>
                    <div v-if="showItem6" class="node-item">
                        <div
                            class="basic-node"
                            v-for="(item, i) in nodeLabel6"
                            :key="'nodes_basic' + i"
                            @mousedown="dragIt(item)"
                        >
                            {{ item.name }}
                        </div>
                    </div>
                </div>
                <!-- DAG-Diagram主体 -->
                <DAGBoard
                    ref="DAGBoard"
                    :DataAll="yourJSONDataFillThere"
                    :showTool="choiceNodeList.length !== 0"
                    @updateDAG="updateDAG"
                    @editNodeDetails="editNodeDetails"
                    @doSthPersonal="doSthPersonal"
                    @operationLog="operationLog"
                ></DAGBoard>
                <!-- 用来模拟拖拽添加的元素 -->
                <node-bus
                    v-if="dragBus"
                    :value="busValue.value"
                    :pos_x="busValue.pos_x"
                    :pos_y="busValue.pos_y"
                />
            </div>
            <!-- 自动调参弹窗 -->
            <automaticOptions
                :dialogTableVisible="dialogTableVisible"
                @closeOptions="closeAutoMaticOptions"
            ></automaticOptions>
            <!-- 操作日志的展示 -->
            <testLog
                v-if="showTestLog"
                @CloseTestLog="CloseTestLog"
                :data_test_id="data_test_id"
            ></testLog>
        </div>
        <demonStation v-if="this.$store.state.demoStationStatus"></demonStation>
        <!--创建实验-->
        <el-dialog
            title="创建实验"
            :visible.sync="dialogFormVisible"
            :close-on-click-modal="false"
            class="create-test"
        >
            <el-form>
                <el-form-item label="实验名称">
                    <el-input
                        v-model="form.test_name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="实验描述">
                    <el-input
                        v-model="form.test_content"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" v-if="!btnShow" @click="createTest">
                    确 定
                </el-button>
                <el-button type="primary" v-if="btnShow" @click="editeTest">
                    确 定
                </el-button>
            </div>
        </el-dialog>
        <!-- 数据集数据展示 -->
        <dataDialog></dataDialog>
        <logDialog v-if="this.$store.state.logDialog"></logDialog>
        <!-- 分析报告 -->
        <analysisDialog></analysisDialog>
        <!-- 查看数据 -->
        <viewDataDialog></viewDataDialog>
        <selectHeader
            v-if="showSelectDialog"
            :selectValue="nodeForm"
            @saveSelect="saveSelect"
        ></selectHeader>
    </div>
</template>

<script>
import {
    diagramExampleData,
    nodeLabel6,
    nodeList,
    nodeList2,
    nodeList3,
    nodeList4,
    nodeList5
} from './data';
import {
    POST_RUN_MODEL,
    ALL_TEST,
    SAVE_NODES,
    GET_NODE_INFORMATION,
    GET_TEST_DELETE,
    POST_TEST_EDIT,
    CREATE_TEST,
    POST_SEARCH_TEST,
    POST_NODE_PARAMETER,
    POST_ADD_MODEL_DATA,
    POST_DEPLOY_MODEL_SAVE,
    POST_DEPLOY_MODEL,
    OPERATION_LOG,
    GET_ALL_MODULE,
    POST_ALL_MODULE,
    ALL_DATA_LIST
} from '../../assets/url.js';
import randomForest from '../../components/randomForest';
import experimentalDetail from '../../components/experimentalDetail';
import experimentAttribute from '../../components/experimentAttribute';
import automaticOptions from '../../components/automaticOptions';
import shortcutBar from '../../components/shortcutBar';
import drawer from '../../components/drawer';
import searchBox from '../../components/searchBox';
import selectHeader from '../../components/selectHeader';
import demonStation from '../../components/demonStation';
import dataDialog from '../../components/dataDialog';
import axios from 'axios';
import logDialog from '../../components/logDialog';
import analysisDialog from '../../components/analysisDialog';
import viewDataDialog from '../../components/viewDataDialog';
import testLog from '../../components/testLog';

export default {
    components: {
        drawer,
        randomForest,
        experimentAttribute,
        automaticOptions,
        experimentalDetail,
        shortcutBar,
        selectHeader,
        demonStation,
        dataDialog,
        logDialog,
        analysisDialog,
        viewDataDialog,
        testLog,
        searchBox
    },
    computed: {
        currentTabNum() {
            return this.$store.state.count;
        }
    },
    watch: {
        currentTabNum(newNum, oldNum) {
            // 没有实验不允许用户切换
            this.isShowDialog();
        }
    },
    props: {},
    data() {
        return {
            showTestLog: false,
            getAllTestStatus: false,
            searchNode: '',
            searchNodeList: [],
            showSelectDialog: false,
            choiceNodeList: [],
            dialogTableVisible: false,
            currentTest: {},
            btnShow: false,
            form: {
                test_name: '',
                test_content: ''
            },
            all_data_list: [],
            dialogFormVisible: false, // 创建实验
            data_test_id: 7,
            searchVal: '',
            data_project_id: localStorage.getItem('data_project_id'),
            all_project: [],
            showMyExperiment: true,
            isShowNode: false,
            showOptions: 1,
            showItem1: false,
            showItem2: false,
            showItem3: false,
            showItem4: false,
            showItem5: false,
            showItem6: false,
            data: this.diagramExampleData,
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            nodeLabel1: nodeList,
            nodeLabel2: nodeList2,
            nodeLabel3: nodeList3,
            nodeLabel4: nodeList4,
            nodeLabel5: nodeList5,
            nodeLabel6: nodeLabel6,
            // 以下为svg必要内容
            dragBus: false, // 是否在拖拽,
            uploadJSONDataFillThere: '',
            yourJSONDataFillThere: {
                // 用来展示的节点与连线
                nodes: [],
                sides: []
            },
            // 以下为拖拽方式添加节点必须内容
            busValue: {
                value: 'name',
                pos_x: 100,
                pos_y: 100
            },
            // 以下为表单展示数据
            formDetail: {
                currentEditNodeId: null,
                form: {}
            },
            // 监听的事件
            onkeydown: null,
            // 复制的内容
            copyContent: [],
            nodeForm: {}, // 节点的数据
            nodeTitle: '',
            componentId: '',
            outObj: {},
            ndoeId: '',
            runArr: [], // 执行数组
            currentNodeNum: 0, // 运行节点下标
            limit_num: 0,
            loading: ''
        };
    },
    created() {
        // this.loadJSON()
        this.onkeydown = document.addEventListener('keydown', e => {
            if (e.ctrlKey && e.key === 'c') {
                // 按下ctrl + c
                this.ctrlC();
            } else if (e.ctrlKey && e.key === 'v') {
                // 按下ctrl + v
                this.ctrlV();
            }
        });
    },
    mounted() {
        this.allTest();
        this.getNodeList();
        // this.getDataList()
        this.getNodeStair();
        this.postNodeStair();
        this.$store.commit('changeCount', 0);
        // 取 localStorage.setItem("data_project_id", "id");
        this.$store.commit(
            'changeUserName',
            localStorage.getItem('data_user_name')
        );
        this.$store.commit(
            'changeUserEmail',
            localStorage.getItem('data_user_email')
        );
    },
    beforeDestroy() {
        this.onkeydown = null; // 销毁事件
    },
    methods: {
        CloseTestLog() {
            this.showTestLog = false;
        },
        inheritNodeParams() {
            // 继承已选择的数据集
            // 从已选择的节点继承 传递到 后续的节点上
            // 判断条件是从数据集从上往下去找
        },
        clearLink() {
            // 清空 因数据集变化关联的节点参数
            let nodeArr = this.yourJSONDataFillThere.nodes;
            nodeArr.forEach(item => {
                // 找到特定节点
                item.form[0].data.forEach(item2 => {
                    let key = item2.tag;
                    if (
                        key === 'select_feature_columns' ||
                        key === 'select_target_columns' ||
                        key === 'original_target_columns'
                    ) {
                        item2.value.node_params[key] = [];
                    }
                });
            });
        },
        // 是否展示创建弹窗
        isShowDialog() {
            if (this.choiceNodeList.length === 0 && this.getAllTestStatus) {
                // 初始化的时候 等于0 且接口返回完数据
                this.$confirm('没有实验对象，请先创建实验', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.dialogFormVisible = true;
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
            }
        },
        // 查找搜索的节点
        findNodeList() {
            let target = [];
            target = target.concat(this.nodeLabel1[0].nodeItem);
            target = target.concat(this.nodeLabel1[1].nodeItem);
            target = target.concat(this.nodeLabel2[0].nodeItem);
            target = target.concat(this.nodeLabel2[1].nodeItem);
            target = target.concat(this.nodeLabel2[2].nodeItem);
            target = target.concat(this.nodeLabel2[3].nodeItem);
            target = target.concat(this.nodeLabel2[4].nodeItem);
            target = target.concat(this.nodeLabel3[0].nodeItem);
            target = target.concat(this.nodeLabel3[1].nodeItem);
            target = target.concat(this.nodeLabel3[2].nodeItem);
            target = target.concat(this.nodeLabel4[0].nodeItem);
            target = target.concat(this.nodeLabel4[1].nodeItem);
            target = target.concat(this.nodeLabel5[0].nodeItem);
            this.searchNodeList = [];
            target.forEach(item => {
                if (item.name.indexOf(this.searchNode) !== -1) {
                    this.searchNodeList.push(item);
                }
            });
            console.log(this.searchNodeList);
        },
        // 获取节点的一级菜单
        getNodeStair() {
            this.$api.get(GET_ALL_MODULE).then(res => {
                console.log(res);
            });
        },
        // 获取节点的二级参数
        postNodeStair() {
            this.$api
                .post(POST_ALL_MODULE, {
                    module_id: 1
                })
                .then(res => {
                    // console.log(res);
                });
        },
        // 保存节点数据
        saveSelect() {
            // 找到当前节点
            let load_data = {
                node_params: {}
            };
            let str = this.$store.state.currentSelectNum;
            load_data.node_params[str] = this.$store.state.currentSelectDate;
            this.yourJSONDataFillThere.nodes.forEach(item => {
                if (item.id === this.nodeId) {
                    // 对应到 data 下面的 节点
                    item.form[0].data.forEach((item2, index, arr) => {
                        if (item2.tag === this.$store.state.currentSelectNum) {
                            let obj1 = item.form[0].data[index];
                            obj1.value = load_data;
                        }
                    });
                }
            });
            // 关闭
            this.showSelectDialog = false;
        },
        // 操作日志
        operationLog(str) {
            this.$api
                .post(OPERATION_LOG, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    data_test_id: this.data_test_id,
                    message: str
                })
                .then(res => {
                    console.log(res.data);
                });
        },

        // 获取数据集列表
        getDataList() {
            this.$api
                .post(ALL_DATA_LIST, {
                    data_user_id: localStorage.getItem('data_user_id')
                })
                .then(res => {
                    this.all_data_list = [
                        {
                            label: '用户得数据集列表',
                            nodeItem: []
                        }
                    ];
                    res.data.all_data_set.forEach(
                        (currentValue, index, arr) => {
                            this.all_data_list[0].nodeItem.push({
                                name: currentValue.data_name,
                                node_type: 'item-4',
                                iconClassName: 'el-icon-loading',
                                form: []
                            });
                        }
                    );
                });
        },
        selectCurrentNode(num) {
            this.currentTest = this.choiceNodeList[num];
            this.changeExperiment(num, this.choiceNodeList[num].id);
        },
        clearCurrentNode(num) {
            // 如果当前节点的id 与选中的id 重合
            // 删除当前节点
            if (this.choiceNodeList[num].id === this.currentTest.id) {
                this.choiceNodeList.splice(num, 1);
                this.currentTest = this.choiceNodeList[0];
            } else {
                this.choiceNodeList.splice(num, 1);
            }
        },
        openNode(num) {
            // 关闭其他节点 打开当前节点的组件
            let saveStatus = this['showItem' + num];
            this.showItem1 = false;
            this.showItem2 = false;
            this.showItem3 = false;
            this.showItem4 = false;
            this.showItem5 = false;
            this['showItem' + num] = !saveStatus;
        },
        // 更新节点数据
        updateNodeParam(params, num1, num2) {
            // 找到当前节点 更新的他的数据
            this.yourJSONDataFillThere.nodes.forEach(item => {
                if (item.id === this.nodeId) {
                    item.form[num1].data[num2].value = params;
                }
            });
        },
        // 找到节点 标记执行状态
        changeNodeStatus(node_id, startTime, endTime, output, run_uuid) {
            // 修改当前状态
            this.yourJSONDataFillThere.nodes.forEach(item => {
                if (item.id === node_id) {
                    item.iconClassName = 'el-icon-circle-check';
                    item.startTime = startTime;
                    item.endTime = endTime;
                    item.output = output;
                    item.run_uuid = run_uuid;
                }
            });
            let obj = this.yourJSONDataFillThere;
            this.yourJSONDataFillThere = obj;
            this.saveNode();
        },
        sendJson(obj) {
            this.loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$api
                .post(POST_RUN_MODEL, {
                    user_id: localStorage.getItem('data_user_id'),
                    user_name: 'user1',
                    experiment_name: 'switch_machine_test',
                    node_name: 'load_data',
                    node_params: {
                        csv_name:
                            obj.form[0].data[0].value.node_params.csv_name,
                        download_path:
                            obj.form[0].data[0].value.node_params.download_path
                    },
                    edge_in: [],
                    edge_out: ['csv_path>dataset_path'],
                    input: {},
                    pre_run_uuids: [],
                    is_generate_model: 'false',
                    request_url: 'http://192.168.61.106:5001/'
                })
                .then(res => {
                    this.loading.close();
                    this.currentNodeNum++;
                    console.log(res);
                    if (res.data.code === 200) {
                        this.runArr[0].output = res.data.output;
                        this.runArr[0].artifact_path = res.data.artifact_path;
                        console.log(this.runArr);
                    }
                });
            // 传递的参数
        },
        sendJson2(obj) {
            this.loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$api
                .post(POST_RUN_MODEL, {
                    user_id: localStorage.getItem('data_user_id'),
                    user_name: 'user1',
                    experiment_name: 'switch_machine_test',
                    node_name: 'load_data',
                    node_params: {
                        csv_name:
                            obj.form[0].data[0].value.node_params.csv_name,
                        download_path:
                            obj.form[0].data[0].value.node_params.download_path
                    },
                    edge_in: [],
                    edge_out: ['csv_path>dataset_path'],
                    input: {},
                    pre_run_uuids: [],
                    is_generate_model: 'false',
                    request_url: 'http://192.168.61.106:5001/'
                })
                .then(res => {
                    this.loading.close();
                    this.currentNodeNum++;
                    console.log(res);
                });
            // 传递的参数
        },
        // 传入节点ID 返回当前节点
        findNode(id) {
            this.yourJSONDataFillThere.nodes.forEach(item => {
                if (item.id === id) {
                    this.outObj = item;
                }
            });
        },
        checkNodeData(start, end) {
            let nodeArr = this.yourJSONDataFillThere.nodes;
            let startNode = '';
            this.runArr = [];
            let sliceStart = 0;
            let sliceEnd = nodeArr.length;
            // 根据参数进行切割
            // 从数据集开始 找到左侧第一个输出的点
            nodeArr.forEach((item, index, arr) => {
                if (item.component_id === 'load_data') {
                    startNode = item;
                    this.runArr.push(startNode);
                }
                // if (start && item.id === start) {
                //     sliceStart = index;
                // }
                // if (end && item.id === end) {
                //     sliceEnd = index;
                // }
            });
            this.circulation(startNode.id);
            // 根据连线 找到 输入的点 存入runArr 重复
            if (sliceStart === sliceEnd) sliceEnd++;
            this.runArr.forEach((item, index, arr) => {
                if (start && item.id === start) {
                    sliceStart = index;
                }
                if (end && item.id === end) {
                    sliceEnd = index + 1;
                }
            });
            this.runArr = this.runArr.slice(sliceStart, sliceEnd);
        },
        circulation(currentId) {
            let edges = this.yourJSONDataFillThere.edges;
            let nodeArr = this.yourJSONDataFillThere.nodes;

            edges.forEach((item, index, arr) => {
                if (
                    item.src_node_id === currentId &&
                    item.src_output_idx === 0
                ) {
                    nodeArr.forEach((item2, index2, arr2) => {
                        if (item2.id === item.dst_node_id) {
                            this.runArr.push(item2);
                            this.circulation(item2.id);
                        }
                    });
                }
            });
        },
        postNodeParameter(run_uuid, obj) {
            this.$api
                .post(POST_NODE_PARAMETER, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    data_test_id: this.data_test_id,
                    run_uuid: run_uuid,
                    run_parameter: JSON.stringify(obj)
                })
                .then(res => {
                    console.log(res);
                });
        },
        // 找到目标输出数据out_ports_name
        findTargetDataOut(targetId, targetIndex) {
            let returnStr = '';
            this.yourJSONDataFillThere.edges.forEach(item => {
                if (
                    item.dst_node_id === targetId &&
                    item.src_output_idx === targetIndex
                ) {
                    // 找到目标节点的id
                    let targetNodeId = item.src_node_id;
                    let targetNodeIndex = item.dst_input_idx;

                    this.yourJSONDataFillThere.nodes.forEach(item2 => {
                        if (item2.id === targetNodeId) {
                            returnStr = item2.out_ports_name[targetNodeIndex];
                        }
                    });
                }
            });
            return returnStr;
        },
        // 找到目标输入数据in_ports_name
        findTargetDataIn(targetId, targetIndex) {
            let returnStr = '';
            this.yourJSONDataFillThere.edges.forEach(item => {
                if (
                    item.src_node_id === targetId &&
                    item.dst_input_idx === targetIndex
                ) {
                    // 找到目标节点的id
                    let targetNodeId = item.dst_node_id;
                    let targetNodeIndex = item.src_output_idx;

                    this.yourJSONDataFillThere.nodes.forEach(item2 => {
                        if (item2.id === targetNodeId) {
                            returnStr = item2.in_ports_name[targetNodeIndex];
                        }
                    });
                }
            });
            return returnStr;
        },
        // 找到目标output
        findTargetDataOutput(targetId, targetIndex) {
            let returnObj = {};
            this.yourJSONDataFillThere.edges.forEach(item => {
                if (
                    item.dst_node_id === targetId &&
                    item.src_output_idx === targetIndex
                ) {
                    // 找到目标节点的id
                    let targetNodeId = item.src_node_id;
                    let targetNodeIndex = item.dst_input_idx;
                    // 修改目标节点
                    this.yourJSONDataFillThere.nodes.forEach(item2 => {
                        if (item2.id === targetNodeId) {
                            returnObj = item2;
                        }
                    });
                    // this.runArr.forEach(item2 => {
                    //     if (item2.id === targetNodeId) {
                    //         returnObj = item2;
                    //     }
                    // });
                }
            });
            return returnObj;
        },
        autoPrepostion(start, end) {
            this.checkNodeData(start, end);
            this.loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.currentNodeNum = 0;
            // this.resetRunStatus();
            this.autoRun();
        },
        // 每次执行 都重置之前的运行状态
        resetRunStatus() {
            this.yourJSONDataFillThere.nodes.forEach(item => {
                item.iconClassName = 'el-icon-loading';
                item.startTime = '';
                item.endTime = '';
            });
        },
        // 自动执行
        autoRun() {
            this.limit_num = this.runArr.length; // 6
            if (this.currentNodeNum >= this.limit_num) {
                this.currentNodeNum = 0;
                // 判断终止条件
                this.loading.close();
                return false;
            } else {
                let targetNode = this.runArr[this.currentNodeNum];
                // 输入点
                let edge_in = [];
                let pre_run_uuids = []; // 判断当前节点的输入 如果大于1个 需要将 多个节点的返回值 进行连接
                let input = {}; // 判断当前节点的输入 如果大于1个 需要将 多个节点的返回值 进行连接
                this.runArr[this.currentNodeNum].in_ports_name.forEach(
                    (item, index, arr) => {
                        // 当前节点id item.id
                        let currentNodeId = this.runArr[this.currentNodeNum].id;
                        // 第几个下标
                        let currentNodeIndex = index;
                        // 找到上一个节点的 输出
                        let prevNodeOutName = this.findTargetDataOut(
                            currentNodeId,
                            currentNodeIndex
                        );
                        // 当前节点的输入
                        let currentNodeInName = item;
                        let str = prevNodeOutName + '>' + currentNodeInName;
                        edge_in.push(str);
                        let targetObj = this.findTargetDataOutput(
                            currentNodeId,
                            currentNodeIndex
                        );
                        // input 是上一个节点的 output
                        let newObj = {};
                        newObj[item] = targetObj.output[item];
                        input = Object.assign(input, newObj);
                        pre_run_uuids.push(targetObj.artifact_path);
                    }
                );
                // 如果是 是
                // 输出点
                let edge_out = [];

                this.runArr[this.currentNodeNum].out_ports_name.forEach(
                    (item, index, arr) => {
                        // 当前节点id item.id
                        let currentNodeId = this.runArr[this.currentNodeNum].id;
                        // 第几个下标
                        let currentNodeIndex = index;
                        // 找到上一个节点的 输出
                        let prevNodeOutName = this.findTargetDataIn(
                            currentNodeId,
                            currentNodeIndex
                        );
                        // 当前节点的输入
                        let currentNodeInName = item;
                        let str = currentNodeInName + '>' + prevNodeOutName;
                        edge_out.push(str);
                    }
                );

                let node_params = {}; // 提取当前节点的参数
                // 生成节点的参数
                this.runArr[this.currentNodeNum].form.forEach(
                    (item, index, arr) => {
                        item.data.forEach((item2, index, arr) => {
                            // 拿到当前节点需要的 参数 key  item2.tag
                            let targetTag = item2.tag;
                            // 判断是否需要 按逗号切割 ,
                            let targetTagArr = targetTag.split(',');

                            for (let i = 0; i < targetTagArr.length; i++) {
                                // 键 tag
                                // 值 value
                                node_params[targetTagArr[i]] =
                                    item2.value.node_params[targetTagArr[i]];
                                // 将数组转成字符串 传递给后台
                                let Obj =
                                    item2.value.node_params[targetTagArr[i]];
                                // 转成字符串 select_columns
                                if (item2.type === 'btn') {
                                    Obj = Obj.join();
                                    node_params[targetTagArr[i]] = Obj;
                                }
                            }
                        });
                    }
                );
                // 追加参数 reg_test_model
                // if (targetNode.component_id === "cla_test_model") {
                //     // 找到拆分节点
                //     this.runArr.forEach((item, index, arr) => {
                //         if (item.component_id === "split_datasets") {
                //             node_params.train_csv_path =
                //                 item.output.train_csv_path;
                //         }
                //     });
                //     // train_csv_path
                // }
                // 生成参数
                let obj = {
                    user_id: localStorage.getItem('data_user_id'),
                    user_name: 'user1',
                    experiment_id: this.data_test_id + '',
                    experiment_name: this.currentTest.test_name, // 实验名称
                    node_id: this.runArr[this.currentNodeNum].id,
                    node_name: this.runArr[this.currentNodeNum].name,
                    component_id: this.runArr[this.currentNodeNum].component_id,
                    component_name: this.runArr[this.currentNodeNum].name,
                    node_params: node_params,
                    edge_in: edge_in,
                    edge_out: edge_out,
                    input: input,
                    pre_run_uuids: pre_run_uuids,
                    is_generate_model: this.runArr[this.currentNodeNum]
                        .is_generate_model
                        ? 'true'
                        : 'fasle' // 是否输出模型
                };
                if (
                    this.runArr[this.currentNodeNum].is_generate_model &&
                    this.runArr[this.currentNodeNum].is_generate_model ===
                        'true'
                ) {
                    obj.is_generate_model = true;
                } else {
                    obj.is_generate_model = false;
                }
                // console.log("当前节点的下标", this.runArr[this.currentNodeNum]);
                this.$api
                    .post(POST_RUN_MODEL, {
                        ...obj
                    })
                    .then(res => {
                        if (res.data.code === 200) {
                            // 将runArr 中的数据保存至 this.yourJSONDataFillThere.nodes
                            this.changeNodeStatus(
                                res.data.node_id,
                                res.data.start_time,
                                res.data.end_time,
                                res.data.output,
                                res.data.run_uuid
                            );
                            this.runArr[this.currentNodeNum].output =
                                res.data.output;
                            this.runArr[this.currentNodeNum].artifact_path =
                                res.data.run_uuid;
                            this.postNodeParameter(
                                res.data.run_uuid,
                                obj.node_params
                            );
                            this.$message.success(
                                this.runArr[this.currentNodeNum].name
                            );
                            this.currentNodeNum++;
                            this.autoRun();
                        }
                    })
                    .catch(error => {
                        this.$message.error(
                            `${
                                this.runArr[this.currentNodeNum].name
                            } 节点运行失败，请确认参数！`
                        );
                        this.loading.close();
                        console.log(error);
                    });
            }
        },
        deployTest() {
            // 找到节点中 is_generate_model: "true"
            // 部署当前 KNN UUID
            this.$api
                .post(POST_DEPLOY_MODEL, {
                    user_id: '123',
                    user_name: '123',
                    experiment_name: '123',
                    // run_id: "facacc9d6f4e47ba8c7a81ee930a9089",
                    run_id: this.runArr[3].artifact_path,
                    order: 'start',
                    terminate_port: '0'
                })
                .then(res => {
                    // 将信息发送给徐昊 进行保存
                    this.$api
                        .post(POST_DEPLOY_MODEL_SAVE, {
                            data_user_id: localStorage.getItem('data_user_id'),
                            data_model_id: this.runArr[3].saveId,
                            model_host: res.data.host,
                            model_port: res.data.port,
                            model_run_uuid: this.runArr[3].artifact_path
                        })
                        .then(res => {});
                });
        },
        deploy() {
            this.sendJson(this.runArr[this.currentNodeNum]);
        },
        // 部署
        closeAutoMaticOptions() {
            this.dialogTableVisible = false;
        },
        // 搜索实验关键词
        searchTest() {
            if (this.searchVal) {
                this.$api
                    .post(POST_SEARCH_TEST, {
                        data_user_id: localStorage.getItem('data_user_id'),
                        data_project_id: this.data_project_id,
                        data_test_name: this.searchVal
                    })
                    .then(res => {
                        this.all_project = res.data.search_test;
                        // 默认拿 第一个实验
                        if (
                            res.data.search_test[0] &&
                            this.choiceNodeList.length === 0
                        ) {
                            this.data_test_id = res.data.search_test[0].id;
                            this.currentTest = res.data.search_test[0];
                            this.choiceNodeList.push(this.currentTest);
                            this.getNodeList();
                        }
                    });
            } else {
                this.allTest();
            }
        },
        closeDialog() {
            this.form.test_name = '';
            this.form.test_content = '';
            this.dialogFormVisible = false;
        },
        editeTest() {
            this.$api
                .post(POST_TEST_EDIT, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    data_project_id: parseInt(this.data_project_id),
                    data_test_name: this.currentTest.test_name,
                    data_test_content: this.currentTest.test_content,
                    data_test_id: this.data_test_id
                })
                .then(res => {
                    this.$store.commit('changeCount', 0);
                    this.allTest();
                    // 保留当前已打开的标签
                });
        },
        // 创建实验
        createTest() {
            this.$api
                .post(CREATE_TEST, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    test_project_id: this.data_project_id,
                    test_name: this.form.test_name,
                    test_content: this.form.test_content
                })
                .then(res => {
                    this.allTest();
                    // 初次使用 创建实验后 继续提示
                    if (this.$store.state.step === 2) {
                        this.$store.commit('changeDemoStaion', true);
                    }
                    this.dialogFormVisible = false;
                });
        },
        // 删除实验
        deleteTest() {
            this.$api
                .post(GET_TEST_DELETE, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    data_project_id: this.data_project_id,
                    data_test_id: this.data_test_id
                })
                .then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    this.allTest();
                    console.log(res);
                });
        },
        getNodeList() {
            // GET_NODE_INFORMATION
            this.yourJSONDataFillThere = {
                nodes: [],
                edges: []
            };
            this.$api
                .get(
                    GET_NODE_INFORMATION +
                        '?data_project_id=' +
                        this.data_project_id +
                        '&test_id=' +
                        this.data_test_id
                )
                .then(res => {
                    console.log(res);
                    this.yourJSONDataFillThere = res.data.data_node_mes || {
                        nodes: [],
                        edges: []
                    };
                    console.log('节点信息', this.yourJSONDataFillThere);
                });
        },
        saveNode() {
            // 判断当前数据 是否是空
            if (this.yourJSONDataFillThere.nodes.length === 0) {
                return;
            }
            this.$api
                .post(SAVE_NODES, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    data_project_id: this.data_project_id,
                    data_test_id: this.data_test_id,
                    data_node_mes: this.yourJSONDataFillThere
                })
                .then(res => {
                    this.uploadJSONDataFillThere = this.yourJSONDataFillThere;
                });
        },
        changeExperiment(num, id) {
            this.isShowNode = false;
            this.currentTest = this.all_project[num];
            this.data_test_id = id; // 当前实验的ID
            this.getNodeList();
            // 判断choiceNodeList 是否存在当前节点 如果没有 则push
            this.choiceNodeList.forEach(item => {
                if (item.id === this.all_project[num].id) {
                    throw new Error('已存在当前节点');
                }
            });
            this.choiceNodeList.push(this.all_project[num]);
        },
        allTest() {
            // 获取实验列表
            this.$api
                .post(ALL_TEST, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    data_project_id: this.data_project_id
                })
                .then(res => {
                    if (res.data.all_project.length === 0) {
                        this.getAllTestStatus = true;
                        this.isShowDialog();
                    } else {
                        this.getAllTestStatus = false;
                    }
                    this.all_project = res.data.all_project;
                    // 默认拿 第一个实验
                    if (
                        res.data.all_project[0] &&
                        this.choiceNodeList.length === 0
                    ) {
                        this.data_test_id = res.data.all_project[0].id;
                        this.currentTest = res.data.all_project[0];
                        this.choiceNodeList.push(this.currentTest);
                        console.log('当前实验id', this.data_test_id);
                        this.getNodeList();
                    } else if (res.data.all_project[0]) {
                        console.log('当前实验id', this.data_test_id);
                    } else {
                        // 没有试验 不显示试验属性 和 无法拖拽组件
                        this.data_test_id = '';
                        this.currentTest = '';
                        this.choiceNodeList = [];
                    }
                });
        },
        ctrlC() {
            let currentChoice = this.$refs.DAGBoard.choice;
            if (currentChoice.index > -1) {
                // 有选中元素
                let activeNodes = this.yourJSONDataFillThere.nodes.filter(
                    item => currentChoice.paneNode.indexOf(item.id) > -1
                );
                this.copyContent = JSON.parse(JSON.stringify(activeNodes));
                this.copyContent.forEach(item => {
                    item.id =
                        item.id + this.yourJSONDataFillThere.nodes.length + 100; // 自定义id规范 这里随便写个长度+100作为id
                    item.pos_x += 100 / (sessionStorage['svgScale'] || 1);
                    item.pos_y += 100 / (sessionStorage['svgScale'] || 1);
                });
            }
        },
        ctrlV() {
            if (!this.copyContent.length) return false;
            this.yourJSONDataFillThere.nodes.push(...this.copyContent);
            this.$refs.DAGBoard.choice = {
                paneNode: [], // 选取的节点下标组
                index: -1,
                point: -1
            }; // 复制完成 取消选中状态
            this.copyContent = [];
        },
        updateDAG(data, action, id) {
            // console.log(...arguments)
            // console.log(JSON.stringify(arguments[0]))
            switch (action) {
                case 'selectNode':
                    this.showNodeDetails(
                        data.nodes.find(item => item.id === id)
                    );
                    break;
                default:
                    () => {};
            }
        },
        editNodeDetails() {
            console.log(...arguments);
        },
        doSthPersonal() {
            console.log(...arguments);
        },
        findNodeMaxNumber(str) {
            // 通过传入的节点名称 进行查找
            let targetArr = this.uploadJSONDataFillThere.nodes;
            let resultNum = 0; // 初始值是0
            targetArr.forEach(item => {
                if (item.name.indexOf(str) !== -1) {
                    let splitArr = item.name.split('-');
                    // 从中找到最大的编号
                    if (resultNum < splitArr[2]) {
                        resultNum = splitArr[2];
                    }
                }
                // 找到包含的关键词
            });
            resultNum++;
            return resultNum;
        },
        /**
         * 通过拖拽方式加入新节点必须的函数
         */
        startNodesBus(e) {
            /**
             *  别的组件调用时, 先放入缓存
             * dragDes: {
             *    drag: true,
             *    name: 组件名称
             *    type: 组件类型
             *    model_id: 跟后台交互使用
             * }
             **/

            let dragDes = null;
            if (sessionStorage['dragDes']) {
                dragDes = JSON.parse(sessionStorage['dragDes']);
            }
            if (dragDes && dragDes.drag) {
                const x = e.pageX;
                const y = e.pageY;
                this.busValue = Object.assign({}, this.busValue, {
                    pos_x: x,
                    pos_y: y,
                    value: dragDes.name
                });
                this.dragBus = true;
            }
            if (dragDes) {
                this.operationLog(`新增节点 ${dragDes.name}`);
                this.saveNode();
            }
        },
        moveNodesBus(e) {
            // 移动模拟节点
            if (this.dragBus) {
                const x = e.pageX - 150; // 调整坐标偏移
                const y = e.pageY - 50;
                this.busValue = Object.assign({}, this.busValue, {
                    pos_x: x,
                    pos_y: y
                });
            }
        },
        // 追加模型测试节点
        addNodeModelTest(pos_x, pos_y, node_id, str) {
            // 克隆对象
            let obj = JSON.parse(
                JSON.stringify(this.nodeLabel4[0].nodeItem[0])
            );
            // 重置模板数据
            let component_id = str + obj.component_id;
            const params = {
                model_id: sessionStorage['newGraph'],
                desp: {
                    pos_x,
                    pos_y,
                    ...obj
                }
            };
            params.desp.component_id = component_id;
            let current_node_id = new Date().getTime() - 2000;
            this.yourJSONDataFillThere.nodes.push({
                ...params.desp,
                id: current_node_id
            });
            // 将当前节点与模型测试节点 进行关联
            this.yourJSONDataFillThere.edges.push({
                dst_input_idx: 0,
                dst_node_id: current_node_id,
                id: new Date().getTime(),
                src_node_id: node_id,
                src_output_idx: 0
            });
        },
        endNodesBus(e) {
            // 节点放入svg

            let dragDes = null;
            if (sessionStorage['dragDes']) {
                dragDes = JSON.parse(sessionStorage['dragDes']);
            }
            if (dragDes && dragDes.drag && e.toElement.id === 'svgContent') {
                let nodeName = '';
                if (dragDes.name.indexOf('-') !== -1) {
                    dragDes.name =
                        dragDes.name +
                        '-' +
                        this.findNodeMaxNumber(dragDes.name); // 当前节点下的最大值 + 1
                } else {
                    dragDes.name = dragDes.name;
                }
                const pos_x =
                    (e.offsetX - 90 - (sessionStorage['svg_left'] || 0)) /
                    (sessionStorage['svgScale'] || 1); // 参数修正
                const pos_y =
                    (e.offsetY - 15 - (sessionStorage['svg_top'] || 0)) /
                    (sessionStorage['svgScale'] || 1); // 参数修正
                delete dragDes.drag;
                const params = {
                    model_id: sessionStorage['newGraph'],
                    desp: {
                        pos_x,
                        pos_y,
                        name: dragDes.name,
                        ...dragDes
                    }
                };
                let currentId = new Date().getTime();
                this.yourJSONDataFillThere.nodes.push({
                    ...params.desp,
                    id: currentId
                    // id: this.yourJSONDataFillThere.nodes.length + 100// 这里注意, 新增的id一定不能重复, 建议id交由后端处理
                    // in_ports: [0],
                    // out_ports: [0]
                });
                // 选择算法下面的节点 拖拽后 默认都要 追加一个 模型测试
                if (dragDes.tag_type && dragDes.tag_type === 'arithmetic') {
                    this.addNodeModelTest(
                        pos_x + 200,
                        pos_y + 100,
                        currentId,
                        'cla_'
                    );
                    // 模型测试
                } else if (
                    dragDes.tag_type &&
                    dragDes.tag_type === 'arithmetic2'
                ) {
                    // 回归
                    this.addNodeModelTest(
                        pos_x + 200,
                        pos_y + 100,
                        currentId,
                        'reg_'
                    );
                }
            }
            window.sessionStorage['dragDes'] = null;
            this.dragBus = false;
            this.saveNode();
            // console.log('保存', e)
        },
        dragIt(val) {
            val.form.createTime = new Date().toDateString();
            sessionStorage['dragDes'] = JSON.stringify({
                drag: true,
                ...val
            });
            console.log('结果', sessionStorage['dragDes']);
        },
        /**
         * 右侧form展示逻辑
         */
        showNodeDetails(val) {
            // 展示选中的节点
            console.log('选中节点的数据', val);
            // 显示对应模块 并传递参数
            // 展示节点显示的内容
            this.isShowNode = true;
            this.nodeForm = val.form;
            this.nodeTitle = val.name;
            this.componentId = val.component_id;
            this.nodeId = val.id;
            const { id, form } = val;
            if (!form) return;
            this.formDetail = {
                currentEditNodeId: id,
                form
            };
        },

        onSubmit() {
            // 更新所选节点的信息
            const { currentEditNodeId, form } = this.formDetail;
            this.yourJSONDataFillThere.nodes.map(item => {
                if (item.id === currentEditNodeId) {
                    item.form = form;
                }
            });
            let _data = this.yourJSONDataFillThere.nodes.find(
                item => item.id === currentEditNodeId
            ).form;
            let str = JSON.stringify(_data, null, 4);
            alert('节点信息更新完成' + str);
        }
    }
};
</script>

<style lang="scss" scoped>
.diagramExample {
    width: 100%;
    height: calc(100vh - 70px);
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    background-color: #292c36;
    /*border-top-left-radius: 50px;*/
    .tag-line {
        position: absolute;
        width: 100%;
        height: 37px;
        background: #22242b;
        padding-left: 230px;
        span.active {
            background: #292c36;
            border-right: 1px solid #26282e;
            border-left: 1px solid #26282e;
            border-top: 1px solid #26282e;
        }
        span {
            padding: 8px 30px 9px 30px;
            background: #22242b;
            line-height: 37px;
            color: #ffffff;
            font-size: 14px;
            border-top: 1px solid #22242b;
            border-right: 1px solid #22242b;
            border-left: 1px solid #22242b;
            cursor: pointer;
        }
        .tag-ul {
            list-style: none;
            background: #292c36;
            background: #292c36;
            height: 37px;
            margin: 0;
            padding: 0;
            li {
                float: left;
                line-height: 37px;
                color: #fff;
                margin: 0 24px;
                font-size: 14px;
                cursor: pointer;
            }
            .iconfont {
                margin-right: 4px;
                vertical-align: middle;
                font-size: 14px;
            }
        }
    }
    .search-node-box {
        padding: 0 10px;
    }
    .node-item {
        text-align: left;
    }
    .node-label {
        padding-left: 36px;
        font-size: 14px;
        display: inline-block;
        padding-bottom: 10px;
    }
    .basic-node {
        background: #3a8ee6;
        color: #fff;
        border-radius: 4px;
        height: 30px;
        width: 160px;
        border: 1px solid #289de9;
        line-height: 30px;
        display: inline-block;
        cursor: pointer;
        user-select: none;
        margin: 4px auto 10px;
        text-align: center;
        box-sizing: border-box;
        font-size: 14px;
        display: block;
    }
    .basic-node.item-1 {
        border: 1px solid#6236FF;
        background: #6236ff;
    }
    .basic-node.item-2 {
        border: 1px solid #fa6400;
        background: #fa6400;
    }
    .basic-node.item-3 {
        border: 1px solid #6dd400;
        background: #6dd400;
    }
    .basic-node.item-4 {
        border: 1px solid #1677ff;
        background: #1677ff;
    }
    .page-left {
        position: absolute;
        left: 0;
        top: 0;
        width: 230px;
        z-index: 0;
        height: calc(100vh - 70px);
        overflow: auto;
        box-sizing: border-box;
        padding-top: 20px;
        background: #292c36;
        text-align: center;
        color: #fff;
        box-shadow: 2px 2px 10px #000000;
        .labeliing {
            text-align: left;
            font-size: 14px;
            cursor: pointer;
            padding: 20px 20px 10px 20px;
            .folder-icon {
                color: #00c0ff;
                margin-left: 2px;
                margin-right: 4px;
            }
        }
        .search-line {
            padding: 20px;
        }
        .my-experiment-title {
            text-align: left;
            padding: 0px 20px;
            cursor: pointer;
            margin: 4px 0;
            font-size: 14px;
            font-weight: normal;
        }
        .my-experiment-item {
            list-style: none;
            margin-top: 10px;
            li {
                text-align: left;
                line-height: 38px;
                padding-left: 4px;
                cursor: pointer;
                font-size: 14px;
            }
            .active {
                color: #3a8ee6;
            }
        }
        .addTest-line {
            position: absolute;
            bottom: 10px;
            width: 100%;
            padding-right: 10px;
            padding-left: 10px;
            box-sizing: border-box;
        }
    }
    .headbar {
        position: absolute;
        top: 0;
        left: 200px;
        right: 0;
        line-height: 40px;
        text-align: left;
        text-indent: 20px;
        user-select: none;
    }
    .right-form {
        width: 300px;
        position: absolute;
        right: 0;
        z-index: 2;
        top: 0;
        height: 100vh;
        border-left: 1px solid #000;
        background: #292c36;
        box-shadow: 1px 1px 10px #000;
        color: #fff;
        .title {
            font-size: 14px;
            line-height: 40px;
            border-bottom: 1px solid #ddd;
            text-align: center;
        }
        .right-content {
            padding: 10px 20px;
            .form-text {
                font-size: 14px;
                color: #333;
                font-weight: bold;
                margin: 10px 0;
            }
            .form-value {
                font-size: 13px;
                color: #666;
                padding-bottom: 14px;
                margin: 10px 0;
            }
        }
    }
}
/** 给svg添加格子背景 */
#svgContent {
    background-size: 50px 50px;
    background-image: linear-gradient(
            0deg,
            transparent 24%,
            rgba(255, 255, 255, 0.05) 25%,
            rgba(255, 255, 255, 0.05) 26%,
            transparent 27%,
            transparent 74%,
            rgba(255, 255, 255, 0.05) 75%,
            rgba(255, 255, 255, 0.05) 76%,
            transparent 77%,
            transparent
        ),
        linear-gradient(
            90deg,
            transparent 24%,
            rgba(255, 255, 255, 0.05) 25%,
            rgba(255, 255, 255, 0.05) 26%,
            transparent 27%,
            transparent 74%,
            rgba(255, 255, 255, 0.05) 75%,
            rgba(255, 255, 255, 0.05) 76%,
            transparent 77%,
            transparent
        );
    background-color: #0c0f13 !important;
    margin-left: 230px;
    /*margin-top: 40px;*/
    /*margin-right: 200px;*/
}
</style>
<style>
.diagramExample .el-input__inner,
.diagramExample .el-textarea__inner {
    background-color: #16191d;
    color: #ffffff;
    border: 1px solid #16191d;
}
.dataView .el-dialog__title {
    font-size: 14px;
}
.dataView .el-dialog__body {
    padding-top: 10px;
}
.create-test .el-dialog {
    width: 500px;
}
</style>
