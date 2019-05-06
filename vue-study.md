#	基础

## 	组件基础
* 因为**组件是可复用的 Vue 实例**，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。
* 可以将组件**进行任意次数的复用**。
* 一个组件的 **data 选项必须是一个函数**。

###		组件的组织
* 两种组件的注册类型：全局注册和局部注册。
	* Vue.component	---全局注册
		* `Vue.component('my-component-name', {
		  		// ... options ...
		    })`
		* 全局注册的组件可以用在其被注册之后的任何 (通过 new Vue) 新创建的 Vue 根实例，也包括其组件树中的所有子组件的模板中。
	* ---全局注册

###		通过Prop向子组件传递数据
* Prop 是你可以在组件上注册的一些自定义特性。当一个值传递给一个 prop 特性的时候，它就变成了那个组件实例的一个属性。

##	深入了解组件
###		组件注册
* 组件名
	* 你给与组件的名字可能依赖于你打算拿它来做什么。当直接在DOM中使用一个组件（而不是在字符串模板或单文件组件）的时候，我们强烈推荐遵循 [W3C](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name) 规范中的自定义组件名 (字母全小写且必须包含一个连字符)。这会帮助你避免和当前以及未来的 HTML 元素相冲突。
	* 组件名大小写（定义组件名的方式有两种）
		* 使用kebab-case（短横线分隔命名）
			* `Vue.component('my-component-name', { /* ... */ })`
			* 当使用kebab-case定义一个组件时，也必须在引用这个自定义元素时使用kebab-case，例如：<my-component-name>。
		* 使用PascalCase（驼峰命名法）
			* `Vue.component('MyComponentName', { /* ... */ })`
			* 当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 <my-component-name> 和 <MyComponentName> 都是可接受的。
	* 注意，尽管如此，由于 HTML 是大小写不敏感的，直接在 DOM (即非字符串的模板) 中使用时只有 kebab-case 是有效的。

* 全局注册

* 局部注册
	* 全局注册往往是不够理想的。比如，如果你使用一个像 webpack 这样的构建系统，全局注册所有的组件意味着即便你已经不再使用一个组件了，它仍然会被包含在你最终的构建结果中。这造成了用户下载的 JavaScript 的无谓的增加。
		* 可以通过一个普通的 JavaScript 对象来定义组件：
		 * `var ComponentA = { /* ... */ }`
		 * `var ComponentB = { /* ... */ }`
		 * `var ComponentC = { /* ... */ }`
		* 然后在 components 选项中定义你想要使用的组件：
		 * `new Vue({
			  el: '#app',
			  components: {
			    'component-a': ComponentA,
			    'component-b': ComponentB
			  }
			})`
		* 对于 components 对象中的每个属性来说，其属性名就是自定义元素的名字，其属性值就是这个组件的选项对象
	* 注意局部注册的组件在其子组件中不可用。

###		Prop
* Prop的大小写 (camelCase vs kebab-case)
	* HTML 中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名：
		* `Vue.component('blog-post', {
			  // 在 JavaScript 中是 camelCase 的
			  props: ['postTitle'],
			  template: '<h3>{{ postTitle }}</h3>'
			})`
		* `<!-- 在 HTML 中是 kebab-case 的 -->
			<blog-post post-title="hello!"></blog-post>`
		* 当然，如果使用字符串模板，那么这个限制就不存在了。

* [Prop类型](https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E7%B1%BB%E5%9E%8B)
	
* 单向数据流
	* 所有的prop都使得其父子prop之间形成了一个单向下行绑定：父级prop的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的引用的数据流向难以理解。
	* 额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。

* 非Prop的特效
	* 禁用特性继承
		* 如果**不**希望组件的根元素继承特效，可以在组件的选项中设置inheritAttrs: false。
			* `Vue.component('my-component', {
				  inheritAttrs: false,
				  // ...
				})`

##	自定义事件
###		事件名
* 不同于组件和prop，事件名不存在任何自动化的大小写转换。而是触发的事件名需要匹配监听这个事件所用的名称。
* 推荐始终使用** kebab-case **的事件名。

###		自定义组件的v-model
* 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value 特性用于不同的目的。

###		将原生事件绑定到组件

