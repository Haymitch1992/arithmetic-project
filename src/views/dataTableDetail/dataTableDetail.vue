<template>
    <div class="bg">
        <div class="online-box">
            <p>
                <span @click="backList">
                    <span class="el-icon-arrow-left" style="margin-right: 4px;"></span>数据表
                </span>
            </p>
            <el-tabs v-model="activeName">
                <el-tab-pane label="数据标注" name="first">
                    <!--  进度条 -->
                    <div class="progress-line">
                        <span class="progress-text">标注进度</span>
                        <span class="progress-item">
                            <el-progress :text-inside="true" :stroke-width="24" :percentage="progress_bar"></el-progress>
                        </span>
                        <span class="progress-text">{{Len_set_lable}}/{{Len_set_line}}</span>
                    </div>
                    <div class="item-1">
                        <!-- 待标注序列 -->
                        <div class="item-1-left">
                            <div class="item-img">
                                <div id="myChart3" :style="{width: '100%',height: '350px'}"></div>
                            </div>
                        </div>
                        <div class="item-1-right">
                            <p class="currnet-status">
                                当前标注状态：
                                <el-tag v-if="lable_type==='1.0'" type="success">正例</el-tag>
                                <el-tag v-if="lable_type==='0.0'" type="danger">反例</el-tag>
                                <el-tag v-if="lable_type==='nan'" type="warning">未标注</el-tag>
                            </p>
                            <table class="check-table" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <th v-for="(item, index) in set_header_list" :key="index">{{item}}</th>
                                </tr>
                                <tr>
                                    <td v-for="(item, index) in Set_Line_content" :key="index">{{item}}</td>
                                </tr>
                            </table>
                            <p>标注正反例：</p>
                            <div class="inp-line">
                                <el-button style="width: 25%;" size="small" type="success" plain @click="postLableInfo(1)">正例</el-button>
                                <el-button style="width: 25%;" size="small" type="danger" plain @click="postLableInfo(0)">反例</el-button>
                                <el-button style="width: 25%;" size="small" type="primary" plain @click="openClassifyDialog()"><i class="el-icon-upload el-icon--right" style="margin-right: 4px;"></i>聚合分类</el-button>
                            </div>
                            <p>查看标注记录：</p>
                            <div class="inp-line">
                                <el-button style="width: 25%;" size="small" @click="prev" plain>上一个</el-button>
                                <el-button style="width: 25%;" size="small" @click="next" plain>下一个</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="parentBox">
                        <div class="item-2">
                            <h3>序列特征</h3>
                            <el-table border :data="characteristicList" class="rest-table">
                                <el-table-column prop="label" label=""></el-table-column>
                                <el-table-column   label="平均值">
                                    <template slot-scope="scope">
                                      <span @click="getHistogramData(scope.row, 'value')">
                                           {{scope.row.value}}
                                      </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="ptp" label="PTP">
                                    <template slot-scope="scope">
                                      <span @click="getHistogramData(scope.row, 'ptp')">
                                           {{scope.row.ptp}}
                                      </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="standard" label="标准差">
                                    <template slot-scope="scope">
                                      <span @click="getHistogramData(scope.row, 'standard')">
                                           {{scope.row.standard}}
                                      </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="median" label="中位数">
                                    <template slot-scope="scope">
                                      <span @click="getHistogramData(scope.row, 'median')">
                                           {{scope.row.median}}
                                      </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="long" label="长度">
                                    <template slot-scope="scope">
                                      <span @click="getHistogramData(scope.row, 'long')">
                                           {{scope.row.long}}
                                      </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="item-2">
                            <h3>故障预测</h3>
                            <ul class="forecast-ul">
                                <li>
                                    <p>IF 预测结果:</p>
                                    <p class="strong">{{grade_data_message[0].toFixed(3)}}</p>
                                </li>
                                <li>
                                    <p>HBOS 预测结果:</p>
                                    <p class="strong">{{grade_data_message[1].toFixed(3)}}</p>
                                </li>
                                <li>
                                    <p>综合预测分数:</p>
                                    <p class="strong">{{grade_data_message[2].toFixed(3)}}</p>
                                </li>
                            </ul>
