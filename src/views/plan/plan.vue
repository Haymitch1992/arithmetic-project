<template>
    <div class="bg">
        <div class="plan-box">
            <div class="search-line">
                <el-input
                    size="small"
                    placeholder="搜索模板"
                    v-model="modelKeyWord"
                    class="search-inp"
                ></el-input>
                <el-button
                    size="small"
                    type="primary"
                    @click.native="searchModel"
                >
                    搜索
                </el-button>
            </div>
            <el-dialog title="创建实验" :visible.sync="dialogFormVisible">
                <el-form>
                    <el-form-item label="实验名称">
                        <el-input
                            v-model="form.test_name"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="实验描述">
                        <el-input
                            v-model="form.test_content"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">
                        取 消
                    </el-button>
                    <el-button type="primary" @click="createTest">
                        确 定
                    </el-button>
                </div>
            </el-dialog>
            <div>
                <div class="plan-ul ">
                    <div
                        class="plan-li"
                        v-for="(item, index) in all_project"
                        v-bind:key="index"
                    >
                        <h3>{{ item.template_name }}</h3>
                        <div class="img-content">
                            <img :src="imgList[index]" alt="" />
                        </div>
                        <div class="btn-box">
                            <el-button
                                type="primary"
                                size="small"
                                style="width: 44%"
                                @click="createModel(item)"
                            >
                                从模板创建
                            </el-button>
                            <el-button
                                size="small"
                                style="width: 44%"
                                @click="viewTemplate(item)"
                            >
                                查看文档
                            </el-button>
                        </div>
                    </div>
                    <div class="plan-li">
                        <h3>安全帽识别</h3>
                        <div class="img-content">
                            <img
                                src="../../../src/assets/img/item-1.jpg"
                                alt=""
                            />
                        </div>
                        <div class="btn-box">
                            <el-button
                                type="primary"
                                size="small"
                                style="width: 44%"
                                @click="goDevice()"
                            >
                                查看示例
                            </el-button>
                            <el-button
                                size="small"
                                style="width: 44%"
                                @click="viewTemplate()"
                            >
                                查看文档
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                class="dialog-box"
                width="30%"
                :before-close="handleClose"
            >
                <p v-html="htmlText"></p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">
                        确 定
                    </el-button>
                </span>
            </el-dialog>
            <!--创建实验-->
            <el-dialog
                title="创建实验"
                :visible.sync="dialogFormVisible2"
                :close-on-click-modal="false"
                class="create-test"
            >
                <el-form>
                    <el-form-item label="实验名称">
                        <el-input
                            v-model="form.test_name"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="实验描述">
                        <el-input
                            v-model="form.test_content"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeDialog">取 消</el-button>
                    <el-button type="primary" @click="editeTest">
                        确 定
                    </el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {
    CREATE_TEST,
    GET_ALL_MODEL_TEMPLATE,
    POST_SEARCH_MODEL,
    POST_CREATE_MODEL
} from '../../assets/url';
import axios from 'axios';
export default {
    name: 'home',
    data() {
        return {
            data_project_id: localStorage.getItem('data_project_id'),
            randomNum: '',
            modelKeyWord: '',
            dialogFormVisible: false,
            dialogFormVisible2: false,
            dialogVisible: false,
            imgList: [],
            all_project: [],
            data_template_id: '',
            htmlText: {},
            form: {
                test_name: '',
                test_content: ''
            }
        };
    },
    methods: {
        goDevice() {
            this.$router.push('/deviceManagement');
        },
        closeDialog() {
            this.form.test_name = '';
            this.form.test_content = '';
            this.dialogFormVisible2 = false;
        },
        searchModel() {
            this.$api
                .get(POST_SEARCH_MODEL, {
                    keyword: this.modelKeyWord
                })
                .then(res => {
                    this.all_project = res.data.search_template;
                    console.log(res);
                });
        },
        createModel(obj) {
            this.dialogFormVisible2 = true;
            this.data_template_id = obj.id;
        },
        editeTest() {
            // 增加实验名称 实验描述
            this.$api
                .post(POST_CREATE_MODEL, {
                    test_name: this.form.test_name,
                    test_content: this.form.test_content,
                    test_project_id: this.data_project_id,
                    test_template_id: this.data_template_id
                })
                .then(res => {
                    this.allTest();
                    if (res.data.code === 200) {
                        this.$message.success(res.data.mes);
                    } else {
                        this.$message.error(res.data.mes);
                    }
                    this.dialogFormVisible2 = false;
                });
        },
        handleClose() {
            this.dialogVisible = false;
        },
        viewTemplate(obj) {
            this.htmlText = obj.template_info;
            this.dialogVisible = true;
        },
        createTest() {
            this.$api
                .post(CREATE_TEST, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    test_project_id: this.data_project_id,
                    test_name: this.form.test_name,
                    test_content: this.form.test_content
                })
                .then(res => {
                    this.allTest();
                    this.dialogFormVisible = false;
                });
        },
        allTest() {
            // 获取实验列表
            this.$api.get(GET_ALL_MODEL_TEMPLATE).then(res => {
                this.all_project = res.data.all_model_template;
            });
        },
        createArr() {
            for (var i = 0; i < 10; i++) {
                var img = require('../../../src/assets/img/item-' +
                    this.randomNum +
                    '.jpg');
                this.imgList.push(img);
                if (this.randomNum < 20) {
                    this.randomNum++;
                } else {
                    this.randomNum = 1;
                }
            }
        }
    },
    mounted() {
        this.randomNum = parseInt(Math.random() * (20 - 1 + 1) + 1, 10);
        console.log(this.randomNum);
        this.createArr();
        this.allTest();
    }
};
</script>

<style scoped lang="scss">
.search-line {
    padding: 20px 6px;
}
.search-inp {
    width: 400px;
}
.plan-box {
    height: calc(100vh - 80px);
    background-color: #292c36;
    padding: 20px 30px;
    box-sizing: border-box;
    .plan-ul {
        display: flex;
        flex-shrink: 5;
        flex-flow: wrap;
        justify-content: left;
    }
    .plan-li {
        width: 17%;
        box-sizing: border-box;
        box-shadow: 0px 2px 7px #16171a;
        margin-bottom: 20px;
        border-radius: 4px;
        padding: 10px;
        margin-right: 10px;
        margin-left: 10px;
        background: #3a404c;
        h3 {
            margin: 0;
            line-height: 30px;
            padding-bottom: 4px;
            font-size: 14px;
            color: #fff;
        }
        .img-content {
            width: 100%;

            img {
                width: 100%;
                border-radius: 4px;
            }
        }
        .btn-box {
            text-align: center;
            padding: 10px 0;
        }
    }
}
</style>
<style>
.el-dialog {
    width: 600px;
}
.dialog-box table {
    border-collapse: collapse;
    border-spacing: 0px;
}
.dialog-box td {
    border: 1px solid #ddd !important;
    padding: 10px 4px;
}
</style>
