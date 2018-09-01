const loadconf =  require('express').Router(),
      request = require('superagent');
var exec= require('child_process').exec;
var  spawn  = require('child_process').spawn;

loadconf.post('/loadconf',function (req, res) {
var type=req.query.typeoflog;  
console.log(type);
if(type=="SQL"){
  exec('/home/akila/kibana/bin/kibana',function(err,stdout,stderr){
  console.log('out',stdout);
  console.log('errr',stderr);
  console.log(err);

})

}
else if(type=="sample"){
   
  exec('nohup /home/triaguser/bin/logstash -f /home/triaguser/conf/sample2.conf',function(err,stdout,stderr){
  console.log(stdout)
  console.log('errr',stderr);
  console.log(err);

})

}
else if(type=="unixsyslog"){
   
  exec('nohup /home/triaguser/bin/logstash -f /home/triaguser/conf/unixsyslog.conf --path.data /home/triaguser/unixlogdata',function(err,stdout,stderr){
  console.log(stdout)
  console.log('errr',stderr);
  console.log(err);

})

}
res.send("file loaded into logstash")
  });


loadconf.get('/getloadfile',(req,res)=>{
  res.send('loadfile route is working fine');
})

module.exports = loadconf;
