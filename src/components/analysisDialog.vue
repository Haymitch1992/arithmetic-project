<template>
  <div class="report-dialog">
   <!-- 数据集数据展示 -->
        <el-dialog
            title="聚类模型评估-结果分析报告"
             class="dataView"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <div style="max-height:60vh;overflow-y:auto;">
                {{this.$store.state.analysisDialog}}
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
                <el-button @click="createData">显示图表</el-button>
                <el-button @click="createBarData">柱形图</el-button>
                <div id="main" style="width:100%;height:400px;"></div>
            </div>
        </el-dialog>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
    data() {
        return {
            dialogVisible: true,
            colorList: [
                "#B3CDFF",
                "#9580FF",
                "#BFB3FF",
                "#52CCA3",
                "#A1E6CE",
                "#6699FF"
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
        createData() {
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
        createBarData() {
            var myChart = echarts.init(document.getElementById("main"));
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
                border-bottom: 1px solid #4f4c4c;
            }
            td:first-child {
                width: 40%;
                background: #3a3d4a;
            }
        }
    }
}
</style>