###		.sync修饰符
* 注意带有 **.sync **修饰符的 **v-bind ****不能**和表达式一起使用 (例如 **v-bind:title.sync=”doc.title + ‘!’” 是无效的**)。取而代之的是，你只能提供你想要绑定的属性名，类似 **v-model**。
* 当我们用一个对象同时设置多个 prop 的时候，也可以将这个 .sync 修饰符和 v-bind 配合使用：
* `<text-document v-bind.sync="doc"></text-document>`
* 这样会把 doc 对象中的每一个属性 (如 title) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 v-on 监听器。
* 将** v-bind.sync **用在一个字面量的对象上，例如 **v-bind.sync=”{ title: doc.title }”**，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。


##	插槽
* 在 2.6.0 中，我们为具名插槽和作用域插槽引入了一个新的统一的语法 (即 v-slot 指令)。它取代了 slot 和 slot-scope 这两个目前已被废弃但未被移除且仍在文档中的特性。
###		插槽内容
* Vue 实现了一套内容分发的 API，将 <slot> 元素作为承载分发内容的出口。

###		编译作用域
* 作为一条规则，请记住：
	**父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。**

###		[后备内容](https://cn.vuejs.org/v2/guide/components-slots.html#%E5%90%8E%E5%A4%87%E5%86%85%E5%AE%B9)
* 有时为一个插槽设置具体的后备 (也就是默认的) 内容是很有用的，它只会在没有提供内容的时候被渲染。