<!--                            <p class="forecast-text">综合预测分数：<span class="forecast-num">34.444分</span></p>-->
<!--                            <el-progress :show-text="false" :stroke-width="4" :percentage="50"></el-progress>-->
                            <p class="forecast-text">注：分数越高故障可能性能高！</p>
                        </div>
                    </div>
                    <div class="item-1 item-3">
                        <div class="item-1-content">
                            <h3>历史特征序列</h3>
                            <el-tabs v-model="activeName2" >
                                <el-tab-pane :label="item" :name="item" v-for="(item, index) in set_title" :key="index"></el-tab-pane>
                            </el-tabs>
                            <div id='myChart_along' :style="{width: '100%',height: '400px'}"></div>
                        </div>
                    </div>
                    <!--  代表著序列 -->
                    <!--  序列特征 -->
                    <!--  故障预测 -->
                    <!--  历史特征时序 -->
                </el-tab-pane>
                <el-tab-pane label="分类数据检索" name="second">
                    <p>序列检索</p>
                    <div>
                        <div class="search-left">
                            <p :class="{'active-p':item.id == currentItemId}" @click="changeSearch(item.id)" v-for="(item, index) in all_classify" :key="index">{{item.classify_name}}</p>
                        </div>
                        <div class="list-right">
                            <el-table :data="searchList" class="rest-table">
                                <el-table-column prop="set_id" label=集合ID></el-table-column>
                                <el-table-column prop="data_id" label="数据ID"></el-table-column>
                                <el-table-column  label="图示">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="viewChart(scope.row.data_id)">查看</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <el-dialog
                    title="直方图(质量分布图)"
                    :visible.sync="dialogVisible"
                    width="30%"
                    >
                <div id="myChart4" :style="{width: '100%',height: '300px'}"></div>
                <p>{{zhifangText}}</p>
            </el-dialog>
            <el-dialog
                    title=""
                    :visible.sync="dialogVisible2"
                    width="30%"
            >
                <div id="myChart5" :style="{width: '100%',height: '300px'}"></div>
            </el-dialog>
            <el-dialog
                    title="标注分类"
                    :visible.sync="biaozhuDialog"
                    width="30%"
            >
                <el-form v-if="!isCreateTab">
                    <el-form-item label="添加分类" label-width="140px">
                        <el-select v-model="formData.id" placeholder="请选择分类" style="width: 250px;">
                            <el-option
                                    v-for="item in all_classify"
                                    @click.native="currStationChange(item)"
                                    :key="item.id"
                                    :label="item.classify_name"
                                    :value="item.id">
                            </el-option >
                        </el-select>
                        <el-button type="primary" size="small" icon="el-icon-plus" style="margin-left: 10px;" title="添加标注" @click="isCreateTab=true" circle></el-button>
                    </el-form-item>
                    <el-form-item label="分类说明" label-width="140px">
                        <el-input  style="width: 250px;" v-model="formData.classify_name" placeholder="分类说明"  :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <el-form v-if="isCreateTab">
                    <el-form-item label="新建分类名称"  label-width="140px">
                        <el-input style="width: 250px;" v-model="addFormData.classify_name" placeholder="请输入分类名称"  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新建分类说明" label-width="140px">
                        <el-input  style="width: 250px;" v-model="addFormData.classify_content" placeholder="请输入分类说明"   autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" v-if="!isCreateTab">
                    <el-button @click="biaozhuDialog = false">取 消</el-button>
                    <el-button type="primary" @click="saveFormData">确 定</el-button>
                </div>
                <div slot="footer" class="dialog-footer" v-if="isCreateTab">
                    <el-button type="primary" @click="saveAddFormData">保存</el-button>
                </div>
            </el-dialog>
            <el-dialog
                    :visible.sync="progress_box"
                    style="text-align:center;"
                    width="400px"
            >
                <el-progress type="circle" :percentage="progress_num" width="200"  :status="progress_status"></el-progress>
                <h3>{{progress_text}}</h3>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import echarts from 'echarts';
