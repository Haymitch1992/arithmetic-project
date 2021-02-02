<template>
  <div class="report-dialog" v-show="this.$store.state.analysisDialog">
   <!-- 数据集数据展示 -->
        <el-dialog
            :title="`${this.$store.state.currentDialog.nodeName}-分析报告`"
             class="dataView"
            :visible.sync="this.$store.state.analysisDialog"
            width="50%"
            :before-close="handleClose">
            <!--聚类-->
            <div style="max-height:60vh;overflow-y:auto;" v-show="this.$store.state.currentDialog.nodeName==='聚类评估'">
                <el-button-group>
                    <el-button  :type="currentTab===0?'primary':'default'" size="small" @click="changejulei(0)">指标数据</el-button>
                    <el-button  :type="currentTab===1?'primary':'default'" size="small"  @click="changejulei(1)">饼图</el-button>
                    <el-button  :type="currentTab===2?'primary':'default'" size="small" @click="changejulei(2)">柱形图</el-button>
                </el-button-group>
                <!--表格-->
                <table class="report-table" v-show="currentTab===0">
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
                <div id="main" v-show="currentTab===1" style="width:750px;height:400px;"></div>
                <div id="main2" v-show="currentTab===2" style="width:750px;height:400px;"></div>
            </div>
            <!--回归-->
            <div style="max-height:60vh;overflow-y:auto;"  v-show="this.$store.state.currentDialog.nodeName==='回归评估'">
                <!--图-->
                <el-button-group>
                    <el-button :type="currentTab===0?'primary':'default'" size="small"  @click="changeTab(0)">列表</el-button>
                    <el-button :type="currentTab===1?'primary':'default'" size="small" @click="changeTab(1)">图表</el-button>
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
                        prop="label"
                        label="指标"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="value"
                        label="值">
                    </el-table-column>
                </el-table>
                <div class="chart-box"  v-show="currentTab===1">
                    <div class="chart-left">
                        <div class="chart-item" @click="handleItem(0)">
                            <span :class="currentItem===0?'active':''">Residual</span>
                            <img src="../assets/img/charts-icon-5.png" alt="">
                        </div>
                    </div>
                    <div class="chart-right">
                        <div id="main3"  style="width:580px;height:360px;"></div>
                    </div>
                </div>
            </div>
            <!--二分类 多分类-->
            <div style="max-height:60vh;overflow-y:auto;"  v-show="this.$store.state.currentDialog.nodeName==='二分类评估'">
                <!--图-->
                <el-button-group>
                    <el-button :type="currentTab===0?'primary':'default'" size="small"  @click="handelMatrix(0)">指标数据</el-button>
                    <el-button :type="currentTab===1?'primary':'default'" size="small" @click="handelMatrix(1,'confusion_matrix')">混淆矩阵</el-button>
                    <el-button :type="currentTab===2?'primary':'default'" size="small" @click="handelMatrix(2,'scale_matrix')">比例矩阵</el-button>
                    <el-button :type="currentTab===3?'primary':'default'" size="small" @click="handelMatrix(3)">图表</el-button>
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
                        prop="label"
                        label="指标"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="value"
                        label="值">
                    </el-table-column>
                </el-table>
                <div style="height:360px" v-show="currentTab===1">
                    <div class="matrix-box" :style="{width:arr1.length*100+'px'}">
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
                </div>
                <div style="height:360px;" v-show="currentTab===2">
                    <div class="matrix-box" :style="{width:arr1.length*100+'px'}">
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
                <div class="chart-box"  v-show="currentTab===3">
                    <div class="chart-left">
                        <div class="chart-item" @click="handleItem(0,'roc')">
                            <span :class="currentItem===0?'active':''">ROC</span>
                            <img src="../assets/img/charts-icon-1.png" alt="">
                        </div>
                        <div class="chart-item" @click="handleItem(1,'ks')">
                            <span :class="currentItem===1?'active':''">K-S</span>
                            <img src="../assets/img/charts-icon-2.png" alt="">
                        </div>
                        <div class="chart-item" @click="handleItem(2,'pr')">
                            <span :class="currentItem===2?'active':''">Precision Recall</span>
                            <img src="../assets/img/charts-icon-3.png" alt="">
                        </div>
                        <div class="chart-item" @click="handleItem(3,'cpr')">
                            <span :class="currentItem===3?'active':''">Class Predict Report</span>
                            <img src="../assets/img/charts-icon-4.png" alt="">
                        </div>
                    </div>
                    <div class="chart-right">
                        <div id="main7" v-show="currentItem===0" style="width:580px;height:360px;"></div>
                        <div id="main8" v-show="currentItem===1" style="width:580px;height:360px;"></div>
                        <div id="main9" v-show="currentItem===2" style="width:580px;height:360px;"></div>
                        <div id="main10" v-show="currentItem===3" style="width:580px;height:360px;"></div>
                    </div>
                </div>
            </div>
            <!--多分类-->
            <div style="max-height:60vh;overflow-y:auto;"  v-show="this.$store.state.currentDialog.nodeName==='多分类评估'">
                <!--图-->
                <el-button-group>
                    <el-button :type="currentTab===0?'primary':'default'" size="small"  @click="handelMatrix(0)">指标数据</el-button>
                    <el-button :type="currentTab===2?'primary':'default'" size="small" @click="handelMatrix(1,'confusion_matrix')">混淆矩阵</el-button>
                    <el-button :type="currentTab===1?'primary':'default'" size="small" @click="handelMatrix(2,'scale_matrix')">比例矩阵</el-button>
                    <el-button :type="currentTab===3?'primary':'default'" size="small" @click="handelMatrix(3)">预测类别分析</el-button>
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
                        prop="label"
                        label="指标"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="value"
                        label="值">
                    </el-table-column>
                </el-table>
                <div style="height:360px;" v-show="currentTab===1">
                    <div class="matrix-box" :style="{width:arr1.length*100+'px'}">
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
                </div>
                <div style="height:360px;" v-show="currentTab===2">
                    <div class="matrix-box" :style="{width:arr1.length*100+'px'}">
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
                <div id="main6" v-show="currentTab==3" style="width:750px;height:400px;"></div>
            </div>
        </el-dialog>
  </div>
