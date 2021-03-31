<template>
    <div class="bg">
        <div class="online-box dataManagement">
            <el-tabs
                class="border-card-box"
                v-model="activeName"
                @tab-click="handleClick"
            >
                <el-tab-pane label="已注册数据集" name="first">
                    <el-button
                        size="small"
                        @click="openUpload"
                        style="width: 160px;"
                        icon="el-icon-upload"
                    >
                        注册数据集
                    </el-button>
                    <el-table
                        :data="dataList"
                        v-loading="loading"
                        class="dataTable"
                        style="width: 100%"
                        :key="Math.random()"
                    >
                        <el-table-column
                            prop="date"
                            label="数据集ID/名称"
                            width="200"
                        >
                            <template slot-scope="scope">
                                <span class="table-p">
                                    <el-button
                                        type="text"
                                        @click="
                                            editName(scope.row, scope.$index)
                                        "
                                        v-if="!scope.row.isShow"
                                    >
                                        {{ scope.row.data_name }}
                                    </el-button>
                                    <el-input
                                        style="width:100px;"
                                        v-if="scope.row.isShow"
                                        v-model="resetObj.name"
                                        size="small"
                                    ></el-input>
                                    <i
                                        v-if="!scope.row.isShow"
                                        class="el-icon-edit hoverShow"
                                        @click="
                                            editName(scope.row, scope.$index)
                                        "
                                        title="修改"
                                    ></i>
                                    <el-button
                                        v-if="scope.row.isShow"
                                        @click="resetName()"
                                        title="保存"
                                        size="small"
                                        type="primary"
                                    >
                                        保存
                                    </el-button>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="data_from"
                            label="数据来源"
                        ></el-table-column>
                        <el-table-column
                            prop="data_type"
                            :formatter="dataTypeZn"
                            label="存储类型"
                        ></el-table-column>
                        <el-table-column
                            prop="data_path"
                            width="180"
                            label="数据集路径/链接信息"
                        ></el-table-column>
                        <el-table-column
                            prop="create_time"
                            sortable
                            min-width="130"
                            label="创建时间"
                        >
                            <template slot-scope="scope">
                                <span>
                                    {{ scope.row.create_time | create_time }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="data_plan"
                            label="备注"
                        ></el-table-column>
                        <el-table-column
                            prop="address"
                            width="220"
                            label="操作"
                        >
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    @click="clickDelete(scope.row.id)"
                                >
                                    删除
                                </el-button>
                                <el-button
                                    type="text"
                                    @click="downLoadFile(scope.row.data_path)"
                                >
                                    导出数据集
                                </el-button>
                                <!-- <el-button type="text"  @click="getDataNumber(scope.row)"  v-if="scope.row.data_type===3">导出数据集</el-button> -->
                                <!-- 2 不可标注 -->
                                <el-button
                                    v-if="scope.row.data_label === 0"
                                    type="text"
                                    size="small"
                                    @click="createdTip(scope.row.id)"
                                    style="margin-left: 0;"
                                >
                                    创建标注任务
                                </el-button>
                                <el-button
                                    v-if="
                                        scope.row.data_label === 1 ||
                                            scope.row.data_label === 3
                                    "
                                    type="text"
                                    @click="goDetail(scope.row.id)"
                                    style="margin-left: 0;"
                                >
                                    标注
                                </el-button>
                                <el-button
                                    v-if="
                                        scope.row.data_label === 1 ||
                                            scope.row.data_label === 3
                                    "
                                    type="text"
                                    @click="changedTip(scope.row.id)"
                                    style="margin-left: 0;"
                                >
                                    修改
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination-line">
                        <el-pagination
                            @size-change="handleSizeChange"
                            background
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="page_count"
                        ></el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="数据中台可用数据集" name="second">
                    <el-input
                        v-model="searchValue"
                        style="width:200px;"
                    ></el-input>
                    <el-button @click="getSearchDataName">搜索</el-button>
                    <el-table
                        :data="showThemeList"
                        v-loading="loading"
                        style="width: 100%"
                    >
                        <el-table-column
                            prop="data_id"
                            label="数据id"
                        ></el-table-column>
                        <el-table-column
                            prop="topicName"
                            label="数据名称"
                        ></el-table-column>
                        <el-table-column prop="data_theme_id" label="数据结构">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="openDataInfo(scope.row)"
                                >
                                    详情
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="address" label="查看数据">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="OpenataStructure(scope.row)"
                                >
                                    查看
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="address" label="操作">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    @click="oepnUserData(scope.row, $event)"
                                >
                                    使用数据
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination-line">
                        <el-pagination
                            @size-change="handleSizeChange1"
                            background
                            @current-change="handleCurrentChange1"
                            :current-page="currentPage2"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="pageSize2"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="listLength"
                        ></el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <el-dialog
                title="注册数据集"
                v-if="dialogTableVisible"
                :visible.sync="dialogTableVisible"
            >
                <el-form
                    label-width="120px"
                    :model="formData"
                    :rules="rules"
                    ref="formData"
                >
                    <el-form-item label="数据集名称" prop="name">
                        <el-input
                            size="small"
                            v-model="formData.name"
                            style="width: 400px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="上传方式"
                        prop="type"
                        style="display:none;"
                    >
                        <el-radio-group v-model="formData.type">
                            <el-radio size="small" label="导入文件"></el-radio>
                        </el-radio-group>
                        <el-popover
                            placement="right"
                            width="550"
                            trigger="hover"
                        >
                            <div class="tips-img">
                                <img src="../../assets/img/tips.png" alt="" />
                            </div>
                            <el-button slot="reference" type="text">
                                <span
                                    style="margin-left: 10px;"
                                    class=" el-icon-question"
                                ></span>
                            </el-button>
                        </el-popover>
                    </el-form-item>
                    <el-form-item
                        label="存储路径"
                        prop="path"
                        v-if="formData.type === '导入文件'"
                        v-show="false"
                    >
                        <el-input
                            size="small"
                            disabled
                            v-model="formData.path"
                            style="width: 400px"
                            placeholder="请选择"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <el-upload
                    class="upload-demo"
                    v-if="formData.type === '导入文件'"
                    ref="upload"
                    :before-upload="beforeAvatarUpload"
                    :headers="usertoken"
                    drag
                    :data="{
                        data_user_id: data_user_id,
                        data_name: formData.name
                    }"
                    name="datafile"
                    :action="UPLOAD_FILE"
                    :on-success="handleAvatarSuccess"
                    :auto-upload="false"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                        拖拽文件到虚线框内上传，或
                        <em>点击上传</em>
                        <p style="padding: 0;font-size: 12px;color: #999;">
                            支持txt、csv等类型的文件，且大小不能超过20M
                        </p>
                    </div>
                </el-upload>
                <div class="btn-line">
                    <el-button
                        type="primary"
                        @click="onSubmit('formData')"
                        size="small"
                    >
                        提交
                    </el-button>
                    <el-button size="small" @click="resetForm">取消</el-button>
                </div>
            </el-dialog>
            <el-dialog
                title="参数配置"
                v-if="dialogTableVisible2"
                :visible.sync="dialogTableVisible2"
            >
                <el-form label-width="120px" :model="formData" ref="formData">
                    <el-form-item label="选择可视化列">
                        <el-select
                            size="small"
                            multiple
                            v-model="formData2.set_header_input"
                            style="width: 400px"
                            placeholder="选择要输入的表头进行可视化"
                        >
                            <el-option
                                :label="item"
                                :value="item"
                                v-for="(item, index) in headerList"
                                :key="index"
                            ></el-option>
                        </el-select>
                        <el-tooltip
                            class="item"
                            effect="dark"
                            placement="top-start"
                        >
                            <div slot="content">
                                请选择表头中，用以机器学习智能分析、
                                <br />
                                标注得有效参数，和用以可视化图表展示得有效参数。
                            </div>
                            <el-button type="text">
                                <span class="el-icon-question"></span>
                            </el-button>
                        </el-tooltip>
                    </el-form-item>
                    <el-form-item label="默认标签列">
                        <el-select
                            size="small"
                            disabled
                            v-model="formData2.set_header_type"
                            style="width: 400px"
                            placeholder="选择要修改表头"
                        >
                            <el-option label="默认值" value="null"></el-option>
                            <!-- <el-option :label="item" :value="item" v-for="(item, index) in headerList" :key="index"></el-option> -->
                        </el-select>
                        <el-tooltip
                            class="item"
                            effect="dark"
                            placement="top-start"
                        >
                            <div slot="content">
                                请选择表头中用以修改标签得有效参数。
                                <br />
                                该选项可为空，为空后会自动为数据集添加标签列。
                                <br />
                                注： 自动添加表头参数为set_header_type,
                                <br />
                                未标注 -NaN，正常 -1，异常 -0
                            </div>
                            <el-button type="text">
                                <span class="el-icon-question"></span>
                            </el-button>
                        </el-tooltip>
                    </el-form-item>
                    <el-form-item label="选择ID列">
                        <el-select
                            size="small"
                            v-model="formData2.set_header_id"
                            style="width: 400px"
                            placeholder="选择数据集中的唯一标识"
                        >
                            <el-option
                                :label="item"
                                :value="item"
                                v-for="(item, index) in headerList"
                                :key="index"
                            ></el-option>
                        </el-select>
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="请选择数据集中的唯一标识id。"
                            placement="top-start"
                        >
                            <el-button type="text">
                                <span class="el-icon-question"></span>
                            </el-button>
                        </el-tooltip>
                    </el-form-item>
                </el-form>
                <div class="btn-line">
                    <el-button type="primary" @click="submitFrom" size="small">
                        提交
                    </el-button>
                    <el-button
                        size="small"
                        @click="dialogTableVisible2 = false"
                    >
                        取消
                    </el-button>
                </div>
            </el-dialog>
            <!--数据结构详情-->
            <el-dialog
                title="数据结构详情"
                v-if="dataInfo"
                :visible.sync="dataInfo"
            >
                <el-table :data="dataInfoList" border style="width: 100%">
                    <el-table-column
                        prop="key"
                        label="数据key"
                        width="180"
                    ></el-table-column>
                    <el-table-column
                        prop="val"
                        label="数据value"
                        width="180"
                    ></el-table-column>
                    <el-table-column prop="des" label="描述"></el-table-column>
                </el-table>
            </el-dialog>
            <!--查看数据-->
            <el-dialog
                title="查看数据"
                v-if="dataStructure"
                v-loading="dialogLoading"
                :visible.sync="dataStructure"
                width="800px"
            >
                <!-- <el-slider
                    v-model="dataStructureLength"
                    :max="themeLength"
                ></el-slider> -->
                <!-- <p>
                    当前展示数据条数 {{ dataStructureLength }}/{{ themeLength }}
                    <el-button @click="getDataStructure()">查询</el-button>
                </p> -->
                <div>
                    <el-table height="350" :data="dataStructureList" border>
                        <el-table-column
                            v-for="(item, key) in dataStructureList[0]"
                            :key="key"
                            :prop="key"
                            :label="key"
                            width="180"
                        ></el-table-column>
                    </el-table>
                </div>
            </el-dialog>
            <el-dialog
                title="使用数据"
                v-if="userDataDialog"
                :visible.sync="userDataDialog"
            >
                <el-form
                    label-width="120px"
                    :model="formData"
                    :rules="rules"
                    ref="useDataForm"
                >
                    <el-form-item label="数据集名称" prop="name">
                        <el-input
                            size="small"
                            v-model="formData.name"
                            style="width: 400px"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div class="btn-line">
                    <el-button
                        type="primary"
                        @click="userDataSubmit"
                        size="small"
                    >
                        提交
                    </el-button>
                    <el-button size="small" @click="userDataDialog = false">
                        取消
                    </el-button>
                </div>
            </el-dialog>
            <div class="fly-ball" ref="flyBall">
                <span class="el-icon-s-promotion"></span>
            </div>
        </div>
    </div>
