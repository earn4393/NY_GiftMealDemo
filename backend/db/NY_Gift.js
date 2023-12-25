//  config database
var config ={
    user: "username",
    password: "password",
    server: "server IP",
    database: "name database",
    "options": {
        trustedconnection:true,
    },
    driver:"msnodesqlv8",
  }

  module.exports = config;


// teating database connection
//   mysql.connect(config,function(err){
//     if(err){conole.log(err);}

//     // make a request as

//     var request = new mysql.Request();

//    //make the query

//     var query = "select * from tbl_EMPLOYEE where EMPLOYEE_ID = 1";  

//     request.query(query,function(err,records) {
//         if(err){
//             console.log(err);
//         }
//         else{
//            console.log(records);
//         }
//     })

// })
