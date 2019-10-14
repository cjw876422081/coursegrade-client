<template>
	<view style="background-image: url('./static/img/评论.jpg');
	background-repeat: no-repeat;
	background-size: 100% 100%;
	padding: 0;"
	>
	<form @submit="formSubmit">
		<view class="uni-form-item uni-column" style="position:relative">
			
		                    <view class="title">xx课程笔记内容</view>
							<view class="wth" v-for="(CourseNoteByPlanTeacher, index) in CourseNoteTeacherService" :key="index">
								<view class="word">{{CourseNoteByPlanTeacher.noteMemo}}</view>
							</view>
		                    <input class="uni-input table" name="xx课程笔记内容" placeholder="发表内容区" />
		                </view>
		                <view class="uni-btn-v">
		                    <button class="uni-btn-l button-l" form-type="submit">提交</button>
		                    <button class="uni-btn-r button-r" type="default" form-type="reset">重置</button>
		                </view>
						
						</form>
	</view>
	
</template>

<script>
	import CourseNoteByPlanTeacherService from "../../../common/service/CourseNoteByPlanTeacherService.js";
	export default {
		data() {
			return {
				CourseNoteTeacherService: [],
				index: 0,
				CourseNoteByPlanTeacherService: new CourseNoteByPlanTeacherService(),
			}
		},
		onShow: function() {
			this.getCourseNotes();
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
            },
			getCourseNotes: function(callback) {
				// const courseId=this.course.id;
				this.CourseNoteByPlanTeacherService.getCourseNotes().then((result) => {
					
					this.CourseNoteTeacherService = result.data;
					
				}).catch(err => {
			
				}).finally(() => {
					if (callback) {
						callback();
					}
				});
			},
			
		}
	}
</script>

<style>
	.button-r {
		opacity: 0.35;
		position:absolute; 
		right: 0;
		bottom: 0;
	}
	.button-l {
		opacity: 0.35;
		position: absolute; 
		left: 0; 
		bottom: 0;
	}
	.table {
		opacity: 0.35;
	}
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
