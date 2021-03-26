<template>
    <div class="bg">
        <div class="online-box ">
            <div class="modelDetail">
                <h3>基本信息</h3>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content">
                            模型名称:
                            <el-input
                                v-model="model_info_data.model_name"
                                @blur="postModelInfo('model_name')"
                                class="line-input"
                            ></el-input>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            创建时间:{{
                                model_info_data.create_time | create_time
                            }}
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            更新时间:{{
                                model_info_data.update_time | create_time
                            }}
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            模型格式:{{ model_info_data.model_type }}
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            框架名称:{{ model_info_data.frame_name }}
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            模型导入方式:{{ model_info_data.model_versions_id }}
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            所属实验：{{ model_info_data.model_test_name }}
                        </div>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="grid-content bg-purple">
                            <h3>模型描述</h3>
                            <el-input
                                type="textarea"
                                :rows="3"
                                placeholder="请输入内容"
                                v-model="model_info_data.model_describe"
                                @blur="postModelInfo('model_describe')"
                            ></el-input>
                        </div>
                    </el-col>
                </el-row>
                <h3>版本信息</h3>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column
                        prop="version"
                        label="版本号"
                        width="180"
                    ></el-table-column>
                    <el-table-column
                        prop="status"
                        label="模型状态"
                        width="180"
                    ></el-table-column>
                    <el-table-column label="更新时间">
                        <template slot-scope="scope">
                            {{ scope.row.last_updated_time | create_time }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="description"
                        label="描述信息"
                    ></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)"
                            >
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="currentSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="currentTotal"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { GET_MODEL_VERSION, GET_MODEL_INFO } from '../../assets/url';
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
            model_info_data: {},
            textarea: '12313212',
            tableData: [],
            currentSize: 5,
            currentPage: 1,
            currentTotal: 0,
            model_only_name: ''
        };
    },
    mounted() {
        if (this.$route.params.model_only_name) {
            this.model_only_name = this.$route.params.model_only_name;
            this.getModelInfo();
            this.getVersions();
        } else {
            this.backList();
        }
    },
    methods: {
        handleSizeChange(val) {
            this.currentSize = val;
            this.getVersions();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getVersions();
            console.log(`当前页: ${val}`);
        },
        handleDelete() {},
        postModelInfo(key) {
            this.$api
                .post(GET_MODEL_INFO, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    model_only_name: this.model_only_name,
                    field_key: key,
                    value: this.model_info_data[key]
                })
                .then(res => {
                    // this.model_info_data = res.data.model_info_data;
                });
        },
        getModelInfo() {
            this.$api
                .get(GET_MODEL_INFO, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    model_only_name: this.model_only_name
                })
                .then(res => {
                    this.model_info_data = res.data.model_info_data;
                });
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
                    this.tableData = res.data.versions;
                    this.currentTotal = res.data.count;
                    console.log(res.data);
                });
        }
    }
};
</script>

<style scoped lang="scss">
.bg {
    padding: 20px;
}
.modelDetail {
    width: 1000px;
    .grid-content {
        line-height: 40px;
        font-size: 14px;
    }
    .line-input {
        display: inline-block;
        width: 150px;
    }
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
