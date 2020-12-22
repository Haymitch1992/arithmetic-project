<template>
    <div class="bg">
        <div class="online-box">
            <el-table
                    class="dataTable"
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="服务ID/名称"
                        align="center"
                        width="120">
                    <template slot-scope="scope">
                        <el-button  type="text" @click="goDetail(scope.row.id,scope.row.model_run_uuid)">
                            {{ scope.row.model_name }}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="farme_name"
                        label="框架名称"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="model_type"
                        label="模型格式"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="model_status"
                        label="模型状态"
                        width="100">
                    <template slot-scope="scope">
                        <span class="model-status" :class="'model-status-'+scope.row.model_status"></span>{{scope.row.model_status|modelStatusZn}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="更新时间"
                        align="center"
                        sortable
                        width="380">
                    <template slot-scope="scope">
                        <span>{{scope.row.update_time | create_time}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="model_describe"
                        label="模型描述"
                        width="200">
                </el-table-column>
                <el-table-column
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button type="text" >启动</el-button>
                        <el-button type="text" @click="deleteModel(scope.row.id)">删除</el-button>
                        <el-button type="text" @click="debug(scope.row.id)">在线调试</el-button>
                        <el-button type="text" @click="exportModel(scope.row.id)">导出</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-line">
                <el-pagination
                        @size-change="handleSizeChange"
                        background
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="10">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
import {
    POST_ALL_DEPLOY_MODEL,
    POST_EXPORT_MODEL,
    POST_MODEL_LOG,
    POST_ONLINE_DELETE_MODEL
} from "../../assets/url";
import moment from "moment";
export default {
    name: "home",
    filters: {
        modelStatusZn(val) {
            switch (val) {
                case 1:
                    return "未开始";
                case 0:
                    return "进行中";
                case 2:
                    return "已完成";
                case 3:
                    return "失败";
                case 4:
                    return "已停止";
            }
        },
        create_time(val) {
            if (!val) return "";
            return moment(val).format("YYYY-MM-DD HH:mm:ss");
        }
    },
    data() {
        return {
            currentPage4: 1,
            tableData: [] // 已部署模板列表
        };
    },
    mounted() {
        this.getList();
    },
    methods: {
        deleteModel(mid) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$api
                        .post(POST_ONLINE_DELETE_MODEL, {
                            data_user_id: localStorage.getItem("data_user_id"),
                            deploy_model_id: mid
                        })
                        .then(res => {
                            this.getList();
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        exportModel(mid) {
            this.$api
                .post(POST_EXPORT_MODEL, {
                    data_user_id: localStorage.getItem("data_user_id"),
                    deploy_model_id: mid
                })
                .then(res => {
                    console.log();
                    window.location.href =
                        this.globalUlr + res.data.deploy_model_zip;
                });
        },
        getList() {
            this.$api
                .post(POST_ALL_DEPLOY_MODEL, {
                    data_user_id: localStorage.getItem("data_user_id"),
                    data_model_keyword: 1
                })
                .then(res => {
                    this.tableData = res.data.model_data;
                    console.log(res.data.model_data);
                });
        },
        debug(mid) {
            this.$store.commit("changeDeployId", mid);
            this.$router.push("/debug");
        },
        goDetail(mid, uuid) {
            // 存住当前ID
            this.$store.commit("changeDeployId", mid);
            this.$store.commit("saveRunUuid", uuid);
            this.$router.push({ name: "onlineDetail", params: { mid: mid } });
            // this.$router.push('/onlineDetail')
        },
        handleSelectionChange(val) {
            console.log(val);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
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
        background-color: #1677ff;
    }
    .model-status-1 {
        background-color: #dddddd;
    }
    .model-status-2 {
        background-color: #52c41a;
    }
    .model-status-3 {
        background-color: #ff3b30;
    }
    .model-status-4 {
        background-color: #ebad18;
    }
}
</style>
<style>
.online-box .el-table td {
    padding: 12px 0;
}
.online-box .el-table th .cell {
    color: #666666;
}
.online-box .el-table th {
    background-color: #fafafa;
    font-weight: normal;
}
.dataTable .cell {
    font-size: 14px;
}
</style>
