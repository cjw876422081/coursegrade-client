<template>
  <view class="grace-tab">
      <scroll-view class="grace-tab-title" scroll-x="true">
          <view>选项卡标题</view>
          <view>选项卡标题</view>
      </scroll-view>
      <swiper class="grace-tab-swiper" style="height:350rpx;">
          <swiper-item>对应的内容区</swiper-item>
      </swiper>
  </view>
</template>
<script>
	
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
<style>

</style>
