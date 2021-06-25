<template>
    <div class="">
        <el-dialog
            title="发布模板"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
        >
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="模板名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="模板描述">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">
                        立即创建
                    </el-button>
                    <el-button @click="handleClose">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ['currentTest'],

    data() {
        return {
            dialogVisible: true,
            form: {}
        };
    },
    computed: {},
    created() {},
    mounted() {
        this.form = {
            name: this.currentTest.test_name,
            desc: this.currentTest.test_content
        };
    },
    methods: {
        handleClose(done) {
            this.$emit('closeReleaseDialog');
        },
        onSubmit() {
            this.$emit('submitTestTemplate', this.form.name, this.form.desc);
        }
    },
    components: {}
};
</script>

<style scoped lang="scss"></style>
