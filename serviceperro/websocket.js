const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 })
wss.on('connection', function connection(ws) {
  setInterval(() => {
    ws.send(JSON.stringify({
      kind: 'number',
      value: Math.random() * 100
    }))
  }, 500)
  setInterval(() => {
    ws.send(JSON.stringify({
      kind: 'timelapse',
      value: Math.random() * 100
    }))
  }, 1200)
})