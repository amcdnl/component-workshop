const net = require('net');

const client = new net.Socket();
client.connect(4200, '127.0.0.1', function() {
	console.log('Connected');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
});

client.on('error', function() {
  console.log('err')
});

client.on('close', function() {
	console.log('Connection closed');
});
