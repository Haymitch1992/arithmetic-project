<template>
    <div class="bg">
        <div class="onlineDetail-box">
            <div class="back-line">
                <span class="el-icon-arrow-left" @click="backPage()"></span>
                道岔转辙机故障诊断
            </div>
            <div>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="服务详情" name="first">
                        <div class="btn-line">
                            <el-button
                                size="small"
                                :disabled="model_state === 0"
                                @click="goDebug"
                            >
                                在线调试
                            </el-button>
                            <el-button
                                size="small"
                                @click="dialogFormVisible = true"
                            >
                                调用方式
                            </el-button>
                        </div>
                        <div>
                            <h3 class="online-title">基本信息</h3>
                            <ul class="online-ul">
                                <li>
                                    <span class="list-text">创建时间</span>
                                    <span class="list-content">
                                        {{ model_data.create_time }}
                                    </span>
                                    <span class="list-text">模型名称</span>
                                    <span class="list-content">
                                        {{ model_data.model_name }}
                                    </span>
                                </li>
                                <li>
                                    <span class="list-text">模型描述</span>
                                    <span class="list-content">
                                        {{ model_data.model_describe }}
                                    </span>
                                    <span class="list-text">模型格式</span>
                                    <span class="list-content">
                                        {{ model_data.model_type }}
                                    </span>
                                </li>
                                <li>
                                    <span class="list-text">生成方式</span>
                                    <span class="list-content">
                                        {{ model_data.model_versions_id }}
                                    </span>
                                    <span class="list-text">部署时间</span>
                                    <span class="list-content">
                                        {{
                                            model_info_data.create_time
                                                | create_time
                                        }}
                                    </span>
                                </li>
                                <li>
                                    <span class="list-text">容器名称</span>
                                    <span
                                        class="list-content"
                                        :title="model_info_data.container_name"
                                        style="text-overflow: ellipsis;overflow:hidden;"
                                    >
                                        {{ model_info_data.container_name }}
                                    </span>
                                    <span class="list-text">镜像id</span>
                                    <span class="list-content">
                                        {{ model_info_data.image_id }}
                                    </span>
                                </li>
                                <li>
                                    <span class="list-text">模型状态描述</span>
                                    <span class="list-content">
                                        {{ model_info_data.message }}
                                    </span>
                                    <span class="list-text">模型版本号</span>
                                    <span class="list-content">
                                        {{ model_info_data.version }}
                                    </span>
                                </li>
                                <li>
                                    <span class="list-text">运行时间</span>
                                    <span class="list-content">
                                        {{ model_info_data.run_time }}
                                    </span>
                                </li>
                                <li>
                                    <span class="list-text">使用资源</span>
                                    <span class="progress-item">
                                        <el-progress
                                            :width="60"
                                            color="#52cca3"
                                            :show-text="false"
                                            type="circle"
                                            :percentage="25"
                                        ></el-progress>
                                        <span class="progress-title">内存</span>
                                        <span class="progress-text">50M</span>
                                    </span>
                                    <span class="progress-item">
                                        <el-progress
                                            :width="60"
                                            :show-text="false"
                                            type="circle"
                                            :percentage="25"
                                        ></el-progress>
                                        <span class="progress-title">CPU</span>
                                        <span class="progress-text">1</span>
                                    </span>
                                    <span class="progress-item">
                                        <el-progress
                                            :width="60"
                                            :show-text="false"
                                            type="circle"
                                            :percentage="25"
                                        ></el-progress>
                                        <span class="progress-title">GPU</span>
                                        <span class="progress-text">1</span>
                                    </span>
                                </li>
                            </ul>
                            <h3 class="online-title">服务配置</h3>
                            <div class="editor-box"></div>
                        </div>

                        <el-dialog
                            title="调用方式"
                            :visible.sync="dialogFormVisible"
                        >
                            <el-form :model="form">
                                <el-form-item label="访问地址">
                                    <el-input
                                        autocomplete="off"
                                        v-model="urlValue"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="Tocken">
                                    <el-input
                                        autocomplete="off"
                                        v-model="tockenValue"
                                    ></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">
                                    取 消
                                </el-button>
                                <el-button
                                    type="primary"
                                    @click="dialogFormVisible = false"
                                >
                                    确 定
                                </el-button>
                            </div>
                        </el-dialog>
                    </el-tab-pane>
                    <el-tab-pane label="事件查看" name="second">
                        <el-table :data="incident_data">
                            <el-table-column label="事件类型">
                                <template slot-scope="scope">
                                    <span
                                        class="model-status"
                                        :class="
                                            'model-status-' + scope.row.state
                                        "
                                    ></span>
                                    {{ scope.row.state | typeZn }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="incident_deca"
                                label="事件信息"
                            ></el-table-column>
                            <el-table-column
                                prop="create_time"
                                label="事件发生时间"
                                sortable
                            >
                                <template slot-scope="scope">
                                    <span>
                                        {{
                                            scope.row.create_time | create_time
                                        }}
                                    </span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pagination-line">
                            <el-pagination
                                @size-change="handleSizeChange"
                                background
                                @current-change="handleCurrentChange"
                                :current-page="currentPage4"
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="incident_data_count"
                            ></el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="日志查看" name="third">
                        <div>
                            <el-table :data="modelLogList">
                                <el-table-column
                                    prop="data"
                                    :show-overflow-tooltip="true"
                                    label="参数"
                                ></el-table-column>
                                <el-table-column
                                    prop="mes"
                                    label="返回值"
                                ></el-table-column>
                                <el-table-column
                                    prop="create_time"
                                    label="时间"
                                    sortable
                                >
                                    <template slot-scope="scope">
                                        <span>
                                            {{
                                                scope.row.create_time
                                                    | create_time
                                            }}
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="pagination-line">
                                <el-pagination
                                    @size-change="handleSizeChange1"
                                    background
                                    @current-change="handleCurrentChange1"
                                    :current-page="modelPage"
                                    :page-sizes="[10, 20, 30, 40]"
                                    :page-size="modelSize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="modelCount"
                                ></el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="监控信息" name="fourth">
                        <h3 class="online-title">资源使用情况</h3>
                        <div class="progress-item-div">
                            <el-progress
                                type="circle"
                                color="#6699ff"
                                :percentage="75"
                            ></el-progress>
                            <p>CPU</p>
                            <ul>
                                <li>
                                    <span
                                        class="square-icon"
                                        style="background: #6699ff;"
                                    ></span>
                                    <span>已使用 0.75</span>
                                </li>
                                <li>
                                    <span class="square-icon"></span>
                                    <span>可用 1</span>
                                </li>
                            </ul>
                        </div>
                        <div class="progress-item-div">
                            <el-progress
                                type="circle"
                                color="#52cca3"
                                :percentage="19"
                            ></el-progress>
                            <p>内存</p>
                            <ul>
                                <li>
                                    <span
                                        class="square-icon"
                                        style="background: #52cca3;"
                                    ></span>
                                    <span>已使用 0.75</span>
                                </li>
                                <li>
                                    <span class="square-icon"></span>
                                    <span>可用 1</span>
                                </li>
                            </ul>
                        </div>
                        <div class="progress-item-div">
                            <el-progress
                                type="circle"
                                color="#32c5ff"
                                :percentage="75"
                            ></el-progress>
                            <p>GPU</p>
                            <ul>
                                <li>
                                    <span
                                        class="square-icon"
                                        style="background: #32c5ff;"
                                    ></span>
                                    <span>已使用 0.75</span>
                                </li>
                                <li>
                                    <span class="square-icon"></span>
                                    <span>可用 1</span>
                                </li>
                            </ul>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="部署配置" name="fifth">
                        <h3 class="online-title">扩缩容</h3>
                        <p style="font-size: 13px;">模型部署占用资源：</p>
                        <p style="font-size: 13px;">
                            <span style="margin-right: 110px;">
                                <span style="color:#FF3B30;margin-right:6px;">
                                    *
                                </span>
                                实例数
                            </span>
                            <span>
                                <span style="color:#FF3B30;margin-right:6px;">
                                    *
                                </span>
                                Quota(1核、4GB内存)
                            </span>
                        </p>
                        <div>
                            <el-input-number
                                size="small"
                                v-model="num"
                                controls-position="right"
                                @change="handleChange"
                                :min="1"
                                :max="10"
                            ></el-input-number>
                            <span style="margin: 0 10px;">X</span>
                            <el-input-number
                                size="small"
                                v-model="num2"
                                controls-position="right"
                                @change="handleChange"
                                :min="1"
                                :max="10"
                            ></el-input-number>
                            <span style="margin: 0 10px;">=</span>
                            <span style="color:#1677FF;">
                                {{ parseInt(num * num2) }}
                            </span>
                            <span style="color: #666;margin: 0 10px;">
                                Quota(1核、4GB内存)
                            </span>
                        </div>
                        <div class="set-info">
                            <p>
                                <span
                                    class="el-icon-warning "
                                    style="color:#1677FF;margin-right: 4px;"
                                ></span>
                                1Quota等于1核、4GB内存
                            </p>
                            <p>
                                <span
                                    class="el-icon-warning "
                                    style="color:#1677FF;margin-right: 4px;"
                                ></span>
                                对于高稳定性要求的正式服务，建议使用包含多台机器的资源组，并部署多个资源实例。
                            </p>
                        </div>
                        <h3 class="online-title">服务降级</h3>
                        <table class="check-table">
                            <tr>
                                <td>服务名称</td>
                                <td>服务名称</td>
                                <td>操作</td>
                            </tr>
                            <tr>
                                <td>模型部署</td>
                                <td>
                                    <span
                                        class="model-status model-status-1"
                                        :class="{
                                            'model-status-2': !checkForm.value1
                                        }"
                                    ></span>
                                    {{ checkForm.value1 ? '已开启' : '已停止' }}
                                </td>
                                <td>
                                    <el-switch
                                        v-model="checkForm.value1"
                                    ></el-switch>
                                </td>
                            </tr>
                            <tr>
                                <td>服务日志</td>
                                <td>
                                    <span
                                        class="model-status model-status-1"
                                        :class="{
                                            'model-status-2': !checkForm.value2
                                        }"
                                    ></span>
                                    {{ checkForm.value2 ? '已开启' : '已停止' }}
                                </td>
                                <td>
                                    <el-switch
                                        v-model="checkForm.value2"
                                    ></el-switch>
                                </td>
                            </tr>
                            <tr>
                                <td>服务监控</td>
                                <td>
                                    <span
                                        class="model-status model-status-1"
                                        :class="{
                                            'model-status-2': !checkForm.value3
                                        }"
                                    ></span>
                                    {{ checkForm.value3 ? '已开启' : '已停止' }}
                                </td>
                                <td>
                                    <el-switch
                                        v-model="checkForm.value3"
                                    ></el-switch>
                                </td>
                            </tr>
                            <tr>
                                <td>在线调试</td>
                                <td>
                                    <span
                                        class="model-status model-status-1"
                                        :class="{
                                            'model-status-2': !checkForm.value4
                                        }"
                                    ></span>
                                    {{ checkForm.value4 ? '已开启' : '已停止' }}
                                </td>
                                <td>
                                    <el-switch
                                        v-model="checkForm.value4"
                                    ></el-switch>
                                </td>
                            </tr>
                        </table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import {
    POST_MODEL_INFO,
    POST_MODEL_LOG,
    POST_MODEL_SHOW,
    POST_MODEL_STATUS,
    GET_MODEL_INCIDENT,
    GET_MODEL_LOG
} from '../../assets/url';
export default {
    name: 'home',
    filters: {
        typeZn(val) {
            switch (val) {
                case 1:
                    return '成功';
                case 0:
                    return '失败';
                case 3:
                    return '报警';
            }
        },
        transferM(val) {
            if (!val) return 0;
            return parseInt(val / 60);
        },
        create_time(val) {
            if (!val) return '';
            return moment(val).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    data() {
        return {
            model_state: 0,
            tockenValue: localStorage.getItem('data_user_token'),
            urlValue: '',
            modelObject: {},
            checkForm: {
                value1: true,
                value2: true,
                value3: false,
                value4: false
            },
            incident_data: [],
            incident_data_count: 0,
            logJson: {},
            model_data: {},
            model_info_data: {},
            pageObj: {
                create_time: '',
                model_explain: '',
                model_name: '',
                model_server: '',
                model_type: '',
                update_time: ''
            },
            num: '',
            num2: '',

            value1: [],
            activeName: 'first',
            isStart: true,
            dialogFormVisible: false,
            form: {},
            currentPage4: 1,
            all_incident: [],
            checked_all_incident: [],
            incidentList: [
                {
                    type: 1,
                    info: '模型部署成功并测试',
                    time: '2020-7-12 20:20:10'
                },
                {
                    type: 2,
                    info: '生成可视化图表',
                    time: '2020-7-12 20:20:10'
                },
                {
                    type: 3,
                    info: '事件发生时间',
                    time: '2020-7-12 20:20:10'
                }
            ],
            mid: '',
            pageSize: 10,
            modelSize: 10,
            modelPage: 1,
            modelCount: 0,
            modelLogList: [],
            deploy_model_id: ''
        };
    },
    methods: {
        backPage() {
            this.$router.push('/online');
        },

        // 获取模型日志
        getModelLog() {
            this.$api
                .get(GET_MODEL_LOG, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    deploy_model_id: this.deploy_model_id,
                    size: this.modelSize,
                    page: this.modelPage
                })
                .then(res => {
                    this.modelLogList = res.data.log_data;
                    this.modelCount = res.data.count;
                });
        },
        getModelIncident() {
            this.$api
                .get(GET_MODEL_INCIDENT, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    deploy_model_id: this.deploy_model_id,
                    size: this.pageSize,
                    page: this.currentPage4
                })
                .then(res => {
                    this.incident_data = res.data.incident_data;
                    this.incident_data_count = res.data.count;
                });
        },
        // 修改服务状态
        changeStatus(statusNum) {
            this.$api
                .post(POST_MODEL_STATUS, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    deploy_model_id: this.mid,
                    data_state: statusNum
                })
                .then(res => {
                    this.getInfo();
                    this.getLogInfo();
                    this.getEventInfo();
                });
        },
        // 获取事件详情
        getEventInfo() {
            this.$api
                .post(POST_MODEL_SHOW, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    deploy_model_id: this.mid
                })
                .then(res => {
                    this.all_incident = res.data.all_incident;
                    this.handleCurrentChange(1);
                    // this.isStart = res.data.model_type ? true : false
                });
        },
        getLogInfo() {
            this.$api
                .post(POST_MODEL_LOG, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    deploy_model_id: this.mid
                })
                .then(res => {
                    this.logJson = res.data.all_log_record;
                });
        },
        getInfo() {
            this.$api
                .get(POST_MODEL_INFO, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    version: this.modelObject.version,
                    model_only_name: this.modelObject.model_only_name
                    // deploy_model_id: this.mid
                })
                .then(res => {
                    this.model_data = res.data.model_data;
                    this.model_info_data = res.data.model_info_data;
                    this.urlValue =
                        this.model_info_data.ip +
                        ':' +
                        this.model_info_data.port;
                    // this.pageObj = { ...res.data };
                    this.model_state = res.data.model_info_data.state;
                    this.deploy_model_id = res.data.model_info_data.id;
                    this.getModelIncident();
                    this.getModelLog();
                });
        },
        handleChange(value) {
            console.log(value);
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        changeStart() {
            this.isStart = !this.isStart;
            if (this.isStart) {
                this.changeStatus(1);
            } else {
                this.changeStatus(0);
            }
        },
        goDebug() {
            this.$router.push({
                name: 'debug',
                params: {
                    obj: {
                        model_version: this.model_info_data.version,
                        model_only_name: this.model_info_data.model_only_name
                    }
                }
            });
            this.$router.push('/debug');
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getModelIncident();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage4 = val;
            this.getModelIncident();
            console.log(`当前页: ${val}`);
        },
        handleSizeChange1(val) {
            this.modelSize = val;
            this.getModelLog();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange1(val) {
            this.modelPage = val;
            this.getModelLog();
            console.log(`当前页: ${val}`);
        }
    },
    mounted() {
        if (this.$route.params.modelObject) {
            this.mid = this.$route.params.modelObject;
            this.modelObject = this.$route.params.modelObject;
            this.getInfo();
            this.$store.commit('changeMenuIndex', '5');
            // this.getLogInfo();
            // this.getEventInfo();
            // console.log(this.$route.params.mid);
        } else {
            this.$router.push('/online');
            console.log('没有参数');
        }
    }
};
</script>

