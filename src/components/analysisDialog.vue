<template>
  <div class="report-dialog">
   <!-- 数据集数据展示 -->
        <el-dialog
            :title="titleList[currentNodetype]"
             class="dataView"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <!--聚类-->
            <div style="max-height:60vh;overflow-y:auto;" v-show="currentNodetype===0">
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
            <div style="max-height:60vh;overflow-y:auto;"  v-show="currentNodetype===1">
                <!--图-->
                <el-button-group>
                    <el-button :type="currentTab===0?'primary':'default'" size="small"  @click="createData(0)">饼图</el-button>
                    <el-button :type="currentTab===1?'primary':'default'" size="small" @click="createBarData(1)">柱形图</el-button>
                </el-button-group>
                <!--表格-->
                <el-table
                    :data="tableData"
                    class="data-table"
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
            </div>
        </el-dialog>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
    data() {
        return {
            titleList: [
                "聚类模型评估分析报告",
                "回归-结果分析报告",
                "二分类评估报告",
                "多分类评估报告"
            ],
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
        handleClose() {
            this.$store.commit("handleNode", {
                nodeTpye: "analysisDialog",
                status: false
            });
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
    .el-dialog {
        width: 800px !important;
    }
    .el-button--primary {
        background-color: #3d7fff;
        border: 1px solid #3d7fff;
        border-right: 1px solid #494c54 !important;
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
