<template>
    <div class="bg">
        <div class="login-box">
            <div class="login-img">
                <img src="../../assets/img/login-1.jpg" alt="">
            </div>
            <div class="login-container">
                <h2 class="login-title">算法中台</h2>
                <span class="register-label">忘记密码</span>
                <el-form ref="form" :model="form" :rules="rules">
                    <el-form-item prop="user_email">
                        <el-input
                                v-model="form.user_email" placeholder="邮箱"></el-input>
                    </el-form-item>
                    <el-form-item prop="auth_code" >
                        <el-input
                                v-model="form.auth_code" placeholder="输入验证码" style="width: 230px;margin-right: 10px;"></el-input>
                        <el-button
                                type="primary"
                                style="width: 144px;"
                                :disabled="!canClick"
                                plain @click="checkEmail('form')">{{!canClick ? countNumber : "发送验证码"}}</el-button>
                    </el-form-item>
                    <el-form-item  prop="user_password">
                        <el-input
                                type="password"
                                show-password
                                v-model="form.user_password" placeholder="新密码6-16位密码区分大小写"></el-input>
                    </el-form-item>
                    <el-form-item  prop="user_password_repetition">
                        <el-input
                                type="password"
                                show-password
                                v-model="form.user_password_repetition" placeholder="确认密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="width: 180px;" type="primary" @click="checkData('form')">提交</el-button>
                        <el-button type="text" style="float: right;" @click.native="$router.push('/login')">使用已有账户登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <p class="copyright">copyright © 2020交控科技股份有限公司 & 算法中台</p>
    </div>
</template>

<script>
    import axios from "axios";
    import {GET_EMAIL_VERIFY, POST_EMAIL_VERIFY, POST_REGISTER_DATA, POST_RESET_PASSWORD} from "../../assets/url";
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
            let validatePass2 = (rule, value, callback) => {
                if (value !== this.form.user_password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            }
            let validateEmail = (rule, value, callback) => {
                let reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的邮箱地址!'));
                } else {
                    callback();
                }
            }
            return {
                canClick: true,
                timer: '',
                countNumber: 60,
                form: {
                    user_name: '',
                    auth_code: '',
                    user_email: '', // 邮箱
                    user_password: '',
                    user_password_repetition: ''
                },
                rules: {
                    user_name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    auth_code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        { min: 4, max: 6, message: '长度在 4 到 6 个字符', trigger: 'blur' }
                    ],
                    user_email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        {validator: validateEmail, trigger: 'blur'}
                    ],
                    user_password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ],
                    user_password_repetition: [
                        { required: true, message: '请输入确认密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
                        {validator: validatePass2, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
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
            checkEmail (formName) {
                this.$refs[formName].validateField('user_email', emailError => {
                    if (!emailError) {
                        this.sendEmail()
                    } else {
                        return false;
                    }
                });
            },
            sendEmail() {
                this.$api.get(GET_EMAIL_VERIFY, {
                    user_email: this.form.user_email
                }).then((res) => {
                    if (res.data.code === 200) {
                        // 启动60秒倒计时
                        this.canClick = false
                        this.timer = setInterval(() => {
                            this.countNumber--
                            if (this.countNumber < 0) {
                                clearInterval(this.timer)
                                this.countNumber = 60
                                this.timer = ''
                                this.canClick = true
                            }
                        }, 1000)
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.mes
                        })
                    }
                })
            },
            onSubmit() {
                this.$api.post(POST_RESET_PASSWORD, {
                    user_email: this.form.user_email,
                    auth_code: this.form.auth_code,
                    user_password: this.form.user_password
                }).then((res) => {
                    console.log(res)
                    if (res.data.code === 200) {
                        this.$router.push('/login')
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
            height: 400px;
            box-sizing: border-box;
            padding: 20px 70px;
            .login-title{
                text-align: center;
                font-size: 28px;
                font-weight: normal;
                padding: 50px 0 20px;
                margin-top: 0;
                margin-bottom: 10px;
            }
            .register-label{
                display: block;
                padding-bottom: 20px;
                font-weight: bold;
            }
        }
    }
</style>
