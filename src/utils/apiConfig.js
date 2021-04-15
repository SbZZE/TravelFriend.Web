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
}