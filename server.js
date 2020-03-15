var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)


  if(path === '/'){
    response.statusCode = 200  //设置响应状态码
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.setHeader('Frank', 'xxx')  //设置响应头
    response.write(`    
    <!DOCTYPE html>
    <head>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        <h1>我是h1标签</h1>
    </body>
    `)    //设置响应体
    response.end()

  } else if(path === '/style.css'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(`h1{color: red}`)
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`
        
    <!DOCTYPE html>
    <head>
    <title>你访问的页面不存在</title>
    <style>
    *{
        margin: 0;
        padding: 0;
    }
    body{
        background: #EFEFEF;
    }
    </style>
    </head>
    <body>    
        <!-- <h1>你访问的页面不存在</h1> -->
        <iframe src="https://xiedaimala.com/%E4%B9%B1%E6%9D%A5" width="100%" height="400px" border: medium none frameborder ="no";></iframe>
    </body>
    `)
    response.end()
  }


  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n可以成功监听 8888 端口 http://localhost:' + port)

