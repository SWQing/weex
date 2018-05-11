<template>
  <div class="container">
      <wxc-minibar title="新增服务券"
                   background-color="#FDB40A"
                   text-color="#FFFFFF"
                   right-text="返回"
                   @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                   @wxcMinibarRightButtonClicked="minibarRightButtonClick"></wxc-minibar>
      <list>
        <cell class="cell">
          <div class="name">
            <text class="name-title">服务名称</text>
            <input class="name-input" type="text" @input="getName" placeholder="请输入服务名称（如游泳）" />
            
          </div>
          <div class="type">
            <text class="type-title">优惠类型</text>
            <wxc-radio class="radio" :list="list" @wxcRadioListChecked="wxcRadioListChecked"></wxc-radio>
          </div>
          <div class="discount-content">
            <div class="discount-list" v-if="selected == 0"></div>
            <div class="discount-list" v-if="selected == 1">
               <div class="name">
                <text class="name-title">输入折扣</text>
                <input class="name-input discount-number input" @input="getdiscountNumber" type="text" placeholder="请输入折扣" />
                <text style="font-size: 30px;margin-left: 30px;">折</text>
              </div>
            </div>
            <div class="discount-list" v-if="selected == 2">
              <div class="energy">
                <text class="energy-title discount-title">优惠条件（元）</text>
                <input class="energy-input discount-input input" @input="getdiscountCondition" type="text" placeholder="请输入金额" />
              </div>
              <div class="energy">
                <text class="energy-title discount-title">优惠金额（元）</text>
                <input class="energy-input discount-input input" @input="getdiscountMoney" type="text" placeholder="请输入金额" />
              </div>
            </div>
          </div>
          <div class="date">
            <text class="date-title">可用时间</text>
            <wxc-stepper class="date-step" min="2" @wxcStepperValueChanged="getexpirationDay"></wxc-stepper>
          </div>
          <div class="energy">
            <text class="energy-title">领取消耗能量</text>
            <input class="energy-input" @input="getEnergy" type="text" placeholder="能量值" />
          </div>
          <div class="isDelete">
            <text class="isDelete-title">过期自动删除</text>
            <switch class="switch"></switch>
          </div>
          <div>
            <text class="upload" @click="upload">上传新增</text>
          </div>
        </cell>
      </list>
  </div>
