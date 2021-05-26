<template>
    <div class="bg">
        <div class="online-box dataManagement">
            <el-button
                size="small"
                @click="openUpload"
                style="width: 160px;"
                icon="el-icon-upload"
            >
                创建项目
            </el-button>
            <el-dialog
                title="创建项目"
                v-if="dialogTableVisible"
                :visible.sync="dialogTableVisible"
            >
                <el-form
                    label-width="100px"
                    :model="formData"
                    :rules="rules"
                    ref="formData"
                >
                    <el-form-item label="项目名称" prop="project_name">
                        <el-input
                            size="small"
                            v-model="formData.project_name"
                            style="width: 400px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="项目说明" prop="project_description">
                        <el-input
                            size="small"
                            v-model="formData.project_description"
                            style="width: 400px"
                        ></el-input>
                    </el-form-item>
                </el-form>
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
            <el-table
                :data="dataList"
                v-loading="loading"
                class="dataTable"
                style="width: 100%"
            >
                <el-table-column
                    prop="project_name"
                    label="项目名称"
                    width="180"
                ></el-table-column>
                <el-table-column
                    prop="project_description"
                    width="400"
                    label="项目说明"
                ></el-table-column>
                <el-table-column prop="create_time" sortable label="创建时间">
                    <template slot-scope="scope">
                        <span>{{ scope.row.create_time | create_time }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="update_time" sortable label="修改时间">
                    <template slot-scope="scope">
                        <span>{{ scope.row.create_time | create_time }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            @click="
                                goExperiment(
                                    scope.row.id,
                                    scope.row.project_name
                                )
                            "
                        >
                            进入机器学习
                        </el-button>
                        <el-button
                            type="text"
                            @click="deletePrject(scope.row.id)"
                        >
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
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page_count"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import {
    UPLOAD_FILE,
    GET_ALL_PROJECT,
    DELETE_DATA_LIST,
    SET_HEADER,
    SET_OPTIONS,
    GET_OPTIONS,
    CREATE_PROJECT,
    DELETE_PROJECT
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
            isCreate: false,
            loading: true,
            UPLOAD_FILE: UPLOAD_FILE,
            pageSize: 10,
            currentPage: 1,
            page_count: 0,
            rules: {
                project_name: [
                    {
                        required: true,
                        message: '请输入项目名称',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: '长度在 3 到 10 个字符',
                        trigger: 'blur'
                    }
                ],
                project_description: [
                    {
                        required: true,
                        message: '请输入项目说明',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: '长度在 3 到 10 个字符',
                        trigger: 'blur'
                    }
                ]
            },
            headerList: [],
            formData: {
                project_name: '', // 项目名称
                project_description: '', // 项目说明
                name: '',
                type: '导入文件',
                path: '/root/TCT_API_Develop/media/',
                databaseName: '', // 数据库名
                tableName: '', // 表名
                userName: '', // 用户名
                password: '' // 密码
            },
            formData2: {
                set_header_input: [],
                set_header_type: '',
                set_header_id: '',
                data_set_id: '',
                data_user_id: localStorage.getItem('data_user_id')
            },
            fileList: [],
            dialogTableVisible: false, // 注册数据集弹窗
            dialogTableVisible2: false,
            dataList: []
        };
    },
    mounted() {
        this.getAllData();
    },
    methods: {
        deletePrject(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$api
                        .post(DELETE_PROJECT, {
                            data_user_id: localStorage.getItem('data_user_id'),
                            data_project_id: id
                        })
                        .then(res => {
                            this.getAllData();
                        });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        goExperiment(id, proName) {
            // 将项目id 存至 vuex data_project_id
            let routeJump = this.$router.resolve({
                name: 'diagramExample',
                params: { data_project_id: id }
            });
            // 在新窗口中同步数据
            localStorage.setItem('data_project_id', id);
            localStorage.setItem('data_project_name', proName);
            localStorage.setItem('data_user_name', this.$store.state.userName);
            localStorage.setItem(
                'data_user_email',
                this.$store.state.userEmail
            );
            window.open(routeJump.href, '_blank');
            // 保存当前项目名
        },
        dataTypeZn(row, column) {
            switch (row.data_type) {
                case 1:
                    return 'csv';
                case 2:
                    return 'text';
                case 3:
                    return 'mysql';
            }
        },
        openUpload() {
            this.dialogTableVisible = true;
            this.formData.name = '';
        },
        beforeAvatarUpload(file) {
            const isJPG =
                file.type === 'text/plain' ||
                file.type === 'application/vnd.ms-excel';
            const isLt2M = file.size / 1024 / 1024 < 20;
            if (!isJPG) {
                this.$message.error('上传文件只能是txt或cvs格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传文件大小不能超过 20MB!');
            }
            return isJPG && isLt2M;
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
                this.formData2.set_header_input = res.data.all_data_lable.set_header_input.split(
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
                set_header_type: '',
                set_header_id: '',
                data_set_id: '',
                data_user_id: localStorage.getItem('data_user_id')
            };
        },
        createdTip(id) {
            this.dialogTableVisible2 = true;
            this.resetData();
            this.getHeaderList(id);
            this.formData2.data_set_id = id;
            this.isCreate = false;
        },
        handleSizeChange(val) {
            this.pageSize = val;
            console.log(`每页 ${val} 条`);
            this.getAllData();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            console.log(`当前页: ${val}`);
            this.getAllData();
        },
        downLoadFile(str) {
            // 导出数据集
            window.location.href = this.globalUrl + str;
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
                    data_user_id: localStorage.getItem('data_user_id'),
                    set_id: id
                })
                .then(res => {
                    console.log(res);
                    this.getAllData();
                });
        },
        getHeaderList(id) {
            this.$api
                .post(CREATE_PROJECT, {
                    data_user_id: localStorage.getItem('data_user_id'),
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
                .post(GET_ALL_PROJECT, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    size: this.pageSize,
                    page: this.currentPage
                })
                .then(res => {
                    this.loading = false;
                    this.page_count = res.data.count;
                    this.dataList = res.data.all_project;
                });
        },
        resetForm() {
            this.dialogTableVisible = false;
            this.formData = {
                project_name: '',
                project_description: ''
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
                    this.$api
                        .post(CREATE_PROJECT, {
                            data_user_id: localStorage.getItem('data_user_id'),
                            project_name: this.formData.project_name,
                            project_description: this.formData
                                .project_description
                        })
                        .then(res => {
                            this.resetForm();
                            this.getAllData();
                        });
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
        margin-left: 100px;
    }
    .btn-line {
        padding-left: 100px;
        padding-top: 14px;
        .el-button {
            width: 100px;
        }
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
    padding: 12px 0;
}
.dataTable .cell {
    font-size: 14px;
}
.dataManagement .el-dialog {
    width: 600px;
}
</style>
