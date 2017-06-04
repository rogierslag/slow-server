# Slow server

Sometimes one has to test again a service which may behave slowly.

## How to

Slow-server enables this type of testing.
You can do a request to the service with the query parameter `response_time`.
The server will stall the request untill that timeout (in milliseconds) is matched.
At that point it will return a status as described in the query parameter `return_status` (which will default to `200 OK` if omitted).

Example

`curl -vvv 'http://localhost:8080?response_time=1000&return_status=201' -vvv`

yields the following response

```
* Rebuilt URL to: http://localhost:8080/?response_time=1000&return_status=201
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8080 (#0)
> GET /?response_time=1000&return_status=201 HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.51.0
> Accept: */*
> 
< HTTP/1.1 201 Created
< X-Powered-By: Express
< Date: Sun, 04 Jun 2017 09:12:38 GMT
< Connection: keep-alive
< Content-Length: 205
< 
* Curl_http_done: called premature == 0
* Connection #0 to host localhost left intact
Service responded with status code 201, delayed by 1000 milliseconds. Use the query parameter `response_time` to give the timeout in milliseconds, or specify the returned status code using `return_status`.
```

## Docker

Get it from [Docker Hub](https://hub.docker.com/r/rogierslag/slow-server/)
