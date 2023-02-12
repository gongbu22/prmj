const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
const port = 3001;
const mysql = require('sync-mysql');
const cors = require("cors");
const noSyncMysql = require('mysql');
const { v4 } = require('uuid');


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

// const noSyncConnection = noSyncMysql.createConnection({
//     host : 'database-2.cz3zo4yskaei.ap-northeast-2.rds.amazonaws.com',
//     user : 'prmj',
//     port: '3306',
//     password : '1234',
//     database : 'cseprmj'
// });

//포트확인
app.listen(port, ()=>{
    console.log('3001port start!')
})

//디비 확인
let result = connection.query('select * from IT_EDU');
//console.log(result);

//login/logout
app.post('/register', (req, res) => {
    const email = req.body.email;
    const id = req.body.id;
    const password = req.body.password;
    console.log('/register called')
    console.log("email : "+ email +"| id : " + id + " | password : " + password)
    console.log(req.body);

    noSyncConnection.query("INSERT INTO USER (email, id, password) VALUES (?, ?, ?)", [email, id, password], 
        (err, userCheck) => {
            if(userCheck){
                res.send(userCheck);
                res.json(userCheck[0]);
            }else{
                res.send({message: " 정확히 입력해주세요 "})
            }
        }
    )
    console.log('/register done')
})

app.post("/login", (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    console.log('/login Called')
    console.log("id : " + id + " | password : " + password)

    noSyncConnection.query("SELECT USER_CODE, ID, USER_GRADE from USER where id = ? AND password = ?", [id, password], 
        function(err, result, fields) {
            if (result[0] != null) {
                const uuid = v4();
                noSyncConnection.query("UPDATE USER SET TOKEN = ?, ACCESS_DATE = CURRENT_TIMESTAMP, EXPIRE_DATE = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 HOUR) WHERE id = ?", [uuid, id], (err) => {
                    if(err) {
                        res.send('UUID update failed')
                    }
                    result[0].TOKEN = uuid
                    res.json(result[0]);
                })
            }else {
                res.send('');
            }
        }
    )
    console.log('/login done')
})

app.post('/logout', (req, res) => {

    const token = req.body.token;
    console.log('/logout called')
    console.log(" token : " + token)

    noSyncConnection.query("UPDATE USER SET EXPIRE_DATE = CURRENT_TIMESTAMP WHERE TOKEN = ?", [token],
        (err, logCheck) => {
        if (logCheck){
            res.send(logCheck);
        }else{
            res.send({message: " 로그아웃에 실패하였습니다."})
        }
    }
    )
    console.log('/logout done')
})

app.post("/maintainLoginStatus", (req, res) => {
    const token = req.body.token;

    noSyncConnection.query("SELECT USER_CODE, EMAIL, ID, USER_GRADE from USER where TOKEN = ?", [token], 
        function(err, result, fields) {
            if (result[0] != null) {
                noSyncConnection.query("UPDATE USER SET ACCESS_DATE = CURRENT_TIMESTAMP, EXPIRE_DATE = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 HOUR) WHERE TOKEN = ?", [token], (err) => {
                    if(err) {
                        res.send('접속시간 동기화 실패')
                    }
                    res.json(result[0])
                    .send();
                })
            }else {
                res.send('토큰이 존재하지 않음');
            }
        }
    )
})

//Card
app.get("/cardList", (req, res)=> {
    const result = connection.query('select * from IT_EDU where PUBLICITY="YES" order by EDU_CODE desc;')
  
    res.json(result)
    // console.log(JSON.stringify({result}));
})
 //카드 검색
app.post("/cardSearch", (req, res)=> {
    const search =req.body.searchName;
    console.log(search);
    const result = connection.query("select * from IT_EDU where COURSE_NAME like '%"+search+"%' and PUBLICITY='YES' order by EDU_CODE desc;")
    res.json(result);
    console.log(result);
    // console.log(result);
    // const searchName = connection.query('select EVENT_NAME from EVENT_INFO')
    // res.json(searchName);
})

//api작성해야함======================
app.get("/category", (req, res) => {
    var eventName =req.query.event
    const event = connection.query('select * from IT_EDU where WEBSITE_LIST="'+eventName+'"')
    console.log(eventName)
    res.json(event)
})

