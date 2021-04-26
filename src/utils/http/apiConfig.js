export default {
    // 账号注册
    accountRegister: {
        method: 'POST',
        url: 'api/v1/account/register'
    },
    // 账号登陆
    accountLogin: {
        method: 'POST',
        url: 'api/v1/account/login'
    },
    // 获取用户信息
    getUserInfo: {
        method: 'POST',
        url: 'api/v1/user/info/get'
    },
    // 更新用户信息
    updateUserInfo: {
        method: 'POST',
        url: 'api/v1/user/info/update'
    },
    // 获取用户头像
    getUserAvatar: {
        method: 'POST',
        url: 'api/v1/user/avatar/get'
    },
    // 获取用户所有相册
    getUserAlbums: {
        method: 'POST',
        url: 'api/v1/user/album/albums'
    },
    // 获取缩略图
    getThumbnail: {
        method: 'POST',
        url: 'api/v1/user/album/thumbnail/get'
    },
    // 获取上传凭证
    getUploadKey: {
        method: 'POST',
        url: 'api/v1/user/album/upload/key/get'
    },
    // 文件上传成功回调
    uploadMediaSuccess: {
        method: 'POST',
        url: 'api/v1/user/album/upload/media/success'
    },
}