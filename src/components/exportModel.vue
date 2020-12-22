<template>
    <div>
        <!-- 导出模型 -->
        <el-dialog title="导出" :visible.sync="dialogFormVisible">
            <el-form label-width="100px">
                <el-form-item label="网址" >
                    <span style="color:#1777FF;">{{url}}</span>
                </el-form-item>
                <el-form-item label="文件名" >
                    <el-input class="w300" size="small" v-model="url" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="保存到" >
                    <el-input class="w300" size="small" v-model="url" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="closeDialog">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "exportModel",
    data() {
        return {
            url: "http://private/var/folders"
        };
    },
    props: {
        dialogFormVisible: Boolean
    },
    methods: {
        closeDialog() {
            this.$emit("closeDialog");
        }
    }
};
</script>

<style scoped>
</style>
