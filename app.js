const express = require('express');
const routes = require('./routes/index');
const session = require('express-session');

const app = express()
const port = process.env.PORT || 3000

const server = require('http').createServer(app)
const io = require('socket.io')(server, {})

app.set('view engine', 'ejs')
app.use(session({
  secret: 'keLon - kelas onlen',
  resave: false,
  saveUninitialized: true
}))


app.use(express.urlencoded({extended:true}))
app.use('/', routes)

let countUserOnline = 0
io.on('connection', socket => {
    socket.on('join', param => {
        console.log('user join')
        countUserOnline++;
        io.emit('countUserOnline', countUserOnline)
    })
    socket.on('message', param => {
        io.emit('message', param)
    })
    socket.on('disconnect', param => {
        console.log('user keluar')
        countUserOnline--;
        io.emit('countUserOnline', countUserOnline)

    })
})

app.use('/', routes)


server.listen(port)
