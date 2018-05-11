<template>
  <div class="container">
    <wxc-minibar title="管理" background-color="#FDB40A" text-color="#FFFFFF" left-button='none'></wxc-minibar>
    <list>
      <cell>
          <div class="ul">
              <div class="li" @click="jump('roomMessage')">
                  <image class='icon' src='../../static/img/1.png' />
                  <text class="li-text">房间管理</text>
              </div>
              <div class="li">
                  <image class='icon' src='../../static/img/2.png' />
                  <text class="li-text">房价管理</text>
              </div>
              <div class="li" @click="jump('discount')">
                  <image class='icon' src='../../static/img/3.png' />
                  <text class="li-text">服务券管理</text>
              </div>
              <div class="li">
                  <image class='icon' src='../../static/img/4.png' />
                  <text class="li-text">扫描核销</text>
              </div>
              <div class="li">
                  <image class='icon' src='../../static/img/5.png' />
                  <text class="li-text">评价管理</text>
              </div>
              <div class="li">
                  <image class='icon' src='../../static/img/6.png' />
                  <text class="li-text">财务管理</text>
              </div>
              <div class="li">
                  <image class='icon' src='../../static/img/7.png' />
                  <text class="li-text">定金管理</text>
              </div>
              <div class="li">
                  <image class='icon' src='../../static/img/8.png' />
                  <text class="li-text">活动管理</text>
              </div>
              <div class="li">
                  <image class='icon' src='../../static/img/9.png' />
                  <text class="li-text">照片管理</text>
              </div>
          </div>
          <div class="button" @click="logout"><text class="button-text">退出登录</text></div>
      </cell>
    </list>
    <tab-bar class="tabbar" :index='index'></tab-bar>
  </div>
</template>
<script>
import { WxcMinibar, WxcButton  } from 'weex-ui';
const modal = weex.requireModule('modal');
const storage = weex.requireModule('storage')

import tabBar from '../components/tabbar'
export default {
  components: {
    tabBar,
    WxcMinibar
  },
  data() {
    return {
      index: 2
    }
  },
  methods: {
    logout() {
        storage.removeItem('userInfo', event => {
            console.log(event)
        })
        this.$router.push('login');
    },
    jump(e) {
        this.$router.push(e);
    }
  }
}
</script>
<style scoped>
  .container {
    width: 750px;
    height: 1280px;
  }
  .tabbar {
    position: fixed;
    bottom: 100px;
  }
  .ul {
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 30px;
  }
  .li {
      width: 210px;
      height: 210px;
      margin-bottom: 30px;
      border-radius: 5px;
      background-color: #f5f5f5;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
  }
  .li-text {
      text-align: center;
      /* line-height: 210px; */
      font-size: 24px;
      margin-top: 20px;
  }
  .button-text {
      /* width: 750px; */
      height: 80px;
      background-color: #FDB40A;
      line-height: 80px;
      text-align: center;
      color: white;
      margin: 50px 30px;
      border-radius: 10px;
      font-size: 30px;
  }
  .icon {
      width: 60px;
      height: 60px;
  }
</style>


