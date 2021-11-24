// Use this only for debugging purposes as it introduces a security issue.

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

//to catch
const fiddlerEverywhereProxy = {
  protocol: "http:",
  hostname: "127.0.0.1",
  port: 8888,
};
const setFiddlerProxy = (options) => {
  if (typeof options === "string") {
    // Options can be URL string.
    options = url.parse(options);
  }
  if (!options.host && !options.hostname) {
    throw new Error("host or hostname must have value.");
  }
  options.path = url.format("https://test.api.dibspayment.eu/v1/payments");
  options.headers = options.headers || {};
  options.headers.Host =
    options.host ||
    url.format({
      hostname: options.hostname,
      port: options.port,
    });
  options.protocol = fiddlerEverywhereProxy.protocol;
  options.hostname = fiddlerEverywhereProxy.hostname;
  options.port = fiddlerEverywhereProxy.port;
  options.href = null;
  options.host = null;
  return options;
};
