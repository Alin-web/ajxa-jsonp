function Ajax(options) {
    // 设置一个对象  实现函数调用的可选项和必填项  
    var defaults = {
        type:'get',
        url: '',
        // json 数据
        data:{},
        hearde:{
            /* 'application/x-www-form-urlencoded' 'application/json' */
            'Content-Type':  'application/x-www-form-urlencoded'
        },
        success:function(){
        },
        error:function(){
        }
    }
    // 对象覆盖   全局对象  下的assign 方法
    // Object.assign(target,source)方法用于对象的合并，将源对象（ source ）的所有可枚举属性，复制到目标对象（ target 
    Object.assign(defaults,options)
    var xhr = new XMLHttpRequest();
    // 把传递过来的数据 解析为 字符串形式的
    var params = '';
    for (var attr in defaults.data) {
        // 拼接字符串 返回符合该参数的类型
        params += attr + '=' + defaults.data[attr] + '&';
    }
    // 进行字符串切割 把最后的一个 & 符号给去除掉
    params = params.substr(0,params.length-1)
    // 然后判断当前请求的类型
    if(defaults.type === 'get'){
      // 因为请求 发送的完整代买是 路径?属性=值  所以还要进行修改
      defaults.url = defaults.url + '?' +params;
    }
    xhr.open(defaults.type, defaults.url);
    if(defaults.type === 'post'){
        // 用户希望希望向服务器端传递的请求参数的类型 应该由用户定义 

        // 传递的请求参数类型
        var contentType =defaults.hearde['Content-Type']
        // 设置请求参数格式的类型 （书写请求头）
        xhr.setRequestHeader('Content-Type',contentType);
        // 判断发送的数据类型是什么格式  因为 json 格式的数据 发送请求  要先转换为 json 字符串  对象才可以传递 而普通的post 参数传递 则不需要转化
        if( contentType == 'application/json'){
            xhr.send(JSON.stringify(defaults.data))
            console.log('json 对象字符串格式数据');
        }else {
            xhr.send(params);
            console.log('post 普通字符串参数传递');
        }
        
    }else{
        xhr.send();
    }
    // 获取服务端响应到客户端的数据
    xhr.onload = function () {
        // 判断服务器响应回来的数据  这样使用者 就不需要关系 数据类型 直接发送请求 就可拿服务器返回的数据直接使用了
        // 服务器如果传递过来的是json 字符串 需要转换为json 对象 才可以使用 
        // 根据 返回的请求头 来判断返回的数据是否需要解析
        // 获取请求头 
        var type = xhr.getAllResponseHeaders('Content-Type');
        // 获取服务器返回的数据
        var responseText = xhr.responseText
        if(type.includes('application/json')){
            responseText = JSON.parse(responseText)
        }
        // 根据状态码 来判断请求成功和请求失败
        if(xhr.status == 200 ){
             //把得到的数据 返回给调用者
            defaults.success(responseText)
        }else{
            defaults.error(responseText,xhr)
        }
    }
}