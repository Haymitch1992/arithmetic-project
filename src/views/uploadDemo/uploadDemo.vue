<template>
    <div class="bg">
        <div class="online-box">
            <div class="device-container">
                <div class="item device-video">
                    <!-- 上传 -->
                    <uploader
                        :options="options"
                        :fileStatusText="fileStatusText"
                        class="uploader-example"
                        :autoStart="false"
                        ref="uploader"
                        @file-added="onFileAdded"
                        @file-success="onFileSuccess"
                        style="width: 100%"
                    >
                        <uploader-unsupport></uploader-unsupport>
                        <uploader-drop>
                            <p>欢迎来到上传录音界面</p>
                            <uploader-btn>选择录音</uploader-btn>
                        </uploader-drop>
                        <uploader-list></uploader-list>
                    </uploader>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SparkMD5 from 'spark-md5';
import { POST_UPLOAD_FILE, POST_JOIN_FILE } from '../../assets/url.js';

export default {
    name: 'home',
    computed: {
        // Uploader实例
        uploader() {
            return this.$refs.uploader.uploader;
        }
    },
    data() {
        return {
            fileStatusText: {
                success: '成功',
                error: '失败',
                uploading: '上传中',
                paused: '暂停',
                waiting: '等待'
            },
            options: {
                // target: POST_UPLOAD_FILE, // 目标上传 URL
                target: POST_UPLOAD_FILE,
                query: { data_user_id: localStorage.getItem('data_user_id') },
                headers: {
                    usertoken: localStorage.getItem('data_user_token'),
                    datauserid: localStorage.getItem('data_user_id')
                },
                // target: ' //localhost:3000/upload',
                chunkSize: 1024000 * 5, // 分块大小
                fileParameterName: 'file', // 上传文件时文件的参数名，默认file
                maxChunkRetries: 3, // 最大自动失败重试上传次数
                testChunks: true, // 是否开启服务器分片校验
                // 服务器分片校验函数，秒传及断点续传基础
                checkChunkUploadedByResponse: function(chunk, message) {
                    let objMessage = JSON.parse(message);
                    if (objMessage.code === 200) {
                        return true;
                    }

                    return (
                        (objMessage.uploaded || []).indexOf(chunk.offset + 1) >=
                        0
                    );
                }
            },

            panelShow: false, // 选择文件后，展示上传panel
            activeName: 'first'
        };
    },
    mounted() {},
    methods: {
        statusSet(id, status) {
            let statusMap = {
                md5: {
                    text: '校验MD5',
                    bgc: '#fff'
                },
                merging: {
                    text: '合并中',
                    bgc: '#e2eeff'
                },
                transcoding: {
                    text: '转码中',
                    bgc: '#e2eeff'
                },
                failed: {
                    text: '上传失败',
                    bgc: '#e2eeff'
                }
            };

            console.log(statusMap[status].text);
        },
        onFileAdded(file) {
            this.panelShow = true;
            this.computeMD5(file);
        },
        computeMD5(file) {
            let fileReader = new FileReader();
            let time = new Date().getTime();
            let blobSlice =
                File.prototype.slice ||
                File.prototype.mozSlice ||
                File.prototype.webkitSlice;
            let currentChunk = 0;
            // const chunkSize = 10 * 1024 * 1000;
            const chunkSize = this.options.chunkSize;
            let chunks = Math.ceil(file.size / chunkSize);
            let spark = new SparkMD5.ArrayBuffer();

            // 文件状态设为"计算MD5"
            this.statusSet(file.id, 'md5');

            file.pause();

            loadNext();

            fileReader.onload = e => {
                spark.append(e.target.result);
                if (currentChunk < chunks) {
                    currentChunk++;
                    loadNext();
                    // 实时展示MD5的计算进度
                    this.$nextTick(() => {
                        // $(`.myStatus_${file.id}`).text(
                        //     '校验MD5 ' +
                        //         ((currentChunk / chunks) * 100).toFixed(0) +
                        //         '%'
                        // );
                    });
                } else {
                    let md5 = spark.end();
                    this.computeMD5Success(md5, file);
                    console.log(
                        `MD5计算完毕：${
                            file.name
                        } \nMD5：${md5} \n分片：${chunks} 大小:${
                            file.size
                        } 用时：${new Date().getTime() - time} ms`
                    );
                }
            };
            fileReader.onerror = function() {
                this.error(`文件${file.name}读取出错，请检查该文件`);
                file.cancel();
            };
            function loadNext() {
                let start = currentChunk * chunkSize;
                let end =
                    start + chunkSize >= file.size
                        ? file.size
                        : start + chunkSize;
                fileReader.readAsArrayBuffer(
                    blobSlice.call(file.file, start, end)
                );
            }
        },

        computeMD5Success(md5, file) {
            // 将自定义参数直接加载uploader实例的opts上
            Object.assign(this.uploader.opts, {
                query: {
                    data_user_id: localStorage.getItem('data_user_id'),
                    fileName: file.name,
                    ...this.params
                }
            });
            file.uniqueIdentifier = md5;
            file.resume();
            this.statusRemove(file.id);
        },
        statusRemove(id) {
            console.log('remove', id);
        },
        onFileSuccess(rootFile, file, response, chunk) {
            let res = JSON.parse(response);
            console.log('是否需要合并', rootFile, file, response, chunk);
            // 服务器自定义的错误，这种错误是Uploader无法拦截的
            // if (!res.result) {
            //     this.$message({ message: res.message, type: 'error' });
            //     return;
            // }

            // 如果服务端返回需要合并
            // 分片的文件需要调用合并接口
            if (rootFile.size > this.options.chunkSize) {
                console.log('是否需要合并', rootFile, file, response, chunk);
                let form = new FormData();
                form.append('fileName', rootFile.name);
                form.append('identifier', rootFile.uniqueIdentifier);
                form.append(
                    'data_user_id',
                    localStorage.getItem('data_user_id')
                );
                form.append('file_size', rootFile.size);
                this.$api.post(POST_JOIN_FILE, form).then(res => {
                    console.log(123);
                });
                // this.$api.mergeSimpleUpload({
                //     tempName: res.tempName,
                //     fileName: file.name,
                //     data_user_id: localStorage.getItem('data_user_id'),
                //     ...this.params
                // })
                //     .then(data => {
                //         // 文件合并成功
                //         Bus.$emit('fileSuccess', data);
                //     })
                //     .catch(e => {});
                // 不需要合并
            } else {
                console.log('上传成功');
            }
        },
        onFileProgress(rootFile, file, chunk) {
            console.log(
                `上传中 ${file.name}，chunk：${chunk.startByte /
                    1024 /
                    1024} ~ ${chunk.endByte / 1024 / 1024}`
            );
        },
        onFileError(rootFile, file, response, chunk) {
            console.log('onFileError');
        },
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
    h3 {
        margin: 0;
        padding: 0;
        font-weight: normal;
        line-height: 24px;
        font-size: 16px;
        margin-bottom: 14px;
        color: #333;
    }
    display: grid;
    grid-template-columns: 650px 1fr;
    grid-template-rows: auto 160px;
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
        grid-template-columns: repeat(3, 1fr);
        .device-result-item {
            height: 90px;
            border: 1px solid #eee;
            text-align: center;
            padding-top: 24px;
            cursor: pointer;
            p {
                padding: 0;
                margin: 0;
                font-size: 14px;
                color: #666;
            }
            .num {
                font-size: 40px;
                position: relative;
                line-height: 54px;
                color: #333;
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
