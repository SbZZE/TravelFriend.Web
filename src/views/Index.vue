<template>
  <head>
    <title>首页</title>
  </head>
  <body>
    <!-- 导航栏 -->
    <Navbar />

    <!-- 侧边栏容器 -->
    <Sidebar />
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
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar.vue';
export default {
    name: "Index",
    components: { Navbar, Sidebar },
    data(){
        return {
            
        }
    },
}
</script>

<style scoped>
</style>