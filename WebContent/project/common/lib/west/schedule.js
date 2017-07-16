/**
 * 
 */
function Schedule(options){
	var me = this;
	
	me.element = $(options.element);
	
	me.doctor = options.doctor;
	
	me.schedule = me.doctor.schedule;
	//创建一个div,里面有两个span,分别是挂号和费用 
	me.toolTip=$("<div class='schedule-tooltip'><span style='color:#aaa;'>挂号费：</span><span class='fee' style='color:#059981;'></span></div>");
	//将其添加到body中
	$(document.body).append(me.toolTip);
	
	me.renderSchedule();
}

Schedule.prototype.renderSchedule = function(){//日期下面的医生排班表
	var me = this;
	
	me.amContainer = $("<ul class='am-container'></ul>");//创建上午排班ul
	me.pmContainer = $("<ul class='pm-container'></ul>");//创建下午排班ul
	
	var amText = $("<li class='text'>上午</li>");//创建上午排班文本 li
	var pmText = $("<li class='text'>下午</li>");//创建下午排班文本 li
	
	me.amContainer.append(amText);//将文本添加到上午排班中
	me.pmContainer.append(pmText);//将文本添加到下午排班中
	
	for(var i = 0; i < 7; i++){//遍历一周（七个图片）
		var ali = $("<li class='schedule-disable'></li>"),//上午排班里的图片li
			pli = $("<li class='schedule-disable'></li>");//下午排班里的图片li
		
		me.amContainer.append(ali);//将图片添加到上午排班ul中
		me.pmContainer.append(pli);//将图片添加到下午排班ul中
	}
	
	me.element.append(me.amContainer).append(me.pmContainer);//将上午排班和下午排班添加到父元素中

	//绑定事件(鼠标放上去显示挂号费，移走消失)
	me.element.on("mouseover mouseout","li.schedule-disable",function(event){//事件代理方式绑定
		var target=$(event.target);//获取当前的点击对象
		if(event.type=="mouseover" && target.hasClass("schedule-enable")){//如果是鼠标移上去
			target.addClass("schedule-enable-hover");
			var fee=(target.attr("fee")-0).toFixed(2);//toFixed(2)是保留两位小数
		    fee="￥"+fee+"元";
		    var offset=target.offset();//获取图像的位置
		    
		    me.toolTip.find(".fee").html(fee);//将fee添加到.fee的html中
		    me.toolTip.css({
		    	display:'block',
		    	left:offset.left+25-83+"px",
		    	top:offset.top+53+"px"
		    });
		}else{
			target.removeClass("schedule-enable-hover");
			me.toolTip.css({
				display:'none'
			});
		}
	})
}

/**
 * 更新排班数据
 */
Schedule.prototype.updateSchedule = function(dates){
	var me = this;
	//找到.schedule-disable先把里面的样式(类)清空
	me.amContainer.find("li.schedule-disable").removeClass("schedule-enable schedule-booked schedule-out-service");
	me.pmContainer.find("li.schedule-disable").removeClass("schedule-enable schedule-booked schedule-out-service");
	
	for(var i=0; i<dates.length; i++){//遍历日期
		var dateStr = dates[i].dateStr;//将dates中的月份和年缓存
		
		for(var j=0; j<me.schedule.length;j++){//遍历医生排班表(datasource.js中的schedule)
			var sd = me.schedule[j].date.substring(5, 10);//找到schedule中的月和日
			var type = me.schedule[j].type;
			var status = me.schedule[j].status;
			var fee = me.schedule[j].fee;
			if(sd == dateStr){//如果dates中的月和日等于schedule中的月和日
				var li = me.amContainer.find("li.schedule-disable")[i];//找到上午排班中li.schedule-disable
				if(type == "下午"){
					li = me.pmContainer.find("li.schedule-disable")[i];//找到下午排班中的禁用属性
				}
				
				var cls = "";
				if(status == 1){
					cls = "schedule-enable";
				}else if(status == 2){
					cls = "schedule-booked";
				}else if(status == 3){
					cls = "schedule-out-service";
				}
				$(li).addClass(cls).attr("fee",fee);//获取fee属性(挂号费)
				//$(li).addClass(cls);//将三种图片的类名添加到li种
			}
		}
	}
}
