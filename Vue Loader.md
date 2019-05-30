##	介绍
###	Vue Loader 是什么？
*	Vue Loader 是一个 webpack 的 loader，它允许你以一种名为单文件组件 (SFCs)的格式撰写 Vue 组件。
*	Vue Loader 还提供了很多酷炫的特性：
	*	允许Vue组件的每个部分使用其它的webpack loader，例如在 `<style>` 的部分使用Sass和在 `<template>` 的部分使用Pug；
	*	允许在一个 `.vue` 文件中使用自定义块，并对其运用自定义的loader链；
	*	使用 webpack loader 将 `<style>` 和 `<template>` 中引用的资源当作模块依赖来处理；
	*	为每个组件模拟出 scoped CSS；
	*	在开发过程中使用热重载来保持状态。
*	简而言之，webpack 和 Vue Loader 的结合为你提供了一个现代、灵活且极其强大的前端工作流，来帮助撰写 Vue.js 应用。

##	起步
###	Vue CLI
*	果你不想手动设置 webpack，我们推荐使用 Vue CLI 直接创建一个项目的脚手架。通过 Vue CLI 创建的项目会针对多数常见的开发需求进行预先配置，做到开箱即用。

###	手动设置
####	安装
*	应该将 vue-loader 和 vue-template-compiler 一起安装——除非你是使用自行 fork 版本的 Vue 模板编译器的高阶用户：
	*	`npm install -D vue-loader vue-template-compiler`
*	vue-template-compiler 需要独立安装的原因是你可以单独指定其版本。
*	每个 vue 包的新版本发布时，一个相应版本的 vue-template-compiler 也会随之发布。编译器的版本必须和基本的 vue 包保持同步，这样 vue-loader 就会生成兼容运行时的代码。这意味着你每次升级项目中的 vue 包时，也应该匹配升级 vue-template-compiler。

####	webpack 配置
*	Vue Loader 的配置和其它的 loader 不太一样。除了通过一条规则将 vue-loader 应用到所有扩展名为 .vue 的文件上之外，请确保在你的 webpack 配置中添加 Vue Loader 的插件：
	![](https://i.imgur.com/p48b2y3.png)
*	**这各插件是必须的！**它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。


