<template>
    <div>
        <!--创建实验-->
        <el-dialog
            title="创建实验"
            :visible.sync="dialogFormVisible"
            :close-on-click-modal="false"
            class="create-test"
        >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="实验名称" prop="test_name">
                    <el-input
                        v-model="ruleForm.test_name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="实验描述" prop="test_content">
                    <el-input
                        v-model="ruleForm.test_content"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">
                    确 定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    // 表单参数在组件内校验
    props: {
        dialogFormVisible: Boolean
    },
    watch: {
        dialogFormVisible() {
            // 初始化赋值
            this.ruleForm = {
                test_name: '',
                test_content: ''
            };
        }
    },
    // 提交
    data() {
        return {
            ruleForm: {
                test_name: '',
                test_content: ''
            },
            rules: {
                test_name: [
                    {
                        required: true,
                        message: '请输入实验名称',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 8,
                        message: '长度在 1 到 8 个字符',
                        trigger: 'blur'
                    }
                ],
                test_content: [
                    {
                        required: true,
                        message: '请输入实验描述',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 128,
                        message: '长度在 1 到 128 个字符',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.editeTest();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        closeDialog() {
            this.ruleForm.test_name = '';
            this.ruleForm.test_content = '';
            this.$emit('closeDialog');
        },
        editeTest() {
            this.$emit('createTest', this.ruleForm);
        }
    }
};
</script>

<style></style>
