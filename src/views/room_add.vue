<template>
  <div class="container">
      <wxc-minibar title="发布房间"
                   background-color="#FDB40A"
                   text-color="#FFFFFF"
                   right-text="返回"
                   @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                   @wxcMinibarRightButtonClicked="minibarRightButtonClick"></wxc-minibar>
      <list>
        <cell class="cell">
          <div class="form">
            <div class="room-name">
              <input class="room-name-input" type="text" placeholder="房间名称" />
            </div>
            <div class="roomType">
              <text class="roomType-text">选择房型：</text>
              <div class="radio-list">
                <div class="radio-item">
                  <div class="radio">
                    <div class="radio-inside"></div>
                  </div>
                  <text class="roomType-text">能量大床房</text>
                </div>
              </div>
            </div>
            <div class="money">
              <text class="money-text">结算金额：</text>
              <input type="number" class="money-input">
            </div>
            <div class="id">
              <text class="id-text">床垫编号：</text>
              <input type="number" class="id-input">
            </div>
            <div class="convenience">
               <div class="convenience-sub">
                 <wxc-checkbox-list :list="checlboxList"
                           @wxcCheckBoxListChecked="wxcCheckBoxListChecked"></wxc-checkbox-list>
               </div>
            </div>
            <div class="remark">
              <div class="remark-title">
                <text class="remark-title-text">备注信息: </text>
              </div>
              <div class="remark-content">
                <text class="remark-content-text">能量大床</text>
                <text class="remark-content-text">免费WIFI上网，24小时热水</text>
              </div>
            </div>
            <div class="cancelTime">
              <text class="cancelTime-title">选择取消时间：</text>
              <wxc-radio class="cancelTime-list" :list="cancelboxList" @wxcRadioListChecked="cancelList"></wxc-radio>
            </div>
            <div class="putaway">
              <text class="putaway-title">是否上架</text>
              <switch class="switch"></switch>
            </div>
            <div class="button">
              <text class="button-text">确认发布</text>
            </div>
          </div>
        </cell>
      </list>
  </div>
</template>
<script>
import { WxcMinibar, WxcRadio, WxcCheckboxList, WxcButton  } from 'weex-ui';
const modal = weex.requireModule('modal');
export default {
  components: { WxcMinibar, WxcRadio, WxcCheckboxList,  WxcButton  },
  data() {
    return {
      checlboxList: [
        { title: 'WIFI', value: 1 },
        { title: '24小时热水', value: 2},
        { title: '大型商场', value: 3 },
        { title: '交通便利', value: 4 }
      ],
      checkedList: [],
      cancelboxList: [
        { title: '不可取消', value: 1 },
        { title: '入住日当天18点前', value: 2},
        { title: '入住日前两天12点前', value: 3 }
      ],
      cancelList: []
    }
  },
  methods: {
    minibarLeftButtonClick () {
      this.$router.go(-1);
    },
    minibarRightButtonClick () {
      this.$router.go(-1);
    },
    // 多选
    wxcCheckBoxListChecked (e) {
      this.checkedList = e.checkedList;
    },
    cancelList (e) {
      this.cancelList = e.checkedList;
    },
  }
}
</script>
<style scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
  .room-name-input {
    margin: 50px 20px 30px 20px;
    border-width: 1px;
    border-color: #ccc;
    padding: 20px; 
  }
  .roomType {
    flex-direction: row;
    padding: 20px 30px;
  }
  .radio-list {
    flex-direction: row;
    margin-left: 20px;
  }
  .radio-item {
    flex-direction: row;
    align-items: center;
  }
  .radio {
    width: 28px;
    height: 28px;
    border-width: 2px;
    border-color: #666;
    border-radius: 100px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }
  .radio-inside {
    width: 15px; 
    height: 15px;
    border-radius: 100px;
    background-color: #666;
  }
  .roomType-text {
    font-size: 30px;
  }
  .money, .id {
    padding: 20px 30px;
    flex-direction: row;
    align-items: center;
  }
  .money-text, .id-text {
    font-size: 30px;
  }
  .money-input, .id-input {
    width: 530px;
    border-width: 1px;
    border-color: #ccc;
    padding: 10px 20px;
  }
  .convenience {
    margin: 20px 10px;
    border-top-width: 2px;
    border-top-color: #ccc;
  }
  .remark {
    padding: 20px 30px;
    border-top-width: 2px;
    border-top-color: #ccc;
  }
  .remark-title-text {
    font-size: 30px;
  }
  .remark-content {
    padding: 0 50px;
  }
  .remark-content-text {
    margin: 20px 0;
    font-size: 30px;
  }
  .cancelTime {
    border-top-width: 2px;
    border-top-color: #ccc;
    padding: 20px 30px;
  }
  .cancelTime-title {
    font-size: 30px;
    /* margin-left: 20px; */
  }
  .cancelTime-list {
    padding-left: 20px;
  }
  .putaway {
    border-top-width: 2px;
    border-top-color: #ccc;
    border-bottom-width: 2px;
    border-bottom-color: #ccc;
    padding: 20px 30px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .putaway-title {
    font-size: 30px;
  }
  .button-text {
    width: 690px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    background-color: #FDB40A;
    color: #fff;
    border-radius: 10px;
    margin: 50px 30px;
  }
</style>


