<template>
    <div class="bg">
        <div class="online-box">
            <div class="device-container">
                <div class="item device-video">视频播放</div>
                <div class="item device-box">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="概览" name="first">
                            <table class="device-table">
                                <tr>
                                    <td class="device-table-th">设备名称</td>
                                    <td>Device00003</td>
                                    <td class="device-table-th">设备状态</td>
                                    <td>在线</td>
                                </tr>
                                <tr>
                                    <td class="device-table-th">产品名称</td>
                                    <td>Product00004</td>
                                    <td class="device-table-th">协议</td>
                                    <td>RTSP</td>
                                </tr>
                                <tr>
                                    <td class="device-table-th">账号</td>
                                    <td>zhanghao</td>
                                    <td class="device-table-th">密码</td>
                                    <td>1234qwer</td>
                                </tr>
                                <tr>
                                    <td class="device-table-th">视频流地址</td>
                                    <td colspan="3">http://www.sunsealot.com</td>
                                </tr>
                            </table>
                            <table class="device-table">
                                <tr>
                                    <td class="device-table-th">关联点位</td>
                                    <td>伊利生态广场8楼2会议室</td>
                                    <td class="device-table-th">卡口组名称</td>
                                    <td>延安里北门口</td>
                                </tr>
                                <tr>
                                    <td class="device-table-th">所属机构</td>
                                    <td>这是所属机构</td>
                                    <td class="device-table-th">安装朝向</td>
                                    <td>朝南</td>
                                </tr>
                            </table>
                            <table class="device-table">
                                <tr>
                                    <td class="device-table-th">添加时间</td>
                                    <td>2019-02-01 18:00:00</td>
                                    <td class="device-table-th">激活时间</td>
                                    <td>2019-02-01 18:00:00</td>
                                </tr>
                                <tr>
                                    <td class="device-table-th">上报时间</td>
                                    <td colspan="3">2019-02-01 18:00:00</td>
                                </tr>
                                <tr>
                                    <td class="device-table-th">描述</td>
                                    <td colspan="3">这是描述</td>
                                </tr>
                            </table>
                        </el-tab-pane>
                        <el-tab-pane label="媒体资源" name="second">
                            <el-table
                                :data="tableData"
                                style="width: 100%">
                            <el-table-column
                                prop="name"
                                label="名称"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="type"
                                label="类型"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="size"
                                label="大小">
                            </el-table-column>
                            <el-table-column
                                prop="createTime"
                                label="生成时间">
                            </el-table-column>
                            <el-table-column
                                label="操作">
                                <template  slot-scope="scope">
                                    <el-button @click="useData(scope.row.id)" size="mini">使用</el-button>
                                    <el-button size="mini" type="danger">删除</el-button>
                                </template>
                            </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="分析" name="third">
                            <!-- 分析任务 -->
                            <!-- 分析结果 -->
                            <div class="device-result-container">
                                <div class="device-result-item">
                                    <div>
                                        <span>未正确戴安全帽</span>
                                        <span>1600</span>
                                    </div>
                                </div>
                                <div class="device-result-item">
                                    <div>
                                        <span>正确佩戴安全帽</span>
                                        <span>1600</span>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <div class="item device-img">
                    <div class="device-img-item">
                        <el-image :src="'/assets/img/safe-item-1.jpg'" style="width: 100%; height: 140px"></el-image>
                        <p class="device-result-text">2020-02-22</p>
                    </div>
                    <div class="device-img-item">
                        <el-image src="../../assets/img/safe-item-1.jpg" style="width: 100%; height: 140px"></el-image>
                        <p class="device-result-text">2020-02-22</p>
                    </div>
                    <div class="device-img-item">
                        <el-image src="../../assets/img/safe-item-1.jpg" style="width: 100%; height: 140px"></el-image>
                        <p class="device-result-text">2020-02-22</p>
                    </div>
                    <div class="device-img-item">
                        <el-image src="../../assets/img/safe-item-1.jpg" style="width: 100%; height: 140px"></el-image>
                        <p class="device-result-text">2020-02-22</p>
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
            activeName: 'first',
            tableData: [
                {
                    name: '202102221001.mp4',
                    type: '视频',
                    size: '1.3kb',
                    createTime: '2021-02-22 16:40:00',
                    id: 1
                },
                {
                    name: '202102221002.mp4',
                    type: '视频',
                    size: '1.3kb',
                    createTime: '2021-02-22 16:40:00',
                    id: 2
                },
                {
                    name: '202102221003.mp4',
                    type: '视频',
                    size: '1.3kb',
                    createTime: '2021-02-22 16:40:00',
                    id: 3
                },
                {
                    name: '202102221004.mp4',
                    type: '视频',
                    size: '1.3kb',
                    createTime: '2021-02-22 16:40:00',
                    id: 4
                },
                {
                    name: '202102221005.mp4',
                    type: '视频',
                    size: '1.3kb',
                    createTime: '2021-02-22 16:40:00',
                    id: 5
                }
            ]
        };
    },
    mounted() {},
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        useData(id) {
            console.log('使用的ID:' + id);
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
            width: 25%;
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
        .device-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        td {
            width: 35%;
            padding: 2px 10px;
            line-height: 28px;
            font-size: 14px;
            color: #333;
        }
        .device-table-th {
            background: rgb(245, 245, 245);
            color: #333;
            font-weight: bold;
            width: 15%;
        }
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
