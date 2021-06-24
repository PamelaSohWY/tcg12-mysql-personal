// this is how to connect database using sql2
//need to import express, hbs, wax-on, mysql2/promise (to connect to mongo) 

const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const mysql = require('mysql2/promise'); //yarn add mysql2 //do in command promppt
const helpers = require('handlebars-helpers')({
handlebars: hbs.handlebars
});

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

   app.get('/country', async (req, res) => {
     //res.send("Hello world");
     let [country] = await connection.execute("select * from country"); //using sql query // just to show infor in the browser // but to be readable need to create views hbs/ layout
    res.render('country', {
        'country': country
     }) 
})


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


   //Create Actor 
   app.get('/actor/create', async (req,res)=>{
    res.render('create_actor');
})

app.post('/actor/create', async(req,res)=>{
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let query = "insert into actor (first_name, last_name) values (?, ?);"
    let bindings = [firstName, lastName]

    await connection.execute(query, bindings);
    res.redirect('/') //results should be redirected 
})

app.get('/country/create', async(req,res)=>{
    res.render('create_country'); //name in consistent manner 
}) //ok



app.post('/country/create', async(req,res)=>{
    
    let country = req.body.country; 
    let query = "insert into country (country) values(?);"
    let bindings =[country]

    await connection.execute(query, bindings);
    res.redirect('/country')
    res.send("new country has been added")
})


//Update And Actor 
//One route to show form 
//One route to edit form 
//One route to show country 
// app.get('/actor/:actor_id/update', async(req,res)=>{
//     //fetch the actor
// let query = select 
//     //always check the sql code in sql terminal first 
// })


//Update And Country 
//One route to show form 
//One route to edit form 
//One route to show country 
app.get('/country/:country_id/update', async(req,res)=>{
    //fetch the country
let query = "select * from country where country_id=?"; 

//country will always be an array regardless of number of results 
let [country]= await connection.execute(query,[req.params.country_id]);

//extract out the first element from the results 
let targetCountry = country[0];

res.render ('update_country',{
    'country':targetCountry
})

    //always check the sql code in sql terminal first 
})// end of app.get update // ok checked 
//form is up


//this is for submit button
app.post('/country/:country_id/update', async(req,res)=>{
    //destructuring used //let X= req.body.x 
    //let country=req.body.country;
    let query = `update country set country=? where country_id =?`;
    let bindings = [req.body.country, req.params.country_id]; //check in update_country that the variable name is same 
    console.log(bindings);
    await connection.execute(query, bindings);
    res.redirect('/country');
})

//DELETE AN ACTOR
app.get('/actor/:actor_id/delete', async(req,res)=>{
    let [actor] = await connection.execute(
        "select * from actor where actor_id = ?",
        [ req.params.actor_id]
    )
    let targetActor = actor[0];
    res.render('delete_actor',{
        'actor': targetActor
    })
})

app.post('/actor/:actor_id/delete', async(req,res)=>{
    let query = " delete from actor where actor_id = ?"
    await connection.execute(query, [ req.params.actor_id]);
    res.redirect('/')
})

// // This for delete button 
 app.get('/country/:country/delete', async(req,res) =>{
    let [country] = await connection.execute(
       "select * from country where country_id =?",
       [req.params.country_id]
    )
    let targetCountry = country[0];
    res.render('delete_country',{
        'country': targetCountry
     })

 app.post('/country/:country_id/delete', async(req,res)=>{
     let query = "delete from country where country_id=?"
         await connection.execute(query,[req.params.country_id]);
        res.redirect('/country')
 })
 }) // Need to check as it is not working 


//create country 
//city - type in // drop down for country 
app.get('/city/create', async(req,res)=>{
    let [city] = await connection.execute("select * from city");

    res.render('create_city',{
        'city':city
    })
})

app.post('/city/create', async(req,res)=>{

    let{ city
    }= req.body;

    let query =`
    insert into city
    (city)
    values(?)
    `
    let bindings =[req.body.city];
    console.log(bindings)
    await connection.execute(query,bindings);
    res.send("new city created");
})

//UPDATE A CITY 
app.get('/city/:city_id/update',async(req,res)=>{  //c
// retrieve city that user is updating 
let query = 'select *from city where city_id=?';
let bindings =[req.params.city_id];
let [city] = await connection.execute(query, bindings); //c
let targetCity = city[0]; //retrieve first item from array

let [countries] = await connection.execute('select * from country order by country'); //c 

res.render('update_city',{
    'city':targetCity,
    'countries':countries
    })

})//app.get city

app.post('/city/:city_id/update', async(req,res)=>{
let { city, country}= req.body;

let query =`
update city set city=?,
country=?

`
// need to remember to put in where 
let bindings =[city,country]

await connection.execute(query,bindings);
res.send("City has been updated")

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
