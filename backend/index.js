var express = require('express')
const userRoutes = require('./routes/book')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors');
const cookieParser = require('cookie-parser');

// const cookieParser = require('cookie-parser');
const app = express()
app.use(cookieParser())
app.use(express.json());
app.use(cors({
     origin: ['http://localhost:8080', 'http://127.0.0.1:5173'], // Add your frontend and requesting origins here
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
     allowedHeaders: ['Content-Type', 'Authorization'],
}))
// app.use(cors({origin: 'https://hireit-3b536.web.app'}))
// app.use(cookieParser())
app.use(express.json());
app.use('/api', userRoutes)    






app.listen(process.env.PORT,() => {console.log("server started on port 8080")})