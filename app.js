const express = require('express');
const routes = require('./routes/index');
const session = require('express-session');

const app = express()
const port = process.env.PORT || 3000

// const INDEX = '/index.html';

// const server = express()
//   .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));

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

let countUserOnline = 1
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

// app.listen(port, () => {
//     console.log(`http://localhost:${port}`);
// })


/*
0. .gitignore (node_modules)
1. npm init -y
2. npm i express sequelize pg ejs
3. npm i -D nodemon sequelize-cli
4. sequelize init
5. config/config.js (postgres, 822413)
6. sequelize db:create
7. sequelize model:generate --name <Class> --attributes <kolom>
8. sequelize migration:generate --name <action-name>
9. sequelize db:migrate
9. sequelize seed:generate --name <seed-name>
10. sequelize db:seed:all
10. async hapus , await => return
11. File app (port, express, view engine, urlencoded, listen)
12. has many, belongs to https://sequelize.org/v5/manual/associations.html#one-to-many-associations--hasmany-
13. include https://sequelize.org/v5/manual/querying.html#relations---associations
14. create https://sequelize.org/master/manual/model-querying-basics.html#simple-insert-queries
15. hooks https://sequelize.org/master/manual/hooks.html#declaring-hooks

*/