<template>
    <el-row :gutter="20" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0" class="row-con">
          <el-col
            :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0"
          >
            <el-card shadow="hover" class="card-style" :body-style="{ padding:'0px'}">
              <el-image :src="url" :preview-src-list="srcList"> </el-image>
              <div style="padding: 14px">
                <span>好吃的汉堡</span>
                <div class="bottom">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button">上传</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
</template>
<script>
export default {
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
}
</script>
<style scoped>
.card-style {
  margin-top: 10px;
  height: 100%;
}
.row-con {
  display: flex;
  flex-flow: row wrap;
}
</style>