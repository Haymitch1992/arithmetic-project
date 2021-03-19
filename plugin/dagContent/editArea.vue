<template>
    <g v-if="isEditAreaShow.value">
        <foreignObject
            width="100%"
            height="100%"
            style="position: relative"
            @click="click_menu_cover($event)"
        >
            <body
                xmlns="http://www.w3.org/1999/xhtml"
                :style="get_menu_style()"
            >
                <div class="menu_contain">
                    <span @click="delEdges">
                        <i class="el-icon-delete" style="margin-right:8px;"></i>
                        删除节点
                    </span>
                    <span
                        v-if="isEditAreaShow.nodeName === '数据集'"
                        @click="openData()"
                    >
                        <i
                            class="el-icon-receiving"
                            style="margin-right:8px;"
                        ></i>
                        查看数据
                    </span>
                    <span
                        v-if="isEditAreaShow.nodeName !== '数据集'"
                        @click="openViewData()"
                    >
                        <i
                            class="el-icon-receiving"
                            style="margin-right:8px;"
                        ></i>
                        查看数据
                    </span>
                    <span class="line"></span>
                    <span @click="startNodeRun(isEditAreaShow)">
                        <i
                            class="el-icon-caret-right"
                            style="margin-right:8px;"
                        ></i>
                        从此处开始执行
                    </span>
                    <span @click="endNodeRun(isEditAreaShow)">
                        <i
                            class="el-icon-finished"
                            style="margin-right:8px;"
                        ></i>
                        执行到此处
                    </span>
                    <span @click="runCurrentNode(isEditAreaShow)">
                        <i
                            class="el-icon-refresh"
                            style="margin-right:8px;"
                        ></i>
                        执行此节点
                    </span>
                    <span class="line"></span>
                    <span @click="openLog()">
                        <i
                            class="el-icon-receiving"
                            style="margin-right:8px;"
                        ></i>
                        查看日志
                    </span>
                    <span
                        v-if="
                            isEditAreaShow.nodeType === 'item-3' &&
                                isEditAreaShow.nodeName !== '模型测试'
                        "
                        @click="openAnalysis()"
                    >
                        <i
                            class="el-icon-receiving"
                            style="margin-right:8px;"
                        ></i>
                        查看分析报告
                    </span>
                    <!-- <span @click="changePort('in_ports')">添加输入</span> -->
                    <!--                <span @click="changePort('out_ports')">添加输出</span>-->
                    <span v-if="isEditAreaShow.detail" @click="editNode">
                        编辑
                    </span>
                    <span
                        v-for="item in isEditAreaShow.rightClickEvent"
                        @click="handlePersonalThs(item.eventName)"
                        :key="item.label"
                    >
                        {{ item.label }}
                    </span>
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
        console.log('isEditAreaShow', this.isEditAreaShow);
    },
    methods: {
        // 从此节点开始运行
        startNodeRun(obj) {
            // 当前节点ID obj.id
            this.$parent.$parent.autoPrepostion(obj.id, 0);
        },
        // 执行到此节点
        endNodeRun(obj) {
            // 当前节点ID obj.id
            this.$parent.$parent.autoPrepostion(0, obj.id);
        },
        // 执行当前节点
        runCurrentNode(obj) {
            // 当前节点ID obj.id
            this.$parent.$parent.autoPrepostion(obj.id, obj.id);
        },
        openViewData() {
            if (this.isEditAreaShow.run_uuid) {
                this.$store.commit('handleNode', {
                    nodeTpye: 'viewDataDialog',
                    status: true,
                    run_uuid: this.isEditAreaShow.run_uuid,
                    nodeName: this.isEditAreaShow.nodeName,
                    nodeIndex: this.isEditAreaShow.nodeIndex
                });
            } else {
                this.$message.error('请先运行试验');
            }
        },
        openAnalysis() {
            // this.$store.commit('handleNode', {
            //     nodeTpye: 'analysisDialog',
            //     status: true,
            //     run_uuid: 'ffd41ca53cea4a2aae34a6c1114d4bb0',
            //     nodeName: '123'
            // });
            // 判断是否存在run_uuid 不存在提示
            if (this.isEditAreaShow.run_uuid) {
                this.$store.commit('handleNode', {
                    nodeTpye: 'analysisDialog',
                    status: true,
                    run_uuid: this.isEditAreaShow.run_uuid,
                    nodeName: this.isEditAreaShow.nodeName
                });
            } else {
                this.$message.error('请先运行试验');
            }
            // // 当前节点参数保存 id 节点名称
            console.log('查看当前节点参数', this.isEditAreaShow);
        },
        openData() {
            if (this.isEditAreaShow.form[0].data[0].value.node_params) {
                // 判断是否存在 当前节点的 set_id
                this.$store.commit(
                    'saveCurrentSetId',
                    this.isEditAreaShow.form[0].data[0].value.node_params.set_id
                );
                this.$store.commit('handleNode', {
                    nodeTpye: 'dataDialog',
                    status: true
                });
            } else {
                this.$message.error('请设置当前节点的预测结果列名');
            }
        },
        openLog() {
            this.$store.commit('handleNode', {
                nodeTpye: 'logDialog',
                status: true
            });
        },
        click_menu_cover(e) {
            this.$emit('close_click_nodes');
            e.preventDefault();
            e.cancelBubble = true;
            e.stopPropagation();
        },
        get_menu_style() {
            let left = this.isEditAreaShow.x;
            let top = this.isEditAreaShow.y;
            return {
                position: 'absolute',
                left: left + 'px',
                top: top + 'px'
            };
        },
        delEdges() {
            let params = {
                model_id: sessionStorage['newGraph'],
                id: this.isEditAreaShow.id
            };
            this.$emit('delNode', params);
            this.$emit('close_click_nodes');
        },
        changePort(action) {
            this.$emit('changePort', action, this.isEditAreaShow.id);
        },
        editNode() {
            this.$emit('editNodeDetails', this.isEditAreaShow);
        },
        handlePersonalThs(eventName) {
            this.$emit('nodesPersonalEvent', eventName, this.isEditAreaShow.id);
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
    background: #2a2d36;
    border-radius: 5px;
    padding: 3px;
}
.menu_contain span {
    width: 100%;
    display: block;
    line-height: 30px;
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 13px;
    color: #fff;
}
.menu_contain .line {
    display: block;
    line-height: 1px;
    padding: 0;
    height: 1px;
    background: #666;
    margin: 2px 0;
}
.menu_contain span:hover {
    background-color: #1777ff;
    cursor: pointer;
}
</style>
