/**
 * 
 */
//此处是一个监听者模式组件，可以直接调用 
(function(){
	
	var EventUtil = {
		
		initEvent : function(){
			if(!this.eventMap){
				/**
				 * 创建一个内部的js对象，用于存储外部绑定事件
				 */
				this.eventMap = {//谁调用 ，就指的谁，简单的说是类
					
				}
				//维护事件唯一索引的标志位
				this.eventIndex = 1;
			}
		},
		
		/**
		 * 向Combo组件内部的eventMap属性注入事件函数，并且返回事件id，供后续有事件删除需求时使用
		 * @param ename
		 * @param fn
		 * @returns {Number}
		 */
		on : function(ename, fn){
			var me = this;
			
			me.initEvent();
			
			var cache = me.eventMap[ename];
			if(!cache){
				cache = me.eventMap[ename] = [];
			}
			
			var eventId = me.eventIndex;
			cache.push({
				eventId : eventId,
				fn : fn
			});
			
			me.eventIndex++;
			
			return eventId;
		},

		fire : function(ename){
			var me = this;
			me.initEvent();
			
			var cache = me.eventMap[ename];
			if(!cache){
				return;
			}
			/**
			 * arguments是一个特殊的对象，与数组相似的行为仅下述两种
			 * 1.可以使用索引下读取参数  arguments[0]或arguments[1]读取函数参数的第一个和第二个
			 * 2.可以使用length属性读取参数个数
			 * 
			 * 
			 * ！！！！arguments没有slice函数，这也是我们截取arguments参数使用Array.prototype.slice的根本原因！！！！
			 */
			var args = Array.prototype.slice.call(arguments, 1);//截取第一个，后面的用数组存放
			//console.log(arguments);
			for(var i=0;i<cache.length; i++){
				cache[i].fn.apply(me, args);
			}
		},
		
		extend : function(fn){
			for(var p in EventUtil){
				fn.prototype[p] = EventUtil[p];
			}
		}
	}
	
	window.EventUtil = EventUtil;
})()