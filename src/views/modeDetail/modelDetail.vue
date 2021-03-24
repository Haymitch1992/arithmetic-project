<template>
    <div class="bg">
        <div class="online-box ">
            <div class="modelDetail">
                <h3>基本信息</h3>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content">
                            模型名称:
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">更新时间:2020-3-24</div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">模型格式:null</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">框架名称:null</div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            生成方式:用户导入
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">所属实验：null</div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="grid-content bg-purple">
                            <h3>模型描述</h3>
                            <el-input
                                type="textarea"
                                :rows="5"
                                placeholder="请输入内容"
                                v-model="textarea"
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
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="currentSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="currentTotal"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { GET_MODEL_VERSION } from '../../assets/url';
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
            textarea: '12313212',
            tableData: [],
            currentSize: 10,
            currentPage: 1,
            currentTotal: 0
        };
    },
    mounted() {
        this.getVersions();
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
        getVersions() {
            // GET_MODEL_VERSION
            this.$api
                .get(GET_MODEL_VERSION, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    model_only_name: 'u6-e104-n1608021172648',
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
        line-height: 48px;
        font-size: 16px;
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
