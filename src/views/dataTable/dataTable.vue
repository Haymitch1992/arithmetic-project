<template>
    <div class="bg">
        <div class="online-box dataTable">
                <el-table
                    :data="dataList"
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="数据集ID/名称"
                        width="180">
                        <template slot-scope="scope">
                            <el-button type="text" size="small">{{scope.row.dataId}}</el-button>
                            <p class="table-p">{{scope.row.label}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="source"
                        label="数据来源"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="saveType"
                        label="存储类型">
                    </el-table-column>
                    <el-table-column
                        prop="linkInfo"
                        label="数据集路径/链接信息">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        sortable
                        label="创建时间">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="goDetail">标注</el-button>
                        </template>
                    </el-table-column>
                </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home",
        filters: {
            modelStatusZn (val) {
                switch (val) {
                    case 0:
                        return '未开始'
                    case 1:
                        return '进行中'
                    case 2:
                        return '已完成'
                    case 3:
                        return '失败'
                    case 4:
                        return '已停止'
                }
            }
        },
        data () {
            return {
                dataList: [
                    {
                        dataId: 'd-isjadasda',
                        label: '道岔数据',
                        source: '数据同步/用户导入',
                        saveType: 'Cvs/txt/mysql',
                        linkInfo: '链接字符串或文件路径',
                        createTime: '2020-6-22 12:30:30',
                        id: 1
                    },
                    {
                        dataId: 'd-isjadasda',
                        label: '道岔数据',
                        source: '数据同步/用户导入',
                        saveType: 'Cvs/txt/mysql',
                        linkInfo: '链接字符串或文件路径',
                        createTime: '2020-6-22 12:30:30',
                        id: 2
                    },
                    {
                        dataId: 'd-isjadasda',
                        label: '道岔数据',
                        source: '数据同步/用户导入',
                        saveType: 'Cvs/txt/mysql',
                        linkInfo: '链接字符串或文件路径',
                        createTime: '2020-6-22 12:30:30',
                        id: 3
                    }
                ]
            }
        },
        methods: {
            goDetail() {
                this.$router.push('/dataTableDetail')
            }
        }
    }
</script>

<style scoped lang="scss">
    .bg{
        padding: 20px;
    }
    .online-box{
        height: calc(100vh - 100px);
        background-color: #fff;
        border-top-left-radius: 50px;
        padding: 50px 30px 20px;
        box-sizing: border-box;
        box-shadow: 1px 2px 3px #E5E5E5;
        .table-p{
            margin: 0 ;
        }
        .pagination-line{
            background-color: #fff;
            padding: 20px 20px 10px;
            text-align: right;
        }
    }
</style>
<style>
    .dataTable th{
        background-color: #FAFAFA;
    }
    .dataTable .cell{
        font-size: 14px;
    }
</style>
