/**
 * text.js
 * 1.依赖于requirejs的一个模块代码，需要由requirejs引入当前环境
 * 2.当我们需要在某个模块引入非js文件时，只需要在模块定义的依赖部分添加'text!paths/file';
 * 
 * mustache.js
 * 用于将html进行动态解析，然后给出计算后的html代码
 */
//render.js渲染模块(用define定义)
define(['datasource','text!templates/doctor.html'],function(dataSource,doctorTemp){
	var renderService={};//定义一个空对象
	var showAll=false;//与展开和收起有关
	var schedules = [];//排班表
	renderService.init=function(){//将其初始化
//		var calendar=new Calendar({
//			element:'.calender-container',
//			startDate:new Date(),
//		    inteval:35//时间间隔（必须是7的倍数）
//		});
//		
//		var schedule=new Schedule({
//			element:'.schedule-container',
//			doctor : dataSource.getDoctors()[0]
//		});
//		calendar.on("change",function(dates){//获取每一次改变的日期
//			schedule.updateSchedule(dates);
//		});
//		var dates=calendar.getCurrentDays();
//		schedule.updateSchedule(dates);
	
		var calendar = new Calendar({
			element :'.schedule-container .title-container .calendar',//找到右边的日期
			startDate: new Date(),
			inteval : 14
		});
		
		calendar.on("change",function(dates){
			for(var i=0; i<schedules.length;i++){
				schedules[i].updateSchedule(dates);
			}
		})
		
		var desc = dataSource.getDeptDesc();//得到所有的科室简介中的内容 
		
		$(".dept-desc").html(desc);//将该内容填充到需要添加的位置（从后台获取数据）
		/*展开收起部分的实现*/
		
		$(".dept-desc").readmore({
			//声明文字个数
			substr_len: 380,
			//更多连接
			more_link: '<a class="read-more pad-l-10" href="javascript:void(0)">展开>></a>'
		});
		
		//绑定点击事件(点击展开的事件)
		$(".dept-desc").on("click",function(event){
			var target = $(event.target);//获取当前的事件
			
			if(target.hasClass("read-more")){
				$(".dept-desc").html(desc);//将展开部分的内容填充进来
				
				if(showAll){//如果是展开的，将其截取，然后收起
					$(".dept-desc").readmore({
						//声明文字个数
						substr_len: 400,
						more_link: '<a class="read-more pad-l-10" href="javascript:void(0)">展开>></a>'
					});
					showAll = false;
				}else{//如果是收起的话，则展开
					$(".dept-desc").append('<a class="read-more pad-l-10" href="javascript:void(0)"><<收起</a>');
					showAll = true;
				}
			}
		})
		
		var doctors = dataSource.getDoctors();//从后台获取所有的医生信息
		/*遍历所有的医生(此种方法需要掌握，会写)*/
		for(var i=0;i<doctors.length;i++){
			doctors[i].img = function(){//医生的图片(与html中的对应)
				//this指针指向doctors[i];
				if(this.sex == 'F'){
					return 'default-woman-doc';
				}
				return 'default-man-doc';
			}
			
			if(doctors[i].desc == null){//特长判断
				doctors[i].desc = '暂无特长描述';
			}
		}
		//datas必须在模板doctorTemp中有定义才会修改数据
		//Mustache.render括号中的第一个参数是datasource传的参数,后一个括号中是从后台获取的
		var dom = Mustache.render(doctorTemp, {datas: doctors});//Mustache即是mustache.min.js中的，括号中前一个是html所在文件名，后一个是有关的数据
		
		$(".doctor-list").append(dom);
		
		//渲染排班组件
		for(var i=0;i<doctors.length;i++){
			var doc = doctors[i]
			var schedule = new Schedule({
				element :'.doctor-list .doctor[code='+doc.id+'] .schedule',
				doctor : doc
			});
			schedules.push(schedule);
		}
		
		//更新排班信息
		var dates = calendar.getCurrentDays();
		for(var i=0;i<schedules.length;i++){
			schedules[i].updateSchedule(dates);
		}
	}
	
	return renderService;
});

/*此种方法理解*/
//原始方法获取医生和医生排班信息
/*for(var i=0;i<doctors.length;i++){
	var doc = doctors[i];
	var img = 'default-man-doc';
	if(doc.sex == "F"){
		img = 'default-woman-doc'
	}
	var desc1 = '暂无特长描述';
	if(doc.desc != null){
		desc1 = doc.desc;
	}
	var dom = '<div class="doctor clear" code="'+doc.id+'">'+
					'<div class="img-container float-l pad-all-20">'+
					'<img class="" src="/xijing/project/resource/images/'+img+'.png">'+
				'</div>'+
				'<div class="float-l info mar-t-20">'+
					'<div class="name lineh30 font-w-b">'+doc.name+'</div>'+
					'<div class="level lineh30 font12">'+doc.level+'</div>'+
					'<div class="person-desc lineh30 font13"><span class="font-w-b">特长：</span>'+desc1+'</div>'+
				'</div>'+
				'<div class="float-l schedule mar-t-20"></div>'+
			'</div>';
	
	$(".doctor-list").append(dom);//将dom添加到医生列表中
	//创建医生排班组件
	var schedule = new Schedule({
		element :'.doctor-list .doctor[code='+doc.id+'] .schedule',
		doctor : doc
	});
	schedules.push(schedule);
	
}
//更新医生排班
var dates = calendar.getCurrentDays();
for(var i=0; i<schedules.length;i++){
	schedules[i].updateSchedule(dates);
}*/