<template>
    <div>
        <div class="title">实验属性</div>
        <div class="right-content">
            <p class="form-text">项目名称</p>
            <p class="form-value">转辙机故障诊断</p>
            <p class="form-text">创建时间</p>
            <p class="form-value">2020-06-30 15:30:00</p>
            <p class="form-text">描述</p>
            <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="textarea"
                    :rows="6"
                    maxlength="200"
                    show-word-limit>
            </el-input>
        </div>
    </div>
</template>

<script>
    export default {
        name: "experimentAttribute",
        data() {
            return {
                textarea: ''
            };
        }
    };
</script>

<style scoped lang="scss">
    .title {
        font-size: 14px;
        line-height: 40px;
        border-bottom: 1px solid #ddd;
        text-align: center;
    }
    .right-content{
        padding: 10px 20px;
        .form-text{
            font-size: 14px;
            color: #333;
            font-weight: bold;
            margin: 10px 0;
        }
        .form-value{
            font-size: 13px;
            color: #666;
            padding-bottom: 14px;
            margin: 10px 0;
        }
    }
</style>
