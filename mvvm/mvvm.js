function mvvm(options={}){
    this.$options=options;
    //找对data
    var data=this._data=this.$options.data;
    //数据观察（劫持）
    observe(data)
    //把this._data的属性赋值到this上(vue：this.a)===this代理this._data
    for(let key in data){
        Object.defineProperty(this,key,{
            enumerable:true,
            get(){
                return this._data[key]
            },
            set(newVal){
                this._data[key]=newVal
            }
        })
    }
    initComputed.call(this)
    //视图编译与更新 
    new Compile(options.el,this)
}
/**
 * computed
 * 相当于缓存
 */ 
function initComputed(){
    let vm=this;
    console.log(this.$options)
    let computed=this.$options.computed
    Object.keys(computed).forEach((key)=>{
        Object.defineProperty(vm,key,{
            get:typeof computed[key]==='function'?computed[key]:computed[key].get()
        })
    })
}
/**
 * 编译{{}}==innerHTML
 * 作用：识别{{}}进行数据替换，文本显示
 * **/
function Compile(el,vm){
    vm.$el=document.querySelector(el);
    let fragment=document.createDocumentFragment();
    while(child=vm.$el.firstChild){//讲id=app中的内容移入到文本片段中
        fragment.appendChild(child)
    }
    //依次循环找出{{}},里的属性
    replace(fragment)
    function replace(fragment){
        Array.from(fragment.childNodes).forEach((node)=>{
            let text=node.textContent;//拿到文本节点内容
            let reg=/\{\{(.*)\}\}/;
            //文本节点
            if(node.nodeType===3 && reg.test(text)){
                // console.log(RegExp.$1)//reg中（.*）==》a.a
                let arr =RegExp.$1.split('.');//a.a==>[a,a]
                let val=vm;
                arr.map((key)=>{
                    val=val[key]
                })
                //函数里需要传新值，进行视图刷新 触发条件要更改属性值（set方法触发）
                new Watcher(vm,RegExp.$1,(newVal)=>{
                    console.log(0)
                    node.textContent=text.replace(reg,newVal)
                })
                //将匹配的文本内容替换成属性的值
                node.textContent=text.replace(reg,val)
            }
            //元素节点，v-mode
            if(node.nodeType===1){
                //获取所有属性
                let nodeAttr=node.attributes;//[{name:"type",value:"text"},...]
                Array.from(nodeAttr).forEach((item)=>{
                    let name=item.name;
                    let val=item.value;
                    if(name.indexOf("v-model")===0){
                        node.value=vm[val]
                    }
                    //触发条件要更改属性值（set方法触发）
                    new Watcher(vm,val,(newVal)=>{
                        node.value=newVal
                    })
                    node.addEventListener("input",(e)=>{
                        vm[val]=e.target.value
                    })
                })
                
            }
            //如果还有节点（节点里面有节点）
            if(node.childNodes){
                replace(node)
            }
        })
    }
    vm.$el.appendChild(fragment)
}

/**
 * vm.$options观察对象进行数据观察劫持ObjectDefineProperty
 * 作用：使每个属性添加set与get方法
 * **/
function Observe(data){
    //属性进行订阅与发布
    let dep=new Dep()
    //逻辑
    for(let key in data){//data属性加上ObjectDefineProperty
        let val=data[key]
        observe(val)
        Object.defineProperty(data,key,{
            enumerable:true,
            get(){
                //进行订阅，进行函数监听
                console.log(Dep.target)
                Dep.target && dep.addsub(Dep.target)//dep.addsub(Dep.target)=>[Watcher]
                return val
            },
            set(newVal){
                if(newVal===val){
                    return
                }
                val=newVal//如果以后获取值，宝藏获取到最新的值
                observe(val)
                //进行发布，进行视图更新，执行Watch.update()==>执行Watcher
                dep.notify()
            }
        })
    }

}


function observe(data){
    if(typeof data!=='object')return
    return Observe(data)
}


/**
 * 发布订阅模式 订阅模式[fn,fn1,fn2...]
 * 作用：监听数据变化，实现刷新视图
 * **/
function Dep(){
    this.subs=[]
}
//订阅
Dep.prototype.addsub=function(sub){
    this.subs.push(sub)
}
//发布
Dep.prototype.notify=function(){
    this.subs.forEach(item=>item.update())
}

/**
 * 创建类，通过类赋予new出来的，都会生成update方法
 * 作用：添加update方法
 * Dep.target==>arr中遍历会触发get进行订阅操作
 * 整体传连后，触发条件为 set方法触发
 * **/
function Watcher(vm,exp,fn){
    this.fn=fn;
    this.vm=vm;
    this.exp=exp;
    Dep.target=this;
    let val=vm;
    let arr =exp.split(".")
    arr.forEach((key)=>{ //触发get
        val=val[key]
    })
    Dep.target=null;
}
//update方法 
Watcher.prototype.update=function(){
    let val=this.vm;
    let arr =this.exp.split(".")
    arr.forEach((key)=>{ //触发get
        val=val[key]
    })
    //传入最新值
    this.fn(val)
}