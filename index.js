const express = require('express')
const app = express()
const { getEnv } = require('./utils/helpers')

require('dotenv').config()

app.use(express.json())
app.use('/api', require('./routes/api'))

app.listen(getEnv('APP_PORT') || 8080, () => {
  console.log('Server started on port ' + getEnv('APP_PORT'))
})