</template>

<script>
import {
    UPLOAD_FILE,
    ALL_DATA_LIST,
    DELETE_DATA_LIST,
    SET_HEADER,
    SET_OPTIONS,
    GET_OPTIONS,
    GET_DATA_THEME,
    GET_LIMIT_THEME,
    POST_SAVE_SFZTORM,
    POST_RESET_NAME,
    POST_DER_IVE_CSV_DATA,
    GET_SEARCH_DATA_NAME,
    GET_DATA_LENGTH,
    GET_TASK,
    GET_COUNT_THEME
} from '../../assets/url';

import axios from 'axios';
import moment from 'moment';
export default {
    name: 'home',
    filters: {
        modelStatusZn(val) {
            switch (val) {
                case 0:
                    return '未开始';
                case 1:
                    return '进行中';
                case 2:
                    return '已完成';
                case 3:
                    return '失败';
                case 4:
                    return '已停止';
            }
        },
        create_time(val) {
            if (!val) return '';
            return moment(val).format('YYYY-MM-DD HH:mm:ss');
        }
    },

    data() {
        return {
            dialogLoading: false,
            canChangeShow: false,
            loading: true,
            currentX: '',
            currentY: '',
            searchValue: '',
            resetObj: {
                name: '',
                id: ''
            },
            activeName: 'first',
            saveObj: {},
            userDataDialog: false,
            dataStructure: false,
            dataInfo: false,
            dataStructureLength: 100, // 获取数据的长度
            pageSize2: 10, // 数据中台单页显示条数
            themeLength: 10, // 数据总长度
            currentPage2: 1, // 数据中台数显示那页
            listLength: 0,
            dataStructureList: [],
            dataInfoList: [],
            showThemeList: [],
            usertoken: {
                usertoken: localStorage.getItem('data_user_token'),
                datauserid: localStorage.getItem('data_user_id')
            },
            taskTimer: '', // 任务列表的定时器
            data_user_id: localStorage.getItem('data_user_id'),
            isCreate: false,
            UPLOAD_FILE: UPLOAD_FILE,
            pageSize: 10,
            currentPage: 1,
            page_count: 0,
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入数据集名称',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: '长度在 3 到 10 个字符',
                        trigger: 'blur'
                    }
                ],
                path: [
                    {
                        required: true,
                        message: '请选择存储路径',
                        trigger: 'change'
                    }
                ],
                type: [
                    {
                        required: true,
                        message: '请选择上传方式',
                        trigger: 'change'
                    }
                ],
                databaseName: [
                    {
                        required: true,
                        message: '请输入数据库名',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }
                ],
                tableName: [
                    { required: true, message: '请输入表名', trigger: 'blur' },
                    {
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }
                ],
                userName: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }
                ]
            },
            headerList: [],
            formData: {
                name: '',
                type: '导入文件',
                path: '/root/TCT_API_Develop/media/',
                databaseName: '', // 数据库名
                tableName: '', // 表名
                userName: '', // 用户名
                password: '', // 密码
                data_theme_id: '',
                data_theme_name: ''
            },
            formData2: {
                set_header_input: [],
                set_header_type: 'null',
                set_header_id: '',
                data_set_id: '',
                data_user_id: this.data_user_id
            },
            fileList: [],
            dialogTableVisible: false, // 注册数据集弹窗
            dialogTableVisible2: false,
            dataList: []
        };
    },
    mounted() {
        this.getAllData();
        this.findTask();
    },
    methods: {
        flyDom(x, y) {
            // 获取屏幕宽度
            let screenWidth = document.body.clientWidth;
            // 创建一个DOM元素 获取初始的位置信息
            let targetRight = 160;
            let targetTop = 50;
            let currentRight = screenWidth - x - 60;
            let currenttop = y;
            let topNum = parseInt((currenttop - targetTop) / 20);
            let rightNum = parseInt((currentRight - targetRight) / 20);
            let ball = this.$refs.flyBall;
            ball.style.display = 'block';
            ball.style.right = currentRight + 'px';
            ball.style.top = currenttop + 'px';
            let timer = setInterval(() => {
                if (currenttop < targetTop && currentRight < targetRight) {
                    clearInterval(timer);
                    ball.style.display = 'none';
                } else {
                    currenttop -= topNum;
                    currentRight -= rightNum;
                    ball.style.right = currentRight + 'px';
                    ball.style.top = currenttop + 'px';
                }
            }, 20);
        },
        // 查询任务列表
        findTask() {
            this.$api
                .post(GET_TASK, {
                    data_user_id: this.data_user_id
                })
                .then(res => {
                    if (res.data.code === 200) {
                        this.$store.commit('saveTaskList', res.data);
                    } else {
                        this.$store.commit('saveTaskList', {
                            completed_task: [],
                            fail_task: [],
                            unfinished_task: []
                        });
                    }
                    // unfinished_task 是否为空
                    if (res.data.unfinished_task.length !== 0) {
                        // 停掉之前的定时任务
                        clearTimeout(this.taskTimer);
                        this.taskTimer = setTimeout(() => {
                            this.findTask();
                        }, 1000);
                    } else {
                        this.getAllData();
                    }
                    // 是否执行定时任务
                });
        },
        getSearchDataName() {
            // 监听是否非空
            if (this.searchValue) {
                this.loading = true;
                this.$api
                    .get(GET_SEARCH_DATA_NAME, {
                        matchStr: this.searchValue
                    })
                    .then(res => {
                        if (res.data.code === 200) {
                            this.showThemeList = res.data.data;
                            this.loading = false;
                            this.listLength = res.data.data.length;
                        }
                    });
            } else {
                this.getThemeList();
            }
        },
        // 选择导出数据数量
        getDataNumber(obj) {
            this.$api
                .get(GET_DATA_LENGTH, {
                    data_set_id: obj.id
                })
                .then(res => {
                    this.$prompt(
                        `请输入请求数据条数(共${res.data.count})`,
                        '提示',
                        {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            inputPattern: /[0-9]/,
                            inputErrorMessage: '请输入正确的数字'
                        }
                    )
                        .then(({ value }) => {
                            if (value > res.data.count) {
                                this.$message({
                                    type: 'error',
                                    message: `请求数据不能超过${res.data.count}`
                                });
                                return;
                            }
                            this.downLoadCsv(obj, value);
                        })
                        .catch(() => {
                            this.$message({
                                type: 'info',
                                message: '取消输入'
                            });
                        });
                });
        },
        // 导出数据集
        downLoadCsv(obj, num) {
            this.$api
                .post(POST_DER_IVE_CSV_DATA, {
                    data_user_id: this.data_user_id,
                    data_set_id: obj.id,
                    limit_value: num
                })
                .then(res => {
                    if (res.data.code === 200) {
                        this.downLoadFile(res.data.scv_path);
                    }
                });
        },
        // 修改名称
        editName(obj, num) {
            this.resetObj.name = obj.data_name;
            this.resetObj.id = obj.id;
            // 找到当前的id 然后修改 isShow
            if (this.canChangeShow) {
                this.$message.error('请先保存数据集名称');
                return;
            }
            // 判断是否存在更改项
            this.dataList.forEach((item, index) => {
                if (item.id === obj.id) {
                    this.canChangeShow = true;
                    this.$set(this.dataList[index], 'isShow', true);
                }
            });
            let arr = this.dataList;
            this.dataList = null;
            this.dataList = arr;
            console.log(this.dataList, obj);
        },
        resetName() {
            this.$api
                .post(POST_RESET_NAME, {
                    data_user_id: this.data_user_id,
                    set_id: this.resetObj.id,
                    new_set_name: this.resetObj.name
                })
                .then(res => {
                    if (res.data.code === 200) {
                        this.getAllData();
                        this.$message.success('修改成功');
                        this.canChangeShow = false;
                    } else {
                        this.$message.error(res.data.mes);
                    }
                });
        },
        handleClick(tab, event) {
            this.activeName = tab.name;
            if (tab.name === 'second') {
                this.getThemeList();
            }
        },
        // 使用数据提交
        userDataSubmit() {
            // 判断表单的校验规则
            this.$refs['useDataForm'].validate(valid => {
                if (valid) {
                    this.$api
                        .post(POST_SAVE_SFZTORM, {
                            data_name: this.formData.name,
                            data_theme_id: this.formData.data_theme_id,
                            data_theme_name: this.formData.data_theme_name,
                            data_user_id: this.data_user_id
                        })
                        .then(res => {
                            if (res.data.code === 200) {
                                this.userDataDialog = false;
                                this.flyDom(this.currentX, this.currentY);
                                this.getAllData();
                                // this.activeName = 'first';
                                this.formData.name = '';
                                this.findTask();
                            } else {
                                this.$message.error(res.data.mes);
                            }
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 获取长度
        getLength(obj) {
            return new Promise((resolve, reject) => {
                /* 你的逻辑代码 */
                this.$api
                    .get(GET_COUNT_THEME, {
                        data_theme_id: obj.data_id
                    })
                    .then(res => {
                        if (
                            res.data.code === 200 &&
                            res.data.data[0]['COUNT(1)'] !== 0
                        ) {
                            this.themeLength = res.data.data[0]['COUNT(1)'];
                        } else {
                            this.themeLength = 0;
                            this.$message.error('当前主题下没有数据');
                        }
                        resolve(res);
                    });
            });
        },
        getDataStructure() {
            this.dialogLoading = true;
            this.dataStructureList = [];
            this.$api
                .get(GET_LIMIT_THEME, {
                    data_theme_id: this.saveObj.data_id,
                    limit_value: this.dataStructureLength
                })
                .then(res => {
                    this.dialogLoading = false;
                    if (res.data.code === 200) {
                        this.dataStructureList = res.data.data;
                    } else {
                        this.dataStructureList = [{}];
                    }
                });
        },
        oepnUserData(obj, event) {
            this.currentX = event.clientX;
            this.currentY = event.clientY;
            this.saveObj = obj;
            // 判断是否存数据
            Promise.all([this.getLength(obj)]).then(res => {
                /* 你的逻辑代码 */
                if (res[0].data.data[0]['COUNT(1)']) {
                    this.formData.data_theme_id = obj.data_id;
                    this.formData.data_theme_name = obj.topicName;
                    this.userDataDialog = true;
                }
            });
        },
        OpenataStructure(obj) {
            this.saveObj = obj;
            Promise.all([this.getLength(obj)]).then(res => {
                /* 你的逻辑代码 */
                if (!res[0].data.data[0]['COUNT(1)']) {
                    return;
                }
                this.dataStructure = true;
                this.getDataStructure();
            });
        },
        // 查看数据结构详情
        openDataInfo(obj) {
            this.dataInfo = true;
            // 处理数据 key value desc
            let obj1 = JSON.parse(obj.dataStruct);
            obj1 = obj1[0];
            let obj2 = JSON.parse(obj.dsAnnotation);
            this.dataInfoList = [];
            for (let k in obj1) {
                this.dataInfoList.push({
                    key: k,
                    val: obj1[k],
                    des: obj2[k]
                });
            }
        },
        // 获取数据中台列表
        getThemeList() {
            this.loading = true;
            this.$api
                .get(GET_DATA_THEME, {
                    page: this.currentPage2,
                    count: this.pageSize2
                })
                .then(res => {
                    this.loading = false;
                    this.showThemeList = res.data.data;
                    this.listLength = res.data.page_count;
                });
        },
        dataTypeZn(row, column) {
            switch (row.data_type) {
                case 1:
                    return 'csv';
                case 2:
                    return 'text';
                case 3:
                    return '数据库';
            }
        },
        openUpload() {
            this.dialogTableVisible = true;
            this.formData.name = '';
        },
        beforeAvatarUpload(file) {
            console.log('文件类型', file.type);
            // const isJPG =
            //     file.type === "text/csv " ||
            //     file.type === "application/vnd.ms-excel";
            const isLt2M = file.size / 1024 / 1024 < 20;
            // if (!isJPG) {
            //     this.$message.error("上传文件只能是txt或csv格式!");
            // }
            if (!isLt2M) {
                this.$message.error('上传文件大小不能超过 20MB!');
            }
            return isLt2M;
        },
        handleAvatarSuccess(res, file) {
            // 上传成功关闭弹框
            if (res.code === 200) {
                this.dialogTableVisible = false;
                // 更新列表数据
                this.getAllData();
            }
        },
        getFormValue(id) {
            this.$api.get(GET_OPTIONS + '?data_set_id=' + id).then(res => {
                this.formData2.set_header_input = res.data.all_data_label.set_header_input.split(
                    ','
                );
                this.formData2.set_header_type =
                    res.data.all_data_lable.set_header_type;
                this.formData2.set_header_id =
                    res.data.all_data_lable.set_header_id;
                this.formData2.data_set_id =
                    res.data.all_data_lable.data_set_id;
            });
        },
        changedTip(id) {
            this.dialogTableVisible2 = true;
            this.getHeaderList(id);
            this.resetData();
            this.formData2.data_set_id = id;
            // 获取之前的信息
            this.getFormValue(id);
            this.isCreate = true;
        },
        submitFrom() {
            // 提交数据集参数
            let obj = this.formData2;
            obj.set_header_input = obj.set_header_input.toString();
            if (!this.isCreate) {
                this.$api.post(SET_OPTIONS, obj).then(res => {
                    console.log(res);
                    this.dialogTableVisible2 = false;
                    this.getAllData();
                });
            } else {
                // 更新
                this.$api.post(GET_OPTIONS, obj).then(res => {
                    console.log(res);
                    this.dialogTableVisible2 = false;
                    this.getAllData();
                });
            }
        },
        resetData() {
            // 重置data数据
            this.formData2 = {
                set_header_input: [],
                set_header_type: 'null',
                set_header_id: '',
                data_set_id: '',
                data_user_id: this.data_user_id
            };
        },
        createdTip(id) {
            this.dialogTableVisible2 = true;
            this.resetData();
            this.getHeaderList(id);
            this.formData2.data_set_id = id;
            this.isCreate = false;
        },
        handleSizeChange1(val) {
            this.pageSize2 = val;
            this.getThemeList();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange1(val) {
            this.currentPage2 = val;
            this.getThemeList();
            console.log(`当前页: ${val}`);
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getAllData();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getAllData();
            console.log(`当前页: ${val}`);
        },
        downLoadFile(str) {
            // 导出数据集
            window.location.href = this.globalUlr + str;
        },
        clickDelete(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.deleteItem(id);
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        deleteItem(id) {
            this.$api
                .post(DELETE_DATA_LIST, {
                    data_user_id: this.data_user_id,
                    set_id: id
                })
                .then(res => {
                    console.log(res);
                    this.$message.success('删除成功！');
                    this.getAllData();
                });
        },
        getHeaderList(id) {
            this.$api
                .post(SET_HEADER, {
                    data_user_id: this.data_user_id,
                    set_id: id
                })
                .then(res => {
                    console.log(res);
                    this.headerList = res.data.set_header_list;
                    // this.dataList = res.data.all_data_set
                });
        },
        getAllData() {
            this.loading = true;
            this.$api
                .post(ALL_DATA_LIST, {
                    data_user_id: this.data_user_id,
                    size: this.pageSize,
                    page: this.currentPage
                })
                .then(res => {
                    this.page_count = res.data.count;
                    this.dataList = res.data.all_data_set;
                    this.dataList.forEach((item, index) => {
                        item.isShow = false;
                    });
                    this.loading = false;
                });
        },
        resetForm() {
            this.dialogTableVisible = false;
            this.formData = {
                name: '',
                type: '导入文件',
                path: '',
                databaseName: '', // 数据库名
                tableName: '', // 表名
                userName: '', // 用户名
                password: '' // 密码
            };
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        onSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$refs.upload.submit();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        goDetail(id) {
            this.$router.push({
                name: 'dataTableDetail',
                params: { lableId: id }
            });
        }
    }
};
</script>

<style scoped lang="scss">
.fly-ball {
    position: fixed;
    width: 100px;
    height: 100px;
    display: none;
    span {
        font-size: 40px;
        color: #1677ff;
    }
}
.border-card-box {
    margin-top: 20px;
}
.bg {
    padding: 20px;
}
.online-box {
    height: calc(100vh - 100px);
    overflow-y: auto;
    background-color: #fff;
    border-top-left-radius: 50px;
    padding: 30px 30px 20px;
    box-sizing: border-box;
    box-shadow: 1px 2px 3px #e5e5e5;
    .pagination-line {
        background-color: #fff;
        padding: 20px 20px 10px;
        text-align: right;
    }
    .el-upload__tip {
        color: #999;
        margin-top: 10px;
    }
    .upload-demo {
        margin-left: 120px;
    }
    .btn-line {
        padding-left: 121px;
        padding-top: 14px;
        .el-button {
            width: 100px;
        }
    }
}
.tips-img {
    width: 550px;
    height: 310px;
    overflow: hidden;
    img {
        display: block;
        width: 100%;
    }
}
</style>
<style>
.dataTable {
    margin-top: 10px;
}
.dataTable p {
    margin: 0;
    padding: 0;
}
.dataTable th {
    background-color: #fafafa;
    padding: 4px 0;
}
.dataTable td {
    padding: 5px 0;
}
.dataTable .cell {
    font-size: 14px;
}
.dataManagement .el-dialog {
    width: 600px;
}
.table-p .hoverShow {
    opacity: 0;
    cursor: pointer;
}
.table-p:hover .hoverShow {
    opacity: 1;
}
.el-upload-dragger {
    width: 400px;
}
.online-box .upload-demo {
    padding-top: 4px;
}
.el-dialog__body {
    padding-left: 30px;
}
.el-form-item__label {
    padding-right: 26px;
}
</style>
