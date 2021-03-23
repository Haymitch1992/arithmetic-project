<template>
    <div class="data-view" v-show="this.$store.state.viewDataDialog">
        <!-- 数据集数据展示 -->
        <el-dialog
            title="查看数据"
            class="dataView"
            width="1000px"
            :visible.sync="this.$store.state.viewDataDialog"
            :before-close="handleClose"
        >
            <div class="tab-button-line">
                <el-button
                    v-for="(item, index) in this.$store.state.currentDialog
                        .nodeIndex"
                    :key="item"
                    :type="index === postNum ? 'primary' : ''"
                    @click="getReport(index)"
                >
                    {{ item }}
                </el-button>
            </div>
            <el-table :data="tableData" border height="400">
                <el-table-column
                    :key="value.record_id"
                    sortable
                    v-for="(value, key) in tableData[0] || []"
                    :prop="key"
                    :label="key"
                ></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
import { GET_RESULT_REPORT } from '../assets/url.js';
export default {
    data() {
        return {
            postNum: 0,
            label_list_duofen: [
                'category',
                'f1-score',
                'precision',
                'recall',
                'total'
            ],
            tabList: this.$store.state.currentDialog.nodeIndex,
            LabelList: ['setosa', 'versicolor', 'virginica'],
            titleList: [
                '聚类模型评估分析报告',
                '回归-结果分析报告',
                '二分类评估报告',
                '多分类评估报告'
            ],
            currentItem: 0, // 当前选中的组件下标
            currentNodetype: 0,
            currentTab: 0,
            dialogVisible: true,
            colorList: [
                '#6699FF',
                '#B3CDFF',
                '#9580FF',
                '#BFB3FF',
                '#52CCA3',
                '#1677FF'
            ],
            echartsData: [],
            tableData: [{}], // 列表
            duofenleiData: [],
            rocData: {},
            AUC: '',
            KS: '',
            F1_Score: ''
        };
    },
    computed: {
        dialogVisible2() {
            return this.$store.state.viewDataDialog;
        }
    },
    watch: {
        dialogVisible2() {
            this.getReport();
            this.postNum = 0;
        }
    },
    methods: {
        // 改变当前数据类型 根据nodeIndex 判断
        handleClose() {
            this.$store.commit('handleNode', {
                nodeTpye: 'viewDataDialog',
                status: false
            });
        },
        getReport(nodeIndexNum) {
            this.tableData = [];
            this.postNum = nodeIndexNum || 0;
            // 过滤拆分的参数
            let nodeIndex = this.$store.state.currentDialog.nodeIndex;
            let indexParam = nodeIndex[this.postNum];
            if (this.$store.state.currentDialog.nodeName === '拆分') {
                // 拆分节点后台保存文件名有问题需要格式化
                indexParam = indexParam.split('_')[0];
            }
            this.$api
                .get(GET_RESULT_REPORT, {
                    run_uuid: this.$store.state.currentDialog.run_uuid,
                    index: indexParam // 列表
                })
                .then(res => {
                    if (res.data.message === '请先运行此节点') {
                        this.tableData = [];
                        return;
                    }
                    this.tableData = res.data[indexParam];
                });
        }
    },
    mounted() {}
};
</script>
<style lang="scss">
.tab-button-line {
    padding-bottom: 20px;
}
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