</template>
<script>
import echarts from 'echarts';
import { GET_RESULT_REPORT } from '../assets/url.js';
export default {
    data() {
        return {
            arr1: [[12, 0, 0], [0, 10, 1], [0, 0, 7]],
            arr2: [[1, 0.4, 0.6], [0, 0.9091, 0.0901], [0, 0, 1]],
            // arr1: [],
            // arr2: [],
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
            rocData: {},
            AUC: '',
            KS: '',
            F1_Score: ''
        };
    },
    computed: {
        dialogVisible2() {
            return this.$store.state.analysisDialog;
        }
    },
    watch: {
        dialogVisible2() {
            this.getReport();
            this.currentTab = 0;
            this.currentItem = 0;
            this.getRoc();
            // 根据类型 判断请求
        }
    },
    methods: {
        // 获取roc
        getRoc() {
            this.$api
                .get(GET_RESULT_REPORT, {
                    run_uuid: this.$store.state.currentDialog.run_uuid,
                    index: 'roc' // 列表
                })
                .then(res => {
                    console.log(res);
                    if (res.data.code !== 200) {
                        return;
                    }
                    // 处理ks 数据
                    this.rocData = res.data;
                    let arr1 = [];
                    let arr2 = [];
                    let ks = [];
                    let ks_value = res.data.k_s[6].ks_value[0];
                    // x1 y1
                    for (let i = 0; i < res.data.k_s[0].x1.length; i++) {
                        arr1.push([
                            res.data.k_s[0].x1[i],
                            res.data.k_s[1].y1[i]
                        ]);
                    }
                    for (let k = 0; k < res.data.k_s[2].x2.length; k++) {
                        arr2.push([
                            res.data.k_s[2].x2[k],
                            res.data.k_s[3].y2[k]
                        ]);
                    }
                    ks[0] = [res.data.k_s[4].ks_x[0], res.data.k_s[5].ks_y[0]];
                    ks[1] = [res.data.k_s[4].ks_x[1], res.data.k_s[5].ks_y[1]];
                    console.log(arr1, arr2, ks);
                    this.rocData.arr1 = arr1;
                    this.rocData.arr2 = arr2;
                    this.rocData.ks = ks;
                    this.rocData.ks_value = ks_value;
                    this.KS = ks_value;
                    this.drawRoc('main7');
                });
        },
        // 获取 混淆矩阵
        getConfusionMatrix() {
            this.$api
                .get(GET_RESULT_REPORT, {
                    run_uuid: this.$store.state.currentDialog.run_uuid,
                    index: 'confusion_matrix' // 列表
                })
                .then(res => {
                    this.arr1 = res.data.confusion_matrix;
                    this.LabelList = res.data.label_list;
                    console.log(res);
                });
        },
        // 获取 比例矩阵
        getScalenMatrix() {
            this.$api
                .get(GET_RESULT_REPORT, {
                    run_uuid: this.$store.state.currentDialog.run_uuid,
                    index: 'scale_matrix' // 列表
                })
                .then(res => {
                    this.arr2 = res.data.scale_matrix;
                    this.LabelList = res.data.label_list;
                    console.log(res);
                });
        },
        // 获取 20f1381e828c4d5e83b19452aabfd996 数据
        getReport() {
            this.$api
                .get(GET_RESULT_REPORT, {
                    run_uuid: this.$store.state.currentDialog.run_uuid,
                    index: 'metrics_data' // 列表
                })
                .then(res => {
                    this.tableData = [];
                    res.data.metrics_data.forEach(item => {
                        for (let k in item) {
                            this.tableData.push({
                                label: k,
                                value: item[k][0] + ''
                            });
                            if (k === 'AUC') {
                                this.AUC = item[k][0];
                            } else if (k === 'F1_Score') {
                                this.F1_Score = item[k][0];
                            }
                        }
                    });
                });
            this.$api
                .get(GET_RESULT_REPORT, {
                    run_uuid: this.$store.state.currentDialog.run_uuid,
                    index: 'residual' // 图表
                })
                .then(res => {
                    this.echartsData = res.data.residual;
                });
        },
        // 渲染pr数据
        drawCPR(str) {
            var myChart = echarts.init(document.getElementById(str));
            let option = {
                backgroundColor: '#3A3D4A',
                color: this.colorList,
                textStyle: {
                    color: '#fff'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ['1', '0'],
                    name: 'Actual',
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    name: 'Number',
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                series: [
                    {
                        name: '1',
                        type: 'bar',
                        stack: 'cpr',
                        barWidth: '20%',
                        data: this.rocData.class_predict_report[0][1]
                    },
                    {
                        name: '0',
                        type: 'bar',
                        stack: 'cpr',
                        barWidth: '20%',
                        data: this.rocData.class_predict_report[1][0]
                    }
                ]
            };
            myChart.setOption(option);
        },
        // 渲染pr数据
        drawPr(str) {
            let myChart = echarts.init(document.getElementById(str));
            let option = {
                backgroundColor: '#3A3D4A',
                color: this.colorList,
                textStyle: {
                    color: '#fff'
                },
                title: {
                    subtextStyle: {
                        color: '#fff'
                    },
                    subtext: `PR ${this.F1_Score}`
                },
                xAxis: {
                    type: 'category',
                    name: 'Recall',
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                yAxis: {
                    type: 'value',
                    name: 'Precision',
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                series: [
                    {
                        data: this.rocData.pr.reverse(),
                        type: 'line'
                    }
                ]
            };
            myChart.setOption(option);
        },
        // 渲染roc数据
        drawRoc(str) {
            let myChart = echarts.init(document.getElementById(str));
            let option = {
                backgroundColor: '#3A3D4A',
                color: this.colorList,
                textStyle: {
                    color: '#fff'
                },
                title: {
                    subtextStyle: {
                        color: '#fff'
                    },
                    subtext: `AUC ${this.AUC}`
                },
                xAxis: {
                    type: 'value',
                    name: 'FPR',
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                    // boundaryGap: false
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                yAxis: {
                    type: 'value',
                    name: 'TPR',
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                series: [
                    {
                        data: this.rocData.roc,
                        type: 'line',
                        areaStyle: {}
                    }
                ]
            };
            myChart.setOption(option);
        },
        // 渲染roc数据
        drawKs(str) {
            let myChart = echarts.init(document.getElementById(str));
            let option = {
                backgroundColor: '#3A3D4A',
                color: this.colorList,
                textStyle: {
                    color: '#fff'
                },
                legend: {
                    data: ['FPR', 'TPR'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                title: {
                    subtextStyle: {
                        color: '#fff'
                    },
                    subtext: `KS ${this.KS}`
                },
                xAxis: {
                    type: 'value',
                    // name: 'Threshold',
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                    // boundaryGap: false
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                yAxis: {
                    type: 'value',
                    name: 'FPR/TPR',
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                series: [
                    {
                        data: this.rocData.arr1,
                        name: 'FPR',
                        type: 'line',
                        markPoint: {
                            data: [
                                {
                                    value: this.rocData.ks_value,
                                    xAxis: this.rocData.ks[1][0],
                                    yAxis: this.rocData.ks[1][1]
                                }
                            ]
                        },
                        markLine: {
                            symbol: ['none', 'none'],
                            lineStyle: {
                                width: 4,
                                type: 'dashed',
                                color: '#EC5156'
                            },
                            data: [
                                [
                                    {
                                        coord: this.rocData.ks[0]
                                    },
                                    {
                                        coord: this.rocData.ks[1]
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        name: 'TPR',
                        data: this.rocData.arr2,
                        type: 'line'
                    }
                ]
            };
            myChart.setOption(option);
        },
        handleItem(num, type) {
            this.currentItem = num;
            if (type === 'pr') {
                this.drawPr('main9');
            } else if (type === 'cpr') {
                this.drawCPR('main10');
            } else if (type === 'roc') {
                this.drawRoc('main7');
            } else if (type === 'ks') {
                this.drawKs('main8');
            } else {
                this.createScatter('main3');
            }
        },
        handelMatrix(num, type) {
            this.currentTab = num;
            this.createMatrix();
            // 聚类矩阵
            if (type === 'confusion_matrix') {
                this.getConfusionMatrix();
            } else if (type === 'scale_matrix') {
                // 比例矩阵
                this.getScalenMatrix();
            }

            this.createScatter('main4');
            this.createBarData('main6');
        },
        handleClose() {
            this.$store.commit('handleNode', {
                nodeTpye: 'analysisDialog',
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
        createScatter(str) {
            let myChart = echarts.init(document.getElementById(str));
            let option = {
                backgroundColor: '#3A3D4A',
                color: this.colorList,
                tooltip: {
                    trigger: 'axis'
                },
                textStyle: {
                    color: '#fff'
                },
                xAxis: {
                    name: 'Predict Value',
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    name: 'Residual Value',
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                        symbolSize: 20,
                        data: this.echartsData,
                        type: 'scatter',
                        markLine: {
                            symbol: ['none', 'none'],
                            lineStyle: {
                                width: 4,
                                type: 'dashed',
                                color: '#EC5156'
                            },
                            data: [{ yAxis: 0 }]
                        }
                    }
                ]
            };
            myChart.setOption(option);
        },
        createData(str) {
            // 出事haul
            let myChart = echarts.init(document.getElementById(str));
            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    top: '40px',
                    right: 'right',
                    data: [
                        '直接访问',
                        '邮件营销',
                        '联盟广告',
                        '视频广告',
                        '搜索引擎'
                    ],
                    textStyle: {
                        color: '#fff'
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            {
                                value: 335,
                                name: '直接访问',
                                itemStyle: {
                                    color: this.colorList[0]
                                }
                            },
                            {
                                value: 310,
                                name: '邮件营销',
                                itemStyle: {
                                    color: this.colorList[1]
                                }
                            },
                            {
                                value: 234,
                                name: '联盟广告',
                                itemStyle: {
                                    color: this.colorList[2]
                                }
                            },
                            {
                                value: 135,
                                name: '视频广告',
                                itemStyle: {
                                    color: this.colorList[3]
                                }
                            },
                            {
                                value: 1548,
                                name: '搜索引擎',
                                itemStyle: {
                                    color: this.colorList[4]
                                }
                            }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        changejulei(num) {
            this.currentTab = num;
            this.createData('main');
            this.createBarData('main2');
        },
        changeTab(num) {
            this.currentTab = num;
            this.createScatter('main3');
        },
        createBarData(str) {
            var myChart = echarts.init(document.getElementById(str));
            let option = {
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: [
                        'Mon',
                        'Tue',
                        'Wed',
                        'Thu',
                        'Fri',
                        'Sat',
                        'Sun',
                        'Mon',
                        'Tue',
                        'Wed',
                        'Thu',
                        'Fri',
                        'Sat',
                        'Sun'
                    ],
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#999'
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
                            color: '#50545C'
                        },
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    { offset: 0, color: '#83bff6' },
                                    { offset: 0.5, color: '#188df0' },
                                    { offset: 1, color: '#6699FF' }
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
                                        { offset: 0, color: '#2378f7' },
                                        { offset: 0.7, color: '#2378f7' },
                                        { offset: 1, color: '#6699FF' }
                                    ]
                                )
                            }
                        },
                        type: 'bar'
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
