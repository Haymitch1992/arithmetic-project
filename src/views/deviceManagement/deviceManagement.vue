<template>
    <div class="bg">
        <div class="devicebox">
            <div class="device-container">
                <div class="item device-video">
                    <h3>视频源 202102221001.mp4</h3>
                    <video
                        :src="videoPath"
                        autoplay
                        controls="controls"
                        style="width: 100%;height: 430px;background:#383d4a;"
                        type="video/mp4"
                    ></video>
                </div>
                <div class="item device-box">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="概览" name="first">
                            <h3>基本信息</h3>
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
                                    <td colspan="3">
                                        http://www.sunsealot.com
                                    </td>
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
                            <h3>媒体资源</h3>
                            <Fileupload
                                @updateFileList="getVideoList"
                            ></Fileupload>
                            <el-table
                                border
                                v-loading="vloading"
                                :data="video_data_list"
                                style="width: 100%"
                            >
                                <el-table-column
                                    prop="video_name"
                                    width="300px"
                                    label="名称"
                                ></el-table-column>
                                <el-table-column
                                    prop="video_path"
                                    label="视频状态"
                                >
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.video_type === 0">
                                            未分析
                                        </span>
                                        <span v-if="scope.row.video_type === 1">
                                            分析完成
                                        </span>
                                        <span v-if="scope.row.video_type === 2">
                                            正在分析
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="video_size"
                                    label="大小"
                                ></el-table-column>
                                <el-table-column
                                    prop="update_time"
                                    width="160px"
                                    label="生成时间"
                                >
                                    <template slot-scope="scope">
                                        {{
                                            scope.row.update_time | create_time
                                        }}
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="260px">
                                    <template slot-scope="scope">
                                        <el-button
                                            @click="
                                                seeData(scope.row.video_path)
                                            "
                                            size="mini"
                                        >
                                            查看
                                        </el-button>
                                        <el-button
                                            @click="
                                                useData(
                                                    scope.row.id,
                                                    scope.row.video_path,
                                                    scope.row.server_video_path
                                                )
                                            "
                                            v-if="scope.row.video_type === 0"
                                            size="mini"
                                        >
                                            分析
                                        </el-button>
                                        <el-button
                                            v-if="scope.row.video_type === 1"
                                            @click="
                                                seeResult(
                                                    scope.row.id,
                                                    scope.row.video_path
                                                )
                                            "
                                            size="mini"
                                            type="primary"
                                        >
                                            结果
                                        </el-button>
                                        <el-button
                                            size="mini"
                                            @click="del(scope.row.id)"
                                            type="danger"
                                        >
                                            删除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                style="margin-top:10px;"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size="currentSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="count"
                            ></el-pagination>
                        </el-tab-pane>
                        <el-tab-pane label="分析" name="third">
                            <h3>分析结果</h3>
                            <!-- 分析结果 -->
                            <div
                                class="device-result-container"
                                style="margin-bottom:20px;"
                            >
                                <div class="device-result-item">
                                    <p>未正确戴安全帽</p>
                                    <p class="num">{{ nums_of_no_helmet }}</p>
                                </div>
                                <div class="device-result-item">
                                    <p>正确佩戴安全帽</p>
                                    <p class="num">{{ nums_of_helmet }}</p>
                                </div>
                            </div>
                            <h3>分析结果-识别目标(未正确佩戴安全帽)</h3>
                            <el-carousel
                                height="200px"
                                style="background:#383d4a;"
                            >
                                <el-carousel-item
                                    :key="item"
                                    v-for="item in Math.ceil(
                                        srcList.length / 4
                                    )"
                                >
                                    <div
                                        class="device-img-item"
                                        v-for="index in 4"
                                        :key="
                                            srcList[(item - 1) * 4 + index - 1]
                                        "
                                    >
                                        <el-image
                                            v-if="
                                                srcList[
                                                    (item - 1) * 4 + index - 1
                                                ]
                                            "
                                            :preview-src-list="srcList"
                                            :src="
                                                srcList[
                                                    (item - 1) * 4 + index - 1
                                                ]
                                            "
                                            style="width: 100%; height: 200px"
                                        ></el-image>
                                        <p class="device-result-text">
                                            {{ (item - 1) * 4 + index - 1 }}
                                        </p>
                                    </div>
                                </el-carousel-item>
                            </el-carousel>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Fileupload from '../../components/fileUpload.vue';
