var express = require('express');

var port = process.env.PORT || 8080;

var app = express();
var inflight = 0;

app.enable('trust proxy');
app.use('/favicon.ico', function(req, res) {
	res.status(404).end();
});
app.use('/*', function (req, res) {
	var timeout = Number(req.query.response_time) || 1;
	var status = Number(req.query.return_status) || 200;
	inflight++;
	setTimeout(function() {
		res.status(status).end('Service responded with status code ' + status + ', delayed by ' + timeout + ' milliseconds. Use the query parameter `response_time` to give the timeout in milliseconds, or specify the returned status code using `return_status`.');
		console.log(JSON.stringify({host: req.headers.host, datetime: (new Date()).toISOString(), client: req.ip, response_delay: timeout, response_status: status, inflight_requests: inflight}));
		inflight--;
	}, timeout);
});
app.listen(port, function() {
	console.log('Slow server started at port ' + port);
});

