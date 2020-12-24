<template>
    <div>
        <el-dialog
                title="选择字段"
                :visible.sync = "showDialog"
                width="570px"
                :before-close="handleClose">
            <div class="transfer-box">
                <el-transfer v-model="selectTransferData"
                 :titles="['可选','已选']"
                 :data="transferData"></el-transfer>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="handleClose">确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
import { SET_HEADER } from "../assets/url";

export default {
    name: "selectHeader",
    props: {
        dialogVisible: Boolean,
        selectValue: Array
    },
    data() {
        return {
            showDialog: true,
            selectTransferData: this.$store.state.currentSelectDate, // 已选择的序列
            transferData: []
        };
    },
    watch: {
        showDialog() {
            this.selectTransferData = this.$store.state.currentSelectDate;
        }
    },
    mounted() {
        this.setHeader();
        console.log("selectValue", this.selectValue);
    },
    methods: {
        setHeader() {
            // SET_HEADER
            this.$api
                .post(SET_HEADER, {
                    data_user_id: localStorage.getItem("data_user_id"),
                    set_id: this.$store.state.set_id
                })
                .then(res => {
                    // this.options = res.data.search_set
                    res.data.set_header_list.forEach(value => {
                        this.transferData.push({
                            key: value,
                            label: value
                        });
                    });
                });
        },
        handleClose() {
            this.$store.commit("changeSelectDate", this.selectTransferData);
            this.$emit("saveSelect");
        }
    }
};
</script>

<style scoped>
.transfer-box {
    border: 1px solid #eee;
    padding: 10px;
}
</style>
