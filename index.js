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

    //let query 
    let query = `select * from city
                       join country
                       on city.country_id = country.country_id`;

    let [city] = await connection.execute (query); //[] can be named as abitrary variable
   
        res.render('city',{
            'city':city  //in orange is arbitrary variable
        })

        //Search for actor 



   })//end of app.get


// search for actor
    app.get('/search', async(req,res)=>{
        
        // the MASTER query (the always true query in other words)
        let query = "select * from actor where 1";

        if (req.query.search_terms) {
            // if the program reaches here, it means
            // that req.query.search_terms is not null, not empty, not undefined, not a zero, not a NaN and
            // not empty string

            // append to the query
            query += ` and (first_name like '%${req.query.search_terms}%'
                       or last_name like '%${req.query.search_terms}%')`
        }

        console.log("Final query =", query);

        let [actors] = await connection.execute(query);
        res.render('search',{
            'actors': actors,
            'search_terms': req.query.search_terms
        })
    })

    /* create a search for customer */
    app.get('/customer', async(req,res)=>{

        // 1. write the code to display the customers
          // in a table
        // 2. put in the form
        // one field to search by the first name and last name
        // one field to search by the email address

        // 3. modify the query based on whether req.query has
        // any value for the texte input
    let query = "select * from customer where 1";
    let bindings =[];

    // if you have 2 search boxes separate out the query
    //make sure that the query matches the value of fieldbox
        if (req.query.name_search){
          let name = req.query.name_search;
          query += ` and (
              first_name like ? OR last_name like ?
          )`
          bindings.push('%' + name + '%', '%'+ name + '%')
                         // remember back tick
                         //need to remeber to put space before the first AND
        } //end of query
        

        if (req.query.email_search){
            let email = req.query.email_search;
            query += ` and email like ?`
            
            bindings.push('%' + email + '%')
                           // remember back tick
                           //need to remeber to put space before the first AND
          } //end of query

        console.log("Final query =", query);
        console.log(bindings)
        
        let [customer] = await connection.execute(query,bindings); //pass 2 arguments
        res.render('customer',{
            'customer': customer,
            'name_search': req.query.name_search,
            'email_search': req.query.email_search
        })
    })

}//end of main function

//Make sure all routes are in the main function

main();


// start server
app.listen(3000, () => {
    console.log("Server has started")
})


//Without PREPARED STATEMENTS 
// /* create a search for customer */
//     app.get('/customer', async(req,res)=>{

//         let query = "select * from customer where 1";
      
//         if (req.query.name_search) {
//             let name = req.query.name_search;
//             query += ` and ( 
//                 first_name like '%${name}%' or  last_name like '%${name}%'
//             )
//             `
//         }

//         if (req.query.email_search) {
//             let email = req.query.email_search;
//             query += ` and email like '%${email}%'`
//         }
      
//         console.log(query);
      
//         let [customers] = await connection.execute(query);
//         res.render('customers', {
//             'customers': customers,
//             'name_search': req.query.name_search,
//             'email_search': req.query.email_search
//         })
