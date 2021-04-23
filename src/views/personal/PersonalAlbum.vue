<template>
  <div>
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
      <a href="#" class="image avatar"
        ><img src="@/assets/img/avatar.jpg" alt=""
      /></a>
      <h1><strong>I am TFriend</strong>, a super simple web<br /></h1>
    </div>

    <div class="main">
      <!-- 动态/相册展示 -->
      <section>
        <el-row>
          <el-col
            :span="8"
            v-for="(o, index) in 2"
            :key="o"
            :offset="index > 0 ? 2 : 0"
          >
            <el-card shadow="hover" class="card-style" :body-style="{ padding:'0px'}">
              <el-image :src="url" :preview-src-list="srcList"> </el-image>
              <div style="padding: 14px">
                <span>好吃的汉堡</span>
                <div class="bottom">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <!-- 第二行 -->
          <el-col
            :span="8"
            v-for="(o, index) in 2"
            :key="o"
            :offset="index > 0 ? 2 : 0"
          >
            <el-card shadow="hover" class="card-style" :body-style="{ padding:'0px'}">
              <el-image :src="url" :preview-src-list="srcList"> </el-image>
              <div style="padding: 14px">
                <span>好吃的汉堡</span>
                <div class="bottom">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalAlbum",
  components: {},
  data() {
    return {
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ],
      currentDate: new Date(),
    };
  },
};
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.card-style {
  margin-top: 10px;
}
</style>
