<template>
    <div class="report-dialog" v-show="this.$store.state.viewDataDialog">
        <!-- 数据集数据展示 -->
        <el-dialog
            title="查看数据"
            class="dataView"
            :visible.sync="this.$store.state.viewDataDialog"
            width="70%"
            :before-close="handleClose"
        >
            <!-- <el-table
                class="data-table"
                border
                stripe
                style="width: 100%"
                :data="tableData"
            >
                <el-table-column
                    v-for="(item, key, index) in tableData[0]"
                    :key="index"
                    :label="key"
                    :prop="key"
                ></el-table-column>
            </el-table> -->
            <el-table
                :data="tableData"
                border
                height="400"
                :default-sort="{ prop: 'record_id', order: 'ascending' }"
                style="width: 100%"
            >
                <el-table-column
                    :key="value.record_id"
                    sortable
                    v-for="(value, key) in tableData[0]"
                    :prop="key"
                    :label="key"
                    width="180"
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
            label_list_duofen: [
                'category',
                'f1-score',
                'precision',
                'recall',
                'total'
            ],
            arr1: [
                [12, 0, 0],
                [0, 10, 1],
                [0, 0, 7]
            ],
            arr2: [
                [1, 0.4, 0.6],
                [0, 0.9091, 0.0901],
                [0, 0, 1]
            ],
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
            tableData: [], // 列表
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
        }
    },
    methods: {
        handleClose() {
            this.$store.commit('handleNode', {
                nodeTpye: 'viewDataDialog',
                status: false
            });
        },
        getReport() {
            this.$api
                .get(GET_RESULT_REPORT, {
                    run_uuid: 'ffd41ca53cea4a2aae34a6c1114d4bb0',
                    index: this.$store.state.currentDialog.nodeIndex // 列表
                })
                .then(res => {
                    this.tableData =
                        res.data[this.$store.state.currentDialog.nodeIndex];
                    // let str = this.$store.state.currentDialog.nodeIndex;
                    // if (res.data.code !== 200) {
                    //     return;
                    // }
                    // this.tableData = [];
                    // for (let i = 0; i < res.data[str]['f1'].length; i++) {
                    //     this.tableData.push({});
                    // }
                    // for (let key in res.data[str]) {
                    //     for (let k = 0; k < res.data[str][key].length; k++) {
                    //         this.tableData[k][key] = res.data[str][key][k];
                    //     }
                    // }
                    console.log(this.tableData);
                });
        }
    },
    mounted() {}
};
</script>
<style lang="scss">
.report-dialog {
    /deep/ .el-table__empty-block {
        background: #3a3d4a;
    }
    .matrix-box {
        margin-top: 50px;
        margin-left: 80px;
        border-left: 1px solid #eee;
        border-top: 1px solid #eee;
        box-sizing: border-box;
        position: relative;
        .pos-span-1 {
            position: absolute;
            left: -80px;
            top: 0px;
            transform: rotateZ(-90deg);
            display: inline-block;
            width: 60px;
            text-align: center;
        }
        .pos-span-2 {
            position: absolute;
            bottom: -55px;
            left: 136px;
            display: inline-block;
            width: 60px;
            text-align: center;
        }
        .matrix-line {
            display: flex;
            background: rgba(196, 222, 255, 1);
            .matrix-td {
                flex: 1;
                width: 100px;
                height: 100px;
                text-align: center;
                border-right: 1px solid #eee;
                border-bottom: 1px solid #eee;
                box-sizing: border-box;
                line-height: 100px;
                background: cornflowerblue;
                opacity: 1;
                color: #333;
            }
        }
        .matrix-tool-x {
            position: absolute;
            width: 300px;
            bottom: -30px;
            left: 0;
            i {
                width: 1px;
                height: 6px;
                background: #fff;
                display: block;
                position: absolute;
                left: 50px;
                top: -17px;
            }
            .matrix-tool-item {
                width: 100px;
                text-align: center;
                display: inline-block;
                position: relative;
            }
        }
        .matrix-tool-y {
            position: absolute;
            width: 100px;
            bottom: 0;
            left: -20px;
            i {
                width: 6px;
                height: 1px;
                background: #fff;
                display: block;
                position: absolute;
                left: 19px;
                top: 50px;
            }
            .matrix-tool-item {
                width: 100px;
                height: 100px;
                text-align: right;
                display: block;
                position: relative;
                line-height: 100px;
                span {
                    position: absolute;
                    left: -90px;
                    width: 100px;
                    text-align: right;
                }
            }
        }
    }
    .chart-box {
        width: 100%;
        height: 360px;
        padding-top: 10px;
        .chart-left {
            width: 22%;
            float: left;
            padding-right: 10px;
            box-sizing: border-box;
            .chart-item {
                width: 100%;
                height: 90px;
                position: relative;
                margin-bottom: 2px;
                span {
                    position: absolute;
                    top: 2px;
                    left: 6px;
                    background-color: #4c4f5f;
                    line-height: 24px;
                    font-size: 12px;
                    padding: 0 10px;
                }
                .active {
                    background-color: #3d7fff;
                    color: #fff;
                }
                img {
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
        }
        .chart-right {
            width: 78%;
            float: left;
            height: 360px;
            background: #3a3d4a;
        }
    }
    .el-dialog {
        width: 800px !important;
    }
    .el-button--primary {
        background-color: #3d7fff;
        border: 1px solid #3d7fff;
        border-right: 1px solid #494c54 !important;
        border-left: 1px solid #494c54 !important;
    }
    .el-button-group > .el-button {
        width: 100px;
    }
    .el-button--default {
        background-color: #2a2d36;
        border: 1px solid #494c54;
        color: #fff;
    }
    .data-table {
        margin-top: 10px;
        border-top: 1px solid #494c54 !important;
        border-left: 1px solid #494c54;
        border-bottom: none;
    }
    .el-table--border::after,
    .el-table--group::after,
    .el-table::before {
        background-color: #494c54;
    }
    .el-dialog,
    .el-pager li {
        background: #2a2d36;
    }
    .el-dialog__title {
        color: #fff;
    }
    .el-dialog__header {
        border-bottom: 1px solid #3a404c;
    }
    .el-dialog__body {
        color: #fff;
    }
    .el-table tr {
        background: #2a2d36;
        border-right: 1px solid #494c54;
        color: #f5f5f5;
    }
    .el-table--enable-row-hover .el-table__body tr:hover > td {
        background: #2a2d36;
    }
    .el-table td,
    .el-table th.is-leaf {
        border-right: 1px solid #494c54;
        border-bottom: 1px solid #4f4c4c;
    }
    .el-table__row:last-child td {
        border-bottom: 1px solid #4f4c4c;
    }
    .el-table th,
    .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: #3a3d4a;
    }
    .report-table {
        width: 100%;
        border-collapse: collapse;
        border-bottom: 1px solid #6c6c6c;
        margin: 10px auto;
        tr {
            td {
                line-height: 36px;
                background: #30333d;
                padding-left: 10px;
                border-bottom: 1px solid #4f4c4c !important;
            }
            td:first-child {
                width: 40%;
                background: #3a3d4a;
            }
        }
    }
}
</style>