import {
    GET_FILE_LIST,
    DELETE_VIDEO_DATA,
    GET_VIDEO_RESULT,
    USE_VIDEO_DATA
} from '../../assets/url.js';
import moment from 'moment';
export default {
    name: 'home',
    components: {
        Fileupload
    },
    filters: {
        create_time(val) {
            if (!val) return '';
            return moment(val).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    data() {
        return {
            videoPath: '', // 当前视频路径
            currentPage: 1,
            vloading: false,
            currentSize: 10,
            count: 0,
            activeName: 'first',
            srcList: [], // 视频分析结果图片列表
            video_data_list: [], // 已上传的视频列表
            nums_of_helmet: 0, // 戴安全帽数量
            nums_of_no_helmet: 2 // 未戴安全帽数量
        };
    },
    mounted() {
        this.getVideoList();
    },
    methods: {
        seeResult(videoId, url) {
            // GET_VIDEO_RESULT
            this.$api
                .get(GET_VIDEO_RESULT, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    video_id: videoId
                })
                .then(res => {
                    //
                    this.srcList = res.data.result_data;
                    this.srcList.forEach((currentValue, index) => {
                        this.srcList[index] =
                            this.globalUlr + 'video' + currentValue;
                    });
                    this.activeName = 'third';
                    this.videoPath = 'http://' + url;
                    this.nums_of_no_helmet =
                        res.data.analysis_data.nums_of_no_helmet[0];
                    this.nums_of_helmet =
                        res.data.analysis_data.nums_of_helmet[0];
                    console.log(this.srcList);
                });
        },
        del(videoId) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.delVideo(videoId);
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        // 删除视频文件
        delVideo(videoId) {
            // DELETE_VIDEO_DATA
            this.$api
                .get(DELETE_VIDEO_DATA, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    video_id: videoId
                })
                .then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getVideoList();
                });
        },
        useVideo(videoId, url) {
            this.$api
                .post(USE_VIDEO_DATA, {
                    user_id: localStorage.getItem('data_user_id'),
                    user_name: 'user1',
                    video_id: videoId,
                    experiment_name: 'achievement_display_experiment',
                    achievement_id: 'safety_helmet_detection',
                    achievement_name: '安全帽识别',
                    achievement_params: {
                        source: url // media/videos/C0161.m4v'
                    }
                })
                .then(res => {
                    this.getVideoList();
                });
            //
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.currentSize = val;
            this.getVideoList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            console.log(`当前页: ${val}`);
            this.getVideoList();
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        useData(id, url, serverUrl) {
            this.videoPath = 'http://' + url;
            console.log('使用的ID:' + this.videoPath);
            this.useVideo(id, serverUrl);
        },
        seeData(url) {
            this.videoPath = 'http://' + url;
            console.log('使用的ID:' + this.videoPath);
        },
        getVideoList() {
            // GET_FILE_LIST
            this.vloading = true;
            this.$api
                .get(GET_FILE_LIST, {
                    data_user_id: localStorage.getItem('data_user_id'),
                    page: this.currentPage,
                    size: this.currentSize
                })
                .then(res => {
                    this.video_data_list = res.data.video_data_list;
                    this.count = res.data.count;
                    this.vloading = false;
                    console.log(123);
                });
        }
    }
};
</script>

