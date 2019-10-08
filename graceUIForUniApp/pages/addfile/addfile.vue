<template>
	<view>
		<graceHeader title="添加图片及预览" desc="请选择图片,进行测试 ^_^" openType="switchTab"></graceHeader>
		<view style="width:750px;" class="grace-bg-white grace-common-border grace-common-mt">
			<view class="grace-add-file">
				<view class="grace-add-btn" @tap="addImg" v-if="btnImg">
					<view>+</view><view>添加照片</view>
				</view>
				<view class="garce-items" v-for="(item, index) in imgLists" :key="index">
					<image :src="item" mode="widthFix" :data-imgurl="item" @tap="showImgs"></image>
					<view class="grace-close" @tap="removeImg" :id="'grace-items-img-'+index"></view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
var maxNum = 9, _self;
export default {
	data() {
		return {
			imgLists : [],
			btnImg : true
		}
	},
	onLoad:function(){
		_self = this;
	},
	methods:{
		addImg : function(){
			var num = maxNum - _self.imgLists.length;
			if(num < 1){return false;}
			uni.showLoading({
				title:"加载中..."
			});
			uni.chooseImage({
				count: num,
				sizeType: ['compressed'],
				success: function(res) {
					_self.imgLists = _self.imgLists.concat(res.tempFilePaths);
					if (_self.imgLists.length >= maxNum){
						_self.btnImg = false;
					}
					uni.hideLoading();
				}
			});
		},
		removeImg : function(e){
			var index = e.currentTarget.id.replace('grace-items-img-', '');
			_self.imgLists.splice(index, 1);
			_self.imgLists = _self.imgLists;
			if (_self.imgLists.length < maxNum) {
				_self.btnImg = true;
			}
		},
		showImgs : function(e){
			var currentImg = e.currentTarget.dataset.imgurl;
			uni.previewImage({
			  urls: this.imgLists,
			  current : currentImg
			})
		}
	}
}
</script>
<style></style>