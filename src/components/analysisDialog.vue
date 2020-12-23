<template>
  <div class="report-dialog">
   <!-- 数据集数据展示 -->
        <el-dialog
            :title="`${this.$store.state.currentDialog.nodeName}-分析报告`"
             class="dataView"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <!--聚类-->
            <div style="max-height:60vh;overflow-y:auto;" v-show="this.$store.state.currentDialog.nodeName==='聚类评估'">
                <!--表格-->
                <table class="report-table">
                    <tr>
                        <td>总记录数</td>
                        <td>123</td>
                    </tr>
                     <tr>
                        <td>聚类中心数</td>
                        <td>123</td>
                    </tr>
                     <tr>
                        <td>Calinski Harabasz 指标</td>
                        <td>123</td>
                    </tr>
                     <tr>
                        <td>轮廓系数指标</td>
                        <td>123</td>
                    </tr>
                </table>
                <!--图-->
                <el-button-group>
                    <el-button  :type="currentTab===0?'primary':'default'" size="small"  @click="createData(0)">饼图</el-button>
                    <el-button  :type="currentTab===1?'primary':'default'" size="small" @click="createBarData(1)">柱形图</el-button>
                </el-button-group>
                <div id="main" v-show="currentTab===0" style="width:750px;height:400px;"></div>
                <div id="main2" v-show="currentTab===1" style="width:750px;height:400px;"></div>
            </div>
            <!--回归-->
            <div style="max-height:60vh;overflow-y:auto;"  v-show="this.$store.state.currentDialog.nodeName==='回归评估'">
                <!--图-->
                <el-button-group>
                    <el-button :type="currentTab===0?'primary':'default'" size="small"  @click="createData(0)">列表</el-button>
                    <el-button :type="currentTab===1?'primary':'default'" size="small" @click="createBarData(1)">图表</el-button>
                </el-button-group>
                <!--表格-->
                <el-table
                    :data="tableData"
                    class="data-table"
                     v-show="currentTab===0"
                    border
                    stripe
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="指标"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="值">
                    </el-table-column>
                </el-table>
                <div class="chart-box"  v-show="currentTab===1">
                    <div class="chart-left">
                        <div class="chart-item" @click="handleItem(0)">
                            <span :class="currentItem===0?'active':''">ROC</span>
                            <img src="../assets/img/charts-icon-1.png" alt="">
                        </div>
                        <div class="chart-item" @click="handleItem(1)">
                            <span :class="currentItem===1?'active':''">K-S</span>
                            <img src="../assets/img/charts-icon-2.png" alt="">
                        </div>
                        <div class="chart-item" @click="handleItem(2)">
                            <span :class="currentItem===2?'active':''">Precision Recall</span>
                            <img src="../assets/img/charts-icon-3.png" alt="">
                        </div>
                        <div class="chart-item" @click="handleItem(3)">
                            <span :class="currentItem===3?'active':''">Class Predict Report</span>
                            <img src="../assets/img/charts-icon-4.png" alt="">
                        </div>
                    </div>
                    <div class="chart-right">
                        <div id="main3" style="width:100%;height:100%;"></div>
                    </div>
                </div>
            </div>
            <!--二分类 多分类-->
            <div style="max-height:60vh;min-height:450px;overflow-y:auto;"  v-show="this.$store.state.currentDialog.nodeName==='二分类评估'||this.$store.state.currentDialog.nodeName==='多分类评估'">
                <!--图-->
                <el-button-group>
                    <el-button :type="currentTab===0?'primary':'default'" size="small"  @click="handelMatrix(0)">列表</el-button>
                    <el-button :type="currentTab===1?'primary':'default'" size="small" @click="handelMatrix(1)">比例矩阵</el-button>
                    <el-button :type="currentTab===2?'primary':'default'" size="small" @click="handelMatrix(2)">混淆矩阵</el-button>
                </el-button-group>
                <!--表格-->
                <el-table
                    :data="tableData"
                    class="data-table"
                     v-show="currentTab===0"
                    border
                    stripe
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="指标"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="值">
                    </el-table-column>
                </el-table>
                <div class="matrix-box" v-show="currentTab===1">
                    <div class="matrix-line" v-for="(item ,index) in arr1" :key="index">
                        <div class="matrix-td" :style="{backgroundColor:`rgba(100,147,248,${1*item2/12})`}" v-for="(item2,index2) in item" :key="index2">{{item2}}</div>
                    </div>
                    <div class="matrix-tool-x" >
                        <div class="matrix-tool-item" v-for="item in LabelList" :key="item">
                            <i></i>
                            <span>{{item}}</span>
                        </div>
                    </div>
                    <div class="matrix-tool-y" >
                        <div class="matrix-tool-item" v-for="item in LabelList" :key="item">
                            <i></i>
                            <span>{{item}}</span>
                        </div>
                    </div>
                     <span class="pos-span-1">预测</span>
                    <span class="pos-span-2">真实</span>
                </div>
                <div class="matrix-box" v-show="currentTab===2">
                    <div class="matrix-line" v-for="(item ,index) in arr2" :key="index">
                        <div class="matrix-td"  :style="{backgroundColor:`rgba(100,147,248,${1*item2/1})`}" v-for="(item2,index2) in item" :key="index2">{{item2}}</div>
                    </div>
                    <div class="matrix-tool-x" >
                        <div class="matrix-tool-item" v-for="item in LabelList" :key="item">
                            <i></i>
                            <span>{{item}}</span>
                        </div>
                    </div>
                    <div class="matrix-tool-y" >
                        <div class="matrix-tool-item" v-for="item in LabelList" :key="item">
                            <i></i>
                            <span>{{item}}</span>
                        </div>
                    </div>
                    <span class="pos-span-1">预测</span>
                    <span class="pos-span-2">真实</span>
                </div>
            </div>
        </el-dialog>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
    data() {
        return {
            arr1: [[12, 0, 0], [0, 10, 1], [0, 0, 7]],
            arr2: [[1, 0.4, 0.6], [0, 0.9091, 0.0901], [0, 0, 1]],
            LabelList: ["setosa", "versicolor", "virginica"],
            titleList: [
                "聚类模型评估分析报告",
                "回归-结果分析报告",
                "二分类评估报告",
                "多分类评估报告"
            ],
            currentItem: 0, // 当前选中的组件下标
            currentNodetype: 0,
            currentTab: 0,
            dialogVisible: true,
            colorList: [
                "#B3CDFF",
                "#9580FF",
                "#BFB3FF",
                "#52CCA3",
                "#A1E6CE",
                "#6699FF"
            ],
            tableData: [
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1517 弄"
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄"
                }
            ]
        };
    },
    computed: {
        dialogVisible2() {
            return this.$store.state.analysisDialog;
        }
    },
    watch: {
        dialogVisible2(newVal, oldVal) {
            console.log("*********************", newVal, oldVal);
            this.createData();
        }
    },
    methods: {
        handleItem(num) {
            this.currentItem = num;
            this.createScatter();
        },
        handelMatrix(num) {
            this.currentTab = num;
            this.createMatrix();
        },
        handleClose() {
            this.$store.commit("handleNode", {
                nodeTpye: "analysisDialog",
                status: false
            });
        },
        // 创建矩阵
        createMatrix() {
            let arr1 = [[12, 0, 0], [0, 10, 1], [0, 0, 7]];
            let arr2 = [
                [1, 0, 0],
                [0, 0.9090909090909091, 0.09090909090909091],
                [0, 0, 1]
            ];
        },
        // 创建散点图
        createScatter() {
            var myChart = echarts.init(document.getElementById("main3"));
            let option = {
                xAxis: {},
                yAxis: {},
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: {
                            show: true,
                            type: ["pie", "funnel"]
                        },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                        symbolSize: 20,
                        data: [
                            [10.0, 8.04],
                            [8.0, 6.95],
                            [13.0, 7.58],
                            [9.0, 8.81],
                            [11.0, 8.33],
                            [14.0, 9.96],
                            [6.0, 7.24],
                            [4.0, 4.26],
                            [12.0, 10.84],
                            [7.0, 4.82],
                            [5.0, 5.68]
                        ],
                        type: "scatter"
                    }
                ]
            };
            myChart.setOption(option);
        },
        createData(num) {
            this.currentTab = num;
            // 出事haul
            var myChart = echarts.init(document.getElementById("main"));
            let option = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    top: "40px",
                    right: "right",
                    data: [
                        "直接访问",
                        "邮件营销",
                        "联盟广告",
                        "视频广告",
                        "搜索引擎"
                    ],
                    textStyle: {
                        color: "#fff"
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: {
                            show: true,
                            type: ["pie", "funnel"]
                        },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: [
                            {
                                value: 335,
                                name: "直接访问",
                                itemStyle: {
                                    color: this.colorList[0]
                                }
                            },
                            {
                                value: 310,
                                name: "邮件营销",
                                itemStyle: {
                                    color: this.colorList[1]
                                }
                            },
                            {
                                value: 234,
                                name: "联盟广告",
                                itemStyle: {
                                    color: this.colorList[2]
                                }
                            },
                            {
                                value: 135,
                                name: "视频广告",
                                itemStyle: {
                                    color: this.colorList[3]
                                }
                            },
                            {
                                value: 1548,
                                name: "搜索引擎",
                                itemStyle: {
                                    color: this.colorList[4]
                                }
                            }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        createBarData(num) {
            this.currentTab = num;
            var myChart = echarts.init(document.getElementById("main2"));
            let option = {
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: {
                            show: true,
                            type: ["pie", "funnel"]
                        },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                xAxis: {
                    type: "category",
                    data: [
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                        "Sun",
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                        "Sun"
                    ],
                    axisLabel: {
                        textStyle: {
                            color: "#fff"
                        }
                    }
                },
                yAxis: {
                    type: "value",
                    axisLabel: {
                        textStyle: {
                            color: "#999"
                        }
                    }
                },
                series: [
                    {
                        data: [
                            120,
                            200,
                            150,
                            80,
                            70,
                            110,
                            130,
                            120,
                            200,
                            150,
                            80,
                            70,
                            110,
                            130
                        ],
                        barWidth: 20,
                        showBackground: true,
                        backgroundStyle: {
                            color: "#50545C"
                        },
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    { offset: 0, color: "#83bff6" },
                                    { offset: 0.5, color: "#188df0" },
                                    { offset: 1, color: "#6699FF" }
                                ]
                            )
                        },
                        emphasis: {
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        { offset: 0, color: "#2378f7" },
                                        { offset: 0.7, color: "#2378f7" },
                                        { offset: 1, color: "#6699FF" }
                                    ]
                                )
                            }
                        },
                        type: "bar"
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    },
    mounted() {}
};
</script>
<style lang="scss">
.report-dialog {
    .matrix-box {
        margin-top: 20px;
        margin-left: 80px;
        width: 300px;
        border-left: 1px solid #eee;
        border-top: 1px solid #eee;
        box-sizing: border-box;
        position: relative;
        .pos-span-1 {
            position: absolute;
            left: -40px;
            top: 0px;
        }
        .pos-span-2 {
            position: absolute;
            bottom: -55px;
            left: 136px;
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
            background-color: #ddd;
            height: 360px;
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
        border-top: 1px solid #494c54;
        border-left: 1px solid #494c54;
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
