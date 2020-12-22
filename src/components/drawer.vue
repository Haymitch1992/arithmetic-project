<template>
    <div>
        <div class="labeliing" @click="openNode(1)">
            <span class="el-icon-caret-bottom" v-if="showItem" ></span>
            <span class="el-icon-caret-right" v-if="!showItem" ></span>
            <span class="iconfont iconwenjianjia" style="font-size: 14px;"></span>
            <span>{{dataName}}</span>
        </div>
        <div v-if="showItem" class="node-item">
            <div v-for="(item, i) in dataList" :key="i">
                <div class="node-label" @click="currentNode(item)">
                    <span class="el-icon-caret-bottom" v-if="item.nodeSwitch" ></span>
                    <span class="el-icon-caret-right" v-if="!item.nodeSwitch" ></span>
                    <span >{{item.label}}</span>
                </div>
                <div
                        class="basic-node"
                        v-if="item.nodeSwitch"
                        :class="item2.node_type"
                        v-for="(item2, i) in item.nodeItem"
                        :key="'nodes_basic' + i"
                        @mousedown="dragIt(item2)"
                >{{item2.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "drawer",
        props: {
            showItem: Boolean,
            dataList: Array,
            dataName: String
        },
        methods: {
            currentNode(item) {
                // 操作当前节点
                item.nodeSwitch = !item.nodeSwitch
            },
            dragIt(val) {
                console.log(val)
                this.$parent.dragIt(val)
            },
            openNode() {
                this.$emit('openParentNode')
            }
        }
    }
</script>

<style scoped lang="scss">
    .labeliing{
            text-align: left;
            font-size: 14px;
            cursor: pointer;
            padding: 20px 20px 10px 20px;
        .folder-icon{
            color: #00c0ff;
            margin-left:2px;
            margin-right: 4px;
        }
    }
    .node-item{
        text-align: left;
    }
    .node-label{
        padding-left: 36px;
        font-size: 14px;
        display: inline-block;
        padding-bottom: 10px;
        cursor: pointer;
    }
    .basic-node {
        background: #3a8ee6;
        color: #fff;
        border-radius: 4px;
        height: 30px;
        width: 160px;
        border: 1px solid #289de9;
        line-height:30px;
        display: inline-block;
        cursor: pointer;
        user-select: none;
        margin: 4px auto 10px;
        text-align: center;
        box-sizing: border-box;
        font-size: 14px;
        display: block;
    }
    .basic-node.item-1{
        border: 1px solid #44D7B6;
        background: #44D7B6;
    }
    .basic-node.item-2{
        border: 1px solid #FA6400;
        background: #FA6400;
    }
    .basic-node.item-3{
        border: 1px solid #6DD400;
        background: #6DD400;
    }
    .basic-node.item-4{
        border: 1px solid #1677FF;
        background: #1677FF;
    }
</style>
