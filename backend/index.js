var express = require('express')
const bookroutes = require('./routes/book')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors');
// const cookieParser = require('cookie-parser');

const app = express()
app.use(cors({origin: 'http://localhost:3000',credentials: true}))
// app.use(cors({origin: 'https://hireit-3b536.web.app'}))
app.use(cookieParser())
app.use(express.json());
app.use('/api', bookroutes)    






app.listen(process.env.PORT,() => {console.log("server started on port 8000")})