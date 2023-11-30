const express = require('express');
const app = express();
const livereload = require("livereload");
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

app.use(express.static(path.join(__dirname,'public')))

app.set('view engine','ejs')

const PORT = 3000;

app.get('/',(req,res)=>{
  res.render('Admin-login')
})

app.get('/Products',(req,res)=>{
  res.render('Admin-products')
})

app.get('/Customers',(req,res)=>{
  res.render('Admin-customers')
})

app.get('/Orders',(req,res)=>{
  res.render('Admin-orders')
})

app.get('/categories',(req,res)=>{
  res.render('Admin-categories')
})

app.listen(PORT , () => {
    console.log(`listening to port ${PORT}`);
})