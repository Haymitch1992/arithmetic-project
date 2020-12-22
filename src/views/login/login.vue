<template>
    <div class="bg">
        <div class="login-box">
            <div class="login-img">
                <img src="../../assets/img/login-1.jpg" alt="">
            </div>
            <div class="login-container">
                <h2 class="login-title">算法中台</h2>
                <el-form ref="form" :model="form" :rules="rules" >
                    <el-form-item prop="data_user_name">
                        <el-input
                                prefix-icon="el-icon-user-solid"

                                v-model="form.data_user_name" placeholder="邮箱/用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="data_user_password">
                        <el-input
                                prefix-icon="el-icon-lock"
                                type="password"
                                v-model="form.data_user_password" placeholder="密码" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="width: 100%;" type="primary" @click="checkData('form')">登录</el-button>
                    </el-form-item>
                </el-form>
                <div>
                    <el-button type="text" @click.native="$router.push('/forget')">忘记密码</el-button>
                    <el-button type="text" style="float: right;" @click.native="$router.push('/register')">注册账户</el-button>
                </div>
            </div>
        </div>
        <p class="copyright">copyright © 2020交控科技股份有限公司 & 算法中台</p>
        <div class="slide-bg" v-show="slideShow">
            <div class="slide-box">
                <div style="text-align: right;padding-bottom: 10px">
                    <el-button @click.native="slideShow =fasle;">关闭</el-button>
                </div>

                <slide-verify :l="42"
                              :r="10"
                              :w="310"
                              :h="155"
                              ref="slideblock"
                              slider-text="向右滑动"
                              @success="onSuccess"
                              @fail="onFail"
                              @refresh="onRefresh"
                ></slide-verify>
                <div class="slide-text">{{msg}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import {POST_LOGIN_DATA} from "../../assets/url";
    export default {
        name: "home",
        filters: {
            modelStatusZn (val) {
                switch (val) {
                    case 0:
                        return '未开始'
                    case 1:
                        return '进行中'
                    case 2:
                        return '已完成'
                    case 3:
                        return '失败'
                    case 4:
                        return '已停止'
                }
            }
        },
        data () {
            return {
                msg: '',
                slideShow: false,
                slideCheck: false,
                form: {
                    data_user_name: 'wangzhiwei3306@163.com',
                    data_user_password: 'wzw54180'
                },
                rules: {
                    data_user_name: [
                        { required: true, message: '请输入邮箱/用户名', trigger: 'blur' }
                    ],
                    data_user_password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            onSuccess() {
                this.slideCheck = true
                this.slideShow = false
                this.msg = '验证通过'
                this.onSubmit()
            },
            onFail() {
                this.msg = '验证未通过'
            },
            onRefresh() {
                this.msg = ''
            },
            checkData(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.onSubmit()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            onSubmit() {
                if (!this.slideCheck) {
                    this.slideShow = true
                    return
                }
                this.$api.post(POST_LOGIN_DATA, {
                    data_user_name: this.form.data_user_name,
                    data_user_password: this.form.data_user_password
                }).then((res) => {
                    console.log(res)
                    if (res.data.code === 200) {
                        localStorage.setItem('data_user_id', res.data.data_user_id);
                        localStorage.setItem('data_user_token', res.data.data_user_token)
                        this.$store.commit('changeUserName', res.data.data_user_name)
                        this.$store.commit('changeUserEmail', res.data.data_user_email)
                        this.$router.push('/dataManagement')
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.mes
                        });
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .bg{
        height: 100vh;
        width: 100%;
        border-top: 1px solid transparent;
        background: url("../../assets/img/bg.png") repeat 0px 0px;
        background-size: 100%;
        box-sizing: border-box;
    }
    .copyright{
        position: fixed;
        bottom: 14px;
        width: 100%;
        font-size: 12px;
        text-align: center;
        color: rgba(0,0,0,.45);
        line-height: 40px;
        font-weight: 400;
        font-family: "Dosis", Arial, Helvetica, sans-serif;
    }
    .login-box{
        width: 1120px;
        height: 570px;
        position: absolute;
        left: calc(50% - 560px);
        top: calc(50% - 285px);
        background: #fff;
        box-shadow: 2px 4px 12px #C5D2DF;
        border-radius: 18px;
        overflow: hidden;
        .login-img{
            width: 570px;
            display: inline-block;
            vertical-align: top;
            height: 400px;
            box-sizing: border-box;
            img{
                display: block;
                width: 100%;
                border-radius: 18px;
            }
        }
        .login-container{
            width: 530px;
            vertical-align: top;
            display: inline-block;
            height: 500px;
            box-sizing: border-box;
            padding: 20px 70px;
            .login-title{
                text-align: center;
                font-size: 28px;
                font-weight: normal;
                padding: 93px 0 30px;
                margin-top: 0;
            }
        }
    }
    .slide-bg{
        position: fixed;
        background: rgba(0,0,0,.5);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .slide-box{
        background: #fff;
        position: absolute;
        width: 312px;
        padding: 10px;
        height: 320px;
        border-radius: 6px;
        top: calc(50% - 160px);
        left: calc(50% - 156px);
        .slide-text{
            text-align: center;
            padding-top: 20px;
        }
    }
</style>
