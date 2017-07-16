/**
 * 
 */
//define(['datasource', 'text!templates/departments.html'],function(dataSource,deptTemp){//deptTemp用来获取departments.html中的内容
//	var renderService = {};
//	
//	renderService.init = function(){
//		
//		$(".short-desc").readmore({
//			substr_len: 95,
//			more_link: '<a class="read-more pad-l-20" href="javascript:void(0);">查看更多>></a>'
//		});
//		//添加鼠标滑动动画样式
//		var  div=$("<div class='border'><div>");
//		$(".item").append(div);
//		
//		//tab页点击事件
//		$("ul.tab").on("mouseover", '.item', function(event){//此处是事件代理方式
//			var target = $(event.target);
//			if(target.hasClass("tab-desc")){
//				renderService.onTabChange("tab-desc");//函数
//			}else{
//				renderService.onTabChange("tab-dept-list");
//			}
//			
//			var left=target.offset().left;
//			$(".border").animate({
//				left:left-150
//			});
//		})
//		
//		//查看更多的点击事件
//		$(".short-desc .read-more").on("click",function(){
//			renderService.onTabChange("tab-desc");
//		});
//	}
//	
//	//tab页变换函数(页面跳转)
//	renderService.onTabChange = function(code){
//		var target = null;
//		var line = $("ul.tab li.line");
//		if(code == "tab-desc"){//如果是医院简介页面
//			$(".desc").removeClass("hidden");
//			$("ul.tab .tab-desc").addClass("active");
//			$(".dept-list").addClass("hidden");
//			$("ul.tab .tab-dept-list").removeClass("active");
//			target = $("ul.tab .tab-desc");
//		}else{
//			$(".dept-list").removeClass("hidden");
//			$("ul.tab .tab-desc").removeClass("active");
//			$(".desc").addClass("hidden");
//			$("ul.tab .tab-dept-list").addClass("active");
//			target = $("ul.tab .tab-dept-list");
//		}
//		var pos = target.position();
//		var width = target.outerWidth(true);
//		
//		line.animate({left:pos.left+"px",width:width+"px"},400);/*可以自适应它的宽度变化*/
//	}
//	
//	//科室列表部分处理(用Mustache方法处理)
//    var depts = dataSource.getDepts();
//	
//	var dom = Mustache.render(deptTemp, {datas: depts});
//	
//	$(".dept-list > ul").append(dom);//将其添加到ul中
//	
//	//用动画处理跳转部分
//	
//	return renderService;
//})

define(['datasource', 'text!templates/departments.html'],function(dataSource,deptTemp){//deptTemp用来获取departments.html中的内容
	var renderService = {};
	
	renderService.init = function(){
		
		$(".short-desc").readmore({//使用readmore截取多行文本
			substr_len: 95,//截取长度
			more_link: '<a class="read-more pad-l-20" href="javascript:void(0);">查看更多>></a>'
		});
		//添加鼠标滑动动画样式
//		var  div=$("<div class='border'><div>");
//		$(".item").append(div);
		
		//tab页点击事件
		$("ul.tab").on("mouseover", '.item', function(event){//此处是事件代理方式
			var target = $(event.target);
			if(target.hasClass("tab-desc")){
				renderService.onTabChange("tab-desc");//函数
			}else if(target.hasClass("tab-guahao")){
				renderService.onTabChange("tab-guahao");
			}else{
				renderService.onTabChange("tab-dept-list");
			}
			
			
//			var left=target.offset().left;
//			$(".border").animate({
//				left:left-150
//			});
		})
		
		//查看更多的点击事件
		$(".short-desc .read-more").on("click",function(){
			renderService.onTabChange("tab-desc");
		});
	}
	
	//tab页变换函数(页面跳转)
	renderService.onTabChange = function(code){
		var target = null;
		var line = $("ul.tab li.line");//滑动时的那个线
		if(code == "tab-desc"){//如果是医院简介页面,则让它显示,其他的隐藏
			$(".desc").removeClass("hidden");
			$("ul.tab .tab-desc").addClass("active");
			$(".dept-list").addClass("hidden");
			$("ul.tab .tab-dept-list").removeClass("active");
			$(".guahao").addClass("hidden");
			$("ul.tab .tab-guahao").removeClass("active");
			target = $("ul.tab .tab-desc");
		}else if(code=="tab-guahao"){//如果是挂号页面
			$(".guahao").removeClass("hidden");
			$("ul.tab .tab-guahao").addClass("active");
			$("ul.tab .tab-desc").removeClass("active");
			$(".desc").addClass("hidden");
			$(".dept-list").addClass("hidden");
			$("ul.tab .tab-dept-list").removeClass("active");
			target=$("ul.tab .tab-guahao");
		}else{//科室列表页面
			$(".dept-list").removeClass("hidden");
			$("ul.tab .tab-desc").removeClass("active");
			$(".desc").addClass("hidden");
			$("ul.tab .tab-dept-list").addClass("active");
			$("ul.tab .tab-guahao").removeClass("active");
			target = $("ul.tab .tab-dept-list");
		}
		
		//设置滑动线的位置
		var pos = target.position();
		var width = target.outerWidth(true);
		
		line.animate({left:pos.left+"px",width:width+"px"},400);/*可以自适应它的宽度变化*/
	}
	
	//科室列表部分处理(用Mustache方法处理)
    var depts = dataSource.getDepts();
	
	var dom = Mustache.render(deptTemp, {datas: depts});
	
	$(".dept-list > ul").append(dom);//将其添加到ul中
	
	//用动画处理跳转部分
	
	return renderService;
})