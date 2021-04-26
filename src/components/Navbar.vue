<template>
<!-- 导航栏 -->
<header>
    <div class="logo">TravelFriend</div>
    <nav>
        <router-link to="/home">首页</router-link>
        <router-link to="/personal">个人中心</router-link>
        <router-link to="/personal/album">个人相册</router-link>
        <a href="#">队伍</a>
    </nav>
</header>
<el-divider></el-divider>
</template>

<script lang="ts">
export default {
    setup() {

    },
}
</script>

<style scoped>

</style>
