<template>
  <head>
    <title>首页</title>
  </head>
  <body>
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

    <!-- 侧边栏容器 -->
    <div class="sidebar">
        <div class="block"><el-avatar :size="150" :src="url"></el-avatar></div>
		<h1><strong>I am TFriend</strong>, a super simple web<br /></h1>
    </div>
    <!-- 主内容容器 -->
    <div class="main">
      
      <!-- 动态/相册展示 -->
      <section>
        <h2>最新动态</h2>
        <!-- 展示容器 -->
        <div class="row">
          <article class="6u 12u$(xsmall) work-item">
            <a href="src/assets/img/fulls/01.jpg" class="image fit thumb"
              ><img src="@/assets/img/thumbs/01.jpg" alt=""
            /></a>
            <h3>Magna sed consequat tempus</h3>
            <p>Lorem ipsum dolor sit amet nisl sed nullam feugiat.</p>
          </article>
          <article class="6u$ 12u$(xsmall) work-item">
            <a href="/assets/img/fulls/02.jpg" class="image fit thumb"
              ><img src="@/assets/img/thumbs/02.jpg" alt=""
            /></a>
            <h3>Ultricies lacinia interdum</h3>
            <p>Lorem ipsum dolor sit amet nisl sed nullam feugiat.</p>
          </article>
        </div>
      </section>
    </div>
  </body>
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