<template>
<!-- 侧边栏容器 -->
    <div class="sidebar">
        <div class="block"><el-avatar :size="150" :src="url"></el-avatar></div>
		<h1><strong>I am TFriend</strong>, a super simple web<br /></h1>
    </div>
</template>

<script lang="ts">
import { ref, getCurrentInstance } from "vue";
export default {
    setup() {
        
    },
    data(){
        return {
            url:''
        }
    },
    beforeCreate() {
        //@ts-ignore
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