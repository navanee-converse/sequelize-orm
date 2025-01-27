const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const dboper = require('./dboperation')
app.use(bodyparser.json())

app.get("/add",(req,res)=>{
    let emp = req.query.empName
    let assect = req.query.assect
    let result = dboper.add(emp,assect)
    result.then((data)=>{
        res.send(data)
        console.log(data);
        
    }).catch((err)=>{
        console.log(err);
        
    })
})

app.delete('/delete',(req,res)=>{
    let name = req.query.name
    let result = dboper.deleteAssect(name)
    result.then((data)=>{
        res.send(data+"rows deleted")
        console.log(data);
    }).catch((err)=>{
        console.log(err);
        
    })
})
app.listen(8000,(err)=>{
    if (err) 
    {
        console.log(err);     
    }
    else
    console.log('server is running on 8000');
    
})
