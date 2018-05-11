<template>
  <!-- <div> -->
      <div class="tabbar">
        <div @click="jump('receiveOrder')" class="tabbar-div">
            <text v-if="selected[0]" class="icon active">&#xe64f;</text>
            <text v-else class="icon">&#xe64f;</text>
            <text v-if="selected[0]" class="tabbbar-text active">接单</text>
            <text v-else class="tabbbar-text">接单</text>
        </div>
        <div @click="jump('order')" class="tabbar-div">
            <text v-if="selected[1]" class="icon active">&#xe655;</text>
            <text v-else class="icon">&#xe655;</text>
            <text v-if="selected[1]" class="tabbbar-text active">订单</text>
            <text v-else class="tabbbar-text">订单</text>
        </div>
        <div @click="jump('manage')" class="tabbar-div">
            <text v-if="selected[2]" class="icon active">&#xe665;</text>
            <text v-else class="icon">&#xe665;</text>
            <text v-if="selected[2]" class="tabbbar-text active">管理</text>
            <text v-else class="tabbbar-text">管理</text>
        </div>
      </div>
  <!-- </div> -->
</template>
<style scoped>
  .tabbar {
    width: 750px;
    height: 120px;
    flex-direction: row;
    justify-content: space-around;
    background-color: #fff;
  }
  .tabbar-div {
    width: 150px;
    height: 120px;
    background-color: #fff;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .tabbbar-text {
    font-size: 20px;
    color: #b4b4b4;
    text-align: center;
  }
  .icon {
      font-family: iconfont;
      font-size: 50px;
      margin-bottom: 10px;
      color: #c4c4c4;
  }
  .order {
      background-color: #FDB40A;
      border-radius: 100px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 110px;
      height: 110px;
  }
  .order-text {
      color: #fff;
  }
  .active {
      color: #FDB40A;
  }
</style>
<script>
const domModule = weex.requireModule('dom')
export default {
  data() {
    return {
        selected: [false, false, false]
    }
  },
  created() {
      console.log(this.index);
      this.selected[this.index] = true;
      domModule.addRule('fontFace', {
        'fontFamily': "iconfont",
        'src': "url('http://at.alicdn.com/t/font_647774_7kn5ejzxqr3mzpvi.ttf')"
      })
  },
  methods: {
    jump(e) {
      this.$router.push(e);
    }
  },
  props: {
      index: Number
  }
}
</script>