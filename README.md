## 内存:栈与堆
#### 基本类型是：Undefined/Null/Boolean/Number/String

- 基本类型的值存在内存中，被保存在栈内存中。从一个变量向另一个变量复制基本类型的值，会创建这个值的一个副本。

#### 引用类型：object

- 引用类型的值是对象，保存在堆内存中。

   - 1.包含引用类型值的变量实际上包含的并不是对象本身，而是一个指向该对象的指针。从一个变量向另一个变量复制引用类型的值，复制的其实是指针，因此两个变量最终都指向同一个对象。

   - 2.js不允许直接访问内存中的位置，也就是不能直接访问操作对象的内存空间。在操作对象时，实际上是在操作对象的引用而不是实际的对象。

#### 栈和堆的区别
 ##### 一、堆栈空间分配区别：
      - 1、栈（操作系统）：由操作系统自动分配释放 ，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈；
      - 2、堆（操作系统）： 一般由程序员分配释放，若程序员不释放，程序结束时可能由OS回收，分配方式倒是类似于链表。
 ##### 二、堆栈缓存方式区别：
      - 1、栈使用的是一级缓存， 他们通常都是被调用时处于存储空间中，调用完毕立即释放；
      - 2、堆是存放在二级缓存中，生命周期由虚拟机的垃圾回收算法来决定（并不是一旦成为孤儿对象就能被回收）。所以调用这些对象的速度要相对来得低一些。
 ##### 三、堆栈数据结构区别：
      - 堆（数据结构）：堆可以被看成是一棵树，如：堆排序；
      - 栈（数据结构）：一种先进后出的数据结构。
      
 ## EVENTLOOP
   - 1）执行栈执行主线程任务，当有操作dom，ajax交互，定时器等操作时，这些任务会被移入到callback queue 任务队列中。

   - 2）当主线程任务执行完毕为空时，会读取callback queue队列中的函数，进入主线程执行。

   - 3）上述过程会不断重复，形成Event Loop。
   
 ### 栈
 - 函数调用形成了一个栈帧。

   - function foo(b) {
     - var a = 10;
     - return a + b + 11;
   - }

   - function bar(x) {
     - var y = 3;
     - return foo(x * y);
   - }

   - console.log(bar(7)); // 返回 42
- 当调用 bar 时，创建了第一个帧 ，帧中包含了 bar 的参数和局部变量。当 bar 调用 foo 时，第二个帧就被创建，并被压到第一个帧之上，帧中包含了 foo 的参数和局部变量。当 foo 返回时，最上层的帧就被弹出栈（剩下 bar 函数的调用帧 ）。当 bar 返回的时候，栈就空了。(执行栈先进后出)

### 堆节
- 对象被分配在一个堆中，即用以表示一大块非结构化的内存区域。

### 队列节
- 一个 JavaScript 运行时包含了一个待处理的消息队列。每一个消息都关联着一个用以处理这个消息的函数。

- 在事件循环期间的某个时刻，运行时从最先进入队列的消息开始处理队列中的消息。为此，这个消息会被移出队列，并作为输入参数调用与之关联的函数。正如前面所提到的，调用一个函数总是会为其创造一个新的栈帧。

- 函数的处理会一直进行到执行栈再次为空为止；然后事件循环将会处理队列中的下一个消息（先进先出）。

### macro task与micro task
- 不同的异步任务被分为两类：微任务（micro task）和宏任务（macro task）。
在一个事件循环中，异步事件返回结果后会被放到一个任务队列中。然而，根据这个异步事件的类型，这个事件实际上会被对应的宏任务队列或者微任务队列中去，当执行栈为空的时候，主线程会首先查看微任务中的事件，如果微任务不是空的那么执行微任务中的事件，如果没有在宏任务中取出最前面的一个事件。把对应的回调加入当前执行栈...如此反复，进入循环。

##### macro-task(宏任务)
      - setTimeout
      - setInterval
      - setImmediate


##### micro-task(微任务)
      - Promise
      - process.nextTick 直接进入当前的执行stack尾部，不会进入callbackqueue

## TCP和UDP的区别

### TCP(传输控制协议)：

