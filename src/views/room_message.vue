<template>
  <div>
      <wxc-minibar title="房间管理"
                   background-color="#FDB40A"
                   text-color="#FFFFFF"
                   right-text="返回"
                   @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                   @wxcMinibarRightButtonClicked="minibarRightButtonClick"></wxc-minibar>
  <div class="input">
    <wxc-searchbar ref="wxc-searchbar"
                       @wxcSearchbarCancelClicked="wxcSearchbarCancelClicked"
                       @wxcSearchbarInputReturned="wxcSearchbarInputReturned"
                       @wxcSearchbarInputOnInput="wxcSearchbarInputOnInput"
                       @wxcSearchbarCloseClicked="wxcSearchbarCloseClicked"
                       @wxcSearchbarInputOnFocus="wxcSearchbarInputOnFocus"
                       @wxcSearchbarInputOnBlur="wxcSearchbarInputOnBlur"></wxc-searchbar>
  </div>
  <list class="list">
    <!-- 下拉刷新 -->
        <refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
          <text class="indicator-text" style="margin-top: 20px;">正在刷新</text>
          <loading-indicator class="indicator"></loading-indicator>
        </refresh>
    <cell class="cell">
      <div class="room-list">
        <div class="room-cell" v-for="(list, index) in roomList" :key="index">
          <div class="room-message">
            <text class="room-message-content">房名：601</text>
            <text class="room-message-content">房型：标准大床房</text>
            <text class="room-message-content">床垫编号：897897897</text>
            <text class="room-message-content">备注：特价</text>
            <text class="room-message-content">上架</text>
          </div>
          <div class="price"><text class="price-text">188</text><text>元/晚</text></div>
          <div class="delete" @click="confirm()"><text class="delete-text">删除</text></div>
        </div>
      </div>
    </cell>
    <!-- 上拉加载 -->
      <loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
        <text class="indicator-text">{{loadingText}}</text>
        <loading-indicator class="indicator loading-indicator"></loading-indicator>
      </loading>
  </list>
  <div class="issue"><text class="issue-text" @click="add">发布房间</text></div>
  </div>
</template>
<script>
import { WxcMinibar, WxcSearchbar  } from 'weex-ui';
const modal = weex.requireModule('modal')
export default {
  components: { WxcMinibar, WxcSearchbar  },
  data() {
    return {
      roomList: [1, 2, 3, 4, 5, 6],
      refreshing: false,
      loadinging: false,
      loadingText: '正在加载...'
    }
  },
  methods: {
    minibarLeftButtonClick() {
      this.$router.go(-1)
    },
    minibarRightButtonClick() {
      this.$router.go(-1)
    },
    confirm(e) {
      modal.confirm({
        message: '确定要删除此房型吗？',
        okTitle: '确定',
        cancelTitle: '取消',
        color: 'red'
      }, function(result) {
        console.log(result);
        // if(result == '确定') {
          modal.toast({
            message: '点击了' + result
          })
        // }
      })
    },
    onrefresh (event) {
      this.refreshing = true
      setTimeout(() => {
        this.refreshing = false
      }, 2000)
    },
    onloading (event) {
      this.loadinging = true
      setTimeout(() => {
        this.loadinging = false
      }, 2000)
    },
    add() {
      this.$router.push('roomAdd');
    }
  }
}
</script>
<style scoped>
  .input {
    padding-bottom: 20px;
  }
  .list {
    width: 750px;
    height: 860px;
    background-color: #f5f5f5;
  }
  .cell {
    padding: 10px 0;
    background-color: #f5f5f5;
  }
  .room-cell {
    background-color: #fff;
    border-width: 1px;
    border-color: #eee;
    margin: 10px 20px;
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
  }
  .room-message-content {
    font-size: 28px;
    margin: 15px 0;
  }
  .price {
    flex-direction: row;
    align-items: flex-end;
    margin-top: 110px;
    margin-right: 150px;
  }
  .price-text {
    font-size: 70px;
    color: #FDB40A;
  }
  .delete {
    position: absolute;
    right: 0;
    top: 0;
  }
  .delete-text {
    background-color: red;
    color: #fff;
    height: 355px;
    width: 120px;
    text-align: center;
    line-height: 355px;
    font-size: 30px;
  }
  .issue {
    border-top-width: 1px;
    border-top-color: #eee;
  }
  .issue-text {
    background-color: #FDB40A;
    color: #fff;
    height: 80px;
    line-height: 80px;
    width: 700px;
    margin-left: 25px;
    margin-top: 20px;
    border-radius: 10px;
    text-align: center;
    font-size: 30px;
  }
  .refresh {
    background-color: #f5f5f5;
  }
  .indicator-text {
    color: #888888;
    font-size: 28px;
    text-align: center;
  }
  .indicator {
    margin-top: 10px;
    height: 40px;
    width: 40px;
    color: rgb(184, 184, 187);
    text-align: center;
    margin-left: 355px;
    margin-bottom: 10px;
  }
  .loading-indicator {
    margin-bottom: 20px;
  }
  .loading {
    background-color: #f5f5f5;
  }
</style>


