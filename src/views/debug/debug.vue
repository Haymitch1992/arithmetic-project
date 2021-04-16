<template>
    <div class="bg">
        <div class="online-box">
            <div class="back-line" @click="goDetail()">
                <span class="el-icon-arrow-left"></span>
                在线调试
            </div>
            <div>
                <div class="debug-left">
                    <h3>在线调试请求参数</h3>
                    <div class="options-box">
                        <div class="btn-line">
                            <el-button
                                type="primary"
                                size="small"
                                @click="dialogTableVisible = true"
                            >
                                状态码查询
                            </el-button>
                            <el-button
                                type="primary"
                                size="small"
                                @click="postDebug"
                            >
                                调试
                            </el-button>
                        </div>
                        <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="debugOptions"
                            rows="10"
                        ></el-input>
                        <!-- <editor
                            v-model="debugOptions"
                            lang="html"
                            height="500"
                            @init="initEditor"
                        ></editor> -->
                    </div>
                </div>
                <div class="debug-right">
                    <h3>调试信息</h3>
                    <div class="info-box">
                        <pre>{{ text }}</pre>
                    </div>
                </div>
            </div>
            <el-dialog title="状态码查询" :visible.sync="dialogTableVisible">
                <el-table border :data="tableData">
                    <el-table-column
                        property="value"
                        label="状态码"
                        width="150"
                    ></el-table-column>
                    <el-table-column
                        property="label"
                        label="描述信息"
                    ></el-table-column>
                </el-table>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {
    POST_MODE_ONLINE,
    POST_MODEL_DATA,
    POST_DEPLOY_TEST,
    POST_DEPLOY_DEBUG,
    GET_GAIN_NODE_PARAM
} from '../../assets/url';

import $axios from 'axios';
export default {
    name: 'home',
    components: {
        editor: require('vue2-ace-editor')
    },

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
    data() {
        return {
            debugOptions:
                '{"columns": ["Sepal_Length","Sepal_Width","Petal_Length","Petal_Width"],"data": [[1,2,3,4]]}', // 上传的参数
            dialogTableVisible: false, // 状态码查询弹框
            text: {},
            params: [0, 0, 0, 0], // 上传的参数
            tableData: [
                {
                    value: 200,
                    label: '请求成功'
                },
                {
                    value: 400,
                    label: '缺少信息请检查请求头、参数'
                },
                {
                    value: 401,
                    label: '请求路劲非法'
                },
                {
                    value: 404,
                    label: '未得知请求域名'
                },
                {
                    value: 405,
                    label: 'Token值未查到'
                },
                {
                    value: 500,
                    label: '参数不正确'
                },
                {
                    value: 504,
                    label: '后端请求超时'
                }
            ],
            host: '',
            port: '',
            optionsList: [],
            jsonEditor: JSON.stringify('[1,2,3,4]'),
            options: {
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: true /* 自动补全 */
            }
        };
    },
    mounted() {
        this.getDebugOption();
    },
    methods: {
        getDebugOption() {
            this.optionsList = [];
            this.$api
                .get(GET_GAIN_NODE_PARAM, {
                    run_uuid: this.$store.state.run_uuid
                })
                .then(res => {
                    this.host = res.data.host;
                    this.port = res.data.port;
                    let obj = JSON.parse(res.data.run_parameter);
                    let arr = obj.select_features_columns.split(',');
                    arr.forEach(element => {
                        this.optionsList.push({
                            name: element,
                            value: 0
                        });
                    });
                });
        },
        postDebug(item) {
            // POST_DEPLOY_DEBUG
            this.$api
                .post(POST_DEPLOY_DEBUG, {
                    model_only_name: this.$route.params.obj.model_only_name,
                    model_version: this.$route.params.obj.model_version,
                    data_user_id: localStorage.getItem('data_user_id'),
                    parameter: this.debugOptions
                    // user_name: 'uesr1',
                    // experiment_name: item.model_test_name,
                    // request_url: this.this.globalUlr,
                    // model_path: item.model_path,
                    // artifact_path: item.artifact_path,
                    // data_model_id: item.id,
                    // data_model_name: item.model_name
                })
                .then(res => {
                    this.text = res.data;
                });
        },
        debug() {
            let obj = {};
            let columns = [];
            let arr = [];
            // 获取节点参数
            this.optionsList.forEach(element => {
                columns.push(element.name);
                arr.push(element.value);
            });
            obj.columns = columns;
            obj.data = [arr];
            $axios({
                url: POST_DEPLOY_TEST,
                method: 'post',
                data: JSON.stringify(obj),
                // data:
                //     '{"columns":["feature_1","feature_2","feature_3","feature_4","feature_5","feature_6","feature_7","feature_8","feature_9","feature_10"],"data":[[0,0,0,0,0,0,0,0,0,0]]}',
                headers: {
                    'content-type': 'application/json'
                },
                responseType: 'json'
            }).then(res => {
                this.text = res;
                console.log(res);
            });
        },
        editorInit: function(editor) {
            // 右侧JSON相关可以忽略
            require('brace/ext/language_tools'); // language extension prerequsite...
            require('brace/mode/html');
            require('brace/mode/javascript'); // language
            require('brace/mode/less');
            require('brace/theme/chrome');
            require('brace/snippets/javascript'); // snippet
            require('brace/mode/json');
            require('brace/theme/tomorrow');
        },
        goDetail() {
            this.$router.push('/online');
        }
    }
};
</script>

<style scoped lang="scss">
.bg {
    padding: 20px;
}
.online-box {
    height: calc(100vh - 100px);
    background-color: #fff;
    border-top-left-radius: 50px;
    padding: 20px 30px;
    box-sizing: border-box;
    .pagination-line {
        background-color: #fff;
        padding: 20px 20px 10px;
        text-align: right;
    }
    .back-line {
        font-size: 16px;
        color: #333;
        line-height: 40px;
    }
    .btn-line {
        padding: 4px 0 16px;
    }
    h3 {
        color: #333;
        font-size: 14px;
        margin: 0;
        padding: 0 0 10px 6px;
    }
    p {
        padding: 0;
        margin: 0;
    }
    .debug-left {
        width: 54%;
        float: left;
        .options-box {
            height: calc(100vh - 260px);
            border: 1px solid #ddd;
            padding: 10px 14px 14px;
            box-sizing: border-box;
            border-radius: 6px;
            .form-box {
                padding: 20px 200px 0 20px;
            }
            p {
                line-height: 40px;
                font-size: 14px;
            }
        }
        .json-editor {
            margin-top: 16px;
            /*width: 100% !important;*/
            height: calc(100vh - 460px) !important;
        }
    }
    .debug-right {
        width: 45%;
        float: right;
        .info-box {
            background: #333;
            height: calc(100vh - 260px);
            border-radius: 6px;
            box-sizing: border-box;
            padding: 20px;
            color: #fff;
        }
    }
}
</style>
<style>
.online-box .ace-chrome .ace_print-margin {
    background-color: #fff;
}
.online-box .cell {
    padding: 6px 10px;
}
</style>
