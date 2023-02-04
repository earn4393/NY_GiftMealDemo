// connect database , query database and send data to fontend 



//setting parameter
const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql/msnodesqlv8');
const config = require("./db/NY_Gift");


// setting header api
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT"
    );
    next();
});
app.use(express.json());


// countimg number of employees that gave or don't gave gift  
app.get('/total-gift', function (req, res) {
    try {
        sql.connect(config, function (err) {
            if (err) { conole.log(err); }

            var request = new sql.Request();

            var query = `select BRANCH_NAME,G_Status,count(G_Status)as State_Count from emp_status where G_Status is not null group by G_Status,BRANCH_NAME order by BRANCH_NAME ASC`;

            const a = request.query(query, function (err, records) {
                if (err) {
                    console.log(err);
                }
                else {
                    const data = records.recordset
                    const graphs = { MARKETING: [0, 0], ADMIN: [0, 0], PRODUCTION: [0, 0] }

                    data.forEach((item) => {
                        if (item.G_Status == 'N') {
                            graphs[item.BRANCH_NAME][1] = item.State_Count
                        } else if (item.G_Status == 'Y') {
                            graphs[item.BRANCH_NAME][0] = item.State_Count
                        }
                    })

                    console.log("Gift", graphs)
                    res.send(graphs)
                }
            })

        })

    } catch (error) {
        console.log('error : ' + error)
    }
})

// countimg number of employees that gave or don't gave food  
app.get('/total-food', function (req, res) {
    try {
        sql.connect(config, function (err) {
            if (err) { conole.log(err); }

            var request = new sql.Request();

            var query = `select BRANCH_NAME,F_Status,count(F_Status)as State_Count from emp_status where F_Status is not null group by F_Status,BRANCH_NAME order by BRANCH_NAME ASC`;

            const a = request.query(query, function (err, records) {
                if (err) {
                    console.log(err);
                }
                else {
                    const data = records.recordset
                    const graphs = { MARKETING: [0, 0], ADMIN: [0, 0], PRODUCTION: [0, 0] }

                    data.forEach((item) => {
                        if (item.F_Status == 'N') {
                            graphs[item.BRANCH_NAME][1] = item.State_Count
                        } else if (item.F_Status == 'Y') {
                            graphs[item.BRANCH_NAME][0] = item.State_Count
                        }
                    })

                    console.log("Food", graphs)
                    res.send(graphs)
                }
            })

        })

    } catch (error) {
        console.log('error : ' + error)
    }
})

/*  get food & Gift state and Food & Gift date for employee id */
app.post('/check-employee', function (req, res) {
    try {

        const id = req.body.id;
        sql.connect(config, function (err) {
            if (err) { conole.log(err); }

            var request = new sql.Request();

            var query = `select EMPLOYEE_LOCAL_NAME,G_Status,FORMAT(Gift_Date, 'dd/MM/yyyy hh:mm:ss tt')as Gift_Date , F_Status ,FORMAT(Food_Date, 'dd/MM/yyyy hh:mm:ss tt')as Food_Date from emp_status where EMPLOYEE_NO =  ${id}`;

            const a = request.query(query, function (err, records) {
                if (err) {
                    console.log(err);
                }
                else {
                    const data = records.recordset[0]
                    const alert = { food: "", gift: "", g_date: "", f_date: "" }

                    if (data != undefined) {
                        alert.food = data.F_Status
                        alert.gift = data.G_Status
                        alert.g_date = data.Gift_Date
                        alert.f_date = data.Food_Date
                        console.log(`name: ${data.EMPLOYEE_LOCAL_NAME} food: ${alert.food} , gift: ${alert.gift} ,G_Date: ${alert.g_date} , F_Date: ${alert.f_date} `)
                    }
                    res.send(alert)
                }
            })

        })
    } catch (error) {
        console.log('error : ' + error)
    }

})


// update Gift state and date for employee id in database
app.put('/add-status-gift', function (req, res) {
    try {

        const id = req.body.id;
        sql.connect(config, function (err) {
            if (err) { conole.log(err); }

            var request = new sql.Request();

            var query = `update tbl_G_Transaction set G_Status = 'Y' ,Gift_Date = GETDATE() where EMPLOYEE_NO = ${id}`;

            const a = request.query(query, function (err, records) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(`update gift ${id} successfully`)
                }
            })

        })
    } catch (error) {
        console.log('error : ' + error)
    }

});


//  update food state and date for employee id in database
app.put('/add-status-food', function (req, res) {
    try {

        const id = req.body.id;
        sql.connect(config, function (err) {
            if (err) { conole.log(err); }

            var request = new sql.Request();

            var query = `update tbl_F_Transaction set F_Status = 'Y' ,Food_Date = GETDATE() where EMPLOYEE_NO = ${id}`;

            const a = request.query(query, function (err, records) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(`update food ${id} successfully`)
                }
            })

        })
    } catch (error) {
        console.log('error : ' + error)
    }

});



// setting port backend
const port = process.env.port || 3007;
app.listen(port, function () {
    console.log('Listening on part ', port);
})

