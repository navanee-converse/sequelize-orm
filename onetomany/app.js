const express = require('express')
const app = express()
const db = require('./dboperation')

const bodyparser = require('body-parser')
app.use(bodyparser.json())

app.post('/add',(req,res)=>{
    let name = req.body.name
    let address = req.body.address
    let bankname = req.body.bankname
    let balance = req.body.balance
    console.log(name);
    
    let result = db.dboper.addData(name,address,bankname,balance)
    result.then((data)=>{
        res.send("user added")
        console.log(data);
        
    }).catch((err)=>{console.log(err);
    })

})
app.get('/addbank',(req,res)=>{
    let bankname = req.query.bankname
    let balance = req.query.balance
    let id = req.query.id
    let result = db.dboper.addBank(bankname,balance,id)
    result.then((data)=>{
        res.send(data)
    }).catch((err)=>{console.log(err);
    })
})

app.delete('/removebank',(req,res)=>{
    let id = req.query.id
    let name = req.query.name
    let result = db.dboper.removeBank(id,name)
    result.then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err);
        
    })
})

app.delete('/deletePerson',(req,res)=>{
    let id = req.query.id
    let result = db.dboper.deletePerson(id)
    result.then((data)=>{
        res.send(data+" row deleted")
        console.log(data);
    }).catch((err)=>{console.log(err);
    })
})
app.listen('8080',(err)=>{
    if (err) {
        console.log(err);
        
    }
    else
    {
        console.log('server running');
        
    }
    
})