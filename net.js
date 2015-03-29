var net = require('net');
var server = net.createServer(function(socket){
    socket.on('data',function(data){
                socket.write('ok');
                add(data);
                setTimeout(function(){socket.end();},1000);
                });
                socket.on('error',function(err){
//                 console.log(err);
                 });
});
server.listen(8081,function(){
        });

function add(data){
  var temp=data.toString();
  var shuju=temp.split('+');
  if(shuju[1]=='1'){
    shuju[1]='系统消息';
  }
  else{
    shuju[1]='其他消息';
  }
  var sw = shuju[2];
  sw=sw.replace(/(^\s+)|(\s+$)/g, ""); 
  var con='';
  switch(sw){
   case '1':con='欢迎您注册ILOCK。';break;
   case '2':con='硬件设备接入。';break;
   case '3':con='门开了，请注意随手关门。';break;
   case '4':con='更换移动设备登陆成功。';break;
   default:con=sw+'未知信息';
  }
  var mysql = require('mysql');
  var connection = mysql.createConnection({
     host : 'localhost',
     user : 'root',
     password : 'yyw201314',
     database : 'ilock'

  })
//连接数据库
 connection.connect(function(err){
     if(err){
         return;
      }
    });
//插入数据
 connection.query("SET NAMES 'utf8'");
 var insertsql = 'insert into info(uid,type,content,flag) VALUES (?,?,?,?)';
 var params    = [shuju[0],shuju[1],con,1];
 connection.query(insertsql,params,function(err,result){
        if(err){
         return;
        }
        });

//关闭数据库连接
connection.end(function(err){
        if(err){
        return;
        }
        });
}