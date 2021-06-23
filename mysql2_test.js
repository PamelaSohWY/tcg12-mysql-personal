//https://www.npmjs.com/package/mysql2

//The library to connect to Chinnok and express is mysql2


//Import in my sql 
const mysql = require('mysql2/promise');

//create a database 
async function main () {

    //getting a connection is asynchronous 
    const connection = await mysql.createConnection({
        'host':'localhost',
        'user':'root',
        'database':'Chinook'
    })

    let query = "select * from Album";
    let [rows] = await connection.execute(query);
  
    console.log(rows);
    
}// end main function

main();

//host means a server/ ip address / domain name 
//local host (127.0.0.0.1) // refer to sql server stored in the same machine 
//root access = superadmin access 
//separate access, so that data is not compromised 
