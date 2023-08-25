const {WebSocketServer} = require('ws');

const wss = new WebSocketServer({
  port: 8080
})
wss.on('connection', function(ws) {
  console.log('connected');

  ws.on('error', console.error);
  ws.on('message', function(data) {
    console.log("Received:", data, typeof (data));
  });

  setTimeout(async ()=>{
    console.log(`Sending message to ${ws._socket.remoteAddress}`);

    for(let i = 0; i < 100; i++) {
      const msg = `test_${i}`;
      await new Promise((resolve) => setTimeout(()=>{
        console.log(`${msg}: Sending`);
        ws.send(msg);
        ws.send(" ");
        resolve();
      }, 11*Math.random()))
    }

    ws.send('done');
  })
})
