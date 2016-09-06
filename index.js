var express = require('express');

var port = process.env.PORT || 8080;

var app = express();

app.enable('trust proxy');
app.use('/favicon.ico', function(req, res) {
	res.status(404).end();
});
app.use('/*', function (req, res) {
	var timeout = Number(req.query.response_time) || 1;
	setTimeout(function() {
		res.status(200).end('Service responded with a ' + timeout + ' millisecond delay. Use the query parameter `response_time` to give the timeout in milliseconds');
	}, timeout);
	console.log(JSON.stringify({host: req.headers.host, datetime: (new Date()).toISOString(), client: req.ip, response_delay: timeout}));
});
app.listen(port, function() {
	console.log('Slow server started at port ' + port);
});

