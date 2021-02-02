<!-- 实验属性 -->
<template>
    <div>
        <ul class="prop-tab ">
            <li>
                实验属性
            </li>
        </ul>
        <div class="prop-body">
            <p>项目名称</p>
            <p class="price">
                <el-input v-model="currentTest.test_name" @blur="submitForm()"></el-input>
            <p>创建时间</p>
            <p class="price">{{currentTest.create_time | converTime('YYYY-MM-DD HH:mm:ss')}}</p>
            <p>描述</p>
            <el-input
                    type="textarea"
                    @blur="submitForm()"
                    :autosize="{ minRows: 6, maxRows: 8}"
                    v-model="currentTest.test_content">
            </el-input>
            <el-button class="del-btn" type="primary" @click="deleteItem()">删除</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'randomForest',
    props: ['nodeData', 'currentTest'],
    data() {
        return {
            currentPage: 0,
            formData: {},
            textarea2: ''
        };
    },
    mounted() {},
    methods: {
        submitForm() {
            this.$emit('saveChange');
        },
        deleteItem() {
            // 二次确认是否删除
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$emit('delelteNode');
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        }
    }
};
</script>

<style scoped lang="scss">
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
        color: #333;
        text-align: center;
        line-height: 36px;
        background: #292c36;
        color: #fff;
        cursor: pointer;
    }
    li.active {
        background-color: #f5f5f5;
    }
}
.prop-body {
    padding: 10px 20px;
    box-sizing: border-box;
    p {
        margin: 8px 0px;
    }
}
.price {
    color: #fff;
    font-size: 14px;
    padding-bottom: 10px;
}
.del-btn {
    margin-top: 20px;
    width: 100%;
}
</style>
