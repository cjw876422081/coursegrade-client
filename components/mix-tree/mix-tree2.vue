<template>
	<view class="content">
		<view class="mix-tree-list">
			<block v-for="(item, index) in treeList" :key="index">
				<view 
					class="mix-tree-item"
					:style="[{
							paddingLeft: item.rank*15 + 'px',
							zIndex: item.rank*-1 +50
						}]"
					:class="{
							border: treeParams.border === true,
							show: item.show,
							last: item.lastRank,
							showchild: item.showChild
						}"
					@click.stop="treeItemTap(item, index)"
				>
					<image class="mix-tree-icon" :src="item.lastRank ? treeParams.lastIcon : item.showChild ? treeParams.currentIcon : treeParams.defaultIcon"></image>
					{{item.name}}
					<img  class="option-icon" src="../../static/img/zy.png" @click="checkcourseHomework(index)"></img>
					<img  class="icon" src="/static/img/add.png" @click="courseNote(index)"></img>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default(){
					return [];
				}
			},
			params: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				courseTreeList:[],
				treeList: [],
				treeParams: {
					defaultIcon: '/static/mix-tree/defaultIcon.png',
					currentIcon: '/static/mix-tree/currentIcon.png',
					lastIcon: '',
					border: false
				},
				parmeter:{
					planId:0,
					courseId:0,
					courseName: '',
					planMemo:[]
				}
			}
		},
		watch: {
			list(list){
				
				this.treeParams = Object.assign(this.treeParams, this.params);
				console.log(this.treeParams, this.params);
				this.courseTreeList = list ;
				this.renderTreeList(list);
			}
		},
		methods: {
			//扁平化树结构
			renderTreeList(list=[], rank=0, parentId=[]){
				list.forEach(item=>{
					this.treeList.push({
						id: item.id,
						name: item.name,
						parentId,  // 父级id数组
						rank,  // 层级
						showChild: false,  //子级是否显示
						show: rank === 0  // 自身是否显示
					})
					if(Array.isArray(item.children) && item.children.length > 0){
						let parents = [...parentId];
						parents.push(item.id);
						this.renderTreeList(item.children, rank+1, parents);
					}else{
						this.treeList[this.treeList.length-1].lastRank = true;
					}
				})
			},
			// 点击
			treeItemTap(item){
				let list = this.treeList;
				let id = item.id;
				if(item.lastRank === true){
					//点击最后一级时触发事件
					this.$emit('treeItemClick', item);
					return;
				}
				item.showChild = !item.showChild;
				list.forEach(childItem=>{
					if(item.showChild === false){
						//隐藏所有子级
						if(!childItem.parentId.includes(id)){
							return;
						}
						if(childItem.lastRank !== true){
							childItem.showChild = false;
						}
						childItem.show = false;
					}else{
						if(childItem.parentId[childItem.parentId.length-1] === id){
							childItem.show = true;
						}
					}
				})
			},
			checkcourseHomework(index){
				this.getParmter(index);
				console.log("this.parmeter.planId" ,this.parmeter.planId)
				uni.navigateTo({
				    url: '../student/checkCourseContentHomeworkList?id=' + this.parmeter.planId 
				});
			},
			courseNote(index){
				this.getParmter(index);
				uni.navigateTo({
				    url: '../courseNote/courseNoteByPlan-teacher/courseNoteByPlan-teacher?parmeter='+encodeURIComponent(JSON.stringify(this.parmeter))
				});
				
			},
			getParmter(index){
				this.parmeter = {
					planId:0,
					courseId:0,
					courseName: '',
					planMemo:[]
				}
				// console.log("this.list:"+JSON.stringify(this.treeList));
				this.parmeter.planId = this.treeList[index].id - 999;
				this.parmeter.courseId =  this.courseTreeList.id;
				this.parmeter.courseName = this.courseTreeList.courseName;
				console.log("courseId",this.parmeter.courseName);
				console.log("courseName",this.courseTreeList.courseName);
				// console.log("planMemo",this.parmeter);
				this.parmeter.planMemo.push(this.treeList[index].planMemo);
				for(;;){
					const level =  this.treeList[index].parentId.length;
					// console.log("级别:"+level);
					// console.log("this.list_________:"+this.treeList[index].pId);
					// console.log("this.list+++++++++++++:"+JSON.stringify(this.treeList[index].planMemo));
					if(level > 0 && this.treeList[index].pId && (this.treeList[index].pId != null || this.treeList[index].course != null)){
						this.parmeter.planMemo.push(this.treeList[index-1].planMemo);
						// console.log("planMemo+++++++++++++:"+JSON.stringify(this.treeList[index-1].planMemo));
						index = index - 1;
					}
					if(level < 2){
						// console.log("跳出循环");
						return;
					}
				}
			}
			
			
			
			
			
		}
	}
</script>

<style>
	.mix-tree-list{
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
	}
	.mix-tree-item{
		display: flex;
		align-items: center;
		font-size: 30upx;
		color: #333;
		height: 0;
		opacity: 0;
		transition: .2s;
		position: relative;
	}
	.mix-tree-item.border{
		border-bottom: 1px solid #eee;
	}
	.mix-tree-item.show{
		height: 80upx;
		opacity: 1;
	}
	.mix-tree-icon{
		width: 26upx;
		height: 26upx;
		margin-right: 8upx;
		opacity: .9;
	}
	
	.mix-tree-item.showchild:before{
		transform: rotate(90deg);
	}
	.mix-tree-item.last:before{
		opacity: 0;
	}
	.option-icon{
		width: 35upx;
		height: 35upx;
		margin-left: 200upx;
		
		opacity: 0.9;
	}
	.icon{
		width: 35upx;
		height: 35upx;
		opacity: 0.9;
	}
</style>
