<!-- 随机森林 -->
<template>
    <div v-if="nodeData" class="random-box">
        <ul class="prop-tab ">
            <li
                v-for="(item, index) in nodeData"
                v-bind:key="index"
                @click="currentPage = index"
                :class="{ active: currentPage === index }"
            >
                <span>{{ item.label }}</span>
            </li>
        </ul>
        <div class="prop-body">
            <h3>{{ nodeTile }}</h3>
            <div v-for="(item, index) in nodeData" :key="index">
                <el-form :model="formData" ref="formData">
                    <el-form-item
                        :label="itemInp.label"
                        v-for="(itemInp, index2) in item.data"
                        :key="index2"
                        v-show="
                            currentPage === index &&
                                itemInp.label !== '置信范围2'
                        "
                    >
                        <el-select
                            v-if="itemInp.type === 'select'"
                            size="small"
                            v-model="itemInp.value"
                            style="width: 100%"
                            :placeholder="itemInp.placeholder"
                        >
                            <el-option
                                label="区域一"
                                value="shanghai"
                            ></el-option>
                            <el-option
                                label="区域二"
                                value="beijing"
                            ></el-option>
                        </el-select>
                        <el-select
                            v-if="itemInp.type === 'select-2'"
                            size="small"
                            v-model="itemInp.value"
                            style="width: 100%"
                            :placeholder="itemInp.placeholder"
                        >
                            <el-option label="rbf" value="rbf"></el-option>
                            <el-option
                                label="linear"
                                value="linear"
                            ></el-option>
                            <el-option label="poly" value="poly"></el-option>
                            <el-option
                                label="sigmoid"
                                value="sigmoid"
                            ></el-option>
                        </el-select>
                        <!--选择尺度变换函数 特殊处理 根据值得不同 显示不同参数-->
                        <el-select
                            v-if="itemInp.type === 'select-8'"
                            size="small"
                            @change="transformFuc('change')"
                            v-model="itemInp.value.node_params[itemInp.tag]"
                            style="width: 100%"
                            :placeholder="itemInp.placeholder"
                        >
                            <el-option
                                label="Zscore平滑"
                                value="zscore_soften"
                            ></el-option>
                            <el-option
                                label="百分位平滑"
                                value="percentage_soften"
                            ></el-option>
                            <el-option
                                label="阈值平滑"
                                value="threshold_soften"
                            ></el-option>
                            <el-option
                                label="箱线图平滑"
                                value="boxplot_soften"
                            ></el-option>
                        </el-select>
                        <!--带参数的选择框组件-->
                        <el-select
                            v-if="itemInp.type === 'select-options'"
                            size="small"
                            v-model="itemInp.value.node_params[itemInp.tag]"
                            style="width: 100%"
                            :placeholder="itemInp.placeholder"
                        >
                            <el-option
                                :label="selectItem.label"
                                :value="selectItem.value"
                                :key="index"
                                v-for="(selectItem, index) in itemInp.options"
                            ></el-option>
                        </el-select>
                        <el-input
                            size="small"
                            v-model="itemInp.value.node_params[itemInp.tag]"
                            v-if="itemInp.type === 'input-default2'"
                            :placeholder="itemInp.desc"
                        ></el-input>
                        <!-- 拆分输入框 -->
                        <el-input
                            size="small"
                            v-model="splitValue"
                            v-if="itemInp.type === 'split-input'"
                            :placeholder="itemInp.desc"
                        ></el-input>
                        <el-input
                            size="small"
                            v-model="itemInp.value.node_params[itemInp.tag]"
                            v-if="itemInp.type === 'input-default'"
                            :placeholder="itemInp.desc"
                        ></el-input>
                        <!-- 多行为本框 -->
                        <el-input
                            type="textarea"
                            :rows="6"
                            maxlength="200"
                            v-model="itemInp.value.node_params[itemInp.tag]"
                            v-if="itemInp.type === 'textarea'"
                            :placeholder="itemInp.desc"
                        ></el-input>
                        <p
                            v-if="itemInp.label === '分层采样比例'"
                            style="font-size:14px;line-height:28px;"
                        >
                            数字时：范围(0,1)
                            表示每个stratum的采样比例；字符串时：格式为strata0:r0,strata1:r1,strata2:r2,…
                        </p>
                        <el-input
                            size="small"
                            v-model="itemInp.value"
                            @change="searchSet(itemInp.value)"
                            v-if="itemInp.type === 'input'"
                            :placeholder="itemInp.desc"
                        ></el-input>
                        <el-select
                            v-if="itemInp.type === 'autoSelect'"
                            v-model="value"
                            filterable
                            remote
                            reserve-keyword
                            style="width: 100%"
                            placeholder="请输入关键词"
                            :remote-method="remoteMethod"
                            :loading="loading"
                        >
                            <el-option
                                @click.native="saveItem(item)"
                                v-for="item in options"
                                :key="item.id"
                                :label="item.data_name"
                                :value="item.id"
                            ></el-option>
                            <el-option
                                @click.native="saveItemHistory(item.content)"
                                v-for="item in options2"
                                :key="item.id"
                                :label="item.content"
                                :value="item.id"
                            ></el-option>
                        </el-select>

                        <div
                            v-if="itemInp.type === 'btn'"
                            class="select-btn select-hover"
                        >
                            <span
                                class="claer-icon"
                                @click="
                                    itemInp.value.node_params[itemInp.tag] = []
                                "
                            >
                                重置
                            </span>
                            <el-button
                                v-if="
                                    itemInp.value.node_params[itemInp.tag]
                                        .length !== 0
                                "
                                @click="openSelectHeader(index2, itemInp.tag)"
                            >
                                {{
                                    `已选择 ${
                                        itemInp.value.node_params[itemInp.tag]
                                            .length
                                    } 个字段`
                                }}
                            </el-button>
                            <ul
                                class="select-ul"
                                v-if="
                                    itemInp.value.node_params[itemInp.tag]
                                        .length !== 0
                                "
                            >
                                <li
                                    v-for="(item, index) in itemInp.value
                                        .node_params[itemInp.tag]"
                                    :key="index"
                                >
                                    {{ item }}
                                </li>
                            </ul>
                            <el-button
                                v-if="
                                    itemInp.value.node_params[itemInp.tag]
                                        .length === 0
                                "
                                @click="openSelectHeader(index2, itemInp.tag)"
                            >
                                {{ itemInp.label }}
                            </el-button>
                        </div>
                        <!-- <div v-if="itemInp.type==='btn-2'" class="select-btn select-hover">
                            <el-button v-if="itemInp.value.node_params.select_target_columes.length !== 0" @click="openSelectHeader(1)">{{`已选择 ${itemInp.value.node_params.select_target_columes.length} 个字段`}}</el-button>
                            <ul class="select-ul" v-if="itemInp.value.node_params.select_target_columes.length !== 0">
                                <li v-for="(item,index) in itemInp.value.node_params.select_target_columes" :key="index">{{item}}</li>
                            </ul>
                            <el-button v-if="itemInp.value.node_params.select_target_columes.length === 0" @click="openSelectHeader(1)">选择标签列</el-button>
                        </div> -->
                        <div v-if="itemInp.type === 'btn-3'" class="select-btn">
                            <el-button @click="openSelectDialog">
                                预测结果列名
                            </el-button>
                        </div>
                        <div v-if="itemInp.type === 'btn-4'" class="select-btn">
                            <el-button @click="openSelectDialog">
                                原始标签列名
                            </el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <div class="prop-btn-line" v-if="nodeData.length !== 0">
                <el-button
                    type="primary"
                    style="float:left; width: 80px;"
                    size="small"
                    @click="saveNodeParam"
                >
                    保存
                </el-button>
                <el-button type="primary" style="float:right;" size="small">
                    恢复默认设置
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { POST_SEARCH_SET, DATA_HISTORY } from '../assets/url';

