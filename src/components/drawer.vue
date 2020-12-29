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
                    <span class="iconfont iconwenjianjia" style="font-size: 14px;"></span>
                    <span >{{item.label}}</span>
                </div>
                <div
                        class="basic-node"
                        v-show="item.nodeSwitch"
                        :class="item2.node_type"
                        v-for="(item2, i) in item.nodeItem"
                        :key="'nodes_basic' + i"
                        @mousedown="dragIt(item2)"
                >
                <span class="icon-span" :class="item2.node_type"></span>
                {{item2.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'drawer',
    props: {
        showItem: Boolean,
        dataList: Array,
        dataName: String
    },
    methods: {
        currentNode(item) {
            // 操作当前节点
            item.nodeSwitch = !item.nodeSwitch;
        },
        dragIt(val) {
            console.log(val);
            this.$parent.dragIt(val);
        },
        openNode() {
            this.$emit('openParentNode');
        }
    }
};
</script>

<style scoped lang="scss">
.icon-span {
    width: 10px;
    height: 10px;
    background: #ddd;
    display: inline-block;
    vertical-align: initial;
    margin-right: 2px;
}
.icon-span.item-1 {
    background: url('../../src/assets/img/icon-2.png') no-repeat 0px 0px;
}
.icon-span.item-2 {
    background: url('../../src/assets/img/icon-3.png') no-repeat 0px 0px;
}
.icon-span.item-3 {
    background: url('../../src/assets/img/icon-4.png') no-repeat 0px 0px;
}
.icon-span.item-4 {
    background: url('../../src/assets/img/icon-1.png') no-repeat 0px 0px;
}
.labeliing {
    text-align: left;
    font-size: 14px;
    cursor: pointer;
    padding: 14px 20px 10px 20px;
    .folder-icon {
        color: #00c0ff;
        margin-left: 2px;
        margin-right: 4px;
    }
}
.node-item {
    text-align: left;
}
.node-label {
    padding-left: 36px;
    font-size: 14px;
    display: inline-block;
    padding-bottom: 10px;
    padding-top: 10px;
    cursor: pointer;
}
.basic-node {
    color: #fff;
    height: 32px;
    width: 100%;
    border: 1px solid transparent;
    line-height: 32px;
    display: inline-block;
    cursor: pointer;
    user-select: none;
    margin: 4px auto 10px;
    text-align: left;
    box-sizing: border-box;
    font-size: 14px;
    display: block;
    padding-left: 56px;
}
.basic-node.item-1:hover {
    border: 1px solid #6236ff;
    background: #6236ff;
}
.basic-node.item-2:hover {
    border: 1px solid #fa6400;
    background: #fa6400;
}
.basic-node.item-3:hover {
    border: 1px solid #6dd400;
    background: #6dd400;
}
.basic-node.item-4:hover {
    border: 1px solid #1677ff;
    background: #1677ff;
}
</style>
