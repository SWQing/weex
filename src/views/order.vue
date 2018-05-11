<template>
<div style="height: 1180px;">
  <wxc-minibar title="订单管理"
                   background-color="#FDB40A"
                   text-color="#FFFFFF"
                   left-button='none'></wxc-minibar>
    <div class="header">
      <div class="search">
        <input class="input" type="text"  autofocus='false' placeholder="输入订单号/手机号/姓名/身份证号查找" />
        <text class="search-text">搜索</text>
      </div>
    </div>
  <wxc-tab-page ref="wxc-tab-page" :tab-titles="tabTitles" :tab-styles="tabStyles" title-type="icon" :tab-page-height="tabPageHeight" @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
    <list v-for="(item, index) in [1, 2, 3, 4]" :key="index"  class="item-container" :style="{ height: (tabPageHeight - tabStyles.height - 220) + 'px' }">
      <!-- 下拉刷新 -->
      <refresh @refresh="onrefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
        <text class="indicator-text">正在刷新 ...</text>
        <loading-indicator class="indicator"></loading-indicator>
      </refresh>
      <cell>
        <div v-for="(list, subindex) in allOrderList" :key="subindex">
          <div class="all-cell">
            <div class="orderMessage">
              <div class="name"><text class="orderMsg-text">预约人：{{list.memberName}}</text></div>
              <div class="phone"><text class="orderMsg-text">手机号：{{list.memberPhone}}</text></div>
              <div class="id"><text class="orderMsg-text">证件号：{{list.identityNumber}}</text></div>
              <div class="message"><text class="orderMsg-text">入住信息： {{list.roomNumber}}间房（{{list.days}}天）</text></div>
              <div><text class="orderMsg-text">下单时间：{{list.createDate | formatDate}}</text></div>
              <div><text class="orderMsg-text">预约人入住时间：{{list.liveDate | formatDate}}</text></div>
            </div>
            <div class="dispose">
              <div class="orderId"><text class="orderMsg-text">订单号：{{list.sn}}</text></div>
              <div class="disposePeople"><text class="orderMsg-text">接单人： {{list.receiptBusiness}}</text></div>
              <div v-if="list.status == 'wait'" class="toDispose"><text class="orderMsg-text button">待付款</text></div>
              <div v-if="list.status == 'ready'" class="toDispose"><text class="orderMsg-text button">接单</text></div>
              <div v-if="list.status == 'write'" class="toDispose"><text class="orderMsg-text button">去核销</text></div>
              <div v-if="list.status == 'evaluate'" class="toDispose"><text class="orderMsg-text button">待评价</text></div>
              <div v-if="list.status == 'cancel'" class="toDispose"><text class="orderMsg-text button">已取消</text></div>
              <div v-if="list.status == 'success'" class="toDispose"><text class="orderMsg-text button">已成功</text></div>
            </div>
          </div>
        </div>
            
      </cell>
      <!-- 上拉加载 -->
      <loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
        <text class="indicator-text">{{loadingText}}</text>
        <loading-indicator class="indicator loading"></loading-indicator>
      </loading>
    </list>
  </wxc-tab-page>
  <tab-bar class="tabbar" :index='childIndex'></tab-bar>
</div>
  
</template>

