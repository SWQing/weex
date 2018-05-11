<template>
  <div class="container">
    <wxc-minibar title="接单"
                   background-color="#FDB40A"
                   text-color="#FFFFFF"
                   left-button='none'></wxc-minibar>
    <list>
      <!-- 下拉刷新 -->
        <refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
          <text class="indicator-text" style="margin-top: 20px;">正在刷新</text>
          <loading-indicator class="indicator"></loading-indicator>
        </refresh>
      <cell>
        <div class="data">
          <div class="orderNum data-div">
            <text class="orderNum-text-top data-num">{{income.count}}</text>
            <text class="orderNum-text-bottom data-text">今日接单数</text>
          </div>
          <div class="receiveMoney data-div">
            <text class="receiveMoney-text-top data-num">{{income.amount}}</text>
            <text class="receiveMoney-text-bottom data-text">今日已收房款</text>
          </div>
          <div class="unReceiveMoney data-div">
            <text class="unReceiveMoney-text-top data-num">{{income.writeAmount}}</text>
            <text class="unReceiveMoney-text-bottom data-text">未核销房款</text>
          </div>
        </div>
        <div class="title"><text class="title-text">未处理的新订单</text></div>
        <div class="newOrderList">
          <div v-for="(item, index) in newOrder" :key="index" class="newOrder-cell">
            <div class="orderType">
              <div class="type orderType-div orderList-text">
                <text class="type-text orderType-div-text">房型：{{item.roomName}}</text>
                <text class="price-text orderType-div-text">￥{{item.price}}/预付</text>
              </div>
              <div class="date orderType-div orderList-text">
                <text class="date1-text orderType-div-text">入离时间：{{item.liveDate | formatDate}}至{{item.leaveDate | formatDate}}</text>
                <text class="date2-text orderType-div-text">{{item.days}}晚{{item.roomNumber}}间</text>
              </div>
            </div>
            <div class="orderId">
              <div class="people">
                <text class="type-text people-div orderList-text">预约人：{{item.memberName}}</text>
                <text class="price-text people-div orderList-text">手机号：{{item.memberPhone}}</text>
                <text class="date1-text people-div orderList-text">订单号：{{item.sn}}</text>
                <text class="date2-text people-div orderList-text">下单时间：{{item.createDate | formatDate}}</text>
              </div>
              <div class="button">
                <text class="refuse button-div" @click="refuse(item.sn)">拒绝</text>
                <text class="receive button-div" @click="agree(item.sn)">接单</text>
              </div>
            </div>
          </div>
        </div>
      </cell>
      <!-- 上拉加载 -->
      <loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
        <text class="indicator-text">{{loadingText}}</text>
        <loading-indicator class="indicator loading-indicator"></loading-indicator>
      </loading>
    </list>
    <tab-bar class="tabbar" :index='index'></tab-bar>
  </div>
