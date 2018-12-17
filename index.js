var express = require('express');
var cors = require('cors');

var port = process.env.PORT || 8080;

var app = express();
var inflight = 0;

app.enable('trust proxy');
app.use(cors());
app.use('/favicon.ico', function(req, res) {
	res.status(404).end();
});
app.use('/*', function (req, res) {
	if (req.query.log_headers) {
		console.log('Logging headers:', req.headers);
	}

	var timeout = Number(req.query.response_time) || 1;
	var status = Number(req.query.return_status) || 200;
	inflight++;
	setTimeout(function() {
		if (status == 204) {
			res.status(status).end();
		} else {
			res.status(status).end('Service responded with status code ' + status + ', delayed by ' + timeout + ' milliseconds. Use the query parameter `response_time` to give the timeout in milliseconds, or specify the returned status code using `return_status`. Add the query param `log_headers` to log the headers of the incoming request.');
		}
		console.log(JSON.stringify({host: req.headers.host, datetime: (new Date()).toISOString(), client: req.ip, response_delay: timeout, response_status: status, inflight_requests: inflight}));
		inflight--;
	}, timeout);
});
app.listen(port, function() {
	console.log('Slow server started at port ' + port);
});

