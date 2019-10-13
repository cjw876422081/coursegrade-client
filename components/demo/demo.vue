<template>
<<<<<<< HEAD
  <div>
    <div>
      <wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" tab-class="text-center bg-white wuc-tab fixed" :tab-style="CustomBar" select-class="text-blue" @change="tabChange"></wuc-tab>
      <div class="cu-bar bg-white solid-bottom" style="margin-top:100upx">
        <div class="action">
          <text class="cuIcon-titles text-orange"></text>基本使用(tab固定，只支持点击标签切换)
        </div>
      </div>
      <div class="bg-white padding margin text-center text-black">{{tabList[TabCur].name}}</div>
    </div>

    <div>
      <div class="cu-bar bg-white margin-top solid-bottom">
        <div class="action">
          <text class="cuIcon-titles text-orange"></text>居中选中放大(外部触发切换)
        </div>
      </div>
      <wuc-tab :tab-list="tabList2" :tabCur="TabCur2" @change="tabChange2" tab-class="text-center text-black bg-white" select-class="text-blue text-xl"></wuc-tab>
      <swiper :current="TabCur2" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange2">
        <swiper-item v-for="(item,index) in tabList2" :key="index">
          <div class="bg-white padding margin text-center text-black">{{item.name}}</div>
        </swiper-item>
      </swiper>
    </div>

    <div>
      <div class="cu-bar bg-white margin-top solid-bottom">
        <div class="action">
          <text class="cuIcon-titles text-orange"></text>平分
        </div>
      </div>
      <wuc-tab :tab-list="tabList3" textFlex :tabCur.sync="TabCur3" tab-class="text-center text-black bg-white" select-class="text-orange"></wuc-tab>
      <swiper :current="TabCur3" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange3">
        <swiper-item v-for="(item,index) in tabList3" :key="index">
          <div class="bg-white padding margin text-center text-black">{{item.name}}</div>
        </swiper-item>
      </swiper>
    </div>

    <div>
      <div class="cu-bar bg-white margin-top solid-bottom">
        <div class="action">
          <text class="cuIcon-titles text-orange"></text>背景
        </div>
      </div>
      <wuc-tab :tab-list="tabList4" :tabCur.sync="TabCur4" tab-class="text-center text-white bg-blue" select-class="text-white"></wuc-tab>
      <swiper :current="TabCur4" class="swiper row" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange4">
        <swiper-item v-for="(item,index) in tabList4" :key="index">
          <div class="bg-white padding margin text-center text-black">{{item.name}}</div>
        </swiper-item>
      </swiper>
    </div>

    <div>
      <div class="cu-bar bg-white margin-top solid-bottom">
        <div class="action">
          <text class="cuIcon-titles text-orange"></text>图标
        </div>
      </div>
      <wuc-tab :tab-list="tabList5" :tabCur.sync="TabCur5" tab-class="text-center text-black bg-white" select-class="text-blue" />
      <swiper :current="TabCur5" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange5">
        <swiper-item v-for="(item,index) in tabList5" :key="index">
          <div class="bg-white padding margin text-center text-black">{{item.name}}</div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import WucTab from '@/components/wuc-tab/wuc-tab.vue';
import { obj2style } from '@/utils/index';
export default {
    data() {
        return {
            tabList: [
                { name: '选项卡一' },
                { name: '选项卡二' },
                { name: '选项卡三' },
                { name: '选项卡四' },
                { name: '选项卡五' },
                { name: '选项卡六' },
                { name: '选项卡七' },
                { name: '选项卡八' }
            ],
            tabList2: [{ name: '精选' }, { name: '订阅' }],
            tabList3: [{ name: '精选' }, { name: '订阅' }],
            tabList4: [
                { name: '推荐' },
                { name: '热点' },
                { name: '视频' },
                { name: '问答' },
                { name: '社会' },
                { name: '娱乐' },
                { name: '科技' },
                { name: '汽车' }
            ],
            tabList5: [
                { name: '短信', icon: 'cuIcon-comment' },
                { name: '电话', icon: 'cuIcon-dianhua' },
                { name: 'wifi', icon: 'cuIcon-wifi' }
            ],
            TabCur: 0,
            TabCur2: 0,
            TabCur3: 0,
            TabCur4: 0,
            TabCur5: 0
        };
    },

    components: { WucTab },

    computed: {
        CustomBar() {
            let style = {};
            // #ifdef MP-WEIXIN
            const systemInfo = uni.getSystemInfoSync();
            let CustomBar =
              systemInfo.platform === "android"
                ? systemInfo.statusBarHeight + 50
                : systemInfo.statusBarHeight + 45;
            style['top'] = CustomBar + 'px';
            // #endif
            // #ifdef H5
            style['top'] = 0 + 'px';
            // #endif
            return obj2style(style);
        }
    },

    methods: {
        tabChange(index) {
            this.TabCur = index;
        },
        tabChange2(index) {
            this.TabCur2 = index;
        },
        swiperChange2(e) {
            let { current } = e.target;
            this.TabCur2 = current;
        },
        swiperChange3(e) {
            let { current } = e.target;
            this.TabCur3 = current;
        },
        swiperChange4(e) {
            let { current } = e.target;
            this.TabCur4 = current;
        },
        swiperChange5(e) {
            this.TabCur5 = e.target.current;
        }
    },

    onReady() {}
};
</script>
<style>
@import "~@/styles/icon.scss";
div,
scroll-view,
swiper {
	box-sizing: border-box;
}
div {
  font-size: 28upx;
  background-color: #f1f1f1;
}
.swiper {
    height: 140upx;
}

