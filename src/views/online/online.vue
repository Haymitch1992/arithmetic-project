<template>
    <div class="bg">
        <div class="online-box">
            <el-table
                class="dataTable"
                v-loading="loading"
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
            >
                <el-table-column label="服务ID/名称" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            @click="
                                goDetail(
                                    scope.row.id,
                                    scope.row.model_run_uuid,
                                    scope.row
                                )
                            "
                        >
                            {{ scope.row.model_name }}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="version"
                    label="版本号"
                ></el-table-column>
                <el-table-column
                    prop="model_type"
                    label="模型格式"
                ></el-table-column>
                <el-table-column prop="model_category" label="模型类型">
                    <template slot-scope="scope">
                        <span>
                            {{ scope.row.model_category | categoryStatusZn }}
                        </span>
                    </template>
                </el-table-column>

                <el-table-column prop="model_status" label="模型状态">
                    <template slot-scope="scope">
                        <span
                            class="model-status"
                            :class="'model-status-' + scope.row.state"
                        ></span>
                        {{ scope.row.state | modelStatusZn }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="更新时间"
                    align="center"
                    width="160"
                    sortable
                >
                    <template slot-scope="scope">
                        <span>{{ scope.row.update_time | create_time }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="model_describe"
                    label="模型描述"
                ></el-table-column>
                <el-table-column label="操作" width="260">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            v-if="scope.row.state === 0"
                            @click="changeModelStatus('reboot', scope.row)"
                        >
                            启动
                        </el-button>
                        <el-button
                            type="text"
                            v-if="scope.row.state === 1"
                            @click="changeModelStatus('stop', scope.row)"
                        >
                            停止
                        </el-button>
                        <el-button
                            type="text"
                            @click="changeModelStatus('delete', scope.row)"
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
                    :current-page="currentPage4"
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
    POST_ALL_DEPLOY_MODEL,
    POST_EXPORT_MODEL,
    POST_DEPLOY_MODEL,
    POST_MODEL_LOG,
    POST_ONLINE_DELETE_MODEL
} from '../../assets/url';
import moment from 'moment';
export default {
    name: 'home',
    filters: {
        modelStatusZn(val) {
            switch (val) {
                case 0:
                    return '停止';
                case 1:
                    return '运行中';
                case 2:
                    return '已完成';
                case 3:
                    return '失败';
                case 4:
                    return '已停止';
            }
        },
        categoryStatusZn(val) {
            switch (val) {
                case 1:
                    return '文本类';
                case 2:
                    return '图象类';
            }
        },
        create_time(val) {
            if (!val) return '';
            return moment(val).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    data() {
        return {
            currentPage4: 1,
            pageSize: 10,
            loading: true,
            page_count: 0,
            tableData: [] // 已部署模板列表
        };
    },
    mounted() {
        this.getList();
    },
    methods: {
        changeModelStatus(str, item) {
            this.$api
                .post(POST_DEPLOY_MODEL, {
                    user_id: localStorage.getItem('data_user_id'),
                    model_name: item.model_only_name,
                    model_version: item.version,
                    model_image_name: item.model_image_name,
                    container_name: item.container_name,
                    order: str
                })
                .then(res => {
                    if (res.data.status === 'success') {
                        this.$message.success('操作成功');
                    }

                    this.getList();
                });
        },
        exportModel(mid) {
            this.$api
                .post(POST_EXPORT_MODEL, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    deploy_model_id: mid
                })
                .then(res => {
                    console.log();
                    window.location.href =
                        this.globalUlr + res.data.deploy_model_zip;
                });
        },
        getList() {
            this.loading = true;
            this.$api
                .get(POST_ALL_DEPLOY_MODEL, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    size: this.pageSize,
                    page: this.currentPage4
                })
                .then(res => {
                    this.loading = false;
                    this.page_count = res.data.count;
                    this.tableData = res.data.deploy_model_data;
                    console.log(res.data.model_data);
                });
        },
        goDetail(mid, uuid, obj) {
            // 存住当前ID
            this.$store.commit('changeDeployId', mid);
            this.$store.commit('saveRunUuid', uuid);
            this.$router.push({
                name: 'onlineDetail',
                params: {
                    modelObject: {
                        version: obj.version,
                        model_only_name: obj.model_only_name,
                        mid: mid
                    }
                }
            });
            // this.$router.push('/onlineDetail')
        },
        handleSelectionChange(val) {
            console.log(val);
        },
        handleSizeChange(val) {
            this.pageSize = val;
            console.log(`每页 ${val} 条`);
            this.getList();
        },
        handleCurrentChange(val) {
            this.currentPage4 = val;
            console.log(`当前页: ${val}`);
            this.getList();
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
        background-color: #dddddd;
    }
    .model-status-1 {
        background-color: #1677ff;
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