- 1)提供IP环境下的数据可靠传输(一台计算机发出的字节流会无差错的发往网络上的其他计算机，而且计算机A接收数据包的时候，也会向计算机B回发数据包，这也会产生部分通信量)，全双工操作(数据在两个方向上能同时传递)，多路复用服务，是面向连接，端到端的传输，提供超时重发，丢弃重复数据，检验数据，流量控制等功能

- 2)面向连接：正式通信前必须要与对方建立连接。事先为所发送的数据开辟出连接好的通道，然后再进行数据发送，像打电话。

- 3)TCP支持的应用协议：Telnet(远程登录)、FTP(文件传输协议)、SMTP(简单邮件传输协议)。TCP用于传输数据量大，可靠性要求高的应用。

### UDP(用户数据报协议，User Data Protocol)

- 1)UDP是非连接的(正式通信前不必与对方建立连接，不管对方状态就直接发送，像短信，QQ。因而传输速度快)，不能提供可靠性、流控、超时重发功能。它是一个简单的面向数据报的运输层协议，只是把应用程序传给IP层的数据报发送出去，但是并不能保证它们能到达目的地。UDP用于一次只传送少量数据，可靠性要求低、传输经济等特点。

- 2) UDP支持的应用协议：NFS(网络文件系统)、SNMP(简单网络管理系统)、DNS(主域名称系统)、TFTP(通用文件传输协议)等。

### 总结：

- TCP：面向连接、传输可靠(保证数据正确性,保证数据顺序)、用于传输大量数据(流模式)、速度慢，建立连接需要开销较多(时间，系统资源)。

- UDP：面向非连接、传输不可靠、用于传输少量数据(数据包模式)、速度快。

- 联系：都是工作在传输层的协议

## HTTP 超文本传输协议
### HTTP通信机制是在一次完整的HTTP通信过程中，Web浏览器与Web服务器之间将完成下列7个步骤：

#### 1、建立TCP连接

- 在HTTP工作开始之前，Web浏览器首先要通过网络与Web服务器建立连接，该连接是通过TCP来完成的，该协议与IP协议共同构建Internet，即著名的TCP/IP协议族，因此Internet又被称作是TCP/IP网络。HTTP是比TCP更高层次的应用层协议，根据规则，只有低层协议建立之后才能进行更深层协议的连接，因此，首先要建立TCP连接，一般TCP连接的端口号是80。

 

#### 2、Web浏览器向Web服务器发送请求命令

- 一旦建立了TCP连接，Web浏览器就会向Web服务器发送请求命令

- 例如：GET/sample/hello.jsp HTTP/1.1。

 

#### 3、 Web浏览器发送请求头信息

- 浏览器发送其请求命令之后，还要以头信息的形式向Web服务器发送一些别的信息，之后浏览器发送了一空白行来通知服务器，它已经结束了该头信息的发送。

 

#### 4、Web服务器应答

- 客户机向服务器发出请求后，服务器会客户机回送应答，

- HTTP/1.1 200 OK

- 应答的第一部分是协议的版本号和应答状态码。

#### 5、Web服务器发送应答头信息

- 正如客户端会随同请求发送关于自身的信息一样，服务器也会随同应答向用户发送关于它自己的数据及被请求的文档。

 

#### 6、Web服务器向浏览器发送数据

- Web服务器向浏览器发送头信息后，它会发送一个空白行来表示头信息的发送到此为结束，接着，它就以Content-Type应答头信息所描述的格式发送用户所请求的实际数据。

 

#### 7、Web服务器关闭TCP连接

- 一般情况下，一旦Web服务器向浏览器发送了请求数据，它就要关闭TCP连接，然后如果浏览器或者服务器在其头信息加入了这行代码

- Connection:keep-alive

- TCP连接在发送后将仍然保持打开状态，于是，浏览器可以继续通过相同的连接发送请求。保持连接节省了为每个请求建立新连接所需的时间，还节约了网络带宽。

### HTTP请求格式

#### 当浏览器向Web服务器发出请求时，它向服务器传递了一个数据块，也就是请求信息，HTTP请求信息由3部分组成：