import HighCharts from 'highcharts';
import histogram from 'highcharts/modules/histogram-bellcurve';
import {
    SET_LABLE,
    SET_CHART_DATA,
    GAIN_SET_DATA,
    SET_LABLE_TITLE,
    GET_CLASSIFY,
    POST_ADD_CLASSIFY,
    ALL_CLASSIFY,
    TRAIT_GRADE_DATA,
    TRAIT_HISTOGRAM,
    HISTORY_MEAN_DATA,
    GET_TASK_PROGRESS,
    CHANGE_LABEL_NUM
} from '../../assets/url.js';
histogram(HighCharts);
export default {
    name: 'home',
    filters: {
        modelStatusZn(val) {
            switch (val) {
                case 0:
                    return '未开始';
                case 1:
                    return '进行中';
                case 2:
                    return '已完成';
                case 3:
                    return '失败';
                case 4:
                    return '已停止';
            }
        }
    },
    watch: {
        activeName2(val) {
            this.getJsonData(val);
        }
    },
    data() {
        return {
            progress_box: false,
            progress_status: '',
            progress_text: '',
            progress_num: 0,
            currentItemId: '', // 检索激活项
            set_title: [],
            zhifangText: '', // 直方图里面的文字
            grade_data_message: [0, 0, 0], // 故障预测
            formData: {
                id: '',
                classify_content: '',
                classify_name: ''
            },
            addFormData: {
                classify_content: '',
                classify_name: ''
            },
            dialogVisible2: false, // 图例展示
            isCreateTab: false,
            biaozhuDialog: false,
            all_classify: [],
            lable_type: '', // 当前id的标注状态
            Len_set_lable: '', // 已标注数量
            Len_set_line: '', // 数据集总数
            data_id: '', // 当前待标注的数据
            progress_bar: 0,
            Set_Line_content: [],
            set_header_list: [],
            data_set_id: '',
            dialogVisible: false, // 直方图弹窗
            myChart3: '', // 待标注序列图
            myChart4: '', // 直方图
            option: {
                title: {
                    text: 'Beijing AQI'
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    // data: []
                },
                yAxis: {},
                dataZoom: [
                    {
                        startValue: '2014-06-01'
                    },
                    {
                        type: 'inside'
                    }
                ],
                series: {
                    name: 'Beijing AQI',
                    type: 'bar',
                    data: []
                }
            },
            activeName: 'first',
            all_record_seem: '', // 待标注序列
            activeName2: 'first', // 历史特征序列
            myChart_history: '',
            mychart_data: {
                title: {
                    text: '待标注序列',
                    subtext: '',
                    top: '10px',
                    left: '10px'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    top: '20px',
                    data: []
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: { readOnly: false },
                        magicType: { type: ['line', 'bar', 'aaa'] },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                    // data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 142, 144, 146, 148, 150, 152, 154, 156]
                },
                yAxis: {
                    // 纵轴标尺固定
                    type: 'value',
                    scale: true
                    // max: 20,
                    // min: 0,
                    // splitNumber: 10,
                    // boundaryGap: [0.2, 0.2]
                },
                series: []
            },
            myChart_along: {
                // 数据格式
                backgroundColor: '#ffffff',
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    top: '10%',
                    left: '5%'
                    // containLabel: true
                },
                xAxis: {
                    data: [0, 1, 2, 3, 4, 5, 6, 7]
                },
                yAxis: {
                    splitLine: {
                        show: false
                    }
                },
                toolbox: {
                    left: 'center',
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                dataZoom: [
                    {
                        startValue: '历史时序'
                    },
                    {
                        type: 'inside'
                    }
                ],
                visualMap: {
                    top: 10,
                    right: 10,
                    pieces: [
                        {
                            gt: 0,
                            lte: 2,
                            color: '#5CADAD'
                        }
                    ]
                },
                series: {
                    name: '平均值',
                    type: 'line',
                    data: [],
                    markLine: {
                        silent: true,
                        data: [
                            {
                                yAxis: 0.6
                            },
                            {
                                yAxis: 0.1
                            },
                            {
                                yAxis: 0.3
                            },
                            {
                                yAxis: 0.9
                            },
                            {
                                yAxis: 1.2
                            },
                            {
                                yAxis: 1.5
                            },
                            {
                                yAxis: 1.8
                            }
                        ]
                    },
                    lineStyle: {
                        width: 1 // 设置线条粗细
                    }
                }
            },
            searchList: [],
            tableData: [
                {
                    id: '200180',
                    device: '9300',
                    time: '2020-10-10 18:20:20',
                    status: '未标注'
                }
            ],
            characteristicList: [], // 序列特征数据
            loading: ''
        };
    },
    mounted() {
        if (this.$route.params.lableId) {
            this.data_set_id = this.$route.params.lableId;
            // 获取数据标注进度
            this.getTaskProgress();
        } else {
            this.backList();
        }
        this.getJsonData();
        this.getLable();
        this.getClassify();
    },
    methods: {
        // 获取标注进度
        getTaskProgress() {
            this.$api
                .get(GET_TASK_PROGRESS, {
                    task_id: this.data_set_id
                })
                .then(res => {
                    // 判断还在或过程中 再次调用
                    this.progress_box = true;
                    if (res.data.task === null || res.data.task.progress < 1) {
                        setTimeout(() => {
                            this.progress_num = parseInt(
                                res.data.task.progress * 100
                            );
                            this.progress_text = res.data.task.title;
                            this.getTaskProgress();
                        }, 1000);
                    } else if (res.data.task.progress === 1) {
                        this.progress_status = 'success';
                        this.progress_box = false;
                    }
                    // 判断一结束
                    console.log(res);
                });
        },
        // 获取数据特征及预测分数获取
        getGarde() {
            this.$api
                .post(TRAIT_GRADE_DATA, {
                    data_set_id: this.data_set_id,
                    data_id: this.data_id
                })
                .then(res => {
                    this.grade_data_message = res.data.grade_data_message;
                    this.characteristicList = [];
                    this.set_title = res.data.set_title;
                    this.activeName2 = res.data.set_title[0];
                    // 先拿 set_title
                    for (let k = 0; k < res.data.set_title.length; k++) {
                        this.characteristicList.push({
                            label: res.data.set_title[k],
                            value: res.data[res.data.set_title[k]][0],
                            ptp: res.data[res.data.set_title[k]][1],
                            standard: res.data[res.data.set_title[k]][2],
                            median: res.data[res.data.set_title[k]][3],
                            long: res.data[res.data.set_title[k]][4]
                        });
                    }
                });
        },
        // 查看图例
        viewChart(id) {
            this.dialogVisible2 = true;
            this.getChartData('myChart5', id);
        },
        // 重置分类数据
        resetFormData() {
            this.formData = {
                id: '',
                classify_content: '',
                classify_name: ''
            };
            this.addFormData = {
                classify_content: '',
                classify_name: ''
            };
        },
        // 监听select的变化
        currStationChange(val) {
            this.formData.classify_name = val.classify_content;
        },
        // 保存分类
        saveFormData() {
            this.$api
                .post(POST_ADD_CLASSIFY, {
                    set_id: this.data_set_id,
                    data_id: this.data_id,
                    classify_id: this.formData.id
                })
                .then(res => {
                    this.biaozhuDialog = false;
                });
        },
        // 保存新建标注
        saveAddFormData() {
            this.$api
                .post(GET_CLASSIFY, {
                    data_set_id: this.data_set_id,
                    classify_name: this.addFormData.classify_name,
                    classify_content: this.addFormData.classify_content
                })
                .then(res => {
                    this.resetFormData();
                    this.isCreateTab = false;
                    this.getClassify();
                });
        },
        // 打开标注弹框
        openClassifyDialog() {
            this.biaozhuDialog = true;

            this.resetFormData();
        },
        // 获取分类列表
        getClassify() {
            // 提交保住信息
            this.$api
                .get(GET_CLASSIFY + '?set_id=' + this.data_set_id)
                .then(res => {
                    this.all_classify = res.data.all_classify;
                    // 默认执行第一项
                    if (this.all_classify.length !== 0) {
                        this.changeSearch(this.all_classify[0].id);
                    }
                });
        },
        changeLabelNum(type) {
            this.$api
                .post(CHANGE_LABEL_NUM, {
                    data_set_id: this.data_set_id,
                    data_id: this.data_id,
                    boole_value: type
                })
                .then(res => {
                    if (res.data.code === 200) {
                        this.data_id = res.data.data_id;
                        this.getSetData();
                        this.getChartData('myChart3', this.data_id);
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.mesage
                        });
                    }
                });
        },
        // 下一个
        next() {
            // 下一个 通过id++ 如果返回 304 就是没有下一个了
            this.changeLabelNum(1);
        },
        // 上一个
        prev() {
            // 上一个 通过id-- 如果到1了 那就没上一个了
            this.changeLabelNum(0);
        },
        // 提交标注信息
        postLableInfo(num) {
            this.$api
                .post(SET_LABLE_TITLE, {
                    data_set_id: this.data_set_id,
                    data_id: this.data_id,
                    data_user_id: localStorage.getItem('data_user_id'),
                    data_lable_type: num
                })
                .then(res => {
                    // 根据返回值 切换标注ID
                    this.data_id = res.data.data_id;
                    console.log('当前id', this.data_id);
                    // 更新数据
                    this.getSetData();
                    this.getChartData('myChart3', this.data_id);
                    // 返回值是 201 提示用户 标注完成
                    if (res.data.code === 201) {
                        this.$message({
                            type: 'success',
                            message: '标注完成'
                        });
                    }
                });
        },
        // 返回列表页
        backList() {
            this.$router.push('/dataManagement');
        },
        // 获取待标注序列
        getChartData(locationID, data_id) {
            this.getGarde();
            // 如果传递ID 那么渲染 myChart5
            this.$api
                .post(SET_CHART_DATA, {
                    data_set_id: this.data_set_id,
                    data_id: data_id
                })
                .then(res => {
                    this.myChart3 = echarts.init(
                        document.getElementById(locationID)
                    );
                    this.all_record_seem = res.data;
                    // 循环处理数据
                    let color = [
                        '#ff7f50',
                        '#87cefa',
                        '#da70d6',
                        '#32cd32',
                        '#6495ed',
                        '#ff69b4',
                        '#ba55d3',
                        '#cd5c5c',
                        '#ffa500',
                        '#40e0d0',
                        '#1e90ff',
                        '#ff6347',
                        '#7b68ee',
                        '#d0648a',
                        '#ffd700',
                        '#6b8e23',
                        '#4ea397',
                        '#3cb371',
                        '#b8860b',
                        '#7bd9a5'
                    ];
                    let colorIndex = 0;
                    let maxLength = 0;
                    this.mychart_data.legend.data = [];
                    this.mychart_data.series = [];
                    this.mychart_data.xAxis.data = [];
                    for (let k in res.data) {
                        if (k !== 'code') {
                            colorIndex++;
                            this.mychart_data.legend.data.push(k);
                            maxLength =
                                maxLength < res.data[k].length
                                    ? res.data[k].length
                                    : maxLength;
                            this.mychart_data.series.push({
                                name: k,
                                type: 'line',
                                data: res.data[k],
                                itemStyle: {
                                    normal: {
                                        color: color[colorIndex],
                                        lineStyle: {
                                            width: 1 // 设置线条粗细
                                        }
                                    }
                                },
                                areaStyle: {
                                    color: new echarts.graphic.LinearGradient(
                                        0,
                                        0,
                                        0,
                                        1,
                                        [
                                            {
                                                offset: 0,
                                                color: color[colorIndex]
                                            },
                                            {
                                                offset: 1,
                                                color: '#fff'
                                            }
                                        ]
                                    )
                                }
                            });
                        }
                    }
                    for (let num = 0; num < maxLength; num++) {
                        this.mychart_data.xAxis.data.push(num);
                    }
                    this.myChart3.setOption(this.mychart_data);
                });
        },
        // 获取标注数据
        getLable() {
            this.$api
                .post(SET_LABLE, {
                    data_set_id: this.data_set_id
                })
                .then(res => {
                    this.data_id = res.data.data_id;
                    this.getSetData();
                    this.getChartData('myChart3', this.data_id);
                });
        },
        // 获取标注数据
        getSetData() {
            this.$api
                .post(GAIN_SET_DATA, {
                    data_set_id: this.data_set_id,
                    data_id: this.data_id
                })
                .then(res => {
                    // 305 重新赋值再请求
                    if (res.data.code === 305) {
                        this.data_id = res.data.data_id;
                        this.getSetData();
                        this.getChartData('myChart3', res.data.data_id);
                    } else {
                        this.Set_Line_content = res.data.Set_Line_content || [
                            '暂无数据'
                        ];
                        this.set_header_list = res.data.set_header_list || [
                            '暂无数据'
                        ];
                        this.lable_type = res.data.lable_type;
                        this.Len_set_lable = res.data.len_set_label || 0;
                        this.Len_set_line = res.data.len_set_line || 0;
                        this.progress_bar =
                            parseFloat(
                                (
                                    (this.Len_set_lable / this.Len_set_line) *
                                    100
                                ).toFixed(2)
                            ) || 0;
                    }
                });
        },
        // 改变当前查询id
        changeSearch(str) {
            this.currentItemId = str;
            this.$api
                .post(ALL_CLASSIFY, {
                    classify_id: str
                })
                .then(res => {
                    this.searchList = res.data.all_classify_data;
                });
        },
        // 获取直方图数据
        getHistogramData(obj, str) {
            // 处理数据
            let objCn = {
                value: '_mean',
                ptp: '_ptp',
                standard: '_std',
                median: '_amax',
                long: '_median'
            };
            let objZn = {
                value: '平局值',
                ptp: 'PTP',
                standard: '标准差',
                median: '中位数',
                long: '长度'
            };
            this.zhifangText = obj.label + ' ' + objZn[str] + ' : ' + obj[str];
            this.dialogVisible = true;
            this.$api
                .get(
                    TRAIT_HISTOGRAM +
                        '?data_set_id=' +
                        this.data_set_id +
                        '&data_trait_name=' +
                        obj.label +
                        objCn[str]
                )
                .then(res => {
                    let data = res.data.trait_data_list;
                    HighCharts.chart('myChart4', {
                        title: {
                            text: '直方图（质量分布图）'
                        },
                        xAxis: [
                            {
                                title: { text: '数量' }
                            },
                            {
                                title: { text: '数值' },
                                opposite: true,
                                plotLines: [
                                    {
                                        color: 'red', // 线的颜色，定义为红色
                                        dashStyle: 'longdashdot', // 标示线的样式，默认是solid（实线），这里定义为长虚线
                                        value: obj[str], // 定义在哪个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                                        width: 1 // 标示线的宽度，2px
                                    }
                                ]
                            }
                        ],

                        yAxis: [
                            {
                                title: { text: '范围' }
                            },
                            {
                                title: { text: '计数' },
                                opposite: true
                            },
                            {}
                        ],
                        series: [
                            {
                                name: '计数：',
                                type: 'histogram',
                                xAxis: 1,
                                yAxis: 1,
                                baseSeries: 's1',
                                zIndex: -1,
                                color: '#4F9D9D'
                            },
                            {
                                name: '分布',
                                type: 'scatter',
                                data: data,
                                id: 's1',
                                marker: {
                                    radius: 0
                                },
                                color: '#C07AB8'
                            }
                        ],
                        credits: {
                            enabled: false // 禁用版权信息
                        }
                    });
                });
        },
        // 获取历史特征序列
        getJsonData(str) {
            let _this = this;
            this.$api
                .get(
                    HISTORY_MEAN_DATA +
                        '?data_set_id=' +
                        this.data_set_id +
                        '&data_name=' +
                        str +
                        '_mean'
                )
                .then(function(res) {
                    _this.myChart_history = echarts.init(
                        document.getElementById('myChart_along')
                    );
                    _this.myChart_along.series.data = res.data.mean_data_list;
                    let arr1 = new Array(res.data.mean_data_list.length);
                    for (var i = 0; i < arr1.length; i++) {
                        arr1[i] = i;
                    }
                    _this.myChart_along.xAxis.data = arr1;
                    _this.myChart_history.setOption(_this.myChart_along);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
};
</script>

<style scoped lang="scss">
.bg {
    padding: 20px;
}
.currnet-status {
    padding-bottom: 10px;
}
.check-table {
    width: 100%;
    overflow-x: auto;
    display: block;
    border-left: 1px solid #ebeef5;
    border-top: 1px solid #ebeef5;
}
.check-table th {
    line-height: 36px;
    text-align: center;
    background-color: #fafafa;
    color: #1677ff;
    border-right: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    font-weight: normal;
}
.check-table td {
    line-height: 36px;
    min-width: 140px;
    text-align: center;
    border-right: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    padding: 4px 20px;
}
.online-box {
    height: calc(100vh - 100px);
    overflow-y: auto;
    background-color: #fff;
    border-top-left-radius: 50px;
    padding: 10px 30px 20px;
    box-shadow: 1px 2px 3px #e5e5e5;
    box-sizing: border-box;
    .search-left {
        width: 18%;
        background-color: #f7f7f8;
        padding: 20px 0;
        display: inline-block;
        vertical-align: top;
        border-radius: 4px;
        box-shadow: 1px 1px 10px #ddd;
        margin-left: 10px;
        margin-bottom: 10px;
        p {
            line-height: 30px;
            text-align: center;
            cursor: pointer;
        }
        p:hover {
            color: #1677ff;
        }
        .active-p {
            color: #1677ff;
        }
    }
    .list-right {
        vertical-align: top;
        display: inline-block;
        width: 80%;
        padding-left: 20px;
        box-sizing: border-box;
        .strong {
            color: #1677ff;
            padding: 0;
        }
    }
    .parentBox {
        font-size: 0;
    }
    .pagination-line {
        background-color: #fff;
        padding: 20px 20px 10px;
        text-align: left;
    }
    .progress-line {
        text-align: center;
        .progress-item {
            width: 70%;
            display: inline-block;
            padding: 10px 0;
            margin: 0 10px;
        }
        .progress-text {
            font-size: 14px;
        }
    }

    .item-1 {
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 20px;
        margin-top: 10px;
        font-size: 0px;
        .item-1-content {
            font-size: 14px;
        }
        h3 {
            padding: 0 0 0 10px;
            margin: 0;
            font-size: 14px;
            position: relative;
            line-height: 30px;
            font-weight: normal;
        }
        h3:before {
            width: 4px;
            height: 20px;
            background-color: #00c0ff;
            content: '';
            position: absolute;
            left: 0;
            top: 5px;
        }
        .item-1-left {
            width: 49%;
            display: inline-block;
            font-size: 12px;
            vertical-align: top;
            border: 1px solid #ddd;
            box-shadow: 2px 2px 10px #dddddd;
            box-sizing: border-box;
            margin-right: 20px;
            .item-img {
                background-color: #f3f3f3;
            }
            .btn-line {
                text-align: center;
            }
        }
        .item-1-right {
            width: 49%;
            vertical-align: top;
            font-size: 12px;
            height: 350px;
            display: inline-block;
            padding: 0 10px 0 20px;
            box-sizing: border-box;
            box-shadow: 2px 2px 10px #dddddd;
            border: 1px solid #ddd;
            p {
                margin-bottom: 4px;
                font-size: 13px;
            }
            .cell {
                font-size: 12px;
            }
            .inp-200 {
                width: 300px;
                margin-right: 6px;
            }
            .inp-line {
                padding: 4px 0;
            }
            .margin-top-10 {
                margin-top: 6px;
            }
        }
    }
    .item-2 {
        width: 49%;
        display: inline-block;
        font-size: 18px;
        background-color: #fff;
        margin-right: 20px;
        vertical-align: top;
        border: 1px solid #ddd;
        box-shadow: 2px 2px 10px #dddddd;
        box-sizing: border-box;
        padding: 10px 20px;
        .forecast-text {
            font-size: 12px;
            margin: 10px 0;
        }
        .forecast-num {
            font-size: 20px;
            color: #1677ff;
        }
        .forecast-ul {
            list-style: none;
            font-size: 0;
            padding: 0;
            margin: 0;
            li {
                font-size: 14px;
                display: inline-block;
                width: 33%;
                p {
                    padding: 10px 0;
                    margin: 0;
                    text-align: center;
                }
                .strong {
                    color: #6dd400;
                    font-size: 22px;
                }
            }
        }
        h3 {
            padding: 0 0 0 10px;
            margin: 0;
            font-size: 14px;
            position: relative;
            line-height: 30px;
            font-weight: normal;
            padding-bottom: 10px;
        }
        h3:before {
            width: 4px;
            height: 20px;
            background-color: #00c0ff;
            content: '';
            position: absolute;
            left: 0;
            top: 5px;
        }
    }
    .item-2:last-child {
        margin-right: 0;
    }
    .item-3 {
        border: 1px solid #ddd;
        box-shadow: 2px 2px 10px #dddddd;
        width: calc(98% + 20px);
        padding: 10px 20px;
        margin-top: 20px;
    }
}
</style>
<style>
.rest-table th {
    background-color: #fafafa;
    padding: 8px 0;
}
.rest-table th .cell {
    font-weight: normal;
    color: #1677ff;
}
.rest-table td {
    padding: 8px 0;
}
.rest-table .cell {
    font-size: 12px;
}
.item-1 .item-1-right .el-button--small.is-circle {
    padding: 4px;
}
</style>
