const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('error', console.error);

ws.on('open', function () {
  console.log('Opened');
});

const queue = [];
let processing = false;
ws.on('message', async function(data) {
  console.log('received', data.toString());

  queue.push(data.toString());
  await processQueue();
})

async function processQueue() {
  if (processing || !queue.length) return;

  processing = true;
  while (queue.length) {
    const msg = queue.shift();
    await processAsync(msg);
  }

  processing = false;
}

async function processAsync(text) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('async', text);
      resolve();
    }, 10 * Math.random());
  });
}
