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
			* 当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 <my-component-name> 和 <MyComponentName> 都是可接受的。注意，尽管如此，直接在 DOM (即非字符串的模板) 中使用时只有 kebab-case 是有效的。

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
