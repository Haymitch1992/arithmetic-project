<template>
     <g v-if="isEditAreaShow.value">
        <foreignObject width="100%" height="100%" style="position: relative" @click="click_menu_cover($event)">
        <body xmlns="http://www.w3.org/1999/xhtml" :style="get_menu_style()">
            <div class="menu_contain">
                <span @click="delEdges"><i class="el-icon-delete" style="margin-right:8px;"></i>删除节点</span>
                <span v-if="isEditAreaShow.nodeName==='数据集'" @click="openData()"><i class="el-icon-receiving" style="margin-right:8px;"></i>查看数据</span>
                <span @click="openLog()"><i class="el-icon-receiving" style="margin-right:8px;"></i>查看日志</span>
                <span v-if="isEditAreaShow.nodeType==='item-3'&&isEditAreaShow.nodeName!=='模型测试'" @click="openAnalysis()"><i class="el-icon-receiving" style="margin-right:8px;"></i>查看分析报告</span>
                <!-- <span @click="changePort('in_ports')">添加输入</span> -->
<!--                <span @click="changePort('out_ports')">添加输出</span>-->
                <span v-if="isEditAreaShow.detail" @click="editNode">编辑</span>
                <span v-for="item in isEditAreaShow.rightClickEvent" @click="handlePersonalThs(item.eventName)" :key="item.label">{{ item.label }}</span>
            </div>
        </body>
        </foreignObject>
    </g>
</template>

<script>
export default {
    props: {
        isEditAreaShow: {
            type: Object,
            default: () => {
                return {
                    value: false,
                    x: -9999,
                    y: -9999,
                    id: null
                };
            }
        }
    },
    mounted() {
        console.log("isEditAreaShow", this.isEditAreaShow);
    },
    methods: {
        openAnalysis() {
            this.$store.commit("handleNode", {
                nodeTpye: "analysisDialog",
                status: true,
                nodeName: this.isEditAreaShow.nodeName
            });
            // 当前节点参数保存 id 节点名称
            console.log("查看当前节点参数", this.isEditAreaShow);
        },
        openData() {
            if (this.isEditAreaShow.form[0].data[0].value.node_params) {
                // 判断是否存在 当前节点的 set_id
                this.$store.commit(
                    "saveCurrentSetId",
                    this.isEditAreaShow.form[0].data[0].value.node_params.set_id
                );
                this.$store.commit("handleNode", {
                    nodeTpye: "dataDialog",
                    status: true
                });
            } else {
                this.$message.error("请设置当前节点的预测结果列名");
            }
        },
        openLog() {
            this.$store.commit("handleNode", {
                nodeTpye: "logDialog",
                status: true
            });
        },
        click_menu_cover(e) {
            this.$emit("close_click_nodes");
            e.preventDefault();
            e.cancelBubble = true;
            e.stopPropagation();
        },
        get_menu_style() {
            let left = this.isEditAreaShow.x;
            let top = this.isEditAreaShow.y;
            return {
                position: "absolute",
                left: left + "px",
                top: top + "px"
            };
        },
        delEdges() {
            let params = {
                model_id: sessionStorage["newGraph"],
                id: this.isEditAreaShow.id
            };
            this.$emit("delNode", params);
            this.$emit("close_click_nodes");
        },
        changePort(action) {
            this.$emit("changePort", action, this.isEditAreaShow.id);
        },
        editNode() {
            this.$emit("editNodeDetails", this.isEditAreaShow);
        },
        handlePersonalThs(eventName) {
            this.$emit("nodesPersonalEvent", eventName, this.isEditAreaShow.id);
        }
    }
};
</script>

<style scoped>
.connector {
    stroke: hsla(0, 0%, 50%, 0.6);
    stroke-width: 2px;
    fill: none;
}
.menu_cover {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}
.connector-hl {
    stroke: hsla(0, 0%, 50%, 0.4);
    stroke-width: 5px;
    fill: none;
}
.menu_contain {
    width: 150px;
    border: 1px solid rgba(1, 1, 1, 0.3);
    background: #ffffff;
    border-radius: 5px;
    padding: 3px;
}
.menu_contain span {
    width: 100%;
    display: inline-block;
    line-height: 30px;
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 13px;
    color: #666;
}
.menu_contain span:hover {
    background-color: rgba(40, 157, 233, 0.3);
    cursor: pointer;
}
</style>
