<template>
    <div class="bg">
        <div class="personal-box">
            <div class="personal-img-line">
                <img src="../../assets/img/person.jpg" alt="" class="personal-img">
            </div>
            <div>
                <ul class="personal-info">
                    <li>
                        <span class="personal-label">邮箱</span>
                        <span  class="personal-value" >{{formData.email.value}}</span>
                        <i style="visibility: hidden" :class="!formData.userName.canEdit?'el-icon-s-promotion':'el-icon-edit'" @click="formData.userName.canEdit=!formData.userName.canEdit"></i>
                    </li>
                    <li>
                        <span class="personal-label">用户名</span>
                        <span  class="personal-value" v-if="formData.userName.canEdit">{{formData.userName.value}}</span>
                        <span class="personal-value" v-if="!formData.userName.canEdit">
                            <el-input v-model="formData.userName.value" @blur="savePersonalInfo"></el-input>
                        </span>
                        <i  :class="!formData.userName.canEdit?'el-icon-s-promotion':'el-icon-edit'" @click="formData.userName.canEdit=!formData.userName.canEdit"></i>
                    </li>
                    <li>
                        <span class="personal-label">电话</span>
                        <span  class="personal-value" v-if="formData.telNumber.canEdit">{{formData.telNumber.value}}</span>
                        <span class="personal-value" v-if="!formData.telNumber.canEdit">
                            <el-input v-model="formData.telNumber.value" @blur="savePersonalInfo"></el-input>
                        </span>
                        <i  :class="!formData.telNumber.canEdit?'el-icon-s-promotion':'el-icon-edit'" @click="formData.telNumber.canEdit=!formData.telNumber.canEdit"></i>
                    </li>
                    <li>
                        <span class="personal-label">所属公司</span>
                        <span  class="personal-value" v-if="formData.company.canEdit">{{formData.company.value}}</span>
                        <span class="personal-value" v-if="!formData.company.canEdit">
                            <el-input v-model="formData.company.value" @blur="savePersonalInfo"></el-input>
                        </span>
                        <i  :class="!formData.company.canEdit?'el-icon-s-promotion':'el-icon-edit'" @click="formData.company.canEdit=!formData.company.canEdit"></i>
                    </li>
                    <li>
                        <span class="personal-label">所在地区</span>
                        <span  class="personal-value" v-if="formData.address.canEdit">{{formData.address.value}}</span>
                        <span class="personal-value" v-if="!formData.address.canEdit">
                            <el-input v-model="formData.address.value" @blur="savePersonalInfo"></el-input>
                        </span>
                        <i  :class="!formData.address.canEdit?'el-icon-s-promotion':'el-icon-edit'" @click="formData.address.canEdit=!formData.address.canEdit"></i>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { GET_PERSONAL_INFO, POST_PERSONAL_INFO } from '../../assets/url';

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
    data() {
        return {
            formData: {
                email: {
                    value: '',
                    canEdit: true
                },
                userName: {
                    value: '',
                    canEdit: true
                },
                telNumber: {
                    value: '',
                    canEdit: true
                },
                company: {
                    value: '',
                    canEdit: true
                },
                address: {
                    value: '',
                    canEdit: true
                }
            }
        };
    },
    methods: {
        getPersonalInfo() {
            this.$api
                .get(GET_PERSONAL_INFO, {
                    data_user_id: localStorage.getItem('data_user_id')
                })
                .then(res => {
                    console.log(res);
                    if (res.data.code === 200) {
                        this.formData.email.value = res.data.data_user_email;
                        this.formData.userName.value = res.data.data_user_name;
                        this.formData.telNumber.value = res.data.data_user_phone;
                        this.formData.company.value = res.data.data_user_company;
                        this.formData.address.value = res.data.data_user_home;
                    }
                });
        },
        savePersonalInfo() {
            this.$api
                .post(POST_PERSONAL_INFO, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    data_user_name: this.formData.userName.value,
                    data_user_phone: this.formData.telNumber.value,
                    data_user_company: this.formData.company.value,
                    data_user_home: this.formData.address.value
                })
                .then(res => {
                    console.log(res);
                    if (res.data.code === 200) {
                        this.getPersonalInfo();
                    }
                });
        }
    },
    mounted() {
        this.getPersonalInfo();
    }
};
</script>

<style scoped lang="scss">
.bg {
    box-sizing: border-box;
    height: 100vh;
    width: 100%;
    overflow: hidden;
}
.personal-box {
    width: 100%;
}
.personal-img-line {
    background: #f7f7f8;
    text-align: center;
    padding: 60px 0;
    .personal-img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: block;
        background: #fff;
        margin: 0 auto;
    }
}
.personal-info {
    list-style: none;
    margin: 0;
    padding: 50px 0 0 0;
    color: #666;
    background: #ffffff;
    width: 100%;
    height: calc(100vh - 240px);
    li {
        line-height: 50px;
        text-align: center;
        font-size: 14px;
        i {
            cursor: pointer;
        }
    }
    .personal-label {
        display: inline-block;
        width: 100px;
        text-align: left;
    }
    .personal-value {
        display: inline-block;
        width: 300px;
        text-align: left;
        margin-right: 10px;
    }
}
</style>
