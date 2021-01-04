<template>
    <!-- 正常竖版 -->
    <foreignObject v-if="isVertical()" width="180" height="30" style="overflow: visible;">
        <body xmlns="http://www.w3.org/1999/xhtml" style="margin: 0" >
            <div :class="item.node_type">
                <div :style="item.nodeStyle" :class="choice.paneNode.indexOf(item.id) !== -1 ? 'pane-node-content selected' : 'pane-node-content'" @mouseleave="changeVisibleLog(0,item)" @mousemove="changeVisibleLog(1,item)">
                    <img v-if="item.iconClassName==='el-icon-circle-check'" src="../assets/success.png" class="status-img" alt="">
                    <img v-if="item.iconClassName==='el-icon-circle-close'" src="../assets/error.png" class="status-img" alt="">
                    <!--禁止用户修改节点名称 @change="$emit('change-node-name', item)" -->
                    <input
                      type="text" class="name"
                      v-model="item.name"
                      disabled
                      >
                </div>
                <p v-if="choice.paneNode.indexOf(item.id) !== -1&&item.nameDescribe" class="node-pop">{{item.nameDescribe }}</p>
                <!--输入节点-->
                <div class="pane-node-parent">
                    <div v-for="(poi, nth) in item.in_ports" :key="'__' + nth" :style="{width: `${ 100 / (item.in_ports.length + 1)}%`}">
                        <span
                                class="space"
                                @mouseup="$emit('link-end', i, nth)">
                            <span class="tips-in">{{item.in_ports_text[nth]}}</span>
                        </span>
                    </div>
                </div>
                <!--输出节点-->
                <div class="pane-node-children">
                    <div v-for="(poi, nth) in item.out_ports" :key="'___' + nth" :style="{width: `${ 100 / (item.out_ports.length + 1)}%`}">
                        <span
                                class="space"
                                @mousedown="$emit('link-pre', $event, i, nth)">
                            <span class="tips-out">{{item.out_ports_text[nth]}}</span>
                        </span>

                    </div>
                </div>
            </div>
        </body>
    </foreignObject>
    <!-- 横版 -->
    <foreignObject v-else width="180" height="30" >
              <body xmlns="http://www.w3.org/1999/xhtml" style="margin: 0" >
              <div>
                <div :style="item.nodeStyle" :class="choice.paneNode.indexOf(item.id) !== -1 ? 'pane-node-content selected' : 'pane-node-content'" @mouseover="testConsole">
                    <i
                    @dblclick="$emit('nodesPersonalEvent', 'dbClickNodeIcon', item.id)"
                    :style="item.iconStyle" :class="`${item.iconClassName || 'el-icon-coin'} icon icon-data`"></i>
                    <input
                    type="text" class="name"
                    v-model="item.name"
                    @change="$emit('changeNodeName', item)">
                </div>
                <p v-if="choice.paneNode.indexOf(item.id) !== -1" class="node-pop">{{item.nameDescribe || item.name}}</p>
                <div id="parent-cross" :class="currentEvent === 'dragLink' ? 'pane-node-parent-hl' : 'pane-node-parent' ">
                  <div v-for="(poi, nth) in item.in_ports" :key="'__' + nth" :style="{width: `${ 100 / (item.in_ports.length + 1)}%`}">
                    <span
                    class="space"
                    @mouseup="$emit('linkEnd', i, nth)"></span>
                  </div>
                </div>
                <div id="children-cross" class="pane-node-children">
                  <div v-for="(poi, nth) in item.out_ports" :key="'___' + nth" :style="{width: `${ 100 / (item.out_ports.length + 1)}%`}">
                    <span
                    class="space"
                    @mousedown="$emit('linkPre', $event, i, nth)"></span>
                  </div>

                </div>
              </div>
              </body>
    </foreignObject>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => {}
        },
        choice: {
            type: Object,
            default: () => {}
        },
        currentEvent: {
            type: String,
            default: () => ''
        },
        i: {
            type: Number,
            default: () => 0
        }
    },
    data() {
        return {};
    },
    methods: {
        changeVisibleLog(str, obj) {
            // 鼠标移入 追加状态框
            switch (str) {
                case 0:
                    this.$emit('showRunStatus', obj, false);
                    break;
                case 1:
                    this.$emit('showRunStatus', obj, true);
                    break;
            }
        },
        isVertical() {
            let GlobalConfig = { isVertical: true };
            let _GlobalConfig = localStorage.getItem('GlobalConfig');
            if (_GlobalConfig && _GlobalConfig.length > 0) {
                GlobalConfig = Object.assign(
                    GlobalConfig,
                    JSON.parse(_GlobalConfig)
                );
            }
            return GlobalConfig.isVertical;
        },
        testConsole() {
            console.log('移入');
        }
    }
};
</script>

