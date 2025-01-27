const express = require('express')
const app = express()
const val = require('./dboperations')
app.get('/add',(req,res)=>{
    let id = req.query.id
    let name = req.query.name
    let twowheeler = req.query.twowheeler
    let address = req.query.address

    const result = val.oper.add(id,name,twowheeler,address)
    result.then((data)=>{
        res.send("User values added successfully")
        console.log(data);
        
    }).catch((err)=>{
        if (err) 
            console.log(err);
            
    })
})

app.get('/viewAll',(req,res)=>{
    let result = val.oper.viewAll()
    result.then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err);
        
    })
})

app.delete('/delete',(req,res)=>{
    let name = req.query.name
    let result = val.oper.del(name)
    result.then((data)=>{
        res.send('User deleted')
        console.log(data);
        
    })
})
app.listen('8080',(err)=>{
    if(err)
        console.log(err);
    else
        console.log(`server running on port 8080`);
        
        
})