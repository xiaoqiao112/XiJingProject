<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>医生排班</title>
<link type="text/css" rel="stylesheet" href="/xijing/project/resource/css/base.css">
<link type="text/css" rel="stylesheet" href="/xijing/project/modules/schedule/css/index.css">
<link type="text/css" rel="stylesheet" href="/xijing/project/common/lib/west/resource/css/west.css">
</head>
<body>
<div class="wrapper">
<!-- 头部 -->
	<div class="head font14 lineh50">
		<!-- 书写a标签时，如果不希望点击跳转，把href值写成"javascript:void(0);",一定不能空下来 -->
		<!-- 样式定义尽量共用且易读 -->
		<!-- 书写行内标签即可 a或span均可以 -->
		<span class="pad-r-5" href="javascript:void(0);">首页</span>
		>
		<span class="pad-lr-5" href="javascript:void(0);">网上预约</span>
		>
		<span class="pad-l-5" href="javascript:void(0);">临床免疫科</span>
	</div>
<!-- 科室简介 -->
	<div class="dept-container">
		<div class="dept-title mar-lr-20 font18 font-w-b lineh56">
			科室简介
		</div>
		<!-- 展开收起部分 -->
		<div class="dept-desc font14 pad-all-20 line-h150">
		
		</div>
	</div>
	<div class="clear"></div>
<!-- 科室医生部分 -->
	<div class="schedule-container mar-t-20">
		<div class="title-container pad-tb-20 mar-lr-20">
			<div class="float-l w50 lineh40">
				<span class="font18 font-w-b">科室医生</span>
				<span class="doctor-info font12 pad-l-10">
					共找到
					<span class="doctor-num">3</span>
					位医生
				</span>
			</div>
			<div class="float-r calendar w50">
			</div>
		</div>
		<div class="doctor-list mar-lr-20">
			<!-- 关于浮动问题解决方法
				1.非IE7和IE8下，使用clear:both;清除浮动带问题
				2.在IE7和IE8下，使用zoom:1清除浮动问题
			 -->
		<!--	<div class="doctor clear">
				<div class="img-container float-l pad-all-20">
					<img class="" src="/xijing/project/resource/images/default-man-doc.png">
				</div>
				<div class="float-l info mar-t-20">
					<div class="name lineh30 font-w-b">庞娟</div>
					<div class="level lineh30 font12">副教授</div>
					<div class="person-desc lineh30 font13"><span class="font-w-b">特长：</span>暂无特长信息</div>
				</div>
				<div class="float-l schedule mar-t-20"></div>
				<!-- 解决浮动方法：在父元素的最后一个位置添加div元素，并且声明样式clear:both;zoom:1
				<div style="clear:both;zoom:1"></div> 
			</div>
			-->
		</div>
	</div>
</div>

<!-- 提升页面渲染速度 -->
<!-- 在window上注入$和jQuery对象 -->
<script type="text/javascript" src="/xijing/project/common/lib/jquery/jquery-1.12.3.min.js"></script>
<!-- readmore是依赖jquery的类库，所以加载时必须要放到jquery后面 -->
<script type="text/javascript" src="/xijing/project/common/lib/jquery/readmore.js"></script>
<script type="text/javascript" src="/xijing/project/common/lib/mustache/mustache.min.js"></script>
<!-- 在window上注入EventUtil对象 -->
<script type="text/javascript" src="/xijing/project/common/lib/west/eventutil.js"></script>
<!-- 在window上注入Calendar对象 -->
<script type="text/javascript" src="/xijing/project/common/lib/west/calendar.js"></script>
<script type="text/javascript" src="/xijing/project/common/lib/west/schedule.js"></script>
<script type="text/javascript" src="/xijing/project/common/lib/requirejs/require-min.js" 
	data-main="/xijing/project/modules/schedule/index.js"></script>
</body>
</html>