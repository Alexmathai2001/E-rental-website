const express = require('express');
const app = express();
const livereload = require("livereload");
const path = require('path')

const adminRoute = require('./routes/admin')
app.use('/Admin',adminRoute)

const userRoute = require('./routes/user')
app.use('/User',userRoute)

const connectLivereload = require("connect-livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "views"));

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 50);
});

app.use(connectLivereload());

app.use(express.static(path.join(__dirname,'public')))

app.set('view engine','ejs')

const PORT = 3000;

app.listen(PORT , () => {
    console.log(`listening to port ${PORT}`);
})