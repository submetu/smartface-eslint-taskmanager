# Prevent API calls without the use of TaskManager (taskmanager-for-api-calls)

We have to use the TaskManager module to send all API requests. This is because the TaskManager is conencted to 
the hooks server. Responses are returned from that server. If we don't use the TaskManager, the hooks server
will not be notified.

## Rule Details

This rule aims to warn you if you are using the response of an API call without using Task Manager

Examples of **incorrect** code for this rule:

```js
var config = {
  sendRequest() {
    return serviceDispatch({ method: "GET", endpoint: "http://google.com" });
  }
};
function sendRequest() {
  return serviceDispatch({ method: "GET", endpoint: "http://google.com" });
}
serviceDispatch({ endpoint: "http://google.com" }).then();
```

Examples of **correct** code for this rule:

```js
var config = {
  sendRequest() {
    serviceDispatch({ method: "GET", endpoint: "http://google.com" });
  }
};

function sendRequest() {
  serviceDispatch({ method: "GET", endpoint: "http://google.com" });
}

serviceDispatch({ endpoint: "http://google.com" }).then();
```

