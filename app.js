const app = require('express')();
const server = require('http').createServer(app);
const request = require('request');
const io = require('socket.io')(server);
const url = 'https://slack.com/api/users.admin.invite';
const token = "";
app.use(function(req,res,next){
	const whiteList =['http://127.0.0.1','http://localhost']
	var org=req.headers.origin;
	whiteList.indexOf(org) > -1 &&
		res.setHeader('Access-Control-Allow-Origin', org);
	
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next()
})

app.get('/http/api/request', function (req, res) {
	request.get(url+'?token='+token+'&email='+req.query.email,function(err,httpResponse,body){
		if(err)
			return console.error('api request error',err);
		
		res.send(body)
	})
})
io.on('connection', function (socket) {
  socket.on('http-api-request', function (data) {
    request.get(url+'?token='+token+'&email='+data.email,function(err,httpResponse,body){
		if(err)
			return console.error('api request error',err);
		
		socket.emit('http-api-response', { data: JSON.parse(body)});
	})
  })
})
server.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