//Card 카드관심행사추가
app.get("/cardfavourite", (req,res) => {
    console.log(req.query.star);
    var result = req.query.star;
    // const star = connection.query('select * from EVENT2 where EVENT_CODE='+result);
    console.log(result[0]['WEBSITE_LIST'])
    
    //const addStar = connection.query('insert into FAVOURITE_EVENT2(EVENT_CODE, FAVOURITE_EVENT_NAME, FAVOURITE_EVENT_BEGIN_DATE, FAVOURITE_EVENT_END_DATE, FAVOURITE_EVENT_PLACE) values(?,?,?,?,?) select * from EVENT2 where EVENT_CODE='+result
    const addStar = connection.query(
        'insert into FAVOURITE_COURSE(EDU_CODE, WEBSITE_LIST, COURSE_NAME) select EDU_CODE, WEBSITE_LIST, COURSE_NAME from IT_EDU where EDU_CODE='+result+' AND NOT EXISTS(select EDU_CODE from FAVOURITE_COURSE where EDU_CODE='+result+');'
        )
    
    console.log("추가")
    const fAll= connection.query("select * from FAVOURITE_COURSE")
    
    res.json(fAll)
    
})


//AddEvent
app.post("/add", (req, res)=> {
    const add = req.body;
    
    const result = connection.query("insert into IT_EDU(WEBSITE_LIST, COURSE_NAME, BEGIN_DATE, COURSE_DURATION, DESCRIPTION, WEBSITE ) values(?,?,?,?,?,?);"
        ,[
            // add['code'],
            add['WEBSITE_LIST'],
            add['COURSE_NAME'],
            add['BEGIN_DATE'],
            add['COURSE_DURATION'],
            add['DESCRIPTION'],
            add['WEBSITE']
        ]
        )
    console.log(result);
    
    const all = connection.query("select * from IT_EDU")
    res.json(all)
})

//api작성해야함==========================================
app.get("/userList", (req, res) => {
    const list = connection.query("select * from IT_EDU order by EDU_CODE desc")
    console.log(list);
    res.json(list);
})


//Favourite
app.get("/favourite", (req,res) => {
    const list = connection.query('select F.FCOURSE_CODE, F.WEBSITE_LIST, F.COURSE_NAME, E.BEGIN_DATE, E.COURSE_DURATION, E.DESCRIPTION, E.WEBSITE from FAVOURITE_COURSE F, IT_EDU E WHERE F.EDU_CODE = E.EDU_CODE AND E.PUBLICITY="YES" order by F.FCOURSE_CODE desc')
    console.log(list)
    res.json(list)
})

//FavouriteDelete
app.get("/favouriteDelete", (req,res) => {
    console.log(req.query.star);
    const star=(req.query.star);
    const result = connection.query('delete from FAVOURITE_COURSE where FCOURSE_CODE='+star);
    console.log("삭제")
    // const all = connection.query("select * from FAVOURITE_COURSE")
    // res.json(all);
})

//Admin
app.get("/admin", (req, res)=> {
    const result = connection.query('select * from IT_EDU order by EDU_CODE desc')
    // console.log("성공")
    res.json(result)
})

//AdminDelete  API작성해야함===================
app.get("/adminDelete", (req,res) => {
    console.log(req.query.star);
    const star=(req.query.star);
    const result = connection.query('delete from IT_EDU where EDU_CODE='+star);
    console.log("삭제")
    // const all = connection.query('select * from IT_EDU')
    res.json(result)
})

//AdminApprove
app.get("/Approve", (req, res) => {
    console.log(req.query.approveStar)
    const approveStar=(req.query.approveStar)
    const result = connection.query('update IT_EDU set PUBLICITY="YES" where EDU_CODE="'+approveStar+'"')
    console.log(result);
    // const all = connection.query("select * from IT_EDU")
    // res.json(all);
})


//AdminNoApprove
app.get("/noApprove", (req, res) => {
    console.log(req.query.noApproveStar)
    const noApproveStar=(req.query.noApproveStar)
    // const result=connection.query('select RUBLIC from EVENT2 where EVENT_CODE="'+noApproveStar+'"')
    const result = connection.query('update IT_EDU set PUBLICITY="NO" where EDU_CODE="'+noApproveStar+'"')
    console.log(result);
    // const all = connection.query("select * from IT_EDU")
    // res.json(all);
})

//수정
app.post("/userUpdate", (req, res)=> {
    const websiteList=req.body.websiteList
    const courseName = req.body.courseName
    const beginDate = req.body.beginDate
    const courseDuration = req.body.courseDuration
    const description = req.body.description
    const website = req.body.website
    //console.log(websiteList, courseName, beginDate, courseDuration, description, website)
    
    const result = connection.query("update IT_EDU set WEBSITE_LIST=?, COURSE_NAME=?, BEGIN_DATE=?, COURSE_DURATION=?, DESCRIPTION=?, PUBLICITY='NO', WEBSITE=? where EDU_CODE="+req.body.EDU_CODE+";",[
        websiteList,
        courseName,
        beginDate,
        courseDuration,
        description,
        website
        ])
        
    // const all = connection.query("select * from IT_EDU where EDU_CODE="+req.body.EDU_CODE+";")
    // console.log(all)
    console.log(result)
    
})

module.exports=app;