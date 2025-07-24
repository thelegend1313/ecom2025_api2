const express=require('express')
const app = express()
const morgan = require('morgan')
const { readdirSync } = require('fs')
const { console } = require('inspector')
const cors = require('cors')
// const authRouter = require('./routes/auth')
// const categoryRouter = require('./routes/category')
app.use(morgan('dev'))
app.use(express.json({limit:'20mb'}))
app.use(cors())
// app.use('/api',authRouter)
// app.use('/api',categoryRouter)

const { createProxyMiddleware } = require('http-proxy-middleware');
app.use('/api', createProxyMiddleware({ 
    target: 'http://localhost:8080/', //original url
    changeOrigin: true, 
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));

readdirSync('./routes')
.map((c) => app.use('/api',require('./routes/'+c)) )

app.listen(5001,
    ()=> console.log('server is running on port 5001'))