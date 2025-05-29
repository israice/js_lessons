// demo_workers.js

let i = 0;

function timedCount() {
  i++;
  postMessage(i); // Send count to main thread
  setTimeout(timedCount, 500); // Call again after 500ms
}

timedCount();