</template>
<script>
import { WxcMinibar, WxcRadio, WxcStepper } from "weex-ui";
const modal = weex.requireModule("modal");
const stream = weex.requireModule("stream");
const storage = weex.requireModule("storage");
export default {
  components: { WxcMinibar, WxcRadio, WxcStepper },
  data() {
    return {
      list: [
        { title: '体验券', value: 1, checked: true },
        { title: '折扣券', value: 2 },
        { title: '满减券', value: 3 }
      ],
      selected: 0,
      userInfo: null,
      name: '',
      energy: '',
      expirationDay: 1,
      discountsCondition: '',
      amount: '',
      discount: ''
    }
  },
  created: function() {
    var that = this;
    storage.getItem("userInfo", e => {
      console.log(e);
      if (e.data == "undefined") {
        that.$router.push("login");
      } else {
        that.userInfo = JSON.parse(e.data);
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
    wxcRadioListChecked (e) {
      var that = this;
      // this.checkedInfo = e;
      this.discount = '';
      this.discountsCondition = '';
      this.amount = '';
      console.log(e);
      this.selected = e.index;
    },
    // 获取名字
    getName(e) {
      this.name = e.value;
    },
    // 获取折扣
    getdiscountNumber(e) {
      this.discount = e.value
    },
    // 获取优惠条件
    getdiscountCondition(e) {
      this.discountsCondition = e.value;
    },
    // 获取优惠金额
    getdiscountMoney(e) {
      this.amount = e.value;
    },
    // 获取所需能量
    getEnergy(e) {
      this.energy = e.value;
    },
    // 获取过期天数
    getexpirationDay(e) {
      console.log(e);
      console.log(e.value);
      this.expirationDay = e.value;
    },
    upload() {
      var that = this;
      var hotelId = this.userInfo.resultContent.hotelId;
      var name = this.name;
      var energy = parseFloat(this.energy);
      var expirationDay = parseInt(this.expirationDay);
      var discountsCondition = parseFloat(this.discountsCondition);
      var amount = parseFloat(this.amount);
      var discount = parseFloat(this.discount);
      var incomeUrl = null;
      var type = '';
      if(this.selected == 0) {
        type = 'full';
        incomeUrl = that.baseUrl + "/app/business/coupon/add?hotelId=" + hotelId + 
        '&name=' + name + '&energy=' + energy + '&expirationDay=' + expirationDay + 
        '&type=' + type;
      } else if(this.selected == 1) {
        type = 'discount';
        incomeUrl = that.baseUrl + "/app/business/coupon/add?hotelId=" + hotelId + 
        '&name=' + name + '&energy=' + energy + '&expirationDay=' + expirationDay + 
        '&type=' + type + '&discount=' + discount;
      } else {
        type = 'cash';
        incomeUrl = that.baseUrl + "/app/business/coupon/add?hotelId=" + hotelId + 
        '&name=' + name + '&energy=' + energy + '&expirationDay=' + expirationDay + 
        '&type=' + type + '&discountsCondition=' + discountsCondition + '&amount=' + amount;
      }
      var isFinish = false;
      console.log(name)
      console.log(expirationDay)
      console.log(Number.isNaN(energy))
      console.log(type);
      console.log(discount)
      console.log(discountsCondition)
      console.log(amount)
      console.log(incomeUrl);
      if(name == '' || expirationDay == '' || Number.isNaN(expirationDay) || energy == '' || Number.isNaN(energy) == true) {
        console.log(1);
        modal.toast({
          message: '信息不完善或信息有误',
          duration: 0.3
        })
      } else {
        if(type == 'discount') {
          if(discount == '' || Number.isNaN(discount) == true || discount > 1 || discount <= 0) {
            modal.toast({
              message: '信息不完善或信息有误',
              duration: 0.3
            })
          } else {
            isFinish = true;
          }
        } else if(type == 'cash') {
          if(discountsCondition == '' || Number.isNaN(discountsCondition) == true || amount == '' || Number.isNaN(amount) == true || amount > discountsCondition) {
            modal.toast({
              message: '信息不完善或信息有误',
              duration: 0.3
            })
          } else {
            isFinish = true;
          }
        } else {
          isFinish = true;
        }
      }
      if(isFinish) {
        console.log('111111')
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
                message: "添加成功",
                duration: 0.3
              });
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
  }
};
</script>
<style scoped>
  .container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .cell {
    padding: 20px 30px;
  }
  .input:disabled {
    background-color: #eee;
  }
  .name, .date, .energy, .isDelete {
    margin-bottom: 40px;
    flex-direction: row;
    align-items: center;
  }
  .name-title, .type-title, .date-title {
    font-size: 32px;
    width: 150px;
  }
  .energy-title, .isDelete-title {
    font-size: 32px;
    width: 220px;
  }
  .discount-title {
    width: 250px;
  }
  .discount-number {
    width: 460px;
  }
  .energy-input {
    width: 470px;
    padding: 20px;
    border-width: 1px;
    border-color: #ccc;
    font-size: 30px;
  }
  .name-input {
    width: 540px;
    padding: 20px;
    border-width: 1px;
    border-color: #ccc;
    font-size: 30px;
  }
  .discount-input {
    width: 440px;
  }
  .type-title {
    font-size: 32px;

  }
  .discount-content {
    /* height: 300px; */
    margin-top: 40px;
  }
  .radio {
    height: 300px;;
  }
  .date-step {
    margin-left: 330px;
  }
  .switch {
    margin-left: 375px;
  }
  .upload {
    background-color: #fdb40a;
    color: #fff;
    height: 80px;
    line-height: 80px;
    width: 690px;
    /* margin-left: 25px; */
    margin-top: 80px;
    margin-bottom: 20px;
    border-radius: 10px;
    text-align: center;
    font-size: 30px;
  }
</style>


