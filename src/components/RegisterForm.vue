<template>
<el-form ref="registerForm" :model="registerUser" :rules="registerRules" label-width="100px" class="registerForm sign-up-form">
    <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerUser.email" placeholder="输入邮箱"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input v-model="registerUser.password" type="password" placeholder="输入密码"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="registerUser.confirmPassword" type="password" placeholder="再次输入密码"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button @click="handleRegister('registerForm')" type="primary" class="submit-btn">注册</el-button>
    </el-form-item>
</el-form>
</template>

<script lang="ts">
import { ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
export default {
  props: {
    registerUser: {
      type: Object,
      required: true,
    },
    registerRules: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
    // @ts-ignore
    const { ctx } = getCurrentInstance();
    const router = useRouter();

    const handleRegister = (formName: string) => {
      ctx.$refs[formName].validate((valid: boolean) => {
        if (valid) {
          console.log(ctx.$apiConfig.accountRegister)
          ctx.$axios.post(ctx.$apiConfig.accountRegister.url,
          props.registerUser
          ).then((res: any) => {
            console.log(res)
            if(res.data.status === 200)
            {
              //注册成功
            ctx.$message({
              message: "注册成功",
              type: "success",
            });
            //路由跳转
            router.push("/home");
            }else {
              //注册失败
              ctx.$message({
                message: res.data.message,
                type: "error",
              })
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    return { handleRegister };
  },
};
</script>

<style scoped>
/* register */
.registerForm {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px 40px 20px 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px #cccc;
}

.submit-btn {
    width: 100%;
}
</style>
