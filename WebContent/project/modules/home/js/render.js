/**
 * text.js
 * 1.依赖于requirejs的一个模块代码，需要由requirejs引入当前环境
 * 2.当我们需要在某个模块引入非js文件时，只需要在模块定义的依赖部分添加'text!paths/file';
 * 
 * mustache.js
 * 用于将html进行动态解析，然后给出计算后的html代码
 */
define(['datasource','text!templates/index.html','text!templates/new.html'], function(dataSource,dept,newTemplate){
	var renderService = {};
	
	renderService.init = function(){//给ul中li绑带事件
		//1.医生数据过多时
		//2.有些医生有图片，有些医生没有图片时(要会写代码)
		var doctors=dataSource.getDoctors();//此处是动态获取后台数据
		if(doctors.length > 5){//此处是截取多余的图片
			//截取函数
			doctors = doctors.slice(0, 5);
		}
		for(var i=0;i<doctors.length;i++){//遍历医生，sexImg只是图片路径中图片的名字，改变它即可以改变图片
			//doctors[i].sexImg = doctors[i].sex == 'M' ? 'default-man-doc':'default-woman-doc';
			
			doctors[i].defaultImg = function(){
				
				if(this.sex == 'M'){
					return 'default-man-doc';
				}
				else{
					return 'default-woman-doc';
				}
			}
			
			doctors[i].level = i+1;//奖牌设置
			
			if(doctors[i].img==''){//先判断有无图片
				doctors[i].img=function(){//如果无图片，再判断男女
				if(this.sex=='M'){
					return '/xijing/project/modules/home/images/default-man-doc.png';
				}else{
					return '/xijing/project/modules/home/images/default-woman-doc.png';
				}
			  }
			}else{//否则的话直接是它本身
				 img=doctors[i].img;
			}
		}
		
		var dom = Mustache.render(dept, {datas: doctors});
		$(".sort").append(dom);//将其添加到ul中
		
		
        var news = dataSource.getNews();//此处是动态从后台添加新闻数据
		
		if(news.length ==0){
			return;
		}
		var main = news[0];//主新闻
		
		var lastIndex = 4;
		if(news.length < 4){
			lastIndex = news.length;
		}
		var newsArr = news.slice(1,lastIndex);//定义一个新闻数组，截取news种的后三个
		
		var newDom = Mustache.render(newTemplate, {datas:newsArr})
		
		$(".news-b > ul").append(newDom);
		
		//渲染主新闻(动态渲染主新闻)
		$(".main-new img").attr('src', main.img);//news[0]
		$(".main-new .new-title").html(main.title);
		$(".main-new .new-content").html(main.content);
		
		return;//此句是为了用第二种css3的方法实现动画，阻止js方法实现动画
		$(".step-container .step").on("mouseover mouseout", function(event){
			/**
			** 1.准确找到step元素，后续计算以step为基础
			** 
			** 2.注意closest用法
			*
			*  3.要注意到jquery动画会自动创建动画列表，然后依次执行，需要避免由这种情况带来问题
			**/
			var target = $(event.target).closest(".step");//找到对应的li列表
			//var target=$(event.currentTarget);
			//找到li中动画的部分
			var textContainer = target.find(".text-container"),//找到需要动画的地方
				lookup = target.find(".lookup");
			    img = target.find(".img");
			
			/*使用js方式让图片发生变化*/
			var allClassName=img.attr("class");//img属性的class全名
			//console.log(allClassName);
			var imgClsName=allClassName.substring(0,allClassName.indexOf(" "));//截取class中img前面的
			
			if(event.type == "mouseover"){
				img.addClass(imgClsName+"-hover");//鼠标放上去，变成hover状态的类
				if(textContainer.is(":animated")){//此处用来处理动画闪烁效果
					//stop会清空textContainer内部的动画数组列表，然后停止动画
					textContainer.stop().animate({
						"margin-top" : 20
					},150);
				}else{
					textContainer.animate({
						"margin-top" : 20
					},150);
				}
				
				if(lookup.is(":animated")){
					lookup.stop().animate({
						"height":"32px",
						"line-height":"32px"
					},150)
				}else{
					lookup.animate({
						"height":"32px",
						"line-height":"32px"
					},150)
				}
			}else{//否则移除hover状态的类
				img.removeClass(imgClsName+"-hover");
				if(textContainer.is(":animated")){
					//stop会清空textContainer内部的动画数组列表，然后停止动画
					textContainer.stop().animate({
						"margin-top" : 60
					},150);
				}else{
					textContainer.animate({
						"margin-top" : 60
					},150);
				}
				
				if(lookup.is(":animated")){
					lookup.stop().animate({
						"height":"0px",
						"line-height":"0px"
					},150)
				}else{
					lookup.animate({
						"height":"0px",
						"line-height":"0px"
					},150)
				}
			}
		});
	}
	return renderService;
});
