# Slow server

Sometimes one has to test again a service which may behave slowly.

Slow-server enables this type of testing.
You can do a request to the service with the query parameter `response_time`.
The server will stall the request untill that timeout (in milliseconds) is matched.
At that point it will return a status as described in the query parameter `return_status` (which will default to `200 OK` if omitted).