<style scoped lang="scss">
.bg {
    padding: 20px;
}
.onlineDetail-box {
    height: calc(100vh - 100px);
    background-color: #fff;
    border-top-left-radius: 50px;
    padding: 20px 30px;
    box-sizing: border-box;
    /deep/ .el-dialog {
        width: 500px;
    }
    .back-line {
        font-size: 16px;
        color: #333;
        line-height: 40px;
    }
    .btn-line {
        padding-top: 4px;
        .el-button {
            width: 100px;
        }
    }
    .online-title {
        color: #333;
        font-size: 16px;
        margin: 14px 0 4px;
    }
    .online-ul {
        list-style: none;
        margin: 0;
        padding: 0 0 0 4px;
        li {
            line-height: 34px;
            font-size: 14px;
            color: #666;
        }
        .list-text {
            width: 12%;
            display: inline-block;
            vertical-align: top;
        }
        .list-content {
            width: 24%;
            display: inline-block;
            vertical-align: top;
        }
        .progress-item {
            text-align: center;
            width: 80px;
            display: inline-block;
            padding-top: 20px;
            margin-right: 40px;
            position: relative;
            span {
                display: block;
            }
            .progress-title {
                position: relative;
                top: -16px;
            }
            .progress-text {
                position: absolute;
                top: 34px;
                width: 80px;
                left: 0;
            }
        }
    }
    .editor-box {
        margin-top: 10px;
        height: 140px;
        background: #f3f3f3;
    }
    .model-status {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;
        background-color: #666666;
        vertical-align: middle;
        margin-right: 6px;
    }
    .model-status-0 {
        background-color: #dddddd;
    }
    .model-status-1 {
        background-color: #52c41a;
    }
    .model-status-2 {
        background-color: #ff3b30;
    }
    .model-status-3 {
        background-color: #ebad18;
    }

    .pagination-line {
        background-color: #fff;
        padding: 20px 20px 10px;
        text-align: right;
    }
    .log-box {
        background: #f3f3f3;
        margin-top: 10px;
        height: calc(100vh - 280px);
        overflow-y: auto;
    }
    .progress-item-div {
        width: 250px;
        text-align: center;
        position: relative;
        display: inline-block;
        padding-top: 30px;
        p {
            text-align: center;
        }
        ul {
            position: absolute;
            bottom: 0;
            right: 0;
            text-align: left;
            list-style: none;
            li {
                font-size: 12px;
                color: #999;
                line-height: 24px;
            }
            .square-icon {
                width: 10px;
                height: 10px;
                display: inline-block;
                border-radius: 2px;
                background: #e5e9f2;
                margin-right: 4px;
            }
        }
    }
    .set-info {
        background: #e7f1ff;
        width: 550px;
        padding: 4px 20px;
        border-radius: 6px;
        font-size: 13px;
        margin-top: 10px;
        color: #666;
    }
    .check-table {
        width: 100%;
        border-collapse: collapse;
        tr:first-child td {
            background: #fafafa;
        }
        td {
            border-bottom: 1px solid #eeeeee;
            padding: 10px 0;
            font-size: 14px;
            color: #333;
            text-align: center;
        }
    }
}
</style>
<style>
.onlineDetail-box .onlineDetail-box .el-table td {
    padding: 16px 0;
}
.onlineDetail-box .el-table th .cell {
    color: #666666;
}
.onlineDetail-box .el-table th {
    background-color: #fafafa;
    font-weight: normal;
}
</style>