export default {
    name: 'randomForest',
    props: ['nodeData', 'nodeTile', 'componentId'],
    data() {
        return {
            currentPage: 0,
            formData: {},
            historyList: [], // 历史记录
            options2: [], // 历史记录展示
            options: [],
            value: [],
            list: [],
            load_data: {
                node_params: {}
            },
            loading: false,
            splitValue: '',
            optionTransform: {
                zscore_soften: {
                    lable: ['置信范围', '置信范围2'],
                    value: [3, 3]
                },
                percentage_soften: {
                    lable: ['百分位下限', '百分位上限'],
                    value: [0, 100]
                },
                threshold_soften: {
                    lable: ['阈值下限', '阈值下限上限'],
                    value: [0, 1]
                },
                boxplot_soften: {
                    lable: ['百分位下限', '百分位上限'],
                    value: [0, 100]
                }
            }
        };
    },
    watch: {
        nodeData(val) {
            // 当前节点是数据集的时候
            this.initData();
            // 默认显示O
            this.currentPage = 0;
            console.log('当前节点的nodeData', val);
            // 当前节点是拆分时
        }
    },
    methods: {
        initData() {
            switch (this.componentId) {
                case 'load_data':
                    if (this.nodeData[0].data[0].value.value) {
                        this.options = [this.nodeData[0].data[0].value.value];
                        this.value = this.nodeData[0].data[0].value.value.id;
                    }
                    break;
                case 'split_datasets':
                    console.log('split_datasets');
                    this.splitValue = this.nodeData[0].data[0].value.node_params.split_prop;
                    break;
                case 'cla_knn':
                    console.log('选择KNN');
                    this.splitValue = this.nodeData[1].data[0].value.node_params.n_neighbors;
                    break;
                case 'reg_knn':
                    console.log('选择KNN');
                    this.splitValue = this.nodeData[1].data[0].value.node_params.n_neighbors;
                    break;
                case 'soften_feature':
                    this.transformFuc();
                    break;
            }
        },
        transformFuc(type) {
            // 判断是否为特征异常平滑
            // 根据当前选项 动态渲染参数值
            let str = this.nodeData[1].data[0].value.node_params.soften_method;
            let label1 = this.optionTransform[str].lable[0];
            let label2 = this.optionTransform[str].lable[1];
            // label 重新赋值
            this.nodeData[1].data[1].label = label1;
            this.nodeData[1].data[2].label = label2;
            // 默认值重新赋值
            let val1 = this.optionTransform[str].value[0];
            let val2 = this.optionTransform[str].value[1];
            if (type === 'change') {
                this.nodeData[1].data[1].value.node_params.para1 = val1;
                this.nodeData[1].data[2].value.node_params.para2 = val2;
            } else {
                this.nodeData[1].data[1].value.node_params.para1 =
                    this.nodeData[1].data[1].value.node_params.para1 !== ''
                        ? this.nodeData[1].data[1].value.node_params.para1
                        : val1;
                this.nodeData[1].data[2].value.node_params.para2 =
                    this.nodeData[1].data[2].value.node_params.para2 !== ''
                        ? this.nodeData[1].data[2].value.node_params.para2
                        : val2;
            }
            // 去除掉 重复的值
            if (str === 'zscore_soften') {
                this.nodeData[1].data[2].value.node_params.para2 = '';
            }
        },
        // 数据集历史存储
        dataHistorySave(str) {
            this.$api
                .post(DATA_HISTORY, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    history_name: 'data_set',
                    content: str
                })
                .then(res => {
                    console.log('打印数据集', res);
                });
        },
        // 数据集历史获取
        dataHistoryGet() {
            this.$api
                .get(DATA_HISTORY, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    history_name: 'data_set'
                })
                .then(res => {
                    // 取前五条历史记录
                    this.historyList = res.data.history_list.slice(0, 4);
                    this.options2 = this.historyList;
                });
        },
        saveItem(item) {
            console.log('我要看看这是什么', item);
            // 数据集模糊匹配存储
            let arr = item.data_path.split('/');
            this.load_data.node_params.csv_name = arr[arr.length - 1];
            this.load_data.node_params.download_path =
                this.globalUlr + item.data_path;
            this.load_data.node_params.data_name = item.data_name;
            // 两次数据集ID不一致的时候调用
            if (
                this.load_data.node_params.set_id &&
                this.load_data.node_params.set_id !== item.id
            ) {
                // 置空数据集关联的数据
                this.$emit('clearLink');
            }
            this.load_data.node_params.set_id = item.id;
            this.load_data.value = item;
            this.$store.commit('changeSetId', item.id);
            this.dataHistorySave(item.data_name);
        },
        saveItemHistory(content) {
            this.$api
                .post(POST_SEARCH_SET, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    data_set_name: content
                })
                .then(res => {
                    this.saveItem(res.data.search_set[0]);
                });
        },
        saveNodeParam() {
            // 将参数 存入节点
            switch (this.componentId) {
                case 'load_data':
                    this.$emit('updateNodeParam', this.load_data, 0, 0);
                    break;
                case 'split_datasets':
                    this.load_data.node_params.split_prop = this.splitValue;
                    this.$emit('updateNodeParam', this.load_data, 0, 0);
                    break;
                case 'cla_knn':
                    this.load_data.node_params.n_neighbors = this.splitValue;
                    this.$emit('updateNodeParam', this.load_data, 1, 0);
                    break;
                case 'reg_knn':
                    this.load_data.node_params.n_neighbors = this.splitValue;
                    this.$emit('updateNodeParam', this.load_data, 1, 0);
                    break;
            }
            this.$message.success('保存成功');
            // 节点保存一下
            this.$emit('saveNode');
        },
        openSelectDialog() {
            this.$parent.showSelectDialog = true;
        },
        openSelectHeader(num, keyStr) {
            console.log('%%%%%%%%%%%%%', num, keyStr);
            // 打开父页面 选择特征列的弹框
            this.$store.commit(
                'changeSelectDate',
                this.nodeData[0].data[num].value.node_params[keyStr]
            );
            this.$store.commit('changeSelectNum', keyStr);
            this.$parent.showSelectDialog = true;
        },
        remoteMethod(query) {
            if (query !== '') {
                // 历史记录清空
                this.options2 = [];
                this.loading = true;
                this.searchSet(query);
                setTimeout(() => {
                    this.loading = false;
                    // this.options = this.list.filter(item => {
                    //     return item.label.toLowerCase()
                    //         .indexOf(query.toLowerCase()) > -1;
                    // });
                }, 200);
            } else {
                // 显示历史记录
                this.options2 = this.historyList;
                this.options = [];
            }
        },
        // 获取数据集的信息
        searchSet(val) {
            console.log('当前值', val);
            this.$api
                .post(POST_SEARCH_SET, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    data_set_name: val
                })
                .then(res => {
                    this.options = res.data.search_set;
                    console.log('打印数据集', res);
                });
        }
    },
    mounted() {
        this.initData();
        this.dataHistoryGet();
    }
};
</script>

