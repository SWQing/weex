<template>
  <div>
    <wxc-loading :show="isShow" type="default" interval='0' loading-text=''></wxc-loading>
      <wxc-minibar title="登录"
                   background-color="#FDB40A"
                   text-color="#FFFFFF"
                   left-button='none'></wxc-minibar>
      <div class="form">
        <div class="phone">
          <text class="form-text">手机号：</text>
          <input class="form-input" maxlength="11" autofocus='false' type="number" @input='inputPhone' :value="phone" />
        </div>
        <div class="code">
          <text class="form-text">验证码：</text>
          <input class="form-input code-input" type="text" @input='inputCode' :value="code" />
          <text class="getCode" @click="getCode">{{getCodeText}}</text>
        </div>
        <div class="button" @click="login"><text class="button-text">登录</text></div>
      </div>
      <div class="otherLogin">
        <div class="otherLogin-title">
          <text class="title-line title"></text>
          <text class="title-text title">微信账号登录</text>
          <text class="title-line title"></text>
        </div>
        <div class="otherLogin-icon">
          <image src='' />
        </div>
      </div>
      <!-- <router-view></router-view> -->
  </div>
</template>
<style scoped>
  .form {
    margin-top: 200px;
  }
  .form-text {
    font-size: 28px;
    width: 120px;
    height: 50px;
    line-height: 50px;
  }
  .form-input {
    font-size: 28px;
    width: 500px;
    height: 50px;
    border-bottom-width: 1px;
  }
  .code-input {
    width: 300px;
  }
  .getCode {
    width: 200px;
    border-width: 1px;
    height: 50px;
    line-height: 50px;
    border-radius: 10px;
    text-align: center;
  }
  .phone, .code {
    flex-direction: row;
    justify-content: center;
    margin: 30px 0;
  }
  .button {
    width: 325px;
    height: 80px;
    background-color: #FDB40A;
    margin: 0 auto;
    border-radius: 10px;
    margin-left: 215px;
    margin-top: 80px;
  }
  .button-text {
    color: #fff;
    text-align: center;
    line-height: 80px;
    font-size: 30px;
  }
  .otherLogin {
    margin-top: 300px;
  }
  .otherLogin-title {
    padding: 0 55px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .title {
    width: 200px;
  }
  .title-text {
    text-align: center;
  }
  .title-line {
    width: 180px;
    height: 2px;
    background-color: #999;
  }
</style>

<script>
var stream = weex.requireModule('stream');
const storage = weex.requireModule('storage')
import { WxcMinibar, WxcButton, WxcLoading } from 'weex-ui';
const modal = weex.requireModule('modal');
export default {
  components: { 
    WxcMinibar,
    WxcLoading
  },
  data() {
    return {
      getCodeText: '获取验证码',
      phone: '',
      code: '',
      isShow: false
    }
  },
  methods: {
    // 获取输入的手机号
    inputPhone(e) {
      this.phone = e.value.replace()
    },
    // 获取输入的验证码
    inputCode(e) {
      this.code = e.value
    },
    // 获取验证码
    getCode() {
      console.log(1);
      console.log(this.phone);
      let that = this;
      if(this.getCodeText == '获取验证码') {
        let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        let phone = this.phone;
        if(!reg.exec(phone)) {
          modal.toast({
            message: '请输入正确的手机号',
            duration: 0.3
          })
        } else {
          let num = 60;
          that.getCodeText = '已发送（' + num + 's）';
          let timer = setInterval(function() {
            // console.log(num);
            num --;
            that.getCodeText = '已发送（' + num + 's）';
          }, 1000)
          setTimeout(function() {
            that.getCodeText = '获取验证码';
              clearInterval(timer);
          }, 60000)
          let GET_URL_JSONP = this.baseUrl + '/app/business/sendMsgCode?mobile=' + this.phone;
          stream.fetch({
            method: 'GET',
            url: GET_URL_JSONP,
            type: 'jsonp'
          }, function(res) {
            console.log(res);
            // modal.toast({
            //   message: res.data.resultMsg,
            //   duration: 3
            // })
          }, function(res) {
            console.log(res);
          })
        }
      }
    },
    //登录
    login() {
      this.isShow = true;
      var that = this;
      var GET_URL_JSONP = this.baseUrl  + '/app/business/login?mobile=' + this.phone + '&massageCode=' + this.code;
      stream.fetch({
          method: 'POST',
          url: GET_URL_JSONP,
          type: 'json'
        }, function(res) {
          console.log(res);
          console.log(res.data);
          // modal.toast({
          //   message: res.data.resultMsg,
          //   duration: 1
          // })
          if(res.status == 200 && res.data.resultCode == 200) {
            storage.setItem('userInfo', res.data, (event) => {
              console.log(event);
            })
            setTimeout(function() {
              that.isShow = false;
              that.$router.push('receiveOrder');
            }, 1000)
          } else {
            that.isShow = false;
            modal.toast({
              message: res.data.resultMsg,
              duration: 1
            })
          }
        }, function(res) {
          // console.log(res);
        })
    }
  }
}
</script>