</template>
<script>
const storage = weex.requireModule('storage')
const stream = weex.requireModule('stream')
const modal = weex.requireModule('modal');
import {formatDate} from '../common/date.js'
import tabBar from '../components/tabbar'
import { WxcMinibar } from 'weex-ui';
export default {
  components: {
    tabBar,WxcMinibar 
  },
  data() {
    return {
      index: 0,
      newOrder: [],
      userInfo: null,
      income: {
        amount: 0,
        count: 0.00,
        writeAmount: 0.00
      },
      pageNumber: 1,
      pageSize: 3,
      refreshing: false,
      loadinging: false,
      loadingText: '正在加载...'
    }
  },
  created() {
    var that = this;
    storage.getItem('userInfo', (e) => {
      console.log(e);
      if(e.data == 'undefined') {
        that.$router.push('login');
      } else {
        that.userInfo = JSON.parse(e.data);
        console.log(that.userInfo.resultContent);
        // 获取今日收益
        that.getOrderMessage();
        // 获取未处理订单列表
        that.getOrder('created');
      }
    })
  },
  methods: {
    // 获取今日收益
    getOrderMessage() {
      var that = this;
      var incomeUrl = that.baseUrl + '/app/business/order/income/today?hotelId=' + that.userInfo.resultContent.hotelId;
      stream.fetch({
        method: 'GET',
        url: incomeUrl,
        type: 'json'
      }, (res) => {
        console.log(res)
        if(res.data.resultCode == 200) {
          that.income = res.data.resultContent;
        } else {
          modal.toast({
            message: res.data.resultMsg,
            duration: 1
          })
        }
      })
    },
    // 获取订单列表方法
    getOrder(type, msg) {
      var that = this;
      var orderUrl = that.baseUrl + '/app/business/order/list/status?hotelId=' + that.userInfo.resultContent.hotelId + 
        '&status=ready&pageNumber=' + that.pageNumber + '&pageSize=' + that.pageSize;
      stream.fetch({
          method: 'GET',
          url: orderUrl,
          type: 'json'
        }, (res) => {
          console.log(res.data)
          if(res.data.resultCode == 200) {
            if(res.data.resultContent.length == 0) {
              modal.toast({ message: '没有更多数据了~', duration: 0.3 })
              this.loadinging = false
            } else {
              if(type == 'created') {
                that.newOrder = res.data.resultContent;
              } else if(type == 'refresh') {
                that.newOrder = res.data.resultContent;
                this.refreshing = false
                modal.toast({ message: msg, duration: 0.3 })
              } else {
                that.newOrder = that.newOrder.concat(res.data.resultContent);
                this.loadinging = false
              }
              
              // that.income = res.data.resultContent;
            }
          } else {
            modal.toast({
              message: res.data.resultMsg,
              duration: 0.3
            })
          }
        })
    },
    // 订单处理
    processOrder(url) {
      stream.fetch({
        method: 'GET',
        url: url,
        type: 'json'
      }, res => {
        console.log(res)
        if(res.data.resultCode == 200) {
          modal.toast({
            message: res.data.resultMsg,
            duration: 0.3
          })
          this.getOrder('created');
        } else {
          modal.toast({
            message: res.data.resultMsg,
            duration: 0.3
          })
        }
      })
    },
    // 下拉刷新
    onrefresh (event) {
      this.refreshing = true
      this.pageNumber = 1;
      this.getOrder('refresh', '刷新成功');
    },
    // 上拉加载
    onloading (event) {
      // modal.toast({ message: 'Loading', duration: 1 })
      this.loadinging = true
      this.pageNumber ++;
      this.getOrder('loading');
      this.getOrderMessage();
    },
    // 接单
    agree(e) {
      console.log(e);
      var businessId = this.userInfo.resultContent.id
      var url = this.baseUrl + '/app/business/order/receive?sn=' + e + '&businessId=' + businessId;
      this.processOrder(url);
    },
    // 拒绝
    refuse(e) {
      console.log(e);
      var businessId = this.userInfo.resultContent.id
      var url = this.baseUrl + '/app/business/order/refuse?sn=' + e + '&businessId=' + businessId;
      this.processOrder(url);
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>
<style scoped>
  .container {
    width: 750px;
    height: 1280px;
    padding-bottom: 200px;
  }
  .tabbar {
    position: fixed;
    bottom: 100px;
  }
  .data {
    flex-direction: row;
    height: 150px;
  }
  .data-div {
    width: 250px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .data-num {
    font-size: 38px;
    font-weight: bold;
  }
  .data-text {
    font-size: 28px;
    font-weight: 400;
    margin-top: 10px;
  }
  .title {
    width: 750px;
    border-bottom-width: 1px;
    border-bottom-color: #ccc;
    padding: 5px;
    margin-top: 20px;
  }
  .title-text {
    text-align: center;
    font-size: 30px;
    color: #666;
  }
  .newOrderList {
    background-color: #f5f5f5;
  }
  .newOrder-cell {
    background-color: #fff;
    border-width: 1px;
    border-color: #ccc;
    margin: 10px 20px;
    padding: 20px;
  }
  .orderType-div {
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
  }
  .orderType-div-text {
    font-size: 28px;
  }
  .orderId {
    margin-top: 30px;
    border-top-width: 1px;
  }
  .people-div {
    margin: 10px 0;
  }
  .orderList-text {
    margin: 15px 10px;
    font-size: 28px;
  }
  .button {
    flex-direction: row;
    justify-content: space-around;
  }
  .button-div {
    width: 200px;
    height: 60px;
    line-height: 60px;
    background-color: rgb(245, 190, 87);
    text-align: center;
    margin-top: 30px;
    color: #fff;
    border-radius: 15px;
    font-size: 28px;
  }
  .refresh {
    background-color: #f5f5f5;
  }
  .indicator-text {
    color: #888888;
    font-size: 28px;
    text-align: center;
    /* margin-top: 20px; */
  }
  .indicator {
    margin-top: 16px;
    height: 40px;
    width: 40px;
    color: rgb(184, 184, 187);
    text-align: center;
    margin-left: 355px;
    margin-bottom: 20px;
  }
  .loading-indicator {
    margin-bottom: 40px;
  }
  .loading {
    background-color: #f5f5f5;
  }
</style>


