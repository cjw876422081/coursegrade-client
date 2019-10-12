<template>
	<view>
		<view class="uni-form-item uni-column">
		                    <view class="title">xx课程笔记内容</view>
		                    <input class="uni-input" name="xx课程笔记内容" placeholder="发表内容区" />
		                </view>
		                <view class="uni-btn-v">
		                    <button class="uni-btn-l" form-type="submit">提交</button>
		                    <button class="uni-btn-r" type="default" form-type="reset">重置</button>
		                </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
            formSubmit: function(e) {
                console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
                var formdata = e.detail.value
                uni.showModal({
                    content: '表单数据内容：' + JSON.stringify(formdata),
                    showCancel: false
                });
            },
            formReset: function(e) {
                console.log('清空数据')
            }
			
		}
	}
</script>

<style>
	.uni-form-item {
		width: 375px;
	}
 .uni-form-item .title {
	 width: 100%;
	 text-align: center;
        padding: 20rpx 0;
    }
	.uni-btn-l {
		float: left;
	}
	.uni-btn-r {
		float: right;
	}
	.uni-input {
		height: 100px;
		/* cols="20" rows="5" */
	}
</style>
