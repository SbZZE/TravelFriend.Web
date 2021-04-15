<template>
<head>
    <title>首页</title>
</head>

<body>
    <!-- 导航栏 -->
    <header>
        <div class="logo">TravelFriend</div>
        <nav>
            <a href="#">首页</a>
            <a href="#">个人中心</a>
            <a href="#">相册</a>
            <a href="#">队伍</a>
        </nav>
    </header>

    <!-- 侧边栏容器 -->
    <div class="sidebar">
        <div class="block"><el-avatar :size="150" :src="url"></el-avatar></div>
		<h1><strong>I am TFriend</strong>, a super simple web<br /></h1>
    </div>
    
</body>

    <!-- <div class="index">首页</div> -->
</template>

<script>
import { ref, getCurrentInstance } from "vue";

export default {
    name: "Index",
    components: {},
    data(){
        return {
            url:''
        }
    },
    beforeCreate() {
        const { ctx } = getCurrentInstance();
        //post参数要设置响应类型为blob，要在第三个参数设置！
        ctx.$axios.post(ctx.$apiConfig.getUserAvatar.url,'',{responseType:'blob'})
                  .then((res)=>{
                      let blob = new Blob([res.data],{type:'image/png'})
                      this.url = URL.createObjectURL(blob)
                  })
    }
}
</script>

<style scoped>

</style>