jQuery-AddTemplateRow
======

此插件是我在工作的时候需要动态添加新的行，因为用的地方较多，所以就单独抽象出来了一个jquery插件，这样就可以之维护一个HTML模板就可以了

如果选用vue等的框架，就不会出现这种辣鸡问题（公司不让用，宝宝内心也很苦）

think
======
- 需要声明wrapper和template，剩下添加的row只会复制template模板并添加
- 可以通过在template模板中添加替换的文字，来控制每个行中特定的文字不同，或者row中的特殊标记
- 采用的是replace来进行替换的，因此整个template模板都是被识别成字符串，所以需要在传入的配置中，写好替换的对应元素

attention
=====
- 可以将插件改成用localstorage / sessionstorage进行第一次存储template，这样就防止后来操作dom时，误修改template中的数据，导致添加错误(我的项目中是这么做的)
- 可以将template模板改成es6中的string的``扩展，用以直接替换其中的变量
