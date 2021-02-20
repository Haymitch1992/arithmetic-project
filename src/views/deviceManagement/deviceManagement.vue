<template>
    <div class="bg">
        <div class="online-box">
            <div class="device-container">
                <div class="item device-video">视频播放</div>
                <div class="item device-box">
                    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                        <el-tab-pane label="概览" name="first">
                            <table class="device-table">
                                <tr>
                                    <td>设备名称</td>
                                    <td>Device00003</td>
                                    <td>设备状态</td>
                                    <td>在线</td>
                                </tr>
                                <tr>
                                    <td>产品名称</td>
                                    <td>Product00004</td>
                                    <td>协议</td>
                                    <td>RTSP</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </table>
                        </el-tab-pane>
                        <el-tab-pane label="媒体资源" name="second">媒体资源</el-tab-pane>
                        <el-tab-pane label="分析" name="third">分析</el-tab-pane>
                    </el-tabs>
                </div>
                <div class="item device-img">
                    <div class="device-img-item">
                        <el-image style="width: 100%; height: 140px"></el-image>
                        <p class="device-result-text">结果：未正确佩戴安全帽</p>
                    </div>
                    <div class="device-img-item">
                        <el-image style="width: 100%; height: 140px"></el-image>
                        <p class="device-result-text">结果：未正确佩戴安全帽</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            activeName: 'first'
        };
    },
    mounted() {},
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>

<style scoped lang="scss">
.bg {
    padding: 20px;
}
.device-container {
    display: grid;
    grid-template-columns: 800px 1fr;
    grid-template-rows: auto 180px;
    height: 600px;
    grid-template-areas:
        'device-video device-box'
        'device-img device-box';
    border: 1px solid #ddd;
    .device-table {
        td {
            border: 1px solid #ddd;
        }
    }
    .item {
        border: 1px solid #ddd;
        .device-img-item {
            width: 50%;
            display: block;
            float: left;
            .device-result-text {
                background: #666666;
                color: #fff;
                padding: 0 0 0 14px;
                margin: 0;
                line-height: 36px;
                font-size: 14px;
            }
        }
    }
    .device-video {
        grid-area: device-video;
    }
    .device-box {
        grid-area: device-box;
    }
    .device-img {
        grid-area: device-img;
    }
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
<style>
.online-box .el-table td {
    padding: 12px 0;
}
.online-box .el-table th .cell {
    color: #666666;
}
.online-box .el-table th {
    background-color: #fafafa;
    font-weight: normal;
}
.dataTable .cell {
    font-size: 14px;
}
</style>