<style scoped>
.search {
    flex-direction: row;
    justify-content: center;
    margin: 20px;
  }
  .input {
    width: 580px;
    border-width: 1px;
    border-color: #ccc;
    border-radius: 50px;
    height: 60px;
    padding: 10px 20px;
    font-size: 28px;
  }
  .search-text {
    width: 100px;
    font-size: 32px;
    /* border-width: 1px; */
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #666;
  }
  .item-container {
    width: 750px;
    background-color: #f2f3f4;
  }

  .content{
    width:750px;
    height:300px;
    border-bottom-width:1px;
    align-items: center;
    justify-content: center;
  }

  .all-cell {
    padding: 20px;
    border-width: 1px;
    border-color: #ccc;
    background-color: #fff;
    margin: 10px 0;
  }
  .orderMsg-text {
    font-size: 28px;
    margin: 15px 10px;
  }
  .dispose {
    border-top-width: 1px;
    border-top-color: #ccc;
    position: relative;
  }
  .toDispose {
    width: 200px;
    height: 60px;
    position: absolute;
    right: 30px;
    bottom: 0;
    background-color: rgb(245, 190, 87);
    border-radius: 15px;
  }
  .button {
    color: #fff;
    text-align: center;
    margin: 14px 0 0 0 ;
    border-radius: 15px;
  }
  .header {
    flex-direction: row;
    justify-content: space-around;
  }
  .date {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .search {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .input {
    /* width: 341px; */
    height: 59px;
    font-size: 20px;
    background-color: #fff;
    border-radius: 100px;
    padding-left: 30px;
  }
  .item-container {
    padding: 0 20px;
  }
  .indicator-text {
    color: #888888;
    font-size: 28px;
    text-align: center;
    margin-top: 20px;
  }
  .indicator {
    margin-top: 16px;
    height: 40px;
    width: 40px;
    color: rgb(184, 184, 187);
    text-align: center;
    margin-left: 335px;
    margin-bottom: 10px;
  }
  .loading {
    margin-bottom: 30px;
  }
  .tabbar {
    position: fixed;
    bottom: 0;
  }
</style>
<script>
  const dom = weex.requireModule('dom');
  var modal = weex.requireModule('modal');
  var storage = weex.requireModule('storage');
  var stream = weex.requireModule('stream');
  var navigator = weex.requireModule('navigator')
  import { WxcTabPage, WxcPanItem, Utils, BindEnv } from 'weex-ui';
  import { WxcSearchbar, WxcMinibar } from 'weex-ui'
  import Config from '../tabPage'
  import { WxcPageCalendar } from 'weex-ui';
  import tabBar from '../components/tabbar'

  export default {
    components: { 
      WxcTabPage, WxcPanItem, WxcSearchbar, WxcPageCalendar,WxcMinibar,
      tabBar
    },
    data: () => ({
      childIndex: 1,
      tabTitles: Config.tabTitles,
      tabStyles: Config.tabStyles,
      tabList: [],
      demoList: [1, 2, 3, 4, 5, 6, 7, 8],
      tabPageHeight: 1334,
      hotelList: [1, 2, 3, 4, 5, 6],
      descList: [],
      refreshing: false,
      loadinging: false,
      loadingText: '正在加载 ...',
      userInfo: null,
      selectedPage: 0,
      allOrderList: [],
      pageSize: 3,
      pageNumber: 1,
    }),
    created () {
      var that = this;
      this.tabPageHeight = Utils.env.getPageHeight() -110;
      // 获取用户信息
      storage.getItem('userInfo', (e) => {
        console.log(e);
        if(e.data == 'undefined') {
          that.$router.push('login');
        } else {
          that.userInfo = JSON.parse(e.data);
          let url = '';
          this.getOrder(url, 'created');
        }
      })
    },
    methods: {
      wxcTabPageCurrentTabSelected (e) {
        const self = this;
        const index = e.page;
      },
      wxcPanItemPan (e) {
        if (BindEnv.supportsEBForAndroid()) {
          this.$refs['wxc-tab-page'].bindExp(e.element);
        }
      },
       // 获取订单列表方法
    getOrder(status, type) {
      let that = this;
      let orderUrl = that.baseUrl + '/app/business/order/list/status?hotelId=' + that.userInfo.resultContent.hotelId + status + '&pageNumber=' + that.pageNumber + '&pageSize=' + that.pageSize;
      stream.fetch({
          method: 'GET',
          url: orderUrl,
          type: 'json'
        }, (res) => {
          console.log(status)
          console.log(type)
          console.log(orderUrl)
          console.log(res.data)
          if(res.data.resultCode == 200) {
              if(type == 'created') {
                that.allOrderList = res.data.resultContent;
              } else if(type == 'refresh') {
                that.allOrderList = res.data.resultContent;
                this.refreshing = false
                modal.toast({ message: '刷新成功', duration: 0.3 })
              } else if(type == 'loading' && res.data.resultContent.length == 0){
                modal.toast({ message: '没有更多数据了~', duration: 0.3 })
              this.loadinging = false
              } else {
                that.allOrderList = that.allOrderList.concat(res.data.resultContent);
                this.loadinging = false
              }
              
              // that.income = res.data.resultContent;
          } else {
            modal.toast({
              message: res.data.resultMsg,
              duration: 0.3
            })
          }
        })
    },
    wxcTabPageCurrentTabSelected (e) {
      let that = this;
      let index = e.page;
      this.pageNumber = 1;
      console.log(e);
      /* Unloaded tab analog data request */
      that.selectedPage = e.page;
      let url = '';
      if(that.selectedPage == 0) {
        url = ''
      } else if(that.selectedPage == 1) {
        url = '&status=wait';
      } else if(that.selectedPage == 2) {
        url = '&status=write';
      } else {
        url = '&status=success';
      }
      this.getOrder(url, 'created');
    },
    // 下拉刷新
    onrefresh (event) {
      let that = this;
      this.refreshing = true
      this.pageNumber = 1;
      let url = '';
      if(that.selectedPage == 0) {
        url = ''
      } else if(that.selectedPage == 1) {
        url = '&status=wait';
      } else if(that.selectedPage == 2) {
        url = '&status=write';
      } else if(that.selectedPage == 3) {
        url = '&status=success';
      }
      this.getOrder(url, 'refresh');
    },
      // 上拉加载
    onloading (event) {
      let that = this;
      // modal.toast({ message: 'Loading', duration: 1 })
      this.loadinging = true
      this.pageNumber ++;
      let url = '';
      if(that.selectedPage == 0) {
        url = ''
      } else if(that.selectedPage == 1) {
        url = '&status=wait';
      } else if(that.selectedPage == 2) {
        url = '&status=write';
      } else {
        url = '&status=success';
      }
      this.getOrder(url, 'loading');
    }
    }
  };
</script>
