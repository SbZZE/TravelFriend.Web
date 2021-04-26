<template>
<el-card shadow="hover" class="card-style" v-for="album in albums" :key="album">
    <el-image :src="album.cover"> </el-image>
    <div style="padding: 14px">
        <span>{{album.name}}</span>
        <div class="bottom">
            <span>{{album.introduction}}</span>
            <el-button type="text" class="button" @click="openUploadDialog(album.ID)">上传</el-button>
        </div>
    </div>
</el-card>
<el-dialog title="上传照片" v-model="uploadDialogVisible" width="60%">
    <div>只能上传 jpg/png 文件，一次性最多上传10张</div>
    <el-upload action="" ref="upload" list-type="picture-card" :on-preview="handlePictureCardPreview" :http-request="uploadRequest" multiple :limit="10" :auto-upload="false">
        <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog v-model="previewDialogVisible">
        <img width="100%" :src="previewDialogImageUrl" alt="" />
    </el-dialog>
    <template #footer>
        <span class="dialog-footer">
            <el-button @click="closeUploadDialog">取 消</el-button>
            <el-button type="primary" @click="submitUpload">开始上传</el-button>
        </span>
    </template>
</el-dialog>
</template>

<script>
import {getCurrentInstance} from "vue";
export default {
    components: {},
    data() {
        return {
            albums: [],
            currentAlbumId: '',
            uploadDialogVisible: false,
            previewDialogImageUrl: "",
            previewDialogVisible: false,
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
        //打开上传弹窗
        openUploadDialog(albumId){
            this.currentAlbumId = albumId
            this.uploadDialogVisible = true;
        },
        //关闭上传弹窗
        closeUploadDialog(){
            //先将上传的列表清空
            this.$refs.upload.clearFiles();
            this.uploadDialogVisible = false;
        },
        //上传图片点击预览
        handlePictureCardPreview(file) {
            this.previewDialogImageUrl = file.url;
            this.previewDialogVisible = true;
        },
        //自定义上传请求
        uploadRequest(e){
            //自定义的上传请求，上传到ali-oss（这里是每张图片都会进到这里上传一次）
            let file = e.file
            //1.请求后端拿到oss验证信息
            this.$axios.post(this.$apiConfig.getUploadKey.url, {'name':file.name})
                .then((res)=>{
                    if (res.status != 200 || res.data.status != 200){
                        return
                    }

                    let oss = require('ali-oss')
                    let client = new oss({
                        region: res.data.region,
                        accessKeyId: res.data.accessKeyId,
                        accessKeySecret: res.data.accessKeySecret,
                        bucket: res.data.bucket
                    })
                    let currentUrl = res.data.url
                    client.put(currentUrl, file).then(({res,url}) => {
                        if (res && res.status == 200) {
                            //上传成功
                            console.log('阿里云OSS上传文件成功回调', currentUrl);
                            //2.上传成功给服务端回调
                            let data = {'albumId':this.currentAlbumId,'isVideo':false,'url':currentUrl}
                            this.$axios.post(this.$apiConfig.uploadMediaSuccess.url, data)
                                .then((res)=>{
                                    this.$refs.upload.handleRemove(file)
                                })
                        }
                    }).catch((err) => {
                        console.log('阿里云OSS上传文件失败回调', err);
                    });
                    
                })
        },
        //提交上传
        submitUpload(){
            this.$refs.upload.submit();
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
