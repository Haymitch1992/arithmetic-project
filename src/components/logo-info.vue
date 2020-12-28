<template>
    <div class="info-drop-down-box">
        <img src="../assets/img/person.jpg" alt="" class="info-img">
        <p>{{$store.state.userName}}</p>
        <p>{{$store.state.userEmail}}</p>
        <ul class="info-drop-down-ul">
            <li @click="goPersonalPage()">
                <p>
                    <span class="iconfont icongerenzhongxin"></span>
                </p>
                <p >个人中心</p>
            </li>
            <li @click="logOut">
                <p>
                    <span class="iconfont icontuichu"></span>
                </p>
                <p>退出</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "logo-info",
        methods: {
            logOut () {
                localStorage.setItem('data_user_token', '');
                this.$router.push('/login');
            },
            goPersonalPage() {
                this.$router.push('/personal');
            }
        }
    };
</script>

<style scoped>

</style>
