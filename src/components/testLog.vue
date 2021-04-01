<template>
    <div>
        <el-dialog
            title="操作日志"
            :visible.sync="dialogTableVisible"
            width="900px"
            :before-close="handleClose"
        >
            <el-table :data="test_log">
                <el-table-column property="create_time" label="日期">
                    <template slot-scope="scope">
                        <span>{{ scope.row.create_time | create_time }}</span>
                    </template>
                </el-table-column>
                <el-table-column property="ip" label="ip"></el-table-column>
                <el-table-column
                    property="message"
                    label="操作内容"
                ></el-table-column>
            </el-table>
            <el-pagination
                class="paddingTop"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </el-dialog>
    </div>
</template>

<script>
import { OPERATION_LOG } from '../assets/url.js';
import moment from 'moment';
export default {
    props: {
        data_test_id: Number
    },
    filters: {
        create_time(val) {
            if (!val) return '';
            return moment(val).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    data() {
        return {
            dialogTableVisible: true,
            test_log: [],
            size: 10,
            currentPage: 1,
            total: 0
        };
    },
    methods: {
        handleClose() {
            this.$emit('CloseTestLog');
        },
        getTestLog() {
            this.$api
                .get(OPERATION_LOG, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    data_test_id: this.data_test_id,
                    size: this.size,
                    page: this.currentPage
                })
                .then(res => {
                    this.test_log = res.data.test_log;
                    this.total = res.data.count;
                    console.log(res.data);
                });
        },
        handleSizeChange(val) {
            this.size = val;
            this.getTestLog();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTestLog();
            console.log(`当前页: ${val}`);
        }
    },
    mounted() {
        console.log('打开');
        this.getTestLog();
    }
};
</script>

<style scoped>
.paddingTop {
    padding-top: 20px;
}
</style>
