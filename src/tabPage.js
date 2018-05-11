export default {

  tabTitles: [
    {
      title: '全部'
    },
    {
      title: '待付款'
    },
    {
      title: '未核销'
    },
    {
      title: '已成功'
    }
  ],
  tabStyles: {
    bgColor: '#FFFFFF',
    titleColor: '#999',
    activeTitleColor: '#000',
    activeBgColor: '#FFFFFF',
    isActiveTitleBold: true,
    // iconWidth: 70,
    // iconHeight: 70,
    width: 187.5,
    height: 80,
    fontSize: 28,
    hasActiveBottom: true,
    activeBottomColor: '#FFC900',
    activeBottomHeight: 6,
    activeBottomWidth: 150,
    textPaddingLeft: 10,
    textPaddingRight: 10,
  },
  // 使用 iconfont 模式的tab title配置
  tabIconFontTitles: [
    {
      title: '首页',
      codePoint: '\ue623'
    },
    {
      title: '特别推荐',
      codePoint: '\ue608'
    },
    {
      title: '消息中心',
      codePoint: '\ue752',
      badge: 5
    },
    {
      title: '我的主页',
      codePoint: '\ue601',
      dot: true
    }
  ],
  tabIconFontStyles: {
    bgColor: '#FFFFFF',
    titleColor: '#666666',
    activeTitleColor: '#3D3D3D',
    activeBgColor: '#FFFFFF',
    isActiveTitleBold: true,
    width: 160,
    height: 120,
    fontSize: 24,
    textPaddingLeft: 10,
    textPaddingRight: 10,
    iconFontSize: 50,
    iconFontColor: '#333333',
    iconFontMarginBottom: 8,
    activeIconFontColor: 'red',
    iconFontUrl: '//at.alicdn.com/t/font_501019_mauqv15evc1pp66r.ttf'
  }
}