<style scoped>
.tips-in {
    background: #2a2d36;
    color: #fff;
    padding: 4px 20px;
    border-radius: 4px;
    display: none;
    width: 74px;
    text-align: center;
    position: relative;
    left: -54px;
    top: -30px;
    font-size: 12px;
    z-index: 1000;
}
.space:hover .tips-in {
    display: block;
}
.tips-out {
    background: #2a2d36;
    color: #fff;
    padding: 4px 20px;
    border-radius: 4px;
    display: none;
    width: 50px;
    text-align: center;
    position: relative;
    left: -40px;
    z-index: 1000;
    top: 10px;
    font-size: 12px;
}
.space:hover .tips-out {
    display: block;
}
/* 特征工程 #44D7B6 */
/* 选择算法 #FA6400 */
/* 算法评估 #6DD400 */
/* 随机采样 #1777FF */
.status-img {
    width: 16px;
    margin: 1px 6px 1px 1px;
    color: #1777ff;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    cursor: pointer;
    position: absolute;
    top: 5px;
    right: 3px;
}
.item-1 .pane-node-content {
    border: 2px solid#6236FF;
    background: #6236ff;
}
.item-1 .pane-node-parent .space {
    border: 2px solid #ffffff;
    background: #6236ff;
}
.item-1 .pane-node-children .space {
    border: 2px solid #ffffff;
    background: #6236ff;
}
.item-1 .pane-node-content .name {
    color: #ffffff;
}
.item-2 .pane-node-content {
    border: 2px solid #fa6400;
    background: #fa6400;
}
.item-2 .pane-node-parent .space {
    border: 2px solid #ffffff;
    background: #fa6400;
}