###		具名插槽
* 注意 v-slot 只能添加在一个 <template> 上 (只有一种[例外情况](https://cn.vuejs.org/v2/guide/components-slots.html#%E7%8B%AC%E5%8D%A0%E9%BB%98%E8%AE%A4%E6%8F%92%E6%A7%BD%E7%9A%84%E7%BC%A9%E5%86%99%E8%AF%AD%E6%B3%95))，这一点和已经废弃的 slot 特性不同。

###		[作用域插槽](https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD)


###		具名插槽的缩写
* 跟v-on（@）和v-bind（：）一样，v-slot也有缩写，即把参数之前的所有内容（v-slot:）替换为字符#。例如v-slot:header可以被重写为#header

##	动态组件&异步组件
###		在动态组件上使用keep-alive

###		异步组件
* 在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。为了简化，Vue允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。Vue只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染。

* 处理加载状态
	

##	处理边界情况
###		访问元素&组件
* 在绝大多数情况下，我们最好不要触达另一个组件实例内部或手动操作DOM元素。
* 访问根实例
	* 在每个 new Vue 实例的子组件中，其根实例可以通过 $root 属性进行访问。 
	* 对于 demo 或非常小型的有少量组件的应用来说这是很方便的。不过这个模式扩展到中大型应用来说就不然了。因此在绝大多数情况下，我们强烈推荐使用 [Vuex](https://github.com/vuejs/vuex) 来管理应用的状态。

* 访问父级组件实例
	* 和$root类似，$parent属性可以用来从一个子组件访问父组件的实例。它提供了一个机会，可以在后期随时触达父级组件，以替代将数据以prop的方式传入子组件的方式。
	* 在绝大多数情况下，触达父级组件会使得你的应用更难调试和理解，尤其是你变更了父级组件的数据的时候。当我们稍后会看那个组件的时候，很难找出那个变更是从哪里发起的。

* 访问子组件实例或子元素
	* 尽管存在prop和时间，有的时候你仍可能需要在JavaScript里直接访问一个子组件。为了达到这个目的，你可以通过ref特性为这个子组件赋予一个ID引用。
	* 当 ref 和 v-for 一起使用的时候，你得到的引用将会是一个包含了对应数据源的这些子组件的数组。
	* $refs 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 $refs。

* 依赖注入


###		程序化的事件侦听器
	* 通过 $on(eventName, eventHandler) 侦听一个事件
	* 通过 $once(eventName, eventHandler) 一次性侦听一个事件
	* 通过$pff(eventName, eventHandler) 停止侦听一个事件

###		循环引用
* 递归组件
	* 组件时可以在它们自己的模板中调用自身的。不过它们只能通过name选项来做这件事：
		* `name: 'unique-name-of-my-component'`
	* 当使用Vue.component全局注册一个组件时，这个全局的ID会自动设置为该组件的name选项。

* 组件之间的循环引用
	
###		模板定义的替代品
* 内联模板
	* 当inline-template这个特殊的特性出现在一个子组件上时，这个组件将会使用其里面的内容作为模板，而不是将其作为被分发的内容。这使得模板的撰写工作更加灵活。
		* `<my-component inline-template>
			  <div>
			    <p>These are compiled as the component's own template.</p>
			    <p>Not parent's transclusion content.</p>
			  </div>
			</my-component>`
	* 内联模板需要定义在Vue所属的DOM元素内。
		* 不过，inline-template会让模板的作用域变得更加难以理解。所以作为最佳实践，请在组件内优先选择template选项或 .vue 文件里的一个 <template> 元素来定义模板。
* [X-Template](https://cn.vuejs.org/v2/guide/components-edge-cases.html#X-Template)

###		控制更新
* 通过 v-once 创建低开销的静态组件
	* 渲染普通的 HTML 元素在 Vue 中是非常快速的，但有的时候你可能有一个组件，这个组件包含了大量静态内容。在这种情况下，你可以在根元素上添加 v-once 特性以确保这些内容只计算一次然后缓存起来，就像这样：
		* ``


#	过渡&动画
##	进入/离开&列表过渡
###		概述
* Vue在插入、跟新或者移除DOM时，提供多种不同方式的应用过渡效果。
* 包括以下工具：
	* 在CSS过渡和动画中自动应用class
	* 可以配合使用第三方CSS动画库，如果Animate.css
	* 在过渡钩子函数中使用JavaScript直接操作DOM
	* 可以配合使用第三方JavaScript动画库，如Velocity.js
* 在这里，只能江到进入、离开和列表的过渡。

###		单元素/组件的过渡
* Vue提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡
	* 条件渲染（使用 v-if ）
	* 条件展示（使用 v-show）
	* 动态组件
	* 组件根节点

* 当插入或删除包含在 transition 组件中的元素时，Vue将会做以下处理：
	* 自动嗅探目标元素是否应用了CSS过渡或动画，如果是，在恰当的时机添加/删除CSS类名。
	* 如果过渡组件提供了JavaScript钩子函数，这些钩子函数将在恰当的时机被调用。
	* 如果没有找到JavaScript钩子并且也没有检测到CSS过渡/动画，DOM操作（插入/删除）在下一帧中立即执行。（注意：此指浏览器逐帧动画机制，和Vue的nextTick 概率不同）

####		过渡的类名
* 在进入/离开的过渡中，会有6个class切换。
	* 1.v-enter：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
	* 2.v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
	* 3.v-enter-to：**2.1.8版及以上** 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。
	* 4.v-leave： 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
	* 5.v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
	* 6.v-leave-to：**2.1.8版及以上** 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效（于此同时 v-leave 被删除），在过渡/动画完成之后移出。
	* ![](https://i.imgur.com/0cqRgVm.png)
* 对于这些在过渡中切换的类名来说，如果你使用一个没有名字的<transition>,则 v- 是这些类名的默认前缀。如果使用了<transition name="my-transition">，那么 v-enter 会替换为 my-transition-enter。
* v-enter-active 和 v-leave-active 可以控制进入/离开过渡的不同的缓和曲线。

####		CSS过渡
* 常用的 过渡都是使用CSS过渡。
####		CSS动画
* CSS动画用法同CSS过渡，区别是在动画中 v-enter 类名在节点插入DOM后不会立即删除，而是在 animationend 时间触发时删除。
####		自定义过渡的类名
* 我们可以通过以下特性来自定义过渡类名：
	* enter-class
	* enter-active-class
	* enter-to-class
	* leave-class
	* leave-active-class
	* leave-to-class
* 他们的优先级高于普通的类名，这对于Vue的过渡系统和其他第三方CSS动画库，如 [Animate.css](https://daneden.github.io/animate.css/) 结合使用十分有用。

####		同时使用过渡和动画
* Vue为了知道过渡的完成，必须设置相应的事件监听器。它可以是 transitionend 或 animationend ，这取决于给元素应用的CSS规则。如果你使用其中任何一种，Vue能自动识别类型并设置监听。
* 但是，在一些场景中，你需要给同一个元素设置两种过渡效果，比如 animation 很快的被触发并完成了，而 transition 效果还没结束。在这种情况中，你就需要使用 type 特性并设置 animation 或 transition 来明确声明你需要 Vue 监听的类型。

####		显性的过渡持续事件
* 在很多情况下，Vue 可以自动得出过渡效果的完成时机。默认情况下，Vue 会等待其在过渡效果的根元素的第一个 transitionend 或 animationend 事件。然而也可以不这样设定——比如，我们可以拥有一个精心编排的一系列过渡效果，其中一些嵌套的内部元素相比于过渡效果的根元素有延迟的或更长的过渡效果。
* 在这种情况下你可以用 <transition> 组件上的 duration 属性定制一个显性的过渡持续时间 (以毫秒计)：
	* `<transition :duration="1000">...</transition>`
* 你也可以定制进入和移除的持续事件：
	* `<transition :duration="{ enter: 500, leave: 800 }">...</transition>`

####		[JavaScript钩子](https://cn.vuejs.org/v2/guide/transitions.html#JavaScript-%E9%92%A9%E5%AD%90)
* 可以在属性中声明JavaScript钩子
	
###		初始渲染的过渡
* 可以通过appear特性设置节点在初始渲染的过渡
	* `<transition appear>......</transition>`
* 这里默认和进入/离开过渡一样，同样也可以自定义CSS类名。
	* ``

###		多个元素的过渡
* 当有相同标签名的元素切换时，需要通过 **key** 特性设置唯一的值来标记以让 Vue 区分它们，否则 Vue 为了效率只会替换相同标签内部的内容。即使在技术上没有必要，给在 **<transition>** 组件中的多个元素设置 key 是一个更好的实践。

####	过渡模式
* 同时生效的进入和离开的过渡不能满足所有要求，所以 Vue 提供了 过渡模式。
	* in-out：新元素先进行过渡，完成之后当前元素过渡离开。
	* out-in：当前元素先进行过渡，完成之后新元素过渡离开。

###		多个组件的过渡
* 多个组件的过渡简单很多-我们不需要使用 key 特性。相反，我们只需要使用动态组件
###		列表过渡
####	列表的进入/离开过渡
####	列表的排序过渡
* <transition-group> 组件还有一个特殊之处。不仅可以进入和离开动画，还可以改变定位。要使用这个新功能只需了解新增的 v-move 特性，它会在元素的改变定位的过程中应用。像之前的类名一样，可以通过 name 属性来自定义前缀，也可以通过 move-class 属性手动设置。
* v-move对于设置过渡的接环时间和过渡曲线非常有用。
* 需要注意的是使用 FLIP 过渡的元素不能设置为 display: inline 。作为替代方案，可以设置为 display: inline-block 或者放置于 flex 中。
###		可复用的过渡
* 过渡可以通过Vue的组件系统实现复用。要创建一个可复用过渡组件，你需要做的就是将 <transition> 或者 <transition-group> 作为根组件，然后将任何子组件防止在其中就可以了。
###		动态过渡
* 在Vue中鸡时时过渡也需要数据驱动的！动态过渡最基本的例子是通过name特性来绑定动态值。
	* `<transition v-bind:name="transitionName"><!--...--></transition>`
* 当你想用Vue的过渡系统来定义的CSS过渡/动画，在不同过渡间切换会非常有用。
* 所有过渡特性都可以动态绑定，但我们不仅仅只有特性可以利用，还可以通过事件钩子获取上下文中的所有数据，因为事件钩子都是方法。这意味着，根据组件的状态不同，你的 JavaScript 过渡会有不同的表现。

##	状态过渡
* Vue 的过渡系统提供了非常多简单的方法设置进入、离开和列表的动效。那么对于数据元素本身的动效呢，比如：
	* 数字和运算
	* 颜色的显示
	* SVG 节点的位置
	* 元素的大小和其他的属性
* 这些数据要么本身就以数值形式存储，要么可以转换为数值。有了这些数值后，我们就可以结合 Vue 的响应式和组件系统，使用第三方库来实现切换元素的过渡状态。

###		[状态动画与侦听器](https://cn.vuejs.org/v2/guide/transitioning-state.html#%E7%8A%B6%E6%80%81%E5%8A%A8%E7%94%BB%E4%B8%8E%E4%BE%A6%E5%90%AC%E5%99%A8)
* 通过侦听器我们能监听到任何数值属性的数值更新。

#	可复用性&组合
##	混入
###	基础
* 混入（mixin）提供了一种非常灵活的方式，来分发Vue组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。
###	选项合并
* 当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。
* 比如，数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。
* 值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

###	全局混入
* 混入也可以进行全局注册。使用时格外小心！一旦使用全局混入，它将影响每一个之后创建的Vue实例。使用恰当是，这可以用来为自定义选项注入处理逻辑。
* 请谨慎使用全局混入，因为它会影响每个单独创建的Vue实例（包括第三方组件）。大多数情况下，只应当应用于自定义选项，就像上面示例一样。推荐将其作为插件发布，以避免重复应用混入。

###	自定义选项合并策略
* 自定义选项将使用默认策略，即简单地覆盖已有值。如果想让自定义选项以自定义逻辑合并，可以向 Vue.config.optionMergeStrategies 添加一个函数：
	* 
	`Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) { //返回合并后的值}`
* 对于多数值为对象的选项，可以使用与 methods 相同的合并策略：
	* `var strategies = Vue.config.optionMergeStrategies`
	* `strategies.myOption = strategies.methods`

##	自定义指令
###	简介
* 除了核心功能默认内置的指令（v-model 和 v-show），Vue也允许注册自定义指令。注意，在Vue2.0中，代码复用和抽象的主要形式时组件。然后，有点情况下，你仍然需要多普通DOM元素进行底层操作，这时候会用到自定义指令。

###	钩子函数
* 一个指令定义对象可以提供如下几个狗子函数（均为可选）：
	* **bind** ：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
	* **inserted** ：被绑定元素插入父节点时调用（仅保证父节点存在，但不一定已被插入文档中）。
	* **update** ：所在组件的VNode更新时调用，**但是可能发生在其子VNode更新之前**。只能的值可能发生了改变，也可能没有。但是可以通过比较更新前后的值来忽略不必要的模板更新。
	* **componentUpdated** ：只能所在组件的VNode及其子VNode全部更新后调用。
	* **unbind** ：只调用一次，指令与元素解绑时调用。

###	钩子函数参数
* 指令钩子函数会被传入以下参数：
	* el：指令所绑定的元素，可以用来直接操作DOM。
	* binding：一个对象，包含以下属性：
		* name ：指令名，不包括 v- 前缀。
		* value ：指令的绑定值，例如： v-my-directive="1+1"中，绑定值为2.
		* oldValue ：指令绑定的前一个值，仅在 update 和componentUpdated 钩子中可用。无论值是否可以改变否可用。
		* expression ： 字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
		* arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
		* modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
	* vnode ：Vue编译生成的虚拟节点。[VNode API](https://cn.vuejs.org/v2/api/#VNode-%E6%8E%A5%E5%8F%A3)、
	* oldVnode ： 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
* 除了 el 之外，其他参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。
* [示例](https://cn.vuejs.org/v2/guide/custom-directive.html#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0)

###	函数简写
* 在很多时候，你可能想在 bind 和 update 时触发相同行为，而不关心其它的钩子。比如这样写:
	* `Vue.directive('color-swatch', function (el,binding) {el.style.backgroundColor = binding.value})`

###	对象字面量
* 如果指令需要多个值，可以传入一个 JavaScript 对象字面量。记住，指令函数能够接受所有合法的 JavaScript 表达式。

##	渲染函数 & JSX
###基础
* Vue推荐再绝大多数情况下使用模板来创建你的HTML。然后再一些场景中，需要JavaScript的完全编程的能力。这时可以用渲染函数，它比模板更接近编译器。

###	节点、树以及虚拟DOM
* 每个元素都是一个节点。每段文字也是一个节点。甚至注释也都是节点。一个节点就是页面的一个部分。就像家谱树一样，每个节点都可以有孩子节点（也就是说每个部分可以包含其他的一些部分）。

####	虚拟DOM
* Vue通过建立一个虚拟DOM来追踪自己要如何改变真实DOM。
* “虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。

###	[createElement参数](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0)

####	[深入数据对象](https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1)
* 有一点要注意：正如 v-bind:class 和 v-bind:style 在模板语法中会被特别对待一样，它们在 VNode 数据对象中也有对应的顶层字段。该对象也允许你绑定普通的 HTML 特性，也允许绑定如 innerHTML 这样的 DOM 属性 (这会覆盖 v-html 指令)。

####	约束
* VNode必须唯一
	* 组件树中的所有 VNode 必须是唯一的。
	* 如果你真的需要重复很多次的元素/组件，你可以使用工厂函数来实现。

###	使用JavaScript代替模板功能
####	v-if 和 v-for
* 只要在原生的JavaScript中可以轻松完成的操作，Vue的渲染函数就不回提供专有的替代方法。

####	v-model
* 渲染函数中没有与 v-model 的直接对应--必须自己实现相应的逻辑：

####	事件&按键修饰符
* 对于 .passive 、.capture 和 .once 这些事件修饰符，Vue提供了相应的前缀可以用于 on：
	* **修饰符**-----**前缀**
	* .passive ----- &
	* .capture ----- !
	* .once -------- ~
	* .capture.once或者.once.capture ---- ~!
* 对于所有其它的修饰符，私有前缀都不是必须的，因为你可以在事件处理函数中使用事件方法：
	* **修饰符**----**处理函数中的等价操作**
	* .stop	----------	event.stopPropagation()
	* .prevent	------	event.preventDefault()
	* .self	----------	if(event.target !== event.currentTarget)return
	* 按键： .enter, .13	--	if (event.keyCode !== 13) return (对于别的按键修饰符来说，可将 13 改为另一个按键码)
	* 修饰键：.ctrl,.alt,.shift,.meta	---	if (!event.ctrlKey) return (将 ctrlKey 分别修改为 altKey、shiftKey 或者 metaKey)

####	插槽
* 可以通过 this.$slots 访问静态插槽的内容，每个插槽都是一个VNode数组
* 也可以通过 this.$scopedSlots 访问作用域插槽，每个作用域插槽都是一个返回若干VNode的函数
* 如果要用渲染函数向子组件中传递作用域插槽，可以利用 VNode 数据对象中的 scopedSlots 字段

###	JSX
* 将 h 作为 createElement 的别名是 Vue 生态系统中的一个通用惯例，实际上也是 JSX 所要求的。从 Vue 的 Babel 插件的 3.4.0 版本开始，我们会在以 ES2015 语法声明的含有 JSX 的任何方法和 getter 中 (不是函数或箭头函数中) 自动注入 **const h = this.$createElement**，这样你就可以去掉 (h) 参数了。对于更早版本的插件，如果 h 在当前作用域中不可用，应用会抛错。

###	函数式组件
* 我们可以将组件标记为 functional ，这意味它无状态（没有响应式数据），也没有实例（没有this上下文）。
	* 
	`Vue.component('my-component', {
		functional: true,
		//props是可选的
		props: {
			//......
		},
		//为了弥补缺少的实例
		//提供第二个参数作为上下文
		render: function (createElement, context) {
			//......
		}
	})`
* 注意：在2.3.0之前的版本中，如果一个函数式组件想要接受prop，则props选项是必须的。在2.3.0或以上的版本中，可以省略props选项，所有组件上的特性都回被自动隐式解析为porp。
* 在2.5.0及以上版本中，如果使用单文件组件，那么基于模板的函数式组件可以这样声明：
	* `<template functional></template>`
* 组件需要的一切都是通过 context 参数传递，它是一个包括如下字段的对象：
	* props：提供所有 prop 的对象
	* children: VNode 子节点的数组
	* slots: 一个函数，返回了包含所有插槽的对象
	* scopedSlots: (2.6.0+) 一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。
	* data：传递给组件的整个数据对象，作为 createElement 的第二个参数传入组件
	* parent：对父组件的引用
	* listeners: (2.3.0+) 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是 data.on 的一个别名。
	* injections: (2.3.0+) 如果使用了 inject 选项，则该对象包含了应当被注入的属性。
* 在添加 functional: true 之后，需要更新我们的锚点标题组件的渲染函数，为其增加 context 参数，并将 this.$slots.default 更新为 context.children，然后将 this.level 更新为 context.props.level。

###模板编译

##	插件
插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：

1. 添加全局方法或者属性。如：[vue-custom-element](https://github.com/karol-f/vue-custom-element)
2. 添加全局资源：指令/过滤器/过渡等。如：[vue-touch](https://github.com/vuejs/vue-touch)
3. 通过全局混入来添加一些组件选项。如：[vue-router](https://github.com/vuejs/vue-router)
4. 添加Vue实例方法，通过把它们添加到Vue.prototype上实现。
5. 一个库，提供自己的API，同时提供上面提法哦的一个或多个功能。如：vue-router
###	使用插件
* 通过全局方法 Vue.use() 使用插件。
* Vue.use 会自动阻止多次注册相同插件，届时即使多次调用也只会注册一次该插件。
* [awesome-vue](https://github.com/vuejs/awesome-vue#components--libraries) 集合了大量由社区贡献的插件和库。
###	开发插件


##	过滤器
Vue.js允许自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：**双花括号插值和 v-bind 表达式**（后者从2.1.0+开始支持）。过滤器应该被添加在JavaScript表达式的尾部，由“管道”符号指示。
