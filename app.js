const express = require('express');
const app = express();
const path = require('path')
const connectdb = require('./connection')
const PORT = 3000;

connectdb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const adminRoute = require('./routes/admin')
app.use('/Admin',adminRoute)

const userRoute = require('./routes/user');
app.use('/User',userRoute)


app.use(express.static(path.join(__dirname,'public')))



app.set('view engine','ejs')



app.listen(PORT , () => {
    console.log(`listening to port ${PORT}`);
})