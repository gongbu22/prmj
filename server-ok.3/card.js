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

app.get("/category", (req, res) => {
    var eventName =req.query.event
    const event = connection.query('select * from EVENT2 where EVENT_CATEGORY="'+eventName+'"')
    console.log(eventName)
    res.json(event)
})

//Card 카드관심행사추가
app.get("/cardfavourite", (req,res) => {
    console.log(req.query.star);
    var result = req.query.star;
    // const star = connection.query('select * from EVENT2 where EVENT_CODE='+result);
    console.log(result[0]['EVENT_CATEGORY'])
    
    //const addStar = connection.query('insert into FAVOURITE_EVENT2(EVENT_CODE, FAVOURITE_EVENT_NAME, FAVOURITE_EVENT_BEGIN_DATE, FAVOURITE_EVENT_END_DATE, FAVOURITE_EVENT_PLACE) values(?,?,?,?,?) select * from EVENT2 where EVENT_CODE='+result
    const addStar = connection.query(
        'insert into FAVOURITE_EVENT2(EVENT_CODE, FAVOURITE_EVENT_NAME, FAVOURITE_EVENT_BEGIN_DATE, FAVOURITE_EVENT_END_DATE, FAVOURITE_EVENT_PLACE, FAVOURITE_EVENT_CATEGORY) select EVENT_CODE, EVENT_NAME, EVENT_BEGIN_DATE, EVENT_END_DATE, EVENT_PLACE, EVENT_CATEGORY from EVENT2 where EVENT_CODE='+result+' AND NOT EXISTS(select EVENT_CODE from FAVOURITE_EVENT2 where EVENT_CODE='+result+');'
        )
    
    console.log(addStar);
    
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


//Favourite
app.get("/favourite", (req,res) => {
    const list = connection.query("select F.FAVOURITE_EVENT_CODE, F.FAVOURITE_EVENT_NAME, F.FAVOURITE_EVENT_BEGIN_DATE, F.FAVOURITE_EVENT_END_DATE, F.FAVOURITE_EVENT_PLACE, F.FAVOURITE_EVENT_CATEGORY, E.EVENT_ACCOUNT from FAVOURITE_EVENT2 F inner JOIN EVENT2 E ON F.EVENT_CODE = E.EVENT_CODE")
    console.log(list)
    res.json(list)
})


module.exports=app;