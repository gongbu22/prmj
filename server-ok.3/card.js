const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
const port = 3001;
const mysql = require('sync-mysql');
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

var connection = new mysql({
    host : 'database-2.cz3zo4yskaei.ap-northeast-2.rds.amazonaws.com',
    user : 'prmj',
    port: '3306',
    password : '1234',
    database : 'cseprmj'
});

//포트확인
app.listen(port, ()=>{
    console.log('3001port start!')
})

//디비 확인
let result = connection.query('select * from EVENT2');
//console.log(result);

//Card
app.get("/cardList", (req, res)=> {
    const result = connection.query('select * from EVENT2')
  
    res.json(result)
})

app.post("/cardSearch", (req, res)=> {
    const search =req.body.searchName;
    console.log(search);
    const result = connection.query("select * from EVENT2 where EVENT_NAME like '%"+search+"%'")
    res.json(result);
    console.log(result);
    // const searchName = connection.query('select EVENT_NAME from EVENT_INFO')
    // res.json(searchName);
})

// app.get("/cardModal/:code", (req, res) => {
//     console.log(req.params.code);
//     const code = req.params.code;
//     const result = connection.query("select * from EVENT where EVENT_CODE='"+code+"'")
//     res.json(result);
    
// })

app.get("/category1", (req, res) => {
    // var eventName1 =req.query.event
    // const event1 = connection.query('select * from EVENT2 where EVENT_CATEGORY="'+eventName1+'"')
    console.log(req.query.event)
    // res.json(event1)
})

//AddEvent
app.post("/add", (req, res)=> {
    const add = req.body;
    
    const result = connection.query("insert into EVENT2(EVENT_NAME, EVENT_BEGIN_DATE, EVENT_END_DATE, EVENT_PLACE, EVENT_HOST, EVENT_REGION, EVENT_ACCOUNT, EVENT_CATEGORY ) values(?,?,?,?,?,?,?,?);"
        ,[
            // add['code'],
            add['name'],
            add['beginDate'],
            add['endDate'],
            add['place'],
            add['host'],
            add['region'],
            add['account'],
            add['category']
        ]
        )
    console.log(result);
})

app.get("/userList", (req, res) => {
    const list = connection.query("select * from EVENT2")
    console.log(list);
    res.json(list);
})

//favourite
app.get("/favourite", (req,res) => {
    console.log(req.query);
    console.log("hi")
})


module.exports=app;