<style scoped lang="scss">
.claer-icon {
    position: absolute;
    top: -40px;
    right: 0;
}
.select-hover {
    position: relative;
}
.select-hover .select-ul {
    display: none;
}
.select-hover:hover .select-ul {
    display: block;
}
.select-ul:after {
    content: '';
    display: block;
    border-top: 10px solid transparent;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    border-bottom: 10px solid #16191d;
    box-sizing: content-box;
    width: 0;
    height: 0;
    z-index: 10;
    position: absolute;
    top: -18px;
    left: 125px;
}
.select-ul {
    list-style: none;
    margin: 0;
    background: #16191d;
    padding: 10px 20px;
    width: 260px;
    box-sizing: border-box;
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 10;
    li {
        line-height: 30px;
    }
}
.prop-tab {
    list-style: none;
    clear: both;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid #1b1b1b;
    height: 36px;
    display: flex;
    li {
        flex: 1;
        font-size: 13px;
        color: #7d7d7d;
        text-align: center;
        line-height: 36px;
        background-color: #22242b;
        cursor: pointer;
    }
    li.active {
        // background-color: #292c36;
        color: #fff;

        span {
            line-height: 36px;
            display: inline-block;
            border-bottom: 2px solid #fff;
            padding: 0 10px;
        }
    }
}
.prop-btn-line {
    text-align: center;
}
.prop-body {
    padding: 10px 20px;
    box-sizing: border-box;
    max-height: 800px;
    overflow-y: auto;
}
.select-btn {
    width: 100%;
    display: inline-block !important;
}
</style>
<style>
.random-box .el-form-item__label {
    color: #ffffff;
}
.select-btn .el-button {
    width: 100%;
    padding: 8px 20px;
    background: #16191d;
    color: #fff;
    border: 1px solid #16191d;
}
</style>
