

##	介绍


----------

*	**警告**	这份文档是对应 `@vue/cli` 3.x 版本的!


----------

*	Vue CLI 是一个基础Vue.js进行快速开发的完整系统，提供：
	*	通过 `@vue/cli` 搭建交互式的项目脚手架。
	*	通过 `@vue/cli` + `@vue/cli-service-global` 快速开始零配置原型开发。
	*	一个运行时依赖（`@vue.cli-service` ），该依赖：
		*	可升级；
		*	基于 webpack 构建，并带有合理的默认配置；
		*	可以通过项目内的配置文件进行配置；
		*	可以通过插件进行扩展。
	*	一个丰富的官方插件集合，继承了前端生态重最好的工具。
	*	一套完全图形画的创建和管理 Vue.js 项目的用户界面。

###	该系统的组件
####	CLI
*	CLI (`@vue/cli`) 是一个全局安装的 npm 包，提供了终端里的 `vue` 命令。它可以通过 `vue create` 快速创建一个新项目的脚手架，或者直接通过 `vue serve` 构建新想法的原型。你也可以通过 `vue ui` 通过一套图形化界面管理你的所有项目。

####	CLI服务
*	CLI服务（`@vue/cli-service`）是一个开发环境依赖。它是一个npm包，局部安装在每个 `@vue/cli` 创建的项目中。
*	CLI 服务是构建 [webpack](https://webpack.js.org/) 和 [webpack-sev-server](https://github.com/webpack/webpack-dev-server) 之上的。包含了：
	*	加载其他 CLI 插件的核心服务；
	*	一个针对绝大部分应用优化过的内部的 webpack 配置；
	*	项目内部的 `vue-cli-service` 命令，提供 `serve` 、`build` 和 `inspect` 命令。

####	CLI插件
*	CLI 插件是向你的 Vue 项目提供可选功能的 npm 包，例如 Babel/TypeScript 转移、ESLint 集成、单元测试和 end-to-end 测试等。Vue CLI 插件的名字以 `@vue/cli-plugin-`（内建插件—）或 `vue-cli-plugin-`（社区插件）开头，非常容易使用。
*	当你在项目而不允许 `vue-cli-service` 命令时，它会自动解析并加载 `package.json` 中列出的所有 CLI 插件。
*	插件可以作为项目创建过程中的一部分，或在后期加入到项目中。它们也可以被归成一组可复用的 preset。

##	安装
*	**关于旧版本**	Vue CLI 的包名称由 `vue-cli` 改成了 `@vue/cli`。 如果你已经全局安装了旧版本的 `vue-cli` (1.x 或 2.x)，你需要先通过 `npm uninstall vue-cli -g` 或 `yarn global remove vue-cli` 卸载它。
*	**Node版本要求**	Vue CLI 需要 Node.js 8.9 或更高版本 (推荐 8.11.0+)。

*	可以使用下列任一命令安装这个新的包：
*	`npm install -g @vue/cli`
*	`OR`
*	`yarn global add @vue/cli`

##
###	基础
##	快速原型开发
*	可以使用 `vue serve` 和 `vue build` 命令对单个 `*.vue` 文件进行快速原型开发，不过这需要先额外安装一个全局的扩展：
*	`npm install -g @vue/cli-service-global`
*	`vue serve` 的缺点就是它需要安装全局依赖，这使得它在不同机器上的一致性不能得到保证，因此这只适合于快速原型开发。

###	vue serve

###	vue build
*	使用 `vue build` 将目标文件构建成一个生产环境的包并用来部署。

##	创建一个项目
###	vue creat
*	运行以下命令来创建一个新项目：
*	`vue create hello-world`		(hello-world：要创建的项目的名字)
*	vue create 命令有一些可选项：
	*	`vue create --help`
	![](https://i.imgur.com/ZMS8GwR.png)

###	使用图形化界面
*	也可以通过 vue ui 命令以图形化界面创建和管理项目：
*	`vue ui`

###	拉取 2.x 模板 (旧版本)
*	Vue CLI >= 3 和旧版使用了相同的 `vue` 命令，所以 Vue CLI 2 (`vue-cli`) 被覆盖了。如果你仍然需要使用旧版本的 `vue init` 功能，你可以全局安装一个桥接工具：
	*	`npm install -g @vue/cli-init`
	*	# `vue init` 的允许效果将会跟 `vue-cli@2.x` 相同
	*	`vue init webpack my-project`

##	插件和预设配置
###	插件
*	Vue CLI 使用了一套基于插件的架构。如果你查阅一个新创建的 `package.json`，就会发现依赖都是以 `@vue/cli-plugin-` 开头的。插件可以修改内部的 webpack 配置，也可以向 `vue-cli-service` 注入命令。在项目创建的过程中列出的特性，绝大部分都是通过插件来实现的。
*	基于插件的架构使得 Vue CLI 灵活且可扩展。


----------

	> 提示

	> 你可以通过 `vue ui` 命令使用 GUI 安装和管理插件。

----------

###	#	在现有的项目中安装插件
*	每个 CLI 插件都会包含一个 (用来创建文件的) 生成器和一个 (用来调整 webpack 核心配置和注入命令的) 运行时插件。当你使用 `vue create` 来创建一个新项目的时候，有些插件会根据你选择的特性被预安装好。如果你想在一个已经被创建好的项目中安装一个插件，可以使用 `vue add` 命令：
	*	`vue add @vue/eslint`	===	`vue add @vue/cli-plugin-eslint`
	*	这个命令将 @vue/eslint 解析为完整的包名 @vue/cli-plugin-eslint，然后从 npm 安装它，调用它的生成器。
	*	
----------

	> 提示
	
	> `vue add` 的设计意图是为了安装和调用 Vue CLI 插件。 对于普通的 npm 包而言，这不意味有一个替代（命令）。对于这些普通的 npm 包，你仍然需要（根据所选的 npm 包）使用包管理器。

----------

	> 警告

	> 我们推荐在运行 `vue add` 之前将项目的最新状态提交，因为该命令将会调用插件的文件生成器并很有可能会更改你现有文件。

----------

###	预设配置
*	Vue CLI 预设配置是一个包含创建新项目所需的预定义选项和插件的 JSON 对象，让用户无需在命令提示中选择它们。


##
###	开发
##	浏览器兼容性
