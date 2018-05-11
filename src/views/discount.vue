<template>
  <div class="container">
      <wxc-minibar title="服务券管理"
                   background-color="#FDB40A"
                   text-color="#FFFFFF"
                   right-text="返回"
                   @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                   @wxcMinibarRightButtonClicked="minibarRightButtonClick"></wxc-minibar>
        <list>
            <!-- 下拉刷新 -->
            <!-- <refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
                <text class="indicator-text" style="margin-top: 20px;">正在刷新</text>
                <loading-indicator class="indicator"></loading-indicator>
            </refresh> -->
            <cell>
                <div class="discount-list">
                    <div class="discount-cell" v-for="(item, index) in discountList" :key="index">
                        <div class="discount-content">
                            <div class="discount-name">
                                <text class="title">{{item.name}}</text>
                                <text class="eg">领取消耗{{item.energy}}能量</text>
                            </div>
                            <div class="type">
                                <text class="type-text">类型：{{item.type}}</text>
                            </div>
                            <div class="类型">
                                <text class="time-text">优惠券自领取之日起{{item.expirationDay}}天内有效</text>
                            </div>
                        </div>
                        <div class="delete" @click="deleteDiscount(item.id)"><text class="delete-text">删除</text></div>
                    </div>
                </div>
            </cell>
            <!-- 上拉加载 -->
            <!-- <loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
                <text class="indicator-text">{{loadingText}}</text>
                <loading-indicator class="indicator loading-indicator"></loading-indicator>
            </loading> -->
        </list>
        <div class="issue"><text class="issue-text" @click="add">新增服务券</text></div>
  </div>
</template>
<script>
import { WxcMinibar } from "weex-ui";
const modal = weex.requireModule("modal");
const storage = weex.requireModule("storage");
const stream = weex.requireModule("stream");
export default {
  components: { WxcMinibar },
  data() {
    return {
      discountList: [],
      refreshing: false,
      loadinging: false,
      loadingText: "正在加载...",
      userInfo: null
    };
  },
  created: function() {
    var that = this;
    storage.getItem("userInfo", e => {
      console.log(e);
      if (e.data == "undefined") {
        that.$router.push("login");
      } else {
        that.userInfo = JSON.parse(e.data);
        // 获取今日收益

        // 获取服务券
        that.getDiscount();
      }
    });
  },
  methods: {
    minibarLeftButtonClick() {
      this.$router.go(-1);
    },
    minibarRightButtonClick() {
      this.$router.go(-1);
    },
    add() {
      this.$router.push("discountAdd");
    },
    // 获取服务券
    getDiscount() {
      var that = this;
      var incomeUrl =
        that.baseUrl +
        "/app/business/coupon/list?hotelId=" +
        that.userInfo.resultContent.hotelId;
      stream.fetch(
        {
          method: "GET",
          url: incomeUrl,
          type: "json"
        },
        res => {
          console.log(res);
          if (res.data.resultCode == 200) {
            that.discountList = res.data.resultContent;
          } else {
            modal.toast({
              message: res.data.resultMsg,
              duration: 1
            });
          }
        }
      );
    },
    // 删除优惠券
    deleteDiscount(id) {
        var that = this;
      modal.confirm(
        {
          message: "是否删除该优惠券？",
          okTitle: "删除",
          cancelTitle: "取消"
        },
        function(result) {
          if (result == "删除") {
            var incomeUrl = that.baseUrl + "/app/business/coupon/del?couponId=" + id;
            stream.fetch(
              {
                method: "GET",
                url: incomeUrl,
                type: "json"
              },
              res => {
                console.log(res);
                if (res.data.resultCode == 200) {
                  modal.toast({
                    message: "删除成功",
                    duration: 0.3
                  });
                  that.getDiscount();
                } else {
                  modal.toast({
                    message: res.data.resultMsg,
                    duration: 1
                  });
                }
              }
            );
          }
        }
      );
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #f5f5f5;
  height: 1170px;
}
.discount-list {
  padding: 20px 30px;
  background-color: #f5f5f5;
  /* height: 1100px; */
  padding-bottom: 0;
}
.discount-cell {
  background-color: #fff;
  padding: 30px;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-width: 1px;
  border-color: #ccc;
}
.discount-content {
  width: 520px;
}
.discount-name {
  flex-direction: row;
  justify-content: space-between;
}
.title {
  font-size: 36px;
}
.eg {
  font-size: 26px;
  color: #666;
}
.time-text,
.type-text {
  font-size: 30px;
  color: #666;
  margin-top: 30px;
}
.type-text {
  margin-top: 60px;
}
.delete-text {
  color: red;
  font-size: 32px;
}
/* .refresh {
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
} */
.issue {
  border-top-width: 1px;
  border-top-color: #eee;
  background-color: #fff;
}
.issue-text {
  background-color: #fdb40a;
  color: #fff;
  height: 80px;
  line-height: 80px;
  width: 700px;
  margin-left: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  text-align: center;
  font-size: 30px;
}
</style>
