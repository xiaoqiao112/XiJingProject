/**
 * 初始化模块环境，加载所有define函数定义的对象
 */
requirejs.config({
	baseUrl : '/xijing/project/modules/home/',
	/**
	 * define定义的模块才需要由requirejs初始化时加载并缓存在requirejs的环境中
	 */
	paths : {
		//text脚本是依赖于requirejs才能存活的功能
		text:'../../common/lib/requirejs/text',
		render:'js/render',
		datasource:'js/datasource'
	}
});
/**
 * Amd程序主函数
 */
require(['render'], function(RenderService){
	RenderService.init();
});