.cu-bar {
	display: flex;
	position: relative;
	align-items: center;
	min-height: 100upx;
	justify-content: space-between;
}

.cu-bar .action {
	display: flex;
	align-items: center;
	height: 100%;
	justify-content: center;
	max-width: 100%;
  background-color: #ffffff;
}

.cu-bar .action:first-child {
	margin-left: 30upx;
	font-size: 30upx;
}

.solid,
.solid-bottom {
	position: relative;
}

.solid::after,
.solid-bottom::after{
	content: " ";
	width: 200%;
	height: 200%;
	position: absolute;
	top: 0;
	left: 0;
	border-radius: inherit;
	transform: scale(0.5);
	transform-origin: 0 0;
	pointer-events: none;
	box-sizing: border-box;
}

.solid::after {
	border: 1upx solid rgba(0, 0, 0, 0.1);
}

.solid-bottom::after {
	border-bottom: 1upx solid rgba(0, 0, 0, 0.1);
}

.text-orange{
  color:#f37b1d
}
.text-black{
  color:#333333;
}
.bg-white{
    background-color: #ffffff;
}

.padding {
	padding: 30upx;
}

.margin {
	margin: 30upx;
}

.margin-top {
	margin-top: 30upx;
}
.text-center {
    text-align: center;
}
=======
	<view>
		<view class="p10">普通使用</view>
		<sun-tab :value.sync="index" :tabList="tabList"></sun-tab>
		<view class="p10">更换颜色</view>
		<sun-tab :value.sync="index" @change="arrayChange" :tabList="tabColorList" activeColor="#f37b1d" defaultColor="#FFFFFF" bgColor="#1e9fff"></sun-tab>
		<view class="p10">使用icon</view>
		<sun-tab :value.sync="index" :tabList="tabIconList" rangeKey="name"></sun-tab>
		<view class="p10">对象赋值</view>
		<sun-tab :value.sync="index" @change="objectChange" :tabList="tabObjectList" rangeKey="name"></sun-tab>
		<view class="p10">横向滚动</view>
		<sun-tab :value.sync="tabScrollIndex" :tabList="tabScrollList" :scroll="true"></sun-tab>
		<view class="p10">搭配滑块使用</view>
		<sun-tab :value.sync="swiperIndex" :tabList="tabSwiperList"></sun-tab>
		<swiper :current="swiperIndex" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange">
			<swiper-item v-for="(swiper,index) in tabSwiperList" :key="index">
				<view style="margin: 20px;background-color: #FFFFFF;text-align: center;">{{swiper}}</view>
			</swiper-item>
		 </swiper>
	</view>
</template>

<script>
	import sunTab from '@/components/sun-tab/sun-tab.vue';
	export default {
		components: {
			sunTab
		},
		data() {
			return {
				index: 0,
				swiperIndex:0,
				tabList: ['选项卡一','选项卡二','选项卡三'],
				tabColorList: ['选项卡一','选项卡二','选项卡三选项卡三项卡三'],
				tabIconList: [
					{
						name: '男',
						icon: 'iconnan',
					},
					{
						name: '女',
						icon: 'iconziyuan',
					},
					{
						name: '儿童',
						icon: 'icon10',
					}
				],
				tabObjectList: [
					{
						name: '选项卡一',
						value: 1
					},
					{
						name: '选项卡二',
						value: 2
					},
					{
						name: '选项卡三',
						value: 3
					}
				],
				tabScrollIndex: 0,
				tabScrollList: ['选项卡一','选项卡二选项卡二','选项卡三','选项卡四','选项卡五选项卡五选项卡五','选项卡六','选项卡七','选项卡八'],
				tabSwiperList: ['A','B','C'],
			}
		},
		onLoad() {

		},
		methods: {
			arrayChange(e){
				console.log('数组数据返回格式');
				console.log(e);
			},
			objectChange(e){
				console.log('对象数据返回格式');
				console.log(e);
			},
			swiperChange(e){
				this.swiperIndex = e.target.current;
			}
		}
	}
</script>
<style lang="scss">
	uni-page-body{
		background-color: #f4f4f4;
	}
	.p10{
		padding: 10px;
		font-size: 16px;
	}
>>>>>>> a897f56e4d18832d182ccda666869592c6842e2e
</style>
