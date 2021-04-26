<template>
<el-card shadow="hover" class="card-style" v-for="album in albums" :key="album">
    <el-image :src="album.cover"> </el-image>
    <div style="padding: 14px">
        <span>{{album.name}}</span>
        <div class="bottom">
            <span>{{album.introduction}}</span>
            <el-button type="text" class="button" @click="uploadDialogVisible = true">上传</el-button>
        </div>
    </div>
</el-card>
<el-dialog title="上传照片" v-model="uploadDialogVisible" width="60%">
    <div>只能上传 jpg/png 文件，一次性最多上传10张</div>
    <el-upload action="https://jsonplaceholder.typicode.com/posts/" ref="upload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" multiple :limit="10" :file-list="fileList" :auto-upload="false">
        <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog v-model="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <template #footer>
        <span class="dialog-footer">
            <el-button @click="uploadDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="uploadDialogVisible = false">确 定</el-button>
        </span>
    </template>
</el-dialog>
</template>

<script>
import {
    getCurrentInstance
} from "vue";
export default {
    components: {},
    data() {
        return {
            albums: [],
            currentDate: new Date(),
            uploadDialogVisible: false,
            dialogImageUrl: "",
            dialogVisible: false,
        };
    },
    beforeCreate() {
        const {
            ctx
        } = getCurrentInstance();
        //加载所有的相册
        ctx.$axios.post(ctx.$apiConfig.getUserAlbums.url, '')
            .then((res) => {
                //转数组
                let data = Object.values(res.data.albums);
                this.albums = data
                //获取相应的封面
                this.albums.forEach(album => {
                    ctx.$axios.post(ctx.$apiConfig.getThumbnail.url, {'url':album.cover}, {
                            responseType: 'blob'
                        })
                        .then((res) => {
                            let blob = new Blob([res.data], {
                                type: 'image/png'
                            })
                            album.cover = URL.createObjectURL(blob).toString()
                        })
                });
            })

    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
    },
};
</script>

<style scoped>
.card-style {
    margin-top: 10px;
    height: 100%;
    width: 300px;
    cursor: pointer;
}

.row-con {
    display: flex;
    flex-flow: row wrap;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
