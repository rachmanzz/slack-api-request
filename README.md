# slack-api-request

## install 

	 npm install express request socket.io
	 
## usage
	
	// add slack token
	const token = "xxx...";
	
	// set white list domain
	const whiteList =['http://127.0.0.1','http://localhost']
	
#### invite 
	//Ajax Request
		
		var xhttp = new XMLHttpRequest();
            xhttp.open("GET","http://apidomain/http/api/request?email=email@gmail.com",true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.onreadystatechange = function () {
                if(this.readyState == 4 && this.status == 200)
                    // response here
                if(this.status != 200)
                    // error
            };
            xhttp.send();
			
	//socket io client side
	
		//send email data
		socket.emit('http-api-request', { email: 'email@gmail.com' });
		
		// response data
		socket.on('http-api-response', function (data) {
			console.log(data);
		});

