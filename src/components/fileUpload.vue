<template>
    <div class="device-video">
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
            <uploader-drop @click.native="changeUpload">
                <span class="upload-info">
                    可以将本地的视频资源上传至服务器
                </span>
                <uploader-btn class="upload-btn">上传</uploader-btn>
            </uploader-drop>
            <uploader-list v-if="panelShow"></uploader-list>
        </uploader>
    </div>
</template>

<script>
import SparkMD5 from 'spark-md5';
import { POST_UPLOAD_FILE, POST_JOIN_FILE } from '../assets/url.js';

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
                    console.log('服务器校验分片', chunk);
                    chunk.merge = true;
                    let objMessage = JSON.parse(message);
                    if (objMessage.message) {
                        chunk.merge = false;
                        return true;
                    }

                    return (
                        (objMessage.chunk_id_list || []).indexOf(
                            chunk.offset + 1
                        ) >= 0
                    );
                }
            },

            panelShow: false, // 选择文件后，展示上传panel
            activeName: 'first'
        };
    },
    mounted() {},
    methods: {
        changeUpload() {
            this.panelShow = !this.panelShow;
        },
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
            // 分片的文件需要调用合并接口 秒传成功的话
            if (chunk.merge) {
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
                    this.$emit('updateFileList');
                });
            } else {
                this.$emit('updateFileList');
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
.device-video {
    margin-bottom: 20px;
    /deep/ .uploader-file-info {
        font-size: 14px;
        color: #666;
    }
    /deep/ .uploader-file-icon {
        margin-right: 14px;
    }
    .uploader-list {
        position: absolute;
        top: 65px;
        left: 0;
        width: 100%;
        z-index: 100;
        background: #eee;
    }
    .uploader-drop {
        line-height: 30px;
        padding: 14px 10px;
        background-color: #383d4a;
        .upload-info {
            vertical-align: middle;
            font-size: 14px;
        }
        .upload-btn {
            float: right;
            line-height: 24px;
            font-size: 14px;
            width: 60px;
            text-align: center;
            background: #1677ff;
            color: #fff;
            border: 1px solid #eee;
        }
    }
}
</style>
