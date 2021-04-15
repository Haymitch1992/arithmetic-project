<template>
    <div class="bg">
        <div class="online-box modelManagement">
            <div class="inp-line">
                <el-input
                    size="small"
                    placeholder="请输入搜索内容"
                    style="width: 300px"
                ></el-input>
                <el-button size="small" @click="dialogFormVisible3 = true">
                    导入
                </el-button>
            </div>
            <el-table v-loading="loading" :data="datalist">
                <el-table-column label="模型名称">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="goModelDetail(scope.row)"
                        >
                            {{ scope.row.model_name }}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="model_test_name"
                    label="所属实验"
                ></el-table-column>
                <el-table-column
                    prop="model_versions_id"
                    label="模型来源"
                ></el-table-column>
                <el-table-column prop="update_time" label="更新时间">
                    <template slot-scope="scope">
                        <span>{{ scope.row.create_time | create_time }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            @click="openVersionDialog(scope.row)"
                        >
                            模型版本
                        </el-button>
                        <el-button type="text" @click="deleteModel(scope.row)">
                            删除
                        </el-button>
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
                    :page-size="size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page_count"
                ></el-pagination>
            </div>
            <!-- 模型部署 -->
            <el-dialog title="模型版本" :visible.sync="modelListVisible">
                <el-table
                    :data="modelList"
                    style="width: 100%"
                    border
                    v-loading="loading2"
                >
                    <el-table-column
                        prop="version"
                        label="版本号"
                    ></el-table-column>
                    <el-table-column
                        prop="status"
                        label="模型状态"
                    ></el-table-column>
                    <el-table-column label="更新时间" width="160">
                        <template slot-scope="scope">
                            {{ scope.row.last_updated_time | create_time }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="description"
                        label="描述信息"
                    ></el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="deploy(scope.row)"
                                :disabled="scope.row.status === 'SUCCEED'"
                            >
                                部署
                            </el-button>
                            <el-button
                                size="mini"
                                @click="exportModel(scope.row)"
                            >
                                导出
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    style="margin-top:20px;"
                    @size-change="handleSizeChange2"
                    @current-change="handleCurrentChange2"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="currentSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="currentTotal"
                ></el-pagination>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="modelListVisible = false">
                        确定
                    </el-button>
                </div>
            </el-dialog>

            <modelUpload
                @updateFileList="updateFileList"
                @closeDialog="dialogFormVisible3 = false"
                v-if="dialogFormVisible3"
            ></modelUpload>
        </div>
    </div>
</template>

<script>
import modelUpload from '../../components/modelUpload';
import {
    POST_CHANGE_MODEL,
    POST_DELETE_MODEL,
    POST_DEPLOY_MODEL,
    GET_MODEL_VERSION,
    POST_EXPORT_MODEL_FILE,
    POST_MODEL_DATA,
    DELETE_MODE_DATA
} from '../../assets/url';
import moment from 'moment';

export default {
    name: 'home',
    components: {
        modelUpload
    },
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
            model_only_name: '',
            modelList: [],
            currentSize: 10,
            currentPage: 1,
            currentTotal: 0,
            modelListVisible: false, // 模型列表
            loading: true,
            loading2: true,
            dialogFormVisible: false, // 修改模型信息弹框
            dialogFormVisible2: false, // 导出模型
            dialogFormVisible3: false, // 模型上传
            currentPage4: 1,
            size: 10,
            page_count: 0,
            form: {
                modelId: '',
                newModelId: '', // 新
                modelDescribe: '' // 模型描述
            },
            derive: {
                url: 'https://www.baidu.com',
                fileName: '',
                saveUrl: ''
            },
            datalist: []
        };
    },
    mounted() {
        this.getModelData();
    },
    methods: {
        updateFileList() {
            this.dialogFormVisible3 = false;
            this.getModelData();
        },
        goModelDetail(obj) {
            this.$router.push({
                name: 'modelDetail',
                params: { model_only_name: obj.model_only_name }
            });
        },
        handleSizeChange2(val) {
            this.currentSize = val;
            this.getVersions();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange2(val) {
            this.currentPage = val;
            this.getVersions();
            console.log(`当前页: ${val}`);
        },
        getVersions() {
            // GET_MODEL_VERSION

            this.$api
                .get(GET_MODEL_VERSION, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    model_only_name: this.model_only_name,
                    size: this.currentSize,
                    page: this.currentPage
                })
                .then(res => {
                    this.modelList = res.data.versions;
                    this.currentTotal = res.data.count;
                    console.log(res.data);
                    this.loading2 = false;
                });
        },
        openVersionDialog(obj) {
            this.modelListVisible = true;
            this.model_only_name = obj.model_only_name;
            this.getVersions();
        },
        // 查看部署列表
        exportModel(item) {
            console.log(item);
            this.$api
                .get(POST_EXPORT_MODEL_FILE, {
                    version: item.version,
                    model_only_name: item.name
                })
                .then(res => {
                    this.downLoadFile(res.data.zip_path);
                });
        },
        downLoadFile(str) {
            // 导出数据集
            window.location.href = this.globalUlr + str;
        },
        // 部署模型
        deploy(item) {
            this.loading2 = true;
            this.$api
                .post(POST_DEPLOY_MODEL, {
                    user_id: localStorage.getItem('data_user_id'),
                    model_name: item.name,
                    model_version: item.version,
                    order: 'start'
                    // user_name: 'uesr1',
                    // experiment_name: item.model_test_name,
                    // request_url: this.this.globalUlr,
                    // model_path: item.model_path,
                    // artifact_path: item.artifact_path,
                    // data_model_id: item.id,
                    // data_model_name: item.model_name
                })
                .then(res => {
                    this.$message({
                        type: 'success',
                        message: '部署成功!'
                    });
                    this.getVersions();
                });
        },
        postDelete() {
            this.$api
                .get(DELETE_MODE_DATA, {
                    model_only_name: this.model_only_name
                })
                .then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getModelData();
                });
        },
        getModelData() {
            this.loading = true;
            // 获取模型列表
            this.$api
                .post(POST_MODEL_DATA, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    page: this.currentPage4,
                    size: this.size
                })
                .then(res => {
                    this.loading = false;
                    this.datalist = res.data.model_data;
                    this.page_count = res.data.count;
                    console.log(res.data.model_data);
                });
        },
        editModel(modelId, model_name, modelDescribe) {
            this.form.modelId = modelId;
            this.form.newModelId = model_name;
            this.form.modelDescribe = modelDescribe;
            this.dialogFormVisible = true;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.size = val;
            this.getModelData();
        },
        handleCurrentChange(val) {
            this.currentPage4 = val;
            console.log(`当前页: ${val}`);
            this.getModelData();
        },
        deleteModel(obj) {
            this.$confirm(
                '是否确认删除模型及完成部署的环境资源, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            )
                .then(() => {
                    this.model_only_name = obj.model_only_name;
                    this.postDelete();
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        }
    }
};
</script>

<style scoped lang="scss">
.bg {
    padding: 20px;
}
.online-box {
    height: calc(100vh - 100px);
    background-color: #fff;
    border-top-left-radius: 50px;
    padding: 30px 30px 20px;
    box-sizing: border-box;
    box-shadow: 1px 2px 3px #e5e5e5;
    /deep/ .el-dialog {
        width: 800px;
    }
    .w300 {
        width: 300px;
    }
    .inp-line {
        padding: 0px 0 10px;
        .el-input {
            margin-right: 10px;
        }
        .el-button {
            width: 100px;
        }
        .float-btn {
            float: right;
        }
    }
    .pagination-line {
        background-color: #fff;
        padding: 20px 20px 10px;
        text-align: right;
    }
    .pagination-line {
        text-align: right;
    }
}
</style>
<style>
.dataTable .cell {
    font-size: 14px;
}
.modelManagement .el-dialog {
    width: 500px;
}
</style>
