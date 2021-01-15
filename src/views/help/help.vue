<template>
    <div class="bg">
        <div class="online-box">
            <h3>算法中台说明文档</h3>
            <p>1 产品介绍</p>
            <p>2 数据准备</p>
            <p>3 模型开发和训练</p>
            <p>3.1 入门介绍</p>
            <p>3.2 数据预处理（拖拽生成节点树）</p>
            <p>3.3 配置参数</p>
            <p>3.4 运行实验</p>
            <p>3.5 数据可视化</p>
            <p>3.6 常规学习组件</p>
            <p>3.6.1 数据预处理</p>
            <p>3.6.2 特征工程</p>
            <p>4 模型管理</p>
            <p>5 模型部署</p>
            <p>6 常见问题</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'help'
};
</script>

<style scoped lang="scss">
.bg {
    padding: 20px;
}
.online-box {
    height: calc(100vh - 100px);
    background-color: #fff;
    border-top-left-radius: 50px;
    padding: 30px 30px 20px;
    box-sizing: border-box;
    box-shadow: 1px 2px 3px #e5e5e5;
    .pagination-line {
        background-color: #fff;
        padding: 20px 20px 10px;
        text-align: right;
    }
    .model-status {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;
        background-color: #666666;
        vertical-align: middle;
        margin-right: 6px;
    }
    .model-status-0 {
        background-color: #1677ff;
    }
    .model-status-1 {
        background-color: #dddddd;
    }
    .model-status-2 {
        background-color: #52c41a;
    }
    .model-status-3 {
        background-color: #ff3b30;
    }
    .model-status-4 {
        background-color: #ebad18;
    }
}
</style>
