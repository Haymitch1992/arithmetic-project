<!-- 控制器 -->
<template>
     <g :transform="`translate(${item.pos_x}, ${item.pos_y + 36})`">
        <foreignObject width="200px" height="300px">
        <body xmlns="http://www.w3.org/1999/xhtml">
            <!--节点运行状态-->
            <div class="runLog">
                <p>节点名称：{{item.name}}</p>
                <p>开始时间：{{item.startTime|converTime('YYYY-MM-DD HH:mm:ss')}}</p>
                <p>结束时间：{{item.endTime|converTime('YYYY-MM-DD HH:mm:ss')}}</p>
                <p>运行状态：{{item.iconClassName==='el-icon-circle-check'?'成功':'失败'}}</p>
            </div>
        </body>
        </foreignObject>
    </g>
</template>

<script>
import '../assets/iconfont';

export default {
    props: {
        item: {
            type: Object
        }
    }
};
</script>

<style scoped>
.runLog {
    background: #2a2d36;
    color: #fff;
    padding: 4px 20px;
    border-radius: 6px;
    width: 200px;
    text-align: left;
    display: block;
    font-size: 12px;
    box-sizing: border-box;
    z-index: 9999;
}
</style>
