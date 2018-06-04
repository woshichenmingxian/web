/**
 * 发布订阅模式 订阅模式[fn,fn1,fn2...]
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
 * **/
function Watcher(fn){
    this.fn=fn
}
//update方法 
Watcher.prototype.update=function(){
    this.fn()
}
//实例话Watcher，监听alert(1)
let watcher=new Watcher(()=>{alert(1)})
let dep=new Dep()

dep.addsub(watcher)
dep.addsub(watcher)