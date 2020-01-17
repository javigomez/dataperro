const express = require('express')

const app = express()
app.get('/initial-payload', (request, response) => {
  response.json({
    widgets: [
      {
        id: '1',
        kind: 'number',
        data: 55,
      },
      {
        id: '2',
        kind: 'timelapse',
        data: [3, 14, 16, 54, 28, 14]
      }
    ]
  })
})

app.listen(3004, () => {console.log('Server is listening...')})