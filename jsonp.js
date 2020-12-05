function jsonp(options){
    //动态创建 script标签
    var script = document.createElement('script');
    // 拼接传递过来的参数 发送请求的时候传递过去
    var params = '';
    // 循环添加
    for (var attr in options.data){
        params += '&' + attr + '='+ options.data[attr]
    }
    // 随机创建一个变量名 来解决多次发送请求调用当前函数的方法覆盖问题
    // toString() 变为字符串
    // 0.154161032
    var fnName = 'myJsonp'+ Math.random().toString().replace('.','')
    //  options.success 不是一个全局函数 服务器返回调用的时候无法调用的到
    // 通过window 挂载为全局函数  . 后面不能跟变量名
    window[fnName] =  options.success;

    // 添加非同源请求地址
    script.src = options.url+'?callback='+ fnName+params;
    // 把标签写入到页面中
    document.body.appendChild(script);
    // 解决页面加载完毕 动态创建的srcipt标签一直存在的问题
    // 因为 点击一次创建一个 srcipt 标签
    // 所有当标签加载完毕后,删除该标签
    // onload 当标签加载完毕后触发
    script.onload = function(){
        // 加载载完毕以后移除标签
        document.body.removeChild(script)
    }
}