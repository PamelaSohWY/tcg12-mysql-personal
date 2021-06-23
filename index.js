// this is how to connect database using sql2
//need to import express, hbs, wax-on, mysql2/promise (to connect to mongo) 

const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const mysql = require('mysql2/promise'); //yarn add mysql2 //do in command promppt

//create express app
let app = express();
app.set('view engine', 'hbs');

//all css, image file and js file in public folder 
app.use(express.static('public'))

// set up template inheritance
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

// set up forms handling
app.use(express.urlencoded({
    extended: false
}));

// routes
//this is just a test route initially
// app.get('/', (req,res)=> {
//     res.send("It's alive!")
// }
// )

async function main() {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        'database': 'sakila'
    })

    app.get('/', async (req, res) => {
        // res.send("Hello world");
        let [actors] = await connection.execute("select * from actor"); //using sql query // just to show infor in the browser // but to be readable need to create views hbs/ layout
        res.render('actors', {
            'actors': actors
        }) 
    })
    //go create base.hbs in layouts 
    //create actors in views 


    //create a route to get all city data from city table in Sakila 
// then create hbs 
   app.get('/city', async(req,res)=>{
    //    res.send ("City");
    let [city] = await connection.execute ("select * from city");
        res.render('city',{
            'city':city
        })

   })//end of app.get
}//end of main function

//Make sure all routes are in the main function

main();


// start server
app.listen(3000, () => {
    console.log("Server has started")
})