- 请求方法URI协议/版本

- 请求头(Request Header)

- 空行

请求正文
## HTTP 和 TCP 之间的关系
- TCP 协议是 HTTP 协议的基石——HTTP 协议需要依靠 TCP 协议来传输数据。

- 在网络分层模型中，TCP 被称为“传输层协议”，而 HTTP 被称为“应用层协议”。
- TCP 被称为“面向连接”的传输层协议。传输层主要有两个协议，分别是 TCP 和 UDP。TCP 比 UDP 更可靠。

- HTTP 协议如何使用 TCP 连接：HTTP 对 TCP 连接的使用，分为两种方式：俗称“短连接”和“长连接”（“长连接”又称“持久连接”，洋文叫做“Keep-Alive”或“Persistent Connection”）

## https
- HTTPS协议 = HTTP协议 + SSL/TLS协议(加密传输)
- SSL的全称是Secure Sockets Layer，即安全套接层协议
- TLS的全称是Transport Layer Security，即安全传输层协议

##### 对称加密：对称加密又叫做私钥加密，即信息的发送方和接收方使用同一个密钥去加密和解密数据。对称加密的特点是算法公开、加密和解密速度快，适合于对大数据量进行加密
- 其加密过程如下：明文 + 加密算法 + 私钥 => 密文
- 解密过程如下：密文 + 解密算法 + 私钥 => 明文
- 对称加密中用到的密钥叫做私钥，私钥表示个人私有的密钥，即该密钥不能被泄露。
- 其加密过程中的私钥与解密过程中用到的私钥是同一个密钥，这也是称加密之所以称之为“对称”的原因。由于对称加密的算法是公开的，所以一旦私钥被泄露，那么密文就很容易被破解，所以对称加密的缺点是密钥安全管理困难。

##### 非对称加密：非对称加密也叫做公钥加密。非对称加密与对称加密相比，其安全性更好。对称加密的通信双方使用相同的密钥，如果一方的密钥遭泄露，那么整个通信就会被破解。而非对称加密使用一对密钥，即公钥和私钥，且二者成对出现。私钥被自己保存，不能对外泄露。公钥指的是公共的密钥，任何人都可以获得该密钥。用公钥或私钥中的任何一个进行加密，用另一个进行解密。
###### 被公钥加密过的密文只能被私钥解密，过程如下：
      - 明文 + 加密算法 + 公钥 => 密文， 密文 + 解密算法 + 私钥 => 明文
      
###### 被私钥加密过的密文只能被公钥解密，过程如下：
      - 明文 + 加密算法 + 私钥 => 密文， 密文 + 解密算法 + 公钥 => 明文 
      - 由于加密和解密使用了两个不同的密钥，这就是非对称加密“非对称”的原因。
      - 非对称加密的缺点是加密和解密花费时间长、速度慢，只适合对少量数据进行加密。
      
