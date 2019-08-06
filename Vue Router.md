##	安装

	npm install vue-router
*	在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能
	> import Vue from 'vue'
	> 
	> import VueRouter from 'vue-router'
	> 
	> Vue.use(VueRouter)


##	介绍

*	Vue Router Vue.js 官方的路由器管理器。它和 Vue.js 的核心深度集成，让构建单页面变得易如反掌。
*	包含的功能有：
	*	嵌套的路由/视图表
	*	模块化的、基于组件的路由配置
	*	路由参数、查询、通配符
	*	基于 Vue.js 过渡系统的视图过渡效果
	*	细粒度的导航控制
	*	带有自动激活的 CSS class 的链接
	*	HTML5 历史模式或 hash 模型，在IE9 中自动降级
	*	自定义的滚动条行为


##	起步