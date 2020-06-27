1. es6 import export 如何实现的?
2. 第三方模块的 ID 是怎么样的?
3. 为了压缩,那为什么有这么多的/\*\* 只有在开发模 式下有,生产模 式是没有的
   但是对象的属性名是不能被压缩,所以只能直接 一步到位,写的短一点

舍得
函数 call 的上下文为什么是 module.exports
modules[moduleId].call(module.exports
lessfish
能改成 export default 试试吗
XZZ
module.exports 怎么赋值的
人生只如初见
require 是 webpack 自己实现的，import 是怎么实现的呢？
kevin
问题根本没解释啊
人生只如初见
moduleId 不应该是绝对路径么？相对路径
人生只如初见
相对路径同一个第三方模块路径地址可能不一样呢 一会
10:46
188\*\*\*\*3750
那老师 你刚才执行 build 不也是 开发模式下 build

如果你得到一个模 块,但你不知道它是个 common.js esmodule,如何取值
