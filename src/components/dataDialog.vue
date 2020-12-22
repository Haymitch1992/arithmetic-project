<template>
  <div class="data-view">
   <!-- 数据集数据展示 -->
        <el-dialog
            title="数据探查 - (仅显示前一百条)"
             class="dataView"
            :visible.sync="this.$store.state.dataDialog"
            width="700px"
            :before-close="handleClose">
            <el-table
                :data="tableData"
                border
                height="400"
                :default-sort = "{prop: 'record_id', order: 'ascending'}"
                style="width: 100%">
                <el-table-column
                    :key = "value.record_id"
                    sortable
                    v-for="(value, key) in tableData[0]"
                    :prop="key"
                    :label="key"
                    width="180">
                </el-table-column>
            </el-table>
        </el-dialog>
  </div>
</template>
<script>
import { POST_TOP_100_DATA } from "../assets/url";
export default {
    data() {
        return {
            dialogVisible: true,
            tableData: []
        };
    },
    computed: {
        f1() {
            return this.$store.state.dataDialog;
        }
    },
    watch: {
        f1(curVal, oldVal) {
            // 监听弹框状态
            this.getData();
        }
    },
    methods: {
        handleClose() {
            this.$store.commit("handleNode", {
                nodeTpye: "dataDialog",
                status: false
            });
        },
        // 获取数据
        getData() {
            this.$api
                .post(POST_TOP_100_DATA, {
                    data_user_id: localStorage.getItem("data_user_id"),
                    data_set_id: this.$store.state.current_set_id
                })
                .then(res => {
                    if (res.data.code === 200) {
                        this.tableData = res.data.data;
                    } else {
                        this.tableData = [{}];
                    }
                });
        }
    }
};
</script>
<style>
.data-view .el-dialog {
    background: #2a2d36 !important;
}
.data-view .el-dialog__title {
    color: #ddd;
}
.data-view .el-table__empty-block {
    background: #2a2d36 !important;
}
.data-view .el-table--border {
    border: 1px solid #3a404c;
}
.data-view .el-table--border::after,
.data-view .el-table--group::after,
.data-view .el-table::before {
    background-color: #3a404c;
}
.data-view .el-table th,
.data-view .el-table tr {
    background-color: #2a2d36 !important;
    cursor: pointer;
}
.data-view .el-table__row:hover td {
    background-color: #4a4d57 !important;
}
.data-view .el-table--striped .el-table__body tr.el-table__row--striped td {
    background-color: #2a2d36 !important;
}
.data-view .el-table--border td,
.data-view .el-table--border th,
.data-view
    .el-table__body-wrapper
    .el-table--border.is-scrolling-left
    ~ .el-table__fixed {
    border-right: 1px solid #3a404c;
}
.data-view .el-table td,
.data-view .el-table th.is-leaf {
    border-bottom: 1px solid #3a404c;
}
.data-view ::-webkit-scrollbar {
    background-color: #3a404c;
}
.data-view ::-webkit-scrollbar-thumb {
    background-color: #ccc;
}
</style>
