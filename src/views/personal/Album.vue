<template>
<div>
    <!-- 导航栏 -->
    <Navbar />
    <!-- 侧边栏容器 -->
    <Sidebar />

    <div class="main">
        <div>
            <el-row>
                <el-button @click="createAlbumDialogVisible = true">新建相册</el-button>
            </el-row>
        </div>
        <!-- 动态/相册展示 -->
        <section>
            <AlbumCard />
        </section>
    </div>

    <!-- dialog组件 -->
    <el-dialog title="新建相册" v-model="createAlbumDialogVisible">
        <el-form :model="form" label-width="80px">
            <el-form-item label="相册名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="相册简介" :label-width="formLabelWidth">
                <el-input type="text" maxlength="30" v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否公开" :label-width="formLabelWidth">
                <el-select v-model="form.isOpen" placeholder="请选择">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="createAlbumDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="createAlbumDialogVisible = false">确 定</el-button>
            </span>
        </template>
    </el-dialog>
</div>
</template>

<script>
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar.vue';
import AlbumCard from '@/components/AlbumCard';
export default {
  name: "PersonalAlbum",
  components: { Navbar, Sidebar,AlbumCard },
  data() {
    return {
      createAlbumDialogVisible: false,
      form: {},
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
</style>
