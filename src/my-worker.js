/* eslint-disable no-restricted-globals */
let timerId;

self.onmessage = function (event) {
  if (event.data === "start") {
    timerId = setInterval(() => {
      const date = new Date().toISOString();
      console.log("date ", date);
      self.postMessage(date);
    }, 5000);
  } else if (event.data === "stop") {
    clearInterval(timerId);
  }
};
