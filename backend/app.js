// connect database , query database and send data to fontend 



//setting parameter
const express = require('express');
const sql = require('mssql');
const config = require("./db/NY_Gift.js");


// setting header api
const app = express();
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

// setting port backend
const port = process.env.port || 3009;
app.listen(port, function () {
    console.log('Listening on part ', port);
})

// countimg number of employees that gave or don't gave gift  
app.get('/total-gift', function (req, res) {
    config.connect().then(() => {
        var request = new sql.Request(config)
        var query = `SELECT G_Status as state ,count(G_Status) as 'count' from emp_status where G_Status is not null group by G_Status`;
        request.query(query, (err, records) => {
            if (err) {
                console.log('gift grap error', err);
            }
            else {
                const data = records.recordset
                const graphs = { Y: 0, N: 0 }

                graphs[data[0].state] = data[0].count
                graphs[data[1].state] = data[1].count
                res.send(graphs)
            }
        })
    }).catch((err) => {
        console.log(`gift grap connect error : ${err}`)
    })
})

// countimg number of employees that gave or don't gave food  
app.get('/total-food', function (req, res) {
    try {
        sql.connect(config, function (err) {
            if (err) { console.log(err); }

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
    const id = req.body.id;
    config.connect().then(() => {
        var request = new sql.Request(config)
        var query = `select EMPLOYEE_LOCAL_NAME,G_Status,FORMAT(Gift_Date, 'dd/MM/yyyy hh:mm:ss tt')as Gift_Date , F_Status ,FORMAT(Food_Date, 'dd/MM/yyyy hh:mm:ss tt')as Food_Date from emp_status where EMPLOYEE_NO =  ${id}`;
        request.query(query, (err, records) => {
            if (err) console.log('check query error', err);
            else {
                const data = records.recordset[0]
                const alert = { food: "", gift: "", g_date: "", f_date: "" }

                if (data != undefined) {
                    alert.food = data.F_Status
                    alert.gift = data.G_Status
                    alert.g_date = data.Gift_Date
                    alert.f_date = data.Food_Date
                }
                // console.log(` food: ${alert.food} , gift: ${alert.gift} ,G_Date: ${alert.g_date} , F_Date: ${alert.f_date} `)
                res.send(alert)
            }
        })
    }).catch((err) => {
        console.log(`check connect error : ${err}`)
    })
})


//  update food state and date for employee id in database
app.put('/add-status-food', function (req, res) {
    const id = req.body.id;
    config.connect().then(() => {
        var request = new sql.Request(config)
        var query = `update tbl_F_Transaction set F_Status = 'Y' ,Food_Date = GETDATE() where EMPLOYEE_NO = ${id}`;
        request.query(query, (err, records) => {
            if (err) {
                console.log('food query error', err);
                res.send({ code: 999 })
            }
            else {
                res.send({ code: 200 })
            }
        })
    }).catch((err) => {
        console.log(`food connect error : ${err}`)
    })
});

// update Gift state and date for employee id in database
app.put('/add-status-gift', function (req, res) {
    const id = req.body.id;
    config.connect().then(() => {
        var request = new sql.Request(config)
        var query = `update tbl_G_Transaction set G_Status = 'Y' ,Gift_Date = GETDATE() where EMPLOYEE_NO = ${id}`;
        request.query(query, (err, records) => {
            if (err) {
                console.log('gift query error', err);
                res.send({ code: 999 })
            }
            else {
                res.send({ code: 200 })
            }
        })
    }).catch((err) => {
        console.log(`gift connect error : ${err}`)
    })
});

