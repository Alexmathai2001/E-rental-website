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
  res.locals.title = "Login"; 
  res.render('Admin-login')
})

app.get('/products',(req,res)=>{
  res.locals.title = "products"; 
  res.locals.variable = "Product";
  res.render('Admin-products')
})

app.get('/customers',(req,res)=>{
  res.locals.title = "customers"; 
  res.render('Admin-customers')
})

app.get('/orders',(req,res)=>{
  res.locals.title = "orders"; 
  res.render('Admin-orders')
})

app.get('/categories',(req,res)=>{
  res.locals.title = "categories"; 
  res.locals.variable = "category";
  res.render('Admin-categories')
})

app.get('/settings',(req,res)=>{
  res.locals.title = "settings"; 
  res.render('Admin-settings')
})


app.listen(PORT , () => {
    console.log(`listening to port ${PORT}`);
})