// this is how to connect database using sql2
//need to import express, hbs, wax-on, mysql2/promise (to connect to mongo) 

const express = require('express');
const hbs = require('hbs');
const wax = require ('wax-on');
const mysql = require('mysql2/promise'); //yarn add mysql2 //do in command promppt

//create express app
let app= express();
app.set('view engine', 'hbs');

//all css, image file and js file in public folder 
app.use(express.static('public'))

// set up template inheritance
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

// set up forms handling
app.use(express.urlencoded({extended:false}));

// routes
//this is just a test route initially
// app.get('/', (req,res)=> {
//     res.send("It's alive!")
// }
// )

async function main(){

    const connection = await mysql.createConnection({
        host:'localhost',
        user:'root',
        'database': 'sakila'
    })

    app.get('/', (req,res)=>{
        res.send("Hello world");
    })

}

main();


// start server
app.listen(3000, ()=>{
    console.log("Server has started")
})