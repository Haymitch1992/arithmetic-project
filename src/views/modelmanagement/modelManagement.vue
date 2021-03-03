<template>
    <div class="bg">
        <div class="online-box modelManagement">
            <div class="inp-line">
                <!-- <el-dropdown>
                    <el-button size="small">
                        名称<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>名称1</el-dropdown-item>
                        <el-dropdown-item>名称2</el-dropdown-item>
                        <el-dropdown-item>名称3</el-dropdown-item>
                        <el-dropdown-item>名称4</el-dropdown-item>
                        <el-dropdown-item>名称5</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-input size="small" placeholder="请输入搜索内容" style="width: 300px"></el-input>
                <el-button size="small">新增</el-button>
                <el-button size="small">导入</el-button> -->
                <!--                <span class="float-btn">-->
                <!--                    <el-button size="small" type="primary">批量删除</el-button>-->
                <!--                    <el-button size="small">批量导出</el-button>-->
                <!--                    <el-button size="small">批量部署</el-button>-->
                <!--                </span>-->
            </div>
            <el-table v-loading="loading" :data="datalist">
                <!--                <el-table-column-->
                <!--                    type="selection"-->
                <!--                    width="55">-->
                <!--                </el-table-column>-->
                <el-table-column label="模型名称">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">
                            {{ scope.row.model_name }}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="frame_name"
                    label="框架名称"
                ></el-table-column>
                <el-table-column
                    prop="model_type"
                    label="模型格式"
                ></el-table-column>
                <el-table-column
                    prop="model_describe"
                    label="模型描述"
                ></el-table-column>
                <el-table-column prop="update_time" label="更新时间">
                    <template slot-scope="scope">
                        <span>{{ scope.row.update_time | create_time }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            @click="
                                editModel(
                                    scope.row.id,
                                    scope.row.model_name,
                                    scope.row.model_describe
                                )
                            "
                        >
                            修改
                        </el-button>
                        <el-button
                            type="text"
                            @click="deleteModel(scope.row.id)"
                        >
                            删除
                        </el-button>
                        <el-button type="text" @click="deploy(scope.row)">
                            部署
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
            <!-- 修改模型 -->
            <el-dialog title="修改此模型信息" :visible.sync="dialogFormVisible">
                <el-form :model="form" label-width="120px">
                    <el-form-item label="当前模型名称">
                        <span style="color:#1777FF;">{{ form.modelId }}</span>
                    </el-form-item>
                    <el-form-item label="模型名称">
                        <el-input
                            class="w300"
                            size="small"
                            v-model="form.newModelId"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="模型描述">
                        <el-input
                            class="w300"
                            size="small"
                            v-model="form.modelDescribe"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">
                        取 消
                    </el-button>
                    <el-button type="primary" @click="changeModel">
                        确 定
                    </el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {
    POST_CHANGE_MODEL,
    POST_DELETE_MODEL,
    POST_DEPLOY_MODEL,
    POST_MODEL_DATA
} from '../../assets/url';
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
            loading: true,
            dialogFormVisible: false, // 修改模型信息弹框
            dialogFormVisible2: false, // 导出模型
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
        deploy(item) {
            this.$confirm('进行部署操作, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$api
                        .post(POST_DEPLOY_MODEL, {
                            user_id: localStorage.getItem('data_user_id'),
                            user_name: 'uesr1',
                            experiment_name: item.model_test_name,
                            request_url: this.this.globalUlr,
                            model_path: item.model_path,
                            artifact_path: item.artifact_path,
                            data_model_id: item.id,
                            data_model_name: item.model_name
                        })
                        .then(res => {
                            this.$message({
                                type: 'success',
                                message: '部署成功!'
                            });
                            this.getModelData();
                        });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消部署'
                    });
                });
        },
        changeModel(delId) {
            this.$api
                .post(POST_CHANGE_MODEL, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    data_model_id: this.form.modelId,
                    data_model_name: this.form.newModelId,
                    data_model_describe: this.form.modelDescribe
                })
                .then(res => {
                    this.dialogFormVisible = false;
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    this.getModelData();
                });
        },
        postDelete(delId) {
            this.$api
                .post(POST_DELETE_MODEL, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    data_model_id: delId
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
        deleteModel(delId) {
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
                    this.postDelete(delId);
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
