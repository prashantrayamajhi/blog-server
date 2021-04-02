if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

require('./db/db')

const app = require('./app')
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
