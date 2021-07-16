const koa = require('koa')
const Router = require('koa-router')
const applyRoutes = require('./routes')
const bodyParser = require('koa-bodyparser')
const cors = require('cors')
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,           
    optionSuccessStatus:200
}

const app = new koa()

const router = new Router()

module.exports = () => {
    console.log('[koa] Creating a new server')

    applyRoutes(router)
    app.use(bodyParser())
    app.use(router.routes())
    app.use(router.allowedMethods())
    app.use(cors())
    app.use(cors(corsOptions))

    app.listen(8080)
}