.item-2 .pane-node-children .space {
    border: 2px solid #ffffff;
    background: #fa6400;
}
.item-2 .pane-node-content .name {
    color: #ffffff;
}
.item-3 .pane-node-content {
    border: 2px solid#00D421;
    background: #00d421;
}
.item-3 .pane-node-parent .space {
    border: 2px solid #ffffff;
    background: #00d421;
}
.item-3 .pane-node-children .space {
    border: 2px solid #ffffff;
    background: #00d421;
}
.item-3 .pane-node-content .name {
    color: #ffffff;
}
.item-4 .pane-node-content {
    border: 2px solid #1777ff;
    background: #1777ff;
}
.item-4 .pane-node-parent .space {
    border: 2px solid #ffffff;
    background: #1777ff;
}
.item-4 .pane-node-children .space {
    border: 2px solid #ffffff;
    background: #1777ff;
}
.item-4 .pane-node-content .name {
    color: #ffffff;
}
.pane-node-content {
    box-sizing: border-box;
    width: 180px;
    height: 30px;
    background-color: hsla(0, 0%, 100%, 0.9);
    background-color: #ffffff;
    border: 2px solid #289de9;
    border-radius: 6px;
    font-size: 12px;
    -webkit-transition: background-color 0.2s;
    transition: background-color 0.2s;
    position: relative;
}
.pane-node-content .icon.el-icon-circle-check {
    color: #44d7b6;
}
.pane-node-content .icon.el-icon-circle-close {
    color: #e02020;
}
.pane-node-content .icon {
    width: 20px;
    height: 20px;
    margin: 1px 6px 1px 1px;
    border-radius: 100%;
    color: #1777ff;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    cursor: pointer;
    position: absolute;
    top: 3px;
    right: 3px;
}
.pane-node-content .parentLink {
    font-size: 0;
    height: 12px;
    width: 12px;
    position: absolute;
    top: 0;
    left: 90px;
    transform: translateX(-50%);
    border-top: 6px solid black;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
}
.pane-node-content .childLink {
    height: 10px;
    width: 10px;
    position: absolute;
    bottom: 0;
    left: 90px;
    transform: translate(-50%, 50%);
    border-radius: 50%;
    background: #ffffff;
    cursor: crosshair;
}
.pane-node-content .name {
    float: left;
    margin-left: 0px;
    width: 100%;
    line-height: 28px;
    text-align: center;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    height: 26px;
    background: transparent;
    border: none;
}
.pane-node-parent-hl {
    position: fixed;
    top: -5px;
    height: 10px;
    width: 100%;
    display: flex;
    transform: translateX(6px);
}
.pane-node-parent-hl .space {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid gray;
    background: #ffffff;
    position: absolute;
    right: 0;
    top: 0;
    cursor: crosshair;
}
.pane-node-parent-hl .space:hover {
    box-shadow: 0 0 0 6px #3ddd73;
}
.paneSuccess {
    background: #3ddd73 !important;
}
.pane-node-parent-hl > div {
    position: relative;
    display: inline-block;
}
#parent-cross {
    top: 0px;
    height: 100%;
    width: 10px;
    left: -10px;
}
#parent-cross .space {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
}
#children-cross {
    top: 0px;
    right: 0;
    height: 100%;
    width: 10px;
    position: fixed;
}
#children-cross .space {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
}

.node-pop {
    position: absolute;
    left: 0px;
    top: 30px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 6px;
    background: #fffcdc;
    pointer-events: none;
    font-size: 12px;
    color: #666;
    width: 100px;
}
.node-pop:before {
    content: '';
    position: absolute;
    top: -19px;
    left: 10px;
    border: 10px solid transparent;
    border-bottom: 10px solid #fffcdc;
    z-index: 2;
}
/*.node-pop:after {*/
/*    content: '.';*/
/*    font-size: 0;*/
/*    height: 20px;*/
/*    width: 20px;*/
/*    background: #fff;*/
/*    border: 2px #ccc solid;*/
/*    border-top: none;*/
/*    border-right: none;*/
/*    z-index: 100;*/
/*    position: absolute;*/
/*    transform: rotate(-34deg) skew(-33deg, -1deg) scale(1.5);*/
/*    border-radius: 20px 0 0 0;*/
/*    left: -14px;*/
/*    top: 22px;*/
/*    pointer-events: none;*/
/*}*/
.pane-node-parent {
    position: fixed;
    top: -5px;
    height: 10px;
    width: 100%;
    display: flex;
    opacity: 1;
    transform: translateX(6px);
}
.pane-node-parent .space {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: 2px solid #ffffff;
    background: gray;
    position: absolute;
    right: 0;
    top: 1px;
}

.pane-node-parent > div {
    position: relative;
    display: inline-block;
}

.pane-node-parent .space {
    cursor: crosshair;
}
.pane-node-children {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    opacity: 1;
    transform: translateX(6px);
}
.pane-node-children .space {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: 2px solid #ffffff;
    background: gray;
    position: absolute;
    right: 0px;
    bottom: -4px;
    cursor: crosshair;
}

.pane-node-children .space {
    background: #cccccc;
}
.pane-node-children:hover {
    opacity: 1;
}

.pane-node-children > div {
    position: relative;
    display: inline-block;
}

.selected {
    /*background: rgba(227, 244, 255, 0.9) !important;*/
    opacity: 0.6;
}
</style>
