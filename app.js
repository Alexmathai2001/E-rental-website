const express = require('express')
const app = express()
const livereload = require('livereload')
const path = require('path')
const connectLivereload = require("connect-livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "views"));

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 50);
});

app.use(connectLivereload());

app.use(connectLivereload());

app.use(express.static(path.join(__dirname,'public')))

app.set('view engine','ejs')

const PORT = 3000;

app.get('/',(req,res)=>{
  res.render('Landing-page')
})

app.listen(PORT , () => {
    console.log(`listening to port ${PORT}`);
})