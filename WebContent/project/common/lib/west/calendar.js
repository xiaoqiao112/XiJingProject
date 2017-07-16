/**
 * 
 */
function Calendar(options){//监听者模式形式 (var me = this)
	var me = this;
	me.element = $(options.element);//查找
	me.startDate = options.startDate;
	me.inteval = options.inteval||7;
	//组件开始时，从第0页开始计数
	me.index=0;
	me.dates=me.getDates();
	me.renderCalendar();
	me.changeStatus();
}
//函数输出结果
Calendar.prototype.getDates = function(){
	/**
	 * [{
	 * 	date: 2016-09-03
	 *  dateStr : '09/04',
	 *  weekNane : '周日'
	 * },
	 * {
	 * 	date: 2016-09-04 new Date()
	 *  dateStr : '09/05',
	 *  weekNane : '周一'
	 * }]
	 */
	var me=this;
	if(me.inteval%7 != 0){
		alert("时间跨度值应该是7的倍数");return;
	}
	var time=me.startDate.getTime();//获取开始时间
	var result=[];
	for(var i=1;i<=me.inteval;i++){//一周是7天(实现循环)
		var date=new Date(time+i*24*3600*1000);//获取它的下一天
		var month=date.getMonth()+1;
		var day=date.getDate();
		var weekName=me.getShortWeekName(date.getDay());
		//考虑到0的情况
		month= month < 10 ? ("0"+month):month;
		day= day < 10 ? ("0"+day):day;
		var dateStr=month+"/"+day;
		result.push({//将结果输出
			date:date,
			dateStr:dateStr,
			weekName:weekName,
		})
	}
	//console.log(result);
	return result;
}
Calendar.prototype.getShortWeekName=function(day){
	var weekName=['周日','周一','周二','周三 ','周四','周五','周六'];
	return weekName[day];
}
//绘制日期表(组件)
Calendar.prototype.renderCalendar=function(){//监听者模式写法
	 var me=this;
	 //console.log(me.dates);
	 //ul和左右两个按钮是并排关系，不是嵌套关系
	 me.lastBtn=$("<div class='calendar-last-btn calendar-lastbtn-disable-icon'></div>");//创建按钮所在的div
	 me.nextBtn=$("<div class='calendar-next-btn calendar-nextbtn-disable-icon'></div>");
	 me.ulContainer=$("<ul class='calendar-ul-container'></ul>")//创建存放 中间日期的ul
	 for(var i=0;i<7;i++){//此处是创建li,然后在li中创建两个div,分别 存放dateStr和weekName
		var li=$("<li>" +
				"<div class='calendar-date'>"+me.dates[i].dateStr+"</div>"+
				"<div class='calendar-week'>"+me.dates[i].weekName+"</div>"+
				"</li>");
		 me.ulContainer.append(li);//将li添加到ul中
	 }
	 me.element.append(me.lastBtn).append(me.ulContainer).append(me.nextBtn);//将ul,me.lastBtn,me.nextBtn添加到整体的calender-container中
     //给lastBtn按钮绑带事件(往前翻页),左边的按钮
	 me.lastBtn.on('click',function(event){
    	 var target=$(event.target);
    	 if(!target.hasClass("calendar-lastbtn-enable-icon")){
    		 return;
    	 }
    	 me.index--;
    	 me.changeStatus();
    	 me.renderDay();
     });
	 //给nextBtn按钮绑带事件，向后翻页
     me.nextBtn.on('click',function(event){
    	 var target=$(event.target);
    	 if(!target.hasClass("calendar-nextbtn-enable-icon")){
    		 return;
    	 }
    	 me.index++;
    	 me.changeStatus();
    	 me.renderDay();
     });
     //绑带mouseover mouseout事件，鼠标放上去和移走
     me.lastBtn.on("mouseover mouseout", function(event){
 		var target = $(event.target);
 		
 		if(event.type == "mouseover" && me.lastBtn.hasClass("calendar-lastbtn-enable-icon")){
 			me.lastBtn.addClass("calendar-lastbtn-hover-icon");
 		}else{
 			me.lastBtn.removeClass("calendar-lastbtn-hover-icon")
 		}
 	});
 	//添加浮动样式
 	me.nextBtn.on("mouseover mouseout", function(event){//给按钮绑定事件，鼠标放上去和移走
 		var target = $(event.target);
 		
 		if(event.type == "mouseover" && me.nextBtn.hasClass("calendar-nextbtn-enable-icon")){
 			me.nextBtn.addClass("calendar-nextbtn-hover-icon");
 		}else{
 			me.nextBtn.removeClass("calendar-nextbtn-hover-icon")
 		}
 	});
}
Calendar.prototype.changeStatus = function(){//按钮的改变状态
	var me = this;
	//设定左侧按钮状态
	if(me.index == 0){
		me.lastBtn.removeClass("calendar-lastbtn-enable-icon");
		me.lastBtn.removeClass("calendar-lastbtn-hover-icon");
	}else{
		me.lastBtn.addClass("calendar-lastbtn-enable-icon");
	}
	//设置右侧按钮状态
	var maxPage = this.dates.length/7 - 1;
	
	if(this.index == maxPage){
		me.nextBtn.removeClass("calendar-nextbtn-enable-icon");
		me.nextBtn.removeClass("calendar-nextbtn-hover-icon");
	}else{
		
		me.nextBtn.addClass("calendar-nextbtn-enable-icon");
	}
	
	me.fire("change", me.getCurrentDays());//绑带事件，回调函数
}     
/*每一次点击按钮后的日期更新*/
Calendar.prototype.renderDay = function(){//更新每一次点击按钮后的日期
	var me = this;
	
	var days = me.ulContainer.find(".calendar-date"),//获取日期
		weekNames = me.ulContainer.find(".calendar-week");//获取星期
	
	for(var i = 0; i < 7; i++){
		$(days[i]).html(me.dates[me.index*7+i].dateStr);
		$(weekNames[i]).html(me.dates[me.index*7+i].weekName);
	}
}
Calendar.prototype.getCurrentDays=function(){//获取每一次切换时的日期（7个）
	var me=this;
	var result=me.dates.slice(me.index*7,me.index*7+7);//前面是初位置，后面 是最终位置
	return result;
}
EventUtil.extend(Calendar);//监听者模式