## 原型链
#### 案例
      function doSomething(){}
      doSomething.prototype.foo = "bar"; 
      var doSomeInstancing = new doSomething();
      doSomeInstancing.prop = "some value"; 
      console.log( doSomeInstancing );
      
   - 如上所示, doSomeInstancing 中的__proto__是 doSomething.prototype. 但这是做什么的呢？当你访问doSomeInstancing 中的一个属性，浏览器首先会查看doSomeInstancing 中是否存在这个属性。

   - 如果 doSomeInstancing 不包含属性信息, 那么浏览器会在 doSomeInstancing 的 __proto__ 中进行查找(同 doSomething.prototype). 如属性在 doSomeInstancing 的 __proto__ 中查找到，则使用 doSomeInstancing 中 __proto__ 的属性。

   - 否则，如果 doSomeInstancing 中 __proto__ 不具有该属性，则检查doSomeInstancing 的 __proto__ 的  __proto__ 是否具有该属性。默认情况下，任何函数的原型属性 __proto__ 都是 window.Object.prototype. 因此, 通过doSomeInstancing 的 __proto__ 的  __proto__  ( 同 doSomething.prototype 的 __proto__ (同  Object.prototype)) 来查找要搜索的属性。

   - 如果属性不存在 doSomeInstancing 的 __proto__ 的  __proto__ 中， 那么就会在doSomeInstancing 的 __proto__ 的  __proto__ 的  __proto__ 中查找。然而, 这里存在个问题：doSomeInstancing 的 __proto__ 的  __proto__ 的  __proto__ 其实不存在。因此，只有这样，在 __proto__ 的整个原型链被查看之后，这里没有更多的 __proto__ ， 浏览器断言该属性不存在，并给出属性值为 undefined 的结论。
      
         doSomeInstancing.__proto__ .__proto__ ===doSomething.prototype.__proto__ //true

         doSomeInstancing.__proto__ .__proto__ ===Object.prototype //true
 - hasOwnProperty 与 Object.keys()是不会遍历Object, 从而可以优化性能
 - 检查属性是否为 undefined 是不能够检查其是否存在的。该属性可能已存在，但其值恰好被设置成了 undefined
 
 ## render 函数
 ### vue:render
 #### render 函数 跟 template 一样都是创建 html 模板的，但是有些场景中用 template 实现起来代码冗长繁琐而且有大量重复，使用render 函数就简便很多。
 - render 函数的返回值（VNode）
 - render 函数的参数（createElement）
   - createElement 函数的返回值（VNode）
   - createElement 函数的参数（三个）
     - 一个 HTML 标签字符串，组件选项对象，或者解析上述任何一种的一个 async 异步函数。类型：{String | Object | Function}。必需。
     - 一个包含模板相关属性的数据对象你可以在 template 中使用这些特性。类型：{Object}。可选。
     - 子虚拟节点 (VNodes)，由 createElement() 构建而成，也可以使用字符串来生成“文本虚拟节点”。类型：{String | Array}。可选。
     
 ### react:render
 #### render 函数:将组建或者虚拟DOM元素渲染到真实的DOM上，将任务交给浏览器，进而进行layout和paint等步骤
 - ReactComponent：render( ReactElement:element, DOMElement:container, [function callback] )
   - 接收2-3个参数，并返回ReactComponent类型的对象，当组件被添加到DOM中后，执行回调。
 - ReactElement：createElement( string/ReactClass:type, [object props], [children ...] )
   - 第一个参数可以接受字符串（如“p”，“div”等HTML的tag）或ReactClass，第二个参数为传递的参数如class这些attr，第三个为子元素，可以为字符串和ReactElement。
   
 #### 触发render函数条件
 - 1. 首次加载
 - 2. setState:componentWillReceiveProps => shouldComponentUpdate => componentWillUpdate => render => componentDidUpdate
      - 当shouldComponentUpdate执行时，返回true，进行下一步，this.state没有被更新,返回false，停止，更新this.state
      - 当componentWillUpdate被调用时，this.state也没有被更新
      - 直到render被调用时候，this.state才被更新。
      - 下一次render函数调用(或者下一次shouldComponentUpdate返回false时)可得到更新后的this.state
         - 可得到更新后的state
            - Promise等异步中执行(用函数式封装this.setState()),然后.then异步输出
            - setTimeout
            - setState callback
            - componentDidUpdate
       #### 缺点
       - 1. 在更新的周期内再次挂在setState，会导致重复循环调用，最终导致浏览器内存占满后崩溃
       - 2. 可能会引发不必要的渲染：新 state 和之前的一样。这种情况可以通过 shouldComponentUpdate 解决， state 中的某些属性和视图没有关系（譬如事件、timer ID等），这些属性改变不影响视图的显示，但是这些属性重置。
       - 3. 组件中的某些属性是和视图没有关系的，当组件变得复杂的时候可能会出现各种各样的状态需要管理，这时候用setState管理所有状态是不可取的。state中本应该只保存与渲染有关的状态，而与渲染无关的状态尽量不放在state中管理，可以直接保存为组件实例的属性，这样在属性改变的时候，不会触发渲染，避免浪费
      #### setState只会覆盖state，不会减少减少原来的状态，replaceState是完全替换原来的状态，相当于赋值，将原来的state替换为另一个对象，如果新状态属性减少，那么state中就没有这个状态了
 - 3. 接受到新的props