<style scoped lang="scss">
.devicebox {
    height: calc(100vh - 80px);
    background-color: #292c36;
    padding: 20px 30px;
    box-sizing: border-box;
    color: #fff;
    /deep/ .el-loading-mask {
        background: rgba(0, 0, 0, 0.5);
    }
    /deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
        border: 1px solid rgb(72, 72, 79);
    }
    /deep/ .el-tabs__item {
        color: #fff;
    }
    /deep/ .el-tabs__item.is-active {
        color: #409eff;
    }
    /deep/ .el-table td,
    /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
        background: rgb(42, 45, 54);
        color: #fff;
    }
    /deep/ .el-table--border {
        border: 1px solid #3a404c;
    }
    /deep/ .el-table--border::after,
    /deep/ .el-table--group::after,
    /deep/ .el-table::before {
        background-color: #3a404c;
    }
    /deep/ .el-table th,
    /deep/ .el-table tr {
        background-color: #2a2d36 !important;
        cursor: pointer;
    }
    /deep/ .el-table__row:hover td {
        background-color: #4a4d57 !important;
    }
    /deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
        background-color: #2a2d36 !important;
    }
    /deep/ .el-table--border td,
    /deep/ .el-table--border th,
    /deep/
        .el-table__body-wrapper
        .el-table--border.is-scrolling-left
        ~ .el-table__fixed {
        border-right: 1px solid #3a404c;
    }
    /deep/ .el-table td,
    /deep/ .el-table th.is-leaf {
        border-bottom: 1px solid #3a404c;
    }
    /deep/ ::-webkit-scrollbar {
        background-color: #3a404c;
    }
    /deep/ ::-webkit-scrollbar-thumb {
        background-color: #ccc;
    }
}
.device-container {
    h3 {
        margin: 0;
        padding: 0;
        font-weight: normal;
        line-height: 24px;
        font-size: 16px;
        margin-bottom: 14px;
        color: #fff;
    }
    display: grid;
    grid-template-columns: 650px 1fr;
    grid-template-rows: 480px auto;
    height: 500px;
    grid-template-areas:
        'device-video device-box'
        'device-img device-box';
    .device-table {
        td {
            border: 1px solid #ddd;
        }
    }
    .item {
        padding: 10px;
        .device-img-item {
            width: 25%;
            display: block;
            box-sizing: border-box;
            padding-right: 2px;
            float: left;
            position: relative;
            .device-result-text {
                background: rgba(0, 0, 0, 0.3);
                color: #fff;
                padding: 0 0 0 14px;
                margin: 0;
                line-height: 36px;
                font-size: 14px;
                position: absolute;
                width: calc(100% - 16px);
                bottom: 0;
            }
        }
    }
    .device-video {
        grid-area: device-video;
    }
    .device-result-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        .device-result-item {
            height: 90px;
            border: 1px solid rgb(72, 72, 79);
            text-align: center;
            padding-top: 24px;
            background: rgb(56, 61, 74);
            cursor: pointer;
            p {
                padding: 0;
                margin: 0;
                font-size: 14px;
                color: #fff;
            }
            .num {
                font-size: 40px;
                position: relative;
                line-height: 54px;
                color: #fff;
                font-weight: bold;
            }
            .num::after {
                content: '';
                width: 50px;
                height: 4px;
                display: block;
                position: absolute;
                background: #1677ff;
                left: calc(50% - 25px);
                top: 54px;
                opacity: 0;
            }
        }
        .device-result-item:hover {
            transition: all 0.3s;
            box-shadow: 0 0 20px rgb(156, 154, 154);
            .num {
                color: #1677ff;
            }
            .num::after {
                opacity: 1;
            }
        }
        .device-result-item:nth-child(1) {
            border-bottom: 4px solid #3670e4;
        }
        .device-result-item:nth-child(2) {
            border-bottom: 4px solid #52cca3;
        }
        .device-result-item:nth-child(3) {
            border-bottom: 4px solid #32c5ff;
        }
    }
    .device-box {
        grid-area: device-box;
        /deep/ .el-tabs__content {
            overflow: visible;
        }
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
            color: #fff;
            background: rgb(42, 45, 54);
            border: 1px solid rgb(72, 72, 79);
        }
        .device-table-th {
            background: rgb(56, 61, 74);
            color: #fff;
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
