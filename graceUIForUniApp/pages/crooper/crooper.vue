<template>
	<view>
		<view class="grace-crooper-wrap" :style="{height:copperHeight+'px', padding:copperPadding+'px 0'}">
			<movable-area class="grace-crooper" :style="{height:copperHeight+'px'}" scale-area>
				<movable-view class="grace-crooper-img" :style="{height:copperHeight+'px'}" :x="x" :y="y" direction="all" @change="imgMove" @scale="imgScale" :scale="t" :out-of-bounds="t" :animation="f" friction="100">
					<image :src="imgurl" mode="widthFix" style="width:100%;"></image>
				</movable-view>
			</movable-area>
			<view class="grace-crooper-footer">
				<view @tap="chooseimg">+ 选择照片</view>
				<view @tap="saveImg">保存照片</view>
			</view>
			<view class="grace-crooper-canvas" :style="{width:windowWidth+'px', height:copperHeight+'px'}">
				<canvas :style="{width:windowWidth+'px', height:copperHeight+'px'}" canvas-id="graceCanvas"></canvas>
			</view>
		</view>
	</view>
</template>
<script>
var _self, context;
/*
请在此处修改剪裁信息
*/
var cooperSets = {
	width : 300, //裁切后图片保存宽度 单位 px
	scale : 1, //宽高比例  宽度/高度
}
export default{
	data() {
		return {
			f : false,
			t : true,
			windowWidth  : 200,
			windowHeight : 200,
			copperHeight : 200,
			copperPadding: 0,
			imgurl       : '',
			x:0, y: 0,
			scale : 1, scale2 : 1,
			pixelRatio : 1
		}
	},
	onLoad:function(){
		_self = this;
		context = uni.createCanvasContext('graceCanvas');
		uni.getSystemInfo({
			success:function(sys){
				_self.windowWidth   = sys.windowWidth; // 窗口宽度
				_self.windowHeight  = sys.windowHeight; //窗口高度
				_self.copperHeight   = sys.windowWidth * cooperSets.scale; //剪裁区域高度
				var padding = (_self.windowHeight - _self.copperHeight - 44) / 2;
				if(padding < 0){padding = 0;}
				_self.copperPadding =  padding; //主区域上下内间距
				_self.pixelRatio    = sys.pixelRatio; //图片缩放比
			}
		})
	},
	methods: {
		chooseimg : function() {
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				success: function (res) {
					_self.imgurl = res.tempFilePaths[0];
					uni.getImageInfo({
						src:res.tempFilePaths[0],
						success: function(res) {
							_self.scale = res.width / _self.windowWidth;
						}
					})
				}
			});
		},
		saveImg:function(){
			if(_self.imgurl == ''){
				uni.showToast({title:"请选择照片", icon:"none"});
				return ;
			}
			uni.showLoading({title:"剪裁中..."});
			context.height = _self.copperHeight;
			var x = _self.x * _self.scale / _self.scale2 * -1;
			var y = _self.y * _self.scale / _self.scale2 * -1;
			var useW = _self.windowWidth * _self.scale / _self.scale2;
			var useH = useW * cooperSets.scale;
			context.drawImage(
				_self.imgurl, 
				x, y, 
				useW, useH,
				0, 0,
				_self.windowWidth, _self.copperHeight
			);
			context.draw(
				false, 
				function(){
					uni.canvasToTempFilePath({
						canvasId : "graceCanvas",
						x        : 0,
						y        : 0,
						width    : _self.windowWidth,
						height   : _self.copperHeight,
						destWidth: cooperSets.width,
						destHeight : cooperSets.width * cooperSets.scale,
						quality  : 1,
						//hbuilderX 新版本bug 等待修正
						success  : function (res) {
							console.log(res);
							//此处获取到临时图片地址，使用上传接口上传即可
							uni.previewImage({
								urls:[res.tempFilePath]
							});
							uni.hideLoading();
						},
						fail    : function (res) {
							console.log(res);
							uni.hideLoading();
							uni.showToast({
								title:"剪裁失败",
								icon:"none"
							});
						}
					});
				}
			);
		},
		imgMove : function(e){
			_self.x = e.detail.x;
			_self.y = e.detail.y;
		},
		imgScale : function(e){
			_self.scale2 = e.detail.scale;
			_self.x = 0;
			_self.y = 0;
		}
	},
}
</script>
<style>
.grace-crooper-wrap{width:100%; height:200px; background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC'); padding:50px 0; overflow:hidden;}
.grace-crooper{width:100%;  height:200px; overflow:hidden;}
.grace-crooper-img{width:100%; height:200px; }
.grace-crooper-cuter{width:100%; height:200px; position:absolute; z-index:999; left:0;}
.grace-crooper-cuter:last-child{bottom:0;}
.grace-crooper-footer{height:44px; width:100%; background:#FFF; line-height:44px; display:flex; flexw-wrap:nowrap; position:fixed; left:0; bottom:0; z-index:999;}
.grace-crooper-footer view{width:50%; line-height:44px; text-align:center;}
.grace-crooper-canvas{width:200px; position:fixed; background:#000000; overflow:hidden; left:-1000px; top:0; z-index:1000;}
.grace-crooper-canvas canvas{opacity:0;}
</style>