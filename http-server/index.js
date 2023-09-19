let http = require('http');
let cmdinput=require('minimist')(process.argv.slice(2))
let file=require("fs");

const datacontrol=(req,res)=>{
let url=req.url;
switch (url) {
  case "/project":
   stram=file.createReadStream("project.html");
   stram.pipe(res);
   break;
  case "/registration":
    stram=file.createReadStream("registration.html");
    stram.pipe(res);
    break;
  default:
    stram=file.createReadStream("home.html");
    stram.pipe(res);
    break;
}
}
http.createServer(datacontrol).listen(cmdinput.port);