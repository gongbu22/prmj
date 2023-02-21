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

const noSyncConnection = noSyncMysql.createConnection({
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

    noSyncConnection.query("SELECT * FROM USER WHERE ID = ? OR EMAIL = ?", [id, email], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).send({message: "ID 검색 중 오류가 발생했습니다."});
        }

        if (rows.length > 0) {
            return res.status(400).send({message: "이미 있는 ID 또는 이메일입니다."});
        }

        noSyncConnection.query("INSERT INTO USER (EMAIL, ID, PASSWORD) VALUES (?, ?, ?)", [email, id, password], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send({message: "회원 가입 중 오류가 발생했습니다."});
            }

            return res.status(200).send({message: "계정이 생성되었습니다."});
        });
    });
});

app.post("/login", (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    console.log('/login Called')
    console.log("id : " + id + " | password : " + password)

    noSyncConnection.query("SELECT ID, USER_GRADE from USER where ID = ? AND PASSWORD = ?", [id, password], 
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
                console.log('');
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
    console.log('logout done')
})

app.delete('/mypage', (req, res) => {
    const id = req.body.id
    noSyncConnection.query("DELETE FROM USER WHERE ID = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({message: "회원탈퇴 중 오류가 발생했습니다."});
        }
        return res.status(200).send({message: "회원탈퇴가 완료되었습니다."});
    });
});

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
    
})

//카테고리
app.get("/national", (req, res) => {
    const event = connection.query('select * from IT_EDU where TYPE like "%국비%" and PUBLICITY="YES" order by EDU_CODE desc;')
    console.log(event)
    res.json(event)
})

app.get("/nonational", (req, res) => {
    const event = connection.query('select * from IT_EDU where TYPE not like "%국비%" and PUBLICITY="YES" order by EDU_CODE desc;')
    console.log(event)
    res.json(event)
})

app.get("/week", (req, res) => {
    const event = connection.query('select * from IT_EDU where BEGIN_DATE like "%평일%" and PUBLICITY="YES" order by EDU_CODE desc;')
    console.log(event)
    res.json(event)
})

app.get("/weekend", (req, res) => {
    const event = connection.query('select * from IT_EDU where BEGIN_DATE like "%주말%" and PUBLICITY="YES" order by EDU_CODE desc;')
    console.log(event)
    res.json(event)
})




//Card 카드관심행사추가

app.get("/cardfavouritefind", (req,res) => {
     var star2 = req.query.star2;
     const fAll2= connection.query("select EDU_CODE from FAVOURITE_COURSE WHERE EDU_CODE="+star2)
    
    res.json(fAll2) 
    console.log(fAll2)
     
})

app.get("/cardfavourite", (req,res) => {
    var star = req.query.star;
    var ID = req.query.ID;
    var websiteList=req.query.websiteList;
    var courseName=req.query.courseName;
        // console.log(courseName);
   
    const addStar = connection.query(
        'insert into FAVOURITE_COURSE(EDU_CODE, WEBSITE_LIST, COURSE_NAME, ID) '+
        'select E.EDU_CODE, E.WEBSITE_LIST, E.COURSE_NAME, U.ID from IT_EDU as E join USER as U on E.EDU_CODE='+star+' AND U.ID="'+ID+
        '" AND NOT EXISTS(select EDU_CODE from FAVOURITE_COURSE where EDU_CODE='+star+');'
        )
    
    res.json(star)
    console.log("추가")
    console.log(addStar)
    
})

app.get("/cardfavouritedelete", (req,res) => {
    var star = req.query.star3;
   
    const addStar = connection.query(
        'delete from FAVOURITE_COURSE where EDU_CODE='+star
        )
    
    
    console.log("삭제")
    console.log(addStar)
    
})


//AddEvent
app.post("/add", (req, res)=> {
    const add = req.body;
    console.log(add)
    const result = connection.query("insert into IT_EDU(WEBSITE_LIST, COURSE_NAME, BEGIN_DATE, COURSE_DURATION, DESCRIPTION, WEBSITE, ID, TYPE) values(?,?,?,?,?,?,?,'교육과정');"
        ,[
            // add['code'],
            add['WEBSITE_LIST'],
            add['COURSE_NAME'],
            add['BEGIN_DATE'],
            add['COURSE_DURATION'],
            add['DESCRIPTION'],
            add['WEBSITE'],
            add['ID']
        ]
        )
    console.log(result);
    
    const all = connection.query("select * from IT_EDU")
    res.json(all)
})

//userList
app.get("/userList", (req, res) => {
    const id=req.query.ID
    console.log(id)
    const list = connection.query("select * from IT_EDU where ID='"+id+"'order by EDU_CODE desc")
    console.log(list);
    res.json(list);
})

//userUpdate
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

//UserDelete
app.get("/userDelete", (req,res) => {
    console.log(req.query.star);
    const star=(req.query.star);
    const result = connection.query('delete from IT_EDU where EDU_CODE='+star);
    console.log("삭제")
    // const all = connection.query("select * from FAVOURITE_COURSE")
    // res.json(all);
})

//Favourite
app.get("/favourite", (req,res) => {
    const list = connection.query('select F.FCOURSE_CODE, F.WEBSITE_LIST, F.COURSE_NAME, E.ID, E.BEGIN_DATE, E.COURSE_DURATION, E.DESCRIPTION, E.WEBSITE, E.TYPE from FAVOURITE_COURSE F, IT_EDU E WHERE F.EDU_CODE = E.EDU_CODE AND E.PUBLICITY="YES" order by F.FCOURSE_CODE desc')
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

//AdminCategory
app.get("/approveCategory", (req, res) => {
    const event = connection.query('select * from IT_EDU where PUBLICITY ="NO" order by EDU_CODE desc;')
    console.log(event)
    res.json(event)
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


module.exports=app;