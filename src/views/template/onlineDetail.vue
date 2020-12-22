<template>
    <div class="bg">
        <div class="online-box"></div>
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
            return {}
        },
        methods: {

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
        padding: 30px 30px 20px;
        box-sizing: border-box;
        .pagination-line{
            background-color: #fff;
            padding: 20px 20px 10px;
            text-align: right;
        }

    